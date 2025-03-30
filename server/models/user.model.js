module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define('user', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    role: {
      type: Sequelize.ENUM('admin', 'doctor', 'patient'),
      defaultValue: 'patient'
    },
    profileImage: {
      type: Sequelize.STRING,
      allowNull: true
    },
    phone: {
      type: Sequelize.STRING,
      allowNull: true
    },
    address: {
      type: Sequelize.STRING,
      allowNull: true
    },
    status: {
      type: Sequelize.ENUM('active', 'inactive', 'suspended'),
      defaultValue: 'active'
    },
    lastLogin: {
      type: Sequelize.DATE,
      allowNull: true
    },
    resetPasswordToken: {
      type: Sequelize.STRING,
      allowNull: true
    },
    resetPasswordExpires: {
      type: Sequelize.DATE,
      allowNull: true
    }
  });

  return User;
}; 