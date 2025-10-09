import React, { useState } from 'react';
import { Search, Filter, Grid, List, ChevronRight, Eye } from 'lucide-react';
import ProgramCard from './ProgramCard';
import ProgramModal from './ProgramModal';
import ProgramFilter from './ProgramFilter';

function MasyarakatSemuaProgram() {
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [filters, setFilters] = useState({
    jenis: 'semua',
    status: 'semua',
    tahun: '2024'
  });

  // Data sample program
  const programs = [
    {
      id: 1,
      nama: "Bantuan Sembako 1000 KK",
      deskripsi: "Program bantuan sembako untuk 1000 keluarga kurang mampu di wilayah Desa Sukamaju",
      jenis: "bansos",
      status: "berjalan",
      progress: 75,
      anggaran: 500000000,
      realisasi: 375000000,
      tanggalMulai: "2024-03-01",
      tanggalSelesai: "2024-03-31",
      penanggungJawab: "Dinas Sosial",
      lokasi: "Seluruh Desa Sukamaju",
      penerimaManfaat: 750,
      dokumentasi: [
        "https://images.unsplash.com/photo-1579113800032-c38bd7635818?w=400",
        "https://images.unsplash.com/photo-1559038465-e0ca2910a5b1?w=400"
      ],
      warna: "from-orange-500 to-orange-600",
      icon: "Heart",
      rating: 4.2,
      totalRating: 45,
      konfirmasiDibutuhkan: true
    },
    {
      id: 2,
      nama: "Perbaikan Jalan Desa Sukamaju",
      deskripsi: "Peningkatan kualitas jalan sepanjang 2 km di wilayah RT 01-03",
      jenis: "infrastruktur",
      status: "berjalan",
      progress: 45,
      anggaran: 250000000,
      realisasi: 112500000,
      tanggalMulai: "2024-03-15",
      tanggalSelesai: "2024-04-30",
      penanggungJawab: "Dinas PUPR",
      lokasi: "Jl. Desa Sukamaju RT 01-03",
      penerimaManfaat: 1200,
      dokumentasi: [
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400",
        "https://images.unsplash.com/photo-1509826069f7b0c6dac2b5c4?w=400"
      ],
      warna: "from-blue-500 to-blue-600",
      icon: "Wrench",
      rating: 4.5,
      totalRating: 32,
      konfirmasiDibutuhkan: false
    },
    {
      id: 3,
      nama: "Renovasi Puskesmas Pembantu",
      deskripsi: "Perbaikan dan penambahan fasilitas puskesmas pembantu desa",
      jenis: "kesehatan",
      status: "hampir selesai",
      progress: 90,
      anggaran: 350000000,
      realisasi: 315000000,
      tanggalMulai: "2024-02-01",
      tanggalSelesai: "2024-03-25",
      penanggungJawab: "Dinas Kesehatan",
      lokasi: "Puskesmas Sukamaju",
      penerimaManfaat: 2500,
      dokumentasi: [
        "https://images.unsplash.com/photo-1551076805-e1869033e561?w=400",
        "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=400"
      ],
      warna: "from-green-500 to-green-600",
      icon: "Building",
      rating: 4.8,
      totalRating: 28,
      konfirmasiDibutuhkan: false
    },
    {
      id: 4,
      nama: "Beasiswa Pendidikan SD-SMP",
      deskripsi: "Bantuan biaya pendidikan untuk siswa berprestasi dari keluarga kurang mampu",
      jenis: "pendidikan",
      status: "selesai",
      progress: 100,
      anggaran: 120000000,
      realisasi: 120000000,
      tanggalMulai: "2024-01-01",
      tanggalSelesai: "2024-01-31",
      penanggungJawab: "Dinas Pendidikan",
      lokasi: "Seluruh sekolah di Desa Sukamaju",
      penerimaManfaat: 50,
      dokumentasi: [
        "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400"
      ],
      warna: "from-purple-500 to-purple-600",
      icon: "Users",
      rating: 4.9,
      totalRating: 38,
      konfirmasiDibutuhkan: true
    },
    {
      id: 5,
      nama: "Pelatihan Kewirausahaan Pemuda",
      deskripsi: "Program pelatihan dan pendampingan usaha untuk pemuda desa",
      jenis: "pelatihan",
      status: "akan datang",
      progress: 0,
      anggaran: 80000000,
      realisasi: 0,
      tanggalMulai: "2024-04-01",
      tanggalSelesai: "2024-04-30",
      penanggungJawab: "Dinas Koperasi",
      lokasi: "Balai Desa Sukamaju",
      penerimaManfaat: 30,
      dokumentasi: [],
      warna: "from-cyan-500 to-cyan-600",
      icon: "TrendingUp",
      rating: 0,
      totalRating: 0,
      konfirmasiDibutuhkan: false
    },
    {
      id: 6,
      nama: "Bantuan Modal UMKM",
      deskripsi: "Pinjaman lunak untuk pengembangan usaha mikro kecil menengah",
      jenis: "ekonomi",
      status: "berjalan",
      progress: 60,
      anggaran: 200000000,
      realisasi: 120000000,
      tanggalMulai: "2024-02-15",
      tanggalSelesai: "2024-05-15",
      penanggungJawab: "Dinas Koperasi",
      lokasi: "Seluruh Desa Sukamaju",
      penerimaManfaat: 25,
      dokumentasi: [
        "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400"
      ],
      warna: "from-emerald-500 to-emerald-600",
      icon: "DollarSign",
      rating: 4.3,
      totalRating: 15,
      konfirmasiDibutuhkan: true
    }
  ];

  const handleProgramClick = (program) => {
    setSelectedProgram(program);
    setShowModal(true);
  };

  const filteredPrograms = programs.filter(program => {
    const matchesSearch = program.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         program.deskripsi.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesJenis = filters.jenis === 'semua' || program.jenis === filters.jenis;
    const matchesStatus = filters.status === 'semua' || program.status === filters.status;
    
    return matchesSearch && matchesJenis && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 p-4">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Semua Program</h1>
            <p className="text-gray-600">Pantau perkembangan program di desa Anda</p>
          </div>
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
            <Eye className="w-5 h-5 text-white" />
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
              placeholder="Cari program..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* View Controls */}
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'grid' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <Grid className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'list' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <List className="w-5 h-5" />
            </button>
            
            <ProgramFilter filters={filters} setFilters={setFilters} />
          </div>
        </div>
      </div>

      {/* Results Info */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-gray-600">
          Menampilkan <span className="font-semibold text-gray-800">{filteredPrograms.length}</span> program
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

      {/* Programs Grid/List */}
      {filteredPrograms.length > 0 ? (
        <div className={
          viewMode === 'grid' 
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
            : "space-y-4"
        }>
          {filteredPrograms.map((program) => (
            <ProgramCard 
              key={program.id} 
              program={program} 
              viewMode={viewMode}
              onClick={() => handleProgramClick(program)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Program tidak ditemukan</h3>
          <p className="text-gray-600 mb-4">
            Coba ubah kata kunci pencarian atau filter yang digunakan
          </p>
          <button 
            onClick={() => {
              setSearchQuery('');
              setFilters({ jenis: 'semua', status: 'semua', tahun: '2024' });
            }}
            className="px-6 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors"
          >
            Reset Pencarian
          </button>
        </div>
      )}

      {/* Modal */}
      {showModal && selectedProgram && (
        <ProgramModal 
          program={selectedProgram}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}

export default MasyarakatSemuaProgram;