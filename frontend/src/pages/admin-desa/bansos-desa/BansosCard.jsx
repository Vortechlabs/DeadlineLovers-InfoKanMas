import React from 'react';
import { 
  Users, 
  DollarSign, 
  Package, 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  MapPin, 
  Calendar,
  Eye,
  Truck,
  PlayCircle,
  MoreVertical
} from 'lucide-react';

const BansosCard = ({ 
  program, 
  viewMode, 
  onViewRecipients, 
  onViewDistribution, 
  onQuickDistribution 
}) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'selesai':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'dalam_pengerjaan':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'menunggu_persetujuan':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'ditolak':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'selesai':
        return CheckCircle;
      case 'dalam_pengerjaan':
        return PlayCircle;
      case 'menunggu_persetujuan':
        return Clock;
      case 'ditolak':
        return AlertCircle;
      default:
        return Clock;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'sangat_tinggi':
        return 'bg-red-500';
      case 'tinggi':
        return 'bg-orange-500';
      case 'sedang':
        return 'bg-yellow-500';
      default:
        return 'bg-gray-500';
    }
  };

  const StatusIcon = getStatusIcon(program.status);

  if (viewMode === 'list') {
    return (
      <div className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-300">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(program.status)} flex items-center gap-1`}>
                <StatusIcon size={12} />
                {program.status === 'selesai' ? 'Selesai' : 
                 program.status === 'dalam_pengerjaan' ? 'Dalam Distribusi' :
                 program.status === 'menunggu_persetujuan' ? 'Menunggu Persetujuan' : 'Ditolak'}
              </span>
              <div className={`w-2 h-2 rounded-full ${getPriorityColor(program.prioritas)}`}></div>
              <span className="text-xs text-gray-500">{program.id}</span>
            </div>
            
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{program.nama}</h3>
            <p className="text-gray-600 text-sm mb-4 line-clamp-2">{program.deskripsi}</p>
            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Users size={16} />
                <span>{program.penerima.terkirim} dari {program.penerima.total} penerima</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <DollarSign size={16} />
                <span>Rp {(program.anggaran / 1000000).toFixed(0)} Jt</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Package size={16} />
                <span>{program.jenis}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Calendar size={16} />
                <span>{program.periode}</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2 ml-4">
            <button
              onClick={() => onViewRecipients(program)}
              className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              title="Lihat Penerima"
            >
              <Eye size={18} />
            </button>
            <button
              onClick={() => onViewDistribution(program)}
              className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
              title="Lihat Distribusi"
            >
              <Truck size={18} />
            </button>
            {program.status === 'dalam_pengerjaan' && (
              <button
                onClick={() => onQuickDistribution(program)}
                className="px-3 py-1 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
              >
                Distribusi
              </button>
            )}
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="mt-4">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Progress Distribusi</span>
            <span>{program.progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className={`h-2 rounded-full ${
                program.status === 'selesai' ? 'bg-green-500' :
                program.status === 'dalam_pengerjaan' ? 'bg-blue-500' :
                program.status === 'ditolak' ? 'bg-red-500' : 'bg-yellow-500'
              }`}
              style={{ width: `${program.progress}%` }}
            ></div>
          </div>
        </div>
      </div>
    );
  }

  // Grid View
  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-xl transition-all duration-300 group">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(program.status)} flex items-center gap-1`}>
              <StatusIcon size={10} />
              {program.status === 'selesai' ? 'Selesai' : 
               program.status === 'dalam_pengerjaan' ? 'Berjalan' :
               program.status === 'menunggu_persetujuan' ? 'Menunggu' : 'Ditolak'}
            </span>
            <div className={`w-2 h-2 rounded-full ${getPriorityColor(program.prioritas)}`}></div>
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
            {program.nama}
          </h3>
          <p className="text-gray-500 text-sm">{program.periode}</p>
        </div>
        <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
          <MoreVertical size={16} />
        </button>
      </div>

      {/* Description */}
      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{program.deskripsi}</p>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="text-center p-3 bg-gray-50 rounded-lg">
          <Users className="w-4 h-4 text-blue-600 mx-auto mb-1" />
          <div className="text-sm font-semibold text-gray-900">{program.penerima.terkirim}/{program.penerima.total}</div>
          <div className="text-xs text-gray-500">Penerima</div>
        </div>
        <div className="text-center p-3 bg-gray-50 rounded-lg">
          <DollarSign className="w-4 h-4 text-green-600 mx-auto mb-1" />
          <div className="text-sm font-semibold text-gray-900">Rp {(program.anggaran / 1000000).toFixed(0)}Jt</div>
          <div className="text-xs text-gray-500">Anggaran</div>
        </div>
      </div>

      {/* Progress */}
      <div className="mb-4">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Progress</span>
          <span>{program.progress}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className={`h-2 rounded-full transition-all duration-500 ${
              program.status === 'selesai' ? 'bg-green-500' :
              program.status === 'dalam_pengerjaan' ? 'bg-blue-500' :
              program.status === 'ditolak' ? 'bg-red-500' : 'bg-yellow-500'
            }`}
            style={{ width: `${program.progress}%` }}
          ></div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <MapPin size={14} />
          <span>{program.lokasi}</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => onViewRecipients(program)}
            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            title="Lihat Penerima"
          >
            <Eye size={16} />
          </button>
          <button
            onClick={() => onViewDistribution(program)}
            className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
            title="Lihat Distribusi"
          >
            <Truck size={16} />
          </button>
          {program.status === 'dalam_pengerjaan' && (
            <button
              onClick={() => onQuickDistribution(program)}
              className="px-3 py-1 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
            >
              Distribusi
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BansosCard;