import api from './api';

class PatientService {
  async getAllPatients() {
    return await api.get('/doctors/patients');
  }

  async getPatientProfile() {
    return await api.get('/patients/profile');
  }

  async updatePatientProfile(patientData) {
    return await api.put('/patients/profile', patientData);
  }

  async getPatientAppointments() {
    return await api.get('/patients/appointments');
  }

  async getPatientPrescriptions() {
    return await api.get('/patients/prescriptions');
  }

  async getPatientMedicalRecords() {
    return await api.get('/patients/medical-records');
  }

  async getMedicationReminders() {
    return await api.get('/patients/medication-reminders');
  }

  async getHealthMetrics() {
    return await api.get('/patients/health-metrics');
  }

  async getDoctorsList() {
    return await api.get('/patients/doctors');
  }

  async getSpecializations() {
    return await api.get('/patients/specializations');
  }

  async getLanguages() {
    return await api.get('/patients/languages');
  }

  async getAvailabilityOptions() {
    return await api.get('/patients/availability-options');
  }
}

export default new PatientService(); 