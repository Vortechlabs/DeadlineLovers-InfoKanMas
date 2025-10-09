import React from 'react';
import { Search, Filter, Grid, List, BarChart3 } from 'lucide-react';

const BansosFilters = ({
  filterStatus,
  setFilterStatus,
  filterJenis,
  setFilterJenis,
  searchQuery,
  setSearchQuery,
  viewMode,
  setViewMode
}) => {
  const statusOptions = [
    { value: 'semua', label: 'Semua Status' },
    { value: 'menunggu_persetujuan', label: 'Menunggu Persetujuan' },
    { value: 'dalam_pengerjaan', label: 'Dalam Distribusi' },
    { value: 'selesai', label: 'Selesai' },
    { value: 'ditolak', label: 'Ditolak' }
  ];

  const jenisOptions = [
    { value: 'semua', label: 'Semua Jenis' },
    { value: 'sembako', label: 'Sembako' },
    { value: 'tunai', label: 'Tunai' },
    { value: 'pendidikan', label: 'Pendidikan' },
    { value: 'lansia', label: 'Lansia' },
    { value: 'umkm', label: 'UMKM' },
    { value: 'kesehatan', label: 'Kesehatan' }
  ];

  return (
    <div className="bg-white rounded-2xl p-4 border border-gray-200">
      <div className="flex flex-col lg:flex-row gap-4 items-end">
        {/* Search Input */}
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Cari Program Bansos
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Cari berdasarkan nama program, deskripsi, atau periode..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
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

        {/* Jenis Filter */}
        <div className="w-full lg:w-48">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Jenis Bansos
          </label>
          <select
            value={filterJenis}
            onChange={(e) => setFilterJenis(e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {jenisOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* View Mode Toggle */}
        <div className="flex gap-2">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 border rounded-lg transition-colors ${
              viewMode === 'grid' 
                ? 'bg-blue-600 text-white border-blue-600' 
                : 'text-gray-600 border-gray-200 hover:bg-gray-50'
            }`}
            title="Grid View"
          >
            <Grid size={16} />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 border rounded-lg transition-colors ${
              viewMode === 'list' 
                ? 'bg-blue-600 text-white border-blue-600' 
                : 'text-gray-600 border-gray-200 hover:bg-gray-50'
            }`}
            title="List View"
          >
            <List size={16} />
          </button>
          <button
            onClick={() => setViewMode('chart')}
            className={`p-2 border rounded-lg transition-colors ${
              viewMode === 'chart' 
                ? 'bg-blue-600 text-white border-blue-600' 
                : 'text-gray-600 border-gray-200 hover:bg-gray-50'
            }`}
            title="Chart View"
          >
            <BarChart3 size={16} />
          </button>
        </div>

        {/* Filter Button */}
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center gap-2 h-10">
          <Filter size={16} />
          Terapkan
        </button>
      </div>
    </div>
  );
};

export default BansosFilters;