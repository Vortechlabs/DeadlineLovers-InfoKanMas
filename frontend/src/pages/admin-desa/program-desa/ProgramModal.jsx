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
  Edit,
  Trash2,
  Send,
  CheckCircle,
  Clock,
  PlayCircle,
  AlertCircle,
  Building,
  Heart,
  School,
  TrendingUp
} from 'lucide-react';

const ProgramModal = ({ program, onClose, onEdit, onDelete, onExport }) => {
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

  const getKategoriIcon = (kategori) => {
    switch (kategori) {
      case 'infrastruktur': return Building;
      case 'bansos': return Heart;
      case 'pendidikan': return School;
      case 'ekonomi': return TrendingUp;
      default: return FileText;
    }
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

  const statusConfig = getStatusConfig(program.status);
  const StatusIcon = statusConfig.icon;
  const KategoriIcon = getKategoriIcon(program.kategori);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: FileText },
    { id: 'rab', label: 'RAB', icon: DollarSign },
    { id: 'progress', label: 'Progress', icon: TrendingUp },
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
                <h4 className="font-semibold text-gray-900 mb-3">Status Program</h4>
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
                      <span>Progress Keseluruhan</span>
                      <span>{program.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className="h-3 rounded-full bg-green-500 transition-all duration-500"
                        style={{ width: `${program.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-gray-600 mb-2">Detail Status</p>
                    <p className="text-sm text-gray-700">{program.statusDetail}</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-4">
                <h4 className="font-semibold text-gray-900 mb-3">Informasi Program</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Kategori</span>
                    <span className="font-medium capitalize">{program.kategori}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Jenis</span>
                    <span className="font-medium capitalize">{program.jenis}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Prioritas</span>
                    <span className="font-medium capitalize">{program.prioritas}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Penanggung Jawab</span>
                    <span className="font-medium">{program.penanggungJawab}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Deskripsi */}
            <div className="bg-white border border-gray-200 rounded-xl p-4">
              <h4 className="font-semibold text-gray-900 mb-3">Deskripsi Program</h4>
              <p className="text-gray-700 leading-relaxed">{program.deskripsi}</p>
            </div>

            {/* Timeline */}
            <div className="bg-white border border-gray-200 rounded-xl p-4">
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Calendar size={16} />
                Timeline Program
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-600 mb-1">Tanggal Pengajuan</p>
                  <p className="font-medium">{formatDate(program.tanggalPengajuan)}</p>
                </div>
                <div>
                  <p className="text-gray-600 mb-1">Tanggal Disetujui</p>
                  <p className="font-medium">{formatDate(program.tanggalDisetujui)}</p>
                </div>
                <div>
                  <p className="text-gray-600 mb-1">Tanggal Mulai</p>
                  <p className="font-medium">{formatDate(program.tanggalMulai)}</p>
                </div>
                <div>
                  <p className="text-gray-600 mb-1">Tanggal Selesai</p>
                  <p className="font-medium">{formatDate(program.tanggalSelesai)}</p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'rab':
        return (
          <div className="space-y-6">
            {/* Anggaran Summary */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6">
              <h4 className="font-semibold text-gray-900 mb-4">Ringkasan Anggaran</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-white rounded-lg border border-gray-200">
                  <p className="text-sm text-gray-600 mb-1">Total Anggaran</p>
                  <p className="text-xl font-bold text-blue-700">{formatCurrency(program.anggaran)}</p>
                </div>
                <div className="text-center p-4 bg-white rounded-lg border border-gray-200">
                  <p className="text-sm text-gray-600 mb-1">Realisasi</p>
                  <p className="text-xl font-bold text-green-700">{formatCurrency(program.realisasi)}</p>
                </div>
                <div className="text-center p-4 bg-white rounded-lg border border-gray-200">
                  <p className="text-sm text-gray-600 mb-1">Sisa Anggaran</p>
                  <p className="text-xl font-bold text-gray-700">
                    {formatCurrency(program.anggaran - program.realisasi)}
                  </p>
                </div>
              </div>
            </div>

            {/* Progress Anggaran */}
            <div className="bg-white border border-gray-200 rounded-xl p-4">
              <h4 className="font-semibold text-gray-900 mb-3">Progress Penggunaan Anggaran</h4>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Realisasi terhadap Anggaran</span>
                    <span>{((program.realisasi / program.anggaran) * 100).toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="h-3 rounded-full bg-green-500 transition-all duration-500"
                      style={{ width: `${(program.realisasi / program.anggaran) * 100}%` }}
                    ></div>
                  </div>
                </div>
                <div className="text-sm text-gray-600">
                  <span className="font-medium text-green-600">{formatCurrency(program.realisasi)}</span> 
                  {' '}dari{' '}
                  <span className="font-medium text-blue-600">{formatCurrency(program.anggaran)}</span>
                  {' '}terpakai
                </div>
              </div>
            </div>
          </div>
        );

      case 'progress':
        return (
          <div className="space-y-6">
            {/* Milestones */}
            {program.milestones && program.milestones.length > 0 && (
              <div className="bg-white border border-gray-200 rounded-xl p-4">
                <h4 className="font-semibold text-gray-900 mb-3">Tahapan Program</h4>
                <div className="space-y-3">
                  {program.milestones.map((milestone, index) => {
                    const statusConfig = getMilestoneStatus(milestone);
                    const MilestoneIcon = statusConfig.icon;

                    return (
                      <div key={index} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${statusConfig.color.split(' ')[1]}`}>
                          <MilestoneIcon size={16} className={statusConfig.color.split(' ')[0]} />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">{milestone.nama}</p>
                          {milestone.tanggal && (
                            <p className="text-xs text-gray-500">
                              {formatDate(milestone.tanggal)}
                            </p>
                          )}
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusConfig.color}`}>
                          {milestone.status === 'selesai' ? 'Selesai' :
                           milestone.status === 'dalam_proses' ? 'Dalam Proses' :
                           milestone.status === 'dalam_pengerjaan' ? 'Dalam Pengerjaan' :
                           'Menunggu'}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Dokumentasi Progress */}
            <div className="bg-white border border-gray-200 rounded-xl p-4">
              <h4 className="font-semibold text-gray-900 mb-3">Dokumentasi Progress</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Image size={20} className="text-blue-600" />
                  </div>
                  <p className="text-sm font-medium text-gray-900">{program.dokumentasi.foto}</p>
                  <p className="text-xs text-gray-500">Foto</p>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Video size={20} className="text-purple-600" />
                  </div>
                  <p className="text-sm font-medium text-gray-900">{program.dokumentasi.video}</p>
                  <p className="text-xs text-gray-500">Video</p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <FileText size={20} className="text-green-600" />
                  </div>
                  <p className="text-sm font-medium text-gray-900">{program.dokumentasi.dokumen}</p>
                  <p className="text-xs text-gray-500">Dokumen</p>
                </div>
              </div>
            </div>
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
                      <p className="text-sm font-medium text-gray-900">Proposal Program</p>
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
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blu-xs flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl w-full max-w-6xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 sticky top-0 bg-white">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
              <KategoriIcon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">{program.nama}</h2>
              <p className="text-sm text-gray-500">{program.kode_program}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => onEdit(program)}
              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              title="Edit Program"
            >
              <Edit size={16} />
            </button>
            <button 
              onClick={() => onExport(program)}
              className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
              title="Export Data"
            >
              <Download size={16} />
            </button>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X size={20} />
            </button>
          </div>
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
            Terakhir update: {formatDate(program.terakhirUpdate)}
          </div>
          
          <div className="flex items-center gap-3">
            {program.status === 'menunggu_persetujuan' && (
              <button className="px-4 py-2 border border-yellow-600 text-yellow-600 rounded-lg hover:bg-yellow-50 transition-colors flex items-center gap-2">
                <Send size={16} />
                Ajukan Revisi
              </button>
            )}
            
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

export default ProgramModal;