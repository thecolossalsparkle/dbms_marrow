const db = require('../models');
const Appointment = db.appointments;
const Doctor = db.doctors;
const Patient = db.patients;
const User = db.users;

// Create new appointment
exports.create = async (req, res) => {
  try {
    const { doctorId, appointmentDate, timeSlot, reason } = req.body;
    
    // Find patient by userId
    const patient = await Patient.findOne({
      where: { userId: req.userId }
    });
    
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    
    // Check if doctor exists
    const doctor = await Doctor.findByPk(doctorId);
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }
    
    // Check if slot is available
    const existingAppointment = await Appointment.findOne({
      where: {
        doctorId,
        appointmentDate,
        timeSlot,
        status: { [db.Sequelize.Op.not]: 'CANCELLED' }
      }
    });
    
    if (existingAppointment) {
      return res.status(400).json({ message: 'This time slot is already booked' });
    }
    
    // Create appointment
    const appointment = await Appointment.create({
      doctorId,
      patientId: patient.id,
      appointmentDate,
      timeSlot,
      reason,
      status: 'PENDING'
    });
    
    res.status(201).json(appointment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all appointments
exports.findAll = async (req, res) => {
  try {
    const appointments = await Appointment.findAll({
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
      order: [['appointmentDate', 'DESC']]
    });
    
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get appointment by id
exports.findOne = async (req, res) => {
  try {
    const id = req.params.id;
    
    const appointment = await Appointment.findByPk(id, {
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
    
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    
    res.status(200).json(appointment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update appointment
exports.update = async (req, res) => {
  try {
    const id = req.params.id;
    const { reason, appointmentDate, timeSlot } = req.body;
    
    const appointment = await Appointment.findByPk(id);
    
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    
    // Check if slot is available if date or time changed
    if (appointmentDate !== appointment.appointmentDate || timeSlot !== appointment.timeSlot) {
      const existingAppointment = await Appointment.findOne({
        where: {
          doctorId: appointment.doctorId,
          appointmentDate,
          timeSlot,
          status: { [db.Sequelize.Op.not]: 'CANCELLED' },
          id: { [db.Sequelize.Op.not]: id }
        }
      });
      
      if (existingAppointment) {
        return res.status(400).json({ message: 'This time slot is already booked' });
      }
    }
    
    await appointment.update({
      reason,
      appointmentDate,
      timeSlot
    });
    
    res.status(200).json(appointment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update appointment status
exports.updateStatus = async (req, res) => {
  try {
    const id = req.params.id;
    const { status } = req.body;
    
    if (!['PENDING', 'CONFIRMED', 'COMPLETED', 'CANCELLED'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }
    
    const appointment = await Appointment.findByPk(id);
    
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    
    await appointment.update({ status });
    
    res.status(200).json(appointment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Cancel appointment
exports.cancel = async (req, res) => {
  try {
    const id = req.params.id;
    
    const appointment = await Appointment.findByPk(id);
    
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    
    await appointment.update({ status: 'CANCELLED' });
    
    res.status(200).json(appointment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get available slots
exports.getAvailableSlots = async (req, res) => {
  try {
    const { doctorId, date } = req.query;
    
    if (!doctorId || !date) {
      return res.status(400).json({ message: 'Doctor ID and date are required' });
    }
    
    // Check if doctor exists
    const doctor = await Doctor.findByPk(doctorId);
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }
    
    // Define all possible time slots
    const allTimeSlots = [
      '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
      '12:00 PM', '12:30 PM', '01:00 PM', '01:30 PM', '02:00 PM', '02:30 PM',
      '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM', '05:00 PM'
    ];
    
    // Find booked slots
    const bookedAppointments = await Appointment.findAll({
      where: {
        doctorId,
        appointmentDate: date,
        status: { [db.Sequelize.Op.not]: 'CANCELLED' }
      },
      attributes: ['timeSlot']
    });
    
    const bookedSlots = bookedAppointments.map(appointment => appointment.timeSlot);
    
    // Filter available slots
    const availableSlots = allTimeSlots.filter(slot => !bookedSlots.includes(slot));
    
    res.status(200).json(availableSlots);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}; 