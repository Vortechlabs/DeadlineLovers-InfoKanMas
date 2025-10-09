import React from 'react';
import { CheckCircle, AlertCircle, X, Download, Share2 } from 'lucide-react';

const ScanResult = ({ result, error, onRescan, onConfirm }) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  if (error) {
    return (
      <div className="bg-white rounded-2xl p-6 text-gray-800 shadow-lg">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <AlertCircle className="w-8 h-8 text-red-500" />
          </div>
          <h3 className="text-xl font-bold text-red-600 mb-2">Scan Gagal</h3>
          <p className="text-gray-600">{error}</p>
        </div>

        <div className="flex space-x-3">
          <button
            onClick={onRescan}
            className="flex-1 bg-blue-500 text-white py-3 px-4 rounded-xl font-semibold hover:bg-blue-600 transition-colors"
          >
            Coba Lagi
          </button>
        </div>
      </div>
    );
  }

  if (!result) return null;

  return (
    <div className="bg-white rounded-2xl p-6 text-gray-800 shadow-lg">
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
          <CheckCircle className="w-8 h-8 text-green-500" />
        </div>
        <h3 className="text-xl font-bold text-green-600 mb-2">QR Code Terbaca!</h3>
        <p className="text-gray-600">Data berhasil diverifikasi sistem</p>
      </div>

      {/* Scanned Data */}
      <div className="space-y-4 mb-6">
        <div className="bg-gray-50 rounded-xl p-4">
          <h4 className="font-semibold text-gray-800 mb-3 flex items-center justify-between">
            <span>Detail Bantuan</span>
            <div className="flex space-x-2">
              <button className="p-1 hover:bg-gray-200 rounded transition-colors">
                <Download className="w-4 h-4 text-gray-600" />
              </button>
              <button className="p-1 hover:bg-gray-200 rounded transition-colors">
                <Share2 className="w-4 h-4 text-gray-600" />
              </button>
            </div>
          </h4>
          
          <div className="space-y-3 text-sm">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <p className="text-gray-600 text-xs">Program</p>
                <p className="font-medium text-gray-800">{result.programName}</p>
              </div>
              <div>
                <p className="text-gray-600 text-xs">Nominal</p>
                <p className="font-semibold text-green-600">
                  {formatCurrency(result.nominal)}
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              <div>
                <p className="text-gray-600 text-xs">Penerima</p>
                <p className="font-medium text-gray-800">{result.recipientName}</p>
              </div>
              <div>
                <p className="text-gray-600 text-xs">NIK</p>
                <p className="font-medium text-gray-800">{result.recipientNIK}</p>
              </div>
            </div>
            
            <div>
              <p className="text-gray-600 text-xs">Lokasi Penyaluran</p>
              <p className="font-medium text-gray-800">{result.location}</p>
            </div>
            
            <div>
              <p className="text-gray-600 text-xs">Waktu Scan</p>
              <p className="font-medium text-gray-800">
                {new Date(result.timestamp).toLocaleString('id-ID')}
              </p>
            </div>
          </div>
        </div>

        {/* Verification Status */}
        <div className="bg-green-50 rounded-xl p-3 border border-green-200">
          <div className="flex items-center space-x-2">
            <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-green-800">Data Terverifikasi</p>
              <p className="text-xs text-green-700">
                Semua informasi telah diverifikasi dan valid
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-3">
        <button
          onClick={onRescan}
          className="flex-1 border border-gray-300 text-gray-700 py-3 px-4 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
        >
          Scan Lagi
        </button>
        <button
          onClick={onConfirm}
          className="flex-1 bg-green-500 text-white py-3 px-4 rounded-xl font-semibold hover:bg-green-600 transition-colors flex items-center justify-center space-x-2"
        >
          <CheckCircle className="w-5 h-5" />
          <span>Konfirmasi</span>
        </button>
      </div>

      {/* Security Notice */}
      <div className="mt-4 p-3 bg-yellow-50 rounded-xl border border-yellow-200">
        <div className="flex items-start space-x-2">
          <AlertCircle className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm font-medium text-yellow-800">Keamanan Data</p>
            <p className="text-xs text-yellow-700">
              Pastikan data di atas sesuai dengan yang Anda terima. Laporkan segera jika ada ketidaksesuaian.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScanResult;