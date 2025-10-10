// services/AiDocumentService.js
import apiClient from './GlobalApi';

class AiDocumentService {
  async uploadRundown(programId, file, namaDokumen) {
    const formData = new FormData();
    formData.append('rundown_file', file);
    formData.append('nama_dokumen', namaDokumen);

    const response = await apiClient.post(
      `/ai-document/program/${programId}/upload-rundown`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        timeout: 60000, // 60 detik timeout
      }
    );
    return response.data;
  }

  async getProcessingStatus(dokumenId) {
    const response = await apiClient.get(`/ai-document/document/${dokumenId}/status`);
    return response.data;
  }

  async generateTahapan(dokumenId) {
    const response = await apiClient.post(`/ai-document/document/${dokumenId}/generate-tahapan`);
    return response.data;
  }
}

export default new AiDocumentService();