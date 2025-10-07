import React, { useState } from 'react';
import { 
  TrendingUp, 
  FileText, 
  CheckCircle, 
  Clock,
  XCircle,
  DollarSign,
  Users,
  Home,
  MapPin,
  Calendar,
  AlertCircle,
  Eye,
  Download,
  ChevronRight,
  BarChart3,
  PieChart,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { LineChart, Line, BarChart, Bar, PieChart as RechartsPie, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const AdminDesaDashboard = () => {
  const [timeFilter, setTimeFilter] = useState('bulan_ini');

  // Data statistik sederhana untuk desa
  const stats = [
    {
      title: 'Proyek Aktif',
      value: '8',
      change: '+2',
      trend: 'up',
      icon: Home,
      color: 'blue',
      description: 'proyek berjalan'
    },
    {
      title: 'Selesai',
      value: '15',
      change: '+3',
      trend: 'up',
      icon: CheckCircle,
      color: 'green',
      description: 'proyek selesai'
    },
    {
      title: 'Menunggu',
      value: '3',
      change: '-1',
      trend: 'down',
      icon: Clock,
      color: 'yellow',
      description: 'perlu persetujuan'
    },
    {
      title: 'Dana Tersedia',
      value: 'Rp 125 Jt',
      change: '85%',
      trend: 'up',
      icon: DollarSign,
      color: 'purple',
      description: 'dari total anggaran'
    }
  ];

  // Data progress proyek
  const projectProgress = [
    { name: 'Pembangunan MCK', progress: 85, color: '#3b82f6' },
    { name: 'Perbaikan Jalan', progress: 60, color: '#10b981' },
    { name: 'Drainase', progress: 45, color: '#f59e0b' },
    { name: 'Penerangan Jalan', progress: 30, color: '#8b5cf6' },
    { name: 'Pos Kamling', progress: 90, color: '#ec4899' }
  ];

  // Data penggunaan dana
  const budgetUsage = [
    { category: 'Infrastruktur', amount: 65, color: '#3b82f6' },
    { category: 'Bansos', amount: 20, color: '#10b981' },
    { category: 'Operasional', amount: 10, color: '#f59e0b' },
    { category: 'Lainnya', amount: 5, color: '#6b7280' }
  ];

  // Data trend bulanan
  const monthlyData = [
    { bulan: 'Jan', dana: 45, proyek: 3 },
    { bulan: 'Feb', dana: 52, proyek: 4 },
    { bulan: 'Mar', dana: 38, proyek: 2 },
    { bulan: 'Apr', dana: 61, proyek: 5 },
    { bulan: 'Mei', dana: 55, proyek: 4 },
    { bulan: 'Jun', dana: 72, proyek: 6 }
  ];

  // Proyek terbaru
  const recentProjects = [
    {
      id: 'PRJ-001',
      name: 'Pembangunan MCK Dusun 1',
      budget: 'Rp 25 Jt',
      progress: 85,
      status: 'sedang_berjalan',
      startDate: '15 Mar 2024',
      endDate: '30 Jun 2024',
      location: 'Dusun 1'
    },
    {
      id: 'PRJ-002',
      name: 'Perbaikan Jalan Desa',
      budget: 'Rp 45 Jt',
      progress: 60,
      status: 'sedang_berjalan',
      startDate: '1 Apr 2024',
      endDate: '31 Jul 2024',
      location: 'Jl. Desa Utama'
    },
    {
      id: 'PRJ-003',
      name: 'Pembangunan Drainase',
      budget: 'Rp 18 Jt',
      progress: 45,
      status: 'sedang_berjalan',
      startDate: '10 Mei 2024',
      endDate: '30 Agu 2024',
      location: 'Dusun 2'
    },
    {
      id: 'PRJ-004',
      name: 'Penerangan Jalan Umum',
      budget: 'Rp 32 Jt',
      progress: 30,
      status: 'sedang_berjalan',
      startDate: '20 Mei 2024',
      endDate: '15 Sep 2024',
      location: 'Jl. Poros Desa'
    }
  ];

  // Notifikasi penting
  const notifications = [
    {
      id: 1,
      type: 'warning',
      title: 'Progress Tertinggal',
      message: 'Proyek Drainase perlu percepatan',
      project: 'PRJ-003',
      time: '2 hari lalu'
    },
    {
      id: 2,
      type: 'info',
      title: 'Dokumen Perlu Upload',
      message: 'Laporan progress proyek MCK',
      project: 'PRJ-001',
      time: '1 hari lalu'
    }
  ];

  const getStatusColor = (status) => {
    const colors = {
      sedang_berjalan: 'bg-blue-100 text-blue-800',
      selesai: 'bg-green-100 text-green-800',
      tertunda: 'bg-yellow-100 text-yellow-800',
      dibatalkan: 'bg-red-100 text-red-800'
    };
    return colors[status] || colors.sedang_berjalan;
  };

  const getStatusText = (status) => {
    const texts = {
      sedang_berjalan: 'Berjalan',
      selesai: 'Selesai',
      tertunda: 'Tertunda',
      dibatalkan: 'Dibatalkan'
    };
    return texts[status] || status;
  };

  const getNotificationIcon = (type) => {
    return type === 'warning' ? AlertCircle : Clock;
  };

  const getNotificationColor = (type) => {
    return type === 'warning' ? 'text-yellow-600' : 'text-blue-600';
  };

  const getNotificationBg = (type) => {
    return type === 'warning' ? 'bg-yellow-50 border-yellow-200' : 'bg-blue-50 border-blue-200';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 overflow-x-hidden">
      {/* Main Content */}
      <div className="w-full max-w-full">
        {/* Header */}
        <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 px-4 sm:px-6 py-6 w-full max-w-full">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 w-full max-w-full">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Dashboard Desa</h1>
              <p className="text-sm text-gray-500 mt-1 flex items-center gap-2">
                <MapPin size={14} />
                Desa Sukamaju, Kecamatan Purbalingga
              </p>
            </div>
            <div className="flex items-center gap-3">
              <select 
                value={timeFilter}
                onChange={(e) => setTimeFilter(e.target.value)}
                className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="minggu_ini">Minggu Ini</option>
                <option value="bulan_ini">Bulan Ini</option>
                <option value="tahun_ini">Tahun Ini</option>
              </select>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center gap-2">
                <Download size={16} />
                Export
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 space-y-6 w-full max-w-full">
          {/* Stats Cards - Sederhana dan Mudah Dipahami */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="bg-white rounded-2xl p-5 border border-gray-200 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-600 mb-2">{stat.title}</p>
                      <h3 className="text-2xl font-bold text-gray-900 mb-3">{stat.value}</h3>
                      <div className="flex items-center gap-2">
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
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${
                      stat.color === 'blue' ? 'from-blue-500 to-blue-600' :
                      stat.color === 'green' ? 'from-green-500 to-green-600' :
                      stat.color === 'yellow' ? 'from-yellow-500 to-yellow-600' :
                      'from-purple-500 to-purple-600'
                    } flex items-center justify-center shadow-lg`}>
                      <Icon size={24} className="text-white" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Notifikasi Penting */}
          {notifications.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <AlertCircle size={20} className="text-yellow-600" />
                Perhatian Penting
              </h3>
              {notifications.map((notification) => {
                const Icon = getNotificationIcon(notification.type);
                return (
                  <div key={notification.id} className={`${getNotificationBg(notification.type)} border rounded-2xl p-4 flex items-start gap-3 hover:shadow-md transition-all`}>
                    <Icon size={20} className={`${getNotificationColor(notification.type)} mt-0.5 flex-shrink-0`} />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-semibold text-gray-900">{notification.title}</h4>
                      <p className="text-sm text-gray-700 mt-1">{notification.message}</p>
                      <div className="flex items-center gap-4 mt-2">
                        <span className="text-xs text-gray-500">Proyek: {notification.project}</span>
                        <span className="text-xs text-gray-500">{notification.time}</span>
                      </div>
                    </div>
                    <button className="text-blue-600 hover:text-blue-800 transition-colors flex items-center gap-1 text-sm font-medium">
                      Lihat
                      <ChevronRight size={16} />
                    </button>
                  </div>
                );
              })}
            </div>
          )}

          {/* Progress Proyek */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <BarChart3 size={20} className="text-blue-600" />
                  Progress Proyek Desa
                </h3>
                <p className="text-sm text-gray-500 mt-1">Monitor perkembangan proyek infrastruktur</p>
              </div>
            </div>
            <div className="space-y-4">
              {projectProgress.map((project, index) => (
                <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                  <div className="flex items-center gap-3 flex-1">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: project.color }}></div>
                    <span className="text-sm font-medium text-gray-700">{project.name}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div 
                        className="h-2 rounded-full transition-all duration-500"
                        style={{ 
                          width: `${project.progress}%`,
                          backgroundColor: project.color
                        }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-gray-700 w-8">{project.progress}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Charts Row - Visual yang Mudah Dipahami */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Penggunaan Dana */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <PieChart size={20} className="text-green-600" />
                    Penggunaan Dana
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">Alokasi anggaran desa</p>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={250}>
                <RechartsPie>
                  <Pie
                    data={budgetUsage}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ category, percent }) => `${category} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="amount"
                  >
                    {budgetUsage.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value) => `${value}%`}
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      fontSize: '12px'
                    }}
                  />
                </RechartsPie>
              </ResponsiveContainer>
            </div>

            {/* Trend Bulanan */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <TrendingUp size={20} className="text-purple-600" />
                    Aktivitas Bulanan
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">Dana digunakan & proyek aktif</p>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={monthlyData}>
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
                    formatter={(value, name) => [
                      name === 'dana' ? `Rp ${value} Jt` : `${value} proyek`,
                      name === 'dana' ? 'Dana' : 'Proyek'
                    ]}
                  />
                  <Legend wrapperStyle={{ fontSize: '12px' }} />
                  <Bar dataKey="dana" name="Dana Digunakan" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="proyek" name="Proyek Aktif" fill="#10b981" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Daftar Proyek */}
          <div className="bg-white rounded-2xl border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Proyek Desa</h3>
                <p className="text-sm text-gray-500 mt-1">Daftar proyek infrastruktur yang sedang berjalan</p>
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
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Proyek</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Lokasi</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Anggaran</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Progress</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {recentProjects.map((project) => (
                    <tr key={project.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div>
                          <p className="text-sm font-medium text-gray-900">{project.name}</p>
                          <p className="text-xs text-gray-500 mt-1">ID: {project.id}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-gray-900 flex items-center gap-1">
                          <MapPin size={14} />
                          {project.location}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm font-medium text-gray-900">{project.budget}</p>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-20 bg-gray-200 rounded-full h-2">
                            <div 
                              className="h-2 rounded-full bg-blue-600 transition-all duration-500"
                              style={{ width: `${project.progress}%` }}
                            ></div>
                          </div>
                          <span className="text-sm text-gray-700">{project.progress}%</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                          {getStatusText(project.status)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <button className="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1">
                          <Eye size={14} />
                          Detail
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

export default AdminDesaDashboard;