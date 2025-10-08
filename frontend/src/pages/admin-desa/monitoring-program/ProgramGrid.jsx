import React from 'react';
import ProgramCard from './ProgramCard';

const ProgramGrid = ({ programs, onViewDetails }) => {
  if (programs.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-gray-200 p-8 text-center">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl">📋</span>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Tidak ada program</h3>
        <p className="text-gray-500">
          Tidak ada program yang sesuai dengan filter yang dipilih.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {programs.map((program) => (
        <ProgramCard 
          key={program.id}
          program={program}
          onViewDetails={onViewDetails}
        />
      ))}
    </div>
  );
};

export default ProgramGrid;