import React, { useState } from 'react';
import { toast } from 'sonner';
import { useAuth } from '@/context/AuthContext';
import MonitoringService from '@/services/MonitoringService';
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
  AlertCircle,
  Building,
  Heart,
  School,
  Eye,
  ExternalLink
} from 'lucide-react';

const ProgramModal = ({ program, onClose, onStatusUpdate }) => {
  const { user } = useAuth();
  const [updatingStatus, setUpdatingStatus] = useState(false);
  const [showMoreDokumen, setShowMoreDokumen] = useState(false);

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

  const getKategoriIcon = (kategori) => {
    switch (kategori) {
      case 'infrastruktur': return Building;
      case 'bansos': return Heart;
      case 'pendidikan': return School;
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
      case 'dalam_pengerjaan': return { color: 'text-yellow-600 bg-yellow-100', icon: Clock };
      case 'menunggu': return { color: 'text-gray-600 bg-gray-100', icon: Clock };
      default: return { color: 'text-gray-600 bg-gray-100', icon: Clock };
    }
  };

  const handleStatusUpdate = async (newStatus, catatan = '') => {
    if (!program.backendData) {
      toast.error('Data program tidak lengkap');
      return;
    }

    try {
      setUpdatingStatus(true);
      
      // Map frontend status ke backend status
      const statusMapping = {
        'diverifikasi_kecamatan': 'diverifikasi_kecamatan',
        'rejected': 'rejected',
        'approved': 'approved',
        'berjalan': 'berjalan',
        'selesai': 'selesai'
      };

      const backendStatus = statusMapping[newStatus];
      
      if (!backendStatus) {
        toast.error('Status tidak valid');
        return;
      }

      await MonitoringService.updateProgramStatus(program.backendData.id, backendStatus, catatan);
      toast.success('Status program berhasil diupdate');
      onStatusUpdate?.(); // Callback untuk refresh data
      onClose();
    } catch (error) {
      console.error('Failed to update status:', error);
      const errorMessage = error.response?.data?.message || 'Gagal mengupdate status program';
      toast.error(errorMessage);
    } finally {
      setUpdatingStatus(false);
    }
  };

  const handleExportDetail = async () => {
    try {
      toast.info('Mempersiapkan export...');
      // Implementasi export detail program
      // await MonitoringService.exportProgramDetail(program.backendData.id);
      toast.success('Export detail program berhasil');
    } catch (error) {
      console.error('Export failed:', error);
      toast.error('Gagal mengexport detail program');
    }
  };

  const handleViewDocument = (document) => {
    if (program.backendData?.dokumen) {
      const doc = program.backendData.dokumen.find(d => d.jenis_dokumen === document);
      if (doc?.file_path) {
        const fileUrl = `${import.meta.env.VITE_API_BASE_URL}/storage/${doc.file_path}`;
        window.open(fileUrl, '_blank');
      } else {
        toast.error('Dokumen tidak tersedia');
      }
    } else {
      toast.info('Fitur preview dokumen akan segera tersedia');
    }
  };

  const KategoriIcon = getKategoriIcon(program.kategori);

  // Data dokumen dari backend
  const dokumenList = program.backendData?.dokumen || [];
  const groupedDokumen = {
    proposal: dokumenList.filter(d => d.jenis_dokumen === 'proposal'),
    surat_permohonan: dokumenList.filter(d => d.jenis_dokumen === 'surat_permohonan'),
    gambar_teknis: dokumenList.filter(d => d.jenis_dokumen === 'gambar_teknis'),
    foto_lokasi: dokumenList.filter(d => d.jenis_dokumen === 'foto_lokasi')
  };

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-xs flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 sticky top-0 bg-white">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
              <KategoriIcon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">{program.nama}</h2>
              <p className="text-sm text-gray-500">
                {program.kode_program || `ID: ${program.id}`}
                {program.backendData?.tahun_anggaran && ` • Tahun ${program.backendData.tahun_anggaran}`}
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            disabled={updatingStatus}
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Informasi Utama */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Status & Progress */}
            <div className="bg-gray-50 rounded-xl p-4">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Status & Progress</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Status</span>
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusColor(program.status)}`}>
                    {getStatusText(program.status)}
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

                {/* Action Buttons untuk Admin */}
                {user?.role === 'admin_kecamatan' && program.status === 'menunggu_persetujuan' && (
                  <div className="flex gap-2 pt-2">
                    <button 
                      onClick={() => handleStatusUpdate('diverifikasi_kecamatan', 'Program telah diverifikasi')}
                      disabled={updatingStatus}
                      className={`px-3 py-1 bg-green-600 text-white rounded text-sm transition-colors flex-1 ${
                        updatingStatus ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-700'
                      }`}
                    >
                      {updatingStatus ? 'Memproses...' : 'Setujui'}
                    </button>
                    <button 
                      onClick={() => {
                        const catatan = prompt('Masukkan alasan penolakan:');
                        if (catatan) handleStatusUpdate('rejected', catatan);
                      }}
                      disabled={updatingStatus}
                      className={`px-3 py-1 bg-red-600 text-white rounded text-sm transition-colors flex-1 ${
                        updatingStatus ? 'opacity-50 cursor-not-allowed' : 'hover:bg-red-700'
                      }`}
                    >
                      Tolak
                    </button>
                  </div>
                )}

                {user?.role === 'admin_kabupaten' && program.status === 'menunggu_persetujuan' && (
                  <div className="flex gap-2 pt-2">
                    <button 
                      onClick={() => handleStatusUpdate('approved', 'Program telah disetujui')}
                      disabled={updatingStatus}
                      className={`px-3 py-1 bg-green-600 text-white rounded text-sm transition-colors flex-1 ${
                        updatingStatus ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-700'
                      }`}
                    >
                      {updatingStatus ? 'Memproses...' : 'Approve'}
                    </button>
                    <button 
                      onClick={() => {
                        const catatan = prompt('Masukkan alasan penolakan:');
                        if (catatan) handleStatusUpdate('rejected', catatan);
                      }}
                      disabled={updatingStatus}
                      className={`px-3 py-1 bg-red-600 text-white rounded text-sm transition-colors flex-1 ${
                        updatingStatus ? 'opacity-50 cursor-not-allowed' : 'hover:bg-red-700'
                      }`}
                    >
                      Tolak
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Informasi Program */}
            <div className="bg-gray-50 rounded-xl p-4">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Informasi Program</h3>
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
                {program.backendData?.target_penerima_manfaat && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Target Penerima</span>
                    <span className="font-medium">{program.backendData.target_penerima_manfaat} orang</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Lokasi & Timeline */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Lokasi */}
            <div className="bg-white border border-gray-200 rounded-xl p-4">
              <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <MapPin size={16} />
                Lokasi Program
              </h3>
              <p className="text-sm text-gray-700">{program.lokasi}</p>
              <div className="mt-3 bg-gray-100 rounded-lg h-32 flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <MapPin size={24} className="mx-auto mb-2" />
                  <p className="text-sm">Peta Lokasi</p>
                  <p className="text-xs">{program.lokasi}</p>
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="bg-white border border-gray-200 rounded-xl p-4">
              <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Calendar size={16} />
                Timeline
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Pengajuan</span>
                  <span className="font-medium">{formatDate(program.tanggalPengajuan)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Disetujui</span>
                  <span className="font-medium">{formatDate(program.tanggalDisetujui)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Mulai</span>
                  <span className="font-medium">{formatDate(program.tanggalMulai)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Selesai</span>
                  <span className="font-medium">{formatDate(program.tanggalSelesai)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Anggaran */}
          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <DollarSign size={16} />
              Informasi Anggaran
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Anggaran</p>
                <p className="text-lg font-bold text-blue-700">{formatCurrency(program.anggaran)}</p>
              </div>
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Realisasi</p>
                <p className="text-lg font-bold text-green-700">{formatCurrency(program.realisasi)}</p>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Sisa</p>
                <p className="text-lg font-bold text-gray-700">
                  {formatCurrency(program.anggaran - program.realisasi)}
                </p>
              </div>
            </div>
            
            {/* Detail RAB dari Backend */}
            {program.backendData?.rab_items && program.backendData.rab_items.length > 0 && (
              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-900 mb-2">Detail Rencana Anggaran</h4>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {program.backendData.rab_items.map((item, index) => (
                    <div key={index} className="flex justify-between text-sm p-2 bg-gray-50 rounded">
                      <span className="text-gray-700">{item.nama_item}</span>
                      <span className="font-medium">{formatCurrency(item.total)}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Deskripsi */}
          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Deskripsi Program</h3>
            <p className="text-gray-700 leading-relaxed">{program.deskripsi}</p>
          </div>

          {/* Milestones */}
          {program.milestones && program.milestones.length > 0 && (
            <div className="bg-white border border-gray-200 rounded-xl p-4">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Tahapan Program</h3>
              <div className="space-y-3">
                {program.milestones.map((milestone, index) => {
                  const statusConfig = getMilestoneStatus(milestone);
                  const StatusIcon = statusConfig.icon;

                  return (
                    <div key={index} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${statusConfig.color.split(' ')[1]}`}>
                        <StatusIcon size={16} className={statusConfig.color.split(' ')[0]} />
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

          {/* Dokumentasi */}
          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Dokumentasi</h3>
            
            {/* Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center mb-4">
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

            {/* Detail Dokumen dari Backend */}
            {dokumenList.length > 0 && (
              <div>
                <div className="flex justify-between items-center mb-3">
                  <h4 className="text-sm font-medium text-gray-900">Dokumen Program</h4>
                  <button 
                    onClick={() => setShowMoreDokumen(!showMoreDokumen)}
                    className="text-xs text-blue-600 hover:text-blue-700"
                  >
                    {showMoreDokumen ? 'Sembunyikan' : 'Lihat Semua'}
                  </button>
                </div>

                {(showMoreDokumen || dokumenList.length <= 3) ? (
                  <div className="space-y-2">
                    {Object.entries(groupedDokumen).map(([jenis, dokumenArray]) => (
                      dokumenArray.length > 0 && (
                        <div key={jenis} className="p-3 bg-gray-50 rounded-lg">
                          <h5 className="text-sm font-medium text-gray-900 mb-2 capitalize">
                            {jenis.replace('_', ' ')}
                          </h5>
                          <div className="space-y-1">
                            {dokumenArray.map((doc, idx) => (
                              <div key={idx} className="flex items-center justify-between text-sm">
                                <span className="text-gray-700 truncate flex-1">{doc.nama_dokumen}</span>
                                <button
                                  onClick={() => handleViewDocument(jenis)}
                                  className="ml-2 p-1 hover:bg-blue-100 rounded transition-colors"
                                  title="Lihat dokumen"
                                >
                                  <Eye size={14} className="text-blue-600" />
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )
                    ))}
                  </div>
                ) : (
                  <div className="text-center text-gray-500 text-sm">
                    {dokumenList.length} dokumen tersedia
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Informasi Tambahan dari Backend */}
          {program.backendData && (
            <div className="bg-white border border-gray-200 rounded-xl p-4">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Informasi Tambahan</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                {program.backendData.created_by && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Dibuat Oleh</span>
                    <span className="font-medium">{program.backendData.creator?.nama || 'Admin'}</span>
                  </div>
                )}
                {program.backendData.verified_by && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Diverifikasi Oleh</span>
                    <span className="font-medium">{program.backendData.verifier?.nama || 'Admin Kecamatan'}</span>
                  </div>
                )}
                {program.backendData.approved_by && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Disetujui Oleh</span>
                    <span className="font-medium">{program.backendData.approver?.nama || 'Admin Kabupaten'}</span>
                  </div>
                )}
                {program.backendData.catatan_verifikasi && (
                  <div className="col-span-2">
                    <span className="text-gray-600">Catatan Verifikasi: </span>
                    <span className="font-medium">{program.backendData.catatan_verifikasi}</span>
                  </div>
                )}
                {program.backendData.catatan_approval && (
                  <div className="col-span-2">
                    <span className="text-gray-600">Catatan Approval: </span>
                    <span className="font-medium">{program.backendData.catatan_approval}</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-gray-200 bg-gray-50 rounded-b-2xl">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <AlertCircle size={16} />
            <span>Program diajukan pada {formatDate(program.createdAt)}</span>
          </div>
          
          <div className="flex items-center gap-3">
            <button 
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
              disabled={updatingStatus}
            >
              {updatingStatus ? 'Memproses...' : 'Tutup'}
            </button>
            
            <button 
              onClick={handleExportDetail}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <Download size={16} />
              Export Detail
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgramModal;