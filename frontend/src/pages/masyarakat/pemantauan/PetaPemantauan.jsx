import React from 'react';
import { MapPin, Navigation, ZoomIn, ZoomOut } from 'lucide-react';

const PetaPemantauan = ({ data, selectedKecamatan }) => {
  // Sample coordinates for kecamatan (dummy data)
  const kecamatanCoordinates = {
    purbalingga: { x: 60, y: 40 },
    kutasari: { x: 30, y: 60 },
    mrebet: { x: 70, y: 70 },
    bobotsari: { x: 80, y: 30 }
  };

  const getProgressColor = (progress) => {
    if (progress >= 80) return 'bg-gradient-to-br from-green-500 to-emerald-500';
    if (progress >= 60) return 'bg-gradient-to-br from-blue-500 to-cyan-500';
    if (progress >= 40) return 'bg-gradient-to-br from-yellow-500 to-amber-500';
    return 'bg-gradient-to-br from-red-500 to-orange-500';
  };

  const getProgressSize = (programCount) => {
    if (programCount >= 6) return 'w-16 h-16';
    if (programCount >= 3) return 'w-12 h-12';
    return 'w-10 h-10';
  };

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-800 flex items-center space-x-2">
          <MapPin className="w-5 h-5 text-blue-500" />
          <span>Peta Sebaran Program</span>
        </h3>
        <div className="flex items-center space-x-2">
          <button className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
            <ZoomIn className="w-4 h-4 text-gray-600" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
            <ZoomOut className="w-4 h-4 text-gray-600" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
            <Navigation className="w-4 h-4 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center space-x-4 mb-4 p-3 bg-gray-50 rounded-xl">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <span className="text-xs text-gray-600">80-100%</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
          <span className="text-xs text-gray-600">60-79%</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <span className="text-xs text-gray-600">40-59%</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <span className="text-xs text-gray-600">0-39%</span>
        </div>
      </div>

      {/* Map Container */}
      <div className="relative bg-gradient-to-br from-blue-50 to-green-50 rounded-xl border-2 border-gray-200 h-96 overflow-hidden">
        {/* Background Grid */}
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,#fff,rgba(255,255,255,0.6))]"></div>
        
        {/* Kecamatan Points */}
        {data.map(kecamatan => {
          const coords = kecamatanCoordinates[kecamatan.nama.toLowerCase()];
          if (!coords) return null;

          return (
            <div
              key={kecamatan.id}
              className="absolute cursor-pointer group"
              style={{
                left: `${coords.x}%`,
                top: `${coords.y}%`,
                transform: 'translate(-50%, -50%)'
              }}
            >
              {/* Progress Bubble */}
              <div className={`
                ${getProgressColor(kecamatan.progress)} 
                ${getProgressSize(kecamatan.programAktif)}
                rounded-full flex items-center justify-center text-white font-bold text-sm
                shadow-lg transition-all duration-300 group-hover:scale-110
                border-2 border-white
              `}>
                {kecamatan.progress}%
              </div>

              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 whitespace-nowrap z-10">
                <div className="font-semibold">{kecamatan.nama}</div>
                <div>{kecamatan.programAktif} program</div>
                <div className="text-green-300">{kecamatan.progress}% progress</div>
              </div>
            </div>
          );
        })}

        {/* Map Labels */}
        <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-xl border border-gray-200">
          <div className="text-sm font-semibold text-gray-800">Kabupaten Purbalingga</div>
          <div className="text-xs text-gray-600">Total 24 Program Aktif</div>
        </div>
      </div>

      {/* Map Info */}
      <div className="mt-4 grid grid-cols-2 gap-3">
        <div className="text-center p-3 bg-blue-50 rounded-xl">
          <div className="text-2xl font-bold text-blue-600">{data.length}</div>
          <div className="text-xs text-blue-800">Kecamatan Aktif</div>
        </div>
        <div className="text-center p-3 bg-green-50 rounded-xl">
          <div className="text-2xl font-bold text-green-600">
            {Math.round(data.reduce((acc, curr) => acc + curr.progress, 0) / data.length)}%
          </div>
          <div className="text-xs text-green-800">Rata-rata Progress</div>
        </div>
      </div>
    </div>
  );
};

export default PetaPemantauan;