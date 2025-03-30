module.exports = (sequelize, Sequelize) => {
  const Patient = sequelize.define('patient', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    dateOfBirth: {
      type: Sequelize.DATEONLY,
      allowNull: true
    },
    gender: {
      type: Sequelize.ENUM('male', 'female', 'other'),
      allowNull: true
    },
    bloodType: {
      type: Sequelize.STRING,
      allowNull: true
    },
    allergies: {
      type: Sequelize.TEXT,
      allowNull: true,
      get() {
        const rawValue = this.getDataValue('allergies');
        return rawValue ? JSON.parse(rawValue) : [];
      },
      set(val) {
        this.setDataValue('allergies', JSON.stringify(val));
      }
    },
    emergencyContactName: {
      type: Sequelize.STRING,
      allowNull: true
    },
    emergencyContactPhone: {
      type: Sequelize.STRING,
      allowNull: true
    },
    emergencyContactRelationship: {
      type: Sequelize.STRING,
      allowNull: true
    },
    insurance: {
      type: Sequelize.STRING,
      allowNull: true
    },
    insuranceNumber: {
      type: Sequelize.STRING,
      allowNull: true
    },
    height: {
      type: Sequelize.FLOAT, // In cm
      allowNull: true
    },
    weight: {
      type: Sequelize.FLOAT, // In kg
      allowNull: true
    },
    chronicConditions: {
      type: Sequelize.TEXT,
      allowNull: true,
      get() {
        const rawValue = this.getDataValue('chronicConditions');
        return rawValue ? JSON.parse(rawValue) : [];
      },
      set(val) {
        this.setDataValue('chronicConditions', JSON.stringify(val));
      }
    },
    pastSurgeries: {
      type: Sequelize.TEXT,
      allowNull: true,
      get() {
        const rawValue = this.getDataValue('pastSurgeries');
        return rawValue ? JSON.parse(rawValue) : [];
      },
      set(val) {
        this.setDataValue('pastSurgeries', JSON.stringify(val));
      }
    },
    familyMedicalHistory: {
      type: Sequelize.TEXT,
      allowNull: true
    }
  });

  return Patient;
}; 