module.exports = (sequelize, Sequelize) => {
  const Appointment = sequelize.define('appointment', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    doctorId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'doctors',
        key: 'id'
      }
    },
    patientId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'patients',
        key: 'id'
      }
    },
    date: {
      type: Sequelize.DATEONLY,
      allowNull: false
    },
    time: {
      type: Sequelize.TIME,
      allowNull: false
    },
    duration: {
      type: Sequelize.INTEGER, // Duration in minutes
      defaultValue: 30
    },
    type: {
      type: Sequelize.ENUM('consultation', 'follow-up', 'check-up', 'emergency'),
      defaultValue: 'consultation'
    },
    method: {
      type: Sequelize.ENUM('in-person', 'video', 'phone'),
      defaultValue: 'in-person'
    },
    status: {
      type: Sequelize.ENUM('pending', 'confirmed', 'completed', 'cancelled', 'no-show'),
      defaultValue: 'pending'
    },
    notes: {
      type: Sequelize.TEXT,
      allowNull: true
    },
    reasonForVisit: {
      type: Sequelize.TEXT,
      allowNull: true
    },
    symptoms: {
      type: Sequelize.TEXT,
      allowNull: true
    },
    followUpRecommended: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    },
    meetingLink: {
      type: Sequelize.STRING,
      allowNull: true
    },
    location: {
      type: Sequelize.STRING,
      allowNull: true
    },
    isCancelled: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    },
    cancellationReason: {
      type: Sequelize.STRING,
      allowNull: true
    },
    cancelledBy: {
      type: Sequelize.ENUM('doctor', 'patient'),
      allowNull: true
    },
    reminder: {
      type: Sequelize.BOOLEAN,
      defaultValue: true
    },
    reminderSent: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    }
  });

  return Appointment;
}; 