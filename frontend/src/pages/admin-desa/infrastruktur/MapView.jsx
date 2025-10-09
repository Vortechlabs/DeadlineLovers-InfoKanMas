import React, { useState } from 'react';
import { MapPin, Navigation, Filter, Eye } from 'lucide-react';

const MapView = ({ projects, onViewDetails }) => {
  const [selectedType, setSelectedType] = useState('semua');
  const [hoveredProject, setHoveredProject] = useState(null);

  // Simulasi peta sederhana dengan koordinat relatif
  const mapProjects = projects.map(project => ({
    ...project,
    x: 50 + (Math.random() * 40), // Position X antara 50-90%
    y: 30 + (Math.random() * 40)  // Position Y antara 30-70%
  }));

  const getProjectColor = (status) => {
    const colors = {
      dalam_pengerjaan: 'bg-blue-500 border-blue-600',
      selesai: 'bg-green-500 border-green-600',
      menunggu_persetujuan: 'bg-yellow-500 border-yellow-600',
      ditolak: 'bg-red-500 border-red-600'
    };
    return colors[status] || 'bg-gray-500 border-gray-600';
  };

  const getProjectIcon = (jenis) => {
    const icons = {
      jalan: '🛣️',
      jembatan: '🌉',
      drainase: '💧',
      mck: '🚻',
      penerangan: '💡',
      gedung: '🏢'
    };
    return icons[jenis] || '🏗️';
  };

  const filteredMapProjects = selectedType === 'semua' 
    ? mapProjects 
    : mapProjects.filter(p => p.jenis === selectedType);

  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Peta Infrastruktur Desa</h3>
            <p className="text-sm text-gray-500 mt-1">
              {filteredMapProjects.length} proyek ditampilkan di peta
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            {/* Filter Jenis */}
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="semua">Semua Jenis</option>
              <option value="jalan">Jalan</option>
              <option value="jembatan">Jembatan</option>
              <option value="drainase">Drainase</option>
              <option value="mck">MCK</option>
              <option value="penerangan">Penerangan</option>
              <option value="gedung">Gedung</option>
            </select>

            <button className="px-3 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center gap-2">
              <Navigation size={14} />
              Navigasi
            </button>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="px-4 py-2 bg-gray-50 border-b border-gray-200">
        <div className="flex items-center gap-4 text-xs">
          <span className="font-medium text-gray-700">Legenda:</span>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span>Dalam Pengerjaan</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span>Selesai</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <span>Menunggu</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span>Ditolak</span>
          </div>
        </div>
      </div>

      {/* Map Container */}
      <div className="relative bg-gradient-to-br from-green-50 to-blue-50 h-96 overflow-hidden">
        {/* Background Grid */}
        <div className="absolute inset-0 opacity-20">
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i} className="absolute border-r border-gray-300" style={{ left: `${i * 5}%` }}></div>
          ))}
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i} className="absolute border-b border-gray-300" style={{ top: `${i * 5}%` }}></div>
          ))}
        </div>

        {/* Roads (simulated) */}
        <div className="absolute w-1/2 h-1 bg-gray-400 top-1/2 left-1/4 transform -translate-y-1/2"></div>
        <div className="absolute w-1 h-1/2 bg-gray-400 left-1/2 top-1/4 transform -translate-x-1/2"></div>

        {/* River (simulated) */}
        <div className="absolute w-1 h-2/3 bg-blue-200 left-1/3 top-1/6 transform -rotate-12"></div>

        {/* Project Markers */}
        {filteredMapProjects.map((project) => (
          <div
            key={project.id}
            className={`absolute w-8 h-8 rounded-full border-2 flex items-center justify-center cursor-pointer transform -translate-x-1/2 -translate-y-1/2 transition-all duration-200 hover:scale-125 hover:z-10 ${getProjectColor(project.status)}`}
            style={{
              left: `${project.x}%`,
              top: `${project.y}%`
            }}
            onMouseEnter={() => setHoveredProject(project)}
            onMouseLeave={() => setHoveredProject(null)}
            onClick={() => onViewDetails(project)}
          >
            <span className="text-xs">{getProjectIcon(project.jenis)}</span>
            
            {/* Progress Ring */}
            <div className="absolute inset-0 rounded-full border-2 border-white">
              <div 
                className="absolute inset-0 rounded-full border-2 border-green-500 transform -rotate-90"
                style={{
                  clipPath: `inset(0 ${100 - project.progress}% 0 0)`
                }}
              ></div>
            </div>
          </div>
        ))}

        {/* Hover Tooltip */}
        {hoveredProject && (
          <div 
            className="absolute bg-white rounded-lg shadow-lg border border-gray-200 p-3 z-20 min-w-48"
            style={{
              left: `${hoveredProject.x + 5}%`,
              top: `${hoveredProject.y - 10}%`
            }}
          >
            <div className="flex items-center gap-2 mb-2">
              <div className={`w-3 h-3 rounded-full ${getProjectColor(hoveredProject.status).split(' ')[0]}`}></div>
              <h4 className="font-semibold text-sm text-gray-900">{hoveredProject.nama}</h4>
            </div>
            <p className="text-xs text-gray-600 mb-2">{hoveredProject.lokasi}</p>
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>Progress: {hoveredProject.progress}%</span>
              <span>{formatCurrency(hoveredProject.anggaran)}</span>
            </div>
            <button 
              onClick={() => onViewDetails(hoveredProject)}
              className="w-full mt-2 px-2 py-1 bg-blue-600 text-white rounded text-xs hover:bg-blue-700 transition-colors flex items-center justify-center gap-1"
            >
              <Eye size={10} />
              Lihat Detail
            </button>
          </div>
        )}

        {/* Map Controls */}
        <div className="absolute bottom-4 right-4 flex flex-col gap-2">
          <button className="w-8 h-8 bg-white rounded-lg shadow-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors">
            <span className="text-lg">+</span>
          </button>
          <button className="w-8 h-8 bg-white rounded-lg shadow-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors">
            <span className="text-lg">-</span>
          </button>
          <button className="w-8 h-8 bg-white rounded-lg shadow-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors">
            <MapPin size={16} />
          </button>
        </div>
      </div>

      {/* Project List Below Map */}
      <div className="p-4 border-t border-gray-200">
        <h4 className="font-medium text-gray-900 mb-3">Daftar Proyek di Peta</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {filteredMapProjects.map((project) => (
            <div
              key={project.id}
              className="flex items-center gap-3 p-2 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
              onClick={() => onViewDetails(project)}
            >
              <div className={`w-3 h-3 rounded-full ${getProjectColor(project.status).split(' ')[0]}`}></div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{project.nama}</p>
                <p className="text-xs text-gray-500 truncate">{project.lokasi}</p>
              </div>
              <div className="text-xs text-gray-500">{project.progress}%</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Helper function untuk format currency
const formatCurrency = (amount) => {
  if (amount >= 1000000000) {
    return `Rp ${(amount / 1000000000).toFixed(1)} M`;
  } else if (amount >= 1000000) {
    return `Rp ${(amount / 1000000).toFixed(0)} Jt`;
  } else {
    return `Rp ${(amount / 1000).toFixed(0)} Rb`;
  }
};

export default MapView;