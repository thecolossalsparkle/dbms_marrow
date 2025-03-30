const db = require('../models');
const Doctor = db.doctors;
const User = db.users;
const Patient = db.patients;
const Appointment = db.appointments;
const Prescription = db.prescriptions;
const { Op } = db.Sequelize;

// Get all doctors
exports.getAllDoctors = async (req, res) => {
  try {
    const { specialty, name, limit = 10, offset = 0 } = req.query;
    
    // Build query options
    const options = {
      include: [{
        model: User,
        attributes: ['id', 'name', 'email', 'profileImage', 'phone', 'status']
      }],
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['rating', 'DESC']]
    };
    
    // Add filters if provided
    if (specialty || name) {
      options.where = {};
      
      if (specialty) {
        options.where.specialty = specialty;
      }
      
      if (name) {
        options.include[0].where = {
          name: {
            [Op.like]: `%${name}%`
          }
        };
      }
    }
    
    const doctors = await Doctor.findAndCountAll(options);
    
    res.status(200).json({
      totalItems: doctors.count,
      doctors: doctors.rows,
      currentPage: Math.floor(parseInt(offset) / parseInt(limit)) + 1,
      totalPages: Math.ceil(doctors.count / parseInt(limit))
    });
  } catch (error) {
    console.error('Get all doctors error:', error);
    res.status(500).json({ message: 'Error fetching doctors' });
  }
};

// Get doctor by ID
exports.getDoctorById = async (req, res) => {
  try {
    const doctorId = req.params.id;
    
    const doctor = await Doctor.findByPk(doctorId, {
      include: [{
        model: User,
        attributes: ['id', 'name', 'email', 'profileImage', 'phone', 'status']
      }]
    });
    
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }
    
    res.status(200).json(doctor);
  } catch (error) {
    console.error('Get doctor by ID error:', error);
    res.status(500).json({ message: 'Error fetching doctor' });
  }
};

// Update doctor
exports.updateDoctor = async (req, res) => {
  try {
    const doctorId = req.params.id;
    const { 
      specialty, education, experience, hospital, bio, 
      consultationFee, languages, availableDays, workingHours 
    } = req.body;
    
    // Check if updating own profile
    const doctor = await Doctor.findOne({
      where: { 
        id: doctorId,
        userId: req.userId
      }
    });
    
    if (!doctor) {
      return res.status(403).json({ message: 'You are not authorized to update this profile' });
    }
    
    // Update doctor profile
    await doctor.update({
      specialty: specialty || doctor.specialty,
      education: education || doctor.education,
      experience: experience || doctor.experience,
      hospital: hospital || doctor.hospital,
      bio: bio || doctor.bio,
      consultationFee: consultationFee || doctor.consultationFee,
      languages: languages || doctor.languages,
      availableDays: availableDays || doctor.availableDays,
      workingHours: workingHours || doctor.workingHours
    });
    
    res.status(200).json({ 
      message: 'Doctor profile updated successfully',
      doctor
    });
  } catch (error) {
    console.error('Update doctor error:', error);
    res.status(500).json({ message: 'Error updating doctor profile' });
  }
};

// Get patients for a doctor
exports.getPatients = async (req, res) => {
  try {
    const doctorId = req.params.id;
    
    // Check if it's the doctor's own patients
    if (parseInt(doctorId) !== await Doctor.findOne({ where: { userId: req.userId } }).id) {
      return res.status(403).json({ message: 'You are not authorized to view these patients' });
    }
    
    // Find all patients who have appointments with this doctor
    const patients = await Patient.findAll({
      include: [
        {
          model: User,
          attributes: ['name', 'email', 'profileImage', 'phone']
        },
        {
          model: Appointment,
          where: { doctorId },
          required: true,
          attributes: []
        }
      ],
      distinct: true
    });
    
    res.status(200).json(patients);
  } catch (error) {
    console.error('Get doctor patients error:', error);
    res.status(500).json({ message: 'Error fetching patients for this doctor' });
  }
};

// Get appointments for a doctor
exports.getAppointments = async (req, res) => {
  try {
    const doctorId = req.params.id;
    const { status, date, limit = 10, offset = 0 } = req.query;
    
    // Check if it's the doctor's own appointments
    if (parseInt(doctorId) !== await Doctor.findOne({ where: { userId: req.userId } }).id) {
      return res.status(403).json({ message: 'You are not authorized to view these appointments' });
    }
    
    // Build query options
    const options = {
      where: { doctorId },
      include: [
        {
          model: Patient,
          include: [{
            model: User,
            attributes: ['name', 'email', 'profileImage', 'phone']
          }]
        }
      ],
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['date', 'ASC'], ['time', 'ASC']]
    };
    
    // Add filters if provided
    if (status) {
      options.where.status = status;
    }
    
    if (date) {
      options.where.date = date;
    }
    
    const appointments = await Appointment.findAndCountAll(options);
    
    res.status(200).json({
      totalItems: appointments.count,
      appointments: appointments.rows,
      currentPage: Math.floor(parseInt(offset) / parseInt(limit)) + 1,
      totalPages: Math.ceil(appointments.count / parseInt(limit))
    });
  } catch (error) {
    console.error('Get doctor appointments error:', error);
    res.status(500).json({ message: 'Error fetching appointments for this doctor' });
  }
};

// Get prescriptions for a doctor
exports.getPrescriptions = async (req, res) => {
  try {
    const doctorId = req.params.id;
    const { status, limit = 10, offset = 0 } = req.query;
    
    // Check if it's the doctor's own prescriptions
    if (parseInt(doctorId) !== await Doctor.findOne({ where: { userId: req.userId } }).id) {
      return res.status(403).json({ message: 'You are not authorized to view these prescriptions' });
    }
    
    // Build query options
    const options = {
      where: { doctorId },
      include: [
        {
          model: Patient,
          include: [{
            model: User,
            attributes: ['name', 'email', 'profileImage', 'phone']
          }]
        }
      ],
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['issueDate', 'DESC']]
    };
    
    // Add filters if provided
    if (status) {
      options.where.status = status;
    }
    
    const prescriptions = await Prescription.findAndCountAll(options);
    
    res.status(200).json({
      totalItems: prescriptions.count,
      prescriptions: prescriptions.rows,
      currentPage: Math.floor(parseInt(offset) / parseInt(limit)) + 1,
      totalPages: Math.ceil(prescriptions.count / parseInt(limit))
    });
  } catch (error) {
    console.error('Get doctor prescriptions error:', error);
    res.status(500).json({ message: 'Error fetching prescriptions for this doctor' });
  }
}; 