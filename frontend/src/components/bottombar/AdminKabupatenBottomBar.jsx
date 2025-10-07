import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard,
  FileText,
  Activity,
  BarChart3,
  User,
  CheckCircle
} from 'lucide-react';

function AdminKabupatenBottomBar() {
  const location = useLocation();
  const navigate = useNavigate();

  // Get active tab from current path
  const getActiveTab = () => {
    const path = location.pathname;
    if (path.includes('/dashboard')) return 'dashboard';
    if (path.includes('/pengajuan')) return 'pengajuan';
    if (path.includes('/monitoring')) return 'monitoring';
    if (path.includes('/analytics')) return 'analytics';
    if (path.includes('/profile')) return 'profile';
    return 'dashboard';
  };

  const activeTab = getActiveTab();

  // Bottom bar menu items - 5 menu rata
  const menuItems = [
    { 
      id: 'dashboard', 
      label: 'Home', 
      icon: LayoutDashboard, 
      path: '/admin-kabupaten/dashboard'
    },
    { 
      id: 'pengajuan', 
      label: 'Review', 
      icon: CheckCircle, 
      path: '/admin-kabupaten/pengajuan',
      badge: '12'
    },
    { 
      id: 'monitoring', 
      label: 'Monitor', 
      icon: Activity, 
      path: '/admin-kabupaten/monitoring'
    },
    { 
      id: 'analytics', 
      label: 'Stats', 
      icon: BarChart3, 
      path: '/admin-kabupaten/analytics'
    },
    { 
      id: 'profile', 
      label: 'Profile', 
      icon: User, 
      path: '/admin-kabupaten/profile'
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
            ? 'bg-blue-50 text-blue-600' 
            : 'text-gray-500 hover:bg-blue-50 hover:text-blue-600'
          }
        `}>
          <IconComponent className={`w-5 h-5 transition-transform duration-300 ${
            isActive ? 'scale-110' : ''
          }`} />
        </div>
        
        {/* Label */}
        <span className={`text-xs font-medium transition-all duration-300 ${
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

export default AdminKabupatenBottomBar;