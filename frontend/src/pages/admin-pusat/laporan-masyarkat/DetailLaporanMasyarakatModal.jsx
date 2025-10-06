import React, { useState } from 'react';
import { 
  X, 
  MapPin, 
  Calendar, 
  User, 
  Download,
  MessageCircle,
  AlertTriangle,
  CheckCircle,
  Clock,
  FileText,
  Image,
  Video,
  Send
} from 'lucide-react';

import ResponseForm from './ResponseForm';

const DetailLaporanMasyarakatModal = ({ laporan, onClose, onResponse }) => {
  const [showResponseForm, setShowResponseForm] = useState(false);

  if (!laporan) return null;

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      in_review: 'bg-blue-100 text-blue-800',
      resolved: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800'
    };
    return colors[status] || colors.pending;
  };

  const getStatusIcon = (status) => {
    const icons = {
      pending: Clock,
      in_review: AlertTriangle,
      resolved: CheckCircle,
      rejected: X
    };
    return icons[status] || Clock;
  };

  const StatusIcon = getStatusIcon(laporan.status);

  const handleResponseSubmit = async (responseData) => {
    await onResponse(responseData);
    setShowResponseForm(false);
  };

  const getFileIcon = (tipe) => {
    if (tipe.includes('image')) return Image;
    if (tipe.includes('video')) return Video;
    return FileText;
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-xl max-w-4xl w-full my-8 max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900">{laporan.judul}</h2>
            <div className="flex items-center gap-4 mt-2 flex-wrap">
              <p className="text-sm text-gray-500 flex items-center gap-1">
                <MapPin size={14} />
                {laporan.lokasi}
              </p>
              <p className="text-sm text-gray-500 flex items-center gap-1">
                <Calendar size={14} />
                {laporan.tanggal}
              </p>
              <p className="text-sm text-gray-500 flex items-center gap-1">
                <User size={14} />
                {laporan.pelapor}
              </p>
              <span className={`px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1 ${getStatusColor(laporan.status)}`}>
                <StatusIcon size={12} />
                {laporan.status === 'pending' ? 'Menunggu' : 
                 laporan.status === 'in_review' ? 'Dalam Review' : 
                 laporan.status === 'resolved' ? 'Selesai' : 'Ditolak'}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setShowResponseForm(!showResponseForm)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <MessageCircle size={16} />
              Tanggapi
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
          {/* Response Form */}
          {showResponseForm && (
            <div className="mb-6">
              <ResponseForm
                laporan={laporan}
                onSubmit={handleResponseSubmit}
                onCancel={() => setShowResponseForm(false)}
              />
            </div>
          )}

          {/* Deskripsi Lengkap */}
          <div className="bg-gray-50 rounded-xl p-5 mb-6 border border-gray-200">
            <h3 className="font-bold text-gray-900 mb-4">Deskripsi Laporan</h3>
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">{laporan.deskripsi}</p>
          </div>

          {/* Info Detail */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <p className="text-sm text-gray-500 mb-1">Kategori</p>
              <p className="text-sm font-bold text-gray-900">{laporan.kategori}</p>
            </div>
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <p className="text-sm text-gray-500 mb-1">Prioritas</p>
              <p className={`text-sm font-bold ${
                laporan.prioritas === 'tinggi' ? 'text-red-600' :
                laporan.prioritas === 'sedang' ? 'text-yellow-600' : 'text-green-600'
              }`}>
                {laporan.prioritas}
              </p>
            </div>
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <p className="text-sm text-gray-500 mb-1">Kredibilitas</p>
              <p className="text-sm font-bold text-gray-900">{laporan.kredibilitas}%</p>
            </div>
          </div>

          {/* AI Analysis */}
          {laporan.aiAnalysis && (
            <div className="bg-purple-50 rounded-xl p-5 mb-6 border border-purple-200">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <AlertTriangle size={18} className="text-purple-600" />
                Analisis AI
              </h3>
              <div className="space-y-2">
                <p className="text-sm text-purple-800">{laporan.aiAnalysis}</p>
                {laporan.aiScore && (
                  <div className="flex items-center gap-2 text-xs text-purple-600">
                    <span>Kredibilitas AI: {laporan.aiScore}%</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Bukti */}
          {laporan.bukti && laporan.bukti.length > 0 && (
            <div className="bg-gray-50 rounded-xl p-5 mb-6 border border-gray-200">
              <h3 className="font-bold text-gray-900 mb-4">Bukti Pendukung</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {laporan.bukti.map((bukti, index) => {
                  const FileIcon = getFileIcon(bukti.tipe);
                  return (
                    <div key={index} className="bg-white rounded-lg p-3 border border-gray-200 flex items-center justify-between hover:shadow-md transition-all">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                          <FileIcon size={18} className="text-blue-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{bukti.nama}</p>
                          <p className="text-xs text-gray-500">{bukti.tipe} • {bukti.ukuran}</p>
                        </div>
                      </div>
                      <button className="text-blue-600 hover:text-blue-700">
                        <Download size={18} />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Riwayat Tanggapan */}
          {laporan.tanggapan && laporan.tanggapan.length > 0 && (
            <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
              <h3 className="font-bold text-gray-900 mb-4">Riwayat Tanggapan</h3>
              <div className="space-y-4">
                {laporan.tanggapan.map((tanggapan, index) => (
                  <div key={index} className="bg-white rounded-lg p-4 border border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm font-semibold text-gray-900">{tanggapan.admin}</p>
                      <p className="text-xs text-gray-500">{tanggapan.tanggal}</p>
                    </div>
                    <p className="text-sm text-gray-700">{tanggapan.pesan}</p>
                    {tanggapan.status && (
                      <div className="mt-2">
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          tanggapan.status === 'resolved' ? 'bg-green-100 text-green-800' :
                          tanggapan.status === 'rejected' ? 'bg-red-100 text-red-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          Status diubah: {tanggapan.status === 'resolved' ? 'Selesai' : 
                                       tanggapan.status === 'rejected' ? 'Ditolak' : 'Dalam Review'}
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
          <button 
            onClick={onClose}
            className="px-6 py-2.5 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
          >
            Tutup
          </button>
          <button className="px-6 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center gap-2">
            <Download size={16} />
            Export Laporan
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailLaporanMasyarakatModal;