import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Plus, 
  Download, 
  Upload, 
  Edit3, 
  Trash2, 
  Eye,
  User,
  MapPin,
  Phone,
  Mail,
  Calendar,
  IdCard,
  Users,
  Home,
  Building,
  CheckCircle,
  XCircle,
  MoreVertical,
  FileText
} from 'lucide-react';

const AdminDesaDataWarga = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('semua');
  const [filterDusun, setFilterDusun] = useState('semua');
  const [selectedWarga, setSelectedWarga] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  // Sample data warga berdasarkan studi kasus Purbalingga
  const dataWarga = [
    {
      id: 1,
      nik: '3326123456789001',
      nama: 'Budi Santoso',
      tempatLahir: 'Purbalingga',
      tanggalLahir: '1985-03-15',
      jenisKelamin: 'Laki-laki',
      agama: 'Islam',
      pendidikan: 'SMA',
      pekerjaan: 'Petani',
      statusKawin: 'Menikah',
      dusun: 'Dusun 1',
      rt: '001',
      rw: '001',
      alamat: 'Jl. Merdeka No. 10',
      noHp: '081234567890',
      email: 'budi.santoso@email.com',
      statusKeluarga: 'Kepala Keluarga',
      kk: '3326123456789001',
      status: 'aktif',
      terdaftar: '2020-01-15',
      terakhirUpdate: '2024-10-20',
      bansos: ['PKH', 'BPNT'],
      umkm: false,
      difabel: false
    },
    {
      id: 2,
      nik: '3326123456789002',
      nama: 'Siti Rahayu',
      tempatLahir: 'Purbalingga',
      tanggalLahir: '1990-08-22',
      jenisKelamin: 'Perempuan',
      agama: 'Islam',
      pendidikan: 'D3',
      pekerjaan: 'Ibu Rumah Tangga',
      statusKawin: 'Menikah',
      dusun: 'Dusun 1',
      rt: '001',
      rw: '001',
      alamat: 'Jl. Merdeka No. 10',
      noHp: '081234567891',
      email: '',
      statusKeluarga: 'Istri',
      kk: '3326123456789001',
      status: 'aktif',
      terdaftar: '2020-01-15',
      terakhirUpdate: '2024-10-20',
      bansos: ['PKH', 'BPNT'],
      umkm: false,
      difabel: false
    },
    {
      id: 3,
      nik: '3326123456789003',
      nama: 'Ahmad Wijaya',
      tempatLahir: 'Purbalingga',
      tanggalLahir: '1978-12-10',
      jenisKelamin: 'Laki-laki',
      agama: 'Islam',
      pendidikan: 'SD',
      pekerjaan: 'Buruh Tani',
      statusKawin: 'Menikah',
      dusun: 'Dusun 2',
      rt: '002',
      rw: '001',
      alamat: 'Jl. Flamboyan No. 5',
      noHp: '081234567892',
      email: '',
      statusKeluarga: 'Kepala Keluarga',
      kk: '3326123456789003',
      status: 'aktif',
      terdaftar: '2019-05-20',
      terakhirUpdate: '2024-10-18',
      bansos: ['BLT'],
      umkm: false,
      difabel: false
    },
    {
      id: 4,
      nik: '3326123456789004',
      nama: 'Maria Dewi',
      tempatLahir: 'Purbalingga',
      tanggalLahir: '1982-06-25',
      jenisKelamin: 'Perempuan',
      agama: 'Katolik',
      pendidikan: 'SMA',
      pekerjaan: 'Wiraswasta',
      statusKawin: 'Menikah',
      dusun: 'Dusun 3',
      rt: '003',
      rw: '002',
      alamat: 'Jl. Mawar No. 15',
      noHp: '081234567893',
      email: 'maria.dewi@email.com',
      statusKeluarga: 'Kepala Keluarga',
      kk: '3326123456789004',
      status: 'aktif',
      terdaftar: '2021-03-10',
      terakhirUpdate: '2024-10-19',
      bansos: [],
      umkm: true,
      difabel: false
    },
    {
      id: 5,
      nik: '3326123456789005',
      nama: 'Rudi Hartono',
      tempatLahir: 'Purbalingga',
      tanggalLahir: '1995-11-30',
      jenisKelamin: 'Laki-laki',
      agama: 'Islam',
      pendidikan: 'S1',
      pekerjaan: 'Guru',
      statusKawin: 'Belum Menikah',
      dusun: 'Dusun 2',
      rt: '002',
      rw: '001',
      alamat: 'Jl. Flamboyan No. 8',
      noHp: '081234567894',
      email: 'rudi.hartono@email.com',
      statusKeluarga: 'Anak',
      kk: '3326123456789003',
      status: 'aktif',
      terdaftar: '2019-05-20',
      terakhirUpdate: '2024-10-18',
      bansos: [],
      umkm: false,
      difabel: false
    },
    {
      id: 6,
      nik: '3326123456789006',
      nama: 'Dewi Sartika',
      tempatLahir: 'Purbalingga',
      tanggalLahir: '1988-04-18',
      jenisKelamin: 'Perempuan',
      agama: 'Islam',
      pendidikan: 'SMA',
      pekerjaan: 'Pengrajin',
      statusKawin: 'Menikah',
      dusun: 'Dusun 1',
      rt: '001',
      rw: '001',
      alamat: 'Jl. Merdeka No. 12',
      noHp: '081234567895',
      email: '',
      statusKeluarga: 'Kepala Keluarga',
      kk: '3326123456789006',
      status: 'aktif',
      terdaftar: '2022-08-15',
      terakhirUpdate: '2024-10-17',
      bansos: ['BPNT'],
      umkm: true,
      difabel: false
    },
    {
      id: 7,
      nik: '3326123456789007',
      nama: 'Slamet Riyadi',
      tempatLahir: 'Purbalingga',
      tanggalLahir: '1955-09-12',
      jenisKelamin: 'Laki-laki',
      agama: 'Islam',
      pendidikan: 'Tidak Sekolah',
      pekerjaan: 'Tidak Bekerja',
      statusKawin: 'Menikah',
      dusun: 'Dusun 3',
      rt: '003',
      rw: '002',
      alamat: 'Jl. Mawar No. 20',
      noHp: '081234567896',
      email: '',
      statusKeluarga: 'Kepala Keluarga',
      kk: '3326123456789007',
      status: 'aktif',
      terdaftar: '2018-11-05',
      terakhirUpdate: '2024-10-16',
      bansos: ['PKH', 'BLT', 'Bansos Lansia'],
      umkm: false,
      difabel: true
    }
  ];

  const dusunOptions = [
    { value: 'semua', label: 'Semua Dusun' },
    { value: 'Dusun 1', label: 'Dusun 1' },
    { value: 'Dusun 2', label: 'Dusun 2' },
    { value: 'Dusun 3', label: 'Dusun 3' }
  ];

  const statusOptions = [
    { value: 'semua', label: 'Semua Status' },
    { value: 'aktif', label: 'Aktif' },
    { value: 'pindah', label: 'Pindah' },
    { value: 'meninggal', label: 'Meninggal' }
  ];

  // Filter data warga
  const filteredWarga = dataWarga.filter(warga => {
    const searchMatch = 
      warga.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
      warga.nik.includes(searchQuery) ||
      warga.alamat.toLowerCase().includes(searchQuery.toLowerCase());
    
    const dusunMatch = filterDusun === 'semua' || warga.dusun === filterDusun;
    const statusMatch = filterStatus === 'semua' || warga.status === filterStatus;
    
    return searchMatch && dusunMatch && statusMatch;
  });

  const handleViewDetail = (warga) => {
    setSelectedWarga(warga);
    setShowDetailModal(true);
  };

  const handleEdit = (warga) => {
    // Implement edit functionality
    console.log('Edit warga:', warga);
  };

  const handleDelete = (warga) => {
    // Implement delete functionality
    console.log('Delete warga:', warga);
  };

  const handleAddWarga = () => {
    // Implement add new warga functionality
    console.log('Add new warga');
  };

  const handleExportData = () => {
    // Implement export functionality
    console.log('Export data warga');
  };

  const handleImportData = () => {
    // Implement import functionality
    console.log('Import data warga');
  };

  const calculateAge = (tanggalLahir) => {
    const birthDate = new Date(tanggalLahir);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="p-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Data Warga Desa</h1>
                <p className="text-gray-600 mt-1">
                  Kelola data kependudukan warga Desa Sukamaju
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 flex-wrap">
              <button className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors flex items-center gap-2">
                <Upload size={16} />
                Import
              </button>
              
              <button 
                onClick={handleExportData}
                className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors flex items-center gap-2"
              >
                <Download size={16} />
                Export
              </button>
              
              <button 
                onClick={handleAddWarga}
                className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg text-sm font-medium hover:from-blue-600 hover:to-blue-700 transition-all shadow-lg shadow-blue-500/25 flex items-center gap-2"
              >
                <Plus size={16} />
                Tambah Warga
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-2xl p-4 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Warga</p>
                <h3 className="text-2xl font-bold text-gray-900 mt-1">1,247</h3>
                <p className="text-xs text-gray-500 mt-1">Jiwa</p>
              </div>
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                <Users className="w-5 h-5 text-blue-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl p-4 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Kepala Keluarga</p>
                <h3 className="text-2xl font-bold text-gray-900 mt-1">428</h3>
                <p className="text-xs text-gray-500 mt-1">KK</p>
              </div>
              <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                <Home className="w-5 h-5 text-green-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl p-4 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Penerima Bansos</p>
                <h3 className="text-2xl font-bold text-gray-900 mt-1">156</h3>
                <p className="text-xs text-gray-500 mt-1">Keluarga</p>
              </div>
              <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                <FileText className="w-5 h-5 text-orange-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl p-4 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Warga UMKM</p>
                <h3 className="text-2xl font-bold text-gray-900 mt-1">42</h3>
                <p className="text-xs text-gray-500 mt-1">Pelaku</p>
              </div>
              <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                <Building className="w-5 h-5 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200 mb-6">
          <div className="flex flex-col lg:flex-row gap-4 items-end">
            {/* Search Input */}
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cari Data Warga
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Cari berdasarkan nama, NIK, atau alamat..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Dusun Filter */}
            <div className="w-full lg:w-48">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Dusun
              </label>
              <select
                value={filterDusun}
                onChange={(e) => setFilterDusun(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {dusunOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Status Filter */}
            <div className="w-full lg:w-48">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {statusOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Filter Button */}
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center gap-2 h-10">
              <Filter size={16} />
              Terapkan
            </button>
          </div>
        </div>

        {/* Data Table */}
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Warga
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Info Demografi
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Alamat
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredWarga.map((warga) => (
                  <tr key={warga.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <User className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{warga.nama}</div>
                          <div className="text-sm text-gray-500 font-mono">{warga.nik}</div>
                          <div className="text-xs text-gray-400 mt-1">
                            {warga.statusKeluarga}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">
                        {calculateAge(warga.tanggalLahir)} tahun • {warga.jenisKelamin}
                      </div>
                      <div className="text-sm text-gray-500">
                        {warga.pekerjaan}
                      </div>
                      <div className="text-xs text-gray-400 mt-1">
                        {warga.pendidikan}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2 text-sm text-gray-900">
                        <MapPin size={14} className="text-gray-400" />
                        <span>{warga.dusun}, RT {warga.rt}/RW {warga.rw}</span>
                      </div>
                      <div className="text-sm text-gray-500 mt-1">
                        {warga.alamat}
                      </div>
                      {warga.noHp && (
                        <div className="flex items-center space-x-2 text-sm text-gray-500 mt-1">
                          <Phone size={14} className="text-gray-400" />
                          <span>{warga.noHp}</span>
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-2">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          <CheckCircle size={12} className="mr-1" />
                          Aktif
                        </span>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {warga.bansos.map((program, index) => (
                            <span key={index} className="inline-block px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                              {program}
                            </span>
                          ))}
                          {warga.umkm && (
                            <span className="inline-block px-2 py-1 text-xs bg-purple-100 text-purple-800 rounded-full">
                              UMKM
                            </span>
                          )}
                          {warga.difabel && (
                            <span className="inline-block px-2 py-1 text-xs bg-orange-100 text-orange-800 rounded-full">
                              Difabel
                            </span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleViewDetail(warga)}
                          className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Lihat Detail"
                        >
                          <Eye size={16} />
                        </button>
                        <button
                          onClick={() => handleEdit(warga)}
                          className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                          title="Edit Data"
                        >
                          <Edit3 size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(warga)}
                          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Hapus Data"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Empty State */}
          {filteredWarga.length === 0 && (
            <div className="text-center py-12">
              <User className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Tidak ada data warga</h3>
              <p className="text-gray-500 max-w-sm mx-auto mb-6">
                Tidak ada warga yang sesuai dengan filter yang dipilih. Coba ubah kriteria pencarian.
              </p>
              <button
                onClick={handleAddWarga}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center gap-2 mx-auto"
              >
                <Plus size={16} />
                Tambah Warga Baru
              </button>
            </div>
          )}

          {/* Pagination */}
          {filteredWarga.length > 0 && (
            <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex items-center justify-between">
              <div className="text-sm text-gray-700">
                Menampilkan 1-{filteredWarga.length} dari {dataWarga.length} warga
              </div>
              <div className="flex items-center space-x-2">
                <button className="px-3 py-1 border border-gray-300 rounded text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                  Sebelumnya
                </button>
                <button className="px-3 py-1 border border-blue-500 bg-blue-500 text-white rounded text-sm font-medium">
                  1
                </button>
                <button className="px-3 py-1 border border-gray-300 rounded text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                  2
                </button>
                <button className="px-3 py-1 border border-gray-300 rounded text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                  Selanjutnya
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Detail Modal */}
      {showDetailModal && selectedWarga && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <User className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Detail Data Warga</h2>
                  <p className="text-gray-600">{selectedWarga.nama}</p>
                </div>
              </div>
              <button
                onClick={() => setShowDetailModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <XCircle size={20} />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Personal Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Informasi Pribadi</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">NIK</label>
                    <p className="text-gray-900 font-mono">{selectedWarga.nik}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
                    <p className="text-gray-900">{selectedWarga.nama}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tempat, Tanggal Lahir</label>
                    <p className="text-gray-900">
                      {selectedWarga.tempatLahir}, {new Date(selectedWarga.tanggalLahir).toLocaleDateString('id-ID')}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Usia</label>
                    <p className="text-gray-900">{calculateAge(selectedWarga.tanggalLahir)} tahun</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Jenis Kelamin</label>
                    <p className="text-gray-900">{selectedWarga.jenisKelamin}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Agama</label>
                    <p className="text-gray-900">{selectedWarga.agama}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Pendidikan</label>
                    <p className="text-gray-900">{selectedWarga.pendidikan}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Pekerjaan</label>
                    <p className="text-gray-900">{selectedWarga.pekerjaan}</p>
                  </div>
                </div>
              </div>

              {/* Address Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Alamat & Kontak</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Dusun</label>
                    <p className="text-gray-900">{selectedWarga.dusun}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">RT/RW</label>
                    <p className="text-gray-900">RT {selectedWarga.rt} / RW {selectedWarga.rw}</p>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Alamat Lengkap</label>
                    <p className="text-gray-900">{selectedWarga.alamat}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">No. HP</label>
                    <p className="text-gray-900">{selectedWarga.noHp || '-'}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <p className="text-gray-900">{selectedWarga.email || '-'}</p>
                  </div>
                </div>
              </div>

              {/* Additional Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Informasi Tambahan</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status Keluarga</label>
                    <p className="text-gray-900">{selectedWarga.statusKeluarga}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">No. KK</label>
                    <p className="text-gray-900 font-mono">{selectedWarga.kk}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status Kawin</label>
                    <p className="text-gray-900">{selectedWarga.statusKawin}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status Warga</label>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {selectedWarga.status}
                    </span>
                  </div>
                </div>
              </div>

              {/* Program Participation */}
              {selectedWarga.bansos.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Program Bansos</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedWarga.bansos.map((program, index) => (
                      <span key={index} className="px-3 py-2 bg-blue-100 text-blue-800 rounded-lg text-sm font-medium">
                        {program}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center justify-end p-6 border-t border-gray-200 bg-gray-50 space-x-3">
              <button
                onClick={() => setShowDetailModal(false)}
                className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Tutup
              </button>
              <button
                onClick={() => handleEdit(selectedWarga)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
              >
                Edit Data
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDesaDataWarga;