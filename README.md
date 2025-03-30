# Marrow - Healthcare Platform

Marrow is a modern healthcare platform that connects doctors and patients, facilitating appointment scheduling, medical records management, prescriptions, and secure messaging.

## Features

- **User Authentication**: Secure login and registration for doctors and patients
- **Appointment Management**: Schedule, reschedule, and cancel appointments
- **Medical Records**: Store and access patient medical records securely
- **Prescription Management**: Create and manage digital prescriptions
- **Messaging System**: Secure communication between doctors and patients
- **Beautiful UI**: Modern and responsive interface built with Material UI

## Prerequisites

- Node.js (v16 or higher)
- MySQL (v8 or higher)
- npm or yarn

## Quick Start Guide for First-Time Users

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/marrow.git
cd marrow
```

### 2. Setup the server

```bash
cd server
npm install
npm run setup
```

The setup script will:
- Check for dependencies
- Create a `.env` file (you'll be prompted for database credentials)
- Set up the database with all required tables
- Create necessary directories
- Generate security keys
- Add sample data for testing

### 3. Start the server

```bash
npm start
```

Server will be running at http://localhost:5001 (or your configured port)

### 4. Setup the client

```bash
cd ../client
npm install
```

### 5. Start the client

```bash
npm start
```

Client will be running at http://localhost:3000

## Default Credentials

After setup, you can use these test accounts:

### Admin User
- Email: admin@marrow.com
- Password: admin123

### Doctor
- Email: doctor@marrow.com
- Password: password123

### Patient
- Email: patient@marrow.com
- Password: password123

## Manual Setup (if needed)

If the automatic setup doesn't work for any reason, you can set up the system manually:

### 1. Database Setup

Create a MySQL database:

```sql
CREATE DATABASE marrow_db;
```

### 2. Environment Configuration

Create a `.env` file in the server directory with the following:

```
# Server Configuration
PORT=5001
NODE_ENV=development

# Database Configuration
DB_HOST=localhost
DB_PORT=3306
DB_NAME=marrow_db
DB_USER=your_mysql_username
DB_PASSWORD=your_mysql_password

# JWT Configuration
JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=7d

# File Upload Configuration
UPLOAD_DIR=uploads
MAX_FILE_SIZE=5242880
```

### 3. Initialize the Database

Run the SQL script to create tables and add initial data:

```bash
cd server
mysql -u your_mysql_username -p marrow_db < scripts/initialize_database.sql
```

## Project Structure

```
marrow/
├── client/                 # React frontend
│   ├── public/             # Static assets
│   └── src/                # Source files
│       ├── components/     # UI components
│       ├── contexts/       # Context providers
│       ├── pages/          # Application pages
│       └── App.js          # Main app component
│
├── server/                 # Node.js backend
│   ├── config/             # Configuration files
│   ├── controllers/        # API controllers
│   ├── middleware/         # Express middleware
│   ├── models/             # Database models
│   ├── routes/             # API routes
│   ├── scripts/            # Setup and utility scripts
│   └── server.js           # Server entry point
```

## API Documentation

API documentation is available at http://localhost:5001/api-docs when the server is running.

## Database Schema

The database includes the following tables:

- `users` - Basic user information and authentication
- `doctors` - Doctor-specific information
- `patients` - Patient-specific information
- `appointments` - Scheduled appointments
- `prescriptions` - Medication prescriptions
- `medical_records` - Patient medical records
- `messages` - Communication between users
- `conversations` - Tracks ongoing conversations
- `reviews` - Doctor reviews and ratings
- `notifications` - System notifications
- `availability` - Doctor availability schedule
- `payments` - Appointment payment records
- `audit_logs` - System audit trail

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, email support@marrow.com or open an issue in the repository. 