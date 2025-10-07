import React from 'react';
import { 
  Home,
  FileText,
  Users,
  MapPin,
  DollarSign,
  CheckCircle,
  Clock,
  AlertCircle,
  BarChart3,
  Settings,
  LogOut,
  ChevronDown,
  Building
} from 'lucide-react';

const AdminDesaSidebar = ({ isOpen, toggleSidebar }) => {
  const menuItems = [
    {
      name: 'Dashboard',
      icon: Home,
      path: '/admin-desa',
      active: true
    },
    {
      name: 'Proyek Desa',
      icon: Building,
      path: '/admin-desa/proyek',
      submenu: [
        { name: 'Semua Proyek', path: '/admin-desa/proyek' },
        { name: 'Proyek Aktif', path: '/admin-desa/proyek/aktif' },
        { name: 'Pengajuan Baru', path: '/admin-desa/proyek/pengajuan' },
        { name: 'Laporan Progress', path: '/admin-desa/proyek/laporan' }
      ]
    },
    {
      name: 'Anggaran',
      icon: DollarSign,
      path: '/admin-desa/anggaran',
      submenu: [
        { name: 'Rencana Anggaran', path: '/admin-desa/anggaran/rencana' },
        { name: 'Realisasi', path: '/admin-desa/anggaran/realisasi' },
        { name: 'Monitoring', path: '/admin-desa/anggaran/monitoring' }
      ]
    },
    {
      name: 'Warga',
      icon: Users,
      path: '/admin-desa/warga',
      submenu: [
        { name: 'Data Warga', path: '/admin-desa/warga/data' },
        { name: 'Penerima Bansos', path: '/admin-desa/warga/bansos' },
        { name: 'Partisipasi', path: '/admin-desa/warga/partisipasi' }
      ]
    },
    {
      name: 'Dokumen',
      icon: FileText,
      path: '/admin-desa/dokumen',
      submenu: [
        { name: 'Laporan Kegiatan', path: '/admin-desa/dokumen/laporan' },
        { name: 'Dokumen Proyek', path: '/admin-desa/dokumen/proyek' },
        { name: 'Arsip Desa', path: '/admin-desa/dokumen/arsip' }
      ]
    },
    {
      name: 'Monitoring',
      icon: BarChart3,
      path: '/admin-desa/monitoring',
      submenu: [
        { name: 'Progress Fisik', path: '/admin-desa/monitoring/progress' },
        { name: 'Kualitas Pekerjaan', path: '/admin-desa/monitoring/kualitas' },
        { name: 'Pengaduan', path: '/admin-desa/monitoring/pengaduan' }
      ]
    },
    {
      name: 'Lokasi',
      icon: MapPin,
      path: '/admin-desa/lokasi',
      submenu: [
        { name: 'Peta Proyek', path: '/admin-desa/lokasi/peta' },
        { name: 'Distribusi', path: '/admin-desa/lokasi/distribusi' }
      ]
    }
  ];

  const quickStats = [
    {
      name: 'Proyek Aktif',
      value: '8',
      icon: Building,
      color: 'text-blue-600'
    },
    {
      name: 'Perlu Tindakan',
      value: '3',
      icon: AlertCircle,
      color: 'text-yellow-600'
    },
    {
      name: 'Selesai',
      value: '15',
      icon: CheckCircle,
      color: 'text-green-600'
    }
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-50
        w-80 bg-gradient-to-b from-blue-900 to-blue-800
        transform transition-transform duration-300 ease-in-out
        flex flex-col
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        
        {/* Header Sidebar */}
        <div className="p-6 border-b border-blue-700">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center">
              <Building className="w-6 h-6 text-blue-600" />
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-lg font-bold text-white truncate">
                Admin Desa
              </h1>
              <p className="text-blue-200 text-sm truncate">
                Desa Sukamaju
              </p>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="p-4 border-b border-blue-700">
          <h3 className="text-sm font-semibold text-blue-200 mb-3 px-2">
            Ringkasan Hari Ini
          </h3>
          <div className="space-y-2">
            {quickStats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="flex items-center justify-between p-2 bg-blue-800/50 rounded-lg hover:bg-blue-700/50 transition-colors">
                  <div className="flex items-center space-x-2">
                    <Icon className={`w-4 h-4 ${stat.color}`} />
                    <span className="text-sm text-blue-100">{stat.name}</span>
                  </div>
                  <span className="text-white font-semibold text-sm">{stat.value}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-1">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={index}>
                <button
                  className={`
                    w-full flex items-center justify-between p-3 rounded-xl
                    transition-all duration-200 group
                    ${item.active 
                      ? 'bg-white/10 text-white shadow-lg' 
                      : 'text-blue-100 hover:bg-white/5 hover:text-white'
                    }
                  `}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className="w-5 h-5" />
                    <span className="font-medium text-sm">{item.name}</span>
                  </div>
                  {item.submenu && (
                    <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
                  )}
                </button>
                
                {/* Submenu */}
                {item.submenu && (
                  <div className="ml-4 mt-1 space-y-1 pl-7 border-l border-blue-700">
                    {item.submenu.map((subItem, subIndex) => (
                      <button
                        key={subIndex}
                        className="
                          w-full text-left p-2 rounded-lg text-sm
                          text-blue-200 hover:text-white hover:bg-white/5
                          transition-colors duration-200
                        "
                      >
                        {subItem.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Bottom Section */}
        <div className="p-4 border-t border-blue-700 space-y-2">
          <button className="
            w-full flex items-center space-x-3 p-3 rounded-xl
            text-blue-100 hover:bg-white/5 hover:text-white
            transition-colors duration-200
          ">
            <Settings className="w-5 h-5" />
            <span className="font-medium text-sm">Pengaturan</span>
          </button>
          
          <button className="
            w-full flex items-center space-x-3 p-3 rounded-xl
            text-red-200 hover:bg-red-500/20 hover:text-red-100
            transition-colors duration-200
          ">
            <LogOut className="w-5 h-5" />
            <span className="font-medium text-sm">Keluar</span>
          </button>

          {/* User Info */}
          <div className="pt-4 border-t border-blue-700">
            <div className="flex items-center space-x-3 p-2">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <Users className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">
                  Admin Desa
                </p>
                <p className="text-xs text-blue-200 truncate">
                  Sukamaju
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDesaSidebar;