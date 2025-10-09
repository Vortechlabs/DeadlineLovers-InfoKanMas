import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  Home,
  Eye,
  CheckCircle,
  Star,
  AlertCircle,
  QrCode,
  Phone
} from 'lucide-react';

function MasyarakatBottomBar() {
  const location = useLocation();
  const navigate = useNavigate();

  // Get active tab from current path
  const getActiveTab = () => {
    const path = location.pathname;
    if (path.includes('/dashboard')) return 'dashboard';
    if (path.includes('/program')) return 'program';
    if (path.includes('/konfirmasi')) return 'konfirmasi';
    if (path.includes('/rating')) return 'rating';
    if (path.includes('/laporan')) return 'laporan';
    if (path.includes('/scan')) return 'scan';
    return 'dashboard';
  };

  const activeTab = getActiveTab();

  // Bottom bar menu items khusus untuk masyarakat
  const menuItems = [
    { 
      id: 'dashboard', 
      label: 'Home', 
      icon: Home, 
      path: '/masyarakat/dashboard'
    },
    { 
      id: 'program', 
      label: 'Program', 
      icon: Eye, 
      path: '/masyarakat/program',
      badge: '12'
    },
    { 
      id: 'konfirmasi', 
      label: 'Konfirmasi', 
      icon: CheckCircle, 
      path: '/masyarakat/konfirmasi',
      badge: 'NEW'
    },
    { 
      id: 'scan', 
      label: 'Scan QR', 
      icon: QrCode, 
      path: '/masyarakat/scan-qr'
    },
    { 
      id: 'rating', 
      label: 'Rating', 
      icon: Star, 
      path: '/masyarakat/rating'
    },
    { 
      id: 'laporan', 
      label: 'Lapor', 
      icon: AlertCircle, 
      path: '/masyarakat/laporan',
      badge: '2'
    },
  ];

  const BottomBarItem = ({ item }) => {
    const IconComponent = item.icon;
    const isActive = activeTab === item.id;
    
    return (
      <button
        onClick={() => navigate(item.path)}
        className="flex flex-col items-center justify-center space-y-1 transition-all duration-300 group relative flex-1 min-w-0"
      >
        {/* Badge untuk notifikasi */}
        {item.badge && (
          <span className={`absolute -top-1 left-1/2 transform -translate-x-1/2 w-5 h-5 text-white text-xs rounded-full flex items-center justify-center font-bold z-10 border-2 border-white min-w-5 ${
            item.badge === 'NEW' 
              ? 'bg-orange-500' 
              : 'bg-blue-500'
          }`}>
            {item.badge}
          </span>
        )}
        
        {/* Icon Container */}
        <div className={`
          relative w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300
          ${isActive 
            ? 'bg-blue-50 text-blue-600 shadow-sm' 
            : 'text-gray-500 hover:bg-blue-50 hover:text-blue-600'
          }
        `}>
          <IconComponent className={`w-5 h-5 transition-transform duration-300 ${
            isActive ? 'scale-110' : ''
          }`} />
        </div>
        
        {/* Label */}
        <span className={`text-xs font-medium transition-all duration-300 truncate max-w-full px-1 ${
          isActive 
            ? 'text-blue-600 font-semibold' 
            : 'text-gray-600'
        }`}>
          {item.label}
        </span>
      </button>
    );
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-20 lg:hidden">
      {/* Background dengan blur effect */}
      <div className="bg-white/95 backdrop-blur-md border-t border-gray-200/50">
        {/* Main container */}
        <div className="w-full px-1 pb-3 pt-2">
          <div className="flex items-center justify-between space-x-1">
            {menuItems.map((item) => (
              <BottomBarItem key={item.id} item={item} />
            ))}
          </div>
        </div>
      </div>
      
      {/* Safety area untuk iPhone */}
      <div className="h-safe-bottom bg-white/95" />
    </div>
  );
}

export default MasyarakatBottomBar;