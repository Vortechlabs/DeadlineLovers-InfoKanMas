import React from 'react';
import { MapPin, Users, DollarSign, TrendingUp, TrendingDown, Eye, AlertTriangle } from 'lucide-react';

const DaerahCard = ({ daerah, onViewDetail }) => {
  const getPerformanceColor = (performance) => {
    if (performance >= 80) return 'text-green-600';
    if (performance >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getPerformanceIcon = (performance) => {
    if (performance >= 80) return TrendingUp;
    if (performance >= 60) return TrendingUp;
    return TrendingDown;
  };

  const PerformanceIcon = getPerformanceIcon(daerah.performance);

  return (
    <div className="bg-white rounded-xl p-5 border border-gray-200 hover:shadow-md transition-all">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-bold text-gray-900 mb-1">{daerah.nama}</h3>
          <p className="text-sm text-gray-600 flex items-center gap-1">
            <MapPin size={14} />
            {daerah.provinsi}
          </p>
        </div>
        <div className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded-full">
          <PerformanceIcon size={14} className={getPerformanceColor(daerah.performance)} />
          <span className={`text-xs font-bold ${getPerformanceColor(daerah.performance)}`}>
            {daerah.performance}%
          </span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-blue-50 rounded-lg p-3">
          <div className="flex items-center gap-2 mb-1">
            <DollarSign size={14} className="text-blue-600" />
            <p className="text-xs text-blue-600 font-medium">Anggaran</p>
          </div>
          <p className="text-sm font-bold text-gray-900">{daerah.totalAnggaran}</p>
        </div>
        <div className="bg-green-50 rounded-lg p-3">
          <div className="flex items-center gap-2 mb-1">
            <Users size={14} className="text-green-600" />
            <p className="text-xs text-green-600 font-medium">Program</p>
          </div>
          <p className="text-sm font-bold text-gray-900">{daerah.jumlahProgram}</p>
        </div>
      </div>

      {/* Progress Bars */}
      <div className="space-y-2 mb-4">
        <div>
          <div className="flex justify-between text-xs text-gray-600 mb-1">
            <span>Realisasi</span>
            <span>{daerah.realisasi}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="h-2 rounded-full bg-green-500 transition-all duration-500"
              style={{ width: `${daerah.realisasi}%` }}
            ></div>
          </div>
        </div>
        <div>
          <div className="flex justify-between text-xs text-gray-600 mb-1">
            <span>Kepatuhan</span>
            <span>{daerah.kepatuhan}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="h-2 rounded-full bg-blue-500 transition-all duration-500"
              style={{ width: `${daerah.kepatuhan}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Alerts */}
      {daerah.alert && (
        <div className="mb-3 p-2 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="flex items-center gap-2">
            <AlertTriangle size={14} className="text-yellow-600 flex-shrink-0" />
            <p className="text-xs text-yellow-800">{daerah.alert}</p>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-gray-200">
        <div className="text-xs text-gray-500">
          Update: {daerah.lastUpdate}
        </div>
        <button 
          onClick={() => onViewDetail(daerah)}
          className="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1"
        >
          Detail
          <Eye size={14} />
        </button>
      </div>
    </div>
  );
};

export default DaerahCard;