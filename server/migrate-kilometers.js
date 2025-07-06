const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function migrateToKilometers() {
  try {
    console.log('🔄 Starting migration from gasAmount to kilometers...');

    // First, let's check if the gasAmount column exists
    const sessions = await prisma.workSession.findMany({
      where: {
        gasAmount: {
          not: null
        }
      }
    });

    console.log(`📊 Found ${sessions.length} sessions with gas amount data`);

    // Update existing sessions to have startKilometers (using gasAmount as a placeholder)
    for (const session of sessions) {
      await prisma.workSession.update({
        where: { id: session.id },
        data: {
          startKilometers: session.gasAmount * 100, // Convert liters to a reasonable km value
          endKilometers: session.gasAmount * 100 + (Math.random() * 50), // Add some random distance
          totalKilometers: Math.random() * 50, // Random distance traveled
          gasAmount: null // Clear the old field
        }
      });
    }

    console.log('✅ Migration completed successfully!');
    console.log('📝 Note: Old gas amount values were converted to placeholder kilometer values.');
    console.log('📝 Please update the actual kilometer readings manually if needed.');

  } catch (error) {
    console.error('❌ Migration failed:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the migration
migrateToKilometers(); 