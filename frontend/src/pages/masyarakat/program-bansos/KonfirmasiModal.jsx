import React, { useState } from 'react';
import { X, CheckCircle, AlertCircle, QrCode, Smartphone } from 'lucide-react';

const KonfirmasiModal = ({ bansos, onClose, onConfirm }) => {
  const [konfirmasiMethod, setKonfirmasiMethod] = useState('qr'); // 'qr' or 'sms'
  const [isConfirmed, setIsConfirmed] = useState(false);

  const handleConfirm = () => {
    // Simulate confirmation process
    setIsConfirmed(true);
    setTimeout(() => {
      onConfirm();
    }, 2000);
  };

  if (isConfirmed) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
        <div className="bg-white rounded-2xl max-w-md w-full p-6 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Konfirmasi Berhasil!</h3>
          <p className="text-gray-600 mb-4">
            Terima kasih telah mengkonfirmasi penerimaan bantuan {bansos.nama}.
          </p>
          <button
            onClick={onClose}
            className="w-full bg-green-500 text-white py-3 px-6 rounded-xl font-semibold hover:bg-green-600 transition-colors"
          >
            Tutup
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="bg-white rounded-2xl max-w-md w-full">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">Konfirmasi Penerimaan</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
            >
              <X className="w-6 h-6 text-gray-600" />
            </button>
          </div>
          <p className="text-gray-600 mt-2">
            Konfirmasi bahwa Anda telah menerima bantuan:
          </p>
          <div className="mt-3 p-3 bg-orange-50 rounded-xl border border-orange-200">
            <h3 className="font-semibold text-orange-800">{bansos.nama}</h3>
            <p className="text-sm text-orange-700">
              Nominal: <strong>Rp {bansos.nominal.toLocaleString('id-ID')}</strong>
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Method Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Pilih Metode Konfirmasi:
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setKonfirmasiMethod('qr')}
                className={`p-4 border-2 rounded-xl transition-all duration-300 ${
                  konfirmasiMethod === 'qr'
                    ? 'border-orange-500 bg-orange-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <QrCode className={`w-8 h-8 mx-auto mb-2 ${
                  konfirmasiMethod === 'qr' ? 'text-orange-500' : 'text-gray-400'
                }`} />
                <span className={`text-sm font-medium ${
                  konfirmasiMethod === 'qr' ? 'text-orange-700' : 'text-gray-600'
                }`}>
                  Scan QR Code
                </span>
              </button>
              <button
                onClick={() => setKonfirmasiMethod('sms')}
                className={`p-4 border-2 rounded-xl transition-all duration-300 ${
                  konfirmasiMethod === 'sms'
                    ? 'border-orange-500 bg-orange-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <Smartphone className={`w-8 h-8 mx-auto mb-2 ${
                  konfirmasiMethod === 'sms' ? 'text-orange-500' : 'text-gray-400'
                }`} />
                <span className={`text-sm font-medium ${
                  konfirmasiMethod === 'sms' ? 'text-orange-700' : 'text-gray-600'
                }`}>
                  Konfirmasi SMS
                </span>
              </button>
            </div>
          </div>

          {/* QR Code Method */}
          {konfirmasiMethod === 'qr' && (
            <div className="text-center mb-6">
              <div className="bg-white p-4 rounded-xl border-2 border-dashed border-gray-300 inline-block mb-4">
                {/* Placeholder QR Code */}
                <div className="w-48 h-48 bg-gradient-to-br from-orange-100 to-orange-200 rounded-lg flex items-center justify-center">
                  <QrCode className="w-16 h-16 text-orange-400" />
                </div>
              </div>
              <p className="text-sm text-gray-600">
                Scan QR code di atas dengan kamera smartphone Anda
              </p>
            </div>
          )}

          {/* SMS Method */}
          {konfirmasiMethod === 'sms' && (
            <div className="mb-6">
              <div className="bg-gray-50 rounded-xl p-4 mb-4">
                <p className="text-sm text-gray-600 mb-2">
                  Kirim SMS dengan format berikut ke <strong>0857-1234-5678</strong>:
                </p>
                <div className="bg-white p-3 rounded-lg border border-gray-200">
                  <code className="text-sm font-mono text-gray-800">
                    KONFIRMASI {bansos.id} {bansos.nominal}
                  </code>
                </div>
              </div>
              <p className="text-xs text-gray-500">
                * Pastikan mengirim dari nomor yang terdaftar
              </p>
            </div>
          )}

          {/* Warning */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6">
            <div className="flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-medium text-yellow-800 text-sm mb-1">
                  Penting!
                </h4>
                <p className="text-yellow-700 text-sm">
                  Hanya konfirmasi jika Anda benar-benar telah menerima bantuan.
                  Konfirmasi palsu dapat dikenai sanksi.
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className="flex-1 border border-gray-300 text-gray-700 py-3 px-6 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
            >
              Batal
            </button>
            <button
              onClick={handleConfirm}
              className="flex-1 bg-orange-500 text-white py-3 px-6 rounded-xl font-semibold hover:bg-orange-600 transition-colors flex items-center justify-center space-x-2"
            >
              <CheckCircle className="w-5 h-5" />
              <span>Konfirmasi</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KonfirmasiModal;