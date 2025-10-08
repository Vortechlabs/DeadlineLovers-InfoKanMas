import React from 'react';
import { MessageSquare, Plus, Download, Filter } from 'lucide-react';

const PengaduanHeader = ({ totalPengaduan, pengaduanBaru }) => {
  return (
    <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 px-4 sm:px-6 py-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
              <MessageSquare className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Pengaduan Warga</h1>
              <p className="text-sm text-gray-500 mt-1">
                {totalPengaduan} total pengaduan • {pengaduanBaru} baru
              </p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-3 flex-wrap">
          <button className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors flex items-center gap-2">
            <Filter size={16} />
            Filter Lanjutan
          </button>
          
          <button className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors flex items-center gap-2">
            <Download size={16} />
            Export
          </button>
          
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center gap-2">
            <Plus size={16} />
            Tambah Pengaduan
          </button>
        </div>
      </div>
    </div>
  );
};

export default PengaduanHeader;