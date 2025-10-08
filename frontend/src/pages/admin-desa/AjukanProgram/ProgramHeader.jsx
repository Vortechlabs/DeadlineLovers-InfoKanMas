import React from 'react';
import { Send, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ProgramHeader = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 px-4 sm:px-6 py-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/admin-desa/monitoring')}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft size={20} className="text-gray-600" />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <Send className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Ajukan Program Baru</h1>
              <p className="text-sm text-gray-500 mt-1">
                Ajukan program desa untuk disetujui Kecamatan dan Bupati
              </p>
            </div>
          </div>
        </div>
        
        <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full">
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
          <span className="text-sm font-medium text-blue-700">Live Form</span>
        </div>
      </div>
    </div>
  );
};

export default ProgramHeader;