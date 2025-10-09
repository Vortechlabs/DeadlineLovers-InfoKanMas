import React, { useState } from 'react';
import { MapPin, Navigation, ZoomIn, ZoomOut } from 'lucide-react';

const PetaInfrastruktur = ({ projects, onProjectClick }) => {
  const [zoom, setZoom] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  // Sample coordinates for projects (dummy data)
  const projectCoordinates = projects.reduce((acc, project, index) => {
    const positions = [
      { x: 60, y: 40 },
      { x: 30, y: 60 },
      { x: 70, y: 70 },
      { x: 80, y: 30 },
      { x: 40, y: 20 },
      { x: 20, y: 80 }
    ];
    acc[project.id] = positions[index % positions.length];
    return acc;
  }, {});

  const getStatusColor = (status) => {
    const colors = {
      'akan_datang': 'bg-blue-500',
      'berjalan': 'bg-green-500',
      'hampir_selesai': 'bg-orange-500',
      'selesai': 'bg-gray-500'
    };
    return colors[status] || 'bg-gray-500';
  };

  const getProjectSize = (progress) => {
    if (progress >= 80) return 'w-16 h-16 text-lg';
    if (progress >= 50) return 'w-14 h-14 text-base';
    return 'w-12 h-12 text-sm';
  };

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.2, 2));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.2, 0.5));

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-800 flex items-center space-x-2">
          <MapPin className="w-5 h-5 text-blue-500" />
          <span>Peta Sebaran Infrastruktur</span>
        </h3>
        <div className="flex items-center space-x-2">
          <button 
            onClick={handleZoomIn}
            className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
          >
            <ZoomIn className="w-4 h-4 text-gray-600" />
          </button>
          <button 
            onClick={handleZoomOut}
            className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
          >
            <ZoomOut className="w-4 h-4 text-gray-600" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
            <Navigation className="w-4 h-4 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center space-x-4 mb-4 p-3 bg-gray-50 rounded-xl flex-wrap">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
          <span className="text-xs text-gray-600">Akan Datang</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <span className="text-xs text-gray-600">Berjalan</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
          <span className="text-xs text-gray-600">Hampir Selesai</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
          <span className="text-xs text-gray-600">Selesai</span>
        </div>
      </div>

      {/* Map Container */}
      <div className="relative bg-gradient-to-br from-blue-50 to-green-50 rounded-xl border-2 border-gray-200 h-96 overflow-hidden">
        {/* Background Grid */}
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,#fff,rgba(255,255,255,0.6))]"></div>
        
        {/* Project Points */}
        {projects.map(project => {
          const coords = projectCoordinates[project.id];
          if (!coords) return null;

          return (
            <div
              key={project.id}
              className="absolute cursor-pointer group"
              style={{
                left: `${coords.x}%`,
                top: `${coords.y}%`,
                transform: `translate(-50%, -50%) scale(${zoom})`
              }}
              onClick={() => onProjectClick(project)}
            >
              {/* Project Bubble */}
              <div className={`
                ${getStatusColor(project.status)} 
                ${getProjectSize(project.progress)}
                rounded-full flex items-center justify-center text-white font-bold
                shadow-lg transition-all duration-300 group-hover:scale-110
                border-2 border-white
              `}>
                {project.progress}%
              </div>

              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 whitespace-nowrap z-10">
                <div className="font-semibold">{project.nama}</div>
                <div>{project.jenis}</div>
                <div className="text-green-300">{project.progress}% progress</div>
              </div>
            </div>
          );
        })}

        {/* Map Labels */}
        <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-xl border border-gray-200">
          <div className="text-sm font-semibold text-gray-800">Desa Sukamaju</div>
          <div className="text-xs text-gray-600">{projects.length} Proyek Infrastruktur</div>
        </div>
      </div>

      {/* Map Info */}
      <div className="mt-4 grid grid-cols-3 gap-3">
        <div className="text-center p-3 bg-blue-50 rounded-xl">
          <div className="text-lg font-bold text-blue-600">
            {projects.filter(p => p.status === 'berjalan').length}
          </div>
          <div className="text-xs text-blue-800">Sedang Berjalan</div>
        </div>
        <div className="text-center p-3 bg-green-50 rounded-xl">
          <div className="text-lg font-bold text-green-600">
            {Math.round(projects.reduce((acc, curr) => acc + curr.progress, 0) / projects.length)}%
          </div>
          <div className="text-xs text-green-800">Rata-rata Progress</div>
        </div>
        <div className="text-center p-3 bg-orange-50 rounded-xl">
          <div className="text-lg font-bold text-orange-600">
            {projects.filter(p => p.status === 'selesai').length}
          </div>
          <div className="text-xs text-orange-800">Telah Selesai</div>
        </div>
      </div>
    </div>
  );
};

export default PetaInfrastruktur;