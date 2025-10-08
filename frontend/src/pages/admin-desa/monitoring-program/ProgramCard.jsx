import React from 'react';
import { Eye, MapPin, User, Calendar, AlertCircle, FileText, Video, Image } from 'lucide-react';

const ProgramCard = ({ program, onViewDetails }) => {
  const getStatusColor = (status) => {
    const colors = {
      menunggu_persetujuan: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      dalam_pengerjaan: 'bg-blue-100 text-blue-800 border-blue-200',
      selesai: 'bg-green-100 text-green-800 border-green-200',
      ditolak: 'bg-red-100 text-red-800 border-red-200'
    };
    return colors[status] || colors.menunggu_persetujuan;
  };

  const getStatusText = (status) => {
    const texts = {
      menunggu_persetujuan: 'Menunggu Persetujuan',
      dalam_pengerjaan: 'Dalam Pengerjaan',
      selesai: 'Selesai',
      ditolak: 'Ditolak'
    };
    return texts[status] || status;
  };

  const getKategoriColor = (kategori) => {
    const colors = {
      infrastruktur: 'bg-blue-50 text-blue-700',
      bansos: 'bg-green-50 text-green-700',
      pendidikan: 'bg-purple-50 text-purple-700',
      kesehatan: 'bg-red-50 text-red-700',
      lainnya: 'bg-gray-50 text-gray-700'
    };
    return colors[kategori] || colors.lainnya;
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 hover:shadow-lg transition-all duration-300 overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 text-sm leading-tight mb-1">
              {program.nama}
            </h3>
            <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getKategoriColor(program.kategori)}`}>
              {program.kategori}
            </span>
          </div>
          <button 
            onClick={() => onViewDetails(program)}
            className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Eye size={16} className="text-gray-500" />
          </button>
        </div>
        
        <div className="flex items-center justify-between mt-3">
          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusColor(program.status)}`}>
            {getStatusText(program.status)}
          </span>
          {program.issues > 0 && (
            <div className="flex items-center gap-1 text-red-600 text-xs">
              <AlertCircle size={12} />
              <span>{program.issues} issue</span>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Progress Bar */}
        <div>
          <div className="flex justify-between text-xs text-gray-600 mb-1">
            <span>Progress</span>
            <span>{program.progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="h-2 rounded-full bg-green-500 transition-all duration-500"
              style={{ width: `${program.progress}%` }}
            ></div>
          </div>
        </div>

        {/* Info */}
        <div className="space-y-2 text-xs text-gray-600">
          <div className="flex items-center gap-2">
            <MapPin size={12} />
            <span>{program.lokasi}</span>
          </div>
          <div className="flex items-center gap-2">
            <User size={12} />
            <span>{program.penanggungJawab}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar size={12} />
            <span>{formatDate(program.tanggalMulai)} - {formatDate(program.tanggalSelesai)}</span>
          </div>
        </div>

        {/* Anggaran */}
        <div className="bg-gray-50 rounded-lg p-2">
          <div className="flex justify-between text-xs">
            <span className="text-gray-600">Anggaran:</span>
            <span className="font-medium">{formatCurrency(program.anggaran)}</span>
          </div>
          <div className="flex justify-between text-xs mt-1">
            <span className="text-gray-600">Realisasi:</span>
            <span className="font-medium text-green-600">{formatCurrency(program.realisasi)}</span>
          </div>
        </div>

        {/* Dokumentasi */}
        <div className="flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <Image size={12} />
              <span>{program.dokumentasi.foto}</span>
            </div>
            <div className="flex items-center gap-1">
              <Video size={12} />
              <span>{program.dokumentasi.video}</span>
            </div>
            <div className="flex items-center gap-1">
              <FileText size={12} />
              <span>{program.dokumentasi.dokumen}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-4 py-3 bg-gray-50 border-t border-gray-200">
        <p className="text-xs text-gray-500 text-center">
          {program.statusDetail}
        </p>
      </div>
    </div>
  );
};

export default ProgramCard;