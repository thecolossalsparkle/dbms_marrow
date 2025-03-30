import api from './api';

class AppointmentService {
  async getAllAppointments() {
    return await api.get('/appointments');
  }

  async getAppointmentById(id) {
    return await api.get(`/appointments/${id}`);
  }

  async createAppointment(appointmentData) {
    return await api.post('/appointments', appointmentData);
  }

  async updateAppointment(id, appointmentData) {
    return await api.put(`/appointments/${id}`, appointmentData);
  }

  async cancelAppointment(id) {
    return await api.put(`/appointments/${id}/cancel`);
  }

  async getAvailableSlots(doctorId, date) {
    return await api.get(`/appointments/available-slots`, {
      params: { doctorId, date }
    });
  }
}

export default new AppointmentService(); 