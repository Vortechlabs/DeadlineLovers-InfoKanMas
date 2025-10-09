import React from 'react';
import ProjectCard from './ProjectCard';

const ProjectGrid = ({ projects, viewMode, onViewDetails }) => {
  if (projects.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-3xl">🏗️</span>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Tidak ada proyek</h3>
        <p className="text-gray-500 mb-6">
          Tidak ada proyek infrastruktur yang sesuai dengan filter yang dipilih.
        </p>
        <button className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors font-medium">
          + Tambah Proyek Baru
        </button>
      </div>
    );
  }

  if (viewMode === 'list') {
    return (
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Daftar Proyek Infrastruktur</h3>
          <p className="text-sm text-gray-500 mt-1">
            {projects.length} proyek ditemukan
          </p>
        </div>
        
        <div className="divide-y divide-gray-200">
          {projects.map((project) => (
            <ProjectCard 
              key={project.id}
              project={project}
              viewMode="list"
              onViewDetails={onViewDetails}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {projects.map((project) => (
        <ProjectCard 
          key={project.id}
          project={project}
          viewMode="grid"
          onViewDetails={onViewDetails}
        />
      ))}
    </div>
  );
};

export default ProjectGrid;