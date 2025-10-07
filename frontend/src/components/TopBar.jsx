import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, Bell, Search, User, Settings, LogOut } from 'lucide-react';
import NotificationModal from './NotificationModal';

const AdminPusatTopBar = ({ toggleSidebar, userRole = 'admin_pusat' }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const navigate = useNavigate();

  // Mock notifications data
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'RAB Disetujui',
      message: 'Pengajuan RAB Program Bantuan Pangan Sleman telah disetujui',
      type: 'success',
      category: 'RAB',
      timestamp: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
      read: false,
      onClick: () => navigate('/admin-kabupaten/pengajuan')
    },
    {
      id: 2,
      title: 'Peringatan Anomali',
      message: 'Terdeteksi pola pengeluaran tidak wajar di Kabupaten Bantul',
      type: 'warning',
      category: 'Monitoring',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      read: false,
      onClick: () => navigate('/admin-kabupaten/monitoring')
    },
    {
      id: 3,
      title: 'Laporan Baru',
      message: 'Ada 3 laporan masyarakat baru yang perlu ditinjau',
      type: 'info',
      category: 'Laporan',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
      read: true,
      onClick: () => navigate('/admin-kabupaten/pengaduan')
    },
    {
      id: 4,
      title: 'Audit Compliance',
      message: 'Jadwal audit compliance kuartal mendatang telah tersedia',
      type: 'alert',
      category: 'Compliance',
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
      read: true,
      onClick: () => navigate('/admin-kabupaten/compliance')
    }
  ]);

  const getUserRoleText = () => {
    switch(userRole) {
      case 'admin_pusat':
        return 'Kementerian Sosial';
      case 'admin_daerah':
        return 'Pemerintah Daerah';
      case 'masyarakat':
        return 'Portal Transparansi';
      default:
        return 'Kementerian Sosial';
    }
  };

  const getUserName = () => {
    switch(userRole) {
      case 'admin_pusat':
        return 'Ahmad Wijaya';
      case 'admin_daerah':
        return 'Budi Santoso';
      case 'masyarakat':
        return 'Pengguna Publik';
      default:
        return 'Admin Pusat';
    }
  };

  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, read: true })));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  const userMenuItems = [
    {
      label: 'Profil Saya',
      icon: User,
      onClick: () => navigate('/admin-kabupaten/profile')
    },
    {
      label: 'Pengaturan',
      icon: Settings,
      onClick: () => navigate('/admin-kabupaten/settings')
    },
    {
      label: 'Keluar',
      icon: LogOut,
      onClick: () => {
        // Handle logout logic
        console.log('Logout clicked');
        navigate('/login');
      }
    }
  ];

  return (
    <>
      <div className="w-full bg-white border-b border-gray-200">
        <div className="flex items-center justify-between px-4 sm:px-6 py-3">
          {/* Left Section */}
          <div className="flex items-center gap-3">
            <button
              onClick={toggleSidebar}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Menu size={20} className="text-gray-600" />
            </button>
            
            {/* Search Bar */}
            <div className="relative hidden md:block">
              <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Cari data, laporan, atau daerah..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64 text-sm"
              />
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-3">
            {/* Notifications */}
            <div className="relative">
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <Bell size={20} className="text-gray-600" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>
            </div>

            {/* User Info */}
            <div className="relative">
              <button 
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-3 pl-3 border-l border-gray-200 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-medium text-gray-900">
                    {getUserName()}
                  </p>
                  <p className="text-xs text-gray-500 truncate max-w-[160px]">
                    {getUserRoleText()}
                  </p>
                </div>
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <User size={16} className="text-white" />
                </div>
              </button>

              {/* User Dropdown Menu */}
              {showUserMenu && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-40">
                  {userMenuItems.map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={index}
                        onClick={() => {
                          item.onClick();
                          setShowUserMenu(false);
                        }}
                        className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        <Icon size={16} className="text-gray-400" />
                        {item.label}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Notification Modal */}
      <NotificationModal
        isOpen={showNotifications}
        onClose={() => setShowNotifications(false)}
        notifications={notifications}
      />

      {/* Overlay for dropdowns */}
      {(showNotifications || showUserMenu) && (
        <div 
          className="fixed inset-0 z-30"
          onClick={() => {
            setShowNotifications(false);
            setShowUserMenu(false);
          }}
        />
      )}
    </>
  );
};

export default AdminPusatTopBar;