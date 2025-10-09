import api from './GlobalApi';

class MonitoringService {
  // Get semua program dengan filter
  async getPrograms(filters = {}) {
    try {
      const response = await api.get('/program', { params: filters });
      return response.data;
    } catch (error) {
      console.error('Error fetching programs:', error);
      throw error;
    }
  }

  // Get statistik program
  async getStatistics() {
    try {
      const response = await api.get('/program/statistics');
      return response.data;
    } catch (error) {
      console.error('Error fetching statistics:', error);
      throw error;
    }
  }

  // Filter program
  async filterPrograms(filters) {
    try {
      const response = await api.get('/program/filter', { params: filters });
      return response.data;
    } catch (error) {
      console.error('Error filtering programs:', error);
      throw error;
    }
  }

  // Get detail program
  async getProgramDetail(id) {
    try {
      const response = await api.get(`/program/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching program detail:', error);
      throw error;
    }
  }

  // Export laporan
  async exportReport(filters = {}) {
    try {
      const response = await api.get('/program/export', { 
        params: filters,
        responseType: 'blob'
      });
      return response.data;
    } catch (error) {
      console.error('Error exporting report:', error);
      throw error;
    }
  }

  // Update status program
  async updateProgramStatus(id, status, catatan = '') {
    try {
      const response = await api.post(`/program/${id}/change-status`, {
        status_program: status,
        catatan
      });
      return response.data;
    } catch (error) {
      console.error('Error updating program status:', error);
      throw error;
    }
  }
}

export default new MonitoringService();