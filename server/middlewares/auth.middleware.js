const jwt = require('jsonwebtoken');
const db = require('../models');
const User = db.users;

const verifyToken = (req, res, next) => {
  let token = req.headers['authorization'];

  if (!token) {
    return res.status(403).json({
      message: 'No token provided!'
    });
  }

  // Remove Bearer prefix if it exists
  if (token.startsWith('Bearer ')) {
    token = token.slice(7, token.length);
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    req.userRole = decoded.role;
    req.userEmail = decoded.email;
    next();
  } catch (error) {
    console.error('JWT verification error:', error);
    return res.status(401).json({
      message: 'Unauthorized!'
    });
  }
};

const isAdmin = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    if (user.role === 'admin') {
      next();
      return;
    }

    res.status(403).json({
      message: 'Require Admin Role!'
    });
  });
};

const isDoctor = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    if (user.role === 'doctor' || user.role === 'admin') {
      next();
      return;
    }

    res.status(403).json({
      message: 'Require Doctor Role!'
    });
  });
};

const isPatient = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    if (user.role === 'patient' || user.role === 'admin') {
      next();
      return;
    }

    res.status(403).json({
      message: 'Require Patient Role!'
    });
  });
};

const isDoctorOrSelf = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.userId);
    const requestedId = parseInt(req.params.id);
    
    // Check if user is a doctor/admin or if they are accessing their own resource
    const userIsDoctor = user.role === 'doctor' || user.role === 'admin';
    
    // For patients, need to verify the requested ID matches their profile ID
    let isSelf = false;
    if (user.role === 'patient') {
      const patientProfile = await db.patients.findOne({ where: { userId: user.id } });
      isSelf = patientProfile && patientProfile.id === requestedId;
    }
    
    if (userIsDoctor || isSelf) {
      next();
      return;
    }
    
    res.status(403).json({
      message: 'Permission denied!'
    });
  } catch (error) {
    console.error('Authorization error:', error);
    res.status(500).json({
      message: 'Error checking permissions'
    });
  }
};

const authMiddleware = {
  verifyToken,
  isAdmin,
  isDoctor,
  isPatient,
  isDoctorOrSelf
};

module.exports = authMiddleware; 