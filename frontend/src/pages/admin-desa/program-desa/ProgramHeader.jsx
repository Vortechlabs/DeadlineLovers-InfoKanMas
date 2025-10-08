import React from 'react';
import { FolderOpen, Plus, Download, Filter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ProgramHeader = ({ totalPrograms, onAddProgram }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 px-4 sm:px-6 py-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
            <FolderOpen className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Program Desa</h1>
            <p className="text-sm text-gray-500 mt-1">
              Kelola semua program dan kegiatan desa Sukamaju
            </p>
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
          
          <button 
            onClick={onAddProgram}
            className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg text-sm font-medium hover:from-blue-600 hover:to-purple-700 transition-all shadow-lg shadow-blue-500/25 flex items-center gap-2"
          >
            <Plus size={16} />
            Program Baru
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProgramHeader;