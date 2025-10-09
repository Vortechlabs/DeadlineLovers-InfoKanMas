import React from 'react';
import ProgramCard from './ProgramCard';

const ProgramGrid = ({ programs, onViewDetails, loading = false }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="bg-white rounded-2xl border border-gray-200 overflow-hidden animate-pulse">
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-20"></div>
                </div>
                <div className="w-6 h-6 bg-gray-200 rounded"></div>
              </div>
              <div className="flex items-center justify-between mt-3">
                <div className="h-6 bg-gray-200 rounded w-24"></div>
                <div className="h-4 bg-gray-200 rounded w-12"></div>
              </div>
            </div>
            <div className="p-4 space-y-3">
              <div>
                <div className="flex justify-between mb-1">
                  <div className="h-3 bg-gray-200 rounded w-12"></div>
                  <div className="h-3 bg-gray-200 rounded w-8"></div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2"></div>
              </div>
              <div className="space-y-2">
                <div className="h-3 bg-gray-200 rounded"></div>
                <div className="h-3 bg-gray-200 rounded"></div>
                <div className="h-3 bg-gray-200 rounded"></div>
              </div>
              <div className="bg-gray-200 rounded-lg p-2 h-12"></div>
              <div className="flex justify-between">
                <div className="flex gap-3">
                  <div className="h-3 bg-gray-200 rounded w-8"></div>
                  <div className="h-3 bg-gray-200 rounded w-8"></div>
                  <div className="h-3 bg-gray-200 rounded w-8"></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

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