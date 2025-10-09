import React, { useState } from 'react';
import { toast } from 'sonner';
import PenerimaHeader from './PenerimaHeader';
import PenerimaStats from './PenerimaStats';
import PenerimaFilters from './PenerimaFilters';
import PenerimaTable from './PenerimaTable';
import PenerimaChart from './PenerimaChart';
import PenerimaModal from './PenerimaModal';
import DistribusiModal from './DistribusiModal';

const AdminDesaPenerimaManfaat = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterProgram, setFilterProgram] = useState('semua');
  const [filterStatus, setFilterStatus] = useState('semua');
  const [filterDusun, setFilterDusun] = useState('semua');
  const [viewMode, setViewMode] = useState('table'); // 'table' or 'chart'
  const [selectedPenerima, setSelectedPenerima] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showDistribusiModal, setShowDistribusiModal] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState(null);

  // Data penerima manfaat berdasarkan studi kasus Purbalingga
  const dataPenerima = [
    {
      id: 1,
      nik: '3326123456789001',
      nama: 'Budi Santoso',
      dusun: 'Dusun 1',
      rt: '001',
      rw: '001',
      alamat: 'Jl. Merdeka No. 10',
      noHp: '081234567890',
      program: 'Bantuan Sembako 100 KK',
      jenisBantuan: 'sembako',
      nilaiBantuan: 500000,
      status: 'diterima',
      tanggalDistribusi: '2024-09-20',
      tanggalKonfirmasi: '2024-09-20',
      metodeKonfirmasi: 'sms',
      rating: 5,
      feedback: 'Sangat membantu, terima kasih',
      buktiFoto: true,
      buktiVideo: false,
      catatan: 'Penerima sangat berterima kasih',
      programId: 'BANSOS-001'
    },
    {
      id: 2,
      nik: '3326123456789002',
      nama: 'Siti Rahayu',
      dusun: 'Dusun 1',
      rt: '001',
      rw: '001',
      alamat: 'Jl. Merdeka No. 10',
      noHp: '081234567891',
      program: 'Bantuan Sembako 100 KK',
      jenisBantuan: 'sembako',
      nilaiBantuan: 500000,
      status: 'diterima',
      tanggalDistribusi: '2024-09-20',
      tanggalKonfirmasi: '2024-09-20',
      metodeKonfirmasi: 'qr',
      rating: 4,
      feedback: 'Barang lengkap dan berkualitas',
      buktiFoto: true,
      buktiVideo: false,
      catatan: '',
      programId: 'BANSOS-001'
    },
    {
      id: 3,
      nik: '3326123456789003',
      nama: 'Ahmad Wijaya',
      dusun: 'Dusun 2',
      rt: '002',
      rw: '001',
      alamat: 'Jl. Flamboyan No. 5',
      noHp: '081234567892',
      program: 'Bantuan Tunai PKH',
      jenisBantuan: 'tunai',
      nilaiBantuan: 1200000,
      status: 'diverifikasi',
      tanggalDistribusi: '2024-10-15',
      tanggalKonfirmasi: null,
      metodeKonfirmasi: null,
      rating: null,
      feedback: null,
      buktiFoto: false,
      buktiVideo: false,
      catatan: 'Menunggu konfirmasi penerima',
      programId: 'BANSOS-002'
    },
    {
      id: 4,
      nik: '3326123456789004',
      nama: 'Maria Dewi',
      dusun: 'Dusun 3',
      rt: '003',
      rw: '002',
      alamat: 'Jl. Mawar No. 15',
      noHp: '081234567893',
      program: 'Bantuan UMKM Desa',
      jenisBantuan: 'modal',
      nilaiBantuan: 5000000,
      status: 'diterima',
      tanggalDistribusi: '2024-08-15',
      tanggalKonfirmasi: '2024-08-16',
      metodeKonfirmasi: 'app',
      rating: 5,
      feedback: 'Modal usaha sangat membantu perkembangan bisnis',
      buktiFoto: true,
      buktiVideo: true,
      catatan: 'UMKM kerajinan tangan berkembang pesat',
      programId: 'BANSOS-005'
    },
    {
      id: 5,
      nik: '3326123456789005',
      nama: 'Rudi Hartono',
      dusun: 'Dusun 2',
      rt: '002',
      rw: '001',
      alamat: 'Jl. Flamboyan No. 8',
      noHp: '081234567894',
      program: 'Bantuan Pendidikan Anak',
      jenisBantuan: 'beasiswa',
      nilaiBantuan: 1000000,
      status: 'diverifikasi',
      tanggalDistribusi: '2024-10-10',
      tanggalKonfirmasi: null,
      metodeKonfirmasi: null,
      rating: null,
      feedback: null,
      buktiFoto: false,
      buktiVideo: false,
      catatan: 'Anak berprestasi dari keluarga kurang mampu',
      programId: 'BANSOS-003'
    },
    {
      id: 6,
      nik: '3326123456789006',
      nama: 'Dewi Sartika',
      dusun: 'Dusun 1',
      rt: '001',
      rw: '001',
      alamat: 'Jl. Merdeka No. 12',
      noHp: '081234567895',
      program: 'Bantuan Tunai PKH',
      jenisBantuan: 'tunai',
      nilaiBantuan: 1200000,
      status: 'ditolak',
      tanggalDistribusi: null,
      tanggalKonfirmasi: null,
      metodeKonfirmasi: null,
      rating: null,
      feedback: null,
      buktiFoto: false,
      buktiVideo: false,
      catatan: 'Data tidak valid, perlu verifikasi ulang',
      programId: 'BANSOS-002'
    },
    {
      id: 7,
      nik: '3326123456789007',
      nama: 'Slamet Riyadi',
      dusun: 'Dusun 3',
      rt: '003',
      rw: '002',
      alamat: 'Jl. Mawar No. 20',
      noHp: '081234567896',
      program: 'Bantuan Lansia Terlantar',
      jenisBantuan: 'barang',
      nilaiBantuan: 500000,
      status: 'menunggu',
      tanggalDistribusi: null,
      tanggalKonfirmasi: null,
      metodeKonfirmasi: null,
      rating: null,
      feedback: null,
      buktiFoto: false,
      buktiVideo: false,
      catatan: 'Menunggu persetujuan program dari kecamatan',
      programId: 'BANSOS-004'
    }
  ];

  // Program options for filter
  const programOptions = [
    { value: 'semua', label: 'Semua Program' },
    { value: 'BANSOS-001', label: 'Bantuan Sembako 100 KK' },
    { value: 'BANSOS-002', label: 'Bantuan Tunai PKH' },
    { value: 'BANSOS-003', label: 'Bantuan Pendidikan Anak' },
    { value: 'BANSOS-004', label: 'Bantuan Lansia Terlantar' },
    { value: 'BANSOS-005', label: 'Bantuan UMKM Desa' }
  ];

  const statusOptions = [
    { value: 'semua', label: 'Semua Status' },
    { value: 'menunggu', label: 'Menunggu' },
    { value: 'diverifikasi', label: 'Terverifikasi' },
    { value: 'diterima', label: 'Sudah Diterima' },
    { value: 'ditolak', label: 'Ditolak' }
  ];

  const dusunOptions = [
    { value: 'semua', label: 'Semua Dusun' },
    { value: 'Dusun 1', label: 'Dusun 1' },
    { value: 'Dusun 2', label: 'Dusun 2' },
    { value: 'Dusun 3', label: 'Dusun 3' }
  ];

  // Filter data penerima
  const filteredPenerima = dataPenerima.filter(penerima => {
    const searchMatch = 
      penerima.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
      penerima.nik.includes(searchQuery) ||
      penerima.program.toLowerCase().includes(searchQuery.toLowerCase());
    
    const programMatch = filterProgram === 'semua' || penerima.programId === filterProgram;
    const statusMatch = filterStatus === 'semua' || penerima.status === filterStatus;
    const dusunMatch = filterDusun === 'semua' || penerima.dusun === filterDusun;
    
    return searchMatch && programMatch && statusMatch && dusunMatch;
  });

  const handleViewDetail = (penerima) => {
    setSelectedPenerima(penerima);
    setShowDetailModal(true);
  };

  const handleDistribusi = (penerima) => {
    setSelectedPenerima(penerima);
    setShowDistribusiModal(true);
  };

  const handleKonfirmasi = (penerima) => {
    toast.success(`Konfirmasi penerimaan untuk ${penerima.nama}`);
    // Implement confirmation logic
  };

  const handleExportData = () => {
    toast.success('Mengekspor data penerima manfaat');
  };

  const handleAddPenerima = () => {
    toast.success('Membuka form tambah penerima manfaat');
  };

  const handleSendReminder = (penerima) => {
    toast.success(`Mengirim pengingat ke ${penerima.nama}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      <div className="p-6 max-w-7xl mx-auto">
        
        {/* Header */}
        <PenerimaHeader 
          totalPenerima={dataPenerima.length}
          onAddPenerima={handleAddPenerima}
          onExportData={handleExportData}
        />

        {/* Statistics */}
        <PenerimaStats dataPenerima={dataPenerima} />

        {/* Filters */}
        <PenerimaFilters 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          filterProgram={filterProgram}
          setFilterProgram={setFilterProgram}
          filterStatus={filterStatus}
          setFilterStatus={setFilterStatus}
          filterDusun={filterDusun}
          setFilterDusun={setFilterDusun}
          viewMode={viewMode}
          setViewMode={setViewMode}
          programOptions={programOptions}
          statusOptions={statusOptions}
          dusunOptions={dusunOptions}
        />

        {/* Content */}
        {viewMode === 'chart' ? (
          <PenerimaChart 
            dataPenerima={filteredPenerima}
            onViewDetail={handleViewDetail}
          />
        ) : (
          <PenerimaTable 
            dataPenerima={filteredPenerima}
            onViewDetail={handleViewDetail}
            onDistribusi={handleDistribusi}
            onKonfirmasi={handleKonfirmasi}
            onSendReminder={handleSendReminder}
          />
        )}

        {/* Detail Modal */}
        {showDetailModal && selectedPenerima && (
          <PenerimaModal
            penerima={selectedPenerima}
            onClose={() => setShowDetailModal(false)}
            onKonfirmasi={handleKonfirmasi}
          />
        )}

        {/* Distribusi Modal */}
        {showDistribusiModal && selectedPenerima && (
          <DistribusiModal
            penerima={selectedPenerima}
            onClose={() => setShowDistribusiModal(false)}
          />
        )}
      </div>
    </div>
  );
};

export default AdminDesaPenerimaManfaat;