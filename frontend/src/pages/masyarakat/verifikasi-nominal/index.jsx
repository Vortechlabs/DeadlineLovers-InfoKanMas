import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  DollarSign,
  Calendar,
  MapPin,
  Users,
  Download,
  Share2,
  FileText,
  TrendingUp,
  BarChart3,
  Eye,
  EyeOff
} from 'lucide-react';

function VerifikasiNominal() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    status: 'semua',
    jenis: 'semua',
    periode: 'bulan_ini'
  });
  const [showDetails, setShowDetails] = useState({});
  const [selectedVerification, setSelectedVerification] = useState(null);

  // Data sample verifikasi nominal
  const verifikasiData = [
    {
      id: 1,
      programName: "Bantuan Sembako 1000 KK",
      jenis: "sembako",
      status: "perlu_verifikasi",
      nominalTercatat: 200000,
      nominalDiterima: 200000,
      selisih: 0,
      tanggalDistribusi: "2024-03-20",
      batasVerifikasi: "2024-03-27",
      lokasi: "Posko RW 01 Desa Sukamaju",
      penanggungJawab: "Bapak Surya (Ketua RW 01)",
      deskripsi: "Paket sembako berisi beras, minyak, gula, dan telur",
      buktiPenerimaan: null,
      catatan: "Pastikan nominal sesuai dengan paket yang diterima",
      riwayatVerifikasi: []
    },
    {
      id: 2,
      programName: "Bantuan Tunai PKH",
      jenis: "tunai",
      status: "perlu_verifikasi",
      nominalTercatat: 600000,
      nominalDiterima: 600000,
      selisih: 0,
      tanggalDistribusi: "2024-03-18",
      batasVerifikasi: "2024-03-25",
      lokasi: "Bank Desa Sukamaju",
      penanggungJawab: "Ibu Maya (CS Bank Desa)",
      deskripsi: "Bantuan Program Keluarga Harapan triwulan I",
      buktiPenerimaan: null,
      catatan: "Verifikasi sesuai nominal transfer yang diterima",
      riwayatVerifikasi: []
    },
    {
      id: 3,
      programName: "Bantuan UMKM Desa",
      jenis: "umkm",
      status: "perlu_verifikasi",
      nominalTercatat: 8000000,
      nominalDiterima: 7500000,
      selisih: -500000,
      tanggalDistribusi: "2024-03-22",
      batasVerifikasi: "2024-03-29",
      lokasi: "Kantor Desa Sukamaju",
      penanggungJawab: "Bapak Rudi (Kades)",
      deskripsi: "Modal usaha untuk pengembangan UMKM",
      buktiPenerimaan: null,
      catatan: "Laporkan jika ada selisih nominal",
      riwayatVerifikasi: []
    },
    {
      id: 4,
      programName: "Bantuan Sembako 1000 KK",
      jenis: "sembako",
      status: "terverifikasi",
      nominalTercatat: 200000,
      nominalDiterima: 200000,
      selisih: 0,
      tanggalDistribusi: "2024-02-15",
      batasVerifikasi: "2024-02-22",
      lokasi: "Posko RW 03 Desa Sukamaju",
      penanggungJawab: "Ibu Sari (Ketua PKK)",
      deskripsi: "Paket sembako bulan Februari",
      buktiPenerimaan: "verified_20240215",
      tanggalVerifikasi: "2024-02-15 14:30",
      catatan: "Nominal sesuai dengan paket yang diterima",
      riwayatVerifikasi: [
        {
          tanggal: "2024-02-15 14:30",
          status: "terverifikasi",
          nominal: 200000,
          catatan: "Nominal sesuai"
        }
      ]
    },
    {
      id: 5,
      programName: "Bantuan Lansia Terlantar",
      jenis: "lansia",
      status: "selisih_dilaporkan",
      nominalTercatat: 400000,
      nominalDiterima: 350000,
      selisih: -50000,
      tanggalDistribusi: "2024-01-20",
      batasVerifikasi: "2024-01-27",
      lokasi: "Rumah penerima",
      penanggungJawab: "Bapak Joko (Petugas Sosial)",
      deskripsi: "Bantuan bulanan untuk lansia terlantar",
      buktiPenerimaan: "reported_20240120",
      tanggalVerifikasi: "2024-01-20 10:15",
      catatan: "Terdapat selisih Rp 50.000, sudah dilaporkan",
      riwayatVerifikasi: [
        {
          tanggal: "2024-01-20 10:15",
          status: "selisih_dilaporkan",
          nominal: 350000,
          catatan: "Diterima Rp 350.000, selisih Rp 50.000"
        }
      ]
    },
    {
      id: 6,
      programName: "Bantuan Pendidikan",
      jenis: "pendidikan",
      status: "kedaluwarsa",
      nominalTercatat: 1500000,
      nominalDiterima: null,
      selisih: null,
      tanggalDistribusi: "2024-01-10",
      batasVerifikasi: "2024-01-17",
      lokasi: "Sekolah masing-masing",
      penanggungJawab: "Ibu Dian (Dinas Pendidikan)",
      deskripsi: "Bantuan biaya pendidikan semester genap",
      buktiPenerimaan: null,
      catatan: "Batas verifikasi telah lewat",
      riwayatVerifikasi: []
    }
  ];

  const filteredData = verifikasiData.filter(item => {
    const matchesSearch = item.programName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filters.status === 'semua' || item.status === filters.status;
    const matchesJenis = filters.jenis === 'semua' || item.jenis === filters.jenis;
    
    return matchesSearch && matchesStatus && matchesJenis;
  });

  const getStats = () => {
    const perluVerifikasi = verifikasiData.filter(b => b.status === 'perlu_verifikasi').length;
    const terverifikasi = verifikasiData.filter(b => b.status === 'terverifikasi').length;
    const adaSelisih = verifikasiData.filter(b => b.status === 'selisih_dilaporkan').length;
    const totalNominal = verifikasiData
      .filter(b => b.status === 'perlu_verifikasi')
      .reduce((sum, b) => sum + b.nominalTercatat, 0);

    return { perluVerifikasi, terverifikasi, adaSelisih, totalNominal };
  };

  const stats = getStats();

  const getStatusInfo = (status) => {
    const statusMap = {
      'perlu_verifikasi': {
        label: "Perlu Verifikasi",
        color: "bg-orange-100 text-orange-700 border-orange-200",
        icon: AlertCircle,
        description: "Segera verifikasi nominal"
      },
      'terverifikasi': {
        label: "Terverifikasi",
        color: "bg-green-100 text-green-700 border-green-200",
        icon: CheckCircle,
        description: "Nominal telah diverifikasi"
      },
      'selisih_dilaporkan': {
        label: "Ada Selisih",
        color: "bg-blue-100 text-blue-700 border-blue-200",
        icon: FileText,
        description: "Selisih nominal telah dilaporkan"
      },
      'kedaluwarsa': {
        label: "Kedaluwarsa",
        color: "bg-gray-100 text-gray-700 border-gray-200",
        icon: Clock,
        description: "Batas verifikasi telah lewat"
      }
    };
    return statusMap[status] || statusMap.perlu_verifikasi;
  };

  const formatCurrency = (amount) => {
    if (!amount) return '-';
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const handleVerification = (item, nominalDiterima, catatan) => {
    // Handle verification logic here
    console.log('Verification:', { item, nominalDiterima, catatan });
    setShowDetails(prev => ({ ...prev, [item.id]: false }));
  };

  const handleReportDifference = (item, nominalDiterima, alasan) => {
    // Handle difference report logic here
    console.log('Report difference:', { item, nominalDiterima, alasan });
    setShowDetails(prev => ({ ...prev, [item.id]: false }));
  };

  const toggleDetails = (id) => {
    setShowDetails(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 p-4">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Verifikasi Nominal</h1>
            <p className="text-gray-600">Pastikan nominal bantuan sesuai dengan yang diterima</p>
          </div>
          <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
            <DollarSign className="w-5 h-5 text-white" />
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Perlu Verifikasi</p>
              <p className="text-2xl font-bold text-orange-600">{stats.perluVerifikasi}</p>
            </div>
            <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center">
              <AlertCircle className="w-5 h-5 text-orange-500" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Terverifikasi</p>
              <p className="text-2xl font-bold text-green-600">{stats.terverifikasi}</p>
            </div>
            <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-green-500" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Ada Selisih</p>
              <p className="text-2xl font-bold text-blue-600">{stats.adaSelisih}</p>
            </div>
            <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
              <FileText className="w-5 h-5 text-blue-500" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Menunggu</p>
              <p className="text-2xl font-bold text-purple-600">
                {formatCurrency(stats.totalNominal)}
              </p>
            </div>
            <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-purple-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Alert Banner */}
      {stats.perluVerifikasi > 0 && (
        <div className="bg-gradient-to-r from-orange-500 to-amber-500 rounded-2xl p-4 text-white mb-6">
          <div className="flex items-center space-x-3">
            <AlertCircle className="w-6 h-6" />
            <div className="flex-1">
              <h3 className="font-semibold">Verifikasi Segera!</h3>
              <p className="text-sm opacity-90">
                Anda memiliki {stats.perluVerifikasi} bantuan yang perlu diverifikasi nominalnya. 
                Pastikan nominal sesuai sebelum batas waktu.
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
              placeholder="Cari program bantuan..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-3">
            <VerificationFilter filters={filters} setFilters={setFilters} />
            <button className="p-3 bg-gray-100 text-gray-600 rounded-xl hover:bg-gray-200 transition-colors">
              <Download className="w-5 h-5" />
            </button>
            <button className="p-3 bg-gray-100 text-gray-600 rounded-xl hover:bg-gray-200 transition-colors">
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Verification List */}
      <div className="space-y-4">
        {filteredData.map((item) => {
          const statusInfo = getStatusInfo(item.status);
          const StatusIcon = statusInfo.icon;

          return (
            <div key={item.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              {/* Header */}
              <div className="p-5 border-b border-gray-100">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                      <DollarSign className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold text-gray-800 text-lg">
                            {item.programName}
                          </h3>
                          <p className="text-gray-600 text-sm">
                            {item.deskripsi}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-green-600">
                            {formatCurrency(item.nominalTercatat)}
                          </p>
                          {item.selisih !== null && item.selisih !== 0 && (
                            <p className={`text-sm font-semibold ${
                              item.selisih > 0 ? 'text-red-600' : 'text-blue-600'
                            }`}>
                              {item.selisih > 0 ? '+' : ''}{formatCurrency(item.selisih)}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <span className={`px-3 py-1 text-xs font-medium rounded-full border ${statusInfo.color}`}>
                          <StatusIcon className="w-3 h-3 inline mr-1" />
                          {statusInfo.label}
                        </span>
                        <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full">
                          {item.jenis}
                        </span>
                        {item.status === 'perlu_verifikasi' && (
                          <span className="px-3 py-1 bg-red-100 text-red-700 text-xs font-medium rounded-full">
                            ⏳ Sampai {item.batasVerifikasi}
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
                      <p className="font-medium text-gray-800">{item.tanggalDistribusi}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
                    <MapPin className="w-5 h-5 text-green-500" />
                    <div>
                      <p className="text-sm text-gray-600">Lokasi Penyaluran</p>
                      <p className="font-medium text-gray-800">{item.lokasi}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
                    <Users className="w-5 h-5 text-purple-500" />
                    <div>
                      <p className="text-sm text-gray-600">Penanggung Jawab</p>
                      <p className="font-medium text-gray-800">{item.penanggungJawab}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
                    <DollarSign className="w-5 h-5 text-orange-500" />
                    <div>
                      <p className="text-sm text-gray-600">Nominal Diterima</p>
                      <p className="font-medium text-gray-800">
                        {item.nominalDiterima ? formatCurrency(item.nominalDiterima) : 'Belum diverifikasi'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  {item.status === 'perlu_verifikasi' && (
                    <>
                      <button 
                        onClick={() => toggleDetails(item.id)}
                        className="flex-1 bg-green-500 text-white py-3 px-6 rounded-xl font-semibold hover:bg-green-600 transition-colors flex items-center justify-center space-x-2"
                      >
                        <CheckCircle className="w-5 h-5" />
                        <span>Verifikasi Nominal</span>
                      </button>
                      <button className="flex-1 border border-gray-300 text-gray-700 py-3 px-6 rounded-xl font-semibold hover:bg-gray-50 transition-colors">
                        Lihat Detail Program
                      </button>
                    </>
                  )}
                  
                  {item.status === 'terverifikasi' && (
                    <button className="flex-1 bg-green-500 text-white py-3 px-6 rounded-xl font-semibold hover:bg-green-600 transition-colors flex items-center justify-center space-x-2">
                      <CheckCircle className="w-5 h-5" />
                      <span>Terverifikasi ({item.tanggalVerifikasi})</span>
                    </button>
                  )}

                  {item.status === 'selisih_dilaporkan' && (
                    <button className="flex-1 bg-blue-500 text-white py-3 px-6 rounded-xl font-semibold hover:bg-blue-600 transition-colors flex items-center justify-center space-x-2">
                      <FileText className="w-5 h-5" />
                      <span>Selisih Telah Dilaporkan</span>
                    </button>
                  )}

                  {item.status === 'kedaluwarsa' && (
                    <button className="flex-1 bg-gray-500 text-white py-3 px-6 rounded-xl font-semibold hover:bg-gray-600 transition-colors flex items-center justify-center space-x-2">
                      <Clock className="w-5 h-5" />
                      <span>Batas Verifikasi Telah Lewat</span>
                    </button>
                  )}

                  <button className="flex-1 border border-gray-300 text-gray-700 py-3 px-6 rounded-xl font-semibold hover:bg-gray-50 transition-colors">
                    Laporkan Kendala
                  </button>
                </div>

                {/* Verification Form */}
                {showDetails[item.id] && item.status === 'perlu_verifikasi' && (
                  <VerificationForm 
                    item={item}
                    onVerify={handleVerification}
                    onReportDifference={handleReportDifference}
                    onCancel={() => toggleDetails(item.id)}
                  />
                )}

                {/* Catatan */}
                {item.catatan && (
                  <div className="mt-4 p-3 bg-blue-50 rounded-xl border border-blue-200">
                    <p className="text-sm text-blue-700">{item.catatan}</p>
                  </div>
                )}

                {/* Riwayat Verifikasi */}
                {item.riwayatVerifikasi && item.riwayatVerifikasi.length > 0 && (
                  <div className="mt-4">
                    <h4 className="font-semibold text-gray-800 mb-2">Riwayat Verifikasi</h4>
                    <div className="space-y-2">
                      {item.riwayatVerifikasi.map((riwayat, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                          <div>
                            <p className="text-sm font-medium text-gray-800">
                              {formatCurrency(riwayat.nominal)} - {riwayat.catatan}
                            </p>
                            <p className="text-xs text-gray-600">{riwayat.tanggal}</p>
                          </div>
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            riwayat.status === 'terverifikasi' 
                              ? 'bg-green-100 text-green-700'
                              : 'bg-blue-100 text-blue-700'
                          }`}>
                            {riwayat.status === 'terverifikasi' ? 'Sesuai' : 'Dilaporkan'}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredData.length === 0 && (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <DollarSign className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Tidak ada verifikasi</h3>
          <p className="text-gray-600 mb-4">
            {filters.status === 'terverifikasi' 
              ? "Belum ada bantuan yang terverifikasi"
              : filters.status === 'selisih_dilaporkan'
              ? "Tidak ada laporan selisih"
              : "Semua bantuan telah diverifikasi"
            }
          </p>
          <button 
            onClick={() => {
              setSearchQuery('');
              setFilters({ status: 'semua', jenis: 'semua', periode: 'bulan_ini' });
            }}
            className="px-6 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors"
          >
            Lihat Semua
          </button>
        </div>
      )}
    </div>
  );
}

// Verification Form Component
const VerificationForm = ({ item, onVerify, onReportDifference, onCancel }) => {
  const [nominalDiterima, setNominalDiterima] = useState(item.nominalTercatat);
  const [catatan, setCatatan] = useState('');
  const [mode, setMode] = useState('verify'); // 'verify' or 'report'

  const handleSubmit = (e) => {
    e.preventDefault();
    if (mode === 'verify') {
      onVerify(item, parseInt(nominalDiterima), catatan);
    } else {
      onReportDifference(item, parseInt(nominalDiterima), catatan);
    }
  };

  const selisih = nominalDiterima - item.nominalTercatat;

  return (
    <div className="mt-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
      <h4 className="font-semibold text-gray-800 mb-3">Form Verifikasi Nominal</h4>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Nominal Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-3 rounded-lg border border-gray-200">
            <p className="text-sm text-gray-600">Nominal Tercatat</p>
            <p className="text-lg font-bold text-gray-800">
              {new Intl.NumberFormat('id-ID', {
                style: 'currency',
                currency: 'IDR',
                minimumFractionDigits: 0
              }).format(item.nominalTercatat)}
            </p>
          </div>
          <div className="bg-white p-3 rounded-lg border border-gray-200">
            <p className="text-sm text-gray-600">Selisih</p>
            <p className={`text-lg font-bold ${
              selisih === 0 ? 'text-green-600' : selisih > 0 ? 'text-red-600' : 'text-blue-600'
            }`}>
              {selisih > 0 ? '+' : ''}{new Intl.NumberFormat('id-ID', {
                style: 'currency',
                currency: 'IDR',
                minimumFractionDigits: 0
              }).format(selisih)}
            </p>
          </div>
        </div>

        {/* Nominal Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nominal yang Diterima
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">Rp</span>
            <input
              type="number"
              value={nominalDiterima}
              onChange={(e) => setNominalDiterima(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Masukkan nominal yang diterima"
            />
          </div>
        </div>

        {/* Catatan */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Catatan {mode === 'report' && '(Alasan Selisih)'}
          </label>
          <textarea
            value={catatan}
            onChange={(e) => setCatatan(e.target.value)}
            rows="3"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
            placeholder={mode === 'verify' ? 'Tambahkan catatan (opsional)' : 'Jelaskan alasan selisih nominal...'}
          />
        </div>

        {/* Mode Toggle */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              type="button"
              onClick={() => setMode('verify')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                mode === 'verify'
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Sesuai
            </button>
            <button
              type="button"
              onClick={() => setMode('report')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                mode === 'report'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Ada Selisih
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 border border-gray-300 text-gray-700 py-3 px-6 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
          >
            Batal
          </button>
          <button
            type="submit"
            className={`flex-1 py-3 px-6 rounded-xl font-semibold text-white transition-colors ${
              mode === 'verify' 
                ? 'bg-green-500 hover:bg-green-600' 
                : 'bg-blue-500 hover:bg-blue-600'
            }`}
          >
            {mode === 'verify' ? 'Verifikasi Sesuai' : 'Laporkan Selisih'}
          </button>
        </div>
      </form>
    </div>
  );
};

// Verification Filter Component
const VerificationFilter = ({ filters, setFilters }) => {
  const [showFilter, setShowFilter] = useState(false);

  const statusOptions = [
    { value: 'semua', label: 'Semua Status' },
    { value: 'perlu_verifikasi', label: 'Perlu Verifikasi' },
    { value: 'terverifikasi', label: 'Terverifikasi' },
    { value: 'selisih_dilaporkan', label: 'Ada Selisih' },
    { value: 'kedaluwarsa', label: 'Kedaluwarsa' }
  ];

  const jenisOptions = [
    { value: 'semua', label: 'Semua Jenis' },
    { value: 'sembako', label: 'Sembako' },
    { value: 'tunai', label: 'Tunai' },
    { value: 'pendidikan', label: 'Pendidikan' },
    { value: 'lansia', label: 'Lansia' },
    { value: 'umkm', label: 'UMKM' }
  ];

  const periodeOptions = [
    { value: 'bulan_ini', label: 'Bulan Ini' },
    { value: 'triwulan_ini', label: 'Triwulan Ini' },
    { value: 'tahun_ini', label: 'Tahun Ini' },
    { value: 'semua', label: 'Semua Periode' }
  ];

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowFilter(!showFilter)}
        className={`p-3 rounded-xl transition-colors flex items-center space-x-2 ${
          filters.status !== 'semua' || filters.jenis !== 'semua'
            ? 'bg-green-500 text-white' 
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
        }`}
      >
        <Filter className="w-5 h-5" />
        <span>Filter</span>
      </button>

      {showFilter && (
        <div className="absolute right-0 top-full mt-2 z-50 bg-white rounded-2xl shadow-lg border border-gray-200 p-4 w-64">
          <div className="space-y-4">
            {/* Status */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status Verifikasi
              </label>
              <select
                value={filters.status}
                onChange={(e) => handleFilterChange('status', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                {statusOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Jenis Bansos */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Jenis Bantuan
              </label>
              <select
                value={filters.jenis}
                onChange={(e) => handleFilterChange('jenis', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                {jenisOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Periode */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Periode
              </label>
              <select
                value={filters.periode}
                onChange={(e) => handleFilterChange('periode', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                {periodeOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VerifikasiNominal;