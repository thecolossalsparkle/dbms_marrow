const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../models');
const User = db.users;
const Doctor = db.doctors;
const Patient = db.patients;

// Register new user
exports.register = async (req, res) => {
  try {
    const { email, password, name, role, specialty, dateOfBirth, gender } = req.body;

    // Check if user already exists
    const userExists = await User.findOne({ where: { email } });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      email,
      password: hashedPassword,
      name,
      role: role || 'patient'
    });

    // Create profile based on role
    if (user.role === 'doctor') {
      await Doctor.create({
        userId: user.id,
        specialty: specialty || 'General Physician'
      });
    } else if (user.role === 'patient') {
      await Patient.create({
        userId: user.id,
        dateOfBirth,
        gender
      });
    }

    // Generate token
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.status(201).json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
      },
      token
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Error registering user' });
  }
};

// Login user
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate token
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    // Update last login
    await user.update({ lastLogin: new Date() });

    // Get profile data
    let profileData = null;
    if (user.role === 'doctor') {
      profileData = await Doctor.findOne({ where: { userId: user.id } });
    } else if (user.role === 'patient') {
      profileData = await Patient.findOne({ where: { userId: user.id } });
    }

    res.status(200).json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        profileId: profileData ? profileData.id : null
      },
      token
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Error logging in' });
  }
};

// Forgot password
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    // Find user
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: 'No user found with this email' });
    }

    // Generate reset token (would typically send via email)
    const resetToken = Math.random().toString(36).substring(2, 15);
    const resetExpires = new Date();
    resetExpires.setHours(resetExpires.getHours() + 1); // Token valid for 1 hour

    await user.update({
      resetPasswordToken: resetToken,
      resetPasswordExpires: resetExpires
    });

    // In a real application, you'd send an email with the reset link
    // For now, we'll just return the token in the response
    res.status(200).json({
      message: 'Password reset instructions sent to your email',
      resetToken // Would not include this in production
    });
  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({ message: 'Error processing request' });
  }
};

// Reset password
exports.resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    // Find user with valid token
    const user = await User.findOne({
      where: {
        resetPasswordToken: token,
        resetPasswordExpires: { [db.Sequelize.Op.gt]: new Date() }
      }
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired reset token' });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update password and clear reset token
    await user.update({
      password: hashedPassword,
      resetPasswordToken: null,
      resetPasswordExpires: null
    });

    res.status(200).json({ message: 'Password has been reset successfully' });
  } catch (error) {
    console.error('Reset password error:', error);
    res.status(500).json({ message: 'Error resetting password' });
  }
};

// Get current user
exports.getCurrentUser = async (req, res) => {
  try {
    // User details are attached to req object by auth middleware
    const userId = req.userId;
    
    const user = await User.findByPk(userId, {
      attributes: { exclude: ['password', 'resetPasswordToken', 'resetPasswordExpires'] }
    });
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Get profile data
    let profileData = null;
    if (user.role === 'doctor') {
      profileData = await Doctor.findOne({ where: { userId: user.id } });
    } else if (user.role === 'patient') {
      profileData = await Patient.findOne({ where: { userId: user.id } });
    }

    res.status(200).json({
      user: {
        ...user.toJSON(),
        profileId: profileData ? profileData.id : null
      }
    });
  } catch (error) {
    console.error('Get current user error:', error);
    res.status(500).json({ message: 'Error fetching user data' });
  }
}; 