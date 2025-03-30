const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patient.controller');
const authMiddleware = require('../middlewares/auth.middleware');

// Apply authentication middleware to all routes
router.use(authMiddleware.verifyToken);

// Patient profile routes
router.get('/profile', patientController.getProfile);
router.put('/profile', patientController.updateProfile);

// Patient data routes
router.get('/appointments', patientController.getAppointments);
router.get('/prescriptions', patientController.getPrescriptions);
router.get('/medical-records', patientController.getMedicalRecords);

module.exports = router; 