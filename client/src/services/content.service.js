import api from './api';

class ContentService {
  async getFeatures() {
    return await api.get('/content/features');
  }

  async getStatistics() {
    return await api.get('/content/statistics');
  }

  async getTestimonials() {
    return await api.get('/content/testimonials');
  }

  async getSpecialties() {
    return await api.get('/content/specialties');
  }

  async getAchievements() {
    return await api.get('/content/achievements');
  }
}

export default new ContentService(); 