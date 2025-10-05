import React from 'react';
import { Menu, Bell, Search, User } from 'lucide-react';

const AdminPusatTopBar = ({ toggleSidebar, userRole = 'admin_pusat' }) => {
  const getUserRoleText = () => {
    switch(userRole) {
      case 'admin_pusat':
        return 'Admin Pusat - Kementerian Sosial';
      case 'admin_daerah':
        return 'Admin Daerah - Pemerintah Daerah';
      case 'masyarakat':
        return 'Masyarakat - Portal Transparansi';
      default:
        return 'Admin Pusat - Kementerian Sosial';
    }
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 z-30">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Left Section */}
        <div className="flex items-center gap-4">
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
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* Notifications */}
          <button className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors">
            <Bell size={20} className="text-gray-600" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
              3
            </span>
          </button>

          {/* User Info */}
          <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-gray-900">
                {userRole === 'admin_pusat' ? 'Admin Pusat' : 
                 userRole === 'admin_daerah' ? 'Admin Daerah' : 'Masyarakat'}
              </p>
              <p className="text-xs text-gray-500">
                {getUserRoleText()}
              </p>
            </div>
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <User size={16} className="text-white" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminPusatTopBar;