import React, { useState } from 'react';
import { 
  X, 
  CheckCircle, 
  AlertCircle, 
  QrCode, 
  Smartphone, 
  Clock,
  DollarSign,
  Calendar,
  MapPin,
  Users,
  Package,
  BookOpen,
  Heart,
  TrendingUp,
  Camera,
  Send
} from 'lucide-react';

const KonfirmasiModal = ({ bansos, onClose, onConfirm }) => {
  const [konfirmasiMethod, setKonfirmasiMethod] = useState('qr');
  const [step, setStep] = useState('method'); // 'method', 'process', 'success'
  const [isProcessing, setIsProcessing] = useState(false);
  const [photo, setPhoto] = useState(null);

  const getIcon = (iconName) => {
    const icons = {
      Package: Package,
      DollarSign: DollarSign,
      BookOpen: BookOpen,
      Heart: Heart,
      TrendingUp: TrendingUp
    };
    return icons[iconName] || Package;
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const IconComponent = getIcon(bansos.icon);

  const handleConfirm = () => {
    setIsProcessing(true);
    
    // Simulate processing time
    setTimeout(() => {
      setIsProcessing(false);
      setStep('success');
    }, 2000);
  };

  const handleTakePhoto = () => {
    // Simulate photo taking
    setPhoto('https://images.unsplash.com/photo-1579113800032-c38bd7635818?w=400');
  };

  const renderMethodSelection = () => (
    <div className="space-y-6">
      {/* Program Info */}
      <div className="bg-orange-50 rounded-xl p-4 border border-orange-200">
        <div className="flex items-center space-x-3">
          <div className={`w-12 h-12 bg-gradient-to-br ${bansos.warna} rounded-xl flex items-center justify-center`}>
            <IconComponent className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-orange-800">{bansos.nama}</h3>
            <p className="text-sm text-orange-700">
              Nominal: <strong>{formatCurrency(bansos.nominal)}</strong>
            </p>
            <p className="text-xs text-orange-600 mt-1">{bansos.deskripsi}</p>
          </div>
        </div>
      </div>

      {/* Method Selection */}
      <div>
        <h4 className="font-semibold text-gray-800 mb-4">Pilih Metode Konfirmasi:</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* QR Code Method */}
          <button
            onClick={() => setKonfirmasiMethod('qr')}
            className={`p-4 border-2 rounded-xl transition-all duration-300 text-left ${
              konfirmasiMethod === 'qr'
                ? 'border-orange-500 bg-orange-50 shadow-md'
                : 'border-gray-200 hover:border-orange-300 hover:bg-orange-25'
            }`}
          >
            <div className="flex items-center space-x-3 mb-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                konfirmasiMethod === 'qr' ? 'bg-orange-500' : 'bg-gray-200'
              }`}>
                <QrCode className="w-5 h-5 text-white" />
              </div>
              <div>
                <h5 className={`font-semibold ${
                  konfirmasiMethod === 'qr' ? 'text-orange-700' : 'text-gray-700'
                }`}>
                  Scan QR Code
                </h5>
                <p className="text-xs text-gray-600">Cepat dan mudah</p>
              </div>
            </div>
            <p className="text-xs text-gray-600">
              Gunakan kamera smartphone untuk scan barcode yang diberikan petugas
            </p>
          </button>

          {/* SMS Method */}
          <button
            onClick={() => setKonfirmasiMethod('sms')}
            className={`p-4 border-2 rounded-xl transition-all duration-300 text-left ${
              konfirmasiMethod === 'sms'
                ? 'border-orange-500 bg-orange-50 shadow-md'
                : 'border-gray-200 hover:border-orange-300 hover:bg-orange-25'
            }`}
          >
            <div className="flex items-center space-x-3 mb-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                konfirmasiMethod === 'sms' ? 'bg-orange-500' : 'bg-gray-200'
              }`}>
                <Smartphone className="w-5 h-5 text-white" />
              </div>
              <div>
                <h5 className={`font-semibold ${
                  konfirmasiMethod === 'sms' ? 'text-orange-700' : 'text-gray-700'
                }`}>
                  Konfirmasi SMS
                </h5>
                <p className="text-xs text-gray-600">Via pesan singkat</p>
              </div>
            </div>
            <p className="text-xs text-gray-600">
              Kirim SMS dengan format khusus ke nomor yang ditentukan
            </p>
          </button>
        </div>
      </div>

      {/* Method Details */}
      {konfirmasiMethod === 'qr' && (
        <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
          <h5 className="font-semibold text-blue-800 mb-2 flex items-center space-x-2">
            <QrCode className="w-4 h-4" />
            <span>Cara Konfirmasi QR Code:</span>
          </h5>
          <ol className="text-sm text-blue-700 space-y-1 list-decimal list-inside">
            <li>Buka kamera smartphone Anda</li>
            <li>Arahkan ke QR code yang diberikan petugas</li>
            <li>Tunggu hingga ter-scan otomatis</li>
            <li>Konfirmasi data yang muncul</li>
          </ol>
        </div>
      )}

      {konfirmasiMethod === 'sms' && (
        <div className="bg-green-50 rounded-xl p-4 border border-green-200">
          <h5 className="font-semibold text-green-800 mb-2 flex items-center space-x-2">
            <Smartphone className="w-4 h-4" />
            <span>Cara Konfirmasi SMS:</span>
          </h5>
          <div className="text-sm text-green-700 space-y-2">
            <p>Kirim SMS ke <strong>0857-1234-5678</strong> dengan format:</p>
            <div className="bg-white p-3 rounded-lg border border-green-200">
              <code className="text-sm font-mono text-gray-800">
                KONFIRMASI {bansos.id} {bansos.nominal}
              </code>
            </div>
            <p className="text-xs">* Pastikan mengirim dari nomor yang terdaftar</p>
          </div>
        </div>
      )}

      {/* Program Details */}
      <div className="bg-gray-50 rounded-xl p-4">
        <h5 className="font-semibold text-gray-800 mb-3">Detail Penyaluran:</h5>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
          <div className="flex items-center space-x-2">
            <Calendar className="w-4 h-4 text-gray-500" />
            <span className="text-gray-600">Tanggal Distribusi:</span>
            <span className="font-medium text-gray-800">{bansos.tanggalDistribusi}</span>
          </div>
          <div className="flex items-center space-x-2">
            <MapPin className="w-4 h-4 text-gray-500" />
            <span className="text-gray-600">Lokasi:</span>
            <span className="font-medium text-gray-800">{bansos.lokasiPenyaluran}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Users className="w-4 h-4 text-gray-500" />
            <span className="text-gray-600">Penanggung Jawab:</span>
            <span className="font-medium text-gray-800">{bansos.penanggungJawab}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4 text-gray-500" />
            <span className="text-gray-600">Batas Konfirmasi:</span>
            <span className="font-medium text-orange-600">{bansos.batasKonfirmasi}</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderProcess = () => (
    <div className="space-y-6">
      {/* Processing Indicator */}
      <div className="text-center">
        <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
          {isProcessing ? (
            <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <CheckCircle className="w-8 h-8 text-orange-500" />
          )}
        </div>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          {isProcessing ? 'Memproses Konfirmasi...' : 'Siap Konfirmasi'}
        </h3>
        <p className="text-gray-600">
          {isProcessing 
            ? 'Tunggu sebentar, sistem sedang memverifikasi data Anda...'
            : 'Pastikan Anda telah menerima bantuan sebelum mengkonfirmasi'
          }
        </p>
      </div>

      {/* QR Code Scanner */}
      {konfirmasiMethod === 'qr' && !isProcessing && (
        <div className="text-center">
          <div className="bg-white p-6 rounded-xl border-2 border-dashed border-gray-300 inline-block mb-4">
            <div className="w-48 h-48 bg-gradient-to-br from-orange-100 to-orange-200 rounded-lg flex items-center justify-center relative">
              <QrCode className="w-16 h-16 text-orange-400" />
              <div className="absolute inset-0 border-2 border-orange-400 border-dashed rounded-lg animate-pulse"></div>
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            Arahkan kamera ke QR code yang diberikan petugas
          </p>
          
          {/* Manual Photo Upload */}
          <div className="bg-gray-50 rounded-xl p-4">
            <h5 className="font-semibold text-gray-800 mb-2">Atau Upload Bukti Foto</h5>
            <button
              onClick={handleTakePhoto}
              className="flex items-center justify-center space-x-2 w-full py-3 border-2 border-dashed border-gray-300 rounded-xl hover:border-orange-400 hover:bg-orange-25 transition-colors"
            >
              <Camera className="w-5 h-5 text-gray-500" />
              <span className="text-gray-700 font-medium">Ambil Foto Bukti Penerimaan</span>
            </button>
            
            {photo && (
              <div className="mt-3">
                <img 
                  src={photo} 
                  alt="Bukti penerimaan" 
                  className="w-32 h-32 object-cover rounded-lg mx-auto border border-gray-300"
                />
                <p className="text-xs text-green-600 text-center mt-2">
                  ✓ Foto berhasil diambil
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* SMS Confirmation */}
      {konfirmasiMethod === 'sms' && !isProcessing && (
        <div className="bg-gray-50 rounded-xl p-4">
          <h5 className="font-semibold text-gray-800 mb-3">Konfirmasi via SMS</h5>
          <div className="space-y-3">
            <div className="bg-white p-3 rounded-lg border border-gray-200">
              <p className="text-sm text-gray-600 mb-1">Format SMS:</p>
              <code className="text-lg font-mono text-gray-800 bg-yellow-50 px-2 py-1 rounded">
                KONFIRMASI {bansos.id} {bansos.nominal}
              </code>
            </div>
            <div className="bg-white p-3 rounded-lg border border-gray-200">
              <p className="text-sm text-gray-600 mb-1">Kirim ke:</p>
              <p className="text-lg font-semibold text-gray-800">0857-1234-5678</p>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <AlertCircle className="w-4 h-4 text-orange-500" />
              <span>Pastikan mengirim dari nomor yang terdaftar</span>
            </div>
          </div>
        </div>
      )}

      {/* Verification Info */}
      <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
        <h5 className="font-semibold text-blue-800 mb-2 flex items-center space-x-2">
          <CheckCircle className="w-4 h-4" />
          <span>Data yang Akan Diverifikasi:</span>
        </h5>
        <ul className="text-sm text-blue-700 space-y-1 list-disc list-inside">
          <li>Nomor induk kependudukan (NIK)</li>
          <li>Nomor telepon yang terdaftar</li>
          <li>Kesesuaian nominal bantuan</li>
          <li>Waktu penerimaan bantuan</li>
        </ul>
      </div>
    </div>
  );

  const renderSuccess = () => (
    <div className="text-center space-y-6">
      {/* Success Icon */}
      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
        <CheckCircle className="w-10 h-10 text-green-500" />
      </div>

      {/* Success Message */}
      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Konfirmasi Berhasil!</h3>
        <p className="text-gray-600 mb-4">
          Terima kasih telah mengkonfirmasi penerimaan bantuan {bansos.nama}.
        </p>
        <div className="bg-green-50 rounded-xl p-4 border border-green-200 inline-block">
          <p className="text-sm text-green-800">
            <strong>{formatCurrency(bansos.nominal)}</strong> telah tercatat sebagai diterima
          </p>
        </div>
      </div>

      {/* Receipt Info */}
      <div className="bg-gray-50 rounded-xl p-4 text-left">
        <h5 className="font-semibold text-gray-800 mb-3">Rincian Konfirmasi:</h5>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Program:</span>
            <span className="font-medium text-gray-800">{bansos.nama}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Nominal:</span>
            <span className="font-medium text-green-600">{formatCurrency(bansos.nominal)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Waktu Konfirmasi:</span>
            <span className="font-medium text-gray-800">
              {new Date().toLocaleString('id-ID')}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Metode:</span>
            <span className="font-medium text-gray-800">
              {konfirmasiMethod === 'qr' ? 'QR Code' : 'SMS'}
            </span>
          </div>
        </div>
      </div>

      {/* Next Steps */}
      <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
        <h5 className="font-semibold text-blue-800 mb-2">Langkah Selanjutnya:</h5>
        <ul className="text-sm text-blue-700 space-y-1 list-disc list-inside">
          <li>Simpan bukti konfirmasi ini</li>
          <li>Pantau program bantuan lainnya di dashboard</li>
          <li>Laporkan jika ada ketidaksesuaian</li>
        </ul>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (step) {
      case 'method':
        return renderMethodSelection();
      case 'process':
        return renderProcess();
      case 'success':
        return renderSuccess();
      default:
        return renderMethodSelection();
    }
  };

  const renderActions = () => {
    switch (step) {
      case 'method':
        return (
          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className="flex-1 border border-gray-300 text-gray-700 py-3 px-6 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
            >
              Batal
            </button>
            <button
              onClick={() => setStep('process')}
              className="flex-1 bg-orange-500 text-white py-3 px-6 rounded-xl font-semibold hover:bg-orange-600 transition-colors flex items-center justify-center space-x-2"
            >
              <CheckCircle className="w-5 h-5" />
              <span>Lanjutkan</span>
            </button>
          </div>
        );
      case 'process':
        return (
          <div className="flex space-x-3">
            <button
              onClick={() => setStep('method')}
              className="flex-1 border border-gray-300 text-gray-700 py-3 px-6 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
            >
              Kembali
            </button>
            <button
              onClick={handleConfirm}
              disabled={isProcessing}
              className="flex-1 bg-orange-500 text-white py-3 px-6 rounded-xl font-semibold hover:bg-orange-600 transition-colors flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isProcessing ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Memproses...</span>
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  <span>Konfirmasi Sekarang</span>
                </>
              )}
            </button>
          </div>
        );
      case 'success':
        return (
          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className="flex-1 border border-gray-300 text-gray-700 py-3 px-6 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
            >
              Tutup
            </button>
            <button
              onClick={() => {
                onConfirm();
                onClose();
              }}
              className="flex-1 bg-green-500 text-white py-3 px-6 rounded-xl font-semibold hover:bg-green-600 transition-colors"
            >
              Lihat Dashboard
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/20 backdrop-blur-xs">
      <div 
        className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 rounded-t-2xl p-6">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl font-bold text-gray-900">
              {step === 'method' && 'Konfirmasi Penerimaan'}
              {step === 'process' && 'Proses Konfirmasi'}
              {step === 'success' && 'Konfirmasi Berhasil'}
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
            >
              <X className="w-6 h-6 text-gray-600" />
            </button>
          </div>
          
          {/* Progress Steps */}
          <div className="flex items-center justify-between">
            {['method', 'process', 'success'].map((s, index) => (
              <div key={s} className="flex items-center flex-1">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                  step === s 
                    ? 'bg-orange-500 text-white' 
                    : step === 'success' && s === 'success'
                    ? 'bg-green-500 text-white'
                    : index < ['method', 'process', 'success'].indexOf(step)
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-200 text-gray-500'
                }`}>
                  {index + 1}
                </div>
                {index < 2 && (
                  <div className={`flex-1 h-1 ${
                    index < ['method', 'process', 'success'].indexOf(step) 
                      ? 'bg-green-500' 
                      : 'bg-gray-200'
                  }`}></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {renderContent()}
        </div>

        {/* Action Buttons */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 rounded-b-2xl p-4">
          {renderActions()}
        </div>
      </div>
    </div>
  );
};

export default KonfirmasiModal;