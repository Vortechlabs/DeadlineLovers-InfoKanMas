import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard,
  FileText,
  Activity,
  AlertCircle,
  Users,
  Settings,
  BarChart3,
  FolderOpen,
  Shield,
  Eye,
  User,
  ChevronRight,
  HelpCircle,
  LogOut,
  Home,
  Building,
  Calendar,
  DollarSign,
  PieChart,
  TrendingUp,
  MapPin,
  Brain,
  Database
} from 'lucide-react';

function AdminKabupatenSidebar({ sidebarCollapsed, setSidebarCollapsed }) {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Get active tab from current path
  const getActiveTab = () => {
    const path = location.pathname;
    if (path.includes('/dashboard')) return 'dashboard';
    if (path.includes('/pengajuan')) return 'pengajuan';
    if (path.includes('/monitoring')) return 'monitoring';
    if (path.includes('/laporan')) return 'laporan';
    if (path.includes('/daerah')) return 'daerah';
    if (path.includes('/pengaduan')) return 'pengaduan';
    if (path.includes('/analytics')) return 'analytics';
    if (path.includes('/compliance')) return 'compliance';
    if (path.includes('/profile')) return 'profile';
    if (path.includes('/transparansi')) return 'transparansi';
    if (path.includes('/statistics')) return 'statistics';
    if (path.includes('/predictions')) return 'predictions';
    if (path.includes('/database')) return 'database';
    return 'dashboard'; // default
  };

  const activeTab = getActiveTab();

  // Sidebar menu items dengan routing untuk InfoKanMas
  const menuItems = [
    {
      category: 'Main',
      items: [
        { 
          id: 'dashboard', 
          label: 'Dashboard', 
          icon: LayoutDashboard, 
          path: '/admin-kabupaten/dashboard', 
          active: activeTab === 'dashboard' 
        },
        { 
          id: 'pengajuan', 
          label: 'Review RAB', 
          icon: FileText, 
          path: '/admin-kabupaten/pengajuan', 
          active: activeTab === 'pengajuan', 
          badge: '12' 
        },
        { 
          id: 'monitoring', 
          label: 'Monitoring', 
          icon: Activity, 
          path: '/admin-kabupaten/monitoring', 
          active: activeTab === 'monitoring' 
        },
        { 
          id: 'laporan', 
          label: 'Laporan', 
          icon: AlertCircle, 
          path: '/admin-kabupaten/laporan', 
          active: activeTab === 'laporan', 
          badge: '5' 
        },
      ]
    },
    {
      category: 'Data Management',
      items: [
        { 
          id: 'daerah', 
          label: 'Data Daerah', 
          icon: Users, 
          path: '/admin-kabupaten/daerah', 
          active: activeTab === 'daerah' 
        },
        { 
          id: 'pengaduan', 
          label: 'Laporan Masyarakat', 
          icon: AlertCircle, 
          path: '/admin-kabupaten/pengaduan', 
          active: activeTab === 'pengaduan',
          badge: '8' 
        },
        { 
          id: 'transparansi', 
          label: 'Portal Transparansi', 
          icon: Eye, 
          path: '/admin-kabupaten/transparansi', 
          active: activeTab === 'transparansi' 
        },
        { 
          id: 'compliance', 
          label: 'Compliance', 
          icon: Shield, 
          path: '/admin-kabupaten/compliance', 
          active: activeTab === 'compliance' 
        },
      ]
    },
    {
      category: 'Analytics',
      items: [
        { 
          id: 'analytics', 
          label: 'Analytics', 
          icon: BarChart3, 
          path: '/admin-kabupaten/analytics', 
          active: activeTab === 'analytics' 
        },
        { 
          id: 'statistics', 
          label: 'Statistik', 
          icon: PieChart, 
          path: '/admin-kabupaten/statistics', 
          active: activeTab === 'statistics' 
        },
        { 
          id: 'predictions', 
          label: 'Prediksi', 
          icon: TrendingUp, 
          path: '/admin-kabupaten/predictions', 
          active: activeTab === 'predictions',
          badge: 'NEW' 
        },
      ]
    },
    {
      category: 'System',
      items: [
        { 
          id: 'database', 
          label: 'Database', 
          icon: Database, 
          path: '/admin-kabupaten/database', 
          active: activeTab === 'database' 
        },
        { 
          id: 'profile', 
          label: 'Profile', 
          icon: User, 
          path: '/admin-kabupaten/profile', 
          active: activeTab === 'profile' 
        },
        { 
          id: 'settings', 
          label: 'Settings', 
          icon: Settings, 
          path: '/admin-kabupaten/settings', 
          active: activeTab === 'settings' 
        },
      ]
    }
  ];

  const SidebarItem = ({ item, collapsed }) => {
    const IconComponent = item.icon;
    
    return (
      <button
        onClick={() => navigate(item.path)}
        className={`w-full flex items-center ${collapsed ? 'justify-center px-3' : 'justify-between px-4'} py-3 rounded-xl transition-all duration-300 group relative ${
          item.active
            ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/30'
            : 'text-gray-600 hover:bg-gray-50 hover:text-blue-600'
        }`}
      >
        <div className="flex items-center space-x-3">
          <IconComponent className={`${collapsed ? 'w-5 h-5' : 'w-5 h-5'} flex-shrink-0 ${
            item.active ? 'text-white' : 'text-gray-400 group-hover:text-blue-600 group-hover:scale-[1.1] group-hover:rotate-6'
          }`} />
          {!collapsed && (
            <span className={`font-medium text-sm ${item.active ? 'font-semibold' : ''}`}>
              {item.label}
            </span>
          )}
        </div>
        
        {!collapsed && item.badge && (
          <span className={`px-2.5 py-1 text-xs rounded-full font-bold min-w-6 text-center ${
            item.active 
              ? 'bg-white/20 text-white ' 
              : item.badge === 'NEW'
                ? 'bg-green-100 text-green-700'
                : 'bg-blue-50 text-blue-600'
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
  };

  return (
    <div className="h-full bg-white/80 backdrop-blur-md border-r border-gray-200/50 flex flex-col">
      {/* Sidebar Header */}
      <div className={`p-6 border-b border-gray-200/30 flex items-center ${sidebarCollapsed ? 'justify-center' : 'justify-between'}`}>
        {!sidebarCollapsed && (
          <div className="flex items-center space-x-2">
            <img src="/logo.png" alt="logo" className='h-10 w-10'/>
            <div>
              <h1 className="text-xl font-bold text-gray-800">InfoKanMas</h1>
              <p className="text-xs text-gray-500">Admin Kabupaten</p>
            </div>
          </div>
        )}
        
        {sidebarCollapsed && (
            <img src="/logo.png" alt="logo" className='h-10 w-10'/>
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
            {!sidebarCollapsed && <span className="ml-3 font-medium text-sm">Bantuan</span>}
            {sidebarCollapsed && (
              <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 whitespace-nowrap z-50">
                Bantuan
              </div>
            )}
          </button>
          
          <button className={`w-full flex items-center ${sidebarCollapsed ? 'justify-center px-3' : 'justify-start px-4'} py-3 text-red-600 hover:bg-red-50 rounded-xl transition-all duration-300 group relative`}>
            <LogOut className="w-5 h-5 flex-shrink-0" />
            {!sidebarCollapsed && <span className="ml-3 font-medium text-sm">Keluar</span>}
            {sidebarCollapsed && (
              <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 whitespace-nowrap z-50">
                Keluar
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
                <p className="text-xs text-gray-500 truncate">Kementerian Sosial</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminKabupatenSidebar;