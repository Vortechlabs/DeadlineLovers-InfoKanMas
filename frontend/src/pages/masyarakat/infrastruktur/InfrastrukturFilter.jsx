import React, { useState } from 'react';
import { Filter, X } from 'lucide-react';

const InfrastrukturFilter = ({ filters, setFilters }) => {
  const [showFilter, setShowFilter] = useState(false);

  const statusOptions = [
    { value: 'semua', label: 'Semua Status' },
    { value: 'akan_datang', label: 'Akan Datang' },
    { value: 'berjalan', label: 'Sedang Berjalan' },
    { value: 'hampir_selesai', label: 'Hampir Selesai' },
    { value: 'selesai', label: 'Selesai' }
  ];

  const jenisOptions = [
    { value: 'semua', label: 'Semua Jenis' },
    { value: 'jalan', label: 'Jalan' },
    { value: 'jembatan', label: 'Jembatan' },
    { value: 'kesehatan', label: 'Kesehatan' },
    { value: 'drainase', label: 'Drainase' },
    { value: 'pju', label: 'Penerangan Jalan' },
    { value: 'irigasi', label: 'Irigasi' }
  ];

  const tahunOptions = [
    { value: '2024', label: '2024' },
    { value: '2023', label: '2023' },
    { value: '2022', label: '2022' }
  ];

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({ status: 'semua', jenis: 'semua', tahun: '2024' });
  };

  const hasActiveFilters = filters.status !== 'semua' || filters.jenis !== 'semua';

  return (
    <div className="relative">
      <button
        onClick={() => setShowFilter(!showFilter)}
        className={`p-3 rounded-xl transition-colors flex items-center space-x-2 ${
          hasActiveFilters 
            ? 'bg-blue-500 text-white' 
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
        }`}
      >
        <Filter className="w-5 h-5" />
        {hasActiveFilters && (
          <span className="w-2 h-2 bg-white rounded-full"></span>
        )}
      </button>

      {showFilter && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-40"
            onClick={() => setShowFilter(false)}
          />
          
          {/* Filter Panel */}
          <div className="absolute right-0 top-full mt-2 z-50 bg-white rounded-2xl shadow-lg border border-gray-200 p-4 w-64">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-800">Filter Infrastruktur</h3>
              <button
                onClick={() => setShowFilter(false)}
                className="p-1 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-4 h-4 text-gray-600" />
              </button>
            </div>

            <div className="space-y-4">
              {/* Status */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status Proyek
                </label>
                <select
                  value={filters.status}
                  onChange={(e) => handleFilterChange('status', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {statusOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Jenis Infrastruktur */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Jenis Infrastruktur
                </label>
                <select
                  value={filters.jenis}
                  onChange={(e) => handleFilterChange('jenis', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {jenisOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Tahun */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tahun
                </label>
                <select
                  value={filters.tahun}
                  onChange={(e) => handleFilterChange('tahun', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {tahunOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Clear Filters */}
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="w-full mt-4 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-lg transition-colors"
              >
                Hapus Semua Filter
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default InfrastrukturFilter;