const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const prisma = new PrismaClient();

// Sample localStorage data structure (for reference)
const sampleLocalStorageData = {
  employees: [
    { id: 1, name: 'Petre', email: 'petre@fenix.com', password: 'admin123' },
    { id: 2, name: 'Ilija', email: 'ilija@fenix.com', password: 'admin123' },
    // ... more employees
  ],
  workLogs: [
    {
      id: 1234567890,
      employeeId: 1,
      employeeName: 'Petre',
      startTime: '2024-01-15T08:00:00.000Z',
      endTime: '2024-01-15T17:00:00.000Z',
      startLocation: { latitude: 41.9981, longitude: 21.4254 },
      endLocation: { latitude: 41.9981, longitude: 21.4254 },
      vehicle: { id: 1, name: 'Van #1', plate: 'ABC-123' },
      gasAmount: 25.5,
      workDescription: 'Construction work',
      status: 'COMPLETED',
      totalHours: 8.5,
      breakDuration: 60
    }
    // ... more work logs
  ],
  vehicles: [
    { id: 1, name: 'Van #1', plate: 'ABC-123' },
    { id: 2, name: 'Van #2', plate: 'DEF-456' },
    // ... more vehicles
  ]
};

async function migrateFromLocalStorage(localStorageData) {
  console.log('🔄 Starting localStorage to database migration...');

  try {
    // Clear existing data (optional - comment out if you want to keep existing data)
    console.log('🧹 Clearing existing data...');
    await prisma.break.deleteMany();
    await prisma.location.deleteMany();
    await prisma.workSession.deleteMany();
    await prisma.vehicle.deleteMany();
    await prisma.user.deleteMany();

    // Migrate vehicles
    console.log('🚗 Migrating vehicles...');
    const vehicleMap = new Map(); // To map old IDs to new IDs
    
    for (const vehicle of localStorageData.vehicles || []) {
      const newVehicle = await prisma.vehicle.create({
        data: {
          name: vehicle.name,
          plate: vehicle.plate,
          type: getVehicleType(vehicle.name),
          isActive: true
        }
      });
      vehicleMap.set(vehicle.id, newVehicle.id);
      console.log(`  ✓ Migrated vehicle: ${vehicle.name}`);
    }

    // Migrate users/employees
    console.log('👷 Migrating users...');
    const userMap = new Map(); // To map old IDs to new IDs
    
    for (const employee of localStorageData.employees || []) {
      const hashedPassword = await bcrypt.hash(employee.password, 10);
      const newUser = await prisma.user.create({
        data: {
          email: employee.email,
          name: employee.name,
          password: hashedPassword,
          role: 'EMPLOYEE',
          isActive: true
        }
      });
      userMap.set(employee.id, newUser.id);
      console.log(`  ✓ Migrated user: ${employee.name}`);
    }

    // Create admin user if not exists
    const adminExists = await prisma.user.findUnique({
      where: { email: 'kango@fenix.com' }
    });

    if (!adminExists) {
      const adminPassword = await bcrypt.hash('admin123', 10);
      await prisma.user.create({
        data: {
          email: 'kango@fenix.com',
          name: 'Admin',
          password: adminPassword,
          role: 'ADMIN'
        }
      });
      console.log('  ✓ Created admin user: kango@fenix.com');
    }

    // Migrate work sessions
    console.log('📊 Migrating work sessions...');
    let migratedSessions = 0;
    let skippedSessions = 0;

    for (const workLog of localStorageData.workLogs || []) {
      try {
        const userId = userMap.get(workLog.employeeId);
        const vehicleId = workLog.vehicle ? vehicleMap.get(workLog.vehicle.id) : null;

        if (!userId) {
          console.log(`  ⚠️  Skipping work session: User ID ${workLog.employeeId} not found`);
          skippedSessions++;
          continue;
        }

        const sessionData = {
          userId: userId,
          vehicleId: vehicleId,
          startTime: new Date(workLog.startTime),
          startLocation: workLog.startLocation,
          workDescription: workLog.workDescription || '',
          gasAmount: workLog.gasAmount || 0,
          status: getSessionStatus(workLog.status),
          breakDuration: workLog.breakDuration || 0
        };

        // Add end time and location if session is completed
        if (workLog.endTime) {
          sessionData.endTime = new Date(workLog.endTime);
          sessionData.endLocation = workLog.endLocation;
          sessionData.totalHours = workLog.totalHours;
        }

        const newSession = await prisma.workSession.create({
          data: sessionData
        });

        // Create location records for the session
        if (workLog.startLocation) {
          await prisma.location.create({
            data: {
              userId: userId,
              workSessionId: newSession.id,
              latitude: workLog.startLocation.latitude,
              longitude: workLog.startLocation.longitude,
              accuracy: 10.0,
              address: 'Migrated from localStorage',
              timestamp: new Date(workLog.startTime)
            }
          });
        }

        if (workLog.endLocation && workLog.endTime) {
          await prisma.location.create({
            data: {
              userId: userId,
              workSessionId: newSession.id,
              latitude: workLog.endLocation.latitude,
              longitude: workLog.endLocation.longitude,
              accuracy: 10.0,
              address: 'Migrated from localStorage',
              timestamp: new Date(workLog.endTime)
            }
          });
        }

        migratedSessions++;
        console.log(`  ✓ Migrated work session: ${workLog.employeeName} - ${workLog.startTime.split('T')[0]}`);
      } catch (error) {
        console.error(`  ❌ Error migrating work session:`, error.message);
        skippedSessions++;
      }
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
        },
        {
          key: 'migration_date',
          value: new Date().toISOString(),
          description: 'Date when data was migrated from localStorage'
        }
      ],
      skipDuplicates: true
    });

    console.log('\n✅ Migration completed successfully!');
    console.log('\n📊 Migration Summary:');
    console.log(`- Vehicles migrated: ${vehicleMap.size}`);
    console.log(`- Users migrated: ${userMap.size}`);
    console.log(`- Work sessions migrated: ${migratedSessions}`);
    console.log(`- Work sessions skipped: ${skippedSessions}`);
    
    console.log('\n🔗 Next steps:');
    console.log('1. Start the server: npm run server');
    console.log('2. Start the React app: npm start');
    console.log('3. Test login with migrated credentials');
    console.log('4. Verify data in Prisma Studio: npm run db:studio');

  } catch (error) {
    console.error('❌ Migration failed:', error);
    throw error;
  }
}

