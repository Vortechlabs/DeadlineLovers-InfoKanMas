import React, { useRef } from 'react';
import { Upload, FileText, Image, X, CheckCircle, AlertCircle, Plus } from 'lucide-react';

const DocumentUpload = ({ formData, onUpdate, onNext, onBack }) => {
  const fileInputRef = useRef({});

  // ✅ HAPUS FIELD RUNDOWN DARI DOKUMEN TYPES
  const documentTypes = [
    {
      key: 'proposal',
      label: 'Proposal Program',
      description: 'Dokumen proposal lengkap program dalam format PDF',
      accept: '.pdf',
      required: true
    },
    {
      key: 'gambarTeknis',
      label: 'Gambar Teknis',
      description: 'Gambar teknis atau desain (PDF, JPG, PNG)',
      accept: '.pdf,.jpg,.jpeg,.png',
      required: false
    },
    {
      key: 'suratPermohonan',
      label: 'Surat Permohonan',
      description: 'Surat permohonan resmi dari desa (PDF)',
      accept: '.pdf',
      required: true
    },
    {
      key: 'fotoLokasi',
      label: 'Foto Lokasi',
      description: 'Foto kondisi existing lokasi program (maks 5 foto)',
      accept: '.jpg,.jpeg,.png',
      multiple: true,
      required: false
    }
  ];

  const handleFileUpload = (docType, files) => {
    const updatedDokumen = { ...formData.dokumen };
    
    if (docType === 'fotoLokasi') {
      // Handle multiple photos - pastikan tidak melebihi 5
      const newPhotos = Array.from(files).slice(0, 5);
      
      // Gabungkan dengan foto yang sudah ada
      const existingPhotos = updatedDokumen[docType] || [];
      const allPhotos = [...existingPhotos, ...newPhotos].slice(0, 5); // Max 5
      
      updatedDokumen[docType] = allPhotos;
    } else {
      // Handle single file
      updatedDokumen[docType] = files[0];
    }
    
    onUpdate({ dokumen: updatedDokumen });
  };

  const removeFile = (docType, index = null) => {
    const updatedDokumen = { ...formData.dokumen };
    
    if (docType === 'fotoLokasi' && index !== null) {
      updatedDokumen[docType] = updatedDokumen[docType].filter((_, i) => i !== index);
    } else {
      updatedDokumen[docType] = null;
    }
    
    onUpdate({ dokumen: updatedDokumen });
  };

  const getFileInfo = (docType) => {
    const file = formData.dokumen[docType];
    if (!file) return null;

    if (docType === 'fotoLokasi') {
      return Array.isArray(file) ? file : [file];
    }
    
    return file;
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (fileType) => {
    if (fileType?.includes('image')) return Image;
    if (fileType?.includes('pdf')) return FileText;
    return FileText;
  };

  // Tambahkan validasi sebelum submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validasi dokumen wajib
    if (!formData.dokumen.proposal || !formData.dokumen.suratPermohonan) {
      alert('Harap upload proposal dan surat permohonan yang wajib diisi');
      return;
    }

    try {
      onNext();
    } catch (error) {
      console.error('Error submitting documents:', error);
      alert('Terjadi error saat upload dokumen. Silakan coba lagi.');
    }
  };

  const isDocumentUploaded = (docType) => {
    const file = formData.dokumen[docType];
    if (docType === 'fotoLokasi') {
      return Array.isArray(file) && file.length > 0;
    }
    return !!file;
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
      <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-purple-50 to-pink-50">
        <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <Upload size={20} className="text-purple-600" />
          Dokumen Pendukung
        </h2>
        <p className="text-sm text-gray-600 mt-1">
          Upload dokumen-dokumen pendukung untuk program {formData.namaProgram}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="p-6">
        <div className="space-y-6">
          {documentTypes.map((docType) => {
            const files = getFileInfo(docType.key);
            const isUploaded = isDocumentUploaded(docType.key);
            const FileIcon = getFileIcon(files?.type);

            return (
              <div key={docType.key} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-medium text-gray-900">{docType.label}</h3>
                      {docType.required && (
                        <span className="text-xs text-red-500">*Wajib</span>
                      )}
                      {isUploaded && (
                        <CheckCircle size={16} className="text-green-500" />
                      )}
                    </div>
                    <p className="text-sm text-gray-600">{docType.description}</p>
                  </div>
                </div>

                {/* Upload Area */}
                {!isUploaded && (
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                    <FileIcon className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600 mb-2">
                      Drag & drop file atau klik untuk upload
                    </p>
                    <p className="text-xs text-gray-500 mb-3">
                      {docType.accept} {docType.multiple && '(multiple)'}
                    </p>
                    <input
                      ref={el => fileInputRef.current[docType.key] = el}
                      type="file"
                      accept={docType.accept}
                      multiple={docType.multiple}
                      onChange={(e) => handleFileUpload(docType.key, e.target.files)}
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current[docType.key]?.click()}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                    >
                      Pilih File
                    </button>
                  </div>
                )}

                {/* Uploaded Files */}
                {isUploaded && (
                  <div className="space-y-2">
                    {docType.key === 'fotoLokasi' ? (
                      <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                        {files.map((file, index) => {
                          const Icon = getFileIcon(file.type);
                          return (
                            <div key={index} className="relative border border-gray-200 rounded-lg p-2">
                              <div className="flex items-center gap-2">
                                <Icon size={16} className="text-blue-600" />
                                <div className="flex-1 min-w-0">
                                  <p className="text-xs font-medium text-gray-900 truncate">
                                    {file.name}
                                  </p>
                                  <p className="text-xs text-gray-500">
                                    {formatFileSize(file.size)}
                                  </p>
                                </div>
                              </div>
                              <button
                                type="button"
                                onClick={() => removeFile(docType.key, index)}
                                className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600 transition-colors"
                              >
                                <X size={12} />
                              </button>
                            </div>
                          );
                        })}
                        {files.length < 5 && (
                          <button
                            type="button"
                            onClick={() => fileInputRef.current[docType.key]?.click()}
                            className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-gray-400 transition-colors flex flex-col items-center justify-center"
                          >
                            <Plus size={20} className="text-gray-400 mb-1" />
                            <span className="text-xs text-gray-600">Tambah Foto</span>
                          </button>
                        )}
                      </div>
                    ) : (
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <FileText size={20} className="text-blue-600" />
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              {files.name}
                            </p>
                            <p className="text-xs text-gray-500">
                              {formatFileSize(files.size)}
                            </p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFile(docType.key)}
                          className="p-1 text-red-600 hover:bg-red-100 rounded transition-colors"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    )}
                    
                    {/* Change File Button */}
                    <button
                      type="button"
                      onClick={() => fileInputRef.current[docType.key]?.click()}
                      className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                    >
                      Ganti File
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Upload Summary */}
        <div className="mt-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4">
          <h4 className="font-medium text-gray-900 mb-2">Ringkasan Upload</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            {documentTypes.map((docType) => (
              <div key={docType.key} className="flex items-center gap-2">
                {isDocumentUploaded(docType.key) ? (
                  <CheckCircle size={16} className="text-green-500" />
                ) : (
                  <AlertCircle size={16} className={docType.required ? 'text-red-500' : 'text-yellow-500'} />
                )}
                <span className={isDocumentUploaded(docType.key) ? 'text-gray-700' : docType.required ? 'text-red-600' : 'text-gray-500'}>
                  {docType.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between pt-6">
          <button
            type="button"
            onClick={onBack}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
          >
            ← Kembali ke RAB
          </button>
          <button
            type="submit"
            className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-lg hover:from-purple-600 hover:to-pink-700 transition-all font-medium shadow-lg shadow-purple-500/25 flex items-center gap-2"
          >
            Review Pengajuan
            <span className="text-sm">→</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default DocumentUpload;