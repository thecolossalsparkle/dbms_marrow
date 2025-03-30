#!/usr/bin/env node

/**
 * Marrow Medical Platform - First-time Setup Script
 * 
 * This script performs the following tasks:
 * 1. Checks environment variables and dependencies
 * 2. Sets up the database using the initialization SQL script
 * 3. Creates necessary directories for file uploads
 * 4. Generates JWT keys if needed
 * 5. Installs dependencies if needed
 * 
 * Run this script for first-time setup: node scripts/setup.js
 */

require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { exec, execSync } = require('child_process');
const mysql = require('mysql2/promise');
const chalk = require('chalk');
const readline = require('readline');
const { createProcedures } = require('./create_procedures');

// Create readline interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Configuration
const SQL_FILE_PATH = path.join(__dirname, 'initialize_database.sql');
const UPLOADS_DIR = path.join(__dirname, '..', 'uploads');
const KEYS_DIR = path.join(__dirname, '..', 'keys');

// Utility to prompt user for input
const prompt = (question) => {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
};

// Check if a command exists
const commandExists = (command) => {
  try {
    execSync(`which ${command}`, { stdio: 'ignore' });
    return true;
  } catch (error) {
    return false;
  }
};

// Utility functions
const log = {
  info: (message) => console.log(chalk.blue('INFO: ') + message),
  success: (message) => console.log(chalk.green('SUCCESS: ') + message),
  warning: (message) => console.log(chalk.yellow('WARNING: ') + message),
  error: (message) => console.log(chalk.red('ERROR: ') + message),
  step: (message) => console.log(chalk.cyan('\n===> ') + chalk.bold(message)),
  spacer: () => console.log('')
};

// Check and install dependencies
const checkDependencies = async () => {
  log.step('Checking dependencies');

  // Check if npm is installed
  if (!commandExists('npm')) {
    log.error('npm is not installed. Please install Node.js and npm first.');
    process.exit(1);
  }
  
  // Check for MySQL client
  if (!commandExists('mysql')) {
    log.warning('MySQL client is not installed. You may need to install it for direct DB operations.');
  }

  // Check if node_modules exists and install if necessary
  if (!fs.existsSync(path.join(__dirname, '..', 'node_modules'))) {
    log.info('Installing dependencies...');
    try {
      execSync('npm install', { stdio: 'inherit', cwd: path.join(__dirname, '..') });
      log.success('Dependencies installed successfully.');
    } catch (error) {
      log.error('Failed to install dependencies.');
      process.exit(1);
    }
  } else {
    log.success('Dependencies are already installed.');
  }
};

// Check and setup environment variables
const checkEnvironment = async () => {
  log.step('Checking environment configuration');

  const envPath = path.join(__dirname, '..', '.env');
  
  // Check if .env file exists
  if (!fs.existsSync(envPath)) {
    log.warning('.env file not found. Creating a default one.');
    
    // Get database credentials from user input
    const dbHost = await prompt('Enter database host (default: localhost): ') || 'localhost';
    const dbPort = await prompt('Enter database port (default: 3306): ') || '3306';
    const dbName = await prompt('Enter database name (default: marrow_db): ') || 'marrow_db';
    const dbUser = await prompt('Enter database username (default: root): ') || 'root';
    const dbPassword = await prompt('Enter database password: ');
    const serverPort = await prompt('Enter server port (default: 5001): ') || '5001';
    const jwtSecret = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

    // Create .env file
    const envContent = `
# Server Configuration
PORT=${serverPort}
NODE_ENV=development

# Database Configuration
DB_HOST=${dbHost}
DB_PORT=${dbPort}
DB_NAME=${dbName}
DB_USER=${dbUser}
DB_PASSWORD=${dbPassword}

# JWT Configuration
JWT_SECRET=${jwtSecret}
JWT_EXPIRES_IN=7d

# File Upload Configuration
UPLOAD_DIR=uploads
MAX_FILE_SIZE=5242880

# Email Configuration (for production)
# SMTP_HOST=smtp.example.com
# SMTP_PORT=587
# SMTP_USER=user@example.com
# SMTP_PASS=password
# SMTP_FROM=noreply@example.com
`;

    fs.writeFileSync(envPath, envContent.trim());
    log.success('.env file created successfully.');
  } else {
    log.success('.env file found.');
    
    // Check if all required environment variables are set
    require('dotenv').config({ path: envPath });
    const requiredVars = ['DB_HOST', 'DB_PORT', 'DB_NAME', 'DB_USER', 'DB_PASSWORD', 'JWT_SECRET'];
    const missingVars = requiredVars.filter(varName => !process.env[varName]);
    
    if (missingVars.length > 0) {
      log.warning(`Missing environment variables: ${missingVars.join(', ')}`);
      log.info('Please update your .env file with these variables.');
    }
  }
};

// Create directories if they don't exist
const createDirectories = () => {
  log.step('Setting up directories');

  const dirs = [
    UPLOADS_DIR,
    path.join(UPLOADS_DIR, 'profile'),
    path.join(UPLOADS_DIR, 'medical'),
    path.join(UPLOADS_DIR, 'prescriptions'),
    KEYS_DIR
  ];

  dirs.forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
      log.success(`Created directory: ${dir}`);
    } else {
      log.info(`Directory already exists: ${dir}`);
    }
  });
};

// Generate JWT keys if needed
const generateKeys = () => {
  log.step('Checking JWT configuration');

  if (!process.env.JWT_SECRET) {
    const jwtSecret = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    log.warning('JWT_SECRET not found in environment variables.');
    log.info(`Generated a random JWT_SECRET: ${jwtSecret}`);
    log.info('Consider adding this to your .env file for consistency.');
  } else {
    log.success('JWT_SECRET is configured.');
  }
};

// Setup database
const setupDatabase = async () => {
  log.step('Setting up database');

  const {
    DB_HOST,
    DB_PORT,
    DB_USER,
    DB_PASSWORD,
    DB_NAME
  } = process.env;

  try {
    // First try to connect to MySQL server without a specific database
    let connection = await mysql.createConnection({
      host: DB_HOST,
      port: DB_PORT,
      user: DB_USER,
      password: DB_PASSWORD,
      multipleStatements: true
    });

    log.success('Connected to MySQL server.');

    // Check if database exists
    const [rows] = await connection.execute(
      `SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = ?`,
      [DB_NAME]
    );

    if (rows.length === 0) {
      log.info(`Database ${DB_NAME} does not exist. Creating it...`);
      await connection.execute(`CREATE DATABASE IF NOT EXISTS ${DB_NAME}`);
      log.success(`Database ${DB_NAME} created successfully.`);
    } else {
      log.info(`Database ${DB_NAME} already exists.`);
      
      // Prompt user for confirmation before proceeding
      const answer = await prompt(`Do you want to continue with the existing database? This will not override your data. (y/n): `);
      if (answer.toLowerCase() !== 'y') {
        log.info('Setup aborted by user.');
        process.exit(0);
      }
    }

    // Close the initial connection
    await connection.end();

    // Read the SQL file
    const sqlScript = fs.readFileSync(SQL_FILE_PATH, 'utf8');
    
    // Connect to the specific database
    connection = await mysql.createConnection({
      host: DB_HOST,
      port: DB_PORT,
      user: DB_USER,
      password: DB_PASSWORD,
      database: DB_NAME,
      multipleStatements: true
    });

    log.info('Executing database setup script...');
    
    try {
      // Execute SQL script - split by semicolons to execute statements individually if needed
      await connection.query(sqlScript);
      log.success('Database setup completed successfully!');
    } catch (sqlError) {
      log.error(`SQL execution error: ${sqlError.message}`);
      log.info('Attempting to execute statements individually...');
      
      // Split script into individual statements and execute them one by one
      const statements = sqlScript
        .split(';')
        .map(statement => statement.trim())
        .filter(statement => statement.length > 0);
      
      for (let i = 0; i < statements.length; i++) {
        const statement = statements[i];
        try {
          await connection.query(`${statement};`);
          log.info(`Executed statement ${i+1}/${statements.length}`);
        } catch (stmtError) {
          log.warning(`Error in statement ${i+1}: ${stmtError.message}`);
          log.info('Continuing with next statement...');
          // Continue with next statement instead of failing completely
        }
      }
      log.success('Database setup completed with some warnings.');
    }

    // Close connection
    await connection.end();
    
    // Create stored procedures and triggers separately
    log.step('Setting up stored procedures and triggers');
    try {
      await createProcedures();
      log.success('Stored procedures and triggers created successfully!');
    } catch (procError) {
      log.warning(`Error setting up stored procedures: ${procError.message}`);
      log.info('The database will still function, but some features might be limited.');
    }
  } catch (error) {
    log.error(`Error setting up database: ${error.message}`);
    if (error.code === 'ECONNREFUSED') {
      log.info('Make sure your MySQL server is running and accessible.');
    }
    process.exit(1);
  }
};

// Main function to run all setup steps
const runSetup = async () => {
  try {
    log.spacer();
    log.info('Starting Marrow Medical Platform setup...');
    log.spacer();

    await checkDependencies();
    await checkEnvironment();
    createDirectories();
    generateKeys();
    await setupDatabase();

    log.spacer();
    log.success('Marrow Medical Platform has been successfully set up!');
    log.info('You can now start the server with: npm start');
    log.spacer();

    rl.close();
  } catch (error) {
    log.error(`Setup failed: ${error.message}`);
    rl.close();
    process.exit(1);
  }
};

// Run the setup
runSetup(); 