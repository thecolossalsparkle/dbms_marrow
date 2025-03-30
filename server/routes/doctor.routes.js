const express = require('express');
const router = express.Router();
const doctorController = require('../controllers/doctor.controller');
const authMiddleware = require('../middlewares/auth.middleware');

// Apply authentication middleware to all routes
router.use(authMiddleware.verifyToken);

// Public routes accessible to all authenticated users
router.get('/', doctorController.getAllDoctors);
router.get('/:id', doctorController.getDoctorById);

// Doctor-only routes
router.put('/:id', authMiddleware.isDoctor, doctorController.updateDoctor);
router.get('/:id/patients', authMiddleware.isDoctor, doctorController.getPatients);
router.get('/:id/appointments', authMiddleware.isDoctor, doctorController.getAppointments);
router.get('/:id/prescriptions', authMiddleware.isDoctor, doctorController.getPrescriptions);

module.exports = router; 