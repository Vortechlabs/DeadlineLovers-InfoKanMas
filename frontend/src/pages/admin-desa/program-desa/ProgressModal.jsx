import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { 
  X, 
  Upload, 
  FileText, 
  Calendar, 
  DollarSign,
  CheckCircle,
  Clock,
  PlayCircle,
  AlertCircle,
  Loader
} from 'lucide-react';
import ProgramService from '@/services/ProgramService';
import { useAuth } from '@/context/AuthContext';

const ProgressModal = ({ program, onClose, onUpdate }) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    tahapan_id: '',
    persentase: 0,
    deskripsi_progress: '',
    anggaran_terpakai: 0,
    tanggal_progress: new Date().toISOString().split('T')[0]
  });
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [tahapan, setTahapan] = useState([]);
  const [loadingTahapan, setLoadingTahapan] = useState(false);

  // Load tahapan program saat modal terbuka
  useEffect(() => {
    console.log('Program received in modal:', program);
    console.log('Tahapan from program:', program?.backendData?.tahapan);
    loadTahapanProgram();
  }, [program]);

  const loadTahapanProgram = async () => {
    // Coba gunakan data tahapan yang sudah ada di program
    if (program?.backendData?.tahapan && program.backendData.tahapan.length > 0) {
      console.log('Using existing tahapan data');
      setTahapan(program.backendData.tahapan);
      return;
    }

    // Jika tidak ada, load dari API
    if (!program?.backendData?.id) {
      console.log('No program ID available');
      setTahapan([]);
      return;
    }
    
    console.log('Loading tahapan from API...');
    setLoadingTahapan(true);
    try {
      const response = await ProgramService.getProgramDetail(program.backendData.id);
      console.log('API response for tahapan:', response);
      
      if (response.success && response.data.program.tahapan) {
        setTahapan(response.data.program.tahapan);
        console.log('Tahapan loaded from API:', response.data.program.tahapan);
      } else {
        setTahapan([]);
        console.log('No tahapan found in API response');
      }
    } catch (error) {
      console.error('Failed to load tahapan:', error);
      setTahapan([]);
    } finally {
      setLoadingTahapan(false);
    }
  };

// Di ProgressModal.jsx - perbaiki handleSubmit
const handleSubmit = async (e) => {
  e.preventDefault();
  
  if (!formData.tahapan_id) {
    toast.error('Pilih tahapan terlebih dahulu');
    return;
  }

  if (!formData.deskripsi_progress.trim()) {
    toast.error('Deskripsi progress harus diisi');
    return;
  }

  setUploading(true);

  try {
    // Submit progress update
    const progressData = {
      tahapan_id: parseInt(formData.tahapan_id),
      persentase: parseInt(formData.persentase),
      deskripsi_progress: formData.deskripsi_progress.trim(),
      anggaran_terpakai: parseFloat(formData.anggaran_terpakai) || 0,
      tanggal_progress: formData.tanggal_progress
    };

    console.log('Submitting progress for program:', program.backendData.id);
    console.log('Progress data:', progressData);

    const progressResponse = await ProgramService.updateProgress(
      program.backendData.id, 
      progressData
    );
    
    // Upload files jika ada
    if (files.length > 0 && progressResponse.data?.id) {
      for (const file of files) {
        await ProgramService.uploadProgressDocument(
          program.backendData.id, 
          progressResponse.data.id, 
          file
        );
      }
    }

    toast.success('Progress berhasil diupdate!');
    onUpdate(); // Refresh data parent
    onClose();
  } catch (error) {
    console.error('Error updating progress:', error);
    
    // ✅ HANDLE ERROR 403 DENGAN BAIK
    if (error.response?.status === 403) {
      const errorMessage = error.response?.data?.message || 'Anda tidak memiliki akses untuk mengupdate program ini.';
      toast.error(`Akses Ditolak: ${errorMessage}`);
      
      // Tampilkan informasi program untuk debugging
      console.error('Program details:', {
        programId: program.backendData.id,
        programWilayah: program.backendData.wilayah_id,
        userWilayah: 'Check user data in AuthContext' // Anda perlu menambahkan ini
      });
    } else {
      const errorMessage = error.response?.data?.message || 'Gagal mengupdate progress';
      toast.error(errorMessage);
    }
  } finally {
    setUploading(false);
  }
};

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    
    // Validasi file size (max 10MB)
    const validFiles = selectedFiles.filter(file => {
      if (file.size > 10 * 1024 * 1024) {
        toast.error(`File ${file.name} terlalu besar (max 10MB)`);
        return false;
      }
      return true;
    });
    
    setFiles(prev => [...prev, ...validFiles]);
  };

  const removeFile = (index) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const getTahapanStatusIcon = (status) => {
    switch (status) {
      case 'selesai': return CheckCircle;
      case 'dalam_pengerjaan': return PlayCircle;
      case 'menunggu': return Clock;
      default: return Clock;
    }
  };

  const getTahapanStatusColor = (status) => {
    switch (status) {
      case 'selesai': return 'text-green-600 bg-green-100';
      case 'dalam_pengerjaan': return 'text-blue-600 bg-blue-100';
      case 'menunggu': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const handleTahapanSelect = (tahapId) => {
    console.log('Tahapan selected:', tahapId);
    setFormData(prev => ({
      ...prev,
      tahapan_id: tahapId.toString()
    }));
  };

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return '-';
    try {
      return new Date(dateString).toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      });
    } catch (error) {
      return '-';
    }
  };

  // Di ProgressModal.jsx - tambahkan debug info
console.log('🔐 Authorization Debug:', {
  programId: program.backendData.id,
  programWilayahId: program.backendData.wilayah_id,
  programWilayahName: program.lokasi,
  userRole: 'admin_desa', // Ganti dengan actual user role
  // Tambahkan user wilayah data jika available
});

// Di AdminDesaProgramDesa.js - log user data
console.log('👤 Current User:', user);
console.log('🏠 User wilayah:', user?.alamat_lengkap);

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-xs flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 sticky top-0 bg-white">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Update Progress Program</h2>
            <p className="text-sm text-gray-500 mt-1">{program?.nama || 'Program'}</p>
          </div>
          <button 
            onClick={onClose}
            disabled={uploading}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Informasi Program */}
          <div className="bg-blue-50 rounded-lg p-4">
            <h3 className="font-medium text-blue-900 mb-2">Informasi Program</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-blue-700">Progress Saat Ini:</span>
                <span className="font-semibold ml-2">{program?.progress || 0}%</span>
              </div>
              <div>
                <span className="text-blue-700">Anggaran Tersisa:</span>
                <span className="font-semibold ml-2">
                  {formatCurrency((program?.anggaran || 0) - (program?.realisasi || 0))}
                </span>
              </div>
            </div>
          </div>

          {/* Tahapan */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Pilih Tahapan <span className="text-red-500">*</span>
            </label>
            
            {loadingTahapan ? (
              <div className="flex items-center justify-center py-8">
                <Loader size={20} className="animate-spin text-blue-600 mr-2" />
                <span className="text-gray-600">Memuat tahapan...</span>
              </div>
            ) : (
              <div className="space-y-2 max-h-60 overflow-y-auto border border-gray-200 rounded-lg p-2">
                {tahapan.length > 0 ? (
                  tahapan.map((tahap) => {
                    const StatusIcon = getTahapanStatusIcon(tahap.status);
                    const isSelected = formData.tahapan_id === tahap.id.toString();
                    
                    return (
                      <div 
                        key={tahap.id}
                        onClick={() => handleTahapanSelect(tahap.id)}
                        className={`p-4 border rounded-lg cursor-pointer transition-all ${
                          isSelected 
                            ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200' 
                            : 'border-gray-200 hover:bg-gray-50 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-3 flex-1">
                            <div className={`mt-1 w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                              isSelected 
                                ? 'border-blue-600 bg-blue-600' 
                                : 'border-gray-400'
                            }`}>
                              {isSelected && (
                                <div className="w-2 h-2 rounded-full bg-white"></div>
                              )}
                            </div>
                            
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-1">
                                <span className="font-medium text-gray-900">{tahap.nama_tahapan}</span>
                                <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${getTahapanStatusColor(tahap.status)}`}>
                                  <StatusIcon size={12} />
                                  {tahap.status.replace('_', ' ')}
                                </span>
                              </div>
                              
                              <p className="text-sm text-gray-600 mb-2">{tahap.deskripsi}</p>
                              
                              <div className="flex items-center gap-4 text-xs text-gray-500">
                                <span>Target: {tahap.persentase}%</span>
                                <span>•</span>
                                <span>
                                  {formatDate(tahap.tanggal_mulai_rencana)} - {' '}
                                  {formatDate(tahap.tanggal_selesai_rencana)}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="text-center py-8">
                    <AlertCircle size={32} className="mx-auto text-gray-400 mb-2" />
                    <p className="text-gray-500">Tidak ada tahapan tersedia</p>
                    <p className="text-sm text-gray-400 mt-1">
                      Program ini belum memiliki tahapan pelaksanaan
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Hanya tampilkan form progress jika tahapan dipilih */}
          {formData.tahapan_id && (
            <>
              {/* Persentase Progress */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Persentase Progress (%) <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={formData.persentase}
                    onChange={(e) => setFormData({...formData, persentase: e.target.value})}
                    className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-600"
                  />
                  <span className="w-16 text-center font-medium text-gray-700 bg-gray-100 py-1 px-2 rounded">
                    {formData.persentase}%
                  </span>
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>0%</span>
                  <span>50%</span>
                  <span>100%</span>
                </div>
              </div>

              {/* Anggaran Terpakai */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Anggaran Terpakai
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="number"
                    min="0"
                    max={(program?.anggaran || 0) - (program?.realisasi || 0)}
                    step="1000"
                    value={formData.anggaran_terpakai}
                    onChange={(e) => setFormData({...formData, anggaran_terpakai: e.target.value})}
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="0"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Sisa anggaran: {formatCurrency((program?.anggaran || 0) - (program?.realisasi || 0))}
                </p>
              </div>

              {/* Tanggal Progress */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tanggal Progress <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="date"
                    value={formData.tanggal_progress}
                    onChange={(e) => setFormData({...formData, tanggal_progress: e.target.value})}
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    required
                  />
                </div>
              </div>

              {/* Deskripsi */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Deskripsi Progress <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={formData.deskripsi_progress}
                  onChange={(e) => setFormData({...formData, deskripsi_progress: e.target.value})}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
                  placeholder="Jelaskan progress yang telah dicapai, kendala yang dihadapi, dan pencapaian penting..."
                  required
                />
              </div>

              {/* File Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Dokumentasi Progress
                </label>
                
                {/* Upload Area */}
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                  <input
                    type="file"
                    multiple
                    onChange={handleFileChange}
                    className="hidden"
                    id="file-upload"
                    accept="image/*,video/*,.pdf,.doc,.docx"
                  />
                  <label htmlFor="file-upload" className="cursor-pointer block">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">
                      Klik untuk upload foto, video, atau dokumen
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      PNG, JPG, PDF, DOC maks. 10MB per file
                    </p>
                  </label>
                </div>

                {/* File List */}
                {files.length > 0 && (
                  <div className="mt-3 space-y-2">
                    <p className="text-sm font-medium text-gray-700">File terpilih:</p>
                    {files.map((file, index) => (
                      <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                        <div className="flex items-center gap-3">
                          <FileText size={16} className="text-gray-400" />
                          <div>
                            <p className="text-sm font-medium text-gray-900 truncate max-w-xs">
                              {file.name}
                            </p>
                            <p className="text-xs text-gray-500">
                              {(file.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFile(index)}
                          className="text-red-600 hover:text-red-800 p-1 rounded transition-colors"
                          disabled={uploading}
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              disabled={uploading}
              className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={uploading || !formData.tahapan_id || !formData.deskripsi_progress.trim()}
              className={`flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg transition-colors flex items-center justify-center gap-2 font-medium ${
                uploading || !formData.tahapan_id || !formData.deskripsi_progress.trim()
                  ? 'opacity-50 cursor-not-allowed' 
                  : 'hover:bg-blue-700'
              }`}
            >
              {uploading ? (
                <>
                  <Loader size={16} className="animate-spin" />
                  Mengupdate...
                </>
              ) : (
                <>
                  <CheckCircle size={16} />
                  Update Progress
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProgressModal;