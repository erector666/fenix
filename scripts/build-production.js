#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Starting production build...\n');

// Colors for console output
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function runCommand(command, description) {
  try {
    log(`📋 ${description}...`, 'blue');
    execSync(command, { stdio: 'inherit' });
    log(`✅ ${description} completed`, 'green');
    return true;
  } catch (error) {
    log(`❌ ${description} failed: ${error.message}`, 'red');
    return false;
  }
}

// Check if .env file exists
if (!fs.existsSync('.env')) {
  log('⚠️  .env file not found. Please run "npm run setup-env" first.', 'yellow');
  process.exit(1);
}

// Production build steps
const buildSteps = [
  {
    command: 'npm run db:generate',
    description: 'Generating Prisma client'
  },
  {
    command: 'npm run build',
    description: 'Building React application'
  },
  {
    command: 'npm run test',
    description: 'Running tests'
  }
];

// Execute build steps
let allStepsPassed = true;

for (const step of buildSteps) {
  if (!runCommand(step.command, step.description)) {
    allStepsPassed = false;
    break;
  }
}

if (allStepsPassed) {
  log('\n🎉 Production build completed successfully!', 'green');
  log('\n📦 Build artifacts:', 'blue');
  log('   - Frontend: ./build/', 'reset');
  log('   - Backend: ./server/', 'reset');
  log('   - Database: ./prisma/', 'reset');
  
  log('\n🚀 Next steps:', 'blue');
  log('   1. Deploy backend: npm run deploy:web', 'reset');
  log('   2. Deploy frontend: Upload ./build/ to your hosting provider', 'reset');
  log('   3. Build Android: npm run build:android:release', 'reset');
  
  log('\n📋 Deployment options:', 'blue');
  log('   - Web: See DEPLOYMENT.md for detailed instructions', 'reset');
  log('   - Android: See ANDROID_README.md for APK building', 'reset');
  
} else {
  log('\n❌ Production build failed. Please fix the errors above.', 'red');
  process.exit(1);
} 