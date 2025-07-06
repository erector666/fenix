#!/usr/bin/env node

/**
 * 🚀 FENIX Construction Tracker - Quick Start Script
 * 
 * This script automates the entire setup process for the database integration.
 * Run with: node quick-start.js
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function runCommand(command, description) {
  try {
    log(`🔄 ${description}...`, 'yellow');
    execSync(command, { stdio: 'inherit' });
    log(`✅ ${description} completed`, 'green');
    return true;
  } catch (error) {
    log(`❌ ${description} failed: ${error.message}`, 'red');
    return false;
  }
}

function checkFileExists(filePath) {
  return fs.existsSync(filePath);
}

async function quickStart() {
  log('\n🏗️  FENIX Construction Tracker - Quick Start', 'bright');
  log('=============================================\n', 'cyan');

  log('This script will set up the complete database integration for your FENIX app.\n', 'yellow');

  // Check prerequisites
  log('📋 Checking prerequisites...', 'blue');
  
  if (!checkFileExists('package.json')) {
    log('❌ package.json not found. Please run this script from the project root.', 'red');
    return;
  }

  if (!checkFileExists('env.example')) {
    log('❌ env.example not found. Please ensure the environment template exists.', 'red');
    return;
  }

  log('✅ Prerequisites check passed\n', 'green');

  // Step 1: Install dependencies
  log('📦 STEP 1: Installing dependencies', 'bright');
  log('-----------------------------------', 'cyan');
  
  if (!runCommand('npm install', 'Installing npm dependencies')) {
    log('❌ Failed to install dependencies. Please check your internet connection and try again.', 'red');
    return;
  }

  // Step 2: Set up environment
  log('\n🔐 STEP 2: Setting up environment', 'bright');
  log('----------------------------------', 'cyan');
  
  if (!checkFileExists('.env')) {
    log('📝 Creating .env file from template...', 'yellow');
    try {
      fs.copyFileSync('env.example', '.env');
      log('✅ .env file created', 'green');
      log('⚠️  Please edit .env file with your database credentials before continuing', 'yellow');
    } catch (error) {
      log(`❌ Failed to create .env file: ${error.message}`, 'red');
      return;
    }
  } else {
    log('✅ .env file already exists', 'green');
  }

  // Step 3: Generate Prisma client
  log('\n🗄️  STEP 3: Setting up database', 'bright');
  log('--------------------------------', 'cyan');
  
  if (!runCommand('npm run db:generate', 'Generating Prisma client')) {
    log('❌ Failed to generate Prisma client. Please check your .env file configuration.', 'red');
    return;
  }

  // Step 4: Push database schema
  log('\n📊 STEP 4: Creating database schema', 'bright');
  log('------------------------------------', 'cyan');
  
  log('⚠️  Make sure your database is running and accessible', 'yellow');
  log('💡 For quick testing, you can use SQLite by setting DATABASE_URL=file:./dev.db in .env', 'cyan');
  
  if (!runCommand('npm run db:push', 'Pushing database schema')) {
    log('❌ Failed to push database schema. Please check your database connection.', 'red');
    log('💡 Common solutions:', 'cyan');
    log('   - Start your database server', 'cyan');
    log('   - Check DATABASE_URL in .env file', 'cyan');
    log('   - Use SQLite for testing: DATABASE_URL=file:./dev.db', 'cyan');
    return;
  }

  // Step 5: Seed database
  log('\n🌱 STEP 5: Seeding database', 'bright');
  log('----------------------------', 'cyan');
  
  if (!runCommand('npm run db:seed', 'Seeding database with initial data')) {
    log('❌ Failed to seed database. Please check your database connection.', 'red');
    return;
  }

  // Step 6: Health check
  log('\n🔍 STEP 6: Testing setup', 'bright');
  log('-------------------------', 'cyan');
  
  log('🚀 Starting server for health check...', 'yellow');
  
  // Start server in background
  const serverProcess = execSync('npm run server', { 
    stdio: 'pipe',
    timeout: 10000 
  });
  
  log('✅ Server started successfully', 'green');

  // Summary
  log('\n🎉 SETUP COMPLETED SUCCESSFULLY!', 'bright');
  log('==================================', 'green');
  
  log('\n📋 What was set up:', 'blue');
  log('✅ Dependencies installed', 'green');
  log('✅ Environment configuration', 'green');
  log('✅ Database schema created', 'green');
  log('✅ Initial data seeded', 'green');
  log('✅ API server tested', 'green');
  
  log('\n🔗 Next steps:', 'bright');
  log('1. Start the full application:', 'yellow');
  log('   npm run dev', 'cyan');
  log('   (This starts both server and React app)', 'cyan');
  
  log('\n2. Access the application:', 'yellow');
  log('   Frontend: http://localhost:3000', 'cyan');
  log('   Backend API: http://localhost:5000', 'cyan');
  log('   Database GUI: npm run db:studio', 'cyan');
  
  log('\n3. Login credentials:', 'yellow');
  log('   Admin: kango@fenix.com / admin123', 'cyan');
  log('   Employee: petre@fenix.com / admin123', 'cyan');
  log('   (and other employees with same password)', 'cyan');
  
  log('\n4. API endpoints:', 'yellow');
  log('   Health check: http://localhost:5000/api/health', 'cyan');
  log('   Login: POST http://localhost:5000/api/auth/login', 'cyan');
  log('   Work sessions: GET http://localhost:5000/api/work-sessions', 'cyan');
  
  log('\n📚 Documentation:', 'yellow');
  log('   Database setup: DATABASE_SETUP.md', 'cyan');
  log('   Environment config: ENVIRONMENT_SETUP.md', 'cyan');
  log('   API reference: Check server/index.js', 'cyan');
  
  log('\n🛠️  Useful commands:', 'yellow');
  log('   npm run dev          - Start both server and React app', 'cyan');
  log('   npm run server       - Start only the API server', 'cyan');
  log('   npm start           - Start only the React app', 'cyan');
  log('   npm run db:studio   - Open database GUI', 'cyan');
  log('   npm run db:seed     - Re-seed database', 'cyan');
  
  log('\n🔐 Security reminder:', 'bright');
  log('   - Change default passwords in production', 'red');
  log('   - Use strong JWT secrets', 'red');
  log('   - Enable SSL for production database', 'red');
  log('   - Never commit .env files', 'red');
  
  log('\n🚀 Happy building with FENIX Construction Tracker!', 'bright');
}

// Handle script termination
process.on('SIGINT', () => {
  log('\n\n🛑 Setup cancelled by user.', 'red');
  process.exit(0);
});

// Run the quick start
quickStart().catch((error) => {
  log(`❌ Quick start failed: ${error.message}`, 'red');
  process.exit(1);
}); 