// Helper functions
function getVehicleType(vehicleName) {
  const name = vehicleName.toLowerCase();
  if (name.includes('van')) return 'VAN';
  if (name.includes('truck')) return 'TRUCK';
  if (name.includes('car')) return 'CAR';
  if (name.includes('motorcycle')) return 'MOTORCYCLE';
  return 'OTHER';
}

function getSessionStatus(status) {
  switch (status?.toUpperCase()) {
    case 'ACTIVE':
      return 'ACTIVE';
    case 'PAUSED':
      return 'PAUSED';
    case 'COMPLETED':
      return 'COMPLETED';
    case 'CANCELLED':
      return 'CANCELLED';
    default:
      return 'COMPLETED'; // Default for old data
  }
}

// Export for use in other scripts
module.exports = { migrateFromLocalStorage };

// Run migration if this script is executed directly
if (require.main === module) {
  console.log('🔄 FENIX Construction Tracker - localStorage Migration Tool');
  console.log('==========================================================\n');
  
  console.log('📋 This tool helps migrate data from localStorage to the database.');
  console.log('⚠️  Make sure to backup your localStorage data before running this script.\n');
  
  console.log('📝 To use this script:');
  console.log('1. Export your localStorage data to a JSON file');
  console.log('2. Update the sampleLocalStorageData object in this script');
  console.log('3. Run: node server/migrate-localStorage.js\n');
  
  console.log('💡 Example localStorage export:');
  console.log('```javascript');
  console.log('const data = {');
  console.log('  employees: JSON.parse(localStorage.getItem("employees") || "[]"),');
  console.log('  workLogs: JSON.parse(localStorage.getItem("workLogs") || "[]"),');
  console.log('  vehicles: JSON.parse(localStorage.getItem("vehicles") || "[]")');
  console.log('};');
  console.log('console.log(JSON.stringify(data, null, 2));');
  console.log('```\n');

  // Uncomment the line below and update with your actual localStorage data
  // migrateFromLocalStorage(sampleLocalStorageData);
  
  console.log('🔧 To run the migration:');
  console.log('1. Edit this file and replace sampleLocalStorageData with your actual data');
  console.log('2. Uncomment the migrateFromLocalStorage() call at the bottom');
  console.log('3. Run: node server/migrate-localStorage.js');
} 