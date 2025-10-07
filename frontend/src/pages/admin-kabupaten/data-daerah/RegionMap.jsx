import React from 'react';
import { MapPin } from 'lucide-react';

const RegionMap = ({ regions, selectedRegion, onRegionClick }) => {
  // Simplified map visualization using CSS grid
  const regionData = [
    { id: 'sleman', name: 'Sleman', x: 60, y: 40, value: 8.5 },
    { id: 'yogya', name: 'Kota Yogya', x: 50, y: 50, value: 7.2 },
    { id: 'bantul', name: 'Bantul', x: 45, y: 65, value: 6.8 },
    { id: 'kulonprogo', name: 'Kulon Progo', x: 30, y: 45, value: 5.4 },
    { id: 'gunungkidul', name: 'Gunungkidul', x: 55, y: 80, value: 4.8 }
  ];

  const getRegionColor = (value) => {
    if (value >= 8) return 'bg-green-500';
    if (value >= 6) return 'bg-yellow-500';
    if (value >= 4) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const getRegionSize = (value) => {
    const baseSize = 8;
    const additionalSize = (value / 10) * 8;
    return baseSize + additionalSize;
  };

  return (
    <div className="bg-white rounded-xl p-6 border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Peta Distribusi Daerah</h3>
          <p className="text-sm text-gray-500 mt-1">Total anggaran per daerah (dalam Miliar)</p>
        </div>
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span>≥ Rp 8M</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <span>Rp 6-8M</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-orange-500"></div>
            <span>Rp 4-6M</span>
          </div>
        </div>
      </div>

      {/* Map Container */}
      <div className="relative bg-gradient-to-br from-blue-50 to-green-50 rounded-lg border border-gray-300 h-80">
        {/* Simplified map with circles representing regions */}
        {regionData.map((region) => (
          <button
            key={region.id}
            onClick={() => onRegionClick(region)}
            className={`absolute transform -translate-x-1/2 -translate-y-1/2 rounded-full ${getRegionColor(region.value)} hover:shadow-lg transition-all ${
              selectedRegion?.id === region.id ? 'ring-4 ring-blue-400 ring-opacity-50' : ''
            }`}
            style={{
              left: `${region.x}%`,
              top: `${region.y}%`,
              width: `${getRegionSize(region.value)}px`,
              height: `${getRegionSize(region.value)}px`
            }}
            title={`${region.name}: Rp ${region.value}M`}
          >
            <div className="flex items-center justify-center w-full h-full">
              <MapPin size={Math.max(12, getRegionSize(region.value) / 3)} className="text-white" />
            </div>
          </button>
        ))}

        {/* Region labels */}
        {regionData.map((region) => (
          <div
            key={`label-${region.id}`}
            className="absolute transform -translate-x-1/2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg text-xs font-medium text-gray-700 border border-gray-200 shadow-sm"
            style={{
              left: `${region.x}%`,
              top: `${region.y + 8}%`
            }}
          >
            {region.name}
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="mt-4 grid grid-cols-5 gap-2">
        {regionData.map((region) => (
          <div key={`legend-${region.id}`} className="text-center">
            <div className="flex items-center justify-center gap-1">
              <div className={`w-2 h-2 rounded-full ${getRegionColor(region.value)}`}></div>
              <span className="text-xs font-medium text-gray-700">{region.name}</span>
            </div>
            <p className="text-xs text-gray-600">Rp {region.value}M</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RegionMap;