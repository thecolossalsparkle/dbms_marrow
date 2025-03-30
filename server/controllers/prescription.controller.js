const db = require('../models');
const Prescription = db.prescriptions;
const Doctor = db.doctors;
const Patient = db.patients;
const User = db.users;

// Create a new prescription
exports.create = async (req, res) => {
  try {
    const { patientId, medications, instructions, diagnosis, startDate, endDate } = req.body;
    
    // Find doctor by userId
    const doctor = await Doctor.findOne({
      where: { userId: req.userId }
    });
    
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }
    
    // Check if patient exists
    const patient = await Patient.findByPk(patientId);
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    
    // Create prescription
    const prescription = await Prescription.create({
      doctorId: doctor.id,
      patientId,
      medications,
      instructions,
      diagnosis,
      startDate,
      endDate,
      status: 'ACTIVE'
    });
    
    res.status(201).json(prescription);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all prescriptions
exports.findAll = async (req, res) => {
  try {
    const prescriptions = await Prescription.findAll({
      include: [
        {
          model: Doctor,
          include: [
            {
              model: User,
              attributes: ['id', 'name', 'email']
            }
          ]
        },
        {
          model: Patient,
          include: [
            {
              model: User,
              attributes: ['id', 'name', 'email']
            }
          ]
        }
      ],
      order: [['createdAt', 'DESC']]
    });
    
    res.status(200).json(prescriptions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get prescription by id
exports.findOne = async (req, res) => {
  try {
    const id = req.params.id;
    
    const prescription = await Prescription.findByPk(id, {
      include: [
        {
          model: Doctor,
          include: [
            {
              model: User,
              attributes: ['id', 'name', 'email']
            }
          ]
        },
        {
          model: Patient,
          include: [
            {
              model: User,
              attributes: ['id', 'name', 'email']
            }
          ]
        }
      ]
    });
    
    if (!prescription) {
      return res.status(404).json({ message: 'Prescription not found' });
    }
    
    res.status(200).json(prescription);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update prescription
exports.update = async (req, res) => {
  try {
    const id = req.params.id;
    const { medications, instructions, diagnosis, startDate, endDate, status } = req.body;
    
    const prescription = await Prescription.findByPk(id);
    
    if (!prescription) {
      return res.status(404).json({ message: 'Prescription not found' });
    }
    
    // Only allow doctors who created the prescription to update it
    const doctor = await Doctor.findOne({
      where: { userId: req.userId }
    });
    
    if (!doctor || prescription.doctorId !== doctor.id) {
      return res.status(403).json({ message: 'Not authorized to update this prescription' });
    }
    
    await prescription.update({
      medications,
      instructions,
      diagnosis,
      startDate,
      endDate,
      status
    });
    
    res.status(200).json(prescription);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete prescription
exports.delete = async (req, res) => {
  try {
    const id = req.params.id;
    
    const prescription = await Prescription.findByPk(id);
    
    if (!prescription) {
      return res.status(404).json({ message: 'Prescription not found' });
    }
    
    // Only allow doctors who created the prescription to delete it
    const doctor = await Doctor.findOne({
      where: { userId: req.userId }
    });
    
    if (!doctor || prescription.doctorId !== doctor.id) {
      return res.status(403).json({ message: 'Not authorized to delete this prescription' });
    }
    
    await prescription.destroy();
    
    res.status(200).json({ message: 'Prescription deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}; 