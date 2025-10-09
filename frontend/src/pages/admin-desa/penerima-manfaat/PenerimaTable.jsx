import React from 'react';
import { 
  Eye, 
  Truck, 
  CheckCircle, 
  Clock, 
  XCircle, 
  User, 
  MapPin, 
  Phone,
  Send,
  Star,
  FileText
} from 'lucide-react';

const PenerimaTable = ({ 
  dataPenerima, 
  onViewDetail, 
  onDistribusi, 
  onKonfirmasi, 
  onSendReminder 
}) => {
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

  const getStatusText = (status) => {
    switch (status) {
      case 'diterima':
        return 'Sudah Diterima';
      case 'diverifikasi':
        return 'Terverifikasi';
      case 'menunggu':
        return 'Menunggu';
      case 'ditolak':
        return 'Ditolak';
      default:
        return 'Menunggu';
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  if (dataPenerima.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-12 text-center border border-gray-200">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <User className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Tidak ada penerima ditemukan</h3>
        <p className="text-gray-500 max-w-sm mx-auto">
          Tidak ada penerima manfaat yang sesuai dengan filter yang dipilih. Coba ubah kriteria pencarian.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Penerima
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Program & Bantuan
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Konfirmasi & Rating
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {dataPenerima.map((penerima) => {
              const StatusData = getStatusIcon(penerima.status);
              const StatusIcon = StatusData.icon;
              
              return (
                <tr key={penerima.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <User className="w-5 h-5 text-purple-600" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{penerima.nama}</div>
                        <div className="text-sm text-gray-500 font-mono">{penerima.nik}</div>
                        <div className="flex items-center space-x-2 text-xs text-gray-400 mt-1">
                          <MapPin size={12} />
                          <span>{penerima.dusun}, RT {penerima.rt}/RW {penerima.rw}</span>
                        </div>
                        {penerima.noHp && (
                          <div className="flex items-center space-x-2 text-xs text-gray-400 mt-1">
                            <Phone size={12} />
                            <span>{penerima.noHp}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">{penerima.program}</div>
                    <div className="text-sm text-gray-600 mt-1">
                      {formatCurrency(penerima.nilaiBantuan)}
                    </div>
                    <div className="text-xs text-gray-400 mt-1 capitalize">
                      {penerima.jenisBantuan}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${StatusData.color} flex items-center gap-1`}>
                        <StatusIcon size={12} />
                        {getStatusText(penerima.status)}
                      </span>
                    </div>
                    {penerima.tanggalDistribusi && (
                      <div className="text-xs text-gray-500 mt-2">
                        Distribusi: {new Date(penerima.tanggalDistribusi).toLocaleDateString('id-ID')}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {penerima.tanggalKonfirmasi ? (
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2 text-sm text-green-600">
                          <CheckCircle size={14} />
                          <span>Terkonfirmasi</span>
                        </div>
                        <div className="text-xs text-gray-500">
                          {new Date(penerima.tanggalKonfirmasi).toLocaleDateString('id-ID')}
                        </div>
                        {penerima.rating && (
                          <div className="flex items-center space-x-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                size={12}
                                className={i < penerima.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}
                              />
                            ))}
                            <span className="text-xs text-gray-500 ml-1">({penerima.rating})</span>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="text-sm text-gray-500">
                        Belum dikonfirmasi
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => onViewDetail(penerima)}
                        className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Lihat Detail"
                      >
                        <Eye size={16} />
                      </button>
                      
                      {penerima.status === 'diverifikasi' && (
                        <button
                          onClick={() => onDistribusi(penerima)}
                          className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                          title="Proses Distribusi"
                        >
                          <Truck size={16} />
                        </button>
                      )}
                      
                      {penerima.status === 'diverifikasi' && !penerima.tanggalKonfirmasi && (
                        <button
                          onClick={() => onSendReminder(penerima)}
                          className="p-2 text-gray-400 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
                          title="Kirim Pengingat"
                        >
                          <Send size={16} />
                        </button>
                      )}
                      
                      {penerima.status === 'menunggu' && (
                        <button
                          onClick={() => onKonfirmasi(penerima)}
                          className="px-3 py-1 bg-green-600 text-white text-xs rounded-lg hover:bg-green-700 transition-colors"
                        >
                          Verifikasi
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex items-center justify-between">
        <div className="text-sm text-gray-700">
          Menampilkan 1-{dataPenerima.length} dari {dataPenerima.length} penerima
        </div>
        <div className="flex items-center space-x-2">
          <button className="px-3 py-1 border border-gray-300 rounded text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
            Sebelumnya
          </button>
          <button className="px-3 py-1 border border-purple-500 bg-purple-500 text-white rounded text-sm font-medium">
            1
          </button>
          <button className="px-3 py-1 border border-gray-300 rounded text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
            Selanjutnya
          </button>
        </div>
      </div>
    </div>
  );
};

export default PenerimaTable;