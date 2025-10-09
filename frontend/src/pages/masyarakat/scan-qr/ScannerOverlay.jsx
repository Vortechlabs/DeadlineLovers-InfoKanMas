import React from 'react';

const ScannerOverlay = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <div className="relative">
        {/* Scanner Frame */}
        <div className="w-64 h-64 border-2 border-white rounded-xl relative">
          {/* Corner Borders */}
          <div className="absolute -top-1 -left-1 w-6 h-6 border-t-2 border-l-2 border-white rounded-tl"></div>
          <div className="absolute -top-1 -right-1 w-6 h-6 border-t-2 border-r-2 border-white rounded-tr"></div>
          <div className="absolute -bottom-1 -left-1 w-6 h-6 border-b-2 border-l-2 border-white rounded-bl"></div>
          <div className="absolute -bottom-1 -right-1 w-6 h-6 border-b-2 border-r-2 border-white rounded-br"></div>
          
          {/* Scanning Line */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-blue-500 animate-pulse shadow-lg"></div>
          
          {/* Grid Pattern */}
          <div className="absolute inset-2 border border-white border-opacity-20 rounded-lg"></div>
        </div>
        
        {/* Instructions */}
        <div className="text-center mt-6">
          <p className="text-white text-sm bg-black bg-opacity-50 rounded-full px-4 py-2 inline-block backdrop-blur-sm">
            Arahkan kamera ke QR code dalam frame
          </p>
        </div>
        
        {/* Guidance Dots */}
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white rounded-full opacity-60"></div>
        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white rounded-full opacity-60"></div>
        <div className="absolute top-1/2 -left-8 transform -translate-y-1/2 w-2 h-2 bg-white rounded-full opacity-60"></div>
        <div className="absolute top-1/2 -right-8 transform -translate-y-1/2 w-2 h-2 bg-white rounded-full opacity-60"></div>
      </div>
    </div>
  );
};

export default ScannerOverlay;