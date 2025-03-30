#!/usr/bin/env node

/**
 * Marrow Medical Platform - Create Stored Procedures Script
 * 
 * This script creates stored procedures and triggers that might cause issues 
 * when included in the main initialization SQL script
 */

require('dotenv').config();
const mysql = require('mysql2/promise');
const chalk = require('chalk');

// Utility functions
const log = {
  info: (message) => console.log(chalk.blue('INFO: ') + message),
  success: (message) => console.log(chalk.green('SUCCESS: ') + message),
  warning: (message) => console.log(chalk.yellow('WARNING: ') + message),
  error: (message) => console.log(chalk.red('ERROR: ') + message)
};

// Stored procedures and triggers
const procedures = [
  // Update doctor rating procedure
  `
  CREATE PROCEDURE IF NOT EXISTS update_doctor_rating(IN doctor_id INT)
  BEGIN
    DECLARE avg_rating FLOAT;
    DECLARE review_count INT;
    
    -- Calculate average rating and count
    SELECT AVG(rating), COUNT(*) 
    INTO avg_rating, review_count
    FROM reviews 
    WHERE doctorId = doctor_id;
    
    -- Update doctor record
    UPDATE doctors 
    SET rating = avg_rating, 
        reviewCount = review_count
    WHERE id = doctor_id;
  END
  `,
  
  // Trigger for new reviews
  `
  CREATE TRIGGER IF NOT EXISTS after_review_insert 
  AFTER INSERT ON reviews
  FOR EACH ROW
  BEGIN
    CALL update_doctor_rating(NEW.doctorId);
  END
  `,
  
  // Trigger for updated reviews
  `
  CREATE TRIGGER IF NOT EXISTS after_review_update
  AFTER UPDATE ON reviews
  FOR EACH ROW
  BEGIN
    CALL update_doctor_rating(NEW.doctorId);
  END
  `,
  
  // Trigger for deleted reviews
  `
  CREATE TRIGGER IF NOT EXISTS after_review_delete
  AFTER DELETE ON reviews
  FOR EACH ROW
  BEGIN
    CALL update_doctor_rating(OLD.doctorId);
  END
  `
];

// Execute stored procedures and triggers
const createProcedures = async () => {
  const {
    DB_HOST,
    DB_PORT,
    DB_USER,
    DB_PASSWORD,
    DB_NAME
  } = process.env;

  try {
    // Connect to the database
    const connection = await mysql.createConnection({
      host: DB_HOST || 'localhost',
      port: DB_PORT || 3306,
      user: DB_USER || 'root',
      password: DB_PASSWORD || '',
      database: DB_NAME || 'marrow_db'
    });

    log.info('Connected to database. Creating stored procedures and triggers...');

    // Execute each procedure/trigger
    for (const procedure of procedures) {
      try {
        await connection.query(procedure);
        log.success('Created procedure/trigger successfully');
      } catch (error) {
        log.warning(`Error creating procedure/trigger: ${error.message}`);
      }
    }

    // Update any doctor ratings
    try {
      const [doctors] = await connection.query('SELECT id FROM doctors');
      for (const doctor of doctors) {
        await connection.query('CALL update_doctor_rating(?)', [doctor.id]);
      }
      log.success('Updated doctor ratings');
    } catch (error) {
      log.warning(`Error updating doctor ratings: ${error.message}`);
    }

    // Close the connection
    await connection.end();
    log.success('All procedures and triggers have been processed');
  } catch (error) {
    log.error(`Database connection error: ${error.message}`);
  }
};

// Run the function if this script is executed directly
if (require.main === module) {
  createProcedures();
}

module.exports = { createProcedures }; 