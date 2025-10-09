import React, { useState } from 'react';
import { toast } from 'sonner';
import BansosHeader from './BansosHeader';
import BansosStats from './BansosStats';
import BansosTabs from './BansosTabs';
import BansosFilters from './BansosFilters';
import BansosGrid from './BansosGrid';
import DistributionChart from './DistributionChart';
import RecipientModal from './RecipientModal';
import DistributionModal from './DistributionModal';

const AdminDesaBansosDesa = () => {
  const [activeTab, setActiveTab] = useState('semua');
  const [filterStatus, setFilterStatus] = useState('semua');
  const [filterJenis, setFilterJenis] = useState('semua');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [selectedDistribution, setSelectedDistribution] = useState(null);
  const [showRecipientModal, setShowRecipientModal] = useState(false);
  const [showDistributionModal, setShowDistributionModal] = useState(false);
  const [viewMode, setViewMode] = useState('grid'); // 'grid', 'list', 'chart'

  // Data program bansos berdasarkan studi kasus Purbalingga
  const bansosData = [
    {
      id: 'BANSOS-001',
      nama: 'Bantuan Sembako 100 KK',
      jenis: 'sembako',
      tipe: 'barang',
      periode: 'Q4 2024',
      anggaran: 50000000,
      realisasi: 50000000,
      progress: 100,
      status: 'selesai',
      statusDetail: 'Distribusi telah selesai 100%',
      prioritas: 'tinggi',
      lokasi: 'Seluruh Desa',
      penanggungJawab: 'Ketua RT',
      tanggalMulai: '2024-09-10',
      tanggalSelesai: '2024-09-25',
      deskripsi: 'Penyaluran paket sembako untuk 100 keluarga kurang mampu di desa. Paket berisi beras, minyak, gula, telur, dan mie instan.',
      paket: {
        jenis: 'Paket Sembako Lengkap',
        isi: ['Beras 5kg', 'Minyak 2L', 'Gula 1kg', 'Telur 1kg', 'Mie Instan 10pcs'],
        nilai: 500000
      },
      penerima: {
        total: 100,
        terverifikasi: 100,
        terkirim: 100,
        konfirmasi: 95,
        daftar: [
          { id: 1, nik: '3326123456789001', nama: 'Budi Santoso', dusun: 'Dusun 1', status: 'diterima', konfirmasi: true, tanggal: '2024-09-20' },
          { id: 2, nik: '3326123456789002', nama: 'Siti Rahayu', dusun: 'Dusun 2', status: 'diterima', konfirmasi: true, tanggal: '2024-09-20' }
        ]
      },
      distribusi: [
        { tahap: 1, tanggal: '2024-09-20', jumlah: 50, lokasi: 'Balai Desa', status: 'selesai' },
        { tahap: 2, tanggal: '2024-09-22', jumlah: 50, lokasi: 'Posyandu', status: 'selesai' }
      ],
      dokumentasi: {
        foto: 8,
        video: 1,
        dokumen: 3
      },
      issues: 0,
      createdAt: '2024-08-28',
      terakhirUpdate: '2024-09-30'
    },
    {
      id: 'BANSOS-002',
      nama: 'Bantuan Tunai PKH',
      jenis: 'tunai',
      tipe: 'uang',
      periode: 'Oktober 2024',
      anggaran: 75000000,
      realisasi: 60000000,
      progress: 80,
      status: 'dalam_pengerjaan',
      statusDetail: 'Tahap verifikasi penerima tahap akhir',
      prioritas: 'sangat_tinggi',
      lokasi: 'Seluruh Desa',
      penanggungJawab: 'Bidang Sosial',
      tanggalMulai: '2024-10-01',
      tanggalSelesai: '2024-10-31',
      deskripsi: 'Program Keluarga Harapan (PKH) untuk 50 keluarga penerima manfaat. Bantuan tunai sebesar Rp 1.200.000 per keluarga per bulan.',
      paket: {
        jenis: 'Bantuan Tunai PKH',
        isi: ['Transfer Bank', 'E-Wallet'],
        nilai: 1200000
      },
      penerima: {
        total: 50,
        terverifikasi: 45,
        terkirim: 40,
        konfirmasi: 35,
        daftar: [
          { id: 1, nik: '3326123456789003', nama: 'Ahmad Wijaya', dusun: 'Dusun 3', status: 'diverifikasi', konfirmasi: true, tanggal: '2024-10-15' },
          { id: 2, nik: '3326123456789004', nama: 'Maria Dewi', dusun: 'Dusun 1', status: 'diverifikasi', konfirmasi: true, tanggal: '2024-10-15' }
        ]
      },
      distribusi: [
        { tahap: 1, tanggal: '2024-10-15', jumlah: 40, lokasi: 'Transfer Bank', status: 'selesai' },
        { tahap: 2, tanggal: '2024-10-25', jumlah: 10, lokasi: 'Transfer Bank', status: 'dalam_proses' }
      ],
      dokumentasi: {
        foto: 4,
        video: 0,
        dokumen: 6
      },
      issues: 2,
      createdAt: '2024-09-15',
      terakhirUpdate: '2024-10-22'
    },
    {
      id: 'BANSOS-003',
      nama: 'Bantuan Pendidikan Anak',
      jenis: 'pendidikan',
      tipe: 'uang',
      periode: 'Semester Ganjil 2024',
      anggaran: 25000000,
      realisasi: 20000000,
      progress: 80,
      status: 'dalam_pengerjaan',
      statusDetail: 'Tahap seleksi penerima beasiswa',
      prioritas: 'tinggi',
      lokasi: 'Seluruh Desa',
      penanggungJawab: 'Bidang Pendidikan',
      tanggalMulai: '2024-09-20',
      tanggalSelesai: '2024-10-30',
      deskripsi: 'Beasiswa untuk 25 anak berprestasi dari keluarga kurang mampu. Bantuan untuk biaya sekolah dan perlengkapan pendidikan.',
      paket: {
        jenis: 'Beasiswa Pendidikan',
        isi: ['Biaya SPP', 'Buku Pelajaran', 'Seragam Sekolah', 'Alat Tulis'],
        nilai: 1000000
      },
      penerima: {
        total: 25,
        terverifikasi: 20,
        terkirim: 15,
        konfirmasi: 12,
        daftar: [
          { id: 1, nik: '3326123456789005', nama: 'Rudi Hartono', dusun: 'Dusun 2', status: 'diverifikasi', konfirmasi: true, tanggal: '2024-10-10' }
        ]
      },
      distribusi: [
        { tahap: 1, tanggal: '2024-10-10', jumlah: 15, lokasi: 'Sekolah', status: 'selesai' }
      ],
      dokumentasi: {
        foto: 6,
        video: 0,
        dokumen: 8
      },
      issues: 0,
      createdAt: '2024-09-05',
      terakhirUpdate: '2024-10-18'
    },
    {
      id: 'BANSOS-004',
      nama: 'Bantuan Lansia Terlantar',
      jenis: 'lansia',
      tipe: 'barang',
      periode: 'Triwulan IV 2024',
      anggaran: 15000000,
      realisasi: 0,
      progress: 0,
      status: 'menunggu_persetujuan',
      statusDetail: 'Menunggu approval dari Kecamatan',
      prioritas: 'sedang',
      lokasi: 'Seluruh Desa',
      penanggungJawab: 'Bidang Sosial',
      tanggalMulai: null,
      tanggalSelesai: null,
      deskripsi: 'Bantuan paket kebutuhan lansia untuk 30 orang lansia terlantar di desa. Paket berisi makanan tambahan dan alat bantu.',
      paket: {
        jenis: 'Paket Lansia',
        isi: ['Susu Lansia', 'Biskuit Tinggi Kalsium', 'Alat Bantu Jalan', 'Obat-obatan'],
        nilai: 500000
      },
      penerima: {
        total: 30,
        terverifikasi: 0,
        terkirim: 0,
        konfirmasi: 0,
        daftar: []
      },
      distribusi: [],
      dokumentasi: {
        foto: 2,
        video: 0,
        dokumen: 3
      },
      issues: 1,
      createdAt: '2024-10-05',
      terakhirUpdate: '2024-10-20'
    },
    {
      id: 'BANSOS-005',
      nama: 'Bantuan UMKM Desa',
      jenis: 'umkm',
      tipe: 'modal',
      periode: '2024',
      anggaran: 100000000,
      realisasi: 75000000,
      progress: 75,
      status: 'dalam_pengerjaan',
      statusDetail: 'Penyaluran modal usaha tahap 2',
      prioritas: 'tinggi',
      lokasi: 'Seluruh Desa',
      penanggungJawab: 'Bidang Ekonomi',
      tanggalMulai: '2024-08-01',
      tanggalSelesai: '2024-12-31',
      deskripsi: 'Bantuan modal usaha untuk 20 UMKM desa. Program pinjaman lunak dengan bunga 0% dan masa tenggang 6 bulan.',
      paket: {
        jenis: 'Modal Usaha',
        isi: ['Pinjaman Tunai', 'Pelatihan Wirausaha', 'Pendampingan Bisnis'],
        nilai: 5000000
      },
      penerima: {
        total: 20,
        terverifikasi: 15,
        terkirim: 15,
        konfirmasi: 12,
        daftar: [
          { id: 1, nik: '3326123456789006', nama: 'Dewi Sartika', dusun: 'Dusun 1', status: 'diterima', konfirmasi: true, tanggal: '2024-08-15' }
        ]
      },
      distribusi: [
        { tahap: 1, tanggal: '2024-08-15', jumlah: 10, lokasi: 'Transfer Bank', status: 'selesai' },
        { tahap: 2, tanggal: '2024-10-01', jumlah: 5, lokasi: 'Transfer Bank', status: 'selesai' }
      ],
      dokumentasi: {
        foto: 12,
        video: 2,
        dokumen: 10
      },
      issues: 0,
      createdAt: '2024-07-20',
      terakhirUpdate: '2024-10-15'
    },
    {
      id: 'BANSOS-006',
      nama: 'Bantuan Pangan Non Tunai',
      jenis: 'sembako',
      tipe: 'voucher',
      periode: 'November 2024',
      anggaran: 60000000,
      realisasi: 0,
      progress: 0,
      status: 'ditolak',
      statusDetail: 'Data penerima tidak valid, perlu verifikasi ulang',
      prioritas: 'sedang',
      lokasi: 'Seluruh Desa',
      penanggungJawab: 'Kepala Desa',
      tanggalMulai: null,
      tanggalSelesai: null,
      deskripsi: 'Program BPNT dengan sistem voucher elektronik untuk 120 keluarga penerima. Voucher dapat ditukar di mitra toko terdaftar.',
      paket: {
        jenis: 'Voucher Elektronik',
        isi: ['Voucher Belanja', 'Kartu BPNT'],
        nilai: 500000
      },
      penerima: {
        total: 120,
        terverifikasi: 0,
        terkirim: 0,
        konfirmasi: 0,
        daftar: []
      },
      distribusi: [],
      dokumentasi: {
        foto: 0,
        video: 0,
        dokumen: 2
      },
      issues: 3,
      createdAt: '2024-09-25',
      terakhirUpdate: '2024-10-10'
    }
  ];

  // Filter data berdasarkan tab aktif, status, jenis, dan pencarian
  const filteredBansos = bansosData.filter(bansos => {
    // Filter berdasarkan tab aktif
    let tabMatch = true;
    if (activeTab === 'aktif') {
      tabMatch = bansos.status === 'dalam_pengerjaan';
    } else if (activeTab === 'selesai') {
      tabMatch = bansos.status === 'selesai';
    } else if (activeTab === 'pengajuan') {
      tabMatch = bansos.status === 'menunggu_persetujuan';
    } else if (activeTab === 'sembako') {
      tabMatch = bansos.jenis === 'sembako';
    } else if (activeTab === 'tunai') {
      tabMatch = bansos.jenis === 'tunai';
    }

    // Filter tambahan
    const statusMatch = filterStatus === 'semua' || bansos.status === filterStatus;
    const jenisMatch = filterJenis === 'semua' || bansos.jenis === filterJenis;
    const searchMatch = bansos.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
                       bansos.deskripsi.toLowerCase().includes(searchQuery.toLowerCase());
    
    return tabMatch && statusMatch && jenisMatch && searchMatch;
  });

  const handleViewRecipients = (program) => {
    setSelectedProgram(program);
    setShowRecipientModal(true);
  };

  const handleViewDistribution = (program) => {
    setSelectedProgram(program);
    setShowDistributionModal(true);
  };

  const handleAddBansos = () => {
    toast.success('Membuka form tambah program bansos baru');
  };

  const handleExportReport = () => {
    toast.success('Mengekspor laporan bansos');
  };

  const handleQuickDistribution = (program) => {
    setSelectedProgram(program);
    setSelectedDistribution(program.distribusi[0] || null);
    toast.success(`Mempersiapkan distribusi untuk ${program.nama}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      <div className="w-full max-w-full">
        {/* Header */}
        <BansosHeader 
          totalPrograms={bansosData.length}
          onAddBansos={handleAddBansos}
          onExportReport={handleExportReport}
        />

        {/* Content */}
        <div className="p-4 sm:p-6 max-w-7xl mx-auto space-y-6">
          {/* Statistics */}
          <BansosStats bansosData={bansosData} />

          {/* Tabs */}
          <BansosTabs 
            activeTab={activeTab}
            onTabChange={setActiveTab}
            bansosData={bansosData}
          />

          {/* View Mode & Filters */}
          <BansosFilters 
            filterStatus={filterStatus}
            setFilterStatus={setFilterStatus}
            filterJenis={filterJenis}
            setFilterJenis={setFilterJenis}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            viewMode={viewMode}
            setViewMode={setViewMode}
          />

          {/* Content based on view mode */}
          {viewMode === 'chart' ? (
            <DistributionChart 
              programs={filteredBansos}
              onViewRecipients={handleViewRecipients}
            />
          ) : (
            <BansosGrid 
              programs={filteredBansos}
              viewMode={viewMode}
              onViewRecipients={handleViewRecipients}
              onViewDistribution={handleViewDistribution}
              onQuickDistribution={handleQuickDistribution}
            />
          )}

          {/* Modal Daftar Penerima */}
          {showRecipientModal && selectedProgram && (
            <RecipientModal
              program={selectedProgram}
              onClose={() => setShowRecipientModal(false)}
            />
          )}

          {/* Modal Distribusi */}
          {showDistributionModal && selectedProgram && (
            <DistributionModal
              program={selectedProgram}
              onClose={() => setShowDistributionModal(false)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDesaBansosDesa;