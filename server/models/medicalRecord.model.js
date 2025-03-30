module.exports = (sequelize, Sequelize) => {
  const MedicalRecord = sequelize.define('medicalRecord', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    patientId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'patients',
        key: 'id'
      }
    },
    doctorId: {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'doctors',
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
    recordType: {
      type: Sequelize.ENUM('lab_result', 'imaging', 'vital_signs', 'diagnosis', 'treatment_plan', 'note', 'other'),
      allowNull: false
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false
    },
    description: {
      type: Sequelize.TEXT,
      allowNull: true
    },
    recordDate: {
      type: Sequelize.DATEONLY,
      allowNull: false,
      defaultValue: Sequelize.NOW
    },
    data: {
      type: Sequelize.TEXT,
      allowNull: true,
      get() {
        const rawValue = this.getDataValue('data');
        return rawValue ? JSON.parse(rawValue) : null;
      },
      set(val) {
        this.setDataValue('data', JSON.stringify(val));
      }
    },
    fileUrl: {
      type: Sequelize.STRING,
      allowNull: true
    },
    isPrivate: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    },
    isShared: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    },
    sharedWith: {
      type: Sequelize.TEXT, // Stores an array of doctor IDs as JSON
      allowNull: true,
      get() {
        const rawValue = this.getDataValue('sharedWith');
        return rawValue ? JSON.parse(rawValue) : [];
      },
      set(val) {
        this.setDataValue('sharedWith', JSON.stringify(val));
      }
    }
  });

  return MedicalRecord;
}; 