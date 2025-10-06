import React, { useState } from 'react';
import { 
  Search,
  Filter,
  Download,
  RefreshCw,
  MessageCircle,
  AlertTriangle,
  CheckCircle,
  Clock,
  User,
  MapPin
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from 'recharts';

import StatsMasyarakat from './StatsMasyarakat';
import LaporanMasyarakatCard from './LaporanMasyarakatCard';
import DetailLaporanMasyarakatModal from './DetailLaporanMasyarakatModal';

const LaporanMasyarakatPage = () => {
  const [selectedLaporan, setSelectedLaporan] = useState(null);
  const [timeFilter, setTimeFilter] = useState('bulan_ini');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock Data Stats
  const stats = [
    {
      title: 'Total Laporan',
      value: '342',
      change: '+28',
      trend: 'up',
      icon: MessageCircle,
      color: 'blue',
      description: 'dari bulan lalu'
    },
    {
      title: 'Belum Ditanggapi',
      value: '45',
      change: '-12',
      trend: 'down',
      icon: Clock,
      color: 'yellow',
      description: 'perlu perhatian'
    },
    {
      title: 'Telah Diselesaikan',
      value: '267',
      change: '+15%',
      trend: 'up',
      icon: CheckCircle,
      color: 'green',
      description: 'resolution rate'
    },
    {
      title: 'Prioritas Tinggi',
      value: '23',
      change: '+8',
      trend: 'up',
      icon: AlertTriangle,
      color: 'red',
      description: 'perlu investigasi'
    }
  ];

  // Mock Data Laporan Masyarakat
  const laporanData = [
    {
      id: 'LAP-M-001',
      judul: 'Penyaluran Bansos Tidak Merata di RW 05',
      lokasi: 'Kelurahan Condong Catur, Sleman',
      deskripsi: 'Bantuan sosial sembako tidak merata di RW 05. Beberapa keluarga yang seharusnya menerima justru tidak mendapat bantuan, sementara ada keluarga yang mampu malah menerima. Mohon ditindaklanjuti dan dilakukan verifikasi ulang.',
      kategori: 'Penyaluran Bansos',
      status: 'pending',
      prioritas: 'tinggi',
      tanggal: '15 Apr 2025',
      pelapor: 'Budi Santoso',
      kredibilitas: 85,
      komentar: 3,
      aiAnalysis: 'Pola keluhan serupa terdeteksi di wilayah yang sama. Disarankan verifikasi lapangan.',
      aiScore: 78,
      bukti: [
        { nama: 'foto_bansos.jpg', tipe: 'image/jpeg', ukuran: '2.1 MB' },
        { nama: 'daftar_penerima.pdf', tipe: 'application/pdf', ukuran: '1.5 MB' }
      ],
      tanggapan: []
    },
    {
      id: 'LAP-M-002',
      judul: 'Program Beasiswa Tidak Transparan',
      lokasi: 'Kota Yogyakarta',
      deskripsi: 'Seleksi penerima beasiswa pendidikan tidak transparan. Tidak ada pengumuman resmi tentang kriteria dan proses seleksi. Banyak siswa berprestasi dari keluarga kurang mampu tidak menerima bantuan.',
      kategori: 'Beasiswa Pendidikan',
      status: 'in_review',
      prioritas: 'tinggi',
      tanggal: '14 Apr 2025',
      pelapor: 'Siti Rahayu',
      kredibilitas: 92,
      komentar: 5,
      aiAnalysis: 'Laporan memiliki bukti yang kuat. Rekomendasi: audit proses seleksi.',
      aiScore: 85,
      bukti: [
        { nama: 'dokumen_beasiswa.pdf', tipe: 'application/pdf', ukuran: '3.2 MB' }
      ],
      tanggapan: [
        {
          admin: 'Admin Pusat',
          tanggal: '14 Apr 2025',
          pesan: 'Laporan sedang dalam proses investigasi. Tim audit telah ditugaskan untuk memeriksa proses seleksi beasiswa.',
          status: 'in_review'
        }
      ]
    },
    {
      id: 'LAP-M-003',
      judul: 'Fasilitas Kesehatan Rusunawa Tidak Layak',
      lokasi: 'Kabupaten Bantul',
      deskripsi: 'Fasilitas kesehatan di rusunawa sangat memprihatinkan. Tidak ada air bersih, listrik sering padam, dan peralatan medis dasar tidak tersedia. Kondisi ini membahayakan kesehatan penghuni.',
      kategori: 'Fasilitas Umum',
      status: 'resolved',
      prioritas: 'sedang',
      tanggal: '12 Apr 2025',
      pelapor: 'Ahmad Fauzi',
      kredibilitas: 88,
      komentar: 8,
      aiAnalysis: 'Laporan konsisten dengan data monitoring. Prioritas: sedang.',
      bukti: [
        { nama: 'video_kondisi.mp4', tipe: 'video/mp4', ukuran: '15.8 MB' },
        { nama: 'foto_fasilitas.zip', tipe: 'application/zip', ukuran: '8.3 MB' }
      ],
      tanggapan: [
        {
          admin: 'Admin Daerah Bantul',
          tanggal: '13 Apr 2025',
          pesan: 'Tim teknis telah melakukan survey lokasi. Perbaikan akan dimulai minggu depan.',
          status: 'in_review'
        },
        {
          admin: 'Admin Pusat',
          tanggal: '14 Apr 2025',
          pesan: 'Dana perbaikan telah dicairkan. Progress perbaikan dapat dipantau melalui sistem monitoring.',
          status: 'resolved'
        }
      ]
    },
    {
      id: 'LAP-M-004',
      judul: 'Dana Bantuan UMKM Tidak Tepat Sasaran',
      lokasi: 'Kabupaten Kulon Progo',
      deskripsi: 'Bantuan modal UMKM diberikan kepada pelaku usaha yang sudah mapan, sementara usaha mikro yang benar-benar membutuhkan justru tidak mendapat bantuan. Proses seleksi tidak jelas.',
      kategori: 'Bantuan UMKM',
      status: 'pending',
      prioritas: 'sedang',
      tanggal: '10 Apr 2025',
      pelapor: 'Dewi Anggraini',
      kredibilitas: 76,
      komentar: 2,
      aiAnalysis: 'Pola ketidaksesuaian terdeteksi. Disarankan review ulang data penerima.',
      aiScore: 72,
      bukti: [
        { nama: 'data_umkm.xlsx', tipe: 'application/vnd.ms-excel', ukuran: '0.9 MB' }
      ],
      tanggapan: []
    },
    {
      id: 'LAP-M-005',
      judul: 'Kegiatan Pelatihan Tidak Efektif',
      lokasi: 'Kabupaten Gunungkidul',
      deskripsi: 'Pelatihan keterampilan yang diadakan tidak efektif. Materi tidak sesuai kebutuhan, instruktur tidak kompeten, dan tidak ada tindak lanjut pasca pelatihan.',
      kategori: 'Pelatihan',
      status: 'rejected',
      prioritas: 'rendah',
      tanggal: '8 Apr 2025',
      pelapor: 'Rudi Hermawan',
      kredibilitas: 45,
      komentar: 1,
      aiAnalysis: 'Laporan kurang bukti pendukung. Kredibilitas rendah.',
      aiScore: 35,
      bukti: [],
      tanggapan: [
        {
          admin: 'Admin Pusat',
          tanggal: '9 Apr 2025',
          pesan: 'Laporan ditolak karena kurangnya bukti yang mendukung. Silakan melampirkan bukti yang lebih konkret jika ingin mengajukan kembali.',
          status: 'rejected'
        }
      ]
    },
    {
      id: 'LAP-M-006',
      judul: 'Pengelolaan Dana Desa Tidak Transparan',
      lokasi: 'Kota Yogyakarta',
      deskripsi: 'Pengelolaan dana desa tidak transparan. Laporan keuangan tidak dipublikasikan, masyarakat tidak tahu alokasi dan penggunaan dana. Ada indikasi penyimpangan.',
      kategori: 'Transparansi Keuangan',
      status: 'in_review',
      prioritas: 'tinggi',
      tanggal: '5 Apr 2025',
      pelapor: 'Lembaga Swadaya Masyarakat',
      kredibilitas: 91,
      komentar: 12,
      aiAnalysis: 'Laporan dari lembaga terpercaya. Prioritas tinggi untuk investigasi.',
      aiScore: 88,
      bukti: [
        { nama: 'laporan_audit.pdf', tipe: 'application/pdf', ukuran: '4.5 MB' },
        { nama: 'bukti_penyimpangan.pdf', tipe: 'application/pdf', ukuran: '2.8 MB' }
      ],
      tanggapan: [
        {
          admin: 'Admin Pusat',
          tanggal: '6 Apr 2025',
          pesan: 'Laporan sedang ditinjau oleh tim investigasi. Akan dilakukan audit mendalam.',
          status: 'in_review'
        }
      ]
    }
  ];

  // Chart Data
  const kategoriData = [
    { name: 'Bansos', value: 125 },
    { name: 'Beasiswa', value: 78 },
    { name: 'Kesehatan', value: 56 },
    { name: 'UMKM', value: 45 },
    { name: 'Lainnya', value: 38 }
  ];

  const statusData = [
    { name: 'Selesai', value: 267 },
    { name: 'Dalam Review', value: 30 },
    { name: 'Menunggu', value: 45 }
  ];

  const monthlyTrend = [
    { month: 'Jan', laporan: 85, diselesaikan: 65 },
    { month: 'Feb', laporan: 92, diselesaikan: 70 },
    { month: 'Mar', laporan: 105, diselesaikan: 82 },
    { month: 'Apr', laporan: 60, diselesaikan: 50 }
  ];

  // Filter laporan
  const filteredLaporan = laporanData.filter(laporan => {
    if (statusFilter !== 'all' && laporan.status !== statusFilter) return false;
    if (priorityFilter !== 'all' && laporan.prioritas !== priorityFilter) return false;
    if (searchQuery && !laporan.judul.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !laporan.lokasi.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !laporan.kategori.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const handleViewDetail = (laporan) => {
    setSelectedLaporan(laporan);
  };

  const handleResponse = async (responseData) => {
    console.log('Response submitted:', responseData);
    // Implement response logic here
    alert(`Tanggapan berhasil dikirim untuk laporan ${responseData.laporanId}`);
  };

  const handleCloseModal = () => {
    setSelectedLaporan(null);
  };

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 sm:px-6 py-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Laporan Masyarakat</h1>
            <p className="text-sm text-gray-600 mt-1">Kelola dan tanggapi laporan dari masyarakat</p>
          </div>
          <div className="flex items-center gap-3">
            <select 
              value={timeFilter}
              onChange={(e) => setTimeFilter(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="hari_ini">Hari Ini</option>
              <option value="minggu_ini">Minggu Ini</option>
              <option value="bulan_ini">Bulan Ini</option>
              <option value="tahun_ini">Tahun Ini</option>
            </select>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center gap-2">
              <RefreshCw size={16} />
              Refresh
            </button>
            <button className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors flex items-center gap-2">
              <Download size={16} />
              Export
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 sm:p-6 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <StatsMasyarakat key={index} {...stat} />
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Monthly Trend */}
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Trend Laporan Bulanan</h3>
                <p className="text-sm text-gray-500 mt-1">Perbandingan jumlah laporan vs diselesaikan</p>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={monthlyTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" stroke="#9ca3af" style={{ fontSize: '12px' }} />
                <YAxis stroke="#9ca3af" style={{ fontSize: '12px' }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '12px'
                  }}
                />
                <Legend wrapperStyle={{ fontSize: '12px' }} />
                <Bar dataKey="laporan" fill="#3b82f6" name="Total Laporan" radius={[8, 8, 0, 0]} />
                <Bar dataKey="diselesaikan" fill="#10b981" name="Diselesaikan" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Kategori Distribution */}
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Distribusi per Kategori</h3>
                <p className="text-sm text-gray-500 mt-1">Jenis laporan yang paling banyak diterima</p>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={kategoriData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={90}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {kategoriData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '12px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Cari laporan..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Semua Status</option>
              <option value="pending">Menunggu</option>
              <option value="in_review">Dalam Review</option>
              <option value="resolved">Selesai</option>
              <option value="rejected">Ditolak</option>
            </select>
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Semua Prioritas</option>
              <option value="tinggi">Tinggi</option>
              <option value="sedang">Sedang</option>
              <option value="rendah">Rendah</option>
            </select>
          </div>
        </div>

        {/* Laporan Grid */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Daftar Laporan Masyarakat ({filteredLaporan.length})
            </h3>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                Menunggu
              </span>
              <span className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                Review
              </span>
              <span className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                Selesai
              </span>
              <span className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                Ditolak
              </span>
            </div>
          </div>

          {filteredLaporan.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredLaporan.map((laporan) => (
                <LaporanMasyarakatCard
                  key={laporan.id}
                  laporan={laporan}
                  onViewDetail={handleViewDetail}
                  onAction={handleResponse}
                />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl p-8 text-center border border-gray-200">
              <MessageCircle size={48} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Tidak ada laporan</h3>
              <p className="text-gray-600">
                Tidak ditemukan laporan yang sesuai dengan filter yang dipilih.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Detail Modal */}
      {selectedLaporan && (
        <DetailLaporanMasyarakatModal
          laporan={selectedLaporan}
          onClose={handleCloseModal}
          onResponse={handleResponse}
        />
      )}
    </div>
  );
};

export default LaporanMasyarakatPage;