require('dotenv').config();
const mysql = require('mysql2/promise');

async function setupDatabase() {
  console.log('Setting up the database...');
  
  const {
    DB_HOST,
    DB_USER,
    DB_PASSWORD,
    DB_NAME,
    DB_PORT
  } = process.env;

  try {
    // Create connection to MySQL server without database specified
    const connection = await mysql.createConnection({
      host: DB_HOST || 'localhost',
      user: DB_USER || 'root',
      password: DB_PASSWORD || 'password',
      port: DB_PORT || 3306
    });

    console.log('Connected to MySQL server.');

    // Check if database exists
    const [rows] = await connection.execute(
      `SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = ?`,
      [DB_NAME]
    );

    if (rows.length === 0) {
      console.log(`Database ${DB_NAME} does not exist. Creating it...`);
      await connection.execute(`CREATE DATABASE IF NOT EXISTS ${DB_NAME}`);
      console.log(`Database ${DB_NAME} created successfully.`);
    } else {
      console.log(`Database ${DB_NAME} already exists.`);
    }

    // Close connection
    await connection.end();
    
    console.log('Database setup completed successfully!');
    console.log('You can now run the server with: npm start');
  } catch (error) {
    console.error('Error setting up the database:', error);
    process.exit(1);
  }
}

setupDatabase(); 