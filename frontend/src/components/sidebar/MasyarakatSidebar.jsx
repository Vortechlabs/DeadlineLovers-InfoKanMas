import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Home,
  Eye,
  CheckCircle,
  MessageSquare,
  Star,
  AlertCircle,
  ChartBar,
  Heart,
  Wrench,
  Building,
  ChevronRight,
  HelpCircle,
  User,
  LogOut,
  Phone,
  QrCode,
  FileText,
  MapPin,
  Clock,
} from "lucide-react";

function MasyarakatSidebar({ sidebarCollapsed, setSidebarCollapsed }) {
  const location = useLocation();
  const navigate = useNavigate();

  // Get active tab from current path
  const getActiveTab = () => {
    const path = location.pathname;
    if (path.includes("/dashboard")) return "dashboard";
    if (path.includes("/program")) return "program";
    if (path.includes("/infrastruktur")) return "infrastruktur";
    if (path.includes("/bansos")) return "bansos";
    if (path.includes("/konfirmasi")) return "konfirmasi";
    if (path.includes("/rating")) return "rating";
    if (path.includes("/laporan")) return "laporan";
    if (path.includes("/pemantauan")) return "pemantauan";
    if (path.includes("/scan-qr")) return "scan-qr";
    if (path.includes("/verifikasi")) return "verifikasi";
    if (path.includes("/profile")) return "profile";
    return "dashboard";
  };

  const activeTab = getActiveTab();

  const menuItems = [
    {
      category: "Dashboard & Pemantauan",
      items: [
        {
          id: "dashboard",
          label: "Dashboard",
          icon: Home,
          path: "/masyarakat/dashboard",
          active: activeTab === "dashboard",
        },
        {
          id: "program",
          label: "Semua Program",
          icon: Eye,
          path: "/masyarakat/program",
          active: activeTab === "program",
          badge: "12",
        },
        {
          id: "pemantauan",
          label: "Pemantauan",
          icon: ChartBar,
          path: "/masyarakat/pemantauan",
          active: activeTab === "pemantauan",
        },
      ],
    },
    {
      category: "Program & Infrastruktur",
      items: [
        {
          id: "bansos",
          label: "Program Bansos",
          icon: Heart,
          path: "/masyarakat/bansos",
          active: activeTab === "bansos",
          badge: "3",
        },
        {
          id: "infrastruktur",
          label: "Infrastruktur",
          icon: Wrench,
          path: "/masyarakat/infrastruktur",
          active: activeTab === "infrastruktur",
          badge: "5",
        },
      ],
    },
    {
      category: "Konfirmasi & Verifikasi",
      items: [
        {
          id: "konfirmasi",
          label: "Konfirmasi Penerimaan",
          icon: CheckCircle,
          path: "/masyarakat/konfirmasi",
          active: activeTab === "konfirmasi",
          badge: "NEW",
        },
        {
          id: "scan-qr",
          label: "Scan QR Code",
          icon: QrCode,
          path: "/masyarakat/scan-qr",
          active: activeTab === "scan-qr",
        },
        {
          id: "verifikasi",
          label: "Verifikasi Nominal",
          icon: FileText,
          path: "/masyarakat/verifikasi",
          active: activeTab === "verifikasi",
        },
      ],
    },
    {
      category: "Partisipasi & Laporan",
      items: [
        {
          id: "rating",
          label: "Beri Rating",
          icon: Star,
          path: "/masyarakat/rating",
          active: activeTab === "rating",
        },
        {
          id: "laporan",
          label: "Lapor Masalah",
          icon: AlertCircle,
          path: "/masyarakat/laporan",
          active: activeTab === "laporan",
        },
        {
          id: "status-laporan",
          label: "Status Laporan",
          icon: Clock,
          path: "/masyarakat/status-laporan",
          active: activeTab === "status-laporan",
          badge: "2",
        },
      ],
    },
  ];

  const SidebarItem = ({ item, collapsed }) => {
    const IconComponent = item.icon;

    return (
      <button
        onClick={() => navigate(item.path)}
        className={`w-full flex items-center ${
          collapsed ? "justify-center px-3" : "justify-between px-4"
        } py-3 rounded-xl transition-all duration-300 group relative ${
          item.active
            ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/30"
            : "text-gray-600 hover:bg-gray-50 hover:text-blue-600"
        }`}
      >
        <div className="flex items-center space-x-3">
          <IconComponent
            className={`${collapsed ? "w-5 h-5" : "w-5 h-5"} flex-shrink-0 ${
              item.active
                ? "text-white"
                : "text-gray-400 group-hover:text-blue-600 group-hover:scale-[1.1] group-hover:rotate-6"
            }`}
          />
          {!collapsed && (
            <span
              className={`font-medium text-sm ${
                item.active ? "font-semibold" : ""
              }`}
            >
              {item.label}
            </span>
          )}
        </div>

        {!collapsed && item.badge && (
          <span
            className={`px-2.5 py-1 text-xs rounded-full font-bold min-w-6 text-center ${
              item.active
                ? "bg-white/20 text-white"
                : item.badge === "NEW"
                ? "bg-orange-100 text-orange-700"
                : "bg-blue-50 text-blue-600"
            }`}
          >
            {item.badge}
          </span>
        )}

        {collapsed && (
          <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 whitespace-nowrap z-50">
            {item.label}
            {item.badge && (
              <span className="ml-1 text-yellow-300">({item.badge})</span>
            )}
          </div>
        )}
      </button>
    );
  };

  return (
    <div className="h-full bg-white/80 backdrop-blur-md border-r border-gray-200/50 flex flex-col">
      {/* Sidebar Header */}
      <div
        className={`p-6 border-b border-gray-200/30 flex items-center ${
          sidebarCollapsed ? "justify-center" : "justify-between"
        }`}
      >
        {!sidebarCollapsed && (
          <div className="flex items-center space-x-2">
            <img src="/logo.png" alt="logo" className="h-10 w-10" />
            <div>
              <h1 className="text-xl font-bold text-gray-800">InfoKanMas</h1>
              <p className="text-xs text-gray-500">Masyarakat</p>
            </div>
          </div>
        )}

        {sidebarCollapsed && (
          <img src="/logo.png" alt="logo" className="h-10 w-10" />
        )}

        <button
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ChevronRight
            className={`w-4 h-4 text-gray-600 transition-transform duration-300 ${
              sidebarCollapsed ? "rotate-180" : ""
            }`}
          />
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
                <SidebarItem
                  key={item.id}
                  item={item}
                  collapsed={sidebarCollapsed}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions - Only show when not collapsed */}
      {!sidebarCollapsed && (
        <div className="px-4 pb-4">
          <div className="bg-blue-50 rounded-xl p-4 border border-blue-200/30">
            <h4 className="text-sm font-semibold text-blue-900 mb-2">
              Akses Cepat
            </h4>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => navigate("/masyarakat/konfirmasi")}
                className="flex items-center justify-center space-x-1 p-2 bg-white rounded-lg border border-blue-200 hover:bg-blue-100 transition-colors"
              >
                <Phone className="w-4 h-4 text-blue-600" />
                <span className="text-xs text-blue-700 font-medium">SMS</span>
              </button>
              <button
                onClick={() => navigate("/masyarakat/scan-qr")}
                className="flex items-center justify-center space-x-1 p-2 bg-white rounded-lg border border-blue-200 hover:bg-blue-100 transition-colors"
              >
                <QrCode className="w-4 h-4 text-blue-600" />
                <span className="text-xs text-blue-700 font-medium">QR</span>
              </button>
              <button
                onClick={() => navigate("/masyarakat/laporan")}
                className="flex items-center justify-center space-x-1 p-2 bg-white rounded-lg border border-blue-200 hover:bg-blue-100 transition-colors"
              >
                <AlertCircle className="w-4 h-4 text-blue-600" />
                <span className="text-xs text-blue-700 font-medium">Lapor</span>
              </button>
              <button
                onClick={() => navigate("/masyarakat/rating")}
                className="flex items-center justify-center space-x-1 p-2 bg-white rounded-lg border border-blue-200 hover:bg-blue-100 transition-colors"
              >
                <Star className="w-4 h-4 text-blue-600" />
                <span className="text-xs text-blue-700 font-medium">
                  Rating
                </span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sidebar Footer */}
      <div className="border-t border-gray-200/30 p-4">
        <div className="space-y-2">
          <button
            className={`w-full flex items-center ${
              sidebarCollapsed ? "justify-center px-3" : "justify-start px-4"
            } py-3 text-gray-600 hover:bg-gray-100/80 rounded-xl transition-all duration-300 group relative`}
          >
            <HelpCircle className="w-5 h-5 flex-shrink-0" />
            {!sidebarCollapsed && (
              <span className="ml-3 font-medium text-sm">
                Bantuan & Panduan
              </span>
            )}
            {sidebarCollapsed && (
              <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 whitespace-nowrap z-50">
                Bantuan
              </div>
            )}
          </button>

          <button
            className={`w-full flex items-center ${
              sidebarCollapsed ? "justify-center px-3" : "justify-start px-4"
            } py-3 text-red-600 hover:bg-red-50 rounded-xl transition-all duration-300 group relative`}
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            {!sidebarCollapsed && (
              <span className="ml-3 font-medium text-sm">Keluar</span>
            )}
            {sidebarCollapsed && (
              <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 whitespace-nowrap z-50">
                Keluar
              </div>
            )}
          </button>
        </div>

        {!sidebarCollapsed && (
          <div className="mt-4 p-3 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-200/30">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900 truncate">
                  Warga Masyarakat
                </p>
                <p className="text-xs text-gray-500 truncate">Desa Sukamaju</p>
                <p className="text-xs text-blue-600 font-medium mt-1">
                  Aktif • Read Only
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MasyarakatSidebar;
