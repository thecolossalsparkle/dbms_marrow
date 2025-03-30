# Marrow Healthcare API

Backend server for the Marrow healthcare application that provides APIs for doctor-patient management, appointments, prescriptions, and medical records.

## Technologies Used

- Node.js
- Express.js
- MySQL
- Sequelize ORM
- JWT Authentication
- bcrypt for password hashing

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- MySQL Server
- npm

### Installation Steps

1. Clone the repository
```
git clone <repository-url>
cd server
```

2. Install dependencies
```
npm install
```

3. Configure environment variables
```
cp .env.example .env
```

4. Update the `.env` file with your local MySQL credentials and other configuration options

5. Create a MySQL database
```
CREATE DATABASE marrow_db;
```

6. Run the server
```
# For development with auto-restart
npm run dev

# For production
npm start
```

The server will start on the configured port (default: 5001). The database tables will be automatically created in development mode.

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register new user (doctor or patient)
- `POST /api/auth/login` - Login user
- `POST /api/auth/forgot-password` - Send password reset instructions
- `POST /api/auth/reset-password` - Reset password
- `GET /api/auth/me` - Get current user profile

### Doctors

- `GET /api/doctors` - Get all doctors
- `GET /api/doctors/:id` - Get doctor by ID
- `PUT /api/doctors/:id` - Update doctor profile
- `GET /api/doctors/:id/patients` - Get patients for a doctor
- `GET /api/doctors/:id/appointments` - Get appointments for a doctor
- `GET /api/doctors/:id/prescriptions` - Get prescriptions written by a doctor

### Patients

- `GET /api/patients` - Get all patients (doctors only)
- `GET /api/patients/:id` - Get patient by ID (doctor or self)
- `PUT /api/patients/:id` - Update patient profile
- `GET /api/patients/:id/appointments` - Get appointments for a patient
- `GET /api/patients/:id/prescriptions` - Get prescriptions for a patient
- `GET /api/patients/:id/records` - Get medical records for a patient

### Appointments

- `GET /api/appointments` - Get all appointments (admin only)
- `GET /api/appointments/:id` - Get appointment by ID
- `POST /api/appointments` - Create new appointment
- `PUT /api/appointments/:id` - Update appointment
- `PUT /api/appointments/:id/cancel` - Cancel appointment
- `PUT /api/appointments/:id/confirm` - Confirm appointment (doctors only)
- `PUT /api/appointments/:id/complete` - Mark appointment as completed (doctors only)

### Prescriptions

- `GET /api/prescriptions/:id` - Get prescription by ID
- `POST /api/prescriptions` - Create new prescription (doctors only)
- `PUT /api/prescriptions/:id` - Update prescription (doctors only)
- `PUT /api/prescriptions/:id/complete` - Mark prescription as completed
- `PUT /api/prescriptions/:id/cancel` - Cancel prescription (doctors only)

## Database Schema

The application uses the following main models:

1. Users - Authentication and basic profile
2. Doctors - Doctor-specific profile information
3. Patients - Patient-specific health information
4. Appointments - Doctor-patient appointments
5. Prescriptions - Medical prescriptions
6. Medical Records - Patient health records

## Authentication

The API uses JWT (JSON Web Token) for authentication. After logging in, include the token in the Authorization header for all protected routes:

```
Authorization: Bearer <token>
```