// DI index.jsx - GANTI TOTAL
import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { useAuth } from '@/context/AuthContext';
import ProgramService from '@/services/ProgramService';
import ProgramHeader from './ProgramHeader';
import StepWizard from './StepWizard';
import ProgramForm from './ProgramForm';
import RABForm from './RABForm';
import DocumentUpload from './DocumentUpload';
import RundownUploadModal from './RundownUploadModal';
import PreviewModal from './PreviewModal';
import SuccessToast from './SuccessToast';
import { Upload } from 'lucide-react';
import RoadmapSelectionStep from './RoadmapSelectionStep';

const AdminDesaAjukanProgram = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [showPreview, setShowPreview] = useState(false);
  const [showRundownModal, setShowRundownModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [metadata, setMetadata] = useState(null);
  const [createdProgram, setCreatedProgram] = useState(null);
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
    },

    // Data tahapan - KOSONGKAN DULU, nanti diisi dari AI atau default
    tahapan: []
  });

  // ✅ STEP BARU: Tambah step untuk Roadmap
  const steps = [
    { number: 1, title: 'Informasi Program', description: 'Data dasar program' },
    { number: 2, title: 'Rencana Anggaran', description: 'Detail RAB program' },
    { number: 3, title: 'Dokumen Pendukung', description: 'Upload berkas' },
    { number: 4, title: 'Roadmap Program', description: 'Tahapan pelaksanaan' },
    { number: 5, title: 'Review & Submit', description: 'Finalisasi pengajuan' }
  ];

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
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // ✅ FUNCTION BARU: Submit program TANPA tahapan dulu
  const submitProgramOnly = async () => {
    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      console.log('🔄 Submitting program (without tahapan)...');

      // Submit program TANPA tahapan dulu
      const response = await ProgramService.createProgramWithoutTahapan(formData, formData.dokumen, user);

      // ✅ SIMPAN PROGRAM YANG SUDAH DIBUAT
      setCreatedProgram(response.data);

      console.log('✅ Program created, moving to roadmap step');

      // LANGSUNG PINDAH KE STEP ROADMAP
      setCurrentStep(4); // Step roadmap

    } catch (error) {
      console.error('❌ Submit failed:', error);
      const errorMessage = error.response?.data?.message || 'Gagal mengajukan program. Silakan coba lagi.';

      if (error.response?.data?.errors) {
        console.error('Validation errors:', error.response.data.errors);
      }

      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  // ✅ PERBAIKI: Transform data sebelum dikirim ke backend
  const completeProgramWithTahapan = async (tahapanData) => {
    try {
      console.log('🔄 Completing program with tahapan...');

      // Transform data tahapan untuk memenuhi validasi backend
      const transformedTahapan = tahapanData.map((tahap, index) => ({
        nama_tahapan: tahap.nama_tahapan,
        deskripsi: tahap.deskripsi || '',
        persentase: Number(tahap.persentase) || 0,
        tanggal_mulai_rencana: tahap.tanggal_mulai || null, // ✅ Sesuaikan field name
        tanggal_selesai_rencana: tahap.tanggal_selesai || null, // ✅ Sesuaikan field name
        urutan: index + 1
      }));

      console.log('📤 Transformed tahapan data:', transformedTahapan);

      // Update program dengan tahapan
      const completeResponse = await ProgramService.addTahapanToProgram(
        createdProgram.id,
        transformedTahapan
      );

      // ✅ TAMPILKAN SUKSES SETELAH SEMUA SELESAI
      toast.custom((t) => (
        <SuccessToast
          toastId={t}
          programData={formData}
          backendResponse={completeResponse}
          hasRoadmap={tahapanData && tahapanData.length > 0}
        />
      ), {
        duration: 8000,
      });

      // Reset form
      resetForm();

    } catch (error) {
      console.error('❌ Complete program failed:', error);

      // Tampilkan error detail
      if (error.response?.data?.errors) {
        console.error('Validation errors:', error.response.data.errors);
        toast.error('Validasi gagal: ' + JSON.stringify(error.response.data.errors));
      } else {
        toast.error('Gagal menyelesaikan program dengan tahapan: ' + error.message);
      }
    }
  };

  // ✅ FUNCTION BARU: Gunakan template tahapan default
  const useDefaultTahapan = async () => {
    try {
      const defaultTahapan = generateDefaultTahapan(formData);

      // Update program dengan tahapan default
      await completeProgramWithTahapan(defaultTahapan);

    } catch (error) {
      console.error('❌ Default tahapan failed:', error);
      toast.error('Gagal menggunakan template default');
    }
  };

  // ✅ FUNCTION BARU: Generate tahapan default
  const generateDefaultTahapan = (programData) => {
    return [
      {
        nama_tahapan: 'Persiapan dan Perencanaan',
        deskripsi: 'Tahap persiapan dokumen dan perencanaan teknis program',
        persentase: 20,
        tanggal_mulai_rencana: programData.tanggalMulai,
        tanggal_selesai_rencana: addDays(programData.tanggalMulai, 15)
      },
      {
        nama_tahapan: 'Pengadaan dan Persiapan',
        deskripsi: 'Tahap pengadaan material dan persiapan pelaksanaan',
        persentase: 25,
        tanggal_mulai_rencana: addDays(programData.tanggalMulai, 16),
        tanggal_selesai_rencana: addDays(programData.tanggalMulai, 35)
      },
      {
        nama_tahapan: 'Pelaksanaan Utama',
        deskripsi: 'Tahap pelaksanaan fisik utama program',
        persentase: 35,
        tanggal_mulai_rencana: addDays(programData.tanggalMulai, 36),
        tanggal_selesai_rencana: addDays(programData.tanggalSelesai, -15)
      },
      {
        nama_tahapan: 'Finishing dan Penyerahan',
        deskripsi: 'Tahap finishing, testing, dan serah terima',
        persentase: 20,
        tanggal_mulai_rencana: addDays(programData.tanggalSelesai, -14),
        tanggal_selesai_rencana: programData.tanggalSelesai
      }
    ];
  };

  const addDays = (dateString, days) => {
    const date = new Date(dateString);
    date.setDate(date.getDate() + days);
    return date.toISOString().split('T')[0];
  };

  const resetForm = () => {
    setFormData({
      namaProgram: '',
      kategori: '',
      jenis: 'pembangunan',
      prioritas: 'sedang',
      lokasi: '',
      penanggungJawab: user?.nama || '',
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
      },
      tahapan: []
    });

    setCurrentStep(1);
    setShowPreview(false);
    setShowRundownModal(false);
    setCreatedProgram(null);
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
            onNext={submitProgramOnly} // ✅ LANGSUNG SUBMIT PROGRAM
            onBack={handlePrevStep}
          />
        );
      case 4: // ✅ STEP BARU: Roadmap Selection
        return (
          <RoadmapSelectionStep
            program={createdProgram}
            programData={formData}
            onUseDefault={useDefaultTahapan}
            onUploadRundown={() => setShowRundownModal(true)}
            onBack={() => setCurrentStep(3)}
          />
        );
      case 5:
        // Step 5 sudah tidak perlu karena langsung complete setelah pilih roadmap
        return null;
      default:
        return null;
    }
  };

  // ✅ HANDLER BARU: Ketika AI selesai generate tahapan
  const handleTahapanGenerated = (tahapanData) => {
    console.log('Tahapan generated from AI:', tahapanData);

    // Langsung complete program dengan tahapan dari AI
    completeProgramWithTahapan(tahapanData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-emerald-50">
      <div className="w-full max-w-full">
        <ProgramHeader />

        <div className="p-4 sm:p-6 max-w-6xl mx-auto">
          <StepWizard
            steps={steps}
            currentStep={currentStep}
          />

          <div className="mt-8">
            {renderStepContent()}
          </div>
        </div>

        {showPreview && (
          <PreviewModal
            programData={formData}
            onClose={() => setShowPreview(false)}
            onSubmit={submitProgramOnly} // ✅ GUNAKAN YANG BARU
            isSubmitting={isSubmitting}
          />
        )}

        {/* Rundown Modal - hanya muncul jika program sudah dibuat */}
        {showRundownModal && createdProgram && (
          <RundownUploadModal
            program={createdProgram}
            onClose={() => setShowRundownModal(false)}
            onTahapanGenerated={handleTahapanGenerated}
          />
        )}
      </div>
    </div>
  );
};

export default AdminDesaAjukanProgram;