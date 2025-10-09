import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  MapPin, 
  Wrench, 
  Clock,
  CheckCircle,
  AlertCircle,
  Calendar,
  Users,
  DollarSign,
  Navigation,
  ZoomIn,
  ZoomOut,
  List
} from 'lucide-react';
import InfrastrukturCard from './InfrastrukturCard';
import InfrastrukturFilter from './InfrastrukturFilter';
import InfrastrukturModal from './InfrastrukturModal';
import PetaInfrastruktur from './PetaInfrastruktur';

function MasyarakatInfrastruktur() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [viewMode, setViewMode] = useState('grid'); // 'grid', 'list', 'map'
  const [filters, setFilters] = useState({
    status: 'semua',
    jenis: 'semua',
    tahun: '2024'
  });

  // Data sample proyek infrastruktur
  const infrastrukturData = [
    {
      id: 1,
      nama: "Perbaikan Jalan Desa Sukamaju",
      deskripsi: "Peningkatan kualitas jalan sepanjang 2 km di wilayah RT 01-03 dengan pengerasan dan pengaspalan",
      jenis: "jalan",
      status: "berjalan",
      progress: 45,
      anggaran: 250000000,
      realisasi: 112500000,
      tanggalMulai: "2024-03-15",
      tanggalSelesai: "2024-04-30",
      penanggungJawab: "Dinas PUPR",
      lokasi: "Jl. Desa Sukamaju RT 01-03",
      koordinat: { lat: -7.250445, lng: 111.439476 },
      kontraktor: "PT. Bangun Jaya",
      panjang: "2 km",
      lebar: "5 m",
      material: "Aspal Hotmix",
      dokumentasi: [
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400",
        "https://images.unsplash.com/photo-1509826069f7b0c6dac2b5c4?w=400",
        "https://images.unsplash.com/photo-1541976590-713941681591?w=400"
      ],
      warna: "from-blue-500 to-cyan-500",
      icon: "TrafficCone",
      rating: 4.2,
      totalRating: 32,
      masalah: [
        "Progress agak lambat",
        "Material berkualitas baik"
      ],
      dampak: "Akses transportasi 1200 warga"
    },
    {
      id: 2,
      nama: "Pembangunan Jembatan Gantung",
      deskripsi: "Pembangunan jembatan gantung untuk menghubungkan dua dusun yang terpisah sungai",
      jenis: "jembatan",
      status: "hampir_selesai",
      progress: 90,
      anggaran: 350000000,
      realisasi: 315000000,
      tanggalMulai: "2024-02-01",
      tanggalSelesai: "2024-03-25",
      penanggungJawab: "Dinas PUPR",
      lokasi: "Sungai antara Dusun A dan B",
      koordinat: { lat: -7.251445, lng: 111.440476 },
      kontraktor: "CV. Jembatan Nusantara",
      panjang: "25 m",
      lebar: "2 m",
      material: "Baja dan Kayu",
      dokumentasi: [
        "https://images.unsplash.com/photo-1541976590-713941681591?w=400",
        "https://images.unsplash.com/photo-1515279981335-b8f40d1b253d?w=400"
      ],
      warna: "from-green-500 to-emerald-500",
      icon: "BrickWall",
      rating: 4.8,
      totalRating: 28,
      masalah: [
        "Pengerjaan sesuai jadwal",
        "Material sesuai spesifikasi"
      ],
      dampak: "Menghubungkan 500 warga"
    },
    {
      id: 3,
      nama: "Renovasi Puskesmas Pembantu",
      deskripsi: "Perbaikan dan penambahan fasilitas puskesmas pembantu desa",
      jenis: "kesehatan",
      status: "selesai",
      progress: 100,
      anggaran: 180000000,
      realisasi: 180000000,
      tanggalMulai: "2024-01-01",
      tanggalSelesai: "2024-01-31",
      penanggungJawab: "Dinas Kesehatan",
      lokasi: "Puskesmas Sukamaju",
      koordinat: { lat: -7.249445, lng: 111.438476 },
      kontraktor: "PT. Sehat Bangun",
      luas: "150 m²",
      ruangan: "5 ruangan",
      material: "Bata dan Semen",
      dokumentasi: [
        "https://images.unsplash.com/photo-1551076805-e1869033e561?w=400",
        "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=400",
        "https://images.unsplash.com/photo-1516549655669-df66576e6f49?w=400"
      ],
      warna: "from-purple-500 to-pink-500",
      icon: "Building",
      rating: 4.9,
      totalRating: 45,
      masalah: [
        "Pengerjaan cepat dan rapi",
        "Fasilitas memadai"
      ],
      dampak: "Melayani 2500 warga"
    },
    {
      id: 4,
      nama: "Pembangunan Drainase",
      deskripsi: "Pembangunan sistem drainase untuk mengatasi banjir di wilayah RT 05-07",
      jenis: "drainase",
      status: "berjalan",
      progress: 60,
      anggaran: 120000000,
      realisasi: 72000000,
      tanggalMulai: "2024-03-01",
      tanggalSelesai: "2024-04-15",
      penanggungJawab: "Dinas PUPR",
      lokasi: "RT 05-07 Desa Sukamaju",
      koordinat: { lat: -7.252445, lng: 111.441476 },
      kontraktor: "CV. Air Bersih",
      panjang: "500 m",
      diameter: "40 cm",
      material: "Beton Pracetak",
      dokumentasi: [
        "https://images.unsplash.com/photo-1541976590-713941681591?w=400"
      ],
      warna: "from-cyan-500 to-blue-500",
      icon: "Droplet",
      rating: 4.1,
      totalRating: 18,
      masalah: [
        "Beberapa titik perlu perbaikan",
        "Material cukup baik"
      ],
      dampak: "Mengatasi banjir 300 rumah"
    },
    {
      id: 5,
      nama: "Penerangan Jalan Umum",
      deskripsi: "Pemasangan lampu penerangan jalan umum di sepanjang jalan desa",
      jenis: "pju",
      status: "akan_datang",
      progress: 0,
      anggaran: 80000000,
      realisasi: 0,
      tanggalMulai: "2024-04-01",
      tanggalSelesai: "2024-04-30",
      penanggungJawab: "Dinas PUPR",
      lokasi: "Seluruh jalan desa",
      koordinat: { lat: -7.248445, lng: 111.437476 },
      kontraktor: "PT. Terang Jaya",
      jumlah: "50 titik",
      tipe: "Lampu LED",
      material: "Besi dan Aluminium",
      dokumentasi: [],
      warna: "from-yellow-500 to-amber-500",
      icon: "Lightbulb",
      rating: 0,
      totalRating: 0,
      masalah: [],
      dampak: "Penerangan 3 km jalan"
    },
    {
      id: 6,
      nama: "Perbaikan Saluran Irigasi",
      deskripsi: "Perbaikan dan normalisasi saluran irigasi untuk pertanian",
      jenis: "irigasi",
      status: "berjalan",
      progress: 75,
      anggaran: 150000000,
      realisasi: 112500000,
      tanggalMulai: "2024-02-20",
      tanggalSelesai: "2024-04-10",
      penanggungJawab: "Dinas Pertanian",
      lokasi: "Area persawahan Dusun C",
      koordinat: { lat: -7.253445, lng: 111.442476 },
      kontraktor: "CV. Tani Maju",
      panjang: "1.2 km",
      lebar: "1.5 m",
      material: "Beton dan Batu",
      dokumentasi: [
        "https://images.unsplash.com/photo-1541976590-713941681591?w=400"
      ],
      warna: "from-teal-500 to-green-500",
      icon: "Sprout",
      rating: 4.4,
      totalRating: 22,
      masalah: [
        "Pengerjaan sesuai target",
        "Kualitas material baik"
      ],
      dampak: "Mengairi 50 hektar sawah"
    }
  ];

  const handleProjectClick = (project) => {
    setSelectedProject(project);
    setShowModal(true);
  };

  const filteredProjects = infrastrukturData.filter(project => {
    const matchesSearch = project.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.deskripsi.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filters.status === 'semua' || project.status === filters.status;
    const matchesJenis = filters.jenis === 'semua' || project.jenis === filters.jenis;
    
    return matchesSearch && matchesStatus && matchesJenis;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 p-4">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Infrastruktur Desa</h1>
            <p className="text-gray-600">Pantau perkembangan pembangunan infrastruktur di desa Anda</p>
          </div>
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
            <Wrench className="w-5 h-5 text-white" />
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Proyek</p>
              <p className="text-2xl font-bold text-blue-600">6</p>
            </div>
            <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
              <Wrench className="w-5 h-5 text-blue-500" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Sedang Berjalan</p>
              <p className="text-2xl font-bold text-green-600">3</p>
            </div>
            <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center">
              <Clock className="w-5 h-5 text-green-500" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Selesai</p>
              <p className="text-2xl font-bold text-emerald-600">1</p>
            </div>
            <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-emerald-500" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Akan Datang</p>
              <p className="text-2xl font-bold text-orange-600">1</p>
            </div>
            <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center">
              <Calendar className="w-5 h-5 text-orange-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Search and Controls */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-6">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search Bar */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Cari proyek infrastruktur..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* View Toggle */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-4 py-2 rounded-xl transition-all duration-300 flex items-center space-x-2 ${
                viewMode === 'grid' 
                  ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/30' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <Wrench className="w-4 h-4" />
              <span>Grid</span>
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-4 py-2 rounded-xl transition-all duration-300 flex items-center space-x-2 ${
                viewMode === 'list' 
                  ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/30' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <List className="w-4 h-4" />
              <span>List</span>
            </button>
            <button
              onClick={() => setViewMode('map')}
              className={`px-4 py-2 rounded-xl transition-all duration-300 flex items-center space-x-2 ${
                viewMode === 'map' 
                  ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/30' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <MapPin className="w-4 h-4" />
              <span>Peta</span>
            </button>
            
            <InfrastrukturFilter filters={filters} setFilters={setFilters} />
          </div>
        </div>
      </div>

      {/* Map View */}
      {viewMode === 'map' && (
        <div className="mb-6">
          <PetaInfrastruktur 
            projects={filteredProjects}
            onProjectClick={handleProjectClick}
          />
        </div>
      )}

      {/* Projects Grid/List */}
      {viewMode !== 'map' && (
        <>
          {/* Results Info */}
          <div className="flex items-center justify-between mb-4">
            <p className="text-gray-600">
              Menampilkan <span className="font-semibold text-gray-800">{filteredProjects.length}</span> proyek
            </p>
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                Hapus pencarian
              </button>
            )}
          </div>

          {filteredProjects.length > 0 ? (
            <div className={
              viewMode === 'grid' 
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                : "space-y-4"
            }>
              {filteredProjects.map((project) => (
                <InfrastrukturCard 
                  key={project.id} 
                  project={project} 
                  viewMode={viewMode}
                  onClick={() => handleProjectClick(project)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Proyek tidak ditemukan</h3>
              <p className="text-gray-600 mb-4">
                Coba ubah kata kunci pencarian atau filter yang digunakan
              </p>
              <button 
                onClick={() => {
                  setSearchQuery('');
                  setFilters({ status: 'semua', jenis: 'semua', tahun: '2024' });
                }}
                className="px-6 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors"
              >
                Reset Pencarian
              </button>
            </div>
          )}
        </>
      )}

      {/* Modal */}
      {showModal && selectedProject && (
        <InfrastrukturModal 
          project={selectedProject}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}

export default MasyarakatInfrastruktur;