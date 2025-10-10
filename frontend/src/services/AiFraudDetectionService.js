// services/AiFraudDetectionService.js
import apiClient from './GlobalApi';

class AiFraudDetectionService {
  
  // Analisis dokumen untuk deteksi kecurangan
  async analyzeDocumentForFraud(programId, file, jenisDokumen) {
    const formData = new FormData();
    formData.append('document_file', file);
    formData.append('jenis_dokumen', jenisDokumen);
    formData.append('analisis_tipe', 'fraud_detection');

    const response = await apiClient.post(
      `/ai-fraud-detection/program/${programId}/analyze-document`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        timeout: 60000,
      }
    );
    return response.data;
  }

  // Analisis RAB untuk deteksi ketidakwajaran harga
  async analyzeRABForAnomalies(programId, rabData) {
    const response = await apiClient.post(
      `/ai-fraud-detection/program/${programId}/analyze-rab`,
      {
        rab_items: rabData,
        analisis_tipe: 'rab_anomaly'
      }
    );
    return response.data;
  }

  // Analisis komprehensif semua dokumen program
  async comprehensiveProgramAnalysis(programId) {
    const response = await apiClient.get(
      `/ai-fraud-detection/program/${programId}/comprehensive-analysis`
    );
    return response.data;
  }

  // Get status analisis
  async getAnalysisStatus(analisisId) {
    const response = await apiClient.get(`/ai-fraud-detection/analysis/${analisisId}/status`);
    return response.data;
  }

  // Get rekomendasi perbaikan berdasarkan temuan
  async getRecommendations(analisisId) {
    const response = await apiClient.get(`/ai-fraud-detection/analysis/${analisisId}/recommendations`);
    return response.data;
  }
}

export default new AiFraudDetectionService();