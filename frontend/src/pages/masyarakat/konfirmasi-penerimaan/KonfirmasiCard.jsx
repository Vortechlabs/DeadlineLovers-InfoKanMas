import React from 'react';
import { 
  CheckCircle, 
  Clock, 
  AlertCircle,
  DollarSign,
  Calendar,
  MapPin,
  Users,
  ChevronRight,
  Package,
  BookOpen,
  Heart,
  TrendingUp
} from 'lucide-react';

const KonfirmasiCard = ({ bansos, viewMode = 'grid', onClick }) => {
  const getIcon = (iconName) => {
    const icons = {
      Package: Package,
      DollarSign: DollarSign,
      BookOpen: BookOpen,
      Heart: Heart,
      TrendingUp: TrendingUp
    };
    return icons[iconName] || Package;
  };

  const getStatusInfo = (status) => {
    const statusMap = {
      'perlu_konfirmasi': {
        label: "Perlu Konfirmasi",
        color: "bg-orange-100 text-orange-700 border-orange-200",
        icon: AlertCircle,
        description: "Segera konfirmasi penerimaan",
        urgency: "high"
      },
      'terkonfirmasi': {
        label: "Terkonfirmasi",
        color: "bg-green-100 text-green-700 border-green-200",
        icon: CheckCircle,
        description: "Telah dikonfirmasi",
        urgency: "none"
      },
      'kedaluwarsa': {
        label: "Kedaluwarsa",
        color: "bg-gray-100 text-gray-700 border-gray-200",
        icon: Clock,
        description: "Batas konfirmasi telah lewat",
        urgency: "expired"
      }
    };
    return statusMap[status] || statusMap.perlu_konfirmasi;
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const getDaysRemaining = (batasKonfirmasi) => {
    const today = new Date();
    const batas = new Date(batasKonfirmasi);
    const diffTime = batas - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const IconComponent = getIcon(bansos.icon);
  const statusInfo = getStatusInfo(bansos.status);
  const StatusIcon = statusInfo.icon;
  const daysRemaining = bansos.status === 'perlu_konfirmasi' ? getDaysRemaining(bansos.batasKonfirmasi) : 0;

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
              <div className="text-right">
                <p className="text-lg font-bold text-green-600">
                  {formatCurrency(bansos.nominal)}
                </p>
                <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-orange-600 transition-colors ml-auto mt-1" />
              </div>
            </div>

            {/* Status Badges */}
            <div className="flex flex-wrap gap-2 mb-3">
              <span className={`px-3 py-1 text-xs font-medium rounded-full border ${statusInfo.color}`}>
                <StatusIcon className="w-3 h-3 inline mr-1" />
                {statusInfo.label}
              </span>
              <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full">
                {bansos.jenis}
              </span>
              {bansos.status === 'perlu_konfirmasi' && (
                <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                  daysRemaining <= 2 
                    ? 'bg-red-100 text-red-700 border-red-200' 
                    : 'bg-orange-100 text-orange-700 border-orange-200'
                }`}>
                  ⏳ {daysRemaining} hari lagi
                </span>
              )}
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-blue-500" />
                <span className="text-gray-600">{bansos.tanggalDistribusi}</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-purple-500" />
                <span className="text-gray-600 truncate">{bansos.lokasiPenyaluran}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4 text-green-500" />
                <span className="text-gray-600">{bansos.penanggungJawab}</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-orange-500" />
                <span className="text-gray-600">
                  {bansos.metodeKonfirmasi.map(m => m.toUpperCase()).join(', ')}
                </span>
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
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusInfo.color}`}>
            <StatusIcon className="w-3 h-3 inline mr-1" />
            {statusInfo.label}
          </span>
          {bansos.status === 'perlu_konfirmasi' && daysRemaining <= 2 && (
            <span className="px-2 py-1 bg-red-100 text-red-700 text-xs font-medium rounded-full">
              ⚠️ Segera
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

      {/* Nominal */}
      <div className="mb-4 p-3 bg-green-50 rounded-xl border border-green-200">
        <p className="text-sm text-gray-600 mb-1">Nominal Bantuan</p>
        <p className="text-xl font-bold text-green-600">
          {formatCurrency(bansos.nominal)}
        </p>
      </div>

      {/* Info Grid */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="text-center p-2 bg-gray-50 rounded-lg">
          <p className="text-xs text-gray-600">Distribusi</p>
          <p className="text-sm font-bold text-blue-600 truncate">
            {bansos.tanggalDistribusi}
          </p>
        </div>
        <div className="text-center p-2 bg-gray-50 rounded-lg">
          <p className="text-xs text-gray-600">Batas</p>
          <p className="text-sm font-bold text-orange-600 truncate">
            {bansos.batasKonfirmasi}
          </p>
        </div>
      </div>

      {/* Urgency Indicator */}
      {bansos.status === 'perlu_konfirmasi' && (
        <div className={`mt-3 p-2 rounded-lg border ${
          daysRemaining <= 1 
            ? 'bg-red-50 border-red-200' 
            : daysRemaining <= 3
            ? 'bg-orange-50 border-orange-200'
            : 'bg-blue-50 border-blue-200'
        }`}>
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${
              daysRemaining <= 1 
                ? 'bg-red-500 animate-pulse' 
                : daysRemaining <= 3
                ? 'bg-orange-500'
                : 'bg-blue-500'
            }`}></div>
            <p className={`text-xs font-medium ${
              daysRemaining <= 1 
                ? 'text-red-700' 
                : daysRemaining <= 3
                ? 'text-orange-700'
                : 'text-blue-700'
            }`}>
              {daysRemaining <= 1 
                ? 'Batas konfirmasi besok!' 
                : `Sisa ${daysRemaining} hari untuk konfirmasi`
              }
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default KonfirmasiCard;