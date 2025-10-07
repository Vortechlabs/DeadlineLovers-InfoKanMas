import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard,
  FileText,
  Activity,
  BarChart3,
  User,
  Home,
  Users,
  DollarSign,
  MapPin
} from 'lucide-react';

function AdminDesaBottomBar() {
  const location = useLocation();
  const navigate = useNavigate();

  // Get active tab from current path
  const getActiveTab = () => {
    const path = location.pathname;
    if (path.includes('/dashboard')) return 'dashboard';
    if (path.includes('/proyek')) return 'proyek';
    if (path.includes('/anggaran')) return 'anggaran';
    if (path.includes('/warga')) return 'warga';
    if (path.includes('/lokasi')) return 'lokasi';
    return 'dashboard';
  };

  const activeTab = getActiveTab();

  // Bottom bar menu items khusus untuk admin desa
  const menuItems = [
    { 
      id: 'dashboard', 
      label: 'Home', 
      icon: LayoutDashboard, 
      path: '/admin-desa/dashboard'
    },
    { 
      id: 'proyek', 
      label: 'Proyek', 
      icon: Home, 
      path: '/admin-desa/proyek',
      badge: '8'
    },
    { 
      id: 'anggaran', 
      label: 'Dana', 
      icon: DollarSign, 
      path: '/admin-desa/anggaran'
    },
    { 
      id: 'warga', 
      label: 'Warga', 
      icon: Users, 
      path: '/admin-desa/warga',
      badge: '3'
    },
    { 
      id: 'lokasi', 
      label: 'Lokasi', 
      icon: MapPin, 
      path: '/admin-desa/lokasi'
    },
  ];

  const BottomBarItem = ({ item }) => {
    const IconComponent = item.icon;
    const isActive = activeTab === item.id;
    
    return (
      <button
        onClick={() => navigate(item.path)}
        className="flex flex-col items-center justify-center space-y-1 transition-all duration-300 group relative flex-1"
      >
        {/* Badge untuk notifikasi */}
        {item.badge && (
          <span className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold z-10 border-2 border-white min-w-5">
            {item.badge}
          </span>
        )}
        
        {/* Icon Container */}
        <div className={`
          relative w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300
          ${isActive 
            ? 'bg-green-50 text-green-600' 
            : 'text-gray-500 hover:bg-green-50 hover:text-green-600'
          }
        `}>
          <IconComponent className={`w-5 h-5 transition-transform duration-300 ${
            isActive ? 'scale-110' : ''
          }`} />
        </div>
        
        {/* Label */}
        <span className={`text-xs font-medium transition-all duration-300 ${
          isActive 
            ? 'text-green-600 font-semibold' 
            : 'text-gray-600'
        }`}>
          {item.label}
        </span>
      </button>
    );
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden">
      {/* Background */}
      <div className="bg-white border-t border-gray-200">
        {/* Main container */}
        <div className="w-full px-2 pb-3 pt-2">
          <div className="flex items-center justify-between">
            {menuItems.map((item) => (
              <BottomBarItem key={item.id} item={item} />
            ))}
          </div>
        </div>
      </div>
      
      {/* Safety area untuk iPhone */}
      <div className="h-safe-bottom bg-white" />
    </div>
  );
}

export default AdminDesaBottomBar;