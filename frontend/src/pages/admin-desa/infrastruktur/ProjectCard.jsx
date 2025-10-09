import React from 'react';
import { 
  Eye, 
  MapPin, 
  User, 
  Calendar, 
  FileText, 
  Image, 
  Video, 
  CheckCircle,
  Clock,
  AlertCircle,
  PlayCircle,
  Droplets,
  Building2,
  Lightbulb,
  BrickWall,
  TrafficCone
} from 'lucide-react';

const ProjectCard = ({ project, viewMode = 'grid', onViewDetails }) => {
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

  const getJenisIcon = (jenis) => {
    const icons = {
      jalan: TrafficCone,
      jembatan: BrickWall,
      drainase: Droplets,
      mck: Building2,
      penerangan: Lightbulb,
      gedung: Building2
    };
    return icons[jenis] || Building2;
  };

  const getJenisColor = (jenis) => {
    const colors = {
      jalan: 'bg-orange-50 text-orange-700',
      jembatan: 'bg-amber-50 text-amber-700',
      drainase: 'bg-cyan-50 text-cyan-700',
      mck: 'bg-blue-50 text-blue-700',
      penerangan: 'bg-yellow-50 text-yellow-700',
      gedung: 'bg-purple-50 text-purple-700'
    };
    return colors[jenis] || colors.gedung;
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

  const statusConfig = getStatusConfig(project.status);
  const StatusIcon = statusConfig.icon;
  const JenisIcon = getJenisIcon(project.jenis);

  if (viewMode === 'list') {
    return (
      <div className="p-6 hover:bg-gray-50 transition-colors group">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getJenisColor(project.jenis).split(' ')[1]}`}>
                    <JenisIcon size={20} className={getJenisColor(project.jenis).split(' ')[2]} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-lg">{project.nama}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${statusConfig.color}`}>
                        <StatusIcon size={12} className="mr-1" />
                        {statusConfig.label}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getJenisColor(project.jenis)}`}>
                        {project.jenis}
                      </span>
                    </div>
                  </div>
                </div>
                
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{project.deskripsi}</p>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600 mb-3">
                  <div className="flex items-center gap-2">
                    <MapPin size={14} />
                    <span>{project.lokasi}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <User size={14} />
                    <span>{project.penanggungJawab}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar size={14} />
                    <span>{formatDate(project.tanggalMulai)} - {formatDate(project.tanggalSelesai)}</span>
                  </div>
                  {project.kontraktor && (
                    <div className="flex items-center gap-2">
                      <span className="text-xs bg-gray-100 px-2 py-1 rounded">Kontraktor: {project.kontraktor}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                {/* Progress */}
                <div className="flex items-center gap-3">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div 
                      className="h-2 rounded-full bg-green-500 transition-all duration-500"
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-gray-700 w-8">{project.progress}%</span>
                </div>

                {/* Budget */}
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-900">
                    {formatCurrency(project.anggaran)}
                  </div>
                  <div className="text-xs text-green-600">
                    {formatCurrency(project.realisasi)} realisasi
                  </div>
                </div>

                {/* Documentation */}
                <div className="flex items-center gap-3 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Image size={14} />
                    <span>{project.dokumentasi.foto}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Video size={14} />
                    <span>{project.dokumentasi.video}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FileText size={14} />
                    <span>{project.dokumentasi.dokumen}</span>
                  </div>
                </div>

                {/* Quality Checks */}
                {project.qualityChecks && project.qualityChecks.length > 0 && (
                  <div className="flex items-center gap-1 text-sm text-green-600">
                    <CheckCircle size={14} />
                    <span>{project.qualityChecks.filter(q => q.status === 'sesuai').length}/{project.qualityChecks.length} QC Pass</span>
                  </div>
                )}
              </div>

              <button 
                onClick={() => onViewDetails(project)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity"
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
            <div className="flex items-center gap-2 mb-2">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${getJenisColor(project.jenis).split(' ')[1]}`}>
                <JenisIcon size={16} className={getJenisColor(project.jenis).split(' ')[2]} />
              </div>
              <h3 className="font-semibold text-gray-900 text-sm leading-tight line-clamp-2 flex-1">
                {project.nama}
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getJenisColor(project.jenis)}`}>
                {project.jenis}
              </span>
              {project.kontraktor && (
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">Kontraktor</span>
              )}
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-between mt-3">
          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${statusConfig.color}`}>
            <StatusIcon size={12} className="mr-1" />
            {statusConfig.label}
          </span>
          {project.issues > 0 && (
            <div className="flex items-center gap-1 text-red-600 text-xs">
              <AlertCircle size={12} />
              <span>{project.issues} issue</span>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Progress Bar */}
        <div>
          <div className="flex justify-between text-xs text-gray-600 mb-1">
            <span>Progress Fisik</span>
            <span>{project.progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="h-2 rounded-full bg-green-500 transition-all duration-500"
              style={{ width: `${project.progress}%` }}
            ></div>
          </div>
        </div>

        {/* Info */}
        <div className="space-y-2 text-xs text-gray-600">
          <div className="flex items-center gap-2">
            <MapPin size={12} />
            <span className="truncate">{project.lokasi}</span>
          </div>
          <div className="flex items-center gap-2">
            <User size={12} />
            <span>{project.penanggungJawab}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar size={12} />
            <span>{formatDate(project.tanggalMulai)} - {formatDate(project.tanggalSelesai)}</span>
          </div>
        </div>

        {/* Spesifikasi Singkat */}
        {project.spesifikasi && (
          <div className="bg-gray-50 rounded-lg p-2">
            <div className="text-xs text-gray-600 mb-1">Spesifikasi:</div>
            <div className="text-xs text-gray-700 line-clamp-2">
              {Object.entries(project.spesifikasi).slice(0, 2).map(([key, value]) => (
                <span key={key} className="mr-2">
                  {key}: <strong>{value}</strong>
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Anggaran */}
        <div className="bg-blue-50 rounded-lg p-2">
          <div className="flex justify-between text-xs">
            <span className="text-gray-600">Anggaran:</span>
            <span className="font-medium">{formatCurrency(project.anggaran)}</span>
          </div>
          <div className="flex justify-between text-xs mt-1">
            <span className="text-gray-600">Realisasi:</span>
            <span className="font-medium text-green-600">{formatCurrency(project.realisasi)}</span>
          </div>
        </div>

        {/* Dokumentasi & QC */}
        <div className="flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <Image size={12} />
              <span>{project.dokumentasi.foto}</span>
            </div>
            <div className="flex items-center gap-1">
              <Video size={12} />
              <span>{project.dokumentasi.video}</span>
            </div>
            {project.dokumentasi.drone > 0 && (
              <div className="flex items-center gap-1">
                <span>🚁</span>
                <span>{project.dokumentasi.drone}</span>
              </div>
            )}
          </div>
          {project.qualityChecks && project.qualityChecks.length > 0 && (
            <div className="flex items-center gap-1 text-green-600">
              <CheckCircle size={12} />
              <span>{project.qualityChecks.filter(q => q.status === 'sesuai').length}/{project.qualityChecks.length}</span>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="px-4 py-3 bg-gray-50 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <p className="text-xs text-gray-500 truncate">
            {project.statusDetail}
          </p>
          <button 
            onClick={() => onViewDetails(project)}
            className="text-blue-600 hover:text-blue-700 text-xs font-medium flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <Eye size={12} />
            Detail
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;