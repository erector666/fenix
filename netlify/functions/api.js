const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient();

exports.handler = async (event, context) => {
  // Handle CORS
  const headers = {
    'Access-Control-Allow-Origin': process.env.URL || 'http://localhost:3000',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Credentials': true
  };

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  const { path, httpMethod, body, headers: requestHeaders } = event;
  const pathSegments = path.replace('/.netlify/functions/api', '').split('/').filter(Boolean);

  try {
    // Health check
    if (pathSegments[0] === 'health') {
      await prisma.$queryRaw`SELECT 1`;
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ status: 'OK', database: 'Connected' })
      };
    }

    // Authentication routes
    if (pathSegments[0] === 'auth') {
      if (pathSegments[1] === 'login' && httpMethod === 'POST') {
        const { email, password } = JSON.parse(body);
        
        const user = await prisma.user.findUnique({
          where: { email }
        });

        if (!user || !(await bcrypt.compare(password, user.password))) {
          return {
            statusCode: 401,
            headers,
            body: JSON.stringify({ error: 'Invalid credentials' })
          };
        }

        const token = jwt.sign(
          { userId: user.id, email: user.email, role: user.role },
          process.env.JWT_SECRET,
          { expiresIn: '24h' }
        );

        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({
            token,
            user: {
              id: user.id,
              email: user.email,
              name: user.name,
              role: user.role
            }
          })
        };
      }
    }

    // Protected routes
    if (pathSegments[0] === 'users') {
      if (!requestHeaders.authorization) {
        return {
          statusCode: 401,
          headers,
          body: JSON.stringify({ error: 'Authentication required' })
        };
      }

      // Verify token
      const token = requestHeaders.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      if (pathSegments[1] === 'me' && httpMethod === 'GET') {
        const user = await prisma.user.findUnique({
          where: { id: decoded.userId }
        });

        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role
          })
        };
      }

      if (httpMethod === 'GET') {
        const users = await prisma.user.findMany({
          select: {
            id: true,
            email: true,
            name: true,
            role: true,
            isActive: true,
            createdAt: true
          }
        });

        return {
          statusCode: 200,
          headers,
          body: JSON.stringify(users)
        };
      }
    }

    // Work sessions routes
    if (pathSegments[0] === 'work-sessions') {
      if (!requestHeaders.authorization) {
        return {
          statusCode: 401,
          headers,
          body: JSON.stringify({ error: 'Authentication required' })
        };
      }

      const token = requestHeaders.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      if (pathSegments[1] === 'start' && httpMethod === 'POST') {
        const sessionData = JSON.parse(body);
        
        const session = await prisma.workSession.create({
          data: {
            userId: decoded.userId,
            vehicleId: sessionData.vehicleId,
            startTime: new Date(),
            startLocation: sessionData.startLocation,
            workDescription: sessionData.workDescription,
            startKilometers: sessionData.startKilometers,
            status: 'ACTIVE'
          },
          include: {
            user: true,
            vehicle: true
          }
        });

        return {
          statusCode: 201,
          headers,
          body: JSON.stringify(session)
        };
      }

      if (pathSegments[2] === 'end' && httpMethod === 'PUT') {
        const sessionId = parseInt(pathSegments[1]);
        const endData = JSON.parse(body);

        const session = await prisma.workSession.update({
          where: { id: sessionId },
          data: {
            endTime: new Date(),
            endLocation: endData.endLocation,
            endKilometers: endData.endKilometers,
            totalKilometers: endData.totalKilometers,
            status: 'COMPLETED',
            totalHours: endData.totalHours
          },
          include: {
            user: true,
            vehicle: true
          }
        });

        return {
          statusCode: 200,
          headers,
          body: JSON.stringify(session)
        };
      }

      if (httpMethod === 'GET') {
        const sessions = await prisma.workSession.findMany({
          where: {
            userId: decoded.userId
          },
          include: {
            user: true,
            vehicle: true,
            breaks: true
          },
          orderBy: {
            startTime: 'desc'
          }
        });

        return {
          statusCode: 200,
          headers,
          body: JSON.stringify(sessions)
        };
      }
    }

    // Vehicles routes
    if (pathSegments[0] === 'vehicles') {
      if (httpMethod === 'GET') {
        const vehicles = await prisma.vehicle.findMany({
          where: { isActive: true }
        });

        return {
          statusCode: 200,
          headers,
          body: JSON.stringify(vehicles)
        };
      }
    }

    // Location routes
    if (pathSegments[0] === 'location') {
      if (!requestHeaders.authorization) {
        return {
          statusCode: 401,
          headers,
          body: JSON.stringify({ error: 'Authentication required' })
        };
      }

      const token = requestHeaders.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      if (httpMethod === 'POST') {
        const locationData = JSON.parse(body);

        const location = await prisma.location.create({
          data: {
            userId: decoded.userId,
            workSessionId: locationData.workSessionId,
            latitude: locationData.latitude,
            longitude: locationData.longitude,
            accuracy: locationData.accuracy,
            address: locationData.address
          }
        });

        return {
          statusCode: 201,
          headers,
          body: JSON.stringify(location)
        };
      }
    }

    // Default response
    return {
      statusCode: 404,
      headers,
      body: JSON.stringify({ error: 'Endpoint not found' })
    };

  } catch (error) {
    console.error('API Error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Internal server error' })
    };
  } finally {
    await prisma.$disconnect();
  }
}; 