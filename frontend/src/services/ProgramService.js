import apiClient from './GlobalApi';

class ProgramService {
  // Get metadata untuk form create
  async getCreateMetadata() {
    const response = await apiClient.get('/program/create/metadata');
    return response.data;
  }

  // Create program baru dengan file upload
  async createProgram(programData) {
    // Transform data dari frontend ke format backend
    const transformedData = this.transformProgramData(programData);
    
    // Create FormData untuk handle file upload
    const formData = new FormData();
    
    // Append main program data sebagai JSON string
    formData.append('program_data', JSON.stringify(transformedData));
    
    // Append files
    if (programData.dokumen.proposal) {
      formData.append('proposal', programData.dokumen.proposal);
    }
    if (programData.dokumen.gambarTeknis) {
      formData.append('gambar_teknis', programData.dokumen.gambarTeknis);
    }
    if (programData.dokumen.suratPermohonan) {
      formData.append('surat_permohonan', programData.dokumen.suratPermohonan);
    }
    
    // Append multiple photos
    if (programData.dokumen.fotoLokasi && programData.dokumen.fotoLokasi.length > 0) {
      programData.dokumen.fotoLokasi.forEach((file, index) => {
        formData.append(`foto_lokasi[${index}]`, file);
      });
    }

    const response = await apiClient.post('/program', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  }

  // Submit program untuk verifikasi
  async submitProgram(programId) {
    const response = await apiClient.post(`/program/${programId}/submit`);
    return response.data;
  }

  // Transform data dari frontend ke format backend
  transformProgramData(formData) {
    // Mapping kategori dari string ke ID
    const kategoriMapping = {
      'infrastruktur': 1,
      'bansos': 2, 
      'pendidikan': 3,
      'kesehatan': 4,
      'pertanian': 5,
      'lainnya': 6,
      'ekonomi': 7
    };

    // Mapping prioritas
    const prioritasMapping = {
      'sangat_tinggi': 'darurat',
      'tinggi': 'tinggi',
      'sedang': 'sedang',
      'rendah': 'rendah'
    };

    // Transform RAB items
    const rabItems = formData.items.map(item => ({
      nama_item: item.nama,
      deskripsi: item.nama, // atau bisa kosong
      volume: parseFloat(item.volume) || 0,
      satuan: item.satuan,
      harga_satuan: parseFloat(item.hargaSatuan) || 0
    }));

    return {
      // Informasi dasar program
      nama_program: formData.namaProgram,
      deskripsi: formData.deskripsi,
      kategori_program_id: kategoriMapping[formData.kategori] || 6, // default ke lainnya
      jenis_program: 'desa', // default untuk admin desa
      tingkat_pengusul: 'desa', // default untuk admin desa
      wilayah_id: parseInt(formData.lokasi) || 6, // Gunakan ID wilayah dari form
      tahun_anggaran: new Date().getFullYear(),
      prioritas: prioritasMapping[formData.prioritas] || 'sedang',
      tanggal_mulai: formData.tanggalMulai,
      tanggal_selesai: formData.tanggalSelesai,
      target_penerima_manfaat: parseInt(formData.targetPenerimaManfaat) || 0,
      anggaran_total: parseFloat(formData.totalAnggaran) || 0,

      // RAB items
      rab_items: rabItems,

      // Tahapan (opsional, bisa dibuat default)
      tahapan: this.generateDefaultTahapan(formData)
    };
  }

  // Generate tahapan default berdasarkan jenis program
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
}

export default new ProgramService();