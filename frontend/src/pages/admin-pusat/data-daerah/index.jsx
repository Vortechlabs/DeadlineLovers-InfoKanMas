import React, { useState } from 'react';
import { 
  Search,
  Filter,
  Download,
  RefreshCw,
  MapPin,
  Users,
  TrendingUp,
  AlertTriangle,
  Grid,
  List
} from 'lucide-react';

import DaerahCard from './DaerahCard';
import RegionMap from './RegionMap';
import ComparisonChart from './ComparisonChart';
import DaerahModal from './DaerahModal';

const DataDaerahPage = () => {
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [selectedDaerah, setSelectedDaerah] = useState(null);
  const [viewMode, setViewMode] = useState('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterProvinsi, setFilterProvinsi] = useState('all');
  const [filterPerformance, setFilterPerformance] = useState('all');

  // Mock Data Daerah
  const daerahData = [
    {
      id: 'DIY-SLM',
      nama: 'Kabupaten Sleman',
      provinsi: 'DI Yogyakarta',
      tipe: 'Kabupaten',
      totalAnggaran: 'Rp 8.5 M',
      jumlahProgram: 15,
      realisasi: 78,
      kepatuhan: 92,
      performance: 85,
      lastUpdate: '2 jam lalu',
      programUnggulan: [
        { nama: 'Bantuan Pangan Warga Miskin', anggaran: 'Rp 850 Jt', progress: 65, status: 'on_track' },
        { nama: 'Beasiswa Pendidikan', anggaran: 'Rp 520 Jt', progress: 80, status: 'on_track' }
      ]
    },
    {
      id: 'DIY-YOG',
      nama: 'Kota Yogyakarta',
      provinsi: 'DI Yogyakarta',
      tipe: 'Kota',
      totalAnggaran: 'Rp 7.2 M',
      jumlahProgram: 12,
      realisasi: 82,
      kepatuhan: 88,
      performance: 79,
      lastUpdate: '1 jam lalu',
      alert: '2 program mengalami keterlambatan',
      programUnggulan: [
        { nama: 'Rehabilitasi Sosial', anggaran: 'Rp 650 Jt', progress: 43, status: 'at_risk' },
        { nama: 'Bantuan Lansia', anggaran: 'Rp 320 Jt', progress: 90, status: 'on_track' }
      ]
    },
    {
      id: 'DIY-BTL',
      nama: 'Kabupaten Bantul',
      provinsi: 'DI Yogyakarta',
      tipe: 'Kabupaten',
      totalAnggaran: 'Rp 6.8 M',
      jumlahProgram: 10,
      realisasi: 65,
      kepatuhan: 85,
      performance: 72,
      lastUpdate: '3 jam lalu',
      programUnggulan: [
        { nama: 'Program Sembako Lansia', anggaran: 'Rp 420 Jt', progress: 28, status: 'delayed' }
      ]
    },
    {
      id: 'DIY-KP',
      nama: 'Kabupaten Kulon Progo',
      provinsi: 'DI Yogyakarta',
      tipe: 'Kabupaten',
      totalAnggaran: 'Rp 5.4 M',
      jumlahProgram: 8,
      realisasi: 88,
      kepatuhan: 94,
      performance: 91,
      lastUpdate: '4 jam lalu',
      programUnggulan: [
        { nama: 'Pelatihan Keterampilan', anggaran: 'Rp 780 Jt', progress: 92, status: 'on_track' }
      ]
    },
    {
      id: 'DIY-GK',
      nama: 'Kabupaten Gunungkidul',
      provinsi: 'DI Yogyakarta',
      tipe: 'Kabupaten',
      totalAnggaran: 'Rp 4.8 M',
      jumlahProgram: 7,
      realisasi: 72,
      kepatuhan: 89,
      performance: 68,
      lastUpdate: '5 jam lalu',
      alert: 'Realisasi Q1 di bawah target',
      programUnggulan: [
        { nama: 'Bantuan Modal UMKM', anggaran: 'Rp 950 Jt', progress: 65, status: 'on_track' }
      ]
    },
    {
      id: 'JATENG-SMG',
      nama: 'Kota Semarang',
      provinsi: 'Jawa Tengah',
      tipe: 'Kota',
      totalAnggaran: 'Rp 12.3 M',
      jumlahProgram: 18,
      realisasi: 75,
      kepatuhan: 86,
      performance: 78,
      lastUpdate: '6 jam lalu',
      programUnggulan: [
        { nama: 'Program Kota Sehat', anggaran: 'Rp 1.2 M', progress: 55, status: 'on_track' }
      ]
    }
  ];

  // Data untuk comparison chart
  const comparisonData = daerahData.map(daerah => ({
    name: daerah.nama.split(' ').pop(),
    realisasi: daerah.realisasi,
    kepatuhan: daerah.kepatuhan,
    performance: daerah.performance
  }));

  // Filter daerah
  const filteredDaerah = daerahData.filter(daerah => {
    if (filterProvinsi !== 'all' && daerah.provinsi !== filterProvinsi) return false;
    if (filterPerformance !== 'all') {
      if (filterPerformance === 'high' && daerah.performance < 80) return false;
      if (filterPerformance === 'medium' && (daerah.performance >= 80 || daerah.performance < 60)) return false;
      if (filterPerformance === 'low' && daerah.performance >= 60) return false;
    }
    if (searchQuery && !daerah.nama.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !daerah.provinsi.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const handleRegionClick = (region) => {
    setSelectedRegion(region);
    // Find matching daerah data
    const matchedDaerah = daerahData.find(d => 
      d.nama.toLowerCase().includes(region.name.toLowerCase())
    );
    if (matchedDaerah) {
      setSelectedDaerah(matchedDaerah);
    }
  };

  const handleViewDetail = (daerah) => {
    setSelectedDaerah(daerah);
  };

  const handleCloseModal = () => {
    setSelectedDaerah(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 sm:px-6 py-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Data Daerah</h1>
            <p className="text-sm text-gray-600 mt-1">Kelola dan pantau kinerja daerah dalam pengelolaan anggaran sosial</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'grid' ? 'bg-white shadow-sm' : 'text-gray-500'
                }`}
              >
                <Grid size={16} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'list' ? 'bg-white shadow-sm' : 'text-gray-500'
                }`}
              >
                <List size={16} />
              </button>
            </div>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center gap-2">
              <RefreshCw size={16} />
              Refresh
            </button>
            <button className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors flex items-center gap-2">
              <Download size={16} />
              Export
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 sm:p-6 space-y-6">
        {/* Map Section */}
        <RegionMap 
          regions={daerahData}
          selectedRegion={selectedRegion}
          onRegionClick={handleRegionClick}
        />

        {/* Comparison Chart */}
        <ComparisonChart 
          data={comparisonData}
          metrics={['Realisasi', 'Kepatuhan', 'Performance']}
        />

        {/* Filters */}
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Cari daerah..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <select
              value={filterProvinsi}
              onChange={(e) => setFilterProvinsi(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Semua Provinsi</option>
              <option value="DI Yogyakarta">DI Yogyakarta</option>
              <option value="Jawa Tengah">Jawa Tengah</option>
              <option value="Jawa Timur">Jawa Timur</option>
            </select>
            <select
              value={filterPerformance}
              onChange={(e) => setFilterPerformance(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Semua Performance</option>
              <option value="high">Tinggi (≥80%)</option>
              <option value="medium">Sedang (60-79%)</option>
              <option value="low">Rendah (&lt;60%)</option>
            </select>
          </div>
        </div>

        {/* Daerah Grid */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Daftar Daerah ({filteredDaerah.length})
            </h3>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                Performance Tinggi
              </span>
              <span className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                Performance Sedang
              </span>
              <span className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                Performance Rendah
              </span>
            </div>
          </div>

          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredDaerah.map((daerah) => (
                <DaerahCard
                  key={daerah.id}
                  daerah={daerah}
                  onViewDetail={handleViewDetail}
                />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredDaerah.map((daerah) => (
                <div key={daerah.id} className="bg-white rounded-xl p-5 border border-gray-200 hover:shadow-md transition-all">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 flex-1">
                      <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                        <MapPin size={20} className="text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-900">{daerah.nama}</h3>
                        <p className="text-sm text-gray-600">{daerah.provinsi} • {daerah.tipe}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-gray-900">{daerah.totalAnggaran}</p>
                      <p className="text-xs text-gray-500">{daerah.jumlahProgram} program</p>
                    </div>
                    <button 
                      onClick={() => handleViewDetail(daerah)}
                      className="ml-4 text-sm font-medium text-blue-600 hover:text-blue-700"
                    >
                      Detail
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Detail Modal */}
      {selectedDaerah && (
        <DaerahModal
          daerah={selectedDaerah}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default DataDaerahPage;