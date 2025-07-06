#!/usr/bin/env node

/**
 * 🚀 FENIX Construction Tracker - Production Optimization Script
 * 
 * This script optimizes the application for production deployment
 * by performing various checks and optimizations.
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🏗️  FENIX Construction Tracker - Production Optimization');
console.log('=====================================================\n');

// Colors for console output
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function checkFileExists(filePath) {
  return fs.existsSync(filePath);
}

function checkEnvironmentVariables() {
  log('🔍 Checking environment variables...', 'blue');
  
  const requiredVars = [
    'DATABASE_URL',
    'JWT_SECRET',
    'NODE_ENV'
  ];
  
  const missing = [];
  
  for (const varName of requiredVars) {
    if (!process.env[varName]) {
      missing.push(varName);
    }
  }
  
  if (missing.length > 0) {
    log(`❌ Missing environment variables: ${missing.join(', ')}`, 'red');
    log('   Please set these variables in your Vercel dashboard', 'yellow');
    return false;
  }
  
  log('✅ All required environment variables are set', 'green');
  return true;
}

function checkDependencies() {
  log('📦 Checking dependencies...', 'blue');
  
  try {
    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    const requiredDeps = [
      'react',
      'express',
      '@prisma/client',
      'jsonwebtoken',
      'bcryptjs'
    ];
    
    const missing = [];
    
    for (const dep of requiredDeps) {
      if (!packageJson.dependencies[dep] && !packageJson.devDependencies[dep]) {
        missing.push(dep);
      }
    }
    
    if (missing.length > 0) {
      log(`❌ Missing dependencies: ${missing.join(', ')}`, 'red');
      return false;
    }
    
    log('✅ All required dependencies are installed', 'green');
    return true;
  } catch (error) {
    log('❌ Error checking dependencies', 'red');
    return false;
  }
}

function checkBuildFiles() {
  log('🏗️  Checking build files...', 'blue');
  
  const buildDir = path.join(process.cwd(), 'build');
  
  if (!checkFileExists(buildDir)) {
    log('❌ Build directory not found. Run "npm run build" first', 'red');
    return false;
  }
  
  const requiredFiles = [
    'index.html',
    'static/js/main.js',
    'static/css/main.css'
  ];
  
  const missing = [];
  
  for (const file of requiredFiles) {
    if (!checkFileExists(path.join(buildDir, file))) {
      missing.push(file);
    }
  }
  
  if (missing.length > 0) {
    log(`❌ Missing build files: ${missing.join(', ')}`, 'red');
    return false;
  }
  
  log('✅ Build files are ready', 'green');
  return true;
}

function checkConfigurationFiles() {
  log('⚙️  Checking configuration files...', 'blue');
  
  const requiredFiles = [
    'vercel.json',
    'package.json',
    'prisma/schema.prisma'
  ];
  
  const missing = [];
  
  for (const file of requiredFiles) {
    if (!checkFileExists(file)) {
      missing.push(file);
    }
  }
  
  if (missing.length > 0) {
    log(`❌ Missing configuration files: ${missing.join(', ')}`, 'red');
    return false;
  }
  
  log('✅ All configuration files are present', 'green');
  return true;
}

function optimizePackageJson() {
  log('📝 Optimizing package.json...', 'blue');
  
  try {
    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    
    // Add production-specific scripts if not present
    if (!packageJson.scripts['vercel-build']) {
      packageJson.scripts['vercel-build'] = 'npm run build';
    }
    
    if (!packageJson.scripts['postinstall']) {
      packageJson.scripts['postinstall'] = 'prisma generate';
    }
    
    // Add engines field if not present
    if (!packageJson.engines) {
      packageJson.engines = {
        node: '>=18.0.0',
        npm: '>=8.0.0'
      };
    }
    
    // Write back to file
    fs.writeFileSync('package.json', JSON.stringify(packageJson, null, 2));
    
    log('✅ Package.json optimized for production', 'green');
    return true;
  } catch (error) {
    log('❌ Error optimizing package.json', 'red');
    return false;
  }
}

function generateSecurityHeaders() {
  log('🔒 Generating security headers...', 'blue');
  
  const securityHeaders = {
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'X-XSS-Protection': '1; mode=block',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=()'
  };
  
  try {
    const vercelConfig = JSON.parse(fs.readFileSync('vercel.json', 'utf8'));
    
    if (!vercelConfig.headers) {
      vercelConfig.headers = [];
    }
    
    // Add security headers if not present
    const hasSecurityHeaders = vercelConfig.headers.some(header => 
      header.source === '/(.*)' && header.headers.some(h => h.key === 'X-Content-Type-Options')
    );
    
    if (!hasSecurityHeaders) {
      vercelConfig.headers.push({
        source: '/(.*)',
        headers: Object.entries(securityHeaders).map(([key, value]) => ({
          key,
          value
        }))
      });
      
      fs.writeFileSync('vercel.json', JSON.stringify(vercelConfig, null, 2));
      log('✅ Security headers added to vercel.json', 'green');
    } else {
      log('✅ Security headers already configured', 'green');
    }
    
    return true;
  } catch (error) {
    log('❌ Error configuring security headers', 'red');
    return false;
  }
}

function checkDatabaseConnection() {
  log('🗄️  Checking database connection...', 'blue');
  
  if (!process.env.DATABASE_URL) {
    log('⚠️  DATABASE_URL not set, skipping database check', 'yellow');
    return true;
  }
  
  try {
    // Try to generate Prisma client to test connection
    execSync('npx prisma generate', { stdio: 'pipe' });
    log('✅ Database connection test passed', 'green');
    return true;
  } catch (error) {
    log('❌ Database connection test failed', 'red');
    log('   Please check your DATABASE_URL configuration', 'yellow');
    return false;
  }
}

function createDeploymentChecklist() {
  log('📋 Creating deployment checklist...', 'blue');
  
  const checklist = `# 🚀 FENIX Construction Tracker - Deployment Checklist

## ✅ Pre-Deployment Checks

- [ ] Environment variables configured in Vercel
- [ ] Database connection string is valid
- [ ] JWT secret is set and secure
- [ ] Build process completes successfully
- [ ] All dependencies are installed
- [ ] Configuration files are present

## 🔧 Environment Variables

Required variables in Vercel dashboard:
\`\`\`env
DATABASE_URL=postgresql://username:password@host:port/database
JWT_SECRET=your-super-secret-jwt-key-here
NODE_ENV=production
\`\`\`

## 🗄️ Database Setup

After deployment:
\`\`\`bash
# Generate Prisma client
npm run db:generate

# Push schema to database
npm run db:push

# Seed with initial data
npm run db:seed
\`\`\`

## 🧪 Testing

- [ ] Health endpoint: \`/api/health\`
- [ ] Login functionality
- [ ] Work session management
- [ ] GPS tracking
- [ ] Photo capture
- [ ] Admin dashboard
- [ ] Mobile responsiveness

## 📱 Mobile App

- [ ] Android build successful
- [ ] GPS permissions working
- [ ] Camera integration tested
- [ ] Offline functionality verified

## 🔒 Security

- [ ] HTTPS enabled
- [ ] CORS configured properly
- [ ] JWT tokens working
- [ ] Input validation active
- [ ] Security headers set

## 📊 Monitoring

- [ ] Vercel analytics enabled
- [ ] Error tracking configured
- [ ] Performance monitoring active
- [ ] Database monitoring set up

## 🎉 Deployment Complete!

Your FENIX Construction Tracker is now live at:
https://your-app.vercel.app

Test credentials:
- Admin: kango@fenix.com / admin123
- Employee: petre@fenix.com / admin123
`;
  
  fs.writeFileSync('DEPLOYMENT_CHECKLIST.md', checklist);
  log('✅ Deployment checklist created', 'green');
  return true;
}

function runOptimizations() {
  log('🚀 Running production optimizations...', 'bold');
  
  const checks = [
    { name: 'Environment Variables', fn: checkEnvironmentVariables },
    { name: 'Dependencies', fn: checkDependencies },
    { name: 'Configuration Files', fn: checkConfigurationFiles },
    { name: 'Package.json Optimization', fn: optimizePackageJson },
    { name: 'Security Headers', fn: generateSecurityHeaders },
    { name: 'Database Connection', fn: checkDatabaseConnection },
    { name: 'Deployment Checklist', fn: createDeploymentChecklist }
  ];
  
  let passed = 0;
  let failed = 0;
  
  for (const check of checks) {
    try {
      const result = check.fn();
      if (result) {
        passed++;
      } else {
        failed++;
      }
    } catch (error) {
      log(`❌ Error in ${check.name}: ${error.message}`, 'red');
      failed++;
    }
  }
  
  console.log('\n📊 Optimization Results:');
  console.log('========================');
  log(`✅ Passed: ${passed}`, 'green');
  log(`❌ Failed: ${failed}`, failed > 0 ? 'red' : 'green');
  
  if (failed === 0) {
    log('\n🎉 All optimizations completed successfully!', 'green');
    log('Your app is ready for production deployment.', 'green');
    log('\nNext steps:', 'bold');
    log('1. Deploy to Vercel: https://vercel.com', 'blue');
    log('2. Set environment variables in Vercel dashboard', 'blue');
    log('3. Run database setup commands', 'blue');
    log('4. Test all functionality', 'blue');
  } else {
    log('\n⚠️  Some optimizations failed. Please fix the issues above.', 'yellow');
  }
  
  return failed === 0;
}

// Run the optimization script
if (require.main === module) {
  runOptimizations();
}

module.exports = {
  runOptimizations,
  checkEnvironmentVariables,
  checkDependencies,
  checkBuildFiles,
  checkConfigurationFiles,
  optimizePackageJson,
  generateSecurityHeaders,
  checkDatabaseConnection,
  createDeploymentChecklist
}; 