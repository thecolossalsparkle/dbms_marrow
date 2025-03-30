const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointment.controller');
const authMiddleware = require('../middlewares/auth.middleware');

// Apply authentication middleware to all routes
router.use(authMiddleware.verifyToken);

// Get available time slots
router.get('/available-slots', appointmentController.getAvailableSlots);

// Get all appointments
router.get('/', appointmentController.findAll);

// Get appointment by ID
router.get('/:id', appointmentController.findOne);

// Create appointment
router.post('/', appointmentController.create);

// Update appointment
router.put('/:id', appointmentController.update);

// Update appointment status
router.put('/:id/status', appointmentController.updateStatus);

// Cancel appointment
router.put('/:id/cancel', appointmentController.cancel);

module.exports = router; 