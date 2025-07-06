const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // Clear existing data
  console.log('🧹 Clearing existing data...');
  await prisma.break.deleteMany();
  await prisma.location.deleteMany();
  await prisma.workSession.deleteMany();
  await prisma.vehicle.deleteMany();
  await prisma.user.deleteMany();

  // Create admin user
  console.log('👤 Creating admin user...');
  const adminPassword = await bcrypt.hash('admin123', 10);
  const admin = await prisma.user.create({
    data: {
      email: 'kango@fenix.com',
      name: 'Admin',
      password: adminPassword,
      role: 'ADMIN'
    }
  });

  // Create employee users
  console.log('👷 Creating employee users...');
  const employeePassword = await bcrypt.hash('admin123', 10);
  
  const employees = await Promise.all([
    prisma.user.create({
      data: {
        email: 'petre@fenix.com',
        name: 'Petre',
        password: employeePassword,
        role: 'EMPLOYEE'
      }
    }),
    prisma.user.create({
      data: {
        email: 'ilija@fenix.com',
        name: 'Ilija',
        password: employeePassword,
        role: 'EMPLOYEE'
      }
    }),
    prisma.user.create({
      data: {
        email: 'vojne@fenix.com',
        name: 'Vojne',
        password: employeePassword,
        role: 'EMPLOYEE'
      }
    }),
    prisma.user.create({
      data: {
        email: 'dragan@fenix.com',
        name: 'Dragan',
        password: employeePassword,
        role: 'EMPLOYEE'
      }
    }),
    prisma.user.create({
      data: {
        email: 'tino@fenix.com',
        name: 'Tino',
        password: employeePassword,
        role: 'EMPLOYEE'
      }
    }),
    prisma.user.create({
      data: {
        email: 'vane@fenix.com',
        name: 'Vane',
        password: employeePassword,
        role: 'EMPLOYEE'
      }
    })
  ]);

  // Create vehicles
  console.log('🚗 Creating vehicles...');
  const vehicles = await Promise.all([
    prisma.vehicle.create({
      data: {
        name: 'Le Bus na pero',
        plate: 'ABC-123',
        type: 'VAN'
      }
    }),
    prisma.vehicle.create({
      data: {
        name: 'Le Bus na pero',
        plate: 'DEF-456',
        type: 'VAN'
      }
    }),
    prisma.vehicle.create({
      data: {
        name: 'Truck #1',
        plate: 'GHI-789',
        type: 'TRUCK'
      }
    }),
    prisma.vehicle.create({
      data: {
        name: 'Le Bus na pero',
        plate: 'XYZ-999',
        type: 'VAN'
      }
    }),
    prisma.vehicle.create({
      data: {
        name: 'Personal Car',
        plate: 'Own Vehicle',
        type: 'CAR'
      }
    })
  ]);

  // Create sample work sessions
  console.log('📊 Creating sample work sessions...');
  const now = new Date();
  const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);
  const lastWeek = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

  // Sample work sessions for each employee
  for (let i = 0; i < employees.length; i++) {
    const employee = employees[i];
    const vehicle = vehicles[i % vehicles.length];

    // Create a completed session from yesterday
    const session1 = await prisma.workSession.create({
      data: {
        userId: employee.id,
        vehicleId: vehicle.id,
        startTime: new Date(yesterday.getTime() + 8 * 60 * 60 * 1000), // 8 AM
        endTime: new Date(yesterday.getTime() + 17 * 60 * 60 * 1000), // 5 PM
        startLocation: { latitude: 41.9981, longitude: 21.4254 }, // Skopje coordinates
        endLocation: { latitude: 41.9981, longitude: 21.4254 },
        workDescription: 'Construction work at site A',
        startKilometers: 125000.5,
        endKilometers: 125045.2,
        totalKilometers: 44.7,
        status: 'COMPLETED',
        totalHours: 8.5,
        breakDuration: 60 // 1 hour break
      }
    });

    // Create a break for the session
    await prisma.break.create({
      data: {
        workSessionId: session1.id,
        startTime: new Date(yesterday.getTime() + 12 * 60 * 60 * 1000), // 12 PM
        endTime: new Date(yesterday.getTime() + 13 * 60 * 60 * 1000), // 1 PM
        duration: 60,
        reason: 'Lunch break'
      }
    });

    // Create an active session for today
    const session2 = await prisma.workSession.create({
      data: {
        userId: employee.id,
        vehicleId: vehicle.id,
        startTime: new Date(now.getTime() - 2 * 60 * 60 * 1000), // 2 hours ago
        startLocation: { latitude: 41.9981, longitude: 21.4254 },
        workDescription: 'Ongoing construction work',
        startKilometers: 125100.0,
        status: 'ACTIVE'
      }
    });

    // Create some location data
    await Promise.all([
      prisma.location.create({
        data: {
          userId: employee.id,
          workSessionId: session1.id,
          latitude: 41.9981,
          longitude: 21.4254,
          accuracy: 10.0,
          address: 'Skopje, Macedonia',
          timestamp: new Date(yesterday.getTime() + 8 * 60 * 60 * 1000)
        }
      }),
      prisma.location.create({
        data: {
          userId: employee.id,
          workSessionId: session2.id,
          latitude: 41.9981,
          longitude: 21.4254,
          accuracy: 10.0,
          address: 'Skopje, Macedonia',
          timestamp: new Date(now.getTime() - 30 * 60 * 1000) // 30 minutes ago
        }
      })
    ]);

    // Create a session from last week
    await prisma.workSession.create({
      data: {
        userId: employee.id,
        vehicleId: vehicle.id,
        startTime: new Date(lastWeek.getTime() + 9 * 60 * 60 * 1000), // 9 AM
        endTime: new Date(lastWeek.getTime() + 18 * 60 * 60 * 1000), // 6 PM
        startLocation: { latitude: 41.9981, longitude: 21.4254 },
        endLocation: { latitude: 41.9981, longitude: 21.4254 },
        workDescription: 'Site preparation and foundation work',
        startKilometers: 124950.0,
        endKilometers: 124980.5,
        totalKilometers: 30.5,
        status: 'COMPLETED',
        totalHours: 8.0,
        breakDuration: 45
      }
    });
  }

  // Create system settings
  console.log('⚙️ Creating system settings...');
  await prisma.systemSetting.createMany({
    data: [
      {
        key: 'company_name',
        value: 'FENIX Construction',
        description: 'Company name for the application'
      },
      {
        key: 'max_work_hours',
        value: '24',
        description: 'Maximum work hours per day'
      },
      {
        key: 'break_duration',
        value: '30',
        description: 'Default break duration in minutes'
      },
      {
        key: 'location_update_interval',
        value: '600000',
        description: 'Location update interval in milliseconds'
      }
    ]
  });

  console.log('✅ Database seeding completed successfully!');
  console.log('\n📋 Created:');
  console.log(`- 1 Admin user (kango@fenix.com / admin123)`);
  console.log(`- ${employees.length} Employee users (email@fenix.com / admin123)`);
  console.log(`- ${vehicles.length} Vehicles`);
  console.log(`- Sample work sessions and location data`);
  console.log(`- System settings`);
  
  console.log('\n🔗 API Endpoints:');
  console.log(`- Health check: http://localhost:${process.env.PORT || 5000}/api/health`);
  console.log(`- Login: POST http://localhost:${process.env.PORT || 5000}/api/auth/login`);
  console.log(`- Work sessions: GET http://localhost:${process.env.PORT || 5000}/api/work-sessions`);
  
  console.log('\n🚀 Next steps:');
  console.log('1. Start the server: npm run server');
  console.log('2. Start the React app: npm start');
  console.log('3. Or run both: npm run dev');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 