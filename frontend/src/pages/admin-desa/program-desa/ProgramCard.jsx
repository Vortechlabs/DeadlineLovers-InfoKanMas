import React from 'react';
import { 
  Eye, 
  MapPin, 
  User, 
  Calendar, 
  FileText, 
  Image, 
  Video, 
  MoreVertical,
  CheckCircle,
  Clock,
  AlertCircle,
  PlayCircle
} from 'lucide-react';
import ActionMenu from './ActionMenu';

const ProgramCard = ({ 
  program, 
  viewMode = 'grid',
  onViewDetails, 
  onEditProgram, 
  onDeleteProgram, 
  onExportProgram 
}) => {
  const getStatusConfig = (status) => {
    const configs = {
      menunggu_persetujuan: { 
        color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
        icon: Clock,
        label: 'Menunggu Persetujuan'
      },
      dalam_pengerjaan: { 
        color: 'bg-blue-100 text-blue-800 border-blue-200',
        icon: PlayCircle,
        label: 'Dalam Pengerjaan'
      },
      selesai: { 
        color: 'bg-green-100 text-green-800 border-green-200',
        icon: CheckCircle,
        label: 'Selesai'
      },
      ditolak: { 
        color: 'bg-red-100 text-red-800 border-red-200',
        icon: AlertCircle,
        label: 'Ditolak'
      }
    };
    return configs[status] || configs.menunggu_persetujuan;
  };

  const getKategoriColor = (kategori) => {
    const colors = {
      infrastruktur: 'bg-blue-50 text-blue-700',
      bansos: 'bg-green-50 text-green-700',
      pendidikan: 'bg-purple-50 text-purple-700',
      kesehatan: 'bg-red-50 text-red-700',
      ekonomi: 'bg-orange-50 text-orange-700',
      lainnya: 'bg-gray-50 text-gray-700'
    };
    return colors[kategori] || colors.lainnya;
  };

  const formatCurrency = (amount) => {
    if (amount >= 1000000000) {
      return `Rp ${(amount / 1000000000).toFixed(1)} M`;
    } else if (amount >= 1000000) {
      return `Rp ${(amount / 1000000).toFixed(0)} Jt`;
    } else {
      return `Rp ${(amount / 1000).toFixed(0)} Rb`;
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short'
    });
  };

  const statusConfig = getStatusConfig(program.status);
  const StatusIcon = statusConfig.icon;

  if (viewMode === 'list') {
    return (
      <div className="p-6 hover:bg-gray-50 transition-colors">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-semibold text-gray-900 text-lg">{program.nama}</h3>
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${statusConfig.color}`}>
                    <StatusIcon size={12} className="mr-1" />
                    {statusConfig.label}
                  </span>
                </div>
                
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{program.deskripsi}</p>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600 mb-3">
                  <div className="flex items-center gap-2">
                    <MapPin size={14} />
                    <span>{program.lokasi}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <User size={14} />
                    <span>{program.penanggungJawab}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar size={14} />
                    <span>{formatDate(program.tanggalMulai)} - {formatDate(program.tanggalSelesai)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded-full text-xs ${getKategoriColor(program.kategori)}`}>
                      {program.kategori}
                    </span>
                  </div>
                </div>
              </div>
              
              <ActionMenu
                program={program}
                onViewDetails={onViewDetails}
                onEditProgram={onEditProgram}
                onDeleteProgram={onDeleteProgram}
                onExportProgram={onExportProgram}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                {/* Progress */}
                <div className="flex items-center gap-3">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div 
                      className="h-2 rounded-full bg-green-500 transition-all duration-500"
                      style={{ width: `${program.progress}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-gray-700 w-8">{program.progress}%</span>
                </div>

                {/* Budget */}
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-900">
                    {formatCurrency(program.anggaran)}
                  </div>
                  <div className="text-xs text-green-600">
                    {formatCurrency(program.realisasi)} realisasi
                  </div>
                </div>

                {/* Documentation */}
                <div className="flex items-center gap-3 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Image size={14} />
                    <span>{program.dokumentasi.foto}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Video size={14} />
                    <span>{program.dokumentasi.video}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FileText size={14} />
                    <span>{program.dokumentasi.dokumen}</span>
                  </div>
                </div>
              </div>

              <button 
                onClick={() => onViewDetails(program)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                <Eye size={14} />
                Detail
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Grid View
  return (
    <div className="bg-white rounded-2xl border border-gray-200 hover:shadow-lg transition-all duration-300 overflow-hidden group">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 text-sm leading-tight mb-1 line-clamp-2">
              {program.nama}
            </h3>
            <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getKategoriColor(program.kategori)}`}>
              {program.kategori}
            </span>
          </div>
          <ActionMenu
            program={program}
            onViewDetails={onViewDetails}
            onEditProgram={onEditProgram}
            onDeleteProgram={onDeleteProgram}
            onExportProgram={onExportProgram}
          />
        </div>
        
        <div className="flex items-center justify-between mt-3">
          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${statusConfig.color}`}>
            <StatusIcon size={12} className="mr-1" />
            {statusConfig.label}
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
            <span className="truncate">{program.lokasi}</span>
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
        <div className="flex items-center justify-between">
          <p className="text-xs text-gray-500 truncate">
            {program.statusDetail}
          </p>
          <button 
            onClick={() => onViewDetails(program)}
            className="text-blue-600 hover:text-blue-700 text-xs font-medium flex items-center gap-1"
          >
            <Eye size={12} />
            Detail
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProgramCard;