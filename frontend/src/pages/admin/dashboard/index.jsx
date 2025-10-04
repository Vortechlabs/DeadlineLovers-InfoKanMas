
import { 
  Users, 
  TrendingUp, 
  AlertTriangle, 
  MapPin, 
  Brain, 
  BarChart3, 
  Bell, 
  Search,
  Filter,
  Download,
  Settings,
  User,
  ChevronDown,
  Eye,
  Activity,
  Target,
  Zap,
  Menu,
  X,
  Home,
  Database,
  FileText,
  Shield,
  HelpCircle,
  LogOut,
  ChevronRight,
  Globe,
  UserCheck,
  Building,
  TrendingDown,
  Calendar,
  DollarSign,
  PieChart as PieChartIcon
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

// Mock data
const populationData = [
  { month: 'Jan', actual: 270000000, predicted: 270500000 },
  { month: 'Feb', actual: 270200000, predicted: 270700000 },
  { month: 'Mar', actual: 270400000, predicted: 270900000 },
  { month: 'Apr', actual: 270600000, predicted: 271100000 },
  { month: 'May', actual: 270800000, predicted: 271300000 },
  { month: 'Jun', actual: 271000000, predicted: 271500000 }
];

const alertData = [
  { id: 1, province: 'DKI Jakarta', level: 'critical', population: '10.7M', capacity: '90%', trend: '+2.1%' },
  { id: 2, province: 'Jawa Barat', level: 'warning', population: '48.3M', capacity: '78%', trend: '+1.8%' },
  { id: 3, province: 'Jawa Tengah', level: 'normal', population: '34.5M', capacity: '65%', trend: '+0.9%' }
];

const migrationData = [
  { name: 'Jakarta', value: 2840 },
  { name: 'Bandung', value: 1920 },
  { name: 'Surabaya', value: 1680 },
  { name: 'Yogyakarta', value: 1240 },
  { name: 'Bali', value: 960 }
];

const provinceStats = [
  { province: 'DKI Jakarta', population: 10700000, capacity: 90, jobs: 245000, status: 'critical' },
  { province: 'Jawa Barat', population: 48300000, capacity: 78, jobs: 189000, status: 'warning' },
  { province: 'Jawa Tengah', population: 34500000, capacity: 65, jobs: 156000, status: 'normal' },
  { province: 'Jawa Timur', population: 39600000, capacity: 72, jobs: 178000, status: 'warning' },
  { province: 'Sumatera Utara', population: 14800000, capacity: 45, jobs: 98000, status: 'low' }
];

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

export default function MigraPopDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [alerts, setAlerts] = useState(alertData);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const StatCard = ({ icon: Icon, title, value, change, color }) => (
    <div className="bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-2xl p-6 hover:bg-white/90 transition-all duration-300 shadow-sm hover:shadow-md">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-xl bg-gradient-to-br ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <span className={`text-sm font-medium ${change?.startsWith('+') ? 'text-green-600' : change?.startsWith('-') ? 'text-red-600' : 'text-gray-600'}`}>
          {change}
        </span>
      </div>
      <h3 className="text-gray-600 text-sm font-medium mb-1">{title}</h3>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
    </div>
  );

  const AlertCard = ({ alert }) => {
    const levelColors = {
      critical: 'bg-red-50 border-red-200 text-red-800',
      warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
      normal: 'bg-green-50 border-green-200 text-green-800'
    };

    const levelIcons = {
      critical: '🔴',
      warning: '🟡',
      normal: '🟢'
    };

    return (
      <div className={`p-4 rounded-xl border-2 ${levelColors[alert.level]} mb-3 hover:shadow-md transition-all duration-300`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="text-lg">{levelIcons[alert.level]}</span>
            <div>
              <h4 className="font-semibold">{alert.province}</h4>
              <p className="text-sm opacity-75">Kapasitas: {alert.capacity} • Trend: {alert.trend}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="font-bold">{alert.population}</p>
            <button className="text-sm underline hover:no-underline">Detail</button>
          </div>
        </div>
      </div>
    );
  };

  // Sidebar menu items
  const menuItems = [
    {
      category: 'Main',
      items: [
        { id: 'dashboard', label: 'Dashboard', icon: Home, active: activeTab === 'overview' },
        { id: 'ai-insights', label: 'AI Insights', icon: Brain, active: activeTab === 'ai-insights', badge: 'AI' },
        { id: 'population', label: 'Populasi', icon: Users, active: activeTab === 'population' },
        { id: 'migration', label: 'Migrasi', icon: MapPin, active: activeTab === 'migration', badge: '8.6K' },
      ]
    },
    {
      category: 'Analytics',
      items: [
        { id: 'reports', label: 'Reports', icon: BarChart3, active: false },
        { id: 'predictions', label: 'Prediksi AI', icon: TrendingUp, active: false, badge: 'NEW' },
        { id: 'alerts', label: 'Smart Alerts', icon: AlertTriangle, active: activeTab === 'alerts', badge: '23' },
        { id: 'statistics', label: 'Statistik', icon: PieChartIcon, active: false },
      ]
    },
    {
      category: 'Management',
      items: [
        { id: 'provinces', label: 'Provinsi', icon: Globe, active: false },
        { id: 'users', label: 'User Management', icon: UserCheck, active: false },
        { id: 'government', label: 'Instansi', icon: Building, active: false },
        { id: 'jobs', label: 'Lowongan Kerja', icon: Target, active: false },
      ]
    },
    {
      category: 'Finance',
      items: [
        { id: 'incentives', label: 'Insentif Migrasi', icon: DollarSign, active: false },
        { id: 'budget', label: 'Budget Planning', icon: Calendar, active: false },
      ]
    },
    {
      category: 'System',
      items: [
        { id: 'database', label: 'Database', icon: Database, active: false },
        { id: 'logs', label: 'System Logs', icon: FileText, active: false },
        { id: 'security', label: 'Security', icon: Shield, active: false },
        { id: 'settings', label: 'Settings', icon: Settings, active: false },
      ]
    }
  ];

  const SidebarItem = ({ item, collapsed }) => (
    <button
      onClick={() => {
        if (item.id === 'dashboard') setActiveTab('overview');
        else setActiveTab(item.id);
      }}
      className={`w-full flex items-center ${collapsed ? 'justify-center px-3' : 'justify-between px-4'} py-3 rounded-xl transition-all duration-300 group relative ${
        item.active
          ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25'
          : 'text-gray-600 hover:bg-white/80 hover:text-gray-900'
      }`}
    >
      <div className="flex items-center space-x-3">
        <item.icon className={`${collapsed ? 'w-5 h-5' : 'w-5 h-5'} flex-shrink-0`} />
        {!collapsed && <span className="font-medium text-sm">{item.label}</span>}
      </div>
      
      {!collapsed && item.badge && (
        <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${
          item.active 
            ? 'bg-white/20 text-white' 
            : item.badge === 'AI' 
              ? 'bg-purple-100 text-purple-700'
              : item.badge === 'NEW'
                ? 'bg-green-100 text-green-700'
                : 'bg-red-100 text-red-700'
        }`}>
          {item.badge}
        </span>
      )}
      
      {collapsed && (
        <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 whitespace-nowrap z-50">
          {item.label}
          {item.badge && <span className="ml-1 text-yellow-300">({item.badge})</span>}
        </div>
      )}
    </button>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 flex">
      {/* Sidebar */}
      <div className={`${sidebarCollapsed ? 'w-20' : 'w-72'} transition-all duration-300 relative flex-shrink-0`}>
        <div className="fixed h-full bg-white/80 backdrop-blur-md border-r border-gray-200/50 flex flex-col z-40">
          <div className={`${sidebarCollapsed ? 'w-20' : 'w-72'} transition-all duration-300`}>
            {/* Sidebar Header */}
            <div className={`p-6 border-b border-gray-200/30 flex items-center ${sidebarCollapsed ? 'justify-center' : 'justify-between'}`}>
              {!sidebarCollapsed && (
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                    <Users className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                      MigraPop
                    </h1>
                    <p className="text-xs text-gray-500">Admin Dashboard</p>
                  </div>
                </div>
              )}
              
              {sidebarCollapsed && (
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-white" />
                </div>
              )}
              
              <button
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ChevronRight className={`w-4 h-4 text-gray-600 transition-transform duration-300 ${sidebarCollapsed ? 'rotate-180' : ''}`} />
              </button>
            </div>

            {/* Navigation Menu */}
            <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
              {menuItems.map((category) => (
                <div key={category.category}>
                  {!sidebarCollapsed && (
                    <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3 px-2">
                      {category.category}
                    </h3>
                  )}
                  <div className="space-y-1">
                    {category.items.map((item) => (
                      <SidebarItem key={item.id} item={item} collapsed={sidebarCollapsed} />
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Sidebar Footer */}
            <div className="border-t border-gray-200/30 p-4">
              <div className="space-y-2">
                <button className={`w-full flex items-center ${sidebarCollapsed ? 'justify-center px-3' : 'justify-start px-4'} py-3 text-gray-600 hover:bg-gray-100/80 rounded-xl transition-all duration-300 group relative`}>
                  <HelpCircle className="w-5 h-5 flex-shrink-0" />
                  {!sidebarCollapsed && <span className="ml-3 font-medium text-sm">Help & Support</span>}
                  {sidebarCollapsed && (
                    <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 whitespace-nowrap z-50">
                      Help & Support
                    </div>
                  )}
                </button>
                
                <button className={`w-full flex items-center ${sidebarCollapsed ? 'justify-center px-3' : 'justify-start px-4'} py-3 text-red-600 hover:bg-red-50 rounded-xl transition-all duration-300 group relative`}>
                  <LogOut className="w-5 h-5 flex-shrink-0" />
                  {!sidebarCollapsed && <span className="ml-3 font-medium text-sm">Logout</span>}
                  {sidebarCollapsed && (
                    <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 whitespace-nowrap z-50">
                      Logout
                    </div>
                  )}
                </button>
              </div>
              
              {!sidebarCollapsed && (
                <div className="mt-4 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200/30">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-900 truncate">Admin Pusat</p>
                      <p className="text-xs text-gray-500 truncate">admin@migrapop.go.id</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="bg-white/70 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-30">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <Menu className="w-5 h-5 text-gray-600" />
                </button>
                
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 capitalize">
                    {activeTab === 'overview' ? 'Dashboard Overview' : activeTab.replace('-', ' ')}
                  </h2>
                  <p className="text-sm text-gray-500">
                    {activeTab === 'overview' && 'Monitoring distribusi penduduk Indonesia dengan AI'}
                    {activeTab === 'ai-insights' && 'Advanced AI analytics dan machine learning insights'}
                    {activeTab === 'population' && 'Manajemen data populasi dan demografi'}
                    {activeTab === 'migration' && 'Kontrol dan monitoring migrasi penduduk'}
                    {activeTab === 'alerts' && 'Sistem peringatan cerdas dan notifikasi real-time'}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <input 
                    className="pl-10 pr-4 py-2 bg-white/80 border border-gray-200/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all duration-300 w-64"
                    placeholder="Cari provinsi, data, atau fitur..."
                  />
                </div>
                
                <button className="relative p-2 bg-white/80 border border-gray-200/50 rounded-xl hover:bg-white transition-all duration-300">
                  <Bell className="w-5 h-5 text-gray-600" />
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center">
                    <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
                  </span>
                </button>
                
                <div className="text-right">
                  <p className="text-xs text-gray-500">Live Time</p>
                  <p className="text-sm font-mono font-bold text-gray-700">
                    {currentTime.toLocaleTimeString('id-ID')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-6 overflow-auto">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard
                icon={Users}
                title="Total Populasi"
                value="271.3M"
                change="+1.2%"
                color="from-blue-500 to-blue-600"
              />
              <StatCard
                icon={TrendingUp}
                title="Akurasi Prediksi AI"
                value="87.4%"
                change="+2.1%"
                color="from-green-500 to-green-600"
              />
              <StatCard
                icon={AlertTriangle}
                title="Alert Aktif"
                value="23"
                change="+5"
                color="from-yellow-500 to-orange-500"
              />
              <StatCard
                icon={Target}
                title="Migrasi Berhasil"
                value="8,642"
                change="+12.3%"
                color="from-purple-500 to-purple-600"
              />
            </div>

            {/* Main Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Population Prediction */}
              <div className="bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-2xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900">Prediksi Populasi AI</h2>
                  <div className="flex items-center space-x-2">
                    <Zap className="w-5 h-5 text-yellow-500" />
                    <span className="text-sm font-medium text-gray-600">Real-time</span>
                  </div>
                </div>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={populationData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis dataKey="month" stroke="#64748b" fontSize={12} />
                    <YAxis stroke="#64748b" fontSize={12} />
                    <Tooltip 
                      contentStyle={{
                        background: 'rgba(255, 255, 255, 0.95)',
                        border: '1px solid #e2e8f0',
                        borderRadius: '12px',
                        backdropFilter: 'blur(10px)'
                      }}
                    />
                    <Line type="monotone" dataKey="actual" stroke="#3b82f6" strokeWidth={3} dot={{ fill: '#3b82f6', r: 4 }} />
                    <Line type="monotone" dataKey="predicted" stroke="#10b981" strokeWidth={3} strokeDasharray="5 5" dot={{ fill: '#10b981', r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Migration Recommendations */}
              <div className="bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-2xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900">Rekomendasi Migrasi AI</h2>
                  <Brain className="w-5 h-5 text-purple-500" />
                </div>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={migrationData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis dataKey="name" stroke="#64748b" fontSize={12} />
                    <YAxis stroke="#64748b" fontSize={12} />
                    <Tooltip 
                      contentStyle={{
                        background: 'rgba(255, 255, 255, 0.95)',
                        border: '1px solid #e2e8f0',
                        borderRadius: '12px',
                        backdropFilter: 'blur(10px)'
                      }}
                    />
                    <Bar dataKey="value" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Alerts & Province Stats */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Smart Alerts */}
              <div className="bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-2xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900">Smart Alerts</h2>
                  <Activity className="w-5 h-5 text-red-500" />
                </div>
                <div className="space-y-3">
                  {alerts.map((alert) => (
                    <AlertCard key={alert.id} alert={alert} />
                  ))}
                </div>
                <button className="w-full mt-4 py-2 text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-300 font-medium">
                  Lihat Semua Alert
                </button>
              </div>

              {/* Province Performance */}
              <div className="lg:col-span-2 bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-2xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900">Performa Provinsi</h2>
                  <div className="flex space-x-2">
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                      <Filter className="w-4 h-4 text-gray-600" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                      <Download className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Provinsi</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Populasi</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Kapasitas</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Lowongan</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {provinceStats.map((province, index) => (
                        <tr key={index} className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors">
                          <td className="py-3 px-4 font-medium text-gray-900">{province.province}</td>
                          <td className="py-3 px-4 text-gray-600">{(province.population / 1000000).toFixed(1)}M</td>
                          <td className="py-3 px-4">
                            <div className="flex items-center space-x-2">
                              <div className="w-20 bg-gray-200 rounded-full h-2">
                                <div 
                                  className={`h-2 rounded-full ${
                                    province.capacity >= 90 ? 'bg-red-500' : 
                                    province.capacity >= 70 ? 'bg-yellow-500' : 
                                    province.capacity >= 50 ? 'bg-green-500' : 'bg-blue-500'
                                  }`}
                                  style={{ width: `${province.capacity}%` }}
                                ></div>
                              </div>
                              <span className="text-sm text-gray-600">{province.capacity}%</span>
                            </div>
                          </td>
                          <td className="py-3 px-4 text-gray-600">{(province.jobs / 1000).toFixed(0)}K</td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              province.status === 'critical' ? 'bg-red-100 text-red-800' :
                              province.status === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                              province.status === 'normal' ? 'bg-green-100 text-green-800' :
                              'bg-blue-100 text-blue-800'
                            }`}>
                              {province.status}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <button className="text-blue-600 hover:text-blue-800 transition-colors">
                              <Eye className="w-4 h-4" />
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
        )}

        {/* Other tab contents would be implemented similarly */}
        {activeTab !== 'overview' && (
          <div className="bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-2xl p-8 text-center">
            <Brain className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              {activeTab === 'ai-insights' && 'AI Insights Dashboard'}
              {activeTab === 'population' && 'Population Management'}
              {activeTab === 'migration' && 'Migration Control Center'}
              {activeTab === 'alerts' && 'Smart Alert System'}
            </h3>
            <p className="text-gray-500">
              Fitur ini sedang dalam pengembangan untuk hackathon 21 jam
            </p>
          </div>
        )}
        </main>
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
          <div className="relative w-72 bg-white/90 backdrop-blur-md border-r border-gray-200/50 flex flex-col">
            <div className="p-6 border-b border-gray-200/30 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    MigraPop
                  </h1>
                  <p className="text-xs text-gray-500">Admin Dashboard</p>
                </div>
              </div>
              
              <button
                onClick={() => setSidebarOpen(false)}
                className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-4 h-4 text-gray-600" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
              {menuItems.map((category) => (
                <div key={category.category}>
                  <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3 px-2">
                    {category.category}
                  </h3>
                  <div className="space-y-1">
                    {category.items.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => {
                          if (item.id === 'dashboard') setActiveTab('overview');
                          else setActiveTab(item.id);
                          setSidebarOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-300 ${
                          item.active
                            ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25'
                            : 'text-gray-600 hover:bg-white/80 hover:text-gray-900'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <item.icon className="w-5 h-5 flex-shrink-0" />
                          <span className="font-medium text-sm">{item.label}</span>
                        </div>
                        
                        {item.badge && (
                          <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${
                            item.active 
                              ? 'bg-white/20 text-white' 
                              : item.badge === 'AI' 
                                ? 'bg-purple-100 text-purple-700'
                                : item.badge === 'NEW'
                                  ? 'bg-green-100 text-green-700'
                                  : 'bg-red-100 text-red-700'
                          }`}>
                            {item.badge}
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-200/30 p-4">
              <div className="space-y-2">
                <button className="w-full flex items-center justify-start px-4 py-3 text-gray-600 hover:bg-gray-100/80 rounded-xl transition-all duration-300">
                  <HelpCircle className="w-5 h-5 flex-shrink-0" />
                  <span className="ml-3 font-medium text-sm">Help & Support</span>
                </button>
                
                <button className="w-full flex items-center justify-start px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-all duration-300">
                  <LogOut className="w-5 h-5 flex-shrink-0" />
                  <span className="ml-3 font-medium text-sm">Logout</span>
                </button>
              </div>
              
              <div className="mt-4 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200/30">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900 truncate">Admin Pusat</p>
                    <p className="text-xs text-gray-500 truncate">admin@migrapop.go.id</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}