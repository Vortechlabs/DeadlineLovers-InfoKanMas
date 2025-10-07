import React from 'react';
import { 
  MapPin, 
  Download, 
  Calendar, 
  User, 
  AlertTriangle,
  CheckCircle,
  Clock,
  X,
  FileText,
  Shield
} from 'lucide-react';

const DetailLaporanModal = ({ laporan, onClose, onAction }) => {
  if (!laporan) return null;

  const getStatusColor = (status) => {
    const colors = {
      completed: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      rejected: 'bg-red-100 text-red-800',
      in_review: 'bg-blue-100 text-blue-800'
    };
    return colors[status] || colors.pending;
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
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-xl max-w-4xl w-full my-8 max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900">{laporan.judul}</h2>
            <div className="flex items-center gap-4 mt-2">
              <p className="text-sm text-gray-500 flex items-center gap-1">
                <MapPin size={14} />
                {laporan.region}
              </p>
              <p className="text-sm text-gray-500 flex items-center gap-1">
                <Calendar size={14} />
                {laporan.tanggal}
              </p>
              <p className="text-sm text-gray-500 flex items-center gap-1">
                <User size={14} />
                {laporan.pelapor}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => onAction('download', laporan)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              title="Download Laporan"
            >
              <Download size={20} className="text-gray-600" />
            </button>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X size={20} className="text-gray-600" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {/* Status & Priority */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <p className="text-sm text-gray-600 mb-1">Status Laporan</p>
              <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(laporan.status)}`}>
                {laporan.status === 'completed' ? 'Selesai' : 
                 laporan.status === 'pending' ? 'Menunggu' : 
                 laporan.status === 'rejected' ? 'Ditolak' : 'Dalam Review'}
              </span>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <p className="text-sm text-gray-600 mb-1">Prioritas</p>
              <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getPriorityColor(laporan.prioritas)}`}>
                {laporan.prioritas}
              </span>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <p className="text-sm text-gray-600 mb-1">Jenis Laporan</p>
              <p className="text-sm font-bold text-gray-900">{laporan.jenis}</p>
            </div>
          </div>

          {/* Deskripsi */}
          <div className="bg-gray-50 rounded-xl p-5 mb-6 border border-gray-200">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <FileText size={18} />
              Deskripsi Laporan
            </h3>
            <p className="text-gray-700 leading-relaxed">{laporan.deskripsi}</p>
          </div>

          {/* Detail Anomali */}
          {laporan.anomali && (
            <div className="bg-yellow-50 rounded-xl p-5 mb-6 border border-yellow-200">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <AlertTriangle size={18} className="text-yellow-600" />
                Deteksi Anomali AI
              </h3>
              <div className="space-y-2">
                {laporan.anomali.map((item, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <AlertTriangle size={14} className="text-yellow-600 mt-1 flex-shrink-0" />
                    <p className="text-sm text-yellow-800">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Dokumen */}
          <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Shield size={18} />
              Dokumen Pendukung
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {laporan.dokumen && laporan.dokumen.map((doc, index) => (
                <div key={index} className="bg-white rounded-lg p-3 border border-gray-200 flex items-center justify-between hover:shadow-md transition-all">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                      <FileText size={18} className="text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{doc.nama}</p>
                      <p className="text-xs text-gray-500">{doc.tipe} • {doc.ukuran}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => onAction('downloadDoc', doc)}
                    className="text-blue-600 hover:text-blue-700"
                  >
                    <Download size={18} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
          <button 
            onClick={onClose}
            className="px-6 py-2.5 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
          >
            Tutup
          </button>
          {laporan.status === 'pending' && (
            <>
              <button 
                onClick={() => onAction('reject', laporan)}
                className="px-6 py-2.5 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
              >
                Tolak Laporan
              </button>
              <button 
                onClick={() => onAction('approve', laporan)}
                className="px-6 py-2.5 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
              >
                Setujui Laporan
              </button>
            </>
          )}
          <button 
            onClick={() => onAction('download', laporan)}
            className="px-6 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <Download size={16} />
            Export PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailLaporanModal;