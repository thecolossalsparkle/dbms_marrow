const db = require('../models');
const Patient = db.patients;
const User = db.users;
const Appointment = db.appointments;
const Prescription = db.prescriptions;
const MedicalRecord = db.medicalRecords;

// Get patient profile
exports.getProfile = async (req, res) => {
  try {
    const patientId = req.userId;
    
    const patient = await Patient.findOne({
      where: { userId: patientId },
      include: [
        {
          model: User,
          attributes: ['id', 'name', 'email', 'role']
        }
      ]
    });
    
    if (!patient) {
      return res.status(404).json({ message: 'Patient profile not found' });
    }
    
    res.status(200).json(patient);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update patient profile
exports.updateProfile = async (req, res) => {
  try {
    const patientId = req.userId;
    const { 
      phone, address, dateOfBirth, gender, bloodGroup, 
      emergencyContact, medicalHistory, allergies 
    } = req.body;
    
    const patient = await Patient.findOne({
      where: { userId: patientId }
    });
    
    if (!patient) {
      return res.status(404).json({ message: 'Patient profile not found' });
    }
    
    // Update patient details
    await patient.update({
      phone, 
      address, 
      dateOfBirth, 
      gender, 
      bloodGroup, 
      emergencyContact, 
      medicalHistory, 
      allergies
    });
    
    // Get updated patient data with user info
    const updatedPatient = await Patient.findOne({
      where: { userId: patientId },
      include: [
        {
          model: User,
          attributes: ['id', 'name', 'email', 'role']
        }
      ]
    });
    
    res.status(200).json(updatedPatient);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get patient appointments
exports.getAppointments = async (req, res) => {
  try {
    const patient = await Patient.findOne({
      where: { userId: req.userId }
    });
    
    if (!patient) {
      return res.status(404).json({ message: 'Patient profile not found' });
    }
    
    const appointments = await Appointment.findAll({
      where: { patientId: patient.id },
      include: [
        {
          model: db.doctors,
          include: [
            {
              model: User,
              attributes: ['id', 'name', 'email']
            }
          ]
        }
      ],
      order: [['appointmentDate', 'DESC']]
    });
    
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get patient prescriptions
exports.getPrescriptions = async (req, res) => {
  try {
    const patient = await Patient.findOne({
      where: { userId: req.userId }
    });
    
    if (!patient) {
      return res.status(404).json({ message: 'Patient profile not found' });
    }
    
    const prescriptions = await Prescription.findAll({
      where: { patientId: patient.id },
      include: [
        {
          model: db.doctors,
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

// Get patient medical records
exports.getMedicalRecords = async (req, res) => {
  try {
    const patient = await Patient.findOne({
      where: { userId: req.userId }
    });
    
    if (!patient) {
      return res.status(404).json({ message: 'Patient profile not found' });
    }
    
    const medicalRecords = await MedicalRecord.findAll({
      where: { patientId: patient.id },
      order: [['recordDate', 'DESC']]
    });
    
    res.status(200).json(medicalRecords);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}; 