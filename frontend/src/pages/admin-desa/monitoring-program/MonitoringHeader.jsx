import React from 'react';
import { Eye, Download, Grid, List } from 'lucide-react';

const MonitoringHeader = ({ totalPrograms, programsActive, onExport, viewMode, onViewModeChange }) => {
  return (
    <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 px-4 sm:px-6 py-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
              <Eye className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Monitoring Program</h1>
              <p className="text-sm text-gray-500 mt-1">
                {totalPrograms} total program • {programsActive} aktif
              </p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-3 flex-wrap">
          {/* View Mode Toggle */}
          <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg p-1">
            <button
              onClick={() => onViewModeChange('grid')}
              className={`p-2 rounded-md transition-colors ${
                viewMode === 'grid' 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Grid size={16} />
            </button>
            <button
              onClick={() => onViewModeChange('timeline')}
              className={`p-2 rounded-md transition-colors ${
                viewMode === 'timeline' 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <List size={16} />
            </button>
          </div>
          
          <button 
            onClick={onExport}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <Download size={16} />
            Export Laporan
          </button>
        </div>
      </div>
    </div>
  );
};

export default MonitoringHeader;