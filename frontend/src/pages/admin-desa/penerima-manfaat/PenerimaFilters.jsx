import React from 'react';
import { Search, Filter, Table, BarChart3 } from 'lucide-react';

const PenerimaFilters = ({
  searchQuery,
  setSearchQuery,
  filterProgram,
  setFilterProgram,
  filterStatus,
  setFilterStatus,
  filterDusun,
  setFilterDusun,
  viewMode,
  setViewMode,
  programOptions,
  statusOptions,
  dusunOptions
}) => {
  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200 mb-6">
      <div className="flex flex-col lg:flex-row gap-4 items-end">
        {/* Search Input */}
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Cari Penerima Manfaat
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Cari berdasarkan nama, NIK, atau program..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>

        {/* Program Filter */}
        <div className="w-full lg:w-48">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Program
          </label>
          <select
            value={filterProgram}
            onChange={(e) => setFilterProgram(e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            {programOptions.map(option => (
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
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            {statusOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Dusun Filter */}
        <div className="w-full lg:w-48">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Dusun
          </label>
          <select
            value={filterDusun}
            onChange={(e) => setFilterDusun(e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            {dusunOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* View Mode Toggle */}
        <div className="flex gap-2">
          <button
            onClick={() => setViewMode('table')}
            className={`p-2 border rounded-lg transition-colors ${
              viewMode === 'table' 
                ? 'bg-purple-600 text-white border-purple-600' 
                : 'text-gray-600 border-gray-200 hover:bg-gray-50'
            }`}
            title="Table View"
          >
            <Table size={16} />
          </button>
          <button
            onClick={() => setViewMode('chart')}
            className={`p-2 border rounded-lg transition-colors ${
              viewMode === 'chart' 
                ? 'bg-purple-600 text-white border-purple-600' 
                : 'text-gray-600 border-gray-200 hover:bg-gray-50'
            }`}
            title="Chart View"
          >
            <BarChart3 size={16} />
          </button>
        </div>

        {/* Filter Button */}
        <button className="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors flex items-center gap-2 h-10">
          <Filter size={16} />
          Terapkan
        </button>
      </div>
    </div>
  );
};

export default PenerimaFilters;