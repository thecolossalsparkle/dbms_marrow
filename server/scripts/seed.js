require('dotenv').config();
const bcrypt = require('bcryptjs');
const db = require('../models');
const User = db.users;
const Doctor = db.doctors;
const Patient = db.patients;
const Appointment = db.appointments;
const Prescription = db.prescriptions;
const MedicalRecord = db.medicalRecords;

async function seedDatabase() {
  try {
    console.log('Starting database connection test...');
    
    // Connect to database
    await db.sequelize.authenticate();
    console.log('Database connection established successfully.');
    
    // Clear existing data (optional, comment out if you want to keep existing data)
    console.log('Note: Sample data seeding has been disabled.');
    console.log('Database connection test completed successfully.');
    
  } catch (error) {
    console.error('Error during database operations:', error);
  }
}

// Execute the seed function
seedDatabase().then(() => {
  console.log('Database operations completed');
  process.exit();
}).catch(err => {
  console.error('Failed to seed database:', err);
  process.exit(1);
}); 