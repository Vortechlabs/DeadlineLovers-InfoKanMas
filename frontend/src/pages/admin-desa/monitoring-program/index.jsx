import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import MonitoringService from '@/services/MonitoringService';
import MonitoringHeader from './MonitoringHeader';
import ProgramStats from './ProgramStats';
import ProgramFilter from './ProgramFilter';
import ProgramGrid from './ProgramGrid';
import StatusTimeline from './StatusTimeline';
import ProgramModal from './ProgramModal';

const AdminDesaMonitoringProgram = () => {
  const [filterStatus, setFilterStatus] = useState('semua');
  const [filterKategori, setFilterKategori] = useState('semua');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  const [programs, setPrograms] = useState([]);
  const [statistics, setStatistics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [exporting, setExporting] = useState(false);

  // Load data saat component mount atau filter berubah
  useEffect(() => {
    loadPrograms();
    loadStatistics();
  }, [filterStatus, filterKategori, searchQuery]);

  const loadPrograms = async () => {
    try {
      setLoading(true);
      
      const filters = {};
      if (filterStatus !== 'semua') filters.status = filterStatus;
      if (filterKategori !== 'semua') filters.kategori_id = filterKategori;
      if (searchQuery) filters.search = searchQuery;

      const response = await MonitoringService.filterPrograms(filters);
      
      if (response.success) {
        // Transform data dari backend ke format frontend
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

  const loadStatistics = async () => {
    try {
      const response = await MonitoringService.getStatistics();
      if (response.success) {
        setStatistics(response.data);
      }
    } catch (error) {
      console.error('Failed to load statistics:', error);
    }
  };

  // Transform data dari backend ke format frontend
  const transformProgramData = (backendData) => {
    return backendData.map(program => {
      // Map status dari backend ke frontend
      const statusMapping = {
        'draft': 'menunggu_persetujuan',
        'diajukan': 'menunggu_persetujuan', 
        'diverifikasi_kecamatan': 'menunggu_persetujuan',
        'approved': 'dalam_pengerjaan',
        'berjalan': 'dalam_pengerjaan',
        'selesai': 'selesai',
        'rejected': 'ditolak'
      };

      // Map kategori dari backend ke frontend
      const kategoriMapping = {
        'infrastruktur': 'infrastruktur',
        'bansos': 'bansos',
        'pendidikan': 'pendidikan',
        'kesehatan': 'kesehatan',
        'lainnya': 'lainnya'
      };

      return {
        id: program.id.toString(),
        kode_program: program.kode_program,
        nama: program.nama_program,
        kategori: kategoriMapping[program.kategori?.nama_kategori?.toLowerCase()] || 'lainnya',
        jenis: program.jenis_program,
        anggaran: parseFloat(program.anggaran_total) || 0,
        realisasi: parseFloat(program.realisasi_anggaran) || 0,
        progress: calculateProgress(program),
        status: statusMapping[program.status_program] || 'menunggu_persetujuan',
        statusDetail: getStatusDetail(program),
        prioritas: program.prioritas || 'sedang',
        lokasi: program.wilayah?.nama_wilayah || 'Tidak diketahui',
        penanggungJawab: program.penanggung_jawab?.nama || program.penanggungJawab || 'Tidak diketahui',
        tanggalPengajuan: program.created_at,
        tanggalDisetujui: program.tanggal_approval,
        tanggalMulai: program.tanggal_mulai,
        tanggalSelesai: program.tanggal_selesai,
        deskripsi: program.deskripsi || 'Tidak ada deskripsi',
        milestones: transformMilestones(program),
        dokumentasi: transformDokumentasi(program),
        issues: program.issues_count || 0,
        createdAt: program.created_at,
        // Data tambahan dari backend
        backendData: program
      };
    });
  };

  const calculateProgress = (program) => {
    // Jika ada progress dari backend, gunakan itu
    if (program.progress_percentage !== undefined) {
      return program.progress_percentage;
    }
    
    // Hitung dari tahapan
    if (program.tahapan && program.tahapan.length > 0) {
      const completedTahapan = program.tahapan.filter(t => t.status === 'selesai');
      return Math.round((completedTahapan.length / program.tahapan.length) * 100);
    }
    
    // Default progress berdasarkan status
    const progressByStatus = {
      'draft': 0,
      'diajukan': 10,
      'diverifikasi_kecamatan': 30,
      'approved': 50,
      'berjalan': 75,
      'selesai': 100,
      'rejected': 0
    };
    
    return progressByStatus[program.status_program] || 0;
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
        nama: tahap.nama_tahapan,
        status: mapTahapanStatus(tahap.status),
        tanggal: tahap.tanggal_selesai_aktual || tahap.tanggal_selesai_rencana
      }));
    }
    
    // Default milestones berdasarkan status
    return getDefaultMilestones(program);
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

  const getDefaultMilestones = (program) => {
    const baseMilestones = [
      { nama: 'Pengajuan RAB', status: 'selesai', tanggal: program.created_at }
    ];

    if (program.status_program !== 'draft') {
      baseMilestones.push(
        { nama: 'Approval Kecamatan', status: program.status_program === 'rejected' ? 'ditolak' : 'selesai', tanggal: program.tanggal_verifikasi }
      );
    }

    if (['approved', 'berjalan', 'selesai'].includes(program.status_program)) {
      baseMilestones.push(
        { nama: 'Approval Bupati', status: 'selesai', tanggal: program.tanggal_approval }
      );
    }

    if (['berjalan', 'selesai'].includes(program.status_program)) {
      baseMilestones.push(
        { nama: 'Pelaksanaan', status: program.status_program === 'selesai' ? 'selesai' : 'dalam_pengerjaan', tanggal: program.tanggal_mulai }
      );
    }

    if (program.status_program === 'selesai') {
      baseMilestones.push(
        { nama: 'Selesai & Laporan', status: 'selesai', tanggal: program.tanggal_selesai }
      );
    }

    return baseMilestones;
  };

  const transformDokumentasi = (program) => {
    if (program.dokumen && program.dokumen.length > 0) {
      const foto = program.dokumen.filter(d => d.jenis_dokumen === 'foto_lokasi').length;
      const dokumen = program.dokumen.filter(d => 
        ['proposal', 'surat_permohonan', 'gambar_teknis'].includes(d.jenis_dokumen)
      ).length;
      
      return {
        foto,
        video: 0, // Backend belum support video
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
      const response = await MonitoringService.getProgramDetail(program.backendData.id);
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

  const handleExportReport = async () => {
    try {
      setExporting(true);
      
      const filters = {};
      if (filterStatus !== 'semua') filters.status = filterStatus;
      if (filterKategori !== 'semua') filters.kategori_id = filterKategori;
      if (searchQuery) filters.search = searchQuery;

      const blob = await MonitoringService.exportReport(filters);
      
      // Create download link
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `laporan-program-${new Date().toISOString().split('T')[0]}.xlsx`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      
      toast.success('Laporan berhasil diexport');
    } catch (error) {
      console.error('Export failed:', error);
      toast.error('Gagal mengexport laporan');
    } finally {
      setExporting(false);
    }
  };

  const handleRefresh = () => {
    loadPrograms();
    loadStatistics();
    toast.success('Data diperbarui');
  };

  if (loading && programs.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Memuat data program...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="w-full max-w-full">
        {/* Header */}
        <MonitoringHeader 
          totalPrograms={statistics?.total_program || programs.length}
          programsActive={programs.filter(p => p.status === 'dalam_pengerjaan').length}
          onExport={handleExportReport}
          onRefresh={handleRefresh}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          exporting={exporting}
        />

        {/* Content */}
        <div className="p-4 sm:p-6 space-y-6">
          {/* Statistics */}
          <ProgramStats 
            programData={programs} 
            statistics={statistics}
          />

          {/* Filter */}
          <ProgramFilter 
            filterStatus={filterStatus}
            setFilterStatus={setFilterStatus}
            filterKategori={filterKategori}
            setFilterKategori={setFilterKategori}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onRefresh={handleRefresh}
          />

          {/* View Toggle */}
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-600">
              Menampilkan {programs.length} program
            </div>
            <div className="bg-white rounded-lg p-1 border border-gray-200">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  viewMode === 'grid' 
                    ? 'bg-blue-600 text-white' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Grid View
              </button>
              <button
                onClick={() => setViewMode('timeline')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  viewMode === 'timeline' 
                    ? 'bg-blue-600 text-white' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Timeline View
              </button>
            </div>
          </div>

          {/* Program Grid / Timeline */}
          {viewMode === 'grid' ? (
            <ProgramGrid 
              programs={programs}
              onViewDetails={handleViewDetails}
              loading={loading}
            />
          ) : (
            <StatusTimeline 
              programs={programs}
              onViewDetails={handleViewDetails}
              loading={loading}
            />
          )}

          {/* Modal Detail Program */}
          {showModal && selectedProgram && (
            <ProgramModal
              program={selectedProgram}
              onClose={() => setShowModal(false)}
              onStatusUpdate={loadPrograms} // Refresh data setelah update status
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDesaMonitoringProgram;