import React from 'react';
import { 
  X, 
  User, 
  MapPin, 
  Phone, 
  Mail, 
  Calendar,
  IdCard,
  CheckCircle,
  Clock,
  XCircle,
  Star,
  FileText,
  Send,
  Download
} from 'lucide-react';

const PenerimaModal = ({ penerima, onClose, onKonfirmasi }) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'diterima':
        return { icon: CheckCircle, color: 'text-green-600 bg-green-100' };
      case 'diverifikasi':
        return { icon: CheckCircle, color: 'text-blue-600 bg-blue-100' };
      case 'menunggu':
        return { icon: Clock, color: 'text-yellow-600 bg-yellow-100' };
      case 'ditolak':
        return { icon: XCircle, color: 'text-red-600 bg-red-100' };
      default:
        return { icon: Clock, color: 'text-gray-600 bg-gray-100' };
    }
  };

  const StatusData = getStatusIcon(penerima.status);
  const StatusIcon = StatusData.icon;

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-xs flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <User className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Detail Penerima Manfaat</h2>
              <p className="text-gray-600">{penerima.nama}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Status & Program Info */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-gray-50 rounded-xl p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Status Penerimaan</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Status</span>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${StatusData.color} flex items-center gap-1`}>
                    <StatusIcon size={12} />
                    {penerima.status === 'diterima' ? 'Sudah Diterima' : 
                     penerima.status === 'diverifikasi' ? 'Terverifikasi' :
                     penerima.status === 'menunggu' ? 'Menunggu' : 'Ditolak'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Program</span>
                  <span className="text-sm font-medium text-gray-900">{penerima.program}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Jenis Bantuan</span>
                  <span className="text-sm font-medium text-gray-900 capitalize">{penerima.jenisBantuan}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Nilai Bantuan</span>
                  <span className="text-sm font-medium text-green-600">{formatCurrency(penerima.nilaiBantuan)}</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Informasi Konfirmasi</h3>
              <div className="space-y-3">
                {penerima.tanggalDistribusi && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Tanggal Distribusi</span>
                    <span className="text-sm font-medium text-gray-900">
                      {new Date(penerima.tanggalDistribusi).toLocaleDateString('id-ID')}
                    </span>
                  </div>
                )}
                {penerima.tanggalKonfirmasi ? (
                  <>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Tanggal Konfirmasi</span>
                      <span className="text-sm font-medium text-gray-900">
                        {new Date(penerima.tanggalKonfirmasi).toLocaleDateString('id-ID')}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Metode Konfirmasi</span>
                      <span className="text-sm font-medium text-gray-900 uppercase">
                        {penerima.metodeKonfirmasi}
                      </span>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-4">
                    <Clock className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Belum dikonfirmasi</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Personal Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Informasi Pribadi</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">NIK</label>
                <p className="text-gray-900 font-mono">{penerima.nik}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
                <p className="text-gray-900">{penerima.nama}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Dusun</label>
                <p className="text-gray-900">{penerima.dusun}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">RT/RW</label>
                <p className="text-gray-900">RT {penerima.rt} / RW {penerima.rw}</p>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Alamat Lengkap</label>
                <p className="text-gray-900">{penerima.alamat}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">No. HP</label>
                <p className="text-gray-900">{penerima.noHp || '-'}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <p className="text-gray-900">{penerima.email || '-'}</p>
              </div>
            </div>
          </div>

          {/* Feedback & Rating */}
          {penerima.rating && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Feedback & Rating</h3>
              <div className="bg-green-50 rounded-xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-gray-700">Rating:</span>
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          className={i < penerima.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">({penerima.rating}/5)</span>
                  </div>
                </div>
                {penerima.feedback && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Komentar:</label>
                    <p className="text-gray-900 bg-white p-3 rounded-lg border border-gray-200">
                      "{penerima.feedback}"
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Bukti & Dokumentasi */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Bukti & Dokumentasi</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <FileText className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Foto Bukti</p>
                    <p className="text-xs text-gray-500">
                      {penerima.buktiFoto ? 'Tersedia' : 'Tidak tersedia'}
                    </p>
                  </div>
                </div>
                {penerima.buktiFoto && (
                  <button className="px-3 py-1 bg-blue-600 text-white text-xs rounded-lg hover:bg-blue-700 transition-colors">
                    Lihat
                  </button>
                )}
              </div>
              
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <FileText className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Video Dokumentasi</p>
                    <p className="text-xs text-gray-500">
                      {penerima.buktiVideo ? 'Tersedia' : 'Tidak tersedia'}
                    </p>
                  </div>
                </div>
                {penerima.buktiVideo && (
                  <button className="px-3 py-1 bg-green-600 text-white text-xs rounded-lg hover:bg-green-700 transition-colors">
                    Lihat
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Catatan */}
          {penerima.catatan && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Catatan</h3>
              <div className="bg-yellow-50 rounded-xl p-4">
                <p className="text-gray-900">{penerima.catatan}</p>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between p-6 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center space-x-3">
            <button className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors flex items-center gap-2">
              <Send size={16} />
              Kirim Pengingat
            </button>
            <button className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors flex items-center gap-2">
              <Download size={16} />
              Export Data
            </button>
          </div>
          
          <div className="flex items-center space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Tutup
            </button>
            {penerima.status === 'menunggu' && (
              <button
                onClick={() => onKonfirmasi(penerima)}
                className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
              >
                Verifikasi Penerima
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PenerimaModal;