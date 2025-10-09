import React from 'react';
import BansosCard from './BansosCard';

const BansosGrid = ({ 
  programs, 
  viewMode, 
  onViewRecipients, 
  onViewDistribution, 
  onQuickDistribution 
}) => {
  if (programs.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-12 text-center border border-gray-200">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Tidak ada program ditemukan</h3>
        <p className="text-gray-500 max-w-sm mx-auto">
          Tidak ada program bansos yang sesuai dengan filter yang dipilih. Coba ubah kriteria pencarian atau filter.
        </p>
      </div>
    );
  }

  return (
    <div className={viewMode === 'list' ? 'space-y-4' : 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'}>
      {programs.map((program) => (
        <BansosCard
          key={program.id}
          program={program}
          viewMode={viewMode}
          onViewRecipients={onViewRecipients}
          onViewDistribution={onViewDistribution}
          onQuickDistribution={onQuickDistribution}
        />
      ))}
    </div>
  );
};

export default BansosGrid;