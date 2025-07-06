const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// JWT Authentication Middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid token' });
    }
    req.user = user;
    next();
  });
};

// Admin Middleware
const requireAdmin = (req, res, next) => {
  if (req.user.role !== 'ADMIN') {
    return res.status(403).json({ error: 'Admin access required' });
  }
  next();
};

// =============================================================================
// AUTHENTICATION ROUTES
// =============================================================================

// Login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user || !user.isActive) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { 
        id: user.id, 
        email: user.email, 
        name: user.name, 
        role: user.role 
      },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// =============================================================================
// USER ROUTES
// =============================================================================

// Get all users (admin only)
app.get('/api/users', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      where: { isActive: true },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        _count: {
          select: {
            workSessions: true
          }
        }
      }
    });
    res.json(users);
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get current user
app.get('/api/users/me', authenticateToken, async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true
      }
    });
    res.json(user);
  } catch (error) {
    console.error('Get current user error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// =============================================================================
// VEHICLE ROUTES
// =============================================================================

// Get all vehicles
app.get('/api/vehicles', authenticateToken, async (req, res) => {
  try {
    const vehicles = await prisma.vehicle.findMany({
      where: { isActive: true },
      orderBy: { name: 'asc' }
    });
    res.json(vehicles);
  } catch (error) {
    console.error('Get vehicles error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create vehicle (admin only)
app.post('/api/vehicles', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { name, plate, type } = req.body;
    const vehicle = await prisma.vehicle.create({
      data: { name, plate, type }
    });
    res.json(vehicle);
  } catch (error) {
    console.error('Create vehicle error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// =============================================================================
// WORK SESSION ROUTES
// =============================================================================

// Start work session
app.post('/api/work-sessions/start', authenticateToken, async (req, res) => {
  try {
    const { vehicleId, startLocation, workDescription, startKilometers } = req.body;
    
    const session = await prisma.workSession.create({
      data: {
        userId: req.user.id,
        vehicleId: vehicleId || null,
        startTime: new Date(),
        startLocation,
        workDescription,
        startKilometers: startKilometers || null,
        status: 'ACTIVE'
      },
      include: {
        user: {
          select: { name: true, email: true }
        },
        vehicle: true
      }
    });

    res.json(session);
  } catch (error) {
    console.error('Start work session error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// End work session
app.put('/api/work-sessions/:id/end', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { endLocation, endKilometers } = req.body;

    const session = await prisma.workSession.findFirst({
      where: { id: parseInt(id), userId: req.user.id }
    });

    if (!session) {
      return res.status(404).json({ error: 'Work session not found' });
    }

    const endTime = new Date();
    const totalHours = (endTime - session.startTime) / (1000 * 60 * 60);
    
    // Calculate total kilometers traveled
    let totalKilometers = null;
    if (session.startKilometers && endKilometers) {
      totalKilometers = endKilometers - session.startKilometers;
    }

    const updatedSession = await prisma.workSession.update({
      where: { id: parseInt(id) },
      data: {
        endTime,
        endLocation,
        endKilometers,
        totalKilometers,
        status: 'COMPLETED',
        totalHours
      },
      include: {
        user: {
          select: { name: true, email: true }
        },
        vehicle: true
      }
    });

    res.json(updatedSession);
  } catch (error) {
    console.error('End work session error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Pause work session
app.put('/api/work-sessions/:id/pause', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { reason } = req.body;

    const session = await prisma.workSession.findFirst({
      where: { id: parseInt(id), userId: req.user.id }
    });

    if (!session) {
      return res.status(404).json({ error: 'Work session not found' });
    }

    // Create break record
    await prisma.break.create({
      data: {
        workSessionId: parseInt(id),
        startTime: new Date(),
        reason
      }
    });

    const updatedSession = await prisma.workSession.update({
      where: { id: parseInt(id) },
      data: { status: 'PAUSED' },
      include: {
        user: {
          select: { name: true, email: true }
        },
        vehicle: true,
        breaks: {
          orderBy: { startTime: 'desc' },
          take: 1
        }
      }
    });

    res.json(updatedSession);
  } catch (error) {
    console.error('Pause work session error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Resume work session
app.put('/api/work-sessions/:id/resume', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;

    const session = await prisma.workSession.findFirst({
      where: { id: parseInt(id), userId: req.user.id },
      include: { breaks: true }
    });

    if (!session) {
      return res.status(404).json({ error: 'Work session not found' });
    }

    // End the latest break
    const latestBreak = session.breaks[session.breaks.length - 1];
    if (latestBreak && !latestBreak.endTime) {
      const breakEndTime = new Date();
      const breakDuration = Math.round((breakEndTime - latestBreak.startTime) / (1000 * 60));

      await prisma.break.update({
        where: { id: latestBreak.id },
        data: {
          endTime: breakEndTime,
          duration: breakDuration
        }
      });

      // Update total break duration
      const totalBreakDuration = session.breakDuration + breakDuration;
      await prisma.workSession.update({
        where: { id: parseInt(id) },
        data: { breakDuration: totalBreakDuration }
      });
    }

    const updatedSession = await prisma.workSession.update({
      where: { id: parseInt(id) },
      data: { status: 'ACTIVE' },
      include: {
        user: {
          select: { name: true, email: true }
        },
        vehicle: true
      }
    });

    res.json(updatedSession);
  } catch (error) {
    console.error('Resume work session error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get work sessions for user
app.get('/api/work-sessions', authenticateToken, async (req, res) => {
  try {
    const { status, startDate, endDate, limit = 50 } = req.query;
    
    const where = { userId: req.user.id };
    
    if (status) {
      where.status = status;
    }
    
    if (startDate && endDate) {
      where.startTime = {
        gte: new Date(startDate),
        lte: new Date(endDate)
      };
    }

    const sessions = await prisma.workSession.findMany({
      where,
      include: {
        user: {
          select: { name: true, email: true }
        },
        vehicle: true,
        breaks: {
          orderBy: { startTime: 'desc' }
        }
      },
      orderBy: { startTime: 'desc' },
      take: parseInt(limit)
    });

    res.json(sessions);
  } catch (error) {
    console.error('Get work sessions error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get all work sessions (admin only)
app.get('/api/admin/work-sessions', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { status, startDate, endDate, userId, limit = 100 } = req.query;
    
    const where = {};
    
    if (status) {
      where.status = status;
    }
    
    if (userId) {
      where.userId = parseInt(userId);
    }
    
    if (startDate && endDate) {
      where.startTime = {
        gte: new Date(startDate),
        lte: new Date(endDate)
      };
    }

    const sessions = await prisma.workSession.findMany({
      where,
      include: {
        user: {
          select: { name: true, email: true }
        },
        vehicle: true,
        breaks: {
          orderBy: { startTime: 'desc' }
        }
      },
      orderBy: { startTime: 'desc' },
      take: parseInt(limit)
    });

    res.json(sessions);
  } catch (error) {
    console.error('Get admin work sessions error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// =============================================================================
// LOCATION ROUTES
// =============================================================================

// Update location
app.post('/api/location', authenticateToken, async (req, res) => {
  try {
    const { latitude, longitude, accuracy, address, workSessionId } = req.body;

    const location = await prisma.location.create({
      data: {
        userId: req.user.id,
        workSessionId: workSessionId || null,
        latitude,
        longitude,
        accuracy,
        address
      }
    });

    res.json(location);
  } catch (error) {
    console.error('Update location error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get current locations (admin only)
app.get('/api/admin/locations', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const locations = await prisma.location.findMany({
      where: { isActive: true },
      include: {
        user: {
          select: { name: true, email: true }
        }
      },
      orderBy: { timestamp: 'desc' }
    });

    // Group by user to get latest location for each
    const userLocations = {};
    locations.forEach(location => {
      if (!userLocations[location.userId] || 
          location.timestamp > userLocations[location.userId].timestamp) {
        userLocations[location.userId] = location;
      }
    });

    res.json(Object.values(userLocations));
  } catch (error) {
    console.error('Get locations error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// =============================================================================
// STATISTICS ROUTES
// =============================================================================

// Get user statistics
app.get('/api/stats/user', authenticateToken, async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    
    const where = { userId: req.user.id };
    
    if (startDate && endDate) {
      where.startTime = {
        gte: new Date(startDate),
        lte: new Date(endDate)
      };
    }

    const sessions = await prisma.workSession.findMany({
      where,
      select: {
        startTime: true,
        endTime: true,
        totalHours: true,
        breakDuration: true,
        kilometers: true
      }
    });

    const totalHours = sessions.reduce((sum, session) => {
      return sum + (session.totalHours || 0);
    }, 0);

    const totalBreakHours = sessions.reduce((sum, session) => {
      return sum + (session.breakDuration || 0) / 60;
    }, 0);

    const totalKilometers = sessions.reduce((sum, session) => {
      return sum + (session.kilometers || 0);
    }, 0);

    const today = new Date();
    const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

    const todaySessions = sessions.filter(s => s.startTime >= startOfDay);
    const monthSessions = sessions.filter(s => s.startTime >= startOfMonth);

    const todayHours = todaySessions.reduce((sum, session) => {
      return sum + (session.totalHours || 0);
    }, 0);

    const monthHours = monthSessions.reduce((sum, session) => {
      return sum + (session.totalHours || 0);
    }, 0);

    res.json({
      totalHours,
      totalBreakHours,
      totalKilometers,
      todayHours,
      monthHours,
      totalSessions: sessions.length
    });
  } catch (error) {
    console.error('Get user stats error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get admin statistics
app.get('/api/admin/stats', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    
    const where = {};
    
    if (startDate && endDate) {
      where.startTime = {
        gte: new Date(startDate),
        lte: new Date(endDate)
      };
    }

    const sessions = await prisma.workSession.findMany({
      where,
      include: {
        user: {
          select: { name: true, email: true }
        }
      }
    });

    const users = await prisma.user.count({
      where: { isActive: true, role: 'EMPLOYEE' }
    });

    const totalHours = sessions.reduce((sum, session) => {
      return sum + (session.totalHours || 0);
    }, 0);

    const totalKilometers = sessions.reduce((sum, session) => {
      return sum + (session.kilometers || 0);
    }, 0);

    const activeSessions = sessions.filter(s => s.status === 'ACTIVE').length;

    res.json({
      totalHours,
      totalKilometers,
      totalSessions: sessions.length,
      activeSessions,
      totalUsers: users
    });
  } catch (error) {
    console.error('Get admin stats error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// =============================================================================
// HEALTH CHECK
// =============================================================================

app.get('/api/health', async (req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.json({ status: 'OK', database: 'Connected' });
  } catch (error) {
    res.status(500).json({ status: 'ERROR', database: 'Disconnected' });
  }
});

// =============================================================================
// ERROR HANDLING
// =============================================================================

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something broke!' });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// =============================================================================
// START SERVER
// =============================================================================

app.listen(PORT, () => {
  console.log(`🚀 FENIX Construction Tracker API running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
  console.log(`🔧 Prisma Studio: npx prisma studio`);
});

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('\n🛑 Shutting down gracefully...');
  await prisma.$disconnect();
  process.exit(0);
}); 