module.exports = (sequelize, Sequelize) => {
  const Prescription = sequelize.define('prescription', {
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
    appointmentId: {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'appointments',
        key: 'id'
      }
    },
    issueDate: {
      type: Sequelize.DATEONLY,
      allowNull: false,
      defaultValue: Sequelize.NOW
    },
    expiryDate: {
      type: Sequelize.DATEONLY,
      allowNull: true
    },
    medications: {
      type: Sequelize.TEXT,
      allowNull: false,
      get() {
        const rawValue = this.getDataValue('medications');
        return rawValue ? JSON.parse(rawValue) : [];
      },
      set(val) {
        this.setDataValue('medications', JSON.stringify(val));
      }
    },
    instructions: {
      type: Sequelize.TEXT,
      allowNull: true
    },
    diagnosis: {
      type: Sequelize.STRING,
      allowNull: true
    },
    status: {
      type: Sequelize.ENUM('active', 'completed', 'cancelled'),
      defaultValue: 'active'
    },
    refills: {
      type: Sequelize.INTEGER,
      defaultValue: 0
    },
    notes: {
      type: Sequelize.TEXT,
      allowNull: true
    },
    isSent: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    },
    pharmacyName: {
      type: Sequelize.STRING,
      allowNull: true
    },
    pharmacyAddress: {
      type: Sequelize.STRING,
      allowNull: true
    },
    pharmacyPhone: {
      type: Sequelize.STRING,
      allowNull: true
    }
  });

  return Prescription;
}; 