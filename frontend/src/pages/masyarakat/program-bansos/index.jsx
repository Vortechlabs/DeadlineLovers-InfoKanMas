import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Download, 
  Share2, 
  Bell,
  CheckCircle,
  Clock,
  AlertCircle,
  Users,
  DollarSign,
  MapPin,
  Calendar
} from 'lucide-react';
import BansosCard from './BansosCard';
import BansosFilter from './BansosFilter';
import KonfirmasiModal from './KonfirmasiModal';

function MasyarakatBansos() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBansos, setSelectedBansos] = useState(null);
  const [showKonfirmasiModal, setShowKonfirmasiModal] = useState(false);
  const [filters, setFilters] = useState({
    status: 'semua',
    jenis: 'semua',
    tahun: '2024'
  });

  // Data sample program bansos
  const bansosData = [
    {
      id: 1,
      nama: "Bantuan Sembako 1000 KK",
      deskripsi: "Program bantuan paket sembako untuk 1000 keluarga kurang mampu",
      jenis: "sembako",
      status: "berjalan",
      progress: 75,
      anggaran: 500000000,
      realisasi: 375000000,
      tanggalMulai: "2024-03-01",
      tanggalSelesai: "2024-03-31",
      penanggungJawab: "Dinas Sosial",
      lokasi: "Seluruh Desa Sukamaju",
      totalPenerima: 1000,
      penerimaTerkonfirmasi: 750,
      nominal: 200000,
      periode: "Bulanan",
      kriteria: [
        "Keluarga kurang mampu",
        "Memiliki KKS",
        "Terdaftar di DTKS"
      ],
      dokumentasi: [
        "https://images.unsplash.com/photo-1579113800032-c38bd7635818?w=400",
        "https://images.unsplash.com/photo-1559038465-e0ca2910a5b1?w=400"
      ],
      warna: "from-orange-500 to-orange-600",
      icon: "Package",
      statusPenerima: "terdaftar", // 'terdaftar', 'diterima', 'belum_terdaftar'
      perluKonfirmasi: true,
      tanggalKonfirmasi: null
    },
    {
      id: 2,
      nama: "Bantuan Tunai PKH",
      deskripsi: "Program Keluarga Harapan - bantuan tunai untuk keluarga sangat miskin",
      jenis: "tunai",
      status: "berjalan",
      progress: 60,
      anggaran: 300000000,
      realisasi: 180000000,
      tanggalMulai: "2024-03-01",
      tanggalSelesai: "2024-06-30",
      penanggungJawab: "Dinas Sosial",
      lokasi: "RT 01-05 Desa Sukamaju",
      totalPenerima: 500,
      penerimaTerkonfirmasi: 300,
      nominal: 600000,
      periode: "Triwulan",
      kriteria: [
        "Keluarga sangat miskin",
        "Memiliki anak sekolah",
        "Ibu hamil/menyusui"
      ],
      dokumentasi: [
        "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400"
      ],
      warna: "from-green-500 to-emerald-600",
      icon: "DollarSign",
      statusPenerima: "diterima",
      perluKonfirmasi: false,
      tanggalKonfirmasi: "2024-03-15"
    },
    {
      id: 3,
      nama: "Bantuan Pendidikan Anak",
      deskripsi: "Bantuan biaya pendidikan untuk anak dari keluarga tidak mampu",
      jenis: "pendidikan",
      status: "akan_datang",
      progress: 0,
      anggaran: 150000000,
      realisasi: 0,
      tanggalMulai: "2024-04-01",
      tanggalSelesai: "2024-04-30",
      penanggungJawab: "Dinas Pendidikan",
      lokasi: "Seluruh Desa Sukamaju",
      totalPenerima: 100,
      penerimaTerkonfirmasi: 0,
      nominal: 1500000,
      periode: "Tahunan",
      kriteria: [
        "Anak usia sekolah",
        "Keluarga miskin",
        "Terdaftar di sekolah"
      ],
      dokumentasi: [],
      warna: "from-blue-500 to-cyan-600",
      icon: "BookOpen",
      statusPenerima: "belum_terdaftar",
      perluKonfirmasi: false,
      tanggalKonfirmasi: null
    },
    {
      id: 4,
      nama: "Bantuan Lansia Terlantar",
      deskripsi: "Bantuan bulanan untuk lansia terlantar dan tidak memiliki penghasilan",
      jenis: "lansia",
      status: "selesai",
      progress: 100,
      anggaran: 80000000,
      realisasi: 80000000,
      tanggalMulai: "2024-01-01",
      tanggalSelesai: "2024-01-31",
      penanggungJawab: "Dinas Sosial",
      lokasi: "Seluruh Desa Sukamaju",
      totalPenerima: 50,
      penerimaTerkonfirmasi: 48,
      nominal: 400000,
      periode: "Bulanan",
      kriteria: [
        "Usia di atas 60 tahun",
        "Tidak memiliki penghasilan",
        "Tinggal sendiri"
      ],
      dokumentasi: [
        "https://images.unsplash.com/photo-1584516150909-c43483ee7932?w=400"
      ],
      warna: "from-purple-500 to-pink-600",
      icon: "Heart",
      statusPenerima: "diterima",
      perluKonfirmasi: false,
      tanggalKonfirmasi: "2024-01-20"
    },
    {
      id: 5,
      nama: "Bantuan UMKM Desa",
      deskripsi: "Modal usaha untuk pengembangan usaha mikro kecil menengah",
      jenis: "umkm",
      status: "berjalan",
      progress: 40,
      anggaran: 200000000,
      realisasi: 80000000,
      tanggalMulai: "2024-02-15",
      tanggalSelesai: "2024-05-15",
      penanggungJawab: "Dinas Koperasi",
      lokasi: "Pusat UKM Desa Sukamaju",
      totalPenerima: 25,
      penerimaTerkonfirmasi: 10,
      nominal: 8000000,
      periode: "One-time",
      kriteria: [
        "Memiliki usaha mikro",
        "Berdomisili di desa",
        "Memiliki proposal usaha"
      ],
      dokumentasi: [
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400"
      ],
      warna: "from-amber-500 to-yellow-600",
      icon: "TrendingUp",
      statusPenerima: "terdaftar",
      perluKonfirmasi: true,
      tanggalKonfirmasi: null
    }
  ];

  const handleKonfirmasi = (bansos) => {
    setSelectedBansos(bansos);
    setShowKonfirmasiModal(true);
  };

  const filteredBansos = bansosData.filter(bansos => {
    const matchesSearch = bansos.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         bansos.deskripsi.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filters.status === 'semua' || bansos.status === filters.status;
    const matchesJenis = filters.jenis === 'semua' || bansos.jenis === filters.jenis;
    
    return matchesSearch && matchesStatus && matchesJenis;
  });

  const getStatusInfo = (statusPenerima) => {
    const statusMap = {
      terdaftar: {
        label: "Terdaftar",
        color: "bg-blue-100 text-blue-700 border-blue-200",
        icon: Clock,
        description: "Anda terdaftar sebagai penerima"
      },
      diterima: {
        label: "Telah Diterima",
        color: "bg-green-100 text-green-700 border-green-200",
        icon: CheckCircle,
        description: "Bantuan telah Anda terima"
      },
      belum_terdaftar: {
        label: "Belum Terdaftar",
        color: "bg-gray-100 text-gray-700 border-gray-200",
        icon: AlertCircle,
        description: "Anda belum terdaftar dalam program ini"
      }
    };
    return statusMap[statusPenerima] || statusMap.belum_terdaftar;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 p-4">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Program Bansos</h1>
            <p className="text-gray-600">Pantau dan konfirmasi bantuan sosial yang Anda terima</p>
          </div>
          <div className="flex items-center space-x-2">
            <button className="p-2 hover:bg-white rounded-xl transition-colors">
              <Bell className="w-5 h-5 text-gray-600" />
            </button>
            <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center">
              <Users className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Bansos</p>
              <p className="text-2xl font-bold text-orange-600">5</p>
            </div>
            <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center">
              <Users className="w-5 h-5 text-orange-500" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Perlu Konfirmasi</p>
              <p className="text-2xl font-bold text-blue-600">2</p>
            </div>
            <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-blue-500" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Telah Diterima</p>
              <p className="text-2xl font-bold text-green-600">2</p>
            </div>
            <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-green-500" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Menunggu</p>
              <p className="text-2xl font-bold text-gray-600">1</p>
            </div>
            <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center">
              <Clock className="w-5 h-5 text-gray-500" />
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
              placeholder="Cari program bansos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-3">
            <BansosFilter filters={filters} setFilters={setFilters} />
            <button className="p-3 bg-gray-100 text-gray-600 rounded-xl hover:bg-gray-200 transition-colors">
              <Download className="w-5 h-5" />
            </button>
            <button className="p-3 bg-gray-100 text-gray-600 rounded-xl hover:bg-gray-200 transition-colors">
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Status Info */}
      <div className="bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200 rounded-2xl p-4 mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
            <Bell className="w-5 h-5 text-orange-600" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-orange-800">Status Penerimaan Anda</h3>
            <p className="text-sm text-orange-700">
              Anda terdaftar dalam 3 program bansos. 2 program perlu konfirmasi penerimaan.
            </p>
          </div>
        </div>
      </div>

      {/* Bansos List */}
      <div className="space-y-4">
        {filteredBansos.map(bansos => {
          const statusInfo = getStatusInfo(bansos.statusPenerima);
          const StatusIcon = statusInfo.icon;

          return (
            <div key={bansos.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              {/* Header */}
              <div className="p-5 border-b border-gray-100">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    <div className={`w-12 h-12 bg-gradient-to-br ${bansos.warna} rounded-xl flex items-center justify-center`}>
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800 text-lg mb-1">
                        {bansos.nama}
                      </h3>
                      <p className="text-gray-600 text-sm mb-2">
                        {bansos.deskripsi}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <span className={`px-3 py-1 text-xs font-medium rounded-full ${statusInfo.color} border`}>
                          <StatusIcon className="w-3 h-3 inline mr-1" />
                          {statusInfo.label}
                        </span>
                        <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full">
                          {bansos.jenis}
                        </span>
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                          {bansos.nominal.toLocaleString('id-ID')}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                  <div className="text-center p-3 bg-gray-50 rounded-xl">
                    <p className="text-sm text-gray-600">Total Penerima</p>
                    <p className="text-lg font-bold text-gray-800">{bansos.totalPenerima}</p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-xl">
                    <p className="text-sm text-gray-600">Terkonfirmasi</p>
                    <p className="text-lg font-bold text-green-600">{bansos.penerimaTerkonfirmasi}</p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-xl">
                    <p className="text-sm text-gray-600">Progress</p>
                    <p className="text-lg font-bold text-blue-600">{bansos.progress}%</p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-xl">
                    <p className="text-sm text-gray-600">Periode</p>
                    <p className="text-lg font-bold text-purple-600">{bansos.periode}</p>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Progress Penyaluran</span>
                    <span>{bansos.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="h-2 rounded-full bg-gradient-to-r from-orange-500 to-orange-600"
                      style={{ width: `${bansos.progress}%` }}
                    ></div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  {bansos.perluKonfirmasi && bansos.statusPenerima === 'terdaftar' && (
                    <button 
                      onClick={() => handleKonfirmasi(bansos)}
                      className="flex-1 bg-orange-500 text-white py-3 px-6 rounded-xl font-semibold hover:bg-orange-600 transition-colors flex items-center justify-center space-x-2"
                    >
                      <CheckCircle className="w-5 h-5" />
                      <span>Konfirmasi Penerimaan</span>
                    </button>
                  )}
                  
                  {bansos.statusPenerima === 'diterima' && (
                    <button className="flex-1 bg-green-500 text-white py-3 px-6 rounded-xl font-semibold hover:bg-green-600 transition-colors flex items-center justify-center space-x-2">
                      <CheckCircle className="w-5 h-5" />
                      <span>Bantuan Telah Diterima</span>
                    </button>
                  )}

                  <button className="flex-1 border border-gray-300 text-gray-700 py-3 px-6 rounded-xl font-semibold hover:bg-gray-50 transition-colors">
                    Lihat Detail Program
                  </button>
                  
                  <button className="flex-1 border border-gray-300 text-gray-700 py-3 px-6 rounded-xl font-semibold hover:bg-gray-50 transition-colors">
                    Laporkan Masalah
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredBansos.length === 0 && (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Tidak ada program bansos</h3>
          <p className="text-gray-600 mb-4">
            Tidak ditemukan program bansos yang sesuai dengan filter Anda
          </p>
          <button 
            onClick={() => {
              setSearchQuery('');
              setFilters({ status: 'semua', jenis: 'semua', tahun: '2024' });
            }}
            className="px-6 py-2 bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition-colors"
          >
            Reset Pencarian
          </button>
        </div>
      )}

      {/* Konfirmasi Modal */}
      {showKonfirmasiModal && selectedBansos && (
        <KonfirmasiModal 
          bansos={selectedBansos}
          onClose={() => setShowKonfirmasiModal(false)}
          onConfirm={() => {
            // Handle konfirmasi logic here
            setShowKonfirmasiModal(false);
          }}
        />
      )}
    </div>
  );
}

export default MasyarakatBansos;