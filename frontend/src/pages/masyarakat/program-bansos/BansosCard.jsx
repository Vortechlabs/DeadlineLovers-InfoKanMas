import React from 'react';
import { 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  Users, 
  DollarSign, 
  Calendar,
  MapPin,
  ChevronRight,
  Package,
  BookOpen,
  Heart,
  TrendingUp
} from 'lucide-react';

const BansosCard = ({ bansos, viewMode = 'grid', onClick }) => {
  const getIcon = (iconName) => {
    const icons = {
      Package: Package,
      DollarSign: DollarSign,
      BookOpen: BookOpen,
      Heart: Heart,
      TrendingUp: TrendingUp,
      Users: Users
    };
    return icons[iconName] || Package;
  };

  const getStatusColor = (status) => {
    const colors = {
      'akan_datang': 'bg-blue-100 text-blue-700 border-blue-200',
      'berjalan': 'bg-green-100 text-green-700 border-green-200',
      'selesai': 'bg-gray-100 text-gray-700 border-gray-200'
    };
    return colors[status] || 'bg-gray-100 text-gray-700';
  };

  const getPenerimaStatus = (statusPenerima) => {
    const statusMap = {
      terdaftar: {
        label: "Terdaftar",
        color: "bg-blue-100 text-blue-700 border-blue-200",
        icon: Clock,
        description: "Anda terdaftar sebagai penerima"
      },
      diterima: {
        label: "Telah Diterima",
        color: "bg-green-100 text-green-700 border-green-200",
        icon: CheckCircle,
        description: "Bantuan telah Anda terima"
      },
      belum_terdaftar: {
        label: "Belum Terdaftar",
        color: "bg-gray-100 text-gray-700 border-gray-200",
        icon: AlertCircle,
        description: "Anda belum terdaftar dalam program ini"
      }
    };
    return statusMap[statusPenerima] || statusMap.belum_terdaftar;
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const IconComponent = getIcon(bansos.icon);
  const statusPenerima = getPenerimaStatus(bansos.statusPenerima);
  const StatusIcon = statusPenerima.icon;

  if (viewMode === 'list') {
    return (
      <div 
        onClick={onClick}
        className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 cursor-pointer group"
      >
        <div className="flex items-start space-x-4">
          {/* Icon */}
          <div className={`w-14 h-14 bg-gradient-to-br ${bansos.warna} rounded-xl flex items-center justify-center flex-shrink-0`}>
            <IconComponent className="w-6 h-6 text-white" />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800 group-hover:text-orange-600 transition-colors line-clamp-1 text-lg">
                  {bansos.nama}
                </h3>
                <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                  {bansos.deskripsi}
                </p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-orange-600 transition-colors flex-shrink-0 mt-1" />
            </div>

            {/* Status Badges */}
            <div className="flex flex-wrap gap-2 mb-3">
              <span className={`px-3 py-1 text-xs font-medium rounded-full border ${getStatusColor(bansos.status)}`}>
                {bansos.status.replace('_', ' ')}
              </span>
              <span className={`px-3 py-1 text-xs font-medium rounded-full border ${statusPenerima.color}`}>
                <StatusIcon className="w-3 h-3 inline mr-1" />
                {statusPenerima.label}
              </span>
              {bansos.perluKonfirmasi && (
                <span className="px-3 py-1 bg-orange-100 text-orange-700 text-xs font-medium rounded-full border border-orange-200">
                  Perlu Konfirmasi
                </span>
              )}
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div className="flex items-center space-x-2">
                <DollarSign className="w-4 h-4 text-green-500" />
                <span className="text-gray-600">{formatCurrency(bansos.nominal)}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4 text-blue-500" />
                <span className="text-gray-600">{bansos.penerimaTerkonfirmasi}/{bansos.totalPenerima}</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-purple-500" />
                <span className="text-gray-600 truncate">{bansos.lokasi}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-orange-500" />
                <span className="text-gray-600">{bansos.tanggalMulai}</span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mt-4">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Progress Penyaluran</span>
                <span>{bansos.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="h-2 rounded-full transition-all duration-500"
                  style={{ 
                    width: `${bansos.progress}%`,
                    background: `linear-gradient(to right, ${bansos.warna.replace('from-', '').replace('to-', '').split(' ')[0]}, ${bansos.warna.replace('from-', '').replace('to-', '').split(' ')[1]})`
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Grid View (Default)
  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 cursor-pointer group"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 bg-gradient-to-br ${bansos.warna} rounded-xl flex items-center justify-center`}>
          <IconComponent className="w-6 h-6 text-white" />
        </div>
        <div className="flex flex-col items-end space-y-2">
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(bansos.status)}`}>
            {bansos.status.replace('_', ' ')}
          </span>
          {bansos.perluKonfirmasi && (
            <span className="px-2 py-1 bg-orange-100 text-orange-700 text-xs font-medium rounded-full">
              Perlu Konfirmasi
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <h3 className="font-semibold text-gray-800 mb-2 group-hover:text-orange-600 transition-colors line-clamp-2">
        {bansos.nama}
      </h3>
      <p className="text-sm text-gray-600 mb-4 line-clamp-2">
        {bansos.deskripsi}
      </p>

      {/* Status Penerima */}
      <div className={`mb-4 p-3 rounded-xl border ${statusPenerima.color}`}>
        <div className="flex items-center space-x-2">
          <StatusIcon className="w-4 h-4" />
          <div>
            <p className="text-sm font-medium">{statusPenerima.label}</p>
            <p className="text-xs opacity-75">{statusPenerima.description}</p>
          </div>
        </div>
      </div>

      {/* Info Grid */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="text-center p-2 bg-gray-50 rounded-lg">
          <p className="text-xs text-gray-600">Nominal</p>
          <p className="text-sm font-bold text-green-600">
            {formatCurrency(bansos.nominal)}
          </p>
        </div>
        <div className="text-center p-2 bg-gray-50 rounded-lg">
          <p className="text-xs text-gray-600">Penerima</p>
          <p className="text-sm font-bold text-blue-600">
            {bansos.penerimaTerkonfirmasi}/{bansos.totalPenerima}
          </p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex justify-between text-sm text-gray-600 mb-1">
          <span>Progress</span>
          <span>{bansos.progress}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="h-2 rounded-full transition-all duration-500"
            style={{ 
              width: `${bansos.progress}%`,
              background: `linear-gradient(to right, ${bansos.warna.replace('from-', '').replace('to-', '').split(' ')[0]}, ${bansos.warna.replace('from-', '').replace('to-', '').split(' ')[1]})`
            }}
          ></div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between text-sm text-gray-600">
        <div className="flex items-center space-x-1">
          <MapPin className="w-4 h-4" />
          <span className="truncate max-w-[100px]">{bansos.lokasi}</span>
        </div>
        <div className="flex items-center space-x-1">
          <Calendar className="w-4 h-4" />
          <span>{bansos.tanggalMulai}</span>
        </div>
      </div>

      {/* Action Indicator */}
      {bansos.perluKonfirmasi && bansos.statusPenerima === 'terdaftar' && (
        <div className="mt-3 p-2 bg-orange-50 border border-orange-200 rounded-lg">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
            <p className="text-xs text-orange-700 font-medium">
              Klik untuk konfirmasi penerimaan
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default BansosCard;