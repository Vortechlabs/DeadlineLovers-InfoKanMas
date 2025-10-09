import React, { useState } from 'react';
import { 
  X, 
  MapPin, 
  User, 
  Calendar, 
  DollarSign, 
  FileText, 
  Image, 
  Video, 
  Download,
  CheckCircle,
  Clock,
  PlayCircle,
  AlertCircle,
  Droplets,
  Building2,
  Lightbulb,
  TrendingUp,
  Navigation,
  Eye,
  BrickWall,
  TrafficCone
} from 'lucide-react';

const ProjectModal = ({ project, onClose }) => {
  const [activeTab, setActiveTab] = useState('overview');

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
      jalan: 'bg-orange-50 text-orange-700 border-orange-200',
      jembatan: 'bg-amber-50 text-amber-700 border-amber-200',
      drainase: 'bg-cyan-50 text-cyan-700 border-cyan-200',
      mck: 'bg-blue-50 text-blue-700 border-blue-200',
      penerangan: 'bg-yellow-50 text-yellow-700 border-yellow-200',
      gedung: 'bg-purple-50 text-purple-700 border-purple-200'
    };
    return colors[jenis] || colors.gedung;
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
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getMilestoneStatus = (milestone) => {
    switch (milestone.status) {
      case 'selesai': return { color: 'text-green-600 bg-green-100', icon: CheckCircle };
      case 'dalam_proses': return { color: 'text-blue-600 bg-blue-100', icon: Clock };
      case 'dalam_pengerjaan': return { color: 'text-yellow-600 bg-yellow-100', icon: PlayCircle };
      case 'menunggu': return { color: 'text-gray-600 bg-gray-100', icon: Clock };
      default: return { color: 'text-gray-600 bg-gray-100', icon: Clock };
    }
  };

  const statusConfig = getStatusConfig(project.status);
  const StatusIcon = statusConfig.icon;
  const JenisIcon = getJenisIcon(project.jenis);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Eye },
    { id: 'spesifikasi', label: 'Spesifikasi', icon: FileText },
    { id: 'progress', label: 'Progress', icon: TrendingUp },
    { id: 'quality', label: 'Quality Check', icon: CheckCircle },
    { id: 'dokumen', label: 'Dokumen', icon: FileText }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            {/* Status & Progress */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-gray-50 rounded-xl p-4">
                <h4 className="font-semibold text-gray-900 mb-3">Status Proyek</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Status</span>
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${statusConfig.color}`}>
                      <StatusIcon size={12} className="mr-1" />
                      {statusConfig.label}
                    </span>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>Progress Fisik</span>
                      <span>{project.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className="h-3 rounded-full bg-green-500 transition-all duration-500"
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-gray-600 mb-2">Detail Status</p>
                    <p className="text-sm text-gray-700">{project.statusDetail}</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-4">
                <h4 className="font-semibold text-gray-900 mb-3">Informasi Proyek</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Jenis Infrastruktur</span>
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${getJenisColor(project.jenis)}`}>
                      <JenisIcon size={12} className="mr-1" />
                      {project.jenis}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tipe Pekerjaan</span>
                    <span className="font-medium capitalize">{project.tipe}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Prioritas</span>
                    <span className="font-medium capitalize">{project.prioritas}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Penanggung Jawab</span>
                    <span className="font-medium">{project.penanggungJawab}</span>
                  </div>
                  {project.kontraktor && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Kontraktor</span>
                      <span className="font-medium">{project.kontraktor}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Deskripsi */}
            <div className="bg-white border border-gray-200 rounded-xl p-4">
              <h4 className="font-semibold text-gray-900 mb-3">Deskripsi Proyek</h4>
              <p className="text-gray-700 leading-relaxed">{project.deskripsi}</p>
            </div>

            {/* Lokasi & Timeline */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white border border-gray-200 rounded-xl p-4">
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <MapPin size={16} />
                  Lokasi Proyek
                </h4>
                <p className="text-sm text-gray-700 mb-3">{project.lokasi}</p>
                <div className="bg-gray-100 rounded-lg h-32 flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <Navigation size={24} className="mx-auto mb-2" />
                    <p className="text-sm">Peta Lokasi</p>
                    <p className="text-xs">Koordinat: {project.koordinat.lat}, {project.koordinat.lng}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-4">
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Calendar size={16} />
                  Timeline
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tanggal Mulai</span>
                    <span className="font-medium">{formatDate(project.tanggalMulai)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tanggal Selesai</span>
                    <span className="font-medium">{formatDate(project.tanggalSelesai)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Durasi</span>
                    <span className="font-medium">
                      {project.tanggalMulai && project.tanggalSelesai 
                        ? `${Math.ceil((new Date(project.tanggalSelesai) - new Date(project.tanggalMulai)) / (1000 * 60 * 60 * 24))} hari`
                        : '-'
                      }
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'spesifikasi':
        return (
          <div className="space-y-6">
            {/* Spesifikasi Teknis */}
            <div className="bg-white border border-gray-200 rounded-xl p-4">
              <h4 className="font-semibold text-gray-900 mb-3">Spesifikasi Teknis</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {project.spesifikasi && Object.entries(project.spesifikasi).map(([key, value]) => (
                  <div key={key} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm font-medium text-gray-700 capitalize">{key}:</span>
                    <span className="text-sm text-gray-900 font-semibold">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Material & Metode */}
            <div className="bg-white border border-gray-200 rounded-xl p-4">
              <h4 className="font-semibold text-gray-900 mb-3">Material & Metode</h4>
              <div className="space-y-3">
                <div>
                  <h5 className="text-sm font-medium text-gray-700 mb-2">Material Utama</h5>
                  <div className="flex flex-wrap gap-2">
                    {project.spesifikasi?.material && (
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
                        {project.spesifikasi.material}
                      </span>
                    )}
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs">
                      Material Standar SNI
                    </span>
                    <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs">
                      Quality Certified
                    </span>
                  </div>
                </div>
                
                <div>
                  <h5 className="text-sm font-medium text-gray-700 mb-2">Metode Pelaksanaan</h5>
                  <p className="text-sm text-gray-600">
                    {project.spesifikasi?.metode || 'Metode pelaksanaan sesuai standar teknis dan mengikuti best practice konstruksi.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'progress':
        return (
          <div className="space-y-6">
            {/* Progress Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-blue-700 mb-1">{project.progress}%</div>
                <div className="text-sm text-blue-600">Progress Fisik</div>
              </div>
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-green-700 mb-1">
                  {((project.realisasi / project.anggaran) * 100).toFixed(1)}%
                </div>
                <div className="text-sm text-green-600">Progress Keuangan</div>
              </div>
              <div className="bg-gradient-to-r from-purple-50 to-violet-50 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-purple-700 mb-1">
                  {project.milestones?.filter(m => m.status === 'selesai').length || 0}/{project.milestones?.length || 0}
                </div>
                <div className="text-sm text-purple-600">Tahapan Selesai</div>
              </div>
            </div>

            {/* Milestones */}
            {project.milestones && project.milestones.length > 0 && (
              <div className="bg-white border border-gray-200 rounded-xl p-4">
                <h4 className="font-semibold text-gray-900 mb-3">Tahapan Pekerjaan</h4>
                <div className="space-y-3">
                  {project.milestones.map((milestone, index) => {
                    const statusConfig = getMilestoneStatus(milestone);
                    const MilestoneIcon = statusConfig.icon;

                    return (
                      <div key={index} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${statusConfig.color.split(' ')[1]}`}>
                          <MilestoneIcon size={16} className={statusConfig.color.split(' ')[0]} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <p className="text-sm font-medium text-gray-900">{milestone.nama}</p>
                            <span className="text-xs text-gray-500">{milestone.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="h-2 rounded-full bg-green-500 transition-all duration-500"
                              style={{ width: `${milestone.progress}%` }}
                            ></div>
                          </div>
                          {milestone.tanggal && (
                            <p className="text-xs text-gray-500 mt-1">
                              {formatDate(milestone.tanggal)}
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Dokumentasi Progress */}
            <div className="bg-white border border-gray-200 rounded-xl p-4">
              <h4 className="font-semibold text-gray-900 mb-3">Dokumentasi Progress</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Image size={20} className="text-blue-600" />
                  </div>
                  <p className="text-sm font-medium text-gray-900">{project.dokumentasi.foto}</p>
                  <p className="text-xs text-gray-500">Foto</p>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Video size={20} className="text-purple-600" />
                  </div>
                  <p className="text-sm font-medium text-gray-900">{project.dokumentasi.video}</p>
                  <p className="text-xs text-gray-500">Video</p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <FileText size={20} className="text-green-600" />
                  </div>
                  <p className="text-sm font-medium text-gray-900">{project.dokumentasi.dokumen}</p>
                  <p className="text-xs text-gray-500">Dokumen</p>
                </div>
                <div className="p-4 bg-orange-50 rounded-lg">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-lg">🚁</span>
                  </div>
                  <p className="text-sm font-medium text-gray-900">{project.dokumentasi.drone}</p>
                  <p className="text-xs text-gray-500">Drone</p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'quality':
        return (
          <div className="space-y-6">
            {/* Quality Checks */}
            {project.qualityChecks && project.qualityChecks.length > 0 ? (
              <div className="bg-white border border-gray-200 rounded-xl p-4">
                <h4 className="font-semibold text-gray-900 mb-3">Quality Control Checks</h4>
                <div className="space-y-3">
                  {project.qualityChecks.map((check, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{check.item}</p>
                        <p className="text-xs text-gray-500">
                          Standar: {check.standar} | Actual: {check.actual}
                        </p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        check.status === 'sesuai' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {check.status === 'sesuai' ? 'Sesuai' : 'Tidak Sesuai'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 text-center">
                <AlertCircle className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                <p className="text-sm text-yellow-800">Belum ada quality check yang dilakukan</p>
              </div>
            )}

            {/* Issues */}
            {project.issues > 0 && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                <h4 className="font-semibold text-red-900 mb-2 flex items-center gap-2">
                  <AlertCircle size={16} />
                  Issues yang Perlu Perhatian
                </h4>
                <p className="text-sm text-red-700">
                  Terdapat {project.issues} issue yang perlu ditindaklanjuti untuk memastikan kualitas proyek.
                </p>
              </div>
            )}
          </div>
        );

      case 'dokumen':
        return (
          <div className="space-y-6">
            <div className="bg-white border border-gray-200 rounded-xl p-4">
              <h4 className="font-semibold text-gray-900 mb-3">Dokumen Terkait</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <FileText size={20} className="text-blue-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Proposal Teknis</p>
                      <p className="text-xs text-gray-500">PDF • 2.5 MB</p>
                    </div>
                  </div>
                  <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                    <Download size={16} />
                  </button>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <FileText size={20} className="text-green-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">RAB Detail</p>
                      <p className="text-xs text-gray-500">PDF • 1.8 MB</p>
                    </div>
                  </div>
                  <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                    <Download size={16} />
                  </button>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <FileText size={20} className="text-purple-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Laporan Progress</p>
                      <p className="text-xs text-gray-500">PDF • 1.2 MB</p>
                    </div>
                  </div>
                  <button className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors">
                    <Download size={16} />
                  </button>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <FileText size={20} className="text-orange-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Quality Report</p>
                      <p className="text-xs text-gray-500">PDF • 0.8 MB</p>
                    </div>
                  </div>
                  <button className="p-2 text-orange-600 hover:bg-orange-50 rounded-lg transition-colors">
                    <Download size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-xs flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl w-full max-w-6xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 sticky top-0 bg-white">
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${getJenisColor(project.jenis).split(' ')[1]} border ${getJenisColor(project.jenis).split(' ')[2]}`}>
              <JenisIcon className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">{project.nama}</h2>
              <p className="text-sm text-gray-500">ID: {project.id}</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <div className="flex space-x-1 px-6">
            {tabs.map((tab) => {
              const TabIcon = tab.icon;
              const isActive = activeTab === tab.id;
              
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-3 border-b-2 text-sm font-medium transition-colors ${
                    isActive
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <TabIcon size={16} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {renderTabContent()}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-gray-200 bg-gray-50 rounded-b-2xl">
          <div className="text-sm text-gray-500">
            Terakhir update: {formatDate(project.terakhirUpdate)}
          </div>
          
          <div className="flex items-center gap-3">
            <button 
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
            >
              Tutup
            </button>
            
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
              <Download size={16} />
              Export Laporan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;