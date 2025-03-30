const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const dbConfig = require('../config/db.config.js');

const sequelize = new Sequelize(
  dbConfig.DB,
  dbConfig.USER,
  dbConfig.PASSWORD,
  {
    host: dbConfig.HOST,
    port: dbConfig.PORT,
    dialect: dbConfig.dialect,
    pool: {
      max: dbConfig.pool.max,
      min: dbConfig.pool.min,
      acquire: dbConfig.pool.acquire,
      idle: dbConfig.pool.idle,
    },
    logging: process.env.NODE_ENV === 'development' ? console.log : false
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Import models
db.users = require('./user.model.js')(sequelize, Sequelize);
db.doctors = require('./doctor.model.js')(sequelize, Sequelize);
db.patients = require('./patient.model.js')(sequelize, Sequelize);
db.appointments = require('./appointment.model.js')(sequelize, Sequelize);
db.prescriptions = require('./prescription.model.js')(sequelize, Sequelize);
db.medicalRecords = require('./medicalRecord.model.js')(sequelize, Sequelize);

// Define relationships
db.users.hasOne(db.doctors, { foreignKey: 'userId' });
db.doctors.belongsTo(db.users, { foreignKey: 'userId' });

db.users.hasOne(db.patients, { foreignKey: 'userId' });
db.patients.belongsTo(db.users, { foreignKey: 'userId' });

db.doctors.hasMany(db.appointments, { foreignKey: 'doctorId' });
db.appointments.belongsTo(db.doctors, { foreignKey: 'doctorId' });

db.patients.hasMany(db.appointments, { foreignKey: 'patientId' });
db.appointments.belongsTo(db.patients, { foreignKey: 'patientId' });

db.doctors.hasMany(db.prescriptions, { foreignKey: 'doctorId' });
db.prescriptions.belongsTo(db.doctors, { foreignKey: 'doctorId' });

db.patients.hasMany(db.prescriptions, { foreignKey: 'patientId' });
db.prescriptions.belongsTo(db.patients, { foreignKey: 'patientId' });

db.patients.hasMany(db.medicalRecords, { foreignKey: 'patientId' });
db.medicalRecords.belongsTo(db.patients, { foreignKey: 'patientId' });

module.exports = db; 