import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Menu, 
  X, 
  User,
  LogOut,
  Settings,
  Building2,
  Home,
  MapPin,
  Users,
  Shield
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    setIsOpen(false);
  };

  const getRoleBadge = (role) => {
    const roleConfig = {
      admin_kabupaten: { label: 'Admin Kabupaten', variant: 'default' },
      admin_dinas: { label: 'Admin Dinas', variant: 'secondary' },
      admin_kecamatan: { label: 'Admin Kecamatan', variant: 'outline' },
      admin_desa: { label: 'Admin Desa', variant: 'destructive' },
      user: { label: 'Masyarakat', variant: 'default' }
    };
    
    return roleConfig[role] || { label: role, variant: 'default' };
  };

  const getDashboardLink = (role) => {
    const dashboardLinks = {
      admin_kabupaten: '/admin-kabupaten/dashboard',
      admin_dinas: '/admin-dinas/dashboard',
      admin_kecamatan: '/admin-kecamatan/dashboard',
      admin_desa: '/admin-desa/dashboard',
      user: '/masyarakat/dashboard'
    };
    
    return dashboardLinks[role] || '/';
  };

  const getRoleIcon = (role) => {
    const icons = {
      admin_kabupaten: Shield,
      admin_dinas: Building2,
      admin_kecamatan: MapPin,
      admin_desa: Home,
      user: Users
    };
    
    return icons[role] || User;
  };

  const getInitials = (nama) => {
    return nama
      ?.split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2) || 'U';
  };

  // Navigation items berdasarkan role
  const getNavigationItems = () => {
    const baseItems = [
      { to: "/", label: "Beranda", icon: Home }
    ];

    if (!isAuthenticated) {
      return baseItems;
    }

    const roleSpecificItems = {
      admin_kabupaten: [
        { to: "/admin-kabupaten/dashboard", label: "Dashboard", icon: Shield },
        { to: "/admin-kabupaten/monitoring", label: "Monitoring", icon: MapPin },
        { to: "/admin-kabupaten/laporan", label: "Laporan", icon: Users }
      ],
      admin_dinas: [
        { to: "/admin-dinas/dashboard", label: "Dashboard", icon: Building2 },
        { to: "/admin-dinas/program", label: "Program", icon: Users },
        { to: "/admin-dinas/anggaran", label: "Anggaran", icon: Shield }
      ],
      admin_kecamatan: [
        { to: "/admin-kecamatan/dashboard", label: "Dashboard", icon: MapPin },
        { to: "/admin-kecamatan/verifikasi", label: "Verifikasi", icon: Shield },
        { to: "/admin-kecamatan/desa", label: "Desa", icon: Home }
      ],
      admin_desa: [
        { to: "/admin-desa/dashboard", label: "Dashboard", icon: Home },
        { to: "/admin-desa/program", label: "Program", icon: Users },
        { to: "/admin-desa/laporan", label: "Laporan", icon: Shield }
      ],
      user: [
        { to: "/masyarakat/dashboard", label: "Dashboard", icon: Users },
        { to: "/masyarakat/program", label: "Program", icon: MapPin },
        { to: "/masyarakat/lapor", label: "Lapor", icon: Shield }
      ]
    };

    return [...baseItems, ...(roleSpecificItems[user?.role] || [])];
  };

  const navigationItems = getNavigationItems();

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-50 w-full">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo Section */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="flex items-center space-x-2">
              <img src="/logo.png" alt="logo" className='h-10 w-10' />
              <div>
                <h1 className="text-xl font-bold text-gray-800">InfoKanMas</h1>
                <p className="text-xs text-gray-500">Terbuka dan Terpercaya</p>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Navigation Links */}
            {navigationItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition duration-200"
                >
                  <span>{item.label}</span>
                </Link>
              );
            })}

            {/* Authentication Section */}
            <div className="flex items-center space-x-4 ml-4">
              {isAuthenticated ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="" alt={user?.nama} />
                        <AvatarFallback className="bg-blue-100 text-blue-600">
                          {getInitials(user?.nama)}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{user?.nama}</p>
                        <p className="text-xs leading-none text-gray-600">
                          {user?.email}
                        </p>
                        <Badge variant={getRoleBadge(user?.role).variant} className="mt-1 w-fit">
                          {getRoleBadge(user?.role).label}
                        </Badge>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => navigate(getDashboardLink(user?.role))}>
                      <User className="mr-2 h-4 w-4" />
                      <span>Dashboard</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate('/profile')}>
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link to="/auth/login">
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    Masuk
                  </Button>
                </Link>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            {isAuthenticated && (
              <Badge variant={getRoleBadge(user?.role).variant} className="hidden sm:flex">
                {getRoleBadge(user?.role).label}
              </Badge>
            )}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white">
              {/* Navigation Links */}
              {navigationItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    className="flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                    onClick={() => setIsOpen(false)}
                  >
                    <IconComponent size={18} />
                    <span>{item.label}</span>
                  </Link>
                );
              })}

              {/* Mobile Authentication */}
              <div className="pt-4 pb-3 border-t border-gray-200">
                {isAuthenticated ? (
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 px-3 py-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="" alt={user?.nama} />
                        <AvatarFallback className="bg-blue-100 text-blue-600 text-xs">
                          {getInitials(user?.nama)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {user?.nama}
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                          {user?.email}
                        </p>
                        <Badge variant={getRoleBadge(user?.role).variant} className="mt-1">
                          {getRoleBadge(user?.role).label}
                        </Badge>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => {
                          navigate(getDashboardLink(user?.role));
                          setIsOpen(false);
                        }}
                      >
                        Dashboard
                      </Button>
                      <Button 
                        variant="destructive" 
                        size="sm"
                        onClick={handleLogout}
                      >
                        <LogOut className="h-4 w-4 mr-1" />
                        Keluar
                      </Button>
                    </div>
                  </div>
                ) : (
                  <Link to="/auth/login" onClick={() => setIsOpen(false)}>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">
                      Masuk
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}