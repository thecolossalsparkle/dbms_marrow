const express = require('express');
const router = express.Router();
const prescriptionController = require('../controllers/prescription.controller');
const authMiddleware = require('../middlewares/auth.middleware');

// Apply authentication middleware to all routes
router.use(authMiddleware.verifyToken);

// Get all prescriptions
router.get('/', prescriptionController.findAll);

// Get prescription by ID
router.get('/:id', prescriptionController.findOne);

// Create prescription (doctors only)
router.post('/', authMiddleware.isDoctor, prescriptionController.create);

// Update prescription (doctors only)
router.put('/:id', authMiddleware.isDoctor, prescriptionController.update);

// Delete prescription (doctors only)
router.delete('/:id', authMiddleware.isDoctor, prescriptionController.delete);

module.exports = router; 