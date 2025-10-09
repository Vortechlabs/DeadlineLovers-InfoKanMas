import React from 'react';
import { 
  Heart, 
  Wrench, 
  Building, 
  Users, 
  TrendingUp, 
  DollarSign,
  Star,
  MapPin,
  Calendar,
  User,
  ChevronRight
} from 'lucide-react';

const ProgramCard = ({ program, viewMode, onClick }) => {
  const getIcon = (iconName) => {
    const icons = {
      Heart: Heart,
      Wrench: Wrench,
      Building: Building,
      Users: Users,
      TrendingUp: TrendingUp,
      DollarSign: DollarSign
    };
    return icons[iconName] || Heart;
  };

  const IconComponent = getIcon(program.icon);
  
  const getStatusColor = (status) => {
    const colors = {
      'akan datang': 'bg-blue-100 text-blue-700',
      'berjalan': 'bg-green-100 text-green-700',
      'hampir selesai': 'bg-orange-100 text-orange-700',
      'selesai': 'bg-gray-100 text-gray-700'
    };
    return colors[status] || 'bg-gray-100 text-gray-700';
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  if (viewMode === 'list') {
    return (
      <div 
        onClick={onClick}
        className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 cursor-pointer group"
      >
        <div className="flex items-start space-x-4">
          {/* Icon */}
          <div className={`w-14 h-14 bg-gradient-to-br ${program.warna} rounded-xl flex items-center justify-center flex-shrink-0`}>
            <IconComponent className="w-6 h-6 text-white" />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="font-semibold text-gray-800 group-hover:text-blue-600 transition-colors line-clamp-1">
                  {program.nama}
                </h3>
                <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                  {program.deskripsi}
                </p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors flex-shrink-0 mt-1" />
            </div>

            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <div className="flex items-center space-x-1">
                <MapPin className="w-4 h-4" />
                <span>{program.lokasi}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <span>{program.tanggalMulai}</span>
              </div>
              <div className="flex items-center space-x-1">
                <User className="w-4 h-4" />
                <span>{program.penanggungJawab}</span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mt-3">
              <div className="flex justify-between text-sm text-gray-600 mb-1">
                <span>Progress</span>
                <span>{program.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="h-2 rounded-full transition-all duration-500"
                  style={{ 
                    width: `${program.progress}%`,
                    background: `linear-gradient(to right, ${program.warna.replace('from-', '').replace('to-', '').split(' ')[0]}, ${program.warna.replace('from-', '').replace('to-', '').split(' ')[1]})`
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Grid View
  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 cursor-pointer group"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 bg-gradient-to-br ${program.warna} rounded-xl flex items-center justify-center`}>
          <IconComponent className="w-6 h-6 text-white" />
        </div>
        <div className="flex flex-col items-end space-y-2">
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(program.status)}`}>
            {program.status}
          </span>
          {program.konfirmasiDibutuhkan && (
            <span className="px-2 py-1 bg-orange-100 text-orange-700 text-xs font-medium rounded-full">
              Perlu Konfirmasi
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <h3 className="font-semibold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
        {program.nama}
      </h3>
      <p className="text-sm text-gray-600 mb-4 line-clamp-2">
        {program.deskripsi}
      </p>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex justify-between text-sm text-gray-600 mb-1">
          <span>Progress</span>
          <span>{program.progress}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="h-2 rounded-full transition-all duration-500"
            style={{ 
              width: `${program.progress}%`,
              background: `linear-gradient(to right, ${program.warna.replace('from-', '').replace('to-', '').split(' ')[0]}, ${program.warna.replace('from-', '').replace('to-', '').split(' ')[1]})`
            }}
          ></div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between text-sm text-gray-600">
        <div className="flex items-center space-x-1">
          <MapPin className="w-4 h-4" />
          <span className="truncate max-w-[120px]">{program.lokasi}</span>
        </div>
        <div className="flex items-center space-x-1">
          <Star className="w-4 h-4 text-yellow-400" />
          <span>{program.rating > 0 ? program.rating : '-'}</span>
        </div>
      </div>
    </div>
  );
};

export default ProgramCard;