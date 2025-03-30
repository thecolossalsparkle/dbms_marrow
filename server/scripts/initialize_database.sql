-- Marrow Medical Platform - Database Initialization Script
-- Run this script to set up the complete database structure for first-time users

-- Drop database if it exists (comment this out in production)
-- DROP DATABASE IF EXISTS marrow_db;

-- Create database
CREATE DATABASE IF NOT EXISTS marrow_db;
USE marrow_db;

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  role ENUM('admin', 'doctor', 'patient') DEFAULT 'patient',
  profileImage VARCHAR(255),
  phone VARCHAR(255),
  address VARCHAR(255),
  status ENUM('active', 'inactive', 'suspended') DEFAULT 'active',
  lastLogin DATETIME,
  resetPasswordToken VARCHAR(255),
  resetPasswordExpires DATETIME,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Doctors table
CREATE TABLE IF NOT EXISTS doctors (
  id INT AUTO_INCREMENT PRIMARY KEY,
  userId INT NOT NULL,
  specialty VARCHAR(255) NOT NULL,
  education TEXT,
  experience INT,
  licenseNumber VARCHAR(255),
  hospital VARCHAR(255),
  bio TEXT,
  consultationFee DECIMAL(10, 2),
  languages VARCHAR(255), -- Stored as comma-separated values
  availableDays VARCHAR(255), -- Stored as comma-separated values
  workingHours VARCHAR(255), -- Stored as JSON string
  rating FLOAT DEFAULT 0,
  reviewCount INT DEFAULT 0,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
);

-- Patients table
CREATE TABLE IF NOT EXISTS patients (
  id INT AUTO_INCREMENT PRIMARY KEY,
  userId INT NOT NULL,
  dateOfBirth DATE,
  gender ENUM('male', 'female', 'other'),
  bloodType VARCHAR(10),
  allergies TEXT, -- Stored as JSON
  emergencyContactName VARCHAR(255),
  emergencyContactPhone VARCHAR(255),
  emergencyContactRelationship VARCHAR(255),
  insurance VARCHAR(255),
  insuranceNumber VARCHAR(255),
  height FLOAT, -- In cm
  weight FLOAT, -- In kg
  chronicConditions TEXT, -- Stored as JSON
  pastSurgeries TEXT, -- Stored as JSON
  familyMedicalHistory TEXT,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
);

-- Appointments table
CREATE TABLE IF NOT EXISTS appointments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  doctorId INT NOT NULL,
  patientId INT NOT NULL,
  date DATE NOT NULL,
  time TIME NOT NULL,
  duration INT DEFAULT 30, -- Duration in minutes
  type ENUM('consultation', 'follow-up', 'check-up', 'emergency') DEFAULT 'consultation',
  method ENUM('in-person', 'video', 'phone') DEFAULT 'in-person',
  status ENUM('pending', 'confirmed', 'completed', 'cancelled', 'no-show') DEFAULT 'pending',
  notes TEXT,
  reasonForVisit TEXT,
  symptoms TEXT,
  followUpRecommended BOOLEAN DEFAULT FALSE,
  meetingLink VARCHAR(255),
  location VARCHAR(255),
  isCancelled BOOLEAN DEFAULT FALSE,
  cancellationReason VARCHAR(255),
  cancelledBy ENUM('doctor', 'patient'),
  reminder BOOLEAN DEFAULT TRUE,
  reminderSent BOOLEAN DEFAULT FALSE,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (doctorId) REFERENCES doctors(id) ON DELETE CASCADE,
  FOREIGN KEY (patientId) REFERENCES patients(id) ON DELETE CASCADE
);

-- Prescriptions table
CREATE TABLE IF NOT EXISTS prescriptions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  doctorId INT NOT NULL,
  patientId INT NOT NULL,
  appointmentId INT,
  issueDate DATE NOT NULL DEFAULT (CURRENT_DATE),
  expiryDate DATE,
  medications TEXT NOT NULL, -- Stored as JSON
  instructions TEXT,
  diagnosis VARCHAR(255),
  status ENUM('active', 'completed', 'cancelled') DEFAULT 'active',
  refills INT DEFAULT 0,
  notes TEXT,
  isSent BOOLEAN DEFAULT FALSE,
  pharmacyName VARCHAR(255),
  pharmacyAddress VARCHAR(255),
  pharmacyPhone VARCHAR(255),
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (doctorId) REFERENCES doctors(id) ON DELETE CASCADE,
  FOREIGN KEY (patientId) REFERENCES patients(id) ON DELETE CASCADE,
  FOREIGN KEY (appointmentId) REFERENCES appointments(id) ON DELETE SET NULL
);

-- Medical Records table
CREATE TABLE IF NOT EXISTS medical_records (
  id INT AUTO_INCREMENT PRIMARY KEY,
  patientId INT NOT NULL,
  doctorId INT,
  appointmentId INT,
  recordType ENUM('lab_result', 'imaging', 'vital_signs', 'diagnosis', 'treatment_plan', 'note', 'other') NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  recordDate DATE NOT NULL DEFAULT (CURRENT_DATE),
  data TEXT, -- Stored as JSON
  fileUrl VARCHAR(255),
  isPrivate BOOLEAN DEFAULT FALSE,
  isShared BOOLEAN DEFAULT FALSE,
  sharedWith TEXT, -- Stored as JSON
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (patientId) REFERENCES patients(id) ON DELETE CASCADE,
  FOREIGN KEY (doctorId) REFERENCES doctors(id) ON DELETE SET NULL,
  FOREIGN KEY (appointmentId) REFERENCES appointments(id) ON DELETE SET NULL
);

-- Messages table for storing conversations
CREATE TABLE IF NOT EXISTS messages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  senderId INT NOT NULL,
  receiverId INT NOT NULL,
  content TEXT NOT NULL,
  timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
  isRead BOOLEAN DEFAULT FALSE,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (senderId) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (receiverId) REFERENCES users(id) ON DELETE CASCADE
);

-- Conversations table to track ongoing conversations between users
CREATE TABLE IF NOT EXISTS conversations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  participant1Id INT NOT NULL,
  participant2Id INT NOT NULL,
  lastMessageId INT,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (participant1Id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (participant2Id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (lastMessageId) REFERENCES messages(id) ON DELETE SET NULL,
  UNIQUE KEY unique_conversation (participant1Id, participant2Id)
);

-- Reviews table for doctor ratings
CREATE TABLE IF NOT EXISTS reviews (
  id INT AUTO_INCREMENT PRIMARY KEY,
  doctorId INT NOT NULL,
  patientId INT NOT NULL,
  appointmentId INT,
  rating FLOAT NOT NULL CHECK (rating BETWEEN 1 AND 5),
  comment TEXT,
  isAnonymous BOOLEAN DEFAULT FALSE,
  isVerified BOOLEAN DEFAULT TRUE,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (doctorId) REFERENCES doctors(id) ON DELETE CASCADE,
  FOREIGN KEY (patientId) REFERENCES patients(id) ON DELETE CASCADE,
  FOREIGN KEY (appointmentId) REFERENCES appointments(id) ON DELETE SET NULL,
  UNIQUE KEY unique_review (patientId, doctorId, appointmentId)
);

-- Notifications table
CREATE TABLE IF NOT EXISTS notifications (
  id INT AUTO_INCREMENT PRIMARY KEY,
  userId INT NOT NULL,
  title VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  type ENUM('appointment', 'message', 'prescription', 'medical_record', 'system', 'other') NOT NULL,
  isRead BOOLEAN DEFAULT FALSE,
  linkId INT, -- ID related to the notification type (appointmentId, messageId, etc.)
  linkType VARCHAR(255), -- Type of link (appointment, message, prescription, etc.)
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
);

-- Availability table for doctors' schedules
CREATE TABLE IF NOT EXISTS availability (
  id INT AUTO_INCREMENT PRIMARY KEY,
  doctorId INT NOT NULL,
  day VARCHAR(20) NOT NULL, -- Monday, Tuesday, etc.
  startTime TIME NOT NULL,
  endTime TIME NOT NULL,
  isAvailable BOOLEAN DEFAULT TRUE,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (doctorId) REFERENCES doctors(id) ON DELETE CASCADE
);

-- Payment table for appointment payments
CREATE TABLE IF NOT EXISTS payments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  appointmentId INT NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  currency VARCHAR(10) DEFAULT 'USD',
  status ENUM('pending', 'completed', 'refunded', 'failed') DEFAULT 'pending',
  paymentMethod VARCHAR(50),
  transactionId VARCHAR(255),
  paymentDate DATETIME,
  refundAmount DECIMAL(10, 2),
  refundDate DATETIME,
  notes TEXT,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (appointmentId) REFERENCES appointments(id) ON DELETE CASCADE
);

-- Audit log table
CREATE TABLE IF NOT EXISTS audit_logs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  userId INT,
  action VARCHAR(255) NOT NULL,
  entityType VARCHAR(50) NOT NULL, -- user, doctor, patient, appointment, etc.
  entityId INT NOT NULL,
  oldValue TEXT,
  newValue TEXT,
  ipAddress VARCHAR(45),
  userAgent VARCHAR(255),
  timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (userId) REFERENCES users(id) ON DELETE SET NULL
);

-- Create indexes for faster queries
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_doctors_specialty ON doctors(specialty);
CREATE INDEX idx_doctors_rating ON doctors(rating);
CREATE INDEX idx_patients_userId ON patients(userId);
CREATE INDEX idx_appointments_date ON appointments(date);
CREATE INDEX idx_appointments_doctorId_date ON appointments(doctorId, date);
CREATE INDEX idx_appointments_patientId_date ON appointments(patientId, date);
CREATE INDEX idx_appointments_status ON appointments(status);
CREATE INDEX idx_prescriptions_doctorId ON prescriptions(doctorId);
CREATE INDEX idx_prescriptions_patientId ON prescriptions(patientId);
CREATE INDEX idx_medical_records_patientId ON medical_records(patientId);
CREATE INDEX idx_medical_records_recordType ON medical_records(recordType);
CREATE INDEX idx_messages_senderId ON messages(senderId);
CREATE INDEX idx_messages_receiverId ON messages(receiverId);
CREATE INDEX idx_messages_timestamp ON messages(timestamp);
CREATE INDEX idx_conversations_updated ON conversations(updatedAt);
CREATE INDEX idx_notifications_userId ON notifications(userId);
CREATE INDEX idx_notifications_isRead ON notifications(isRead);
CREATE INDEX idx_availability_doctorId_day ON availability(doctorId, day);
CREATE INDEX idx_payments_appointmentId ON payments(appointmentId);
CREATE INDEX idx_payments_status ON payments(status);

-- Print completion message
SELECT 'Database schema created successfully.' AS 'Status'; 