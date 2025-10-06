import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  FileText,
  Activity,
  AlertCircle,
  Users,
  Settings,
  X,
  BarChart3,
  FolderOpen,
  Shield,
  Eye,
  Menu
} from 'lucide-react';

export const AdminPusatSidebar = ({ userRole = 'admin_pusat' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  // Menu items berdasarkan role user dengan routing
  const getMenuItems = () => {
    const baseMenu = [
      { 
        id: 'dashboard', 
        label: 'Dashboard', 
        icon: LayoutDashboard, 
        roles: ['admin_pusat', 'admin_daerah'],
        path: '/admin-pusat/dashboard'
      },
      { 
        id: 'pengajuan', 
        label: 'Review RAB', 
        icon: FileText, 
        roles: ['admin_pusat'], 
        badge: 12,
        path: '/admin-pusat/pengajuan'
      },
      { 
        id: 'monitoring', 
        label: 'Monitoring', 
        icon: Activity, 
        roles: ['admin_pusat', 'admin_daerah'],
        path: '/admin-pusat/monitoring'
      },
      { 
        id: 'laporan', 
        label: 'Laporan', 
        icon: AlertCircle, 
        roles: ['admin_pusat'], 
        badge: 5,
        path: '/admin-pusat/laporan'
      },
      { 
        id: 'daerah', 
        label: 'Data Daerah', 
        icon: Users, 
        roles: ['admin_pusat'],
        path: '/admin-pusat/daerah'
      },
      { 
        id: 'rab', 
        label: 'Pengajuan RAB', 
        icon: FolderOpen, 
        roles: ['admin_daerah'],
        path: '/admin-daerah/rab'
      },
      { 
        id: 'transparansi', 
        label: 'Portal Transparansi', 
        icon: Eye, 
        roles: ['masyarakat'],
        path: '/transparansi'
      },
      { 
        id: 'pengaduan', 
        label: 'Laporan Masyarakat', 
        icon: AlertCircle, 
        roles: ['admin_pusat'],
        path: '/admin-pusat/pengaduan'
      },
      { 
        id: 'analytics', 
        label: 'Analytics', 
        icon: BarChart3, 
        roles: ['admin_pusat'],
        path: '/admin-pusat/analytics'
      },
      { 
        id: 'compliance', 
        label: 'Compliance', 
        icon: Shield, 
        roles: ['admin_pusat'],
        path: '/admin-pusat/compliance'
      },
      { 
        id: 'profile', 
        label: 'Profil', 
        icon: Settings, 
        roles: ['admin_pusat', 'admin_daerah'],
        path: '/admin-pusat/profile'
      }
    ];

    return baseMenu.filter(item => item.roles.includes(userRole));
  };

  const menuItems = getMenuItems();

  // User info berdasarkan role
  const getUserInfo = () => {
    switch (userRole) {
      case 'admin_pusat':
        return { name: 'Admin Pusat', department: 'Kementerian Sosial', initial: 'AP' };
      case 'admin_daerah':
        return { name: 'Admin Daerah', department: 'Pemda Provinsi', initial: 'AD' };
      case 'masyarakat':
        return { name: 'Masyarakat', department: 'Pengguna Publik', initial: 'MS' };
      default:
        return { name: 'Admin Pusat', department: 'Kementerian Sosial', initial: 'AP' };
    }
  };

  const userInfo = getUserInfo();

  // Check active menu berdasarkan path
  const getActiveMenu = () => {
    const currentPath = location.pathname;
    const activeItem = menuItems.find(item => currentPath.startsWith(item.path));
    return activeItem ? activeItem.id : 'dashboard';
  };

  const activeMenu = getActiveMenu();

  const handleMenuClick = (menuItem) => {
    navigate(menuItem.path);
    // Close sidebar on mobile after menu click
    if (window.innerWidth < 1024) {
      setIsOpen(false);
    }
  };

  const handleProfileClick = () => {
    navigate('/admin-pusat/profile');
    if (window.innerWidth < 1024) {
      setIsOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header with Menu Button */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 z-30">
        <button
          onClick={toggleSidebar}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <Menu size={24} className="text-gray-700" />
        </button>
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">IM</span>
          </div>
          <span className="font-bold text-gray-800">InfoKanMas</span>
        </div>
        <div className="w-10"></div>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed left-0 top-0 h-full bg-white w-72 z-50 
        transform transition-transform duration-300 ease-in-out 
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
        lg:translate-x-0
        shadow-xl border-r border-gray-200
      `}>
        {/* Header */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">IM</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">InfoKanMas</h1>
                <p className="text-xs text-gray-500 font-medium">{userInfo.department}</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X size={20} className="text-gray-600" />
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="px-4 py-6 overflow-y-auto" style={{ height: 'calc(100vh - 180px)' }}>
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3 mb-4">
            Menu Utama
          </p>
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeMenu === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => handleMenuClick(item)}
                className={`
                  w-full flex items-center justify-between px-4 py-3.5 mb-1.5 rounded-xl transition-all duration-200 group
                  ${isActive
                    ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/30'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'
                  }
                `}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    size={20}
                    className={`transition-transform duration-200 ${isActive
                        ? 'text-white'
                        : 'text-gray-400 group-hover:text-blue-600 group-hover:scale-110'
                      }`}
                  />
                  <span className={`font-medium text-sm ${isActive ? 'font-semibold' : ''}`}>
                    {item.label}
                  </span>
                </div>
                {item.badge && (
                  <span className={`
                    px-2.5 py-1 text-xs rounded-full font-bold min-w-6 text-center
                    ${isActive
                      ? 'bg-white/20 text-white'
                      : 'bg-blue-50 text-blue-600'
                    }
                  `}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* User Profile */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-100 bg-white">
          <button 
            onClick={handleProfileClick}
            className="w-full flex items-center gap-3 px-3 py-3 rounded-xl bg-gradient-to-r from-gray-50 to-blue-50 hover:from-blue-50 hover:to-blue-100 transition-all cursor-pointer group border border-gray-100"
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-md">
              <span className="text-sm font-bold text-white">{userInfo.initial}</span>
            </div>
            <div className="flex-1 min-w-0 text-left">
              <p className="text-sm font-semibold text-gray-800 truncate">{userInfo.name}</p>
              <p className="text-xs text-gray-500 truncate">{userInfo.department}</p>
            </div>
            <Settings
              size={18}
              className="text-gray-400 group-hover:text-blue-600 group-hover:rotate-90 transition-all duration-300"
            />
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="lg:ml-72 min-h-screen">
        {/* This is where your page content will be rendered */}
        <div className="pt-16 lg:pt-0">
          {/* Your page content goes here */}
        </div>
      </div>
    </div>
  );
};

export default AdminPusatSidebar;