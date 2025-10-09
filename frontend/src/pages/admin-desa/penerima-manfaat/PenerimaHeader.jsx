import React from 'react';
import { Users, Plus, Download, Send } from 'lucide-react';

const PenerimaHeader = ({ totalPenerima, onAddPenerima, onExportData }) => {
  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center shadow-lg">
            <Users className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Penerima Manfaat</h1>
            <p className="text-gray-600 mt-1">
              Kelola data penerima bantuan sosial dan program desa
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-3 flex-wrap">
          <button className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors flex items-center gap-2">
            <Send size={16} />
            Kirim Pengingat
          </button>
          
          <button 
            onClick={onExportData}
            className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors flex items-center gap-2"
          >
            <Download size={16} />
            Export Data
          </button>
          
          <button 
            onClick={onAddPenerima}
            className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-lg text-sm font-medium hover:from-purple-600 hover:to-pink-700 transition-all shadow-lg shadow-purple-500/25 flex items-center gap-2"
          >
            <Plus size={16} />
            Tambah Penerima
          </button>
        </div>
      </div>
    </div>
  );
};

export default PenerimaHeader;