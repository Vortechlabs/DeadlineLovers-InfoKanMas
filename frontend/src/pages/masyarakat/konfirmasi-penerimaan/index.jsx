import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  QrCode,
  Smartphone,
  Download,
  Bell,
  Users,
  DollarSign,
  Calendar,
  MapPin
} from 'lucide-react';
import KonfirmasiCard from './KonfirmasiCard';
import KonfirmasiFilter from './KonfirmasiFilter';
import KonfirmasiModal from './KonfirmasiModal';

function MasyarakatKonfirmasi() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBansos, setSelectedBansos] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [filters, setFilters] = useState({
    status: 'perlu_konfirmasi',
    jenis: 'semua',
    periode: 'semua'
  });

  // Data sample untuk konfirmasi
  const konfirmasiData = [
    {
      id: 1,
      nama: "Bantuan Sembako 1000 KK",
      jenis: "sembako",
      status: "perlu_konfirmasi",
      nominal: 200000,
      tanggalDistribusi: "2024-03-20",
      batasKonfirmasi: "2024-03-27",
      metodeKonfirmasi: ["qr", "sms"],
      deskripsi: "Paket sembako berisi beras, minyak, gula, dan telur",
      buktiPenerimaan: null,
      warna: "from-orange-500 to-orange-600",
      icon: "Package",
      statusPenerima: "terdaftar",
      lokasiPenyaluran: "Posko RW 01 Desa Sukamaju",
      penanggungJawab: "Bapak Surya (Ketua RW 01)",
      catatan: "Silakan konfirmasi setelah menerima paket sembako"
    },
    {
      id: 2,
      nama: "Bantuan Tunai PKH",
      jenis: "tunai",
      status: "perlu_konfirmasi",
      nominal: 600000,
      tanggalDistribusi: "2024-03-18",
      batasKonfirmasi: "2024-03-25",
      metodeKonfirmasi: ["sms"],
      deskripsi: "Bantuan Program Keluarga Harapan triwulan I",
      buktiPenerimaan: null,
      warna: "from-green-500 to-emerald-600",
      icon: "DollarSign",
      statusPenerima: "terdaftar",
      lokasiPenyaluran: "Bank Desa Sukamaju",
      penanggungJawab: "Ibu Maya (CS Bank Desa)",
      catatan: "Konfirmasi via SMS setelah transfer diterima"
    },
    {
      id: 3,
      nama: "Bantuan UMKM Desa",
      jenis: "umkm",
      status: "perlu_konfirmasi",
      nominal: 8000000,
      tanggalDistribusi: "2024-03-22",
      batasKonfirmasi: "2024-03-29",
      metodeKonfirmasi: ["qr", "sms"],
      deskripsi: "Modal usaha untuk pengembangan UMKM",
      buktiPenerimaan: null,
      warna: "from-amber-500 to-yellow-600",
      icon: "TrendingUp",
      statusPenerima: "terdaftar",
      lokasiPenyaluran: "Kantor Desa Sukamaju",
      penanggungJawab: "Bapak Rudi (Kades)",
      catatan: "Bawa KTP dan proposal usaha saat pengambilan"
    },
    {
      id: 4,
      nama: "Bantuan Sembako 1000 KK",
      jenis: "sembako",
      status: "terkonfirmasi",
      nominal: 200000,
      tanggalDistribusi: "2024-02-15",
      batasKonfirmasi: "2024-02-22",
      metodeKonfirmasi: ["qr"],
      deskripsi: "Paket sembako bulan Februari",
      buktiPenerimaan: "qr_scan_20240215",
      tanggalKonfirmasi: "2024-02-15 14:30",
      warna: "from-orange-500 to-orange-600",
      icon: "Package",
      statusPenerima: "diterima",
      lokasiPenyaluran: "Posko RW 03 Desa Sukamaju",
      penanggungJawab: "Ibu Sari (Ketua PKK)",
      catatan: "Telah dikonfirmasi via QR Code"
    },
    {
      id: 5,
      nama: "Bantuan Lansia Terlantar",
      jenis: "lansia",
      status: "terkonfirmasi",
      nominal: 400000,
      tanggalDistribusi: "2024-01-20",
      batasKonfirmasi: "2024-01-27",
      metodeKonfirmasi: ["sms"],
      deskripsi: "Bantuan bulanan untuk lansia terlantar",
      buktiPenerimaan: "sms_confirm_20240120",
      tanggalKonfirmasi: "2024-01-20 10:15",
      warna: "from-purple-500 to-pink-600",
      icon: "Heart",
      statusPenerima: "diterima",
      lokasiPenyaluran: "Rumah penerima",
      penanggungJawab: "Bapak Joko (Petugas Sosial)",
      catatan: "Telah dikonfirmasi via SMS"
    },
    {
      id: 6,
      nama: "Bantuan Pendidikan",
      jenis: "pendidikan",
      status: "kedaluwarsa",
      nominal: 1500000,
      tanggalDistribusi: "2024-01-10",
      batasKonfirmasi: "2024-01-17",
      metodeKonfirmasi: ["qr", "sms"],
      deskripsi: "Bantuan biaya pendidikan semester genap",
      buktiPenerimaan: null,
      warna: "from-blue-500 to-cyan-600",
      icon: "BookOpen",
      statusPenerima: "terdaftar",
      lokasiPenyaluran: "Sekolah masing-masing",
      penanggungJawab: "Ibu Dian (Dinas Pendidikan)",
      catatan: "Batas konfirmasi telah lewat"
    }
  ];

  const handleKonfirmasi = (bansos) => {
    setSelectedBansos(bansos);
    setShowModal(true);
  };

  const filteredBansos = konfirmasiData.filter(bansos => {
    const matchesSearch = bansos.nama.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filters.status === 'semua' || bansos.status === filters.status;
    const matchesJenis = filters.jenis === 'semua' || bansos.jenis === filters.jenis;
    
    return matchesSearch && matchesStatus && matchesJenis;
  });

  const getStats = () => {
    const perluKonfirmasi = konfirmasiData.filter(b => b.status === 'perlu_konfirmasi').length;
    const terkonfirmasi = konfirmasiData.filter(b => b.status === 'terkonfirmasi').length;
    const kedaluwarsa = konfirmasiData.filter(b => b.status === 'kedaluwarsa').length;
    const totalNominal = konfirmasiData
      .filter(b => b.status === 'perlu_konfirmasi')
      .reduce((sum, b) => sum + b.nominal, 0);

    return { perluKonfirmasi, terkonfirmasi, kedaluwarsa, totalNominal };
  };

  const stats = getStats();

  const getStatusInfo = (status) => {
    const statusMap = {
      'perlu_konfirmasi': {
        label: "Perlu Konfirmasi",
        color: "bg-orange-100 text-orange-700 border-orange-200",
        icon: AlertCircle,
        description: "Segera konfirmasi penerimaan"
      },
      'terkonfirmasi': {
        label: "Terkonfirmasi",
        color: "bg-green-100 text-green-700 border-green-200",
        icon: CheckCircle,
        description: "Telah dikonfirmasi"
      },
      'kedaluwarsa': {
        label: "Kedaluwarsa",
        color: "bg-gray-100 text-gray-700 border-gray-200",
        icon: Clock,
        description: "Batas konfirmasi telah lewat"
      }
    };
    return statusMap[status] || statusMap.perlu_konfirmasi;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 p-4">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Konfirmasi Penerimaan</h1>
            <p className="text-gray-600">Konfirmasi bantuan sosial yang telah Anda terima</p>
          </div>
          <div className="flex items-center space-x-2">
            <button className="p-2 hover:bg-white rounded-xl transition-colors">
              <Bell className="w-5 h-5 text-gray-600" />
            </button>
            <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Perlu Konfirmasi</p>
              <p className="text-2xl font-bold text-orange-600">{stats.perluKonfirmasi}</p>
            </div>
            <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center">
              <AlertCircle className="w-5 h-5 text-orange-500" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Terkonfirmasi</p>
              <p className="text-2xl font-bold text-green-600">{stats.terkonfirmasi}</p>
            </div>
            <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-green-500" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Kedaluwarsa</p>
              <p className="text-2xl font-bold text-gray-600">{stats.kedaluwarsa}</p>
            </div>
            <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center">
              <Clock className="w-5 h-5 text-gray-500" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Menunggu</p>
              <p className="text-2xl font-bold text-blue-600">
                {new Intl.NumberFormat('id-ID', {
                  style: 'currency',
                  currency: 'IDR',
                  minimumFractionDigits: 0
                }).format(stats.totalNominal)}
              </p>
            </div>
            <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-blue-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Alert Banner */}
      {stats.perluKonfirmasi > 0 && (
        <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-4 text-white mb-6">
          <div className="flex items-center space-x-3">
            <AlertCircle className="w-6 h-6" />
            <div className="flex-1">
              <h3 className="font-semibold">Perhatian!</h3>
              <p className="text-sm opacity-90">
                Anda memiliki {stats.perluKonfirmasi} bantuan yang perlu dikonfirmasi. 
                Segera konfirmasi sebelum batas waktu berakhir.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Search and Controls */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-6">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search Bar */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Cari bantuan yang perlu dikonfirmasi..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-3">
            <KonfirmasiFilter filters={filters} setFilters={setFilters} />
            <button className="p-3 bg-gray-100 text-gray-600 rounded-xl hover:bg-gray-200 transition-colors">
              <Download className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <button className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 group text-left">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
              <QrCode className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 group-hover:text-blue-600">Scan QR Code</h3>
              <p className="text-sm text-gray-600">Konfirmasi dengan scan barcode</p>
            </div>
          </div>
        </button>

        <button className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 group text-left">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
              <Smartphone className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 group-hover:text-green-600">Konfirmasi SMS</h3>
              <p className="text-sm text-gray-600">Balas SMS dengan format khusus</p>
            </div>
          </div>
        </button>

        <button className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 group text-left">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 group-hover:text-purple-600">Bantuan Manual</h3>
              <p className="text-sm text-gray-600">Hubungi petugas jika ada kendala</p>
            </div>
          </div>
        </button>
      </div>

      {/* Konfirmasi List */}
      <div className="space-y-4">
        {filteredBansos.map(bansos => {
          const statusInfo = getStatusInfo(bansos.status);
          const StatusIcon = statusInfo.icon;

          return (
            <div key={bansos.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              {/* Header */}
              <div className="p-5 border-b border-gray-100">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    <div className={`w-12 h-12 bg-gradient-to-br ${bansos.warna} rounded-xl flex items-center justify-center`}>
                      <DollarSign className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold text-gray-800 text-lg">
                            {bansos.nama}
                          </h3>
                          <p className="text-gray-600 text-sm">
                            {bansos.deskripsi}
                          </p>
                        </div>
                        <span className="text-lg font-bold text-green-600">
                          {new Intl.NumberFormat('id-ID', {
                            style: 'currency',
                            currency: 'IDR',
                            minimumFractionDigits: 0
                          }).format(bansos.nominal)}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <span className={`px-3 py-1 text-xs font-medium rounded-full border ${statusInfo.color}`}>
                          <StatusIcon className="w-3 h-3 inline mr-1" />
                          {statusInfo.label}
                        </span>
                        <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full">
                          {bansos.jenis}
                        </span>
                        {bansos.status === 'perlu_konfirmasi' && (
                          <span className="px-3 py-1 bg-red-100 text-red-700 text-xs font-medium rounded-full">
                            ⏳ Sampai {bansos.batasKonfirmasi}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
                    <Calendar className="w-5 h-5 text-blue-500" />
                    <div>
                      <p className="text-sm text-gray-600">Tanggal Distribusi</p>
                      <p className="font-medium text-gray-800">{bansos.tanggalDistribusi}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
                    <MapPin className="w-5 h-5 text-green-500" />
                    <div>
                      <p className="text-sm text-gray-600">Lokasi Penyaluran</p>
                      <p className="font-medium text-gray-800">{bansos.lokasiPenyaluran}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
                    <Users className="w-5 h-5 text-purple-500" />
                    <div>
                      <p className="text-sm text-gray-600">Penanggung Jawab</p>
                      <p className="font-medium text-gray-800">{bansos.penanggungJawab}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
                    <CheckCircle className="w-5 h-5 text-orange-500" />
                    <div>
                      <p className="text-sm text-gray-600">Metode Konfirmasi</p>
                      <p className="font-medium text-gray-800">
                        {bansos.metodeKonfirmasi.map(m => m.toUpperCase()).join(', ')}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  {bansos.status === 'perlu_konfirmasi' && (
                    <button 
                      onClick={() => handleKonfirmasi(bansos)}
                      className="flex-1 bg-orange-500 text-white py-3 px-6 rounded-xl font-semibold hover:bg-orange-600 transition-colors flex items-center justify-center space-x-2"
                    >
                      <CheckCircle className="w-5 h-5" />
                      <span>Konfirmasi Sekarang</span>
                    </button>
                  )}
                  
                  {bansos.status === 'terkonfirmasi' && (
                    <button className="flex-1 bg-green-500 text-white py-3 px-6 rounded-xl font-semibold hover:bg-green-600 transition-colors flex items-center justify-center space-x-2">
                      <CheckCircle className="w-5 h-5" />
                      <span>Terkonfirmasi ({bansos.tanggalKonfirmasi})</span>
                    </button>
                  )}

                  {bansos.status === 'kedaluwarsa' && (
                    <button className="flex-1 bg-gray-500 text-white py-3 px-6 rounded-xl font-semibold hover:bg-gray-600 transition-colors flex items-center justify-center space-x-2">
                      <Clock className="w-5 h-5" />
                      <span>Batas Konfirmasi Telah Lewat</span>
                    </button>
                  )}

                  <button className="flex-1 border border-gray-300 text-gray-700 py-3 px-6 rounded-xl font-semibold hover:bg-gray-50 transition-colors">
                    Lihat Detail Bantuan
                  </button>
                  
                  <button className="flex-1 border border-gray-300 text-gray-700 py-3 px-6 rounded-xl font-semibold hover:bg-gray-50 transition-colors">
                    Laporkan Kendala
                  </button>
                </div>

                {/* Catatan */}
                {bansos.catatan && (
                  <div className="mt-4 p-3 bg-blue-50 rounded-xl border border-blue-200">
                    <p className="text-sm text-blue-700">{bansos.catatan}</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredBansos.length === 0 && (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Tidak ada konfirmasi</h3>
          <p className="text-gray-600 mb-4">
            {filters.status === 'terkonfirmasi' 
              ? "Belum ada bantuan yang terkofirmasi"
              : filters.status === 'kedaluwarsa'
              ? "Tidak ada bantuan yang kedaluwarsa"
              : "Semua bantuan telah dikonfirmasi"
            }
          </p>
          <button 
            onClick={() => {
              setSearchQuery('');
              setFilters({ status: 'semua', jenis: 'semua', periode: 'semua' });
            }}
            className="px-6 py-2 bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition-colors"
          >
            Lihat Semua
          </button>
        </div>
      )}

      {/* Konfirmasi Modal */}
      {showModal && selectedBansos && (
        <KonfirmasiModal 
          bansos={selectedBansos}
          onClose={() => setShowModal(false)}
          onConfirm={() => {
            // Handle konfirmasi success
            setShowModal(false);
          }}
        />
      )}
    </div>
  );
}

export default MasyarakatKonfirmasi;