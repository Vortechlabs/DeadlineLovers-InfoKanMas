import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { 
  X, 
  Upload, 
  Camera, 
  FileText, 
  Calendar, 
  DollarSign,
  CheckCircle,
  Clock,
  PlayCircle,
  AlertCircle
} from 'lucide-react';
import ProgramService from '@/services/ProgramService';

const ProgressModal = ({ program, onClose, onUpdate }) => {
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

  // Load tahapan program saat modal terbuka
  useEffect(() => {
    if (program?.backendData?.tahapan) {
      setTahapan(program.backendData.tahapan);
    }
  }, [program]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.tahapan_id) {
      toast.error('Pilih tahapan terlebih dahulu');
      return;
    }

    setUploading(true);

    try {
      // Submit progress update
      const progressData = {
        tahapan_id: parseInt(formData.tahapan_id),
        persentase: parseInt(formData.persentase),
        deskripsi_progress: formData.deskripsi_progress,
        anggaran_terpakai: parseFloat(formData.anggaran_terpakai) || 0,
        tanggal_progress: formData.tanggal_progress
      };

      const progressResponse = await ProgramService.updateProgress(program.backendData.id, progressData);
      
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
      const errorMessage = error.response?.data?.message || 'Gagal mengupdate progress';
      toast.error(errorMessage);
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

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-xs flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 sticky top-0 bg-white">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Update Progress Program</h2>
            <p className="text-sm text-gray-500 mt-1">{program.nama}</p>
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
                <span className="font-semibold ml-2">{program.progress}%</span>
              </div>
              <div>
                <span className="text-blue-700">Anggaran Tersisa:</span>
                <span className="font-semibold ml-2">
                  Rp {(program.anggaran - program.realisasi).toLocaleString('id-ID')}
                </span>
              </div>
            </div>
          </div>

          {/* Tahapan */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Pilih Tahapan <span className="text-red-500">*</span>
            </label>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {tahapan.map((tahap) => {
                const StatusIcon = getTahapanStatusIcon(tahap.status);
                return (
                  <label 
                    key={tahap.id}
                    className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition-colors ${
                      formData.tahapan_id === tahap.id.toString() 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="tahapan_id"
                      value={tahap.id}
                      checked={formData.tahapan_id === tahap.id.toString()}
                      onChange={(e) => setFormData({...formData, tahapan_id: e.target.value})}
                      className="text-blue-600 focus:ring-blue-500"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-gray-900">{tahap.nama_tahapan}</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTahapanStatusColor(tahap.status)}`}>
                          <StatusIcon size={12} className="inline mr-1" />
                          {tahap.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">{tahap.deskripsi}</p>
                      <div className="flex items-center gap-4 text-xs text-gray-500 mt-2">
                        <span>Target: {tahap.persentase}%</span>
                        <span>•</span>
                        <span>
                          {new Date(tahap.tanggal_mulai_rencana).toLocaleDateString('id-ID')} - {' '}
                          {new Date(tahap.tanggal_selesai_rencana).toLocaleDateString('id-ID')}
                        </span>
                      </div>
                    </div>
                  </label>
                );
              })}
            </div>
            {tahapan.length === 0 && (
              <p className="text-sm text-gray-500 text-center py-4">
                Tidak ada tahapan tersedia untuk program ini.
              </p>
            )}
          </div>

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
                className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <span className="w-16 text-center font-medium text-gray-700">
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
                max={program.anggaran - program.realisasi}
                step="1000"
                value={formData.anggaran_terpakai}
                onChange={(e) => setFormData({...formData, anggaran_terpakai: e.target.value})}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="0"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Sisa anggaran: Rp {(program.anggaran - program.realisasi).toLocaleString('id-ID')}
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
              disabled={uploading || !formData.tahapan_id || !formData.deskripsi_progress}
              className={`flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg transition-colors flex items-center justify-center gap-2 font-medium ${
                uploading || !formData.tahapan_id || !formData.deskripsi_progress
                  ? 'opacity-50 cursor-not-allowed' 
                  : 'hover:bg-blue-700'
              }`}
            >
              {uploading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
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