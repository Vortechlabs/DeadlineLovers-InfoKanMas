// ProgramService.js - PERBAIKI DENGAN INI
import apiClient from './GlobalApi';

class ProgramService {
  // Get semua program dengan filter
  async getPrograms(filters = {}) {
    try {
      const response = await apiClient.get('/program', { params: filters });
      return response.data;
    } catch (error) {
      console.error('Error fetching programs:', error);
      throw error;
    }
  }

  // Get detail program
  async getProgramDetail(id) {
    try {
      const response = await apiClient.get(`/program/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching program detail:', error);
      throw error;
    }
  }

  // Update progress program
  async updateProgress(programId, progressData) {
    try {
      const response = await apiClient.post(`/program/${programId}/progress`, progressData);
      return response.data;
    } catch (error) {
      console.error('Error updating progress:', error);
      throw error;
    }
  }

  // Upload dokumentasi progress
  async uploadProgressDocument(programId, progressId, file) {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('progress_id', progressId);
      formData.append('jenis', this.getFileType(file.type));

      const response = await apiClient.post(
        `/program/${programId}/dokumentasi`, 
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error uploading document:', error);
      throw error;
    }
  }

  // Delete program
  async deleteProgram(id) {
    try {
      const response = await apiClient.delete(`/program/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting program:', error);
      throw error;
    }
  }

  // Export program
  async exportProgram(id) {
    try {
      const response = await apiClient.get(`/program/${id}/export`, {
        responseType: 'blob'
      });
      return response.data;
    } catch (error) {
      console.error('Error exporting program:', error);
      throw error;
    }
  }

  // Get metadata untuk form create
  async getCreateMetadata() {
    const response = await apiClient.get('/program/create/metadata');
    return response.data;
  }

  // Create program baru
  async createProgram(programData) {
    const transformedData = this.transformProgramData(programData);
    const response = await apiClient.post('/program', transformedData);
    return response.data;
  }

  // Submit program untuk verifikasi
  async submitProgram(programId) {
    const response = await apiClient.post(`/program/${programId}/submit`);
    return response.data;
  }

  // Transform data dari frontend ke format backend
  transformProgramData(formData) {
    const kategoriMapping = {
      'infrastruktur': 1,
      'bansos': 2, 
      'pendidikan': 3,
      'kesehatan': 4,
      'pertanian': 5,
      'lainnya': 6,
      'ekonomi': 7
    };

    const prioritasMapping = {
      'sangat_tinggi': 'darurat',
      'tinggi': 'tinggi',
      'sedang': 'sedang',
      'rendah': 'rendah'
    };

    const rabItems = formData.items.map(item => ({
      nama_item: item.nama,
      deskripsi: item.nama,
      volume: parseFloat(item.volume) || 0,
      satuan: item.satuan,
      harga_satuan: parseFloat(item.hargaSatuan) || 0
    }));

    return {
      nama_program: formData.namaProgram,
      deskripsi: formData.deskripsi,
      kategori_program_id: kategoriMapping[formData.kategori] || 6,
      jenis_program: 'desa',
      tingkat_pengusul: 'desa',
      wilayah_id: 6,
      tahun_anggaran: new Date().getFullYear(),
      prioritas: prioritasMapping[formData.prioritas] || 'sedang',
      tanggal_mulai: formData.tanggalMulai,
      tanggal_selesai: formData.tanggalSelesai,
      target_penerima_manfaat: parseInt(formData.targetPenerimaManfaat) || 0,
      anggaran_total: formData.totalAnggaran,
      rab_items: rabItems,
      tahapan: this.generateDefaultTahapan(formData)
    };
  }

  // Generate tahapan default
  generateDefaultTahapan(formData) {
    const baseTahapan = [
      {
        nama_tahapan: 'Persiapan dan Perencanaan',
        deskripsi: 'Tahap persiapan dokumen dan perencanaan teknis',
        persentase: 10,
        tanggal_mulai_rencana: formData.tanggalMulai,
        tanggal_selesai_rencana: this.addDays(formData.tanggalMulai, 15)
      },
      {
        nama_tahapan: 'Pelaksanaan',
        deskripsi: 'Tahap pelaksanaan fisik program',
        persentase: 60,
        tanggal_mulai_rencana: this.addDays(formData.tanggalMulai, 16),
        tanggal_selesai_rencana: this.addDays(formData.tanggalSelesai, -15)
      },
      {
        nama_tahapan: 'Penyelesaian dan Serah Terima',
        deskripsi: 'Tahap penyelesaian dan serah terima hasil program',
        persentase: 30,
        tanggal_mulai_rencana: this.addDays(formData.tanggalSelesai, -14),
        tanggal_selesai_rencana: formData.tanggalSelesai
      }
    ];

    return baseTahapan;
  }

  addDays(dateString, days) {
    const date = new Date(dateString);
    date.setDate(date.getDate() + days);
    return date.toISOString().split('T')[0];
  }

  // Helper untuk menentukan jenis file
  getFileType(mimeType) {
    if (mimeType.startsWith('image/')) return 'foto';
    if (mimeType.startsWith('video/')) return 'video';
    return 'dokumen';
  }
}

export default new ProgramService();