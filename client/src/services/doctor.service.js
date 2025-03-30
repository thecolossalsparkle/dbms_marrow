import api from './api';

class DoctorService {
  async getAllDoctors() {
    return await api.get('/doctors');
  }

  async getDoctorById(id) {
    return await api.get(`/doctors/${id}`);
  }

  async getDoctorProfile() {
    return await api.get('/doctors/profile');
  }

  async updateDoctorProfile(doctorData) {
    return await api.put('/doctors/profile', doctorData);
  }

  async getDoctorAppointments() {
    return await api.get('/doctors/appointments');
  }

  async getDoctorPrescriptions() {
    return await api.get('/doctors/prescriptions');
  }

  async updateAppointmentStatus(appointmentId, status) {
    return await api.put(`/appointments/${appointmentId}/status`, { status });
  }
}

export default new DoctorService(); 