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
  User,
  ChevronRight,
  HelpCircle,
  LogOut,
  Home,
  Building,
  DollarSign,
  MapPin,
  ClipboardList,
  Truck,
  CheckCircle,
  Clock,
  Wrench,
  LandPlot,
  School,
  Heart
} from 'lucide-react';

function AdminDesaSidebar({ sidebarCollapsed, setSidebarCollapsed }) {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Get active tab from current path
  const getActiveTab = () => {
    const path = location.pathname;
    if (path.includes('/dashboard')) return 'dashboard';
    if (path.includes('/proyek')) return 'proyek';
    if (path.includes('/anggaran')) return 'anggaran';
    if (path.includes('/warga')) return 'warga';
    if (path.includes('/bansos')) return 'bansos';
    if (path.includes('/infrastruktur')) return 'infrastruktur';
    if (path.includes('/laporan')) return 'laporan';
    if (path.includes('/pengaduan')) return 'pengaduan';
    if (path.includes('/progress')) return 'progress';
    if (path.includes('/profile')) return 'profile';
    if (path.includes('/settings')) return 'settings';
    return 'dashboard';
  };

  const activeTab = getActiveTab();

  // Sidebar menu items KHUSUS untuk Admin Desa
  const menuItems = [
    {
      category: 'Dashboard & Monitoring',
      items: [
        { 
          id: 'dashboard', 
          label: 'Dashboard Desa', 
          icon: LayoutDashboard, 
          path: '/admin-desa/dashboard', 
          active: activeTab === 'dashboard' 
        },
        { 
          id: 'progress', 
          label: 'Progress Harian', 
          icon: Activity, 
          path: '/admin-desa/progress', 
          active: activeTab === 'progress',
          badge: '8' 
        },
        { 
          id: 'pengaduan', 
          label: 'Pengaduan Warga', 
          icon: AlertCircle, 
          path: '/admin-desa/pengaduan', 
          active: activeTab === 'pengaduan',
          badge: '5' 
        },
      ]
    },
    {
      category: 'Manajemen Proyek',
      items: [
        { 
          id: 'proyek', 
          label: 'Proyek Desa', 
          icon: Building, 
          path: '/admin-desa/proyek', 
          active: activeTab === 'proyek',
          badge: '12' 
        },
        { 
          id: 'infrastruktur', 
          label: 'Infrastruktur', 
          icon: Wrench, 
          path: '/admin-desa/infrastruktur', 
          active: activeTab === 'infrastruktur' 
        },
        { 
          id: 'pengerjaan', 
          label: 'Tim Pengerjaan', 
          icon: Users, 
          path: '/admin-desa/pengerjaan', 
          active: activeTab === 'pengerjaan' 
        },
      ]
    },
    {
      category: 'Keuangan & Anggaran',
      items: [
        { 
          id: 'anggaran', 
          label: 'Anggaran Desa', 
          icon: DollarSign, 
          path: '/admin-desa/anggaran', 
          active: activeTab === 'anggaran' 
        },
        { 
          id: 'bansos', 
          label: 'Bansos & Bantuan', 
          icon: Heart, 
          path: '/admin-desa/bansos', 
          active: activeTab === 'bansos',
          badge: 'NEW' 
        },
        { 
          id: 'pengeluaran', 
          label: 'Realiasi Dana', 
          icon: ClipboardList, 
          path: '/admin-desa/pengeluaran', 
          active: activeTab === 'pengeluaran' 
        },
      ]
    },
    {
      category: 'Data & Laporan',
      items: [
        { 
          id: 'warga', 
          label: 'Data Warga', 
          icon: Users, 
          path: '/admin-desa/warga', 
          active: activeTab === 'warga' 
        },
        { 
          id: 'laporan', 
          label: 'Laporan Bulanan', 
          icon: FileText, 
          path: '/admin-desa/laporan', 
          active: activeTab === 'laporan' 
        },
        { 
          id: 'lokasi', 
          label: 'Peta Desa', 
          icon: MapPin, 
          path: '/admin-desa/lokasi', 
          active: activeTab === 'lokasi' 
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
            ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg shadow-green-500/30'
            : 'text-gray-600 hover:bg-gray-50 hover:text-green-600'
        }`}
      >
        <div className="flex items-center space-x-3">
          <IconComponent className={`${collapsed ? 'w-5 h-5' : 'w-5 h-5'} flex-shrink-0 ${
            item.active ? 'text-white' : 'text-gray-400 group-hover:text-green-600 group-hover:scale-[1.1] group-hover:rotate-6'
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
              ? 'bg-white/20 text-white' 
              : item.badge === 'NEW'
                ? 'bg-orange-100 text-orange-700'
                : 'bg-green-50 text-green-600'
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
              <p className="text-xs text-gray-500">Admin Desa Sukamaju</p>
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
          <div className="mt-4 p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200/30">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900 truncate">Kepala Desa</p>
                <p className="text-xs text-gray-500 truncate">Desa Sukamaju</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminDesaSidebar;