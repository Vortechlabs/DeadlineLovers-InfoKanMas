import React from 'react';
import { Eye, MessageSquare, MapPin, Calendar, User } from 'lucide-react';
import StatusBadge from './StatusBadge';

const PengaduanTable = ({ dataPengaduan, onViewDetails, onUpdateStatus }) => {
  const getKategoriLabel = (kategori) => {
    const labels = {
      infrastruktur: 'Infrastruktur',
      bansos: 'Bansos',
      pengadaan: 'Pengadaan',
      operasional: 'Operasional',
      korupsi: 'Korupsi',
      lainnya: 'Lainnya'
    };
    return labels[kategori] || kategori;
  };

  const getKategoriColor = (kategori) => {
    const colors = {
      infrastruktur: 'bg-blue-50 text-blue-700 border-blue-200',
      bansos: 'bg-green-50 text-green-700 border-green-200',
      pengadaan: 'bg-purple-50 text-purple-700 border-purple-200',
      operasional: 'bg-yellow-50 text-yellow-700 border-yellow-200',
      korupsi: 'bg-red-50 text-red-700 border-red-200',
      lainnya: 'bg-gray-50 text-gray-700 border-gray-200'
    };
    return colors[kategori] || colors.lainnya;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Daftar Pengaduan</h3>
        <p className="text-sm text-gray-500 mt-1">
          {dataPengaduan.length} pengaduan ditemukan
        </p>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Pengaduan</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Pelapor</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Kategori</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Tanggal</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {dataPengaduan.map((pengaduan) => (
              <tr key={pengaduan.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <div>
                    <p className="text-sm font-medium text-gray-900 mb-1">{pengaduan.judul}</p>
                    <p className="text-sm text-gray-600 line-clamp-2 mb-2">{pengaduan.deskripsi}</p>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <MapPin size={12} />
                      <span>{pengaduan.lokasi}</span>
                    </div>
                  </div>
                </td>
                
                <td className="px-6 py-4">
                  <div>
                    <p className="text-sm font-medium text-gray-900 flex items-center gap-1 mb-1">
                      <User size={14} />
                      {pengaduan.nama}
                    </p>
                    <p className="text-xs text-gray-500">NIK: {pengaduan.nik}</p>
                    <p className="text-xs text-gray-500">{pengaduan.telepon}</p>
                  </div>
                </td>
                
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${getKategoriColor(pengaduan.kategori)}`}>
                    {getKategoriLabel(pengaduan.kategori)}
                  </span>
                </td>
                
                <td className="px-6 py-4">
                  <div className="flex items-center gap-1 text-sm text-gray-700">
                    <Calendar size={14} />
                    {formatDate(pengaduan.tanggal)}
                  </div>
                </td>
                
                <td className="px-6 py-4">
                  <StatusBadge status={pengaduan.status} prioritas={pengaduan.prioritas} />
                </td>
                
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => onViewDetails(pengaduan)}
                      className="text-blue-600 hover:text-blue-700 flex items-center gap-1 text-sm font-medium p-2 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <Eye size={14} />
                      Detail
                    </button>
                    
                    <button className="text-green-600 hover:text-green-700 flex items-center gap-1 text-sm font-medium p-2 hover:bg-green-50 rounded-lg transition-colors">
                      <MessageSquare size={14} />
                      Tindakan
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {dataPengaduan.length === 0 && (
          <div className="text-center py-12">
            <MessageSquare className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">Tidak ada pengaduan</h3>
            <p className="mt-1 text-sm text-gray-500">
              Tidak ada pengaduan yang sesuai dengan filter yang dipilih.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PengaduanTable;