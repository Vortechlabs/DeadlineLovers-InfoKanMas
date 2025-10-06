
import React from 'react';
import { MapPin, Calendar, User, Eye, AlertTriangle, CheckCircle, Clock, MessageCircle } from 'lucide-react';

const LaporanMasyarakatCard = ({ laporan, onViewDetail, onAction }) => {
  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-yellow-50 text-yellow-700 border-yellow-200',
      in_review: 'bg-blue-50 text-blue-700 border-blue-200',
      resolved: 'bg-green-50 text-green-700 border-green-200',
      rejected: 'bg-red-50 text-red-700 border-red-200'
    };
    return colors[status] || colors.pending;
  };

  const getStatusText = (status) => {
    const texts = {
      pending: 'Menunggu',
      in_review: 'Dalam Review',
      resolved: 'Selesai',
      rejected: 'Ditolak'
    };
    return texts[status] || status;
  };

  const getPriorityColor = (priority) => {
    const colors = {
      tinggi: 'bg-red-100 text-red-800',
      sedang: 'bg-yellow-100 text-yellow-800',
      rendah: 'bg-green-100 text-green-800'
    };
    return colors[priority] || colors.rendah;
  };

  return (
    <div className="bg-white rounded-xl p-5 border border-gray-200 hover:shadow-md transition-all">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="text-lg font-bold text-gray-900 mb-1 line-clamp-2">{laporan.judul}</h3>
          <p className="text-sm text-gray-600 flex items-center gap-1 mb-2">
            <MapPin size={14} />
            {laporan.lokasi}
          </p>
        </div>
        <div className="flex flex-col items-end gap-2">
          <span className={`px-2 py-1 rounded-full text-xs font-semibold border ${getStatusColor(laporan.status)}`}>
            {getStatusText(laporan.status)}
          </span>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(laporan.prioritas)}`}>
            {laporan.prioritas}
          </span>
        </div>
      </div>

      {/* Deskripsi */}
      <p className="text-sm text-gray-700 mb-4 line-clamp-3">{laporan.deskripsi}</p>

      {/* Info Laporan */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-gray-50 rounded-lg p-3">
          <p className="text-xs text-gray-500 mb-1">Kategori</p>
          <p className="text-sm font-bold text-gray-900">{laporan.kategori}</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-3">
          <p className="text-xs text-gray-500 mb-1">Pelapor</p>
          <p className="text-sm font-bold text-gray-900">{laporan.pelapor}</p>
        </div>
      </div>

      {/* Bukti */}
      {laporan.bukti && laporan.bukti.length > 0 && (
        <div className="mb-3">
          <p className="text-xs text-gray-500 mb-2">Bukti:</p>
          <div className="flex gap-2">
            {laporan.bukti.slice(0, 3).map((bukti, index) => (
              <div key={index} className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded">
                {bukti.tipe}
              </div>
            ))}
            {laporan.bukti.length > 3 && (
              <div className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                +{laporan.bukti.length - 3} lainnya
              </div>
            )}
          </div>
        </div>
      )}

      {/* AI Analysis */}
      {laporan.aiAnalysis && (
        <div className="mb-3 p-2 bg-purple-50 border border-purple-200 rounded-lg">
          <div className="flex items-start gap-2">
            <AlertTriangle size={14} className="text-purple-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-xs font-semibold text-purple-900 mb-1">Analisis AI</p>
              <p className="text-xs text-purple-800">{laporan.aiAnalysis}</p>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-gray-200">
        <div className="flex items-center gap-4 text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <Calendar size={12} />
            <span>{laporan.tanggal}</span>
          </div>
          <div className="flex items-center gap-1">
            <MessageCircle size={12} />
            <span>{laporan.komentar} komentar</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
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

export default LaporanMasyarakatCard;