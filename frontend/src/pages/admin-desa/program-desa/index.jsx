import React, { useState } from 'react';
import { toast } from 'sonner';
import ProgramHeader from './ProgramHeader';
import ProgramTabs from './ProgramTabs';
import ProgramStats from './ProgramStats';
import ProgramFilters from './ProgramFilters';
import ProgramGrid from './ProgramGrid';
import ProgramModal from './ProgramModal';

const AdminDesaProgramDesa = () => {
  const [activeTab, setActiveTab] = useState('semua');
  const [filterStatus, setFilterStatus] = useState('semua');
  const [filterKategori, setFilterKategori] = useState('semua');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

  // Data program desa berdasarkan studi kasus
  const programData = [
    {
      id: 'PRJ-001',
      nama: 'Pembangunan Jalan Desa Sumberejo 2km',
      kategori: 'infrastruktur',
      jenis: 'pembangunan',
      anggaran: 1000000000,
      realisasi: 650000000,
      progress: 65,
      status: 'dalam_pengerjaan',
      statusDetail: 'Menunggu verifikasi Kecamatan',
      prioritas: 'tinggi',
      lokasi: 'Desa Sumberejo',
      penanggungJawab: 'Kepala Desa',
      tanggalPengajuan: '2024-08-15',
      tanggalDisetujui: '2024-08-20',
      tanggalMulai: '2024-09-01',
      tanggalSelesai: '2024-12-31',
      deskripsi: 'Pembangunan jalan hotmix sepanjang 2km dengan ketebalan 10cm untuk akses transportasi warga',
      milestones: [
        { nama: 'Pengajuan RAB', status: 'selesai', tanggal: '2024-08-15' },
        { nama: 'Approval Kecamatan', status: 'selesai', tanggal: '2024-08-20' },
        { nama: 'Approval Bupati', status: 'selesai', tanggal: '2024-08-25' },
        { nama: 'Pekerjaan Tanah', status: 'selesai', tanggal: '2024-09-15' },
        { nama: 'Pondasi & Base Course', status: 'selesai', tanggal: '2024-10-10' },
        { nama: 'Pengaspalan', status: 'dalam_pengerjaan', tanggal: '2024-10-20' },
        { nama: 'Finishing', status: 'menunggu', tanggal: null }
      ],
      dokumentasi: {
        foto: 12,
        video: 3,
        dokumen: 5
      },
      issues: 2,
      createdAt: '2024-08-10',
      terakhirUpdate: '2024-10-25'
    },
    {
      id: 'PRJ-002',
      nama: 'Bantuan Sembako 100 KK',
      kategori: 'bansos',
      jenis: 'bantuan_langsung',
      anggaran: 50000000,
      realisasi: 50000000,
      progress: 100,
      status: 'selesai',
      statusDetail: 'Program telah selesai dan dilaporkan',
      prioritas: 'sedang',
      lokasi: 'Seluruh Desa',
      penanggungJawab: 'Ketua RT',
      tanggalPengajuan: '2024-09-01',
      tanggalDisetujui: '2024-09-05',
      tanggalMulai: '2024-09-10',
      tanggalSelesai: '2024-09-25',
      deskripsi: 'Penyaluran bantuan sembako untuk 100 keluarga kurang mampu di desa',
      milestones: [
        { nama: 'Verifikasi Data Penerima', status: 'selesai', tanggal: '2024-09-05' },
        { nama: 'Pengadaan Barang', status: 'selesai', tanggal: '2024-09-12' },
        { nama: 'Distribusi', status: 'selesai', tanggal: '2024-09-20' },
        { nama: 'Laporan Akhir', status: 'selesai', tanggal: '2024-09-25' }
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
      id: 'PRJ-003',
      nama: 'Renovasi MCK Desa',
      kategori: 'infrastruktur',
      jenis: 'renovasi',
      anggaran: 30000000,
      realisasi: 0,
      progress: 0,
      status: 'menunggu_persetujuan',
      statusDetail: 'Menunggu approval dari Kecamatan',
      prioritas: 'tinggi',
      lokasi: 'Dusun 1',
      penanggungJawab: 'Sekretaris Desa',
      tanggalPengajuan: '2024-10-05',
      tanggalDisetujui: null,
      tanggalMulai: null,
      tanggalSelesai: null,
      deskripsi: 'Renovasi 5 unit MCK umum yang rusak untuk meningkatkan sanitasi warga',
      milestones: [
        { nama: 'Pengajuan RAB', status: 'selesai', tanggal: '2024-10-05' },
        { nama: 'Approval Kecamatan', status: 'dalam_proses', tanggal: null },
        { nama: 'Approval Bupati', status: 'menunggu', tanggal: null },
        { nama: 'Pelaksanaan', status: 'menunggu', tanggal: null }
      ],
      dokumentasi: {
        foto: 3,
        video: 0,
        dokumen: 2
      },
      issues: 1,
      createdAt: '2024-10-01',
      terakhirUpdate: '2024-10-20'
    },
    {
      id: 'PRJ-004',
      nama: 'Pembangunan Drainase',
      kategori: 'infrastruktur',
      jenis: 'pembangunan',
      anggaran: 75000000,
      realisasi: 45000000,
      progress: 60,
      status: 'dalam_pengerjaan',
      statusDetail: 'Progress sesuai timeline',
      prioritas: 'sedang',
      lokasi: 'Jl. Desa Utama',
      penanggungJawab: 'Kepala Dusun 2',
      tanggalPengajuan: '2024-08-20',
      tanggalDisetujui: '2024-08-28',
      tanggalMulai: '2024-09-05',
      tanggalSelesai: '2024-11-30',
      deskripsi: 'Pembangunan sistem drainase sepanjang 500m untuk mengatasi genangan air',
      milestones: [
        { nama: 'Pengajuan RAB', status: 'selesai', tanggal: '2024-08-20' },
        { nama: 'Approval Kecamatan', status: 'selesai', tanggal: '2024-08-28' },
        { nama: 'Pembersihan Area', status: 'selesai', tanggal: '2024-09-10' },
        { nama: 'Pondasi', status: 'selesai', tanggal: '2024-09-25' },
        { nama: 'Pemasangan Pipa', status: 'dalam_pengerjaan', tanggal: '2024-10-15' },
        { nama: 'Finishing', status: 'menunggu', tanggal: null }
      ],
      dokumentasi: {
        foto: 6,
        video: 2,
        dokumen: 4
      },
      issues: 0,
      createdAt: '2024-08-15',
      terakhirUpdate: '2024-10-22'
    },
    {
      id: 'PRJ-005',
      nama: 'Beasiswa Anak Berprestasi',
      kategori: 'pendidikan',
      jenis: 'bantuan_langsung',
      anggaran: 25000000,
      realisasi: 20000000,
      progress: 80,
      status: 'dalam_pengerjaan',
      statusDetail: 'Tahap verifikasi penerima',
      prioritas: 'sedang',
      lokasi: 'Seluruh Desa',
      penanggungJawab: 'Bidang Pendidikan',
      tanggalPengajuan: '2024-09-10',
      tanggalDisetujui: '2024-09-15',
      tanggalMulai: '2024-09-20',
      tanggalSelesai: '2024-10-30',
      deskripsi: 'Pemberian beasiswa untuk 25 anak berprestasi dari keluarga kurang mampu',
      milestones: [
        { nama: 'Pengumuman', status: 'selesai', tanggal: '2024-09-20' },
        { nama: 'Pendaftaran', status: 'selesai', tanggal: '2024-09-30' },
        { nama: 'Seleksi', status: 'dalam_proses', tanggal: '2024-10-10' },
        { nama: 'Penyaluran', status: 'menunggu', tanggal: null }
      ],
      dokumentasi: {
        foto: 4,
        video: 0,
        dokumen: 6
      },
      issues: 0,
      createdAt: '2024-09-05',
      terakhirUpdate: '2024-10-18'
    },
    {
      id: 'PRJ-006',
      nama: 'Penerangan Jalan Umum',
      kategori: 'infrastruktur',
      jenis: 'pembangunan',
      anggaran: 120000000,
      realisasi: 0,
      progress: 0,
      status: 'ditolak',
      statusDetail: 'RAB tidak sesuai standar, perlu revisi',
      prioritas: 'rendah',
      lokasi: 'Jl. Poros Desa',
      penanggungJawab: 'Kepala Desa',
      tanggalPengajuan: '2024-09-25',
      tanggalDisetujui: null,
      tanggalMulai: null,
      tanggalSelesai: null,
      deskripsi: 'Pemasangan 50 titik lampu penerangan jalan umum',
      milestones: [
        { nama: 'Pengajuan RAB', status: 'selesai', tanggal: '2024-09-25' },
        { nama: 'Review Kecamatan', status: 'ditolak', tanggal: '2024-10-01' }
      ],
      dokumentasi: {
        foto: 2,
        video: 0,
        dokumen: 3
      },
      issues: 3,
      createdAt: '2024-09-20',
      terakhirUpdate: '2024-10-05'
    },
    {
      id: 'PRJ-007',
      nama: 'Pelatihan UMKM Desa',
      kategori: 'ekonomi',
      jenis: 'pelatihan',
      anggaran: 15000000,
      realisasi: 12000000,
      progress: 80,
      status: 'dalam_pengerjaan',
      statusDetail: 'Pelatihan batch 2 sedang berjalan',
      prioritas: 'sedang',
      lokasi: 'Balai Desa',
      penanggungJawab: 'Bidang Ekonomi',
      tanggalPengajuan: '2024-08-10',
      tanggalDisetujui: '2024-08-15',
      tanggalMulai: '2024-08-20',
      tanggalSelesai: '2024-11-15',
      deskripsi: 'Pelatihan kewirausahaan dan pengembangan produk UMKM untuk 50 warga',
      milestones: [
        { nama: 'Persiapan', status: 'selesai', tanggal: '2024-08-20' },
        { nama: 'Batch 1', status: 'selesai', tanggal: '2024-09-10' },
        { nama: 'Batch 2', status: 'dalam_pengerjaan', tanggal: '2024-10-15' },
        { nama: 'Evaluasi', status: 'menunggu', tanggal: null }
      ],
      dokumentasi: {
        foto: 15,
        video: 2,
        dokumen: 8
      },
      issues: 0,
      createdAt: '2024-08-05',
      terakhirUpdate: '2024-10-20'
    }
  ];

  // Filter data berdasarkan tab aktif, status, kategori, dan pencarian
  const filteredPrograms = programData.filter(program => {
    // Filter berdasarkan tab aktif
    let tabMatch = true;
    if (activeTab === 'aktif') {
      tabMatch = program.status === 'dalam_pengerjaan';
    } else if (activeTab === 'selesai') {
      tabMatch = program.status === 'selesai';
    } else if (activeTab === 'pengajuan') {
      tabMatch = program.status === 'menunggu_persetujuan';
    }

    // Filter tambahan
    const statusMatch = filterStatus === 'semua' || program.status === filterStatus;
    const kategoriMatch = filterKategori === 'semua' || program.kategori === filterKategori;
    const searchMatch = program.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
                       program.lokasi.toLowerCase().includes(searchQuery.toLowerCase()) ||
                       program.deskripsi.toLowerCase().includes(searchQuery.toLowerCase());
    
    return tabMatch && statusMatch && kategoriMatch && searchMatch;
  });

  const handleViewDetails = (program) => {
    setSelectedProgram(program);
    setShowModal(true);
  };

  const handleEditProgram = (program) => {
    toast.success(`Membuka editor untuk ${program.nama}`);
    // Navigate to edit page or open edit modal
  };

  const handleDeleteProgram = (program) => {
    if (confirm(`Apakah Anda yakin ingin menghapus program "${program.nama}"?`)) {
      toast.success(`Program "${program.nama}" berhasil dihapus`);
      // Implement delete logic
    }
  };

  const handleExportProgram = (program) => {
    toast.success(`Mengekspor data program ${program.nama}`);
    // Implement export logic
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-emerald-50">
      <div className="w-full max-w-full">
        {/* Header */}
        <ProgramHeader 
          totalPrograms={programData.length}
          onAddProgram={() => toast.success('Membuka form tambah program baru')}
        />

        {/* Content */}
        <div className="p-4 sm:p-6 max-w-7xl mx-auto space-y-6">
          {/* Statistics */}
          <ProgramStats programData={programData} />

          {/* Tabs */}
          <ProgramTabs 
            activeTab={activeTab}
            onTabChange={setActiveTab}
            programData={programData}
          />

          {/* Filters */}
          <ProgramFilters 
            filterStatus={filterStatus}
            setFilterStatus={setFilterStatus}
            filterKategori={filterKategori}
            setFilterKategori={setFilterKategori}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            viewMode={viewMode}
            setViewMode={setViewMode}
          />

          {/* Program Grid */}
          <ProgramGrid 
            programs={filteredPrograms}
            viewMode={viewMode}
            onViewDetails={handleViewDetails}
            onEditProgram={handleEditProgram}
            onDeleteProgram={handleDeleteProgram}
            onExportProgram={handleExportProgram}
          />

          {/* Modal Detail Program */}
          {showModal && selectedProgram && (
            <ProgramModal
              program={selectedProgram}
              onClose={() => setShowModal(false)}
              onEdit={handleEditProgram}
              onDelete={handleDeleteProgram}
              onExport={handleExportProgram}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDesaProgramDesa;