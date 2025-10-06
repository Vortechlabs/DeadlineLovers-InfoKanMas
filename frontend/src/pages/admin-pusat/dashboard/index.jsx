import React, { useState } from 'react';
import { 
  TrendingUp, 
  TrendingDown,
  FileText, 
  CheckCircle, 
  Clock,
  XCircle,
  DollarSign,
  Users,
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight,
  ChevronRight,
  Calendar,
  MapPin
} from 'lucide-react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const AdminPusatDashboard = () => {
  const [timeFilter, setTimeFilter] = useState('bulan_ini');

  // Data statistik
  const stats = [
    {
      title: 'Total Pengajuan RAB',
      value: '156',
      change: '+12%',
      trend: 'up',
      icon: FileText,
      color: 'blue',
      description: 'dari bulan lalu'
    },
    {
      title: 'RAB Disetujui',
      value: '128',
      change: '+8%',
      trend: 'up',
      icon: CheckCircle,
      color: 'green',
      description: 'dari bulan lalu'
    },
    {
      title: 'Menunggu Review',
      value: '23',
      change: '-5%',
      trend: 'down',
      icon: Clock,
      color: 'yellow',
      description: 'dari bulan lalu'
    },
    {
      title: 'RAB Ditolak',
      value: '5',
      change: '-15%',
      trend: 'down',
      icon: XCircle,
      color: 'red',
      description: 'dari bulan lalu'
    }
  ];

  // Data anggaran
  const budgetStats = [
    {
      title: 'Total Anggaran',
      value: 'Rp 45,2 M',
      icon: DollarSign,
      color: 'blue'
    },
    {
      title: 'Dana Tersalurkan',
      value: 'Rp 38,7 M',
      percentage: '85.6%',
      icon: TrendingUp,
      color: 'green'
    },
    {
      title: 'Sisa Anggaran',
      value: 'Rp 6,5 M',
      percentage: '14.4%',
      icon: DollarSign,
      color: 'yellow'
    }
  ];

  // Data grafik trend pengajuan
  const trendData = [
    { bulan: 'Jan', pengajuan: 45, disetujui: 38, ditolak: 7 },
    { bulan: 'Feb', pengajuan: 52, disetujui: 45, ditolak: 7 },
    { bulan: 'Mar', pengajuan: 48, disetujui: 42, ditolak: 6 },
    { bulan: 'Apr', pengajuan: 61, disetujui: 53, ditolak: 8 },
    { bulan: 'Mei', pengajuan: 55, disetujui: 48, ditolak: 7 },
    { bulan: 'Jun', pengajuan: 67, disetujui: 58, ditolak: 9 }
  ];

  // Data distribusi anggaran per daerah
  const regionalData = [
    { name: 'Jawa Barat', value: 8500, color: '#3b82f6' },
    { name: 'Jawa Timur', value: 7200, color: '#10b981' },
    { name: 'Jawa Tengah', value: 6800, color: '#f59e0b' },
    { name: 'Sumatra Utara', value: 5400, color: '#8b5cf6' },
    { name: 'Sulawesi Selatan', value: 4800, color: '#ec4899' },
    { name: 'Lainnya', value: 12500, color: '#6b7280' }
  ];

  // Data pengajuan terbaru
  const recentSubmissions = [
    {
      id: 'RAB-2025-001',
      region: 'Jawa Barat',
      program: 'Bantuan Sosial PKH',
      amount: 'Rp 850 Juta',
      status: 'pending',
      date: '2 jam lalu',
      priority: 'high'
    },
    {
      id: 'RAB-2025-002',
      region: 'Jawa Timur',
      program: 'Program Sembako',
      amount: 'Rp 620 Juta',
      status: 'review',
      date: '5 jam lalu',
      priority: 'medium'
    },
    {
      id: 'RAB-2025-003',
      region: 'Sumatra Utara',
      program: 'Rehabilitasi Sosial',
      amount: 'Rp 450 Juta',
      status: 'approved',
      date: '1 hari lalu',
      priority: 'low'
    },
    {
      id: 'RAB-2025-004',
      region: 'Sulawesi Selatan',
      program: 'Bantuan Pangan',
      amount: 'Rp 380 Juta',
      status: 'approved',
      date: '1 hari lalu',
      priority: 'medium'
    }
  ];

  // Data alert
  const alerts = [
    {
      id: 1,
      type: 'warning',
      title: 'RAB Mendekati Deadline',
      message: '5 pengajuan RAB akan melewati batas waktu review dalam 24 jam',
      time: '30 menit lalu'
    },
    {
      id: 2,
      type: 'info',
      title: 'Laporan Masyarakat Baru',
      message: '3 laporan baru memerlukan verifikasi',
      time: '2 jam lalu'
    }
  ];

  const getStatusStyle = (status) => {
    const styles = {
      pending: 'bg-yellow-50 text-yellow-700 border-yellow-200',
      review: 'bg-blue-50 text-blue-700 border-blue-200',
      approved: 'bg-green-50 text-green-700 border-green-200',
      rejected: 'bg-red-50 text-red-700 border-red-200'
    };
    return styles[status] || styles.pending;
  };

  const getStatusText = (status) => {
    const texts = {
      pending: 'Menunggu',
      review: 'Direview',
      approved: 'Disetujui',
      rejected: 'Ditolak'
    };
    return texts[status] || status;
  };

  const getPriorityColor = (priority) => {
    const colors = {
      high: 'bg-red-500',
      medium: 'bg-yellow-500',
      low: 'bg-green-500'
    };
    return colors[priority] || colors.medium;
  };

  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      {/* Main Content */}
      <div className=" w-full max-w-full">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-4 sm:px-6 py-6 w-full max-w-full">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 w-full max-w-full">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-sm text-gray-500 mt-1">Monitor dan kelola anggaran sosial secara real-time</p>
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
                <Calendar size={16} />
                Export Laporan
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 space-y-6 w-full max-w-full">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              const colorClasses = {
                blue: 'bg-blue-50 text-blue-600',
                green: 'bg-green-50 text-green-600',
                yellow: 'bg-yellow-50 text-yellow-600',
                red: 'bg-red-50 text-red-600'
              };
              
              return (
                <div key={index} className="bg-white rounded-xl p-5 border border-gray-200 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">{stat.value}</h3>
                      <div className="flex items-center gap-1">
                        {stat.trend === 'up' ? (
                          <ArrowUpRight size={16} className="text-green-600" />
                        ) : (
                          <ArrowDownRight size={16} className="text-red-600" />
                        )}
                        <span className={`text-sm font-medium ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                          {stat.change}
                        </span>
                        <span className="text-sm text-gray-500">{stat.description}</span>
                      </div>
                    </div>
                    <div className={`w-12 h-12 rounded-lg ${colorClasses[stat.color]} flex items-center justify-center`}>
                      <Icon size={24} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Budget Overview */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {budgetStats.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="bg-white rounded-xl p-5 border border-gray-200">
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`w-10 h-10 rounded-lg bg-${item.color}-50 text-${item.color}-600 flex items-center justify-center`}>
                      <Icon size={20} />
                    </div>
                    <p className="text-sm font-medium text-gray-600">{item.title}</p>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">{item.value}</h3>
                  {item.percentage && (
                    <p className="text-sm text-gray-500 mt-1">{item.percentage} dari total</p>
                  )}
                </div>
              );
            })}
          </div>

          {/* Alerts */}
          {alerts.length > 0 && (
            <div className="space-y-3">
              {alerts.map((alert) => (
                <div key={alert.id} className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-start gap-3">
                  <AlertTriangle size={20} className="text-yellow-600 mt-0.5 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold text-yellow-900">{alert.title}</h4>
                    <p className="text-sm text-yellow-800 mt-1">{alert.message}</p>
                    <p className="text-xs text-yellow-600 mt-2">{alert.time}</p>
                  </div>
                  <button className="text-yellow-600 hover:text-yellow-800 transition-colors">
                    <ChevronRight size={20} />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Trend Chart */}
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Trend Pengajuan RAB</h3>
                  <p className="text-sm text-gray-500 mt-1">6 bulan terakhir</p>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="bulan" stroke="#9ca3af" style={{ fontSize: '12px' }} />
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
                  <Line type="monotone" dataKey="pengajuan" stroke="#3b82f6" strokeWidth={2} name="Pengajuan" />
                  <Line type="monotone" dataKey="disetujui" stroke="#10b981" strokeWidth={2} name="Disetujui" />
                  <Line type="monotone" dataKey="ditolak" stroke="#ef4444" strokeWidth={2} name="Ditolak" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Distribution Chart */}
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Distribusi Anggaran</h3>
                  <p className="text-sm text-gray-500 mt-1">Per provinsi (dalam juta)</p>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={regionalData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {regionalData.map((entry, index) => (
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

          {/* Recent Submissions */}
          <div className="bg-white rounded-xl border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Pengajuan Terbaru</h3>
                <p className="text-sm text-gray-500 mt-1">Daftar RAB yang baru masuk</p>
              </div>
              <button className="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1">
                Lihat Semua
                <ChevronRight size={16} />
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">ID & Daerah</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Program</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Nilai</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Waktu</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {recentSubmissions.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-2 h-2 rounded-full ${getPriorityColor(item.priority)}`}></div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">{item.id}</p>
                            <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                              <MapPin size={12} />
                              {item.region}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-gray-900">{item.program}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm font-medium text-gray-900">{item.amount}</p>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium border ${getStatusStyle(item.status)}`}>
                          {getStatusText(item.status)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-gray-500">{item.date}</p>
                      </td>
                      <td className="px-6 py-4">
                        <button className="text-sm font-medium text-blue-600 hover:text-blue-700">
                          Review
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPusatDashboard;