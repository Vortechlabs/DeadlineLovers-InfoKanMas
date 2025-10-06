import React from 'react';
import { MapPin, Calendar, Download, Eye, AlertTriangle, CheckCircle, Clock } from 'lucide-react';

const LaporanCard = ({ laporan, onViewDetail, onDownload }) => {
  const getStatusColor = (status) => {
    const colors = {
      completed: 'bg-green-50 text-green-700 border-green-200',
      pending: 'bg-yellow-50 text-yellow-700 border-yellow-200',
      rejected: 'bg-red-50 text-red-700 border-red-200',
      in_review: 'bg-blue-50 text-blue-700 border-blue-200'
    };
    return colors[status] || colors.pending;
  };

  const getStatusText = (status) => {
    const texts = {
      completed: 'Selesai',
      pending: 'Menunggu',
      rejected: 'Ditolak',
      in_review: 'Dalam Review'
    };
    return texts[status] || status;
  };

  const getStatusIcon = (status) => {
    const icons = {
      completed: CheckCircle,
      pending: Clock,
      rejected: AlertTriangle,
      in_review: Clock
    };
    return icons[status] || Clock;
  };

  const StatusIcon = getStatusIcon(laporan.status);

  return (
    <div className="bg-white rounded-xl p-5 border border-gray-200 hover:shadow-md transition-all">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-bold text-gray-900 mb-1">{laporan.judul}</h3>
          <p className="text-sm text-gray-600 flex items-center gap-1 mb-2">
            <MapPin size={14} />
            {laporan.region}
          </p>
          <p className="text-sm text-gray-700 line-clamp-2">{laporan.deskripsi}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-semibold border flex items-center gap-1 ${getStatusColor(laporan.status)}`}>
          <StatusIcon size={12} />
          {getStatusText(laporan.status)}
        </span>
      </div>

      {/* Info Laporan */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-gray-50 rounded-lg p-3">
          <p className="text-xs text-gray-500 mb-1">Jenis Laporan</p>
          <p className="text-sm font-bold text-gray-900">{laporan.jenis}</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-3">
          <p className="text-xs text-gray-500 mb-1">Prioritas</p>
          <p className={`text-sm font-bold ${
            laporan.prioritas === 'tinggi' ? 'text-red-600' :
            laporan.prioritas === 'sedang' ? 'text-yellow-600' : 'text-green-600'
          }`}>
            {laporan.prioritas}
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-gray-200">
        <div className="flex items-center gap-4 text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <Calendar size={12} />
            <span>{laporan.tanggal}</span>
          </div>
          <span className="text-gray-400">•</span>
          <span>Oleh: {laporan.pelapor}</span>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => onDownload(laporan)}
            className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            title="Download Laporan"
          >
            <Download size={16} />
          </button>
          <button 
            onClick={() => onViewDetail(laporan)}
            className="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1"
          >
            Detail
            <Eye size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default LaporanCard;