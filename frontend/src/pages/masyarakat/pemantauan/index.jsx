import React, { useState } from 'react';
import { 
  TrendingUp, 
  MapPin, 
  Calendar, 
  Filter,
  Download,
  Eye,
  BarChart3,
  PieChart,
  AlertTriangle,
  CheckCircle,
  Clock,
  X
} from 'lucide-react';
import PetaPemantauan from './PetaPemantauan';
import GrafikProgress from './GrafikProgress';
import StatistikCard from './StatistikCard';
import ProgramTerpopuler from './ProgramTerpopuler';

function MasyarakatPemantauan() {
  const [selectedKecamatan, setSelectedKecamatan] = useState('semua');
  const [selectedTahun, setSelectedTahun] = useState('2024');
  const [viewMode, setViewMode] = useState('peta'); // 'peta' or 'grafik'

  // Data statistik sample
  const statistikData = {
    totalProgram: 24,
    programBerjalan: 18,
    programSelesai: 6,
    totalAnggaran: 2850000000,
    realisasi: 1875000000,
    rataRating: 4.3,
    laporanAktif: 8
  };

  // Data progress per kecamatan
  const progressKecamatan = [
    {
      id: 1,
      nama: 'Purbalingga',
      programAktif: 8,
      progress: 78,
      anggaran: 1200000000,
      realisasi: 936000000,
      warna: 'from-blue-500 to-cyan-500'
    },
    {
      id: 2,
      nama: 'Kutasari',
      programAktif: 5,
      progress: 65,
      anggaran: 750000000,
      realisasi: 487500000,
      warna: 'from-green-500 to-emerald-500'
    },
    {
      id: 3,
      nama: 'Mrebet',
      programAktif: 3,
      progress: 45,
      anggaran: 500000000,
      realisasi: 225000000,
      warna: 'from-orange-500 to-amber-500'
    },
    {
      id: 4,
      nama: 'Bobotsari',
      programAktif: 2,
      progress: 90,
      anggaran: 400000000,
      realisasi: 360000000,
      warna: 'from-purple-500 to-pink-500'
    }
  ];

  // Data alert/masalah
  const alertData = [
    {
      id: 1,
      jenis: 'progress_macet',
      program: 'Perbaikan Jalan Desa',
      lokasi: 'Kec. Purbalingga',
      deskripsi: 'Progress tertahan di 45% selama 2 minggu',
      tingkat: 'sedang',
      tanggal: '2024-03-20'
    },
    {
      id: 2,
      jenis: 'konfirmasi_rendah',
      program: 'Bantuan Sembako',
      lokasi: 'Kec. Kutasari',
      deskripsi: 'Hanya 60% penerima yang konfirmasi',
      tingkat: 'ringan',
      tanggal: '2024-03-18'
    },
    {
      id: 3,
      jenis: 'anggaran_menyimpang',
      program: 'Renovasi Puskesmas',
      lokasi: 'Kec. Mrebet',
      deskripsi: 'Realisasi melebihi anggaran plan',
      tingkat: 'tinggi',
      tanggal: '2024-03-15'
    }
  ];

  const kecamatanOptions = [
    { value: 'semua', label: 'Semua Kecamatan' },
    { value: 'purbalingga', label: 'Purbalingga' },
    { value: 'kutasari', label: 'Kutasari' },
    { value: 'mrebet', label: 'Mrebet' },
    { value: 'bobotsari', label: 'Bobotsari' }
  ];

  const tahunOptions = [
    { value: '2024', label: '2024' },
    { value: '2023', label: '2023' },
    { value: '2022', label: '2022' }
  ];

  const getTingkatAlertColor = (tingkat) => {
    const colors = {
      ringan: 'bg-green-100 text-green-800 border-green-200',
      sedang: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      tinggi: 'bg-red-100 text-red-800 border-red-200'
    };
    return colors[tingkat] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 p-4">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Pemantauan Program</h1>
            <p className="text-gray-600">Pantau perkembangan program secara real-time</p>
          </div>
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-white" />
          </div>
        </div>
      </div>

      {/* Filter Controls */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-6">
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
          <div className="flex flex-col sm:flex-row gap-3 flex-1">
            {/* Filter Kecamatan */}
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Kecamatan
              </label>
              <select
                value={selectedKecamatan}
                onChange={(e) => setSelectedKecamatan(e.target.value)}
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {kecamatanOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Filter Tahun */}
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tahun
              </label>
              <select
                value={selectedTahun}
                onChange={(e) => setSelectedTahun(e.target.value)}
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {tahunOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* View Toggle */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setViewMode('peta')}
              className={`px-4 py-2 rounded-xl transition-all duration-300 flex items-center space-x-2 ${
                viewMode === 'peta' 
                  ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/30' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <MapPin className="w-4 h-4" />
              <span>Peta</span>
            </button>
            <button
              onClick={() => setViewMode('grafik')}
              className={`px-4 py-2 rounded-xl transition-all duration-300 flex items-center space-x-2 ${
                viewMode === 'grafik' 
                  ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/30' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              <span>Grafik</span>
            </button>
          </div>
        </div>
      </div>

      {/* Statistik Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <StatistikCard
          icon={TrendingUp}
          label="Program Aktif"
          value={statistikData.programBerjalan}
          change="+2 dari bulan lalu"
          color="text-blue-600"
        />
        <StatistikCard
          icon={PieChart}
          label="Realisasi Anggaran"
          value={`${Math.round((statistikData.realisasi / statistikData.totalAnggaran) * 100)}%`}
          change={`${Math.round(statistikData.realisasi / 1000000)}J dari ${Math.round(statistikData.totalAnggaran / 1000000)}J`}
          color="text-green-600"
        />
        <StatistikCard
          icon={CheckCircle}
          label="Program Selesai"
          value={statistikData.programSelesai}
          change="3 program baru selesai"
          color="text-emerald-600"
        />
        <StatistikCard
          icon={AlertTriangle}
          label="Perlu Perhatian"
          value={statistikData.laporanAktif}
          change="2 laporan baru"
          color="text-orange-600"
        />
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">
        {/* Peta/Grafik Utama */}
        <div className="xl:col-span-2">
          {viewMode === 'peta' ? (
            <PetaPemantauan 
              data={progressKecamatan}
              selectedKecamatan={selectedKecamatan}
            />
          ) : (
            <GrafikProgress 
              data={progressKecamatan}
              selectedTahun={selectedTahun}
            />
          )}
        </div>

        {/* Sidebar - Program & Alert */}
        <div className="space-y-6">
          {/* Program Terpopuler */}
          <ProgramTerpopuler />

          {/* Alert Section */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-800 flex items-center space-x-2">
                <AlertTriangle className="w-5 h-5 text-orange-500" />
                <span>Perhatian Khusus</span>
              </h3>
              <span className="px-2 py-1 bg-orange-100 text-orange-700 text-xs font-bold rounded-full">
                {alertData.length}
              </span>
            </div>

            <div className="space-y-3">
              {alertData.map(alert => (
                <div
                  key={alert.id}
                  className={`p-3 rounded-xl border ${getTingkatAlertColor(alert.tingkat)}`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-sm">{alert.program}</h4>
                    <span className="text-xs opacity-75">{alert.tanggal}</span>
                  </div>
                  <p className="text-xs mb-2">{alert.deskripsi}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs opacity-75">{alert.lokasi}</span>
                    <button className="text-xs text-blue-600 hover:text-blue-700 font-medium">
                      Detail →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Progress per Kecamatan */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-gray-900">Progress per Kecamatan</h3>
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-100 transition-colors">
            <Download className="w-4 h-4" />
            <span className="text-sm font-medium">Export Data</span>
          </button>
        </div>

        <div className="space-y-4">
          {progressKecamatan.map(kecamatan => (
            <div key={kecamatan.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center space-x-4 flex-1">
                <div className={`w-12 h-12 bg-gradient-to-br ${kecamatan.warna} rounded-xl flex items-center justify-center`}>
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-800">{kecamatan.nama}</h4>
                  <p className="text-sm text-gray-600">
                    {kecamatan.programAktif} program aktif • 
                    Realisasi: {Math.round(kecamatan.realisasi / 1000000)}J
                  </p>
                </div>
              </div>

              <div className="text-right">
                <div className="text-2xl font-bold text-gray-800 mb-1">
                  {kecamatan.progress}%
                </div>
                <div className="w-32 bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full bg-gradient-to-r ${kecamatan.warna}`}
                    style={{ width: `${kecamatan.progress}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MasyarakatPemantauan;