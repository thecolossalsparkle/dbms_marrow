module.exports = (sequelize, Sequelize) => {
  const Doctor = sequelize.define('doctor', {
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
    specialty: {
      type: Sequelize.STRING,
      allowNull: false
    },
    education: {
      type: Sequelize.TEXT,
      allowNull: true
    },
    experience: {
      type: Sequelize.INTEGER, // Years of experience
      allowNull: true
    },
    licenseNumber: {
      type: Sequelize.STRING,
      allowNull: true
    },
    hospital: {
      type: Sequelize.STRING,
      allowNull: true
    },
    bio: {
      type: Sequelize.TEXT,
      allowNull: true
    },
    consultationFee: {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: true
    },
    languages: {
      type: Sequelize.STRING, // Stored as comma-separated values
      allowNull: true,
      get() {
        const rawValue = this.getDataValue('languages');
        return rawValue ? rawValue.split(',') : [];
      },
      set(val) {
        this.setDataValue('languages', val.join(','));
      }
    },
    availableDays: {
      type: Sequelize.STRING, // Stored as comma-separated values (e.g., "Mon,Tue,Wed")
      allowNull: true,
      get() {
        const rawValue = this.getDataValue('availableDays');
        return rawValue ? rawValue.split(',') : [];
      },
      set(val) {
        this.setDataValue('availableDays', val.join(','));
      }
    },
    workingHours: {
      type: Sequelize.STRING, // Stored as JSON string (e.g., "{"start": "09:00", "end": "17:00"}")
      allowNull: true,
      get() {
        const rawValue = this.getDataValue('workingHours');
        return rawValue ? JSON.parse(rawValue) : null;
      },
      set(val) {
        this.setDataValue('workingHours', JSON.stringify(val));
      }
    },
    rating: {
      type: Sequelize.FLOAT,
      defaultValue: 0
    },
    reviewCount: {
      type: Sequelize.INTEGER,
      defaultValue: 0
    }
  });

  return Doctor;
}; 