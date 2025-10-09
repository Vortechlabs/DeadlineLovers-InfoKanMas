import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { useAuth } from '@/context/AuthContext';
import ProgramService from '@/services/ProgramService';
import ProgramHeader from './ProgramHeader';
import StepWizard from './StepWizard';
import ProgramForm from './ProgramForm';
import RABForm from './RABForm';
import DocumentUpload from './DocumentUpload';
import PreviewModal from './PreviewModal';
import SuccessToast from './SuccessToast';

const AdminDesaAjukanProgram = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [showPreview, setShowPreview] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [metadata, setMetadata] = useState(null);
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    // Step 1: Informasi Program
    namaProgram: '',
    kategori: '',
    jenis: 'pembangunan',
    prioritas: 'sedang',
    lokasi: '',
    penanggungJawab: '',
    deskripsi: '',
    tanggalMulai: '',
    tanggalSelesai: '',
    targetPenerimaManfaat: 0,

    // Step 2: RAB (Rencana Anggaran Biaya)
    items: [
      {
        id: 1,
        nama: '',
        volume: '',
        satuan: '',
        hargaSatuan: '',
        total: 0
      }
    ],
    totalAnggaran: 0,

    // Step 3: Dokumen Pendukung
    dokumen: {
      proposal: null,
      gambarTeknis: null,
      suratPermohonan: null,
      fotoLokasi: []
    }
  });

  const steps = [
    { number: 1, title: 'Informasi Program', description: 'Data dasar program' },
    { number: 2, title: 'Rencana Anggaran', description: 'Detail RAB program' },
    { number: 3, title: 'Dokumen Pendukung', description: 'Upload berkas' },
    { number: 4, title: 'Review & Submit', description: 'Finalisasi pengajuan' }
  ];

  // Load metadata saat component mount
  useEffect(() => {
    loadMetadata();
  }, []);

  const loadMetadata = async () => {
    try {
      const response = await ProgramService.getCreateMetadata();
      setMetadata(response.data);
    } catch (error) {
      console.error('Failed to load metadata:', error);
      toast.error('Gagal memuat data form');
    }
  };

  const handleNextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    
    try {
      // Submit ke backend
      const response = await ProgramService.createProgram(formData);
      
      // Show success toast dengan data dari backend
      toast.custom((t) => (
        <SuccessToast 
          toastId={t} 
          programData={formData}
          backendResponse={response}
        />
      ), {
        duration: 5000,
      });

      // Reset form setelah submit berhasil
      resetForm();
      
    } catch (error) {
      console.error('Submit failed:', error);
      const errorMessage = error.response?.data?.message || 'Gagal mengajukan program. Silakan coba lagi.';
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      namaProgram: '',
      kategori: '',
      jenis: 'pembangunan',
      prioritas: 'sedang',
      lokasi: '',
      penanggungJawab: user?.nama || '', // Default ke nama user
      deskripsi: '',
      tanggalMulai: '',
      tanggalSelesai: '',
      targetPenerimaManfaat: 0,
      items: [{ id: 1, nama: '', volume: '', satuan: '', hargaSatuan: '', total: 0 }],
      totalAnggaran: 0,
      dokumen: {
        proposal: null,
        gambarTeknis: null,
        suratPermohonan: null,
        fotoLokasi: []
      }
    });
    
    setCurrentStep(1);
    setShowPreview(false);
  };

  const updateFormData = (newData) => {
    setFormData(prev => ({ ...prev, ...newData }));
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <ProgramForm 
            formData={formData}
            onUpdate={updateFormData}
            onNext={handleNextStep}
            metadata={metadata}
          />
        );
      case 2:
        return (
          <RABForm 
            formData={formData}
            onUpdate={updateFormData}
            onNext={handleNextStep}
            onBack={handlePrevStep}
          />
        );
      case 3:
        return (
          <DocumentUpload 
            formData={formData}
            onUpdate={updateFormData}
            onNext={handleNextStep}
            onBack={handlePrevStep}
          />
        );
      case 4:
        return (
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">✅</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Siap Mengajukan Program
              </h3>
              <p className="text-gray-600 mb-6">
                Program <span className="font-semibold">{formData.namaProgram}</span> siap diajukan ke Kecamatan untuk proses persetujuan.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={() => setShowPreview(true)}
                  className="px-6 py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-medium"
                >
                  Preview Pengajuan
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className={`px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg transition-all font-medium shadow-lg shadow-green-500/25 flex items-center gap-2 ${
                    isSubmitting 
                      ? 'opacity-50 cursor-not-allowed' 
                      : 'hover:from-green-600 hover:to-emerald-700'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Mengajukan...
                    </>
                  ) : (
                    <>
                      🚀 Ajukan ke Kecamatan
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-emerald-50">
      <div className="w-full max-w-full">
        {/* Header */}
        <ProgramHeader />

        {/* Content */}
        <div className="p-4 sm:p-6 max-w-6xl mx-auto">
          {/* Step Wizard */}
          <StepWizard 
            steps={steps}
            currentStep={currentStep}
          />

          {/* Step Content */}
          <div className="mt-8">
            {renderStepContent()}
          </div>
        </div>

        {/* Preview Modal */}
        {showPreview && (
          <PreviewModal
            programData={formData}
            onClose={() => setShowPreview(false)}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
          />
        )}
      </div>
    </div>
  );
};

export default AdminDesaAjukanProgram;