import React from 'react';
import { CheckCircle, X, ExternalLink } from 'lucide-react';
import { toast } from 'sonner';

const SuccessToast = ({ toastId, programData, backendResponse }) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const programCode = backendResponse?.data?.kode_program || 'PRG-XXXXXX';

  return (
    <div className="w-80 bg-white rounded-xl border border-green-200 shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle size={20} className="text-white" />
            <span className="text-white font-semibold">Pengajuan Berhasil!</span>
          </div>
          <button 
            onClick={() => toast.dismiss(toastId)}
            className="text-white/80 hover:text-white transition-colors"
          >
            <X size={16} />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        <div className="text-center">
          <h3 className="font-semibold text-gray-900 text-sm mb-1">
            {programData.namaProgram}
          </h3>
          <p className="text-xs text-gray-600">
            Kode: <span className="font-mono">{programCode}</span>
          </p>
          <p className="text-xs text-gray-600 mt-1">
            Berhasil diajukan ke Kecamatan
          </p>
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="text-center p-2 bg-green-50 rounded-lg">
            <p className="text-gray-600">Total Anggaran</p>
            <p className="font-semibold text-green-700">
              {formatCurrency(programData.totalAnggaran)}
            </p>
          </div>
          <div className="text-center p-2 bg-blue-50 rounded-lg">
            <p className="text-gray-600">Kategori</p>
            <p className="font-semibold text-blue-700 capitalize">
              {programData.kategori}
            </p>
          </div>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-2">
          <p className="text-xs text-yellow-800 text-center">
            🕒 Status: <span className="font-semibold">DRAFT</span> - Siap diajukan ke Kecamatan
          </p>
        </div>

        <div className="flex gap-2 pt-2">
          <button 
            onClick={() => {
              // Navigate to monitoring page
              window.location.href = '/admin-desa/monitoring';
              toast.dismiss(toastId);
            }}
            className="flex-1 px-3 py-2 bg-green-600 text-white text-xs font-medium rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-1"
          >
            <ExternalLink size={12} />
            Pantau Status
          </button>
          <button 
            onClick={() => toast.dismiss(toastId)}
            className="px-3 py-2 border border-gray-300 text-gray-700 text-xs font-medium rounded-lg hover:bg-gray-50 transition-colors"
          >
            Tutup
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="px-4 pb-3">
        <div className="w-full bg-gray-200 rounded-full h-1">
          <div 
            className="h-1 rounded-full bg-green-500 transition-all duration-3000"
            style={{ 
              width: '100%',
              animation: 'progress 3s ease-in-out'
            }}
          ></div>
        </div>
      </div>

      <style jsx>{`
        @keyframes progress {
          0% { width: 0%; }
          100% { width: 100%; }
        }
      `}</style>
    </div>
  );
};

export default SuccessToast;