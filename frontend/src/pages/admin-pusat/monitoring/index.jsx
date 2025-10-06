import React, { useState } from 'react';
import { 
  Activity,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Clock,
  DollarSign,
  Users,
  MapPin,
  Calendar,
  Filter,
  Download,
  Eye,
  Search,
  ChevronDown,
  RefreshCw,
  Target,
  Percent,
  BarChart3,
  PieChart as PieChartIcon,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
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
  Legend,
  Area,
  AreaChart
} from 'recharts';

import StatsCard from './StatsCard';
import ProgramCard from './ProgramCard';
import AlertCard from './AlertCard';
import DetailModal from './DetailModal';

const MonitoringPage = () => {
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [timeFilter, setTimeFilter] = useState('bulan_ini');
  const [regionFilter, setRegionFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  // Mock Data
  const stats = [
    {
      title: 'Total Program Aktif',
      value: '42',
      change: '+3',
      trend: 'up',
      icon: Activity,
      color: 'blue',
      description: 'program baru'
    },
    {
      title: 'Total Anggaran',
      value: 'Rp 45.2 M',
      change: '+12%',
      trend: 'up',
      icon: DollarSign,
      color: 'green',
      description: 'dari bulan lalu'
    },
    {
      title: 'Realisasi',
      value: '68%',
      change: '+5%',
      trend: 'up',
      icon: Target,
      color: 'purple',
      description: 'on track'
    },
    {
      title: 'Program At Risk',
      value: '5',
      change: '-2',
      trend: 'down',
      icon: AlertTriangle,
      color: 'yellow',
      description: 'dari minggu lalu'
    }
  ];

  const programs = [
    {
      id: 'PRG-001',
      name: 'Bantuan Pangan Warga Miskin',
      region: 'Kabupaten Sleman',
      budget: 'Rp 850 Juta',
      spent: 'Rp 550 Juta',
      progress: 65,
      status: 'on_track',
      beneficiaries: '1,200',
      deadline: '30 Jun 2025',
      alerts: []
    },
    {
      id: 'PRG-002',
      name: 'Rehabilitasi Sosial Anak',
      region: 'Kota Yogyakarta',
      budget: 'Rp 650 Juta',
      spent: 'Rp 280 Juta',
      progress: 43,
      status: 'at_risk',
      beneficiaries: '80',
      deadline: '15 Jul 2025',
      alerts: ['Realisasi lebih lambat 15% dari rencana']
    },
    {
      id: 'PRG-003',
      name: 'Program Sembako Lansia',
      region: 'Kabupaten Bantul',
      budget: 'Rp 420 Juta',
      spent: 'Rp 180 Juta',
      progress: 28,
      status: 'delayed',
      beneficiaries: '500',
      deadline: '20 Mei 2025',
      alerts: ['Keterlambatan distribusi 3 minggu', 'Dokumen laporan belum lengkap']
    },
    {
      id: 'PRG-004',
      name: 'Pelatihan Keterampilan Kerja',
      region: 'Kabupaten Kulon Progo',
      budget: 'Rp 780 Juta',
      spent: 'Rp 720 Juta',
      progress: 92,
      status: 'on_track',
      beneficiaries: '200',
      deadline: '10 Apr 2025',
      alerts: []
    },
    {
      id: 'PRG-005',
      name: 'Bantuan Modal UMKM',
      region: 'Kabupaten Gunungkidul',
      budget: 'Rp 950 Juta',
      spent: 'Rp 615 Juta',
      progress: 65,
      status: 'on_track',
      beneficiaries: '150',
      deadline: '25 Ags 2025',
      alerts: []
    },
    {
      id: 'PRG-006',
      name: 'Beasiswa Pendidikan Anak',
      region: 'Kota Yogyakarta',
      budget: 'Rp 1.2 M',
      spent: 'Rp 550 Juta',
      progress: 46,
      status: 'at_risk',
      beneficiaries: '300',
      deadline: '30 Sep 2025',
      alerts: ['Verifikasi penerima terlambat']
    }
  ];

  const alerts = [
    {
      id: 1,
      severity: 'high',
      title: 'Keterlambatan Distribusi',
      message: 'Program Sembako Lansia mengalami keterlambatan 3 minggu dari jadwal',
      region: 'Kab. Bantul',
      program: 'PRG-003',
      time: '2 jam lalu'
    },
    {
      id: 2,
      severity: 'medium',
      title: 'Dokumen Belum Lengkap',
      message: 'Laporan progress bulan Februari belum diupload',
      region: 'Kota Yogya',
      program: 'PRG-002',
      time: '5 jam lalu'
    },
    {
      id: 3,
      severity: 'low',
      title: 'Pencairan Tahap 2',
      message: 'Program Pelatihan Keterampilan memenuhi syarat pencairan tahap 2',
      region: 'Kab. Kulon Progo',
      program: 'PRG-004',
      time: '1 hari lalu'
    }
  ];

  const budgetTrendData = [
    { month: 'Jan', planned: 5.2, actual: 4.8 },
    { month: 'Feb', planned: 6.5, actual: 6.2 },
    { month: 'Mar', planned: 7.8, actual: 8.1 },
    { month: 'Apr', planned: 8.5, actual: 8.3 },
    { month: 'Mei', planned: 9.2, actual: 9.0 }
  ];

  const regionDistribution = [
    { name: 'Kab. Sleman', value: 8.5, color: '#3b82f6' },
    { name: 'Kota Yogya', value: 7.2, color: '#10b981' },
    { name: 'Kab. Bantul', value: 6.8, color: '#f59e0b' },
    { name: 'Kab. Kulon Progo', value: 5.4, color: '#8b5cf6' },
    { name: 'Kab. Gunungkidul', value: 4.8, color: '#ec4899' }
  ];

  const filteredPrograms = programs.filter(program => {
    if (regionFilter !== 'all' && !program.region.includes(regionFilter)) return false;
    if (statusFilter !== 'all' && program.status !== statusFilter) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 sm:px-6 py-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Monitoring Program</h1>
            <p className="text-sm text-gray-600 mt-1">Pantau realisasi dan progress program sosial secara real-time</p>
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
            <StatsCard key={index} {...stat} />
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Budget Trend Chart */}
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Trend Realisasi Anggaran</h3>
                <p className="text-sm text-gray-500 mt-1">Rencana vs Aktual (dalam Miliar)</p>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={budgetTrendData}>
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
                  formatter={(value) => `Rp ${value}M`}
                />
                <Legend wrapperStyle={{ fontSize: '12px' }} />
                <Bar dataKey="planned" fill="#3b82f6" name="Rencana" radius={[8, 8, 0, 0]} />
                <Bar dataKey="actual" fill="#10b981" name="Realisasi" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Region Distribution Chart */}
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Distribusi per Daerah</h3>
                <p className="text-sm text-gray-500 mt-1">Total anggaran (dalam Miliar)</p>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={regionDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name.split(' ')[1]} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={90}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {regionDistribution.map((entry, index) => (
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
                  formatter={(value) => `Rp ${value}M`}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Alerts Section */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <AlertTriangle size={20} className="text-yellow-600" />
              Peringatan & Notifikasi
            </h3>
            <button className="text-sm font-medium text-blue-600 hover:text-blue-700">
              Lihat Semua
            </button>
          </div>
          <div className="space-y-3">
            {alerts.map((alert) => (
              <AlertCard key={alert.id} alert={alert} />
            ))}
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
                  placeholder="Cari program..."
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <select
              value={regionFilter}
              onChange={(e) => setRegionFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Semua Daerah</option>
              <option value="Sleman">Kabupaten Sleman</option>
              <option value="Yogyakarta">Kota Yogyakarta</option>
              <option value="Bantul">Kabupaten Bantul</option>
              <option value="Kulon Progo">Kabupaten Kulon Progo</option>
              <option value="Gunungkidul">Kabupaten Gunungkidul</option>
            </select>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Semua Status</option>
              <option value="on_track">On Track</option>
              <option value="at_risk">At Risk</option>
              <option value="delayed">Tertunda</option>
              <option value="completed">Selesai</option>
            </select>
          </div>
        </div>

        {/* Programs Grid */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Daftar Program ({filteredPrograms.length})
            </h3>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-6">
            {filteredPrograms.map((program) => (
              <ProgramCard
                key={program.id}
                program={program}
                onViewDetail={setSelectedProgram}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      {selectedProgram && (
        <DetailModal
          program={selectedProgram}
          onClose={() => setSelectedProgram(null)}
        />
      )}
    </div>
  );
};

export default MonitoringPage;