import React from 'react';
import { Search, Filter, RefreshCw } from 'lucide-react';

const ProgramFilter = ({
  filterStatus,
  setFilterStatus,
  filterKategori,
  setFilterKategori,
  searchQuery,
  setSearchQuery,
  onRefresh,
  loading = false
}) => {
  const statusOptions = [
    { value: 'semua', label: 'Semua Status' },
    { value: 'menunggu_persetujuan', label: 'Menunggu Persetujuan' },
    { value: 'dalam_pengerjaan', label: 'Dalam Pengerjaan' },
    { value: 'selesai', label: 'Selesai' },
    { value: 'ditolak', label: 'Ditolak' }
  ];

  const kategoriOptions = [
    { value: 'semua', label: 'Semua Kategori' },
    { value: 'infrastruktur', label: 'Infrastruktur' },
    { value: 'bansos', label: 'Bansos' },
    { value: 'pendidikan', label: 'Pendidikan' },
    { value: 'kesehatan', label: 'Kesehatan' },
    { value: 'lainnya', label: 'Lainnya' }
  ];

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleStatusChange = (e) => {
    setFilterStatus(e.target.value);
  };

  const handleKategoriChange = (e) => {
    setFilterKategori(e.target.value);
  };

  return (
    <div className="bg-white rounded-2xl p-4 border border-gray-200">
      <div className="flex flex-col lg:flex-row gap-4 items-end">
        {/* Search Input */}
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Cari Program
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Cari berdasarkan nama program atau lokasi..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
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
            onChange={handleStatusChange}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
          >
            {statusOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Kategori Filter */}
        <div className="w-full lg:w-48">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Kategori
          </label>
          <select
            value={filterKategori}
            onChange={handleKategoriChange}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
          >
            {kategoriOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button
            onClick={onRefresh}
            disabled={loading}
            className={`px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
              loading 
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
            Refresh
          </button>
          
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center gap-2 h-10">
            <Filter size={16} />
            Terapkan
          </button>
        </div>
      </div>

      {/* Active Filters Info */}
      {(filterStatus !== 'semua' || filterKategori !== 'semua' || searchQuery) && (
        <div className="mt-3 flex flex-wrap gap-2">
          {filterStatus !== 'semua' && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
              Status: {statusOptions.find(opt => opt.value === filterStatus)?.label}
              <button 
                onClick={() => setFilterStatus('semua')}
                className="ml-1 hover:text-blue-900"
              >
                ×
              </button>
            </span>
          )}
          {filterKategori !== 'semua' && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
              Kategori: {kategoriOptions.find(opt => opt.value === filterKategori)?.label}
              <button 
                onClick={() => setFilterKategori('semua')}
                className="ml-1 hover:text-green-900"
              >
                ×
              </button>
            </span>
          )}
          {searchQuery && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-purple-100 text-purple-800">
              Pencarian: "{searchQuery}"
              <button 
                onClick={() => setSearchQuery('')}
                className="ml-1 hover:text-purple-900"
              >
                ×
              </button>
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default ProgramFilter;