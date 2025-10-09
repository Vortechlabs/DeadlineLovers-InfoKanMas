import React, { useState } from 'react';
import { toast } from 'sonner';
import InfrastrukturHeader from './InfrastrukturHeader';
import InfrastrukturStats from './InfrastrukturStats';
import ProjectTabs from './ProjectTabs';
import ProjectGrid from './ProjectGrid';
import MapView from './MapView';
import ProjectModal from './ProjectModal';

const AdminDesaInfrastruktur = () => {
  const [activeTab, setActiveTab] = useState('semua');
  const [filterStatus, setFilterStatus] = useState('semua');
  const [filterJenis, setFilterJenis] = useState('semua');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [viewMode, setViewMode] = useState('grid'); // 'grid', 'list', 'map'

  // Data proyek infrastruktur berdasarkan studi kasus Purbalingga
  const infrastrukturData = [
    {
      id: 'INF-001',
      nama: 'Pembangunan Jalan Desa Sumberejo 2km',
      jenis: 'jalan',
      tipe: 'pembangunan',
      anggaran: 1000000000,
      realisasi: 650000000,
      progress: 65,
      status: 'dalam_pengerjaan',
      statusDetail: 'Tahap pengaspalan sedang berjalan',
      prioritas: 'tinggi',
      lokasi: 'Desa Sumberejo',
      koordinat: { lat: -7.388, lng: 109.361 },
      penanggungJawab: 'Kepala Desa',
      kontraktor: 'CV Bangun Jaya',
      tanggalMulai: '2024-09-01',
      tanggalSelesai: '2024-12-31',
      deskripsi: 'Pembangunan jalan hotmix sepanjang 2km dengan ketebalan 10cm untuk akses transportasi warga. Dilengkapi dengan drainase samping.',
      spesifikasi: {
        panjang: '2000 m',
        lebar: '3 m',
        ketebalan: '10 cm',
        material: 'Aspal Hotmix Grade A',
        metode: 'Manual dengan alat berat'
      },
      milestones: [
        { nama: 'Pekerjaan Tanah', status: 'selesai', progress: 100, tanggal: '2024-09-15' },
        { nama: 'Pondasi & Base Course', status: 'selesai', progress: 100, tanggal: '2024-10-10' },
        { nama: 'Pengaspalan', status: 'dalam_pengerjaan', progress: 65, tanggal: '2024-10-20' },
        { nama: 'Finishing & Marka', status: 'menunggu', progress: 0, tanggal: null }
      ],
      dokumentasi: {
        foto: 12,
        video: 3,
        dokumen: 5,
        drone: 2
      },
      qualityChecks: [
        { item: 'Ketebalan Aspal', standar: '10 cm', actual: '10.1 cm', status: 'sesuai' },
        { item: 'Kepadatan Base', standar: '95%', actual: '96%', status: 'sesuai' },
        { item: 'Kemiringan Jalan', standar: '2%', actual: '1.8%', status: 'sesuai' }
      ],
      issues: 2,
      createdAt: '2024-08-10',
      terakhirUpdate: '2024-10-25'
    },
    {
      id: 'INF-002',
      nama: 'Pembangunan Drainase Jl. Desa Utama',
      jenis: 'drainase',
      tipe: 'pembangunan',
      anggaran: 75000000,
      realisasi: 45000000,
      progress: 60,
      status: 'dalam_pengerjaan',
      statusDetail: 'Pemasangan pipa drainase tahap akhir',
      prioritas: 'sedang',
      lokasi: 'Jl. Desa Utama',
      koordinat: { lat: -7.389, lng: 109.362 },
      penanggungJawab: 'Kepala Dusun 2',
      kontraktor: 'PT Saluran Bersih',
      tanggalMulai: '2024-09-05',
      tanggalSelesai: '2024-11-30',
      deskripsi: 'Pembangunan sistem drainase sepanjang 500m dengan pipa PVC diameter 30cm untuk mengatasi genangan air di musim hujan.',
      spesifikasi: {
        panjang: '500 m',
        diameter: '30 cm',
        material: 'PVC Klas 5',
        kedalaman: '1.2 m',
        kemiringan: '0.5%'
      },
      milestones: [
        { nama: 'Pembersihan Area', status: 'selesai', progress: 100, tanggal: '2024-09-10' },
        { nama: 'Galangan & Pondasi', status: 'selesai', progress: 100, tanggal: '2024-09-25' },
        { nama: 'Pemasangan Pipa', status: 'dalam_pengerjaan', progress: 60, tanggal: '2024-10-15' },
        { nama: 'Backfill & Paving', status: 'menunggu', progress: 0, tanggal: null }
      ],
      dokumentasi: {
        foto: 6,
        video: 2,
        dokumen: 4,
        drone: 1
      },
      qualityChecks: [
        { item: 'Kedalaman Galian', standar: '1.2 m', actual: '1.25 m', status: 'sesuai' },
        { item: 'Kemiringan Pipa', standar: '0.5%', actual: '0.48%', status: 'sesuai' }
      ],
      issues: 0,
      createdAt: '2024-08-15',
      terakhirUpdate: '2024-10-22'
    },
    {
      id: 'INF-003',
      nama: 'Renovasi Jembatan Gintung',
      jenis: 'jembatan',
      tipe: 'renovasi',
      anggaran: 1320000000,
      realisasi: 0,
      progress: 0,
      status: 'menunggu_persetujuan',
      statusDetail: 'Menunggu approval dari Kecamatan',
      prioritas: 'sangat_tinggi',
      lokasi: 'Desa Pepedan - Tegalpingen',
      koordinat: { lat: -7.392, lng: 109.358 },
      penanggungJawab: 'Sekretaris Desa',
      kontraktor: null,
      tanggalMulai: null,
      tanggalSelesai: null,
      deskripsi: 'Renovasi total jembatan penghubung dua desa yang rusak berat. Menggunakan material berkualitas tinggi dengan standar nasional.',
      spesifikasi: {
        panjang: '25 m',
        lebar: '5 m',
        material: 'Beton Bertulang',
        kapasitas: '10 ton',
        desain: 'Jembatan Beton Tipe Balok'
      },
      milestones: [
        { nama: 'Pengajuan RAB', status: 'selesai', progress: 100, tanggal: '2024-10-05' },
        { nama: 'Approval Kecamatan', status: 'dalam_proses', progress: 30, tanggal: null },
        { nama: 'Approval Bupati', status: 'menunggu', progress: 0, tanggal: null }
      ],
      dokumentasi: {
        foto: 8,
        video: 1,
        dokumen: 3,
        drone: 0
      },
      qualityChecks: [],
      issues: 1,
      createdAt: '2024-10-01',
      terakhirUpdate: '2024-10-20'
    },
    {
      id: 'INF-004',
      nama: 'Pembangunan MCK Desa 5 Unit',
      jenis: 'mck',
      tipe: 'pembangunan',
      anggaran: 30000000,
      realisasi: 0,
      progress: 0,
      status: 'menunggu_persetujuan',
      statusDetail: 'RAB sedang direview Kecamatan',
      prioritas: 'tinggi',
      lokasi: 'Dusun 1, 2, 3',
      koordinat: { lat: -7.387, lng: 109.363 },
      penanggungJawab: 'Bidang Sosial',
      kontraktor: null,
      tanggalMulai: null,
      tanggalSelesai: null,
      deskripsi: 'Pembangunan 5 unit MCK umum untuk meningkatkan sanitasi dan kesehatan warga di tiga dusun.',
      spesifikasi: {
        unit: '5 unit',
        ukuran: '2x3 m',
        material: 'Bata, Semen, Keramik',
        fasilitas: 'Kloset, Bak Mandi, Saluran'
      },
      milestones: [
        { nama: 'Pengajuan RAB', status: 'selesai', progress: 100, tanggal: '2024-10-08' },
        { nama: 'Survey Lokasi', status: 'selesai', progress: 100, tanggal: '2024-10-12' },
        { nama: 'Approval Kecamatan', status: 'dalam_proses', progress: 50, tanggal: null }
      ],
      dokumentasi: {
        foto: 5,
        video: 0,
        dokumen: 2,
        drone: 0
      },
      qualityChecks: [],
      issues: 0,
      createdAt: '2024-10-05',
      terakhirUpdate: '2024-10-18'
    },
    {
      id: 'INF-005',
      nama: 'Perbaikan Penerangan Jalan',
      jenis: 'penerangan',
      tipe: 'perbaikan',
      anggaran: 45000000,
      realisasi: 45000000,
      progress: 100,
      status: 'selesai',
      statusDetail: 'Proyek telah selesai dan beroperasi',
      prioritas: 'sedang',
      lokasi: 'Jl. Poros Desa',
      koordinat: { lat: -7.390, lng: 109.360 },
      penanggungJawab: 'Kepala Desa',
      kontraktor: 'CV Terang Selalu',
      tanggalMulai: '2024-08-01',
      tanggalSelesai: '2024-09-15',
      deskripsi: 'Perbaikan dan penambahan 25 titik lampu penerangan jalan umum menggunakan teknologi LED hemat energi.',
      spesifikasi: {
        titik: '25 titik',
        tipe: 'Lampu LED 50W',
        tinggi: '6 m',
        sumber: 'Listrik PLN',
        otomasi: 'Photocell Auto'
      },
      milestones: [
        { nama: 'Survey & Perencanaan', status: 'selesai', progress: 100, tanggal: '2024-08-05' },
        { nama: 'Pemasangan Tiang', status: 'selesai', progress: 100, tanggal: '2024-08-20' },
        { nama: 'Instalasi Listrik', status: 'selesai', progress: 100, tanggal: '2024-09-05' },
        { nama: 'Testing & Operasi', status: 'selesai', progress: 100, tanggal: '2024-09-15' }
      ],
      dokumentasi: {
        foto: 10,
        video: 2,
        dokumen: 4,
        drone: 1
      },
      qualityChecks: [
        { item: 'Intensitas Cahaya', standar: '50 Lux', actual: '55 Lux', status: 'sesuai' },
        { item: 'Ketinggian Tiang', standar: '6 m', actual: '6.2 m', status: 'sesuai' }
      ],
      issues: 0,
      createdAt: '2024-07-25',
      terakhirUpdate: '2024-09-20'
    },
    {
      id: 'INF-006',
      nama: 'Pembangunan Pos Kamling 3 Unit',
      jenis: 'gedung',
      tipe: 'pembangunan',
      anggaran: 60000000,
      realisasi: 60000000,
      progress: 100,
      status: 'selesai',
      statusDetail: 'Pos kamling telah digunakan warga',
      prioritas: 'rendah',
      lokasi: 'Dusun 1, 2, 3',
      koordinat: { lat: -7.391, lng: 109.359 },
      penanggungJawab: 'Ketua RT',
      kontraktor: 'CV Aman Sentosa',
      tanggalMulai: '2024-07-10',
      tanggalSelesai: '2024-08-30',
      deskripsi: 'Pembangunan 3 unit pos kamling dengan desain modern untuk keamanan lingkungan desa.',
      spesifikasi: {
        unit: '3 unit',
        ukuran: '3x4 m',
        material: 'Kayu & Bata',
        fasilitas: 'Listrik, Meja, Kursi'
      },
      milestones: [
        { nama: 'Pembangunan Struktur', status: 'selesai', progress: 100, tanggal: '2024-07-25' },
        { nama: 'Finishing & Cat', status: 'selesai', progress: 100, tanggal: '2024-08-15' },
        { nama: 'Penyerahan ke Warga', status: 'selesai', progress: 100, tanggal: '2024-08-30' }
      ],
      dokumentasi: {
        foto: 8,
        video: 1,
        dokumen: 3,
        drone: 0
      },
      qualityChecks: [
        { item: 'Kekuatan Struktur', standar: 'Stabil', actual: 'Stabil', status: 'sesuai' }
      ],
      issues: 0,
      createdAt: '2024-07-01',
      terakhirUpdate: '2024-09-05'
    }
  ];

  // Filter data berdasarkan tab aktif, status, jenis, dan pencarian
  const filteredProjects = infrastrukturData.filter(project => {
    // Filter berdasarkan tab aktif
    let tabMatch = true;
    if (activeTab === 'aktif') {
      tabMatch = project.status === 'dalam_pengerjaan';
    } else if (activeTab === 'selesai') {
      tabMatch = project.status === 'selesai';
    } else if (activeTab === 'pengajuan') {
      tabMatch = project.status === 'menunggu_persetujuan';
    } else if (activeTab === 'jalan') {
      tabMatch = project.jenis === 'jalan';
    } else if (activeTab === 'jembatan') {
      tabMatch = project.jenis === 'jembatan';
    }

    // Filter tambahan
    const statusMatch = filterStatus === 'semua' || project.status === filterStatus;
    const jenisMatch = filterJenis === 'semua' || project.jenis === filterJenis;
    const searchMatch = project.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
                       project.lokasi.toLowerCase().includes(searchQuery.toLowerCase()) ||
                       project.deskripsi.toLowerCase().includes(searchQuery.toLowerCase());
    
    return tabMatch && statusMatch && jenisMatch && searchMatch;
  });

  const handleViewDetails = (project) => {
    setSelectedProject(project);
    setShowModal(true);
  };

  const handleAddProject = () => {
    toast.success('Membuka form tambah proyek infrastruktur baru');
  };

  const handleExportReport = () => {
    toast.success('Mengekspor laporan infrastruktur');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-emerald-50">
      <div className="w-full max-w-full">
        {/* Header */}
        <InfrastrukturHeader 
          totalProjects={infrastrukturData.length}
          onAddProject={handleAddProject}
          onExportReport={handleExportReport}
        />

        {/* Content */}
        <div className="p-4 sm:p-6 max-w-7xl mx-auto space-y-6">
          {/* Statistics */}
          <InfrastrukturStats infrastrukturData={infrastrukturData} />

          {/* Tabs */}
          <ProjectTabs 
            activeTab={activeTab}
            onTabChange={setActiveTab}
            infrastrukturData={infrastrukturData}
          />

          {/* View Mode Toggle */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="bg-white rounded-lg border border-gray-200 p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    viewMode === 'grid' 
                      ? 'bg-blue-600 text-white' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Grid
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    viewMode === 'list' 
                      ? 'bg-blue-600 text-white' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  List
                </button>
                <button
                  onClick={() => setViewMode('map')}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    viewMode === 'map' 
                      ? 'bg-blue-600 text-white' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Peta
                </button>
              </div>
              
              <div className="text-sm text-gray-600">
                {filteredProjects.length} proyek ditemukan
              </div>
            </div>

            {/* Quick Filters */}
            <div className="flex items-center gap-3">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="semua">Semua Status</option>
                <option value="dalam_pengerjaan">Dalam Pengerjaan</option>
                <option value="selesai">Selesai</option>
                <option value="menunggu_persetujuan">Menunggu</option>
              </select>

              <select
                value={filterJenis}
                onChange={(e) => setFilterJenis(e.target.value)}
                className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="semua">Semua Jenis</option>
                <option value="jalan">Jalan</option>
                <option value="jembatan">Jembatan</option>
                <option value="drainase">Drainase</option>
                <option value="mck">MCK</option>
                <option value="penerangan">Penerangan</option>
                <option value="gedung">Gedung</option>
              </select>

              <div className="relative">
                <input
                  type="text"
                  placeholder="Cari proyek..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
                />
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  🔍
                </div>
              </div>
            </div>
          </div>

          {/* Content based on view mode */}
          {viewMode === 'map' ? (
            <MapView 
              projects={filteredProjects}
              onViewDetails={handleViewDetails}
            />
          ) : (
            <ProjectGrid 
              projects={filteredProjects}
              viewMode={viewMode}
              onViewDetails={handleViewDetails}
            />
          )}

          {/* Modal Detail Project */}
          {showModal && selectedProject && (
            <ProjectModal
              project={selectedProject}
              onClose={() => setShowModal(false)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDesaInfrastruktur;