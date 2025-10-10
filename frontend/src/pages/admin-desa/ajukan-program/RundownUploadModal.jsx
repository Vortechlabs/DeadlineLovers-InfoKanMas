// RundownUploadModal.jsx - IMPROVED VERSION
import React, { useState, useRef, useEffect } from 'react';
import { Upload, FileText, Clock, CheckCircle, AlertCircle, X, Play, Download, Sparkles } from 'lucide-react';
import { toast } from 'sonner';
import AiDocumentService from '@/services/AiDocumentService';

const RundownUploadModal = ({ program, onClose, onTahapanGenerated }) => {
  const [uploading, setUploading] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [uploadedDoc, setUploadedDoc] = useState(null);
  const [processingStatus, setProcessingStatus] = useState(null);
  const [pollingInterval, setPollingInterval] = useState(null);
  const fileInputRef = useRef(null);

  // ✅ CEK: Program harus punya ID yang valid
  const canUpload = program?.id && program.id !== 'temp';

  // Cleanup polling interval ketika component unmount
  useEffect(() => {
    return () => {
      if (pollingInterval) {
        clearInterval(pollingInterval);
      }
    };
  }, [pollingInterval]);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // ✅ VALIDASI: Pastikan program punya ID yang valid
    if (!canUpload) {
      toast.error('Program belum dibuat. Silakan buat program terlebih dahulu sebelum upload rundown.');
      return;
    }

    // Validasi file
    const validTypes = [
      'application/pdf', 
      'application/msword', 
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'text/plain'
    ];
    
    const validExtensions = ['.pdf', '.doc', '.docx', '.txt'];
    const fileExtension = '.' + file.name.split('.').pop().toLowerCase();
    
    if (!validTypes.includes(file.type) && !validExtensions.includes(fileExtension)) {
      toast.error('Format file tidak didukung. Harus PDF, Word, atau TXT');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      toast.error('File terlalu besar. Maksimal 10MB');
      return;
    }

    setUploading(true);

    try {
      console.log('🔄 Starting rundown upload...', {
        programId: program.id,
        fileName: file.name,
        fileSize: file.size
      });

      const result = await AiDocumentService.uploadRundown(
        program.id,
        file, 
        `Rundown ${program.nama_program}`
      );

      console.log('✅ Upload response:', result);

      if (result.success) {
        setUploadedDoc(result.data);
        setProcessing(true);
        toast.success('Dokumen berhasil diupload. AI sedang menganalisis...');
        
        // Start polling untuk status
        startPollingStatus(result.data.id);
      } else {
        toast.error(result.message || 'Gagal upload dokumen');
      }
    } catch (error) {
      console.error('❌ Upload error:', error);
      const errorMessage = error.response?.data?.message || 'Terjadi kesalahan saat upload';
      toast.error(errorMessage);
    } finally {
      setUploading(false);
    }
  };

  const startPollingStatus = (docId) => {
    // Clear existing interval
    if (pollingInterval) {
      clearInterval(pollingInterval);
    }

    let attempts = 0;
    const maxAttempts = 60; // Max 60 attempts (5 menit)
    
    const pollStatus = async () => {
      try {
        attempts++;
        console.log(`🔄 Polling attempt ${attempts} for document: ${docId}`);
        
        const result = await AiDocumentService.getProcessingStatus(docId);
        
        if (result.success) {
          console.log('📊 Status result:', result.data);
          setProcessingStatus(result.data);
          
          if (result.data.status === 'completed') {
            console.log('✅ AI Processing completed!');
            setProcessing(false);
            clearInterval(pollingInterval);
            toast.success('AI berhasil mengekstrak tahapan dari dokumen!');
            
            // Auto-generate tahapan ke database
            await handleGenerateTahapan();
          } else if (result.data.status === 'failed') {
            console.error('❌ AI Processing failed:', result.data.catatan_ai);
            setProcessing(false);
            clearInterval(pollingInterval);
            toast.error('Gagal memproses dokumen: ' + result.data.catatan_ai);
          } else if (attempts >= maxAttempts) {
            console.error('⏰ Polling timeout reached');
            setProcessing(false);
            clearInterval(pollingInterval);
            toast.error('Timeout: Proses AI terlalu lama. Silakan coba lagi.');
          }
        } else {
          console.error('❌ Status check failed:', result.message);
        }
      } catch (error) {
        console.error('❌ Status check error:', error);
        if (attempts >= maxAttempts) {
          setProcessing(false);
          clearInterval(pollingInterval);
          toast.error('Gagal memeriksa status processing');
        }
      }
    };

    // Poll immediately first time
    pollStatus();
    
    // Then set interval for polling every 5 seconds
    const interval = setInterval(pollStatus, 5000);
    setPollingInterval(interval);
  };

  const handleGenerateTahapan = async () => {
    if (!uploadedDoc) {
      console.error('❌ No uploaded document found');
      return;
    }

    try {
      console.log('🔄 Generating tahapan to database...', uploadedDoc.id);
      
      const result = await AiDocumentService.generateTahapan(uploadedDoc.id);

      if (result.success) {
        console.log('✅ Tahapan generated successfully');
        toast.success('Tahapan program berhasil digenerate ke database!');
        
        // Panggil callback dengan data tahapan
        if (onTahapanGenerated && processingStatus) {
          onTahapanGenerated(processingStatus.tahapan_generated);
        }
        
        // Tutup modal
        onClose();
      } else {
        console.error('❌ Generate tahapan failed:', result.message);
        toast.error(result.message || 'Gagal generate tahapan');
      }
    } catch (error) {
      console.error('❌ Generate error:', error);
      toast.error('Terjadi kesalahan saat generate tahapan: ' + error.message);
    }
  };

  const handleDownloadTemplate = () => {
    const templateContent = `RUNDOWN PROGRAM: ${program.nama_program}

TAHAPAN PELAKSANAAN PROGRAM:

TAHAP 1: PERSIAPAN DAN PERENCANAAN (20%)
Tanggal: ${program.tanggal_mulai} - [tambah 15 hari]
- Penyusunan dokumen perencanaan teknis
- Survey lokasi dan pengukuran  
- Penyusunan RAB detail
- Koordinasi dengan pihak terkait
- Persiapan administrasi

TAHAP 2: PENGADAAN MATERIAL DAN PERSIAPAN (25%)
Tanggal: [tanggal setelah tahap 1] - [tambah 20 hari]
- Pengadaan material utama
- Pengadaan material pendukung
- Transportasi material ke lokasi
- Quality control material
- Penyiapan peralatan

TAHAP 3: PELAKSANAAN UTAMA (35%)
Tanggal: [tanggal setelah tahap 2] - [tambah 30 hari]
- Pekerjaan fisik utama program
- Monitoring dan evaluasi harian
- Quality assurance
- Laporan progress mingguan
- Koordinasi lapangan

TAHAP 4: FINISHING DAN PENYERAHAN (20%)
Tanggal: [tanggal setelah tahap 3] - ${program.tanggal_selesai}
- Pekerjaan finishing
- Testing dan commissioning
- Serah terima pekerjaan
- Dokumentasi akhir
- Laporan akhir

CATATAN PENTING:
- Total persentase harus 100%
- Sertakan tanggal dengan format YYYY-MM-DD
- Deskripsi aktivitas harus jelas
- Setiap tahap minimal memiliki 3-5 aktivitas`;

    const blob = new Blob([templateContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Template_Rundown_${program.nama_program.replace(/\s+/g, '_')}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    toast.info('Template rundown berhasil didownload');
  };

  const getStatusIcon = () => {
    if (!processingStatus) return null;
    
    switch (processingStatus.status) {
      case 'processing':
        return <Clock className="w-5 h-5 text-yellow-500 animate-pulse" />;
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'failed':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Clock className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusText = () => {
    if (!processingStatus) return 'Menunggu proses dimulai...';
    
    switch (processingStatus.status) {
      case 'processing':
        return 'AI sedang menganalisis dokumen... (Proses mungkin memakan waktu beberapa menit)';
      case 'completed':
        return `AI berhasil mengekstrak ${processingStatus.tahapan_generated?.length || 0} tahapan`;
      case 'failed':
        return `Gagal: ${processingStatus.catatan_ai}`;
      default:
        return 'Menunggu proses...';
    }
  };

  const handleReset = () => {
    // Clear polling interval
    if (pollingInterval) {
      clearInterval(pollingInterval);
      setPollingInterval(null);
    }
    
    // Reset state
    setUploadedDoc(null);
    setProcessingStatus(null);
    setProcessing(false);
    
    console.log('🔄 Modal state reset');
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 sticky top-0 bg-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">AI Rundown Analyzer</h2>
              <p className="text-sm text-gray-500 mt-1">{program.nama_program}</p>
              {/* ✅ TAMPILKAN STATUS PROGRAM */}
              {!canUpload && (
                <p className="text-xs text-red-500 mt-1">
                  ⚠️ Program harus dibuat terlebih dahulu
                </p>
              )}
            </div>
          </div>
          <button 
            onClick={() => {
              handleReset();
              onClose();
            }}
            disabled={uploading || processing}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* ✅ TAMPILKAN WARNING JIKA PROGRAM BELUM DIBUAT */}
          {!canUpload && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-red-600" />
                <div>
                  <h4 className="font-medium text-red-900">Program Belum Dibuat</h4>
                  <p className="text-sm text-red-700 mt-1">
                    Anda harus membuat program terlebih dahulu sebelum bisa upload rundown.
                    Silakan submit program, lalu buka kembali modal ini.
                  </p>
                </div>
              </div>
            </div>
          )}

          {!uploadedDoc ? (
            // Upload Section
            <div className="space-y-4">
              {/* Template Download */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200">
                <div className="flex items-center gap-3">
                  <Download className="w-5 h-5 text-blue-600" />
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">Butuh Template?</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      Download template rundown untuk format yang optimal
                    </p>
                  </div>
                  <button
                    onClick={handleDownloadTemplate}
                    disabled={!canUpload}
                    className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 ${
                      canUpload 
                        ? 'bg-blue-600 text-white hover:bg-blue-700' 
                        : 'bg-gray-400 text-gray-200 cursor-not-allowed'
                    }`}
                  >
                    <Download size={16} />
                    Template
                  </button>
                </div>
              </div>

              {/* Upload Area */}
              <div className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
                canUpload 
                  ? 'border-purple-300 bg-purple-25 hover:border-purple-400' 
                  : 'border-gray-300 bg-gray-100 cursor-not-allowed'
              }`}>
                <div className="w-16 h-16 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className={`w-8 h-8 ${canUpload ? 'text-purple-600' : 'text-gray-400'}`} />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Upload Dokumen Rundown</h3>
                <p className="text-sm text-gray-600 mb-4">
                  {canUpload 
                    ? 'Upload dokumen rundown tahapan program (PDF/DOC/DOCX/TXT)'
                    : 'Program harus dibuat terlebih dahulu'
                  }
                </p>
                
                {canUpload && (
                  <>
                    <p className="text-xs text-gray-500 mb-4">
                      AI akan otomatis mengekstrak tahapan dan analisis risiko
                    </p>
                    
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".pdf,.doc,.docx,.txt"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                    
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      disabled={uploading || !canUpload}
                      className={`px-6 py-3 rounded-lg font-medium flex items-center gap-2 mx-auto ${
                        uploading 
                          ? 'opacity-50 cursor-not-allowed' 
                          : canUpload
                            ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white hover:from-purple-600 hover:to-pink-700'
                            : 'bg-gray-400 text-gray-200 cursor-not-allowed'
                      }`}
                    >
                      {uploading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Uploading...
                        </>
                      ) : (
                        <>
                          <Upload size={16} />
                          Pilih File Rundown
                        </>
                      )}
                    </button>
                  </>
                )}
              </div>

              {/* AI Features - hanya tampil jika bisa upload */}
              {canUpload && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                  <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
                    <Sparkles className="w-6 h-6 text-green-600 mx-auto mb-2" />
                    <h4 className="font-medium text-green-900 text-sm">AI Extraction</h4>
                    <p className="text-xs text-green-700 mt-1">Ekstrak tahapan otomatis</p>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <AlertCircle className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                    <h4 className="font-medium text-blue-900 text-sm">Risk Analysis</h4>
                    <p className="text-xs text-blue-700 mt-1">Analisis risiko kecurangan</p>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg border border-purple-200">
                    <CheckCircle className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                    <h4 className="font-medium text-purple-900 text-sm">Auto Generate</h4>
                    <p className="text-xs text-purple-700 mt-1">Generate ke database</p>
                  </div>
                </div>
              )}
            </div>
          ) : (
            // Processing Section
            <div className="space-y-4">
              {/* File Info */}
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <div className="flex items-center gap-3">
                  <FileText className="w-8 h-8 text-blue-600" />
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{uploadedDoc.file_name}</p>
                    <p className="text-sm text-gray-500">
                      {(uploadedDoc.file_size / 1024 / 1024).toFixed(2)} MB • {uploadedDoc.mime_type}
                    </p>
                  </div>
                </div>
              </div>

              {/* Processing Status */}
              {processingStatus && (
                <div className={`rounded-lg p-4 border ${
                  processingStatus.status === 'completed' ? 'bg-green-50 border-green-200' :
                  processingStatus.status === 'failed' ? 'bg-red-50 border-red-200' :
                  'bg-blue-50 border-blue-200'
                }`}>
                  <div className="flex items-center gap-3">
                    {getStatusIcon()}
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">Status AI Processing</p>
                      <p className="text-sm text-gray-700 mt-1">{getStatusText()}</p>
                      
                      {processingStatus.status === 'processing' && (
                        <div className="mt-2">
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full animate-pulse"
                              style={{ width: '70%' }}
                            ></div>
                          </div>
                          <p className="text-xs text-gray-500 mt-1">
                            Proses mungkin memakan waktu 1-2 menit...
                          </p>
                        </div>
                      )}
                      
                      {processingStatus.resiko_kecurangan && (
                        <div className="flex items-center gap-3 mt-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            processingStatus.resiko_kecurangan === 'low' ? 'bg-green-100 text-green-800' :
                            processingStatus.resiko_kecurangan === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            Resiko: {processingStatus.resiko_kecurangan}
                          </span>
                          {processingStatus.presentase_kecurangan && (
                            <span className="text-xs text-gray-600">
                              Skor AI: {processingStatus.skor_ai}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Preview Tahapan */}
              {processingStatus?.tahapan_generated && processingStatus.tahapan_generated.length > 0 && (
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-4 py-3 border-b border-gray-200">
                    <h4 className="font-semibold text-gray-900">Tahapan Terdeteksi</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      {processingStatus.tahapan_generated.length} tahapan berhasil diekstrak AI
                    </p>
                  </div>
                  <div className="max-h-60 overflow-y-auto">
                    {processingStatus.tahapan_generated.map((tahap, index) => (
                      <div key={index} className="p-4 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors">
                        <div className="flex items-start gap-3">
                          <span className="w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-full text-xs flex items-center justify-center font-bold mt-1 flex-shrink-0">
                            {index + 1}
                          </span>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-3 mb-2 flex-wrap">
                              <h5 className="font-medium text-gray-900 text-sm">{tahap.nama_tahapan}</h5>
                              {tahap.persentase > 0 && (
                                <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium whitespace-nowrap">
                                  {tahap.persentase}%
                                </span>
                              )}
                            </div>
                            
                            {tahap.tanggal_mulai && tahap.tanggal_selesai && (
                              <div className="flex items-center gap-2 text-xs text-gray-600 mb-2">
                                <Clock size={12} />
                                <span>{tahap.tanggal_mulai} - {tahap.tanggal_selesai}</span>
                              </div>
                            )}
                            
                            {tahap.deskripsi && (
                              <p className="text-sm text-gray-700 line-clamp-2">{tahap.deskripsi}</p>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  onClick={handleReset}
                  className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  Upload Baru
                </button>
                
                {processingStatus?.status === 'completed' && (
                  <button
                    onClick={handleGenerateTahapan}
                    className="flex-1 px-4 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:from-green-600 hover:to-emerald-700 transition-colors font-medium flex items-center gap-2 justify-center"
                  >
                    <Play size={16} />
                    Generate ke Database
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RundownUploadModal;