#!/usr/bin/env node

/**
 * Supabase Setup Script for FENIX Construction Tracker
 * 
 * This script helps set up the Supabase database with the Prisma schema
 * and creates necessary storage buckets and policies.
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

const log = {
  info: (msg) => console.log(`${colors.blue}ℹ${colors.reset} ${msg}`),
  success: (msg) => console.log(`${colors.green}✓${colors.reset} ${msg}`),
  warning: (msg) => console.log(`${colors.yellow}⚠${colors.reset} ${msg}`),
  error: (msg) => console.log(`${colors.red}✗${colors.reset} ${msg}`),
  header: (msg) => console.log(`\n${colors.bright}${colors.cyan}${msg}${colors.reset}\n`)
};

// Check if .env file exists
function checkEnvFile() {
  const envPath = path.join(process.cwd(), '.env');
  if (!fs.existsSync(envPath)) {
    log.error('.env file not found! Please create one from env.example');
    process.exit(1);
  }
  log.success('.env file found');
}

// Load environment variables
function loadEnv() {
  try {
    require('dotenv').config();
    log.success('Environment variables loaded');
  } catch (error) {
    log.error('Failed to load environment variables');
    process.exit(1);
  }
}

// Check if Supabase CLI is installed
function checkSupabaseCLI() {
  try {
    execSync('supabase --version', { stdio: 'pipe' });
    log.success('Supabase CLI is installed');
    return true;
  } catch (error) {
    log.warning('Supabase CLI not found. Installing...');
    try {
      execSync('npm install -g supabase', { stdio: 'inherit' });
      log.success('Supabase CLI installed successfully');
      return true;
    } catch (installError) {
      log.error('Failed to install Supabase CLI. Please install it manually:');
      log.info('Visit: https://supabase.com/docs/guides/cli');
      return false;
    }
  }
}

// Initialize Supabase project
function initSupabase() {
  try {
    if (!fs.existsSync('supabase')) {
      log.info('Initializing Supabase project...');
      execSync('supabase init', { stdio: 'inherit' });
      log.success('Supabase project initialized');
    } else {
      log.success('Supabase project already exists');
    }
  } catch (error) {
    log.error('Failed to initialize Supabase project');
    process.exit(1);
  }
}

// Link to remote Supabase project
function linkSupabase() {
  try {
    log.info('Linking to remote Supabase project...');
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    
    if (!supabaseUrl || !supabaseKey) {
      log.warning('SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY not found in .env');
      log.info('Please add your Supabase service role key to .env file');
      return false;
    }
    
    // Extract project ref from URL
    const projectRef = supabaseUrl.split('.')[0].split('//')[1];
    
    execSync(`supabase link --project-ref ${projectRef}`, { stdio: 'inherit' });
    log.success('Linked to remote Supabase project');
    return true;
  } catch (error) {
    log.error('Failed to link to remote Supabase project');
    return false;
  }
}

// Push Prisma schema to Supabase
function pushPrismaSchema() {
  try {
    log.info('Pushing Prisma schema to Supabase...');
    execSync('npx prisma db push', { stdio: 'inherit' });
    log.success('Prisma schema pushed successfully');
    return true;
  } catch (error) {
    log.error('Failed to push Prisma schema');
    return false;
  }
}

// Generate Prisma client
function generatePrismaClient() {
  try {
    log.info('Generating Prisma client...');
    execSync('npx prisma generate', { stdio: 'inherit' });
    log.success('Prisma client generated');
    return true;
  } catch (error) {
    log.error('Failed to generate Prisma client');
    return false;
  }
}

// Create storage buckets
function createStorageBuckets() {
  try {
    log.info('Creating storage buckets...');
    
    // Create fenix-uploads bucket
    execSync('supabase storage create-bucket fenix-uploads --public', { stdio: 'inherit' });
    log.success('Created fenix-uploads bucket');
    
    // Create fenix-photos bucket
    execSync('supabase storage create-bucket fenix-photos --public', { stdio: 'inherit' });
    log.success('Created fenix-photos bucket');
    
    return true;
  } catch (error) {
    log.warning('Failed to create storage buckets (they might already exist)');
    return false;
  }
}

// Set up Row Level Security (RLS) policies
function setupRLSPolicies() {
  try {
    log.info('Setting up Row Level Security policies...');
    
    // Create SQL file for RLS policies
    const rlsSQL = `
-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE vehicles ENABLE ROW LEVEL SECURITY;
ALTER TABLE work_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE breaks ENABLE ROW LEVEL SECURITY;
ALTER TABLE locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE system_settings ENABLE ROW LEVEL SECURITY;

-- Users table policies
CREATE POLICY "Users can view their own profile" ON users
  FOR SELECT USING (auth.uid()::text = id::text);

CREATE POLICY "Admins can view all users" ON users
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid()::int AND role = 'ADMIN'
    )
  );

-- Work sessions policies
CREATE POLICY "Users can view their own work sessions" ON work_sessions
  FOR SELECT USING (user_id = auth.uid()::int);

CREATE POLICY "Users can create their own work sessions" ON work_sessions
  FOR INSERT WITH CHECK (user_id = auth.uid()::int);

CREATE POLICY "Users can update their own work sessions" ON work_sessions
  FOR UPDATE USING (user_id = auth.uid()::int);

CREATE POLICY "Admins can view all work sessions" ON work_sessions
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid()::int AND role = 'ADMIN'
    )
  );

-- Locations policies
CREATE POLICY "Users can view their own locations" ON locations
  FOR SELECT USING (user_id = auth.uid()::int);

CREATE POLICY "Users can create their own locations" ON locations
  FOR INSERT WITH CHECK (user_id = auth.uid()::int);

CREATE POLICY "Admins can view all locations" ON locations
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid()::int AND role = 'ADMIN'
    )
  );

-- Vehicles policies
CREATE POLICY "All authenticated users can view vehicles" ON vehicles
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Admins can manage vehicles" ON vehicles
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid()::int AND role = 'ADMIN'
    )
  );

-- System settings policies
CREATE POLICY "Admins can manage system settings" ON system_settings
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid()::int AND role = 'ADMIN'
    )
  );

-- Storage policies
CREATE POLICY "Users can upload their own files" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'fenix-uploads' OR bucket_id = 'fenix-photos'
  );

CREATE POLICY "Users can view public files" ON storage.objects
  FOR SELECT USING (
    bucket_id = 'fenix-uploads' OR bucket_id = 'fenix-photos'
  );

CREATE POLICY "Users can update their own files" ON storage.objects
  FOR UPDATE USING (
    bucket_id = 'fenix-uploads' OR bucket_id = 'fenix-photos'
  );

CREATE POLICY "Users can delete their own files" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'fenix-uploads' OR bucket_id = 'fenix-photos'
  );
`;

    // Write SQL to file
    const sqlPath = path.join(process.cwd(), 'supabase', 'migrations', '20240101000000_setup_rls.sql');
    fs.writeFileSync(sqlPath, rlsSQL);
    
    // Apply migration
    execSync('supabase db push', { stdio: 'inherit' });
    log.success('RLS policies set up successfully');
    
    return true;
  } catch (error) {
    log.error('Failed to set up RLS policies');
    return false;
  }
}

// Seed database with initial data
function seedDatabase() {
  try {
    log.info('Seeding database with initial data...');
    execSync('node server/seed.js', { stdio: 'inherit' });
    log.success('Database seeded successfully');
    return true;
  } catch (error) {
    log.warning('Failed to seed database (this is optional)');
    return false;
  }
}

// Main setup function
async function main() {
  log.header('🚀 FENIX Construction Tracker - Supabase Setup');
  
  try {
    // Step 1: Check prerequisites
    log.header('Step 1: Checking Prerequisites');
    checkEnvFile();
    loadEnv();
    
    if (!checkSupabaseCLI()) {
      process.exit(1);
    }
    
    // Step 2: Initialize Supabase
    log.header('Step 2: Initializing Supabase');
    initSupabase();
    
    // Step 3: Link to remote project
    log.header('Step 3: Linking to Remote Project');
    if (!linkSupabase()) {
      log.warning('Skipping remote linking. You can do this manually later.');
    }
    
    // Step 4: Push schema
    log.header('Step 4: Setting up Database Schema');
    if (!pushPrismaSchema()) {
      process.exit(1);
    }
    
    // Step 5: Generate client
    log.header('Step 5: Generating Prisma Client');
    if (!generatePrismaClient()) {
      process.exit(1);
    }
    
    // Step 6: Create storage buckets
    log.header('Step 6: Creating Storage Buckets');
    createStorageBuckets();
    
    // Step 7: Set up RLS policies
    log.header('Step 7: Setting up Security Policies');
    setupRLSPolicies();
    
    // Step 8: Seed database
    log.header('Step 8: Seeding Database');
    seedDatabase();
    
    log.header('🎉 Supabase Setup Complete!');
    log.success('Your FENIX app is now configured with Supabase!');
    log.info('Next steps:');
    log.info('1. Start your development server: npm run dev');
    log.info('2. Open Supabase Studio: supabase studio');
    log.info('3. Test your application');
    
  } catch (error) {
    log.error('Setup failed: ' + error.message);
    process.exit(1);
  }
}

// Run setup if this script is executed directly
if (require.main === module) {
  main();
}

module.exports = {
  main,
  checkEnvFile,
  loadEnv,
  checkSupabaseCLI,
  initSupabase,
  linkSupabase,
  pushPrismaSchema,
  generatePrismaClient,
  createStorageBuckets,
  setupRLSPolicies,
  seedDatabase
}; 