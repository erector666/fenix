#!/usr/bin/env node

/**
 * 🏗️ FENIX Construction Tracker - Environment Setup Script
 * 
 * This script helps you set up your environment variables interactively.
 * Run with: node setup-env.js
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

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

function question(prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, resolve);
  });
}

async function setupEnvironment() {
  log('\n🏗️  FENIX Construction Tracker - Environment Setup', 'bright');
  log('==================================================\n', 'cyan');

  log('This script will help you create your .env file with all necessary configuration.\n', 'yellow');

  // Check if .env already exists
  if (fs.existsSync('.env')) {
    const overwrite = await question('⚠️  .env file already exists. Overwrite? (y/N): ');
    if (overwrite.toLowerCase() !== 'y') {
      log('Setup cancelled.', 'red');
      rl.close();
      return;
    }
  }

  // Check if env.example exists
  if (!fs.existsSync('env.example')) {
    log('❌ env.example file not found. Please ensure it exists in the project root.', 'red');
    rl.close();
    return;
  }

  let envContent = fs.readFileSync('env.example', 'utf8');

  log('📋 Let\'s configure your environment variables:\n', 'blue');

  // Application Configuration
  log('🌐 APPLICATION CONFIGURATION', 'bright');
  log('----------------------------', 'cyan');
  
  const nodeEnv = await question(`Environment (development/production) [development]: `) || 'development';
  const port = await question(`Port [3000]: `) || '3000';
  
  envContent = envContent.replace('NODE_ENV=development', `NODE_ENV=${nodeEnv}`);
  envContent = envContent.replace('PORT=3000', `PORT=${port}`);

  // Database Configuration
  log('\n🗄️  DATABASE CONFIGURATION', 'bright');
  log('------------------------', 'cyan');
  
  const dbChoice = await question('Choose database (firebase/mongodb/postgresql/mysql) [firebase]: ') || 'firebase';
  
  if (dbChoice === 'firebase') {
    log('\n🔥 FIREBASE SETUP', 'yellow');
    log('You\'ll need to create a Firebase project at: https://console.firebase.google.com/');
    
    const firebaseApiKey = await question('Firebase API Key: ');
    const firebaseProjectId = await question('Firebase Project ID: ');
    const firebaseAuthDomain = await question('Firebase Auth Domain: ');
    const firebaseStorageBucket = await question('Firebase Storage Bucket: ');
    const firebaseMessagingSenderId = await question('Firebase Messaging Sender ID: ');
    const firebaseAppId = await question('Firebase App ID: ');
    
    envContent = envContent.replace('FIREBASE_API_KEY=your_firebase_api_key_here', `FIREBASE_API_KEY=${firebaseApiKey}`);
    envContent = envContent.replace('FIREBASE_PROJECT_ID=your_project_id', `FIREBASE_PROJECT_ID=${firebaseProjectId}`);
    envContent = envContent.replace('FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com', `FIREBASE_AUTH_DOMAIN=${firebaseAuthDomain}`);
    envContent = envContent.replace('FIREBASE_STORAGE_BUCKET=your_project.appspot.com', `FIREBASE_STORAGE_BUCKET=${firebaseStorageBucket}`);
    envContent = envContent.replace('FIREBASE_MESSAGING_SENDER_ID=123456789', `FIREBASE_MESSAGING_SENDER_ID=${firebaseMessagingSenderId}`);
    envContent = envContent.replace('FIREBASE_APP_ID=your_app_id_here', `FIREBASE_APP_ID=${firebaseAppId}`);
    
  } else if (dbChoice === 'mongodb') {
    log('\n🍃 MONGODB SETUP', 'yellow');
    
    const mongoUri = await question('MongoDB URI [mongodb://localhost:27017/fenix_construction]: ') || 'mongodb://localhost:27017/fenix_construction';
    const mongoUriProd = await question('MongoDB Production URI (optional): ');
    
    envContent = envContent.replace('MONGODB_URI=mongodb://localhost:27017/fenix_construction', `MONGODB_URI=${mongoUri}`);
    if (mongoUriProd) {
      envContent = envContent.replace('MONGODB_URI_PROD=mongodb+srv://username:password@cluster.mongodb.net/fenix_construction', `MONGODB_URI_PROD=${mongoUriProd}`);
    }
    
  } else if (dbChoice === 'postgresql') {
    log('\n🐘 POSTGRESQL SETUP', 'yellow');
    
    const postgresHost = await question('PostgreSQL Host [localhost]: ') || 'localhost';
    const postgresPort = await question('PostgreSQL Port [5432]: ') || '5432';
    const postgresDatabase = await question('PostgreSQL Database [fenix_construction]: ') || 'fenix_construction';
    const postgresUser = await question('PostgreSQL User [fenix_user]: ') || 'fenix_user';
    const postgresPassword = await question('PostgreSQL Password: ');
    
    envContent = envContent.replace('POSTGRES_HOST=localhost', `POSTGRES_HOST=${postgresHost}`);
    envContent = envContent.replace('POSTGRES_PORT=5432', `POSTGRES_PORT=${postgresPort}`);
    envContent = envContent.replace('POSTGRES_DATABASE=fenix_construction', `POSTGRES_DATABASE=${postgresDatabase}`);
    envContent = envContent.replace('POSTGRES_USER=fenix_user', `POSTGRES_USER=${postgresUser}`);
    envContent = envContent.replace('POSTGRES_PASSWORD=your_secure_password', `POSTGRES_PASSWORD=${postgresPassword}`);
  }

  // Google Maps Configuration
  log('\n🗺️  GOOGLE MAPS CONFIGURATION', 'bright');
  log('----------------------------', 'cyan');
  
  const googleMapsApiKey = await question('Google Maps API Key (optional): ');
  if (googleMapsApiKey) {
    envContent = envContent.replace('GOOGLE_MAPS_API_KEY=AIzaSyAuDjIik681kmwRz56jEQULsxmTif_tFHI', `GOOGLE_MAPS_API_KEY=${googleMapsApiKey}`);
  }

  // Security Configuration
  log('\n🔐 SECURITY CONFIGURATION', 'bright');
  log('------------------------', 'cyan');
  
  const generateSecrets = await question('Generate secure JWT secrets automatically? (Y/n): ') || 'y';
  
  if (generateSecrets.toLowerCase() === 'y') {
    const crypto = require('crypto');
    const jwtSecret = crypto.randomBytes(32).toString('hex');
    const jwtRefreshSecret = crypto.randomBytes(32).toString('hex');
    const encryptionKey = crypto.randomBytes(32).toString('hex');
    const encryptionIv = crypto.randomBytes(16).toString('hex');
    
    envContent = envContent.replace('JWT_SECRET=your_super_secret_jwt_key_here', `JWT_SECRET=${jwtSecret}`);
    envContent = envContent.replace('JWT_REFRESH_SECRET=your_refresh_token_secret', `JWT_REFRESH_SECRET=${jwtRefreshSecret}`);
    envContent = envContent.replace('ENCRYPTION_KEY=your_32_character_encryption_key', `ENCRYPTION_KEY=${encryptionKey}`);
    envContent = envContent.replace('ENCRYPTION_IV=your_16_character_iv', `ENCRYPTION_IV=${encryptionIv}`);
    
    log('✅ Secure secrets generated automatically', 'green');
  } else {
    log('⚠️  Please manually update JWT_SECRET, JWT_REFRESH_SECRET, ENCRYPTION_KEY, and ENCRYPTION_IV in your .env file', 'yellow');
  }

  // Optional Services
  log('\n📧 OPTIONAL SERVICES', 'bright');
  log('-------------------', 'cyan');
  
  const setupEmail = await question('Setup email notifications (SendGrid)? (y/N): ') || 'n';
  if (setupEmail.toLowerCase() === 'y') {
    const sendgridApiKey = await question('SendGrid API Key: ');
    const sendgridFromEmail = await question('SendGrid From Email: ');
    
    envContent = envContent.replace('SENDGRID_API_KEY=your_sendgrid_api_key', `SENDGRID_API_KEY=${sendgridApiKey}`);
    envContent = envContent.replace('SENDGRID_FROM_EMAIL=noreply@fenix.com', `SENDGRID_FROM_EMAIL=${sendgridFromEmail}`);
  }

  const setupSMS = await question('Setup SMS notifications (Twilio)? (y/N): ') || 'n';
  if (setupSMS.toLowerCase() === 'y') {
    const twilioAccountSid = await question('Twilio Account SID: ');
    const twilioAuthToken = await question('Twilio Auth Token: ');
    const twilioPhoneNumber = await question('Twilio Phone Number: ');
    
    envContent = envContent.replace('TWILIO_ACCOUNT_SID=your_twilio_account_sid', `TWILIO_ACCOUNT_SID=${twilioAccountSid}`);
    envContent = envContent.replace('TWILIO_AUTH_TOKEN=your_twilio_auth_token', `TWILIO_AUTH_TOKEN=${twilioAuthToken}`);
    envContent = envContent.replace('TWILIO_PHONE_NUMBER=+1234567890', `TWILIO_PHONE_NUMBER=${twilioPhoneNumber}`);
  }

  // Write the .env file
  try {
    fs.writeFileSync('.env', envContent);
    log('\n✅ Environment file created successfully!', 'green');
    log('📁 File: .env', 'cyan');
    
    log('\n📋 Next Steps:', 'bright');
    log('1. Review your .env file to ensure all values are correct', 'yellow');
    log('2. Install dependencies: npm install', 'yellow');
    log('3. Start development server: npm start', 'yellow');
    log('4. For production, set environment variables in your hosting platform', 'yellow');
    
    log('\n🔐 Security Reminder:', 'bright');
    log('- Never commit your .env file to version control', 'red');
    log('- Keep your API keys and secrets secure', 'red');
    log('- Use different keys for development and production', 'red');
    
  } catch (error) {
    log(`❌ Error creating .env file: ${error.message}`, 'red');
  }

  rl.close();
}

// Handle script termination
process.on('SIGINT', () => {
  log('\n\nSetup cancelled.', 'red');
  rl.close();
  process.exit(0);
});

// Run the setup
setupEnvironment().catch((error) => {
  log(`❌ Setup failed: ${error.message}`, 'red');
  rl.close();
  process.exit(1);
}); 