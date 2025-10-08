import React from 'react';
import { Calendar, Download, Filter, MapPin } from 'lucide-react';

const ProgressHeader = ({ selectedDate, onDateChange }) => {
  return (
    <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 px-4 sm:px-6 py-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Progress Harian</h1>
          <p className="text-sm text-gray-500 mt-1 flex items-center gap-2">
            <MapPin size={14} />
            Monitor perkembangan proyek desa - Desa Sukamaju
          </p>
        </div>
        
        <div className="flex items-center gap-3 flex-wrap">
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="date"
              value={selectedDate.toISOString().split('T')[0]}
              onChange={(e) => onDateChange(new Date(e.target.value))}
              className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <button className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors flex items-center gap-2">
            <Filter size={16} />
            Filter
          </button>
          
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center gap-2">
            <Download size={16} />
            Export Laporan
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProgressHeader;