import React, { useState } from 'react';
import { 
  FileText,
  AlertTriangle,
  CheckCircle,
  Clock,
  Download,
  Eye,
  Search,
  Filter,
  RefreshCw,
  BarChart3,
  TrendingUp,
  TrendingDown,
  Users,
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

import StatsCardLaporan from './StatsCardLaporan';
import LaporanCard from './LaporanCard';
import DetailLaporanModal from './DetailLaporanModal';

const LaporanPage = () => {
  const [selectedLaporan, setSelectedLaporan] = useState(null);
  const [timeFilter, setTimeFilter] = useState('bulan_ini');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock Data Stats
  const stats = [
    {
      title: 'Total Laporan',
      value: '156',
      change: '+12',
      trend: 'up',
      icon: FileText,
      color: 'blue',
      description: 'dari bulan lalu'
    },
    {
      title: 'Laporan Disetujui',
      value: '128',
      change: '+8%',
      trend: 'up',
      icon: CheckCircle,
      color: 'green',
      description: 'rate approval'
    },
    {
      title: 'Laporan Pending',
      value: '18',
      change: '-3',
      trend: 'down',
      icon: Clock,
      color: 'yellow',
      description: 'perlu review'
    },
    {
      title: 'Anomali Terdeteksi',
      value: '23',
      change: '+5',
      trend: 'up',
      icon: AlertTriangle,
      color: 'red',
      description: 'by AI system'
    }
  ];

  // Mock Data Laporan
  const laporanData = [
    {
      id: 'LAP-001',
      judul: 'Laporan Realisasi Bantuan Pangan Q1 2025',
      region: 'Kabupaten Sleman',
      deskripsi: 'Laporan realisasi penyaluran bantuan pangan untuk 1.200 keluarga miskin periode Januari-Maret 2025',
      jenis: 'Realisasi Anggaran',
      status: 'completed',
      prioritas: 'tinggi',
      tanggal: '15 Apr 2025',
      pelapor: 'Admin Sleman',
      anomali: [
        'Pencairan dana 30% lebih cepat dari rencana',
        'Varian harga beras 15% di atas rata-rata'
      ],
      dokumen: [
        { nama: 'Laporan Realisasi Q1.pdf', tipe: 'PDF', ukuran: '2.4 MB' },
        { nama: 'Daftar Penerima.xlsx', tipe: 'Excel', ukuran: '0.8 MB' }
      ]
    },
    {
      id: 'LAP-002',
      judul: 'Pengaduan Penyaluran Sembako Tidak Merata',
      region: 'Kota Yogyakarta',
      deskripsi: 'Laporan dari masyarakat mengenai ketidakmerataan penyaluran bantuan sembako di kecamatan Gondokusuman',
      jenis: 'Pengaduan Masyarakat',
      status: 'pending',
      prioritas: 'tinggi',
      tanggal: '12 Apr 2025',
      pelapor: 'Masyarakat',
      anomali: [
        'Pola distribusi tidak sesuai jadwal',
        'Terdapat duplikasi nama penerima'
      ],
      dokumen: [
        { nama: 'Bukti Foto Kegiatan.zip', tipe: 'ZIP', ukuran: '5.2 MB' },
        { nama: 'Daftar Pengaduan.pdf', tipe: 'PDF', ukuran: '1.1 MB' }
      ]
    },
    {
      id: 'LAP-003',
      judul: 'Laporan Progress Pembangunan Rusunawa',
      region: 'Kabupaten Bantul',
      deskripsi: 'Progress pembangunan rumah susun sederhana sewa untuk keluarga berpenghasilan rendah',
      jenis: 'Progress Fisik',
      status: 'in_review',
      prioritas: 'sedang',
      tanggal: '10 Apr 2025',
      pelapor: 'Admin Bantul',
      anomali: ['Progress fisik 20% lebih lambat dari rencana'],
      dokumen: [
        { nama: 'Progress Report.pdf', tipe: 'PDF', ukuran: '3.1 MB' },
        { nama: 'Foto Progress.jpg', tipe: 'JPG', ukuran: '8.5 MB' }
      ]
    },
    {
      id: 'LAP-004',
      judul: 'Laporan Audit Internal Program Beasiswa',
      region: 'Kabupaten Kulon Progo',
      deskripsi: 'Hasil audit internal program beasiswa pendidikan untuk anak kurang mampu',
      jenis: 'Audit Internal',
      status: 'completed',
      prioritas: 'rendah',
      tanggal: '8 Apr 2025',
      pelapor: 'Auditor Internal',
      anomali: [],
      dokumen: [
        { nama: 'Laporan Audit.pdf', tipe: 'PDF', ukuran: '4.2 MB' }
      ]
    },
    {
      id: 'LAP-005',
      judul: 'Permohonan Tambahan Anggaran Darurat',
      region: 'Kabupaten Gunungkidul',
      deskripsi: 'Permohonan tambahan anggaran darurat untuk penanganan bencana kekeringan',
      jenis: 'Permohonan Anggaran',
      status: 'pending',
      prioritas: 'tinggi',
      tanggal: '5 Apr 2025',
      pelapor: 'Admin Gunungkidul',
      anomali: [
        'Pengajuan diluar periode anggaran normal',
        'Nominal 3x dari rata-rata permohonan serupa'
      ],
      dokumen: [
        { nama: 'Proposal Darurat.pdf', tipe: 'PDF', ukuran: '2.8 MB' },
        { nama: 'Dokumen Pendukung.zip', tipe: 'ZIP', ukuran: '12.3 MB' }
      ]
    },
    {
      id: 'LAP-006',
      judul: 'Laporan Evaluasi Program Pelatihan UMKM',
      region: 'Kota Yogyakarta',
      deskripsi: 'Evaluasi hasil program pelatihan keterampilan untuk pengusaha mikro dan kecil',
      jenis: 'Evaluasi Program',
      status: 'rejected',
      prioritas: 'sedang',
      tanggal: '3 Apr 2025',
      pelapor: 'Admin Kota Yogya',
      anomali: ['Tingkat partisipasi 40% di bawah target'],
      dokumen: [
        { nama: 'Laporan Evaluasi.pdf', tipe: 'PDF', ukuran: '1.9 MB' }
      ]
    }
  ];

  // Chart Data
  const statusDistribution = [
    { name: 'Selesai', value: 128, color: '#10b981' },
    { name: 'Pending', value: 18, color: '#f59e0b' },
    { name: 'Dalam Review', value: 7, color: '#3b82f6' },
    { name: 'Ditolak', value: 3, color: '#ef4444' }
  ];

  const monthlyTrend = [
    { month: 'Jan', laporan: 42, disetujui: 38 },
    { month: 'Feb', laporan: 38, disetujui: 35 },
    { month: 'Mar', laporan: 45, disetujui: 40 },
    { month: 'Apr', laporan: 31, disetujui: 25 }
  ];

  // Filter laporan
  const filteredLaporan = laporanData.filter(laporan => {
    if (statusFilter !== 'all' && laporan.status !== statusFilter) return false;
    if (priorityFilter !== 'all' && laporan.prioritas !== priorityFilter) return false;
    if (searchQuery && !laporan.judul.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !laporan.region.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  // Handlers
  const handleViewDetail = (laporan) => {
    setSelectedLaporan(laporan);
  };

  const handleAction = (action, data) => {
    console.log(`${action} action for:`, data);
    // Implement action logic here
    if (action === 'download') {
      alert(`Download laporan: ${data.judul}`);
    }
  };

  const handleCloseModal = () => {
    setSelectedLaporan(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 sm:px-6 py-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Manajemen Laporan</h1>
            <p className="text-sm text-gray-600 mt-1">Kelola dan pantau semua laporan program sosial</p>
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
              Export All
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 sm:p-6 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <StatsCardLaporan key={index} {...stat} />
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Monthly Trend Chart */}
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Trend Laporan Bulanan</h3>
                <p className="text-sm text-gray-500 mt-1">Perbandingan jumlah laporan vs disetujui</p>
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
                <Bar dataKey="disetujui" fill="#10b981" name="Disetujui" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Status Distribution Chart */}
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Distribusi Status</h3>
                <p className="text-sm text-gray-500 mt-1">Persebaran laporan berdasarkan status</p>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={statusDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={90}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {statusDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
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
              <option value="completed">Selesai</option>
              <option value="pending">Menunggu</option>
              <option value="in_review">Dalam Review</option>
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
              Daftar Laporan ({filteredLaporan.length})
            </h3>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                Selesai
              </span>
              <span className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                Menunggu
              </span>
              <span className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                Review
              </span>
              <span className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                Ditolak
              </span>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-6">
            {filteredLaporan.map((laporan) => (
              <LaporanCard
                key={laporan.id}
                laporan={laporan}
                onViewDetail={handleViewDetail}
                onDownload={handleAction}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      {selectedLaporan && (
        <DetailLaporanModal
          laporan={selectedLaporan}
          onClose={handleCloseModal}
          onAction={handleAction}
        />
      )}
    </div>
  );
};

export default LaporanPage;