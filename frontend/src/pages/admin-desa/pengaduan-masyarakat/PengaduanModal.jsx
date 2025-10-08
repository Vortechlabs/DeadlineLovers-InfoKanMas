import React, { useState } from 'react';
import { 
  X, 
  User, 
  MapPin, 
  Calendar, 
  Phone, 
  FileText, 
  Image, 
  Video, 
  Download,
  MessageSquare,
  CheckCircle,
  Clock,
  AlertCircle,
  Send,
  Shield
} from 'lucide-react';
import StatusBadge from './StatusBadge';

const PengaduanModal = ({ pengaduan, onClose, onUpdateStatus, onAddTindakan }) => {
  const [newTindakan, setNewTindakan] = useState('');
  const [selectedStatus, setSelectedStatus] = useState(pengaduan.status);

  const statusOptions = [
    { value: 'baru', label: 'Baru', color: 'blue' },
    { value: 'dalam_investigasi', label: 'Dalam Investigasi', color: 'yellow' },
    { value: 'diverifikasi', label: 'Terverifikasi', color: 'green' },
    { value: 'dalam_penyidikan', label: 'Dalam Penyidikan', color: 'orange' },
    { value: 'selesai', label: 'Selesai', color: 'purple' },
    { value: 'ditolak', label: 'Ditolak', color: 'red' }
  ];

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getBuktiIcon = (type) => {
    switch (type) {
      case 'foto': return Image;
      case 'video': return Video;
      case 'dokumen': return FileText;
      default: return FileText;
    }
  };

  const getBuktiColor = (type) => {
    switch (type) {
      case 'foto': return 'text-blue-600 bg-blue-50';
      case 'video': return 'text-purple-600 bg-purple-50';
      case 'dokumen': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const handleSubmitTindakan = () => {
    if (newTindakan.trim()) {
      onAddTindakan(pengaduan.id, {
        tanggal: new Date().toISOString(),
        oleh: 'Admin Desa',
        deskripsi: newTindakan
      });
      setNewTindakan('');
    }
  };

  const handleStatusUpdate = () => {
    if (selectedStatus !== pengaduan.status) {
      onUpdateStatus(pengaduan.id, selectedStatus);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-xs flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl w-full max-w-6xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 sticky top-0 bg-white">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
              <MessageSquare className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">{pengaduan.judul}</h2>
              <p className="text-sm text-gray-500">ID: {pengaduan.id}</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Informasi Utama */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Informasi Pelapor */}
            <div className="bg-gray-50 rounded-xl p-4">
              <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <User size={16} />
                Informasi Pelapor
              </h3>
              <div className="space-y-2">
                <div>
                  <p className="text-xs text-gray-500">Nama</p>
                  <p className="text-sm font-medium text-gray-900">{pengaduan.nama}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">NIK</p>
                  <p className="text-sm font-medium text-gray-900">{pengaduan.nik}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Telepon</p>
                  <p className="text-sm font-medium text-gray-900 flex items-center gap-1">
                    <Phone size={14} />
                    {pengaduan.telepon}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Alamat</p>
                  <p className="text-sm font-medium text-gray-900">{pengaduan.alamat}</p>
                </div>
              </div>
            </div>

            {/* Informasi Pengaduan */}
            <div className="bg-gray-50 rounded-xl p-4">
              <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <FileText size={16} />
                Informasi Pengaduan
              </h3>
              <div className="space-y-2">
                <div>
                  <p className="text-xs text-gray-500">Kategori</p>
                  <p className="text-sm font-medium text-gray-900 capitalize">{pengaduan.kategori}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Lokasi</p>
                  <p className="text-sm font-medium text-gray-900 flex items-center gap-1">
                    <MapPin size={14} />
                    {pengaduan.lokasi}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Tanggal Pengaduan</p>
                  <p className="text-sm font-medium text-gray-900 flex items-center gap-1">
                    <Calendar size={14} />
                    {formatDate(pengaduan.tanggal)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Dibuat</p>
                  <p className="text-sm text-gray-900">{formatDate(pengaduan.createdAt)}</p>
                </div>
              </div>
            </div>

            {/* Status & Aksi */}
            <div className="bg-gray-50 rounded-xl p-4">
              <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Shield size={16} />
                Status & Aksi
              </h3>
              <div className="space-y-3">
                <StatusBadge status={pengaduan.status} prioritas={pengaduan.prioritas} />
                
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-2">
                    Update Status
                  </label>
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {statusOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  onClick={handleStatusUpdate}
                  disabled={selectedStatus === pengaduan.status}
                  className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                >
                  Update Status
                </button>
              </div>
            </div>
          </div>

          {/* Deskripsi Pengaduan */}
          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Deskripsi Lengkap</h3>
            <p className="text-gray-700 leading-relaxed">{pengaduan.deskripsi}</p>
          </div>

          {/* Bukti Pengaduan */}
          {pengaduan.bukti.length > 0 && (
            <div className="bg-white border border-gray-200 rounded-xl p-4">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Bukti yang Diberikan</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {pengaduan.bukti.map((bukti, index) => {
                  const Icon = getBuktiIcon(bukti.type);
                  return (
                    <div key={index} className="border border-gray-200 rounded-lg p-3 hover:shadow-md transition-shadow">
                      <div className="flex items-center gap-3 mb-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getBuktiColor(bukti.type)}`}>
                          <Icon size={20} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {bukti.description}
                          </p>
                          <p className="text-xs text-gray-500 capitalize">{bukti.type}</p>
                        </div>
                      </div>
                      <div className="bg-gray-100 rounded-lg h-32 flex items-center justify-center">
                        {bukti.type === 'foto' && (
                          <div className="text-center">
                            <Image size={24} className="text-gray-400 mx-auto mb-2" />
                            <p className="text-sm text-gray-500">Preview Foto</p>
                          </div>
                        )}
                        {bukti.type === 'video' && (
                          <div className="text-center">
                            <Video size={24} className="text-gray-400 mx-auto mb-2" />
                            <p className="text-sm text-gray-500">Preview Video</p>
                          </div>
                        )}
                        {bukti.type === 'dokumen' && (
                          <div className="text-center">
                            <FileText size={24} className="text-gray-400 mx-auto mb-2" />
                            <p className="text-sm text-gray-500">Dokumen</p>
                          </div>
                        )}
                      </div>
                      <button className="w-full mt-3 px-3 py-2 text-blue-600 text-sm font-medium hover:bg-blue-50 rounded-lg transition-colors flex items-center justify-center gap-2">
                        <Download size={14} />
                        Download
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Riwayat Tindakan */}
          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Riwayat Tindakan</h3>
            <div className="space-y-4">
              {pengaduan.tindakan.length > 0 ? (
                pengaduan.tindakan.map((tindakan, index) => (
                  <div key={index} className="flex gap-4 p-3 bg-gray-50 rounded-lg">
                    <div className="w-2 bg-blue-600 rounded-full"></div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-sm font-medium text-gray-900">{tindakan.oleh}</p>
                        <p className="text-xs text-gray-500">
                          {formatDate(tindakan.tanggal)}
                        </p>
                      </div>
                      <p className="text-sm text-gray-700">{tindakan.deskripsi}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-4 text-gray-500">
                  <Clock size={32} className="mx-auto mb-2 text-gray-300" />
                  <p>Belum ada tindakan yang dicatat</p>
                </div>
              )}

              {/* Form Tambah Tindakan */}
              <div className="border-t pt-4 mt-4">
                <h4 className="text-sm font-medium text-gray-900 mb-3">Tambah Tindakan Baru</h4>
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={newTindakan}
                    onChange={(e) => setNewTindakan(e.target.value)}
                    placeholder="Deskripsi tindakan yang dilakukan..."
                    className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    onClick={handleSubmitTindakan}
                    disabled={!newTindakan.trim()}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
                  >
                    <Send size={16} />
                    Simpan
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-gray-200 bg-gray-50 rounded-b-2xl">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <AlertCircle size={16} />
            <span>Pastikan semua bukti telah diverifikasi sebelum mengambil tindakan</span>
          </div>
          
          <div className="flex items-center gap-3">
            <button 
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
            >
              Tutup
            </button>
            
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
              <CheckCircle size={16} />
              Tandai Selesai
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PengaduanModal;