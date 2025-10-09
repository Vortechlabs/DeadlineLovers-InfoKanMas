import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import ProgramHeader from './ProgramHeader';
import ProgramTabs from './ProgramTabs';
import ProgramStats from './ProgramStats';
import ProgramFilters from './ProgramFilters';
import ProgramGrid from './ProgramGrid';
import ProgramModal from './ProgramModal';
import ProgressUpdateModal from './ProgressModal';
import ProgramService from '@/services/ProgramService';

const AdminDesaProgramDesa = () => {
  const [activeTab, setActiveTab] = useState('semua');
  const [filterStatus, setFilterStatus] = useState('semua');
  const [filterKategori, setFilterKategori] = useState('semua');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showProgressModal, setShowProgressModal] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load data dari backend
  useEffect(() => {
    loadPrograms();
  }, [activeTab, filterStatus, filterKategori, searchQuery]);

  const loadPrograms = async () => {
    try {
      setLoading(true);
      
      const filters = {};
      if (filterStatus !== 'semua') filters.status = filterStatus;
      if (filterKategori !== 'semua') filters.kategori_id = filterKategori;
      if (searchQuery) filters.search = searchQuery;

      const response = await ProgramService.getPrograms(filters);
      
      if (response.success) {
        // Transform data backend ke format frontend
        const transformedPrograms = transformProgramData(response.data);
        setPrograms(transformedPrograms);
      }
    } catch (error) {
      console.error('Failed to load programs:', error);
      toast.error('Gagal memuat data program');
    } finally {
      setLoading(false);
    }
  };

  // Transform data backend ke format frontend
  const transformProgramData = (backendData) => {
    return backendData.map(program => {
      // Mapping status backend ke frontend
      const statusMapping = {
        'draft': 'menunggu_persetujuan',
        'diajukan': 'menunggu_persetujuan',
        'diverifikasi_kecamatan': 'menunggu_persetujuan',
        'approved': 'dalam_pengerjaan',
        'berjalan': 'dalam_pengerjaan',
        'selesai': 'selesai',
        'rejected': 'ditolak'
      };

      // Hitung progress dari tahapan
      const progress = calculateProgress(program);

      return {
        id: program.id.toString(),
        kode_program: program.kode_program,
        nama: program.nama_program,
        kategori: program.kategori?.nama_kategori?.toLowerCase() || 'lainnya',
        jenis: program.jenis_program,
        anggaran: parseFloat(program.anggaran_total) || 0,
        realisasi: parseFloat(program.realisasi_anggaran) || 0,
        progress: progress,
        status: statusMapping[program.status_program] || 'menunggu_persetujuan',
        statusDetail: getStatusDetail(program),
        prioritas: program.prioritas || 'sedang',
        lokasi: program.wilayah?.nama_wilayah || 'Tidak diketahui',
        penanggungJawab: program.penanggung_jawab?.nama || 'Tidak diketahui',
        tanggalPengajuan: program.created_at,
        tanggalDisetujui: program.tanggal_approval,
        tanggalMulai: program.tanggal_mulai,
        tanggalSelesai: program.tanggal_selesai,
        deskripsi: program.deskripsi || 'Tidak ada deskripsi',
        milestones: transformMilestones(program),
        dokumentasi: transformDokumentasi(program),
        issues: program.issues_count || 0,
        createdAt: program.created_at,
        terakhirUpdate: program.updated_at,
        // Data backend asli untuk kebutuhan update
        backendData: program
      };
    });
  };

  const calculateProgress = (program) => {
    // Jika ada progress dari backend, gunakan itu
    if (program.progress_percentage !== undefined) {
      return program.progress_percentage;
    }
    
    // Hitung dari tahapan yang selesai
    if (program.tahapan && program.tahapan.length > 0) {
      const completedTahapan = program.tahapan.filter(t => t.status === 'selesai');
      return Math.round((completedTahapan.length / program.tahapan.length) * 100);
    }
    
    return 0;
  };

  const getStatusDetail = (program) => {
    const statusDetails = {
      'draft': 'Draft - Belum diajukan',
      'diajukan': 'Menunggu verifikasi Kecamatan',
      'diverifikasi_kecamatan': 'Terverifikasi Kecamatan - Menunggu approval',
      'approved': 'Disetujui - Menunggu pelaksanaan',
      'berjalan': 'Dalam pengerjaan',
      'selesai': 'Program telah selesai',
      'rejected': `Ditolak: ${program.catatan_verifikasi || program.catatan_approval || 'Alasan tidak diketahui'}`
    };
    
    return statusDetails[program.status_program] || 'Status tidak diketahui';
  };

  const transformMilestones = (program) => {
    if (program.tahapan && program.tahapan.length > 0) {
      return program.tahapan.map(tahap => ({
        id: tahap.id,
        nama: tahap.nama_tahapan,
        status: mapTahapanStatus(tahap.status),
        tanggal: tahap.tanggal_selesai_aktual || tahap.tanggal_selesai_rencana,
        persentase: tahap.persentase
      }));
    }
    
    return [];
  };

  const mapTahapanStatus = (status) => {
    const statusMap = {
      'menunggu': 'menunggu',
      'dalam_pengerjaan': 'dalam_pengerjaan',
      'selesai': 'selesai',
      'tertunda': 'menunggu'
    };
    return statusMap[status] || 'menunggu';
  };

  const transformDokumentasi = (program) => {
    if (program.dokumen && program.dokumen.length > 0) {
      const foto = program.dokumen.filter(d => d.jenis_dokumen === 'foto_lokasi').length;
      const dokumen = program.dokumen.filter(d => 
        ['proposal', 'surat_permohonan', 'gambar_teknis'].includes(d.jenis_dokumen)
      ).length;
      
      return {
        foto,
        video: program.dokumen.filter(d => d.jenis_dokumen === 'video').length,
        dokumen
      };
    }
    
    return {
      foto: 0,
      video: 0,
      dokumen: 0
    };
  };

  const handleViewDetails = async (program) => {
    try {
      // Load detail lengkap dari backend
      const response = await ProgramService.getProgramDetail(program.backendData.id);
      if (response.success) {
        const transformedProgram = transformProgramData([response.data.program])[0];
        setSelectedProgram(transformedProgram);
        setShowModal(true);
      }
    } catch (error) {
      console.error('Failed to load program details:', error);
      // Fallback ke data yang sudah ada
      setSelectedProgram(program);
      setShowModal(true);
    }
  };

  const handleEditProgram = (program) => {
    toast.success(`Membuka editor untuk ${program.nama}`);
    // Navigate to edit page
  };

  const handleDeleteProgram = async (program) => {
    if (confirm(`Apakah Anda yakin ingin menghapus program "${program.nama}"?`)) {
      try {
        await ProgramService.deleteProgram(program.backendData.id);
        toast.success(`Program "${program.nama}" berhasil dihapus`);
        loadPrograms(); // Refresh data
      } catch (error) {
        console.error('Failed to delete program:', error);
        toast.error('Gagal menghapus program');
      }
    }
  };

  const handleExportProgram = async (program) => {
    try {
      const blob = await ProgramService.exportProgram(program.backendData.id);
      
      // Create download link
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `program-${program.kode_program}-${new Date().toISOString().split('T')[0]}.xlsx`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      
      toast.success(`Data program ${program.nama} berhasil diexport`);
    } catch (error) {
      console.error('Export failed:', error);
      toast.error('Gagal mengexport data program');
    }
  };

  const handleUpdateProgress = (program) => {
    setSelectedProgram(program);
    setShowProgressModal(true);
  };

  const handleAddProgram = () => {
    toast.success('Membuka form tambah program baru');
    // Navigate to create program page
  };

  // Filter programs berdasarkan tab aktif
  const filteredPrograms = programs.filter(program => {
    let tabMatch = true;
    if (activeTab === 'aktif') {
      tabMatch = program.status === 'dalam_pengerjaan';
    } else if (activeTab === 'selesai') {
      tabMatch = program.status === 'selesai';
    } else if (activeTab === 'pengajuan') {
      tabMatch = program.status === 'menunggu_persetujuan';
    }

    return tabMatch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-emerald-50">
      <div className="w-full max-w-full">
        {/* Header */}
        <ProgramHeader 
          totalPrograms={programs.length}
          onAddProgram={handleAddProgram}
        />

        {/* Content */}
        <div className="p-4 sm:p-6 max-w-7xl mx-auto space-y-6">
          {/* Statistics */}
          <ProgramStats programData={programs} />

          {/* Tabs */}
          <ProgramTabs 
            activeTab={activeTab}
            onTabChange={setActiveTab}
            programData={programs}
          />

          {/* Filters */}
          <ProgramFilters 
            filterStatus={filterStatus}
            setFilterStatus={setFilterStatus}
            filterKategori={filterKategori}
            setFilterKategori={setFilterKategori}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            viewMode={viewMode}
            setViewMode={setViewMode}
          />

          {/* Program Grid */}
          <ProgramGrid 
            programs={filteredPrograms}
            viewMode={viewMode}
            onViewDetails={handleViewDetails}
            onEditProgram={handleEditProgram}
            onDeleteProgram={handleDeleteProgram}
            onExportProgram={handleExportProgram}
            onUpdateProgress={handleUpdateProgress}
            loading={loading}
          />

          {/* Modal Detail Program */}
          {showModal && selectedProgram && (
            <ProgramModal
              program={selectedProgram}
              onClose={() => setShowModal(false)}
              onEdit={handleEditProgram}
              onDelete={handleDeleteProgram}
              onExport={handleExportProgram}
              onUpdateProgress={handleUpdateProgress}
            />
          )}

          {/* Modal Update Progress */}
          {showProgressModal && selectedProgram && (
            <ProgressUpdateModal
              program={selectedProgram}
              onClose={() => setShowProgressModal(false)}
              onUpdate={loadPrograms}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDesaProgramDesa;