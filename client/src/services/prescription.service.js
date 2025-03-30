import api from './api';

class PrescriptionService {
  async getAllPrescriptions() {
    return await api.get('/prescriptions');
  }

  async getPrescriptionById(id) {
    return await api.get(`/prescriptions/${id}`);
  }

  async createPrescription(prescriptionData) {
    return await api.post('/prescriptions', prescriptionData);
  }

  async updatePrescription(id, prescriptionData) {
    return await api.put(`/prescriptions/${id}`, prescriptionData);
  }

  async deletePrescription(id) {
    return await api.delete(`/prescriptions/${id}`);
  }
}

export default new PrescriptionService(); 