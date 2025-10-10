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

  async createProgram(programData, files = {}, user) {
    try {
      console.log('📤 Starting program creation...');
      console.log('User:', user);
      console.log('Program Data:', programData);
      console.log('Files to upload:', Object.keys(files));

      const formData = new FormData();

      // Transform data dengan user context
      const transformedData = this.transformProgramData(programData, user);
      console.log('Transformed data:', transformedData);

      formData.append('program_data', JSON.stringify(transformedData));

      // ✅ FIX: Gunakan key yang sesuai dengan backend (snake_case)
      if (files.proposal) {
        formData.append('proposal', files.proposal);
        console.log('✅ Added proposal:', files.proposal.name);
      }
      if (files.suratPermohonan) {
        formData.append('surat_permohonan', files.suratPermohonan); // ✅ snake_case
        console.log('✅ Added surat_permohonan:', files.suratPermohonan.name);
      }
      if (files.gambarTeknis) {
        formData.append('gambar_teknis', files.gambarTeknis); // ✅ snake_case
        console.log('✅ Added gambar_teknis:', files.gambarTeknis.name);
      }

      // ✅ FIX: Multiple foto lokasi
      if (files.fotoLokasi && Array.isArray(files.fotoLokasi)) {
        files.fotoLokasi.forEach((foto, index) => {
          formData.append('foto_lokasi[]', foto); // ✅ snake_case dengan []
          console.log(`✅ Added foto_lokasi[${index}]:`, foto.name);
        });
      }

      // Debug: Check FormData contents
      console.log('📋 FormData contents:');
      for (let pair of formData.entries()) {
        console.log(pair[0] + ':', pair[1]);
      }

      const response = await apiClient.post('/program', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        timeout: 30000,
      });

      console.log('✅ Program created successfully:', response.data);
      return response.data;

    } catch (error) {
      console.error('❌ Error creating program:', error);

      if (error.response) {
        console.error('📡 Response error:', error.response.data);
        console.error('📡 Response status:', error.response.status);
        console.error('📡 Response headers:', error.response.headers);
      }

      throw error;
    }
  }

  // Submit program untuk verifikasi
  async submitProgram(programId) {
    const response = await apiClient.post(`/program/${programId}/submit`);
    return response.data;
  }

  // Di ProgramService.js - PERBAIKI method transformProgramData
  transformProgramData(formData, user) {
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
      wilayah_id: parseInt(formData.lokasi) || 6, // ✅ PASTIKAN integer
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


  async createProgramWithoutTahapan(programData, files = {}, user) {
    try {
      console.log('📤 Creating program without tahapan...');

      const formData = new FormData();

      // Transform data TANPA tahapan
      const transformedData = this.transformProgramDataWithoutTahapan(programData, user);
      console.log('Transformed data (no tahapan):', transformedData);

      formData.append('program_data', JSON.stringify(transformedData));

      // File uploads (sama seperti sebelumnya)
      if (files.proposal) formData.append('proposal', files.proposal);
      if (files.suratPermohonan) formData.append('surat_permohonan', files.suratPermohonan);
      if (files.gambarTeknis) formData.append('gambar_teknis', files.gambarTeknis);
      if (files.fotoLokasi && Array.isArray(files.fotoLokasi)) {
        files.fotoLokasi.forEach((foto) => {
          formData.append('foto_lokasi[]', foto);
        });
      }

      const response = await apiClient.post('/program/create-without-tahapan', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        timeout: 30000,
      });

      console.log('✅ Program created without tahapan:', response.data);
      return response.data;

    } catch (error) {
      console.error('❌ Error creating program without tahapan:', error);
      throw error;
    }
  }

  // Tambah tahapan ke program yang sudah ada
  async addTahapanToProgram(programId, tahapanData) {
    try {
      console.log('📤 Adding tahapan to program:', programId);
      console.log('📋 Tahapan data to send:', tahapanData);

      // ✅ VALIDASI: Pastikan data sesuai format yang diharapkan
      const validatedData = tahapanData.map(tahap => ({
        nama_tahapan: tahap.nama_tahapan,
        deskripsi: tahap.deskripsi || '',
        persentase: Number(tahap.persentase) || 0,
        tanggal_mulai_rencana: tahap.tanggal_mulai_rencana || tahap.tanggal_mulai || null,
        tanggal_selesai_rencana: tahap.tanggal_selesai_rencana || tahap.tanggal_selesai || null,
        urutan: tahap.urutan || 0
      }));

      console.log('✅ Validated tahapan data:', validatedData);

      const response = await apiClient.post(`/program/${programId}/add-tahapan`, {
        tahapan: validatedData
      });

      console.log('✅ Tahapan added to program:', response.data);
      return response.data;

    } catch (error) {
      console.error('❌ Error adding tahapan:', error);

      // Log error detail
      if (error.response?.data?.errors) {
        console.error('Backend validation errors:', error.response.data.errors);
      }

      throw error;
    }
  }

  // Transform data TANPA tahapan
  transformProgramDataWithoutTahapan(formData, user) {
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
      wilayah_id: parseInt(formData.lokasi) || 6,
      tahun_anggaran: new Date().getFullYear(),
      prioritas: prioritasMapping[formData.prioritas] || 'sedang',
      tanggal_mulai: formData.tanggalMulai,
      tanggal_selesai: formData.tanggalSelesai,
      target_penerima_manfaat: parseInt(formData.targetPenerimaManfaat) || 0,
      anggaran_total: formData.totalAnggaran,
      rab_items: rabItems,
      // ✅ TIDAK ADA TAHAPAN DI SINI
    };
  };

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