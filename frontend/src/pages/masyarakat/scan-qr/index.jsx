import React, { useState, useRef, useEffect } from 'react';
import { 
  QrCode, 
  Camera, 
  RotateCcw, 
  Flashlight,
  FlashlightOff,
  CheckCircle,
  AlertCircle,
  Clock,
  Download,
  Share2,
  History,
  HelpCircle,
  User,
  MapPin,
  Calendar,
  DollarSign
} from 'lucide-react';

function MasyarakatScanQR() {
  const [scanning, setScanning] = useState(true);
  const [hasCamera, setHasCamera] = useState(true);
  const [flashOn, setFlashOn] = useState(false);
  const [scannedData, setScannedData] = useState(null);
  const [scanError, setScanError] = useState(null);
  const [scanHistory, setScanHistory] = useState([]);
  const [activeTab, setActiveTab] = useState('scanner');
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  // Sample scan history data
  const sampleHistory = [
    {
      id: 1,
      programName: "Bantuan Sembako 1000 KK",
      nominal: 200000,
      timestamp: "2024-03-20 14:30:25",
      status: "success",
      type: "qr_scan",
      recipientName: "Budi Santoso",
      location: "Posko RW 01"
    },
    {
      id: 2,
      programName: "Bantuan Tunai PKH",
      nominal: 600000,
      timestamp: "2024-03-18 10:15:42",
      status: "success",
      type: "qr_scan",
      recipientName: "Siti Aminah",
      location: "Bank Desa"
    },
    {
      id: 3,
      programName: "Bantuan UMKM Desa",
      nominal: 8000000,
      timestamp: "2024-03-15 09:45:18",
      status: "failed",
      type: "qr_scan",
      error: "QR code tidak valid"
    }
  ];

  useEffect(() => {
    initializeCamera();
    setScanHistory(sampleHistory);
    
    return () => {
      stopCamera();
    };
  }, []);

  const initializeCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: 'environment',
          width: { ideal: 1280 },
          height: { ideal: 720 }
        } 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
      }
      setHasCamera(true);
      setScanError(null);
    } catch (error) {
      console.error('Error accessing camera:', error);
      setHasCamera(false);
      setScanError('Tidak dapat mengakses kamera. Pastikan izin kamera telah diberikan.');
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }
  };

  const toggleFlash = () => {
    if (streamRef.current) {
      const track = streamRef.current.getVideoTracks()[0];
      const capabilities = track.getCapabilities();
      
      if (capabilities.torch) {
        track.applyConstraints({
          advanced: [{ torch: !flashOn }]
        });
        setFlashOn(!flashOn);
      }
    }
  };

  const handleScan = () => {
    setScanning(false);
    setScanError(null);
    
    setTimeout(() => {
      const success = Math.random() > 0.3;
      
      if (success) {
        const sampleData = {
          id: Math.random().toString(36).substr(2, 9),
          programName: "Bantuan Sembako 1000 KK",
          nominal: 200000,
          timestamp: new Date().toISOString(),
          recipientName: "Budi Santoso",
          recipientNIK: "1234567890123456",
          programId: "BANSOS-2024-001",
          location: "Posko RW 01 Desa Sukamaju",
          periode: "Maret 2024",
          penanggungJawab: "Bapak Surya (Ketua RW 01)"
        };
        
        setScannedData(sampleData);
        
        const newHistoryItem = {
          id: Date.now(),
          programName: sampleData.programName,
          nominal: sampleData.nominal,
          timestamp: new Date().toLocaleString('id-ID'),
          status: "success",
          type: "qr_scan",
          recipientName: sampleData.recipientName,
          location: sampleData.location
        };
        
        setScanHistory(prev => [newHistoryItem, ...prev]);
      } else {
        setScanError('QR code tidak valid atau sudah digunakan. Silakan coba lagi.');
        
        const newHistoryItem = {
          id: Date.now(),
          programName: "Unknown",
          nominal: 0,
          timestamp: new Date().toLocaleString('id-ID'),
          status: "failed",
          type: "qr_scan",
          error: "QR code tidak valid"
        };
        
        setScanHistory(prev => [newHistoryItem, ...prev]);
      }
    }, 1500);
  };

  const resetScanner = () => {
    setScanning(true);
    setScannedData(null);
    setScanError(null);
    initializeCamera();
  };

  const handleConfirm = () => {
    console.log('Confirmed:', scannedData);
    resetScanner();
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-10">
        <div className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Scan QR Code</h1>
              <p className="text-gray-600">Konfirmasi penerimaan bantuan dengan mudah</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg">
              <QrCode className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-gray-200/50 px-4">
          <button
            onClick={() => setActiveTab('scanner')}
            className={`flex items-center space-x-2 px-4 py-3 border-b-2 transition-all duration-300 ${
              activeTab === 'scanner'
                ? 'border-blue-500 text-blue-600 bg-blue-50/50'
                : 'border-transparent text-gray-600 hover:text-gray-800'
            }`}
          >
            <Camera className="w-4 h-4" />
            <span className="font-medium">Scanner</span>
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`flex items-center space-x-2 px-4 py-3 border-b-2 transition-all duration-300 ${
              activeTab === 'history'
                ? 'border-blue-500 text-blue-600 bg-blue-50/50'
                : 'border-transparent text-gray-600 hover:text-gray-800'
            }`}
          >
            <History className="w-4 h-4" />
            <span className="font-medium">Riwayat</span>
          </button>
          <button
            onClick={() => setActiveTab('help')}
            className={`flex items-center space-x-2 px-4 py-3 border-b-2 transition-all duration-300 ${
              activeTab === 'help'
                ? 'border-blue-500 text-blue-600 bg-blue-50/50'
                : 'border-transparent text-gray-600 hover:text-gray-800'
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            <span className="font-medium">Bantuan</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4">
        {/* Scanner Tab */}
        {activeTab === 'scanner' && (
          <div className="space-y-6">
            {/* Scanner Section */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200/50 overflow-hidden">
              {/* Scanner Header */}
              <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-4 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="font-semibold text-lg">Scanner QR Code</h2>
                    <p className="text-blue-100 text-sm">Arahkan kamera ke QR code bantuan</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    {flashOn ? (
                      <Flashlight className="w-5 h-5 text-yellow-300" />
                    ) : (
                      <FlashlightOff className="w-5 h-5 text-blue-200" />
                    )}
                  </div>
                </div>
              </div>

              {/* Camera View */}
              {scanning && hasCamera && (
                <div className="relative bg-gray-900">
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="w-full h-80 object-cover"
                  />
                  
                  {/* Scanner Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative">
                      <div className="w-64 h-64 border-2 border-white/80 rounded-2xl relative">
                        {/* Corner Borders */}
                        <div className="absolute -top-1 -left-1 w-8 h-8 border-t-2 border-l-2 border-white rounded-tl-lg"></div>
                        <div className="absolute -top-1 -right-1 w-8 h-8 border-t-2 border-r-2 border-white rounded-tr-lg"></div>
                        <div className="absolute -bottom-1 -left-1 w-8 h-8 border-b-2 border-l-2 border-white rounded-bl-lg"></div>
                        <div className="absolute -bottom-1 -right-1 w-8 h-8 border-b-2 border-r-2 border-white rounded-br-lg"></div>
                        
                        {/* Scanning Animation */}
                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent animate-pulse shadow-lg"></div>
                      </div>
                      
                      {/* Instructions */}
                      <div className="text-center mt-6">
                        <p className="text-white text-sm bg-black/50 backdrop-blur-sm rounded-full px-4 py-2 inline-block">
                          📍 Posisikan QR code dalam frame
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Scanner Controls */}
                  <div className="absolute bottom-6 left-0 right-0">
                    <div className="flex justify-center space-x-6">
                      <button
                        onClick={toggleFlash}
                        className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center hover:bg-white/30 transition-all duration-300 border border-white/30"
                      >
                        {flashOn ? (
                          <Flashlight className="w-6 h-6 text-yellow-300" />
                        ) : (
                          <FlashlightOff className="w-6 h-6 text-white" />
                        )}
                      </button>
                      
                      <button
                        onClick={handleScan}
                        className="w-20 h-20 bg-green-500 rounded-2xl flex items-center justify-center hover:bg-green-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 border-4 border-white"
                      >
                        <Camera className="w-8 h-8 text-white" />
                      </button>
                      
                      <button
                        onClick={resetScanner}
                        className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center hover:bg-white/30 transition-all duration-300 border border-white/30"
                      >
                        <RotateCcw className="w-6 h-6 text-white" />
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* No Camera Access */}
              {!hasCamera && (
                <div className="p-8 text-center">
                  <div className="w-20 h-20 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Camera className="w-10 h-10 text-red-500" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Kamera Tidak Dapat Diakses</h3>
                  <p className="text-gray-600 mb-6">
                    {scanError || 'Izinkan akses kamera untuk menggunakan scanner QR code'}
                  </p>
                  <button
                    onClick={initializeCamera}
                    className="bg-blue-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-600 transition-colors shadow-sm"
                  >
                    Coba Lagi
                  </button>
                </div>
              )}

              {/* Scan Result */}
              {scannedData && (
                <div className="p-6">
                  <ScanResult 
                    result={scannedData} 
                    onRescan={resetScanner}
                    onConfirm={handleConfirm}
                  />
                </div>
              )}

              {/* Scan Error */}
              {scanError && !scannedData && (
                <div className="p-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <AlertCircle className="w-8 h-8 text-red-500" />
                    </div>
                    <h3 className="text-xl font-bold text-red-600 mb-2">Scan Gagal</h3>
                    <p className="text-gray-600 mb-6">{scanError}</p>
                    <button
                      onClick={resetScanner}
                      className="bg-blue-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-600 transition-colors"
                    >
                      Coba Lagi
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-200/50">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Scan Berhasil</p>
                    <p className="text-2xl font-bold text-green-600">
                      {scanHistory.filter(s => s.status === 'success').length}
                    </p>
                  </div>
                  <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-200/50">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Scan</p>
                    <p className="text-2xl font-bold text-blue-600">{scanHistory.length}</p>
                  </div>
                  <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                    <History className="w-5 h-5 text-blue-500" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* History Tab */}
        {activeTab === 'history' && (
          <div className="space-y-6">
            {/* History Header */}
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-200/50">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="font-semibold text-gray-800">Riwayat Scan</h2>
                  <p className="text-gray-600 text-sm">Daftar konfirmasi bantuan yang telah di-scan</p>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
                    <Download className="w-5 h-5 text-gray-600" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
                    <Share2 className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
              </div>

              {/* Scan History List */}
              <div className="space-y-3">
                {scanHistory.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center space-x-4 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors group"
                  >
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      item.status === 'success' 
                        ? 'bg-green-100 text-green-600' 
                        : 'bg-red-100 text-red-600'
                    }`}>
                      {item.status === 'success' ? (
                        <CheckCircle className="w-6 h-6" />
                      ) : (
                        <AlertCircle className="w-6 h-6" />
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-1">
                        <h4 className="font-semibold text-gray-800 text-sm truncate">
                          {item.programName}
                        </h4>
                        <span className={`text-sm font-bold ${
                          item.status === 'success' ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {item.status === 'success' ? formatCurrency(item.nominal) : 'Gagal'}
                        </span>
                      </div>
                      
                      <div className="flex items-center space-x-4 text-xs text-gray-600">
                        <div className="flex items-center space-x-1">
                          <User className="w-3 h-3" />
                          <span>{item.recipientName || 'Unknown'}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MapPin className="w-3 h-3" />
                          <span>{item.location || 'Unknown'}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-3 h-3" />
                          <span>{item.timestamp}</span>
                        </div>
                      </div>
                      
                      {item.error && (
                        <p className="text-xs text-red-600 mt-1">{item.error}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {scanHistory.length === 0 && (
                <div className="text-center py-8">
                  <QrCode className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-500">Belum ada riwayat scan</p>
                  <p className="text-sm text-gray-400">Mulai scan QR code untuk melihat riwayat di sini</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Help Tab */}
        {activeTab === 'help' && (
          <div className="space-y-6">
            {/* Help Header */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200/50">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <HelpCircle className="w-8 h-8 text-blue-500" />
                </div>
                <h2 className="text-xl font-bold text-gray-800 mb-2">Panduan Scan QR Code</h2>
                <p className="text-gray-600">Ikuti langkah-langkah berikut untuk konfirmasi bantuan</p>
              </div>

              {/* Steps */}
              <div className="space-y-4">
                {[
                  {
                    step: 1,
                    title: "Siapkan QR Code",
                    description: "Pastikan QR code dari petugas dalam kondisi baik dan tidak rusak",
                    icon: "📄"
                  },
                  {
                    step: 2,
                    title: "Posisikan dengan Benar",
                    description: "Arahkan kamera ke QR code dan pastikan berada dalam frame scanner",
                    icon: "📱"
                  },
                  {
                    step: 3,
                    title: "Jaga Jarak Optimal",
                    description: "Pertahankan jarak 15-30 cm antara kamera dan QR code",
                    icon: "📏"
                  },
                  {
                    step: 4,
                    title: "Gunakan Flash jika Perlu",
                    description: "Aktifkan flash di kondisi pencahayaan kurang",
                    icon: "💡"
                  },
                  {
                    step: 5,
                    title: "Verifikasi Data",
                    description: "Periksa data yang muncul dan konfirmasi jika sudah benar",
                    icon: "✅"
                  }
                ].map((item, index) => (
                  <div key={item.step} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-xl">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold text-sm">{item.step}</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="text-2xl">{item.icon}</span>
                        <h3 className="font-semibold text-gray-800">{item.title}</h3>
                      </div>
                      <p className="text-gray-600 text-sm">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Troubleshooting */}
              <div className="mt-6 p-4 bg-orange-50 rounded-xl border border-orange-200">
                <h4 className="font-semibold text-orange-800 mb-2 flex items-center space-x-2">
                  <AlertCircle className="w-5 h-5" />
                  <span>Pemecahan Masalah</span>
                </h4>
                <div className="space-y-2 text-sm text-orange-700">
                  <p>• Pastikan izin kamera sudah diberikan</p>
                  <p>• Bersihkan lensa kamera jika buram</p>
                  <p>• Coba di tempat dengan pencahayaan cukup</p>
                  <p>• Restart aplikasi jika scanner bermasalah</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Scan Result Component
const ScanResult = ({ result, onRescan, onConfirm }) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200/50 p-6 space-y-6">
      {/* Success Header */}
      <div className="text-center">
        <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
          <CheckCircle className="w-8 h-8 text-green-500" />
        </div>
        <h3 className="text-xl font-bold text-green-600 mb-2">QR Code Terbaca!</h3>
        <p className="text-gray-600">Data berhasil diverifikasi sistem</p>
      </div>

      {/* Program Info Card */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-4 border border-green-200">
        <div className="flex items-center space-x-3 mb-3">
          <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
            <DollarSign className="w-6 h-6 text-white" />
          </div>
          <div>
            <h4 className="font-bold text-gray-800 text-lg">{result.programName}</h4>
            <p className="text-green-600 font-semibold">{formatCurrency(result.nominal)}</p>
          </div>
        </div>
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <User className="w-5 h-5 text-blue-500" />
            <div>
              <p className="text-sm text-gray-600">Penerima</p>
              <p className="font-semibold text-gray-800">{result.recipientName}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <MapPin className="w-5 h-5 text-purple-500" />
            <div>
              <p className="text-sm text-gray-600">Lokasi</p>
              <p className="font-semibold text-gray-800">{result.location}</p>
            </div>
          </div>
        </div>
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <Calendar className="w-5 h-5 text-orange-500" />
            <div>
              <p className="text-sm text-gray-600">Periode</p>
              <p className="font-semibold text-gray-800">{result.periode}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <User className="w-5 h-5 text-green-500" />
            <div>
              <p className="text-sm text-gray-600">Penanggung Jawab</p>
              <p className="font-semibold text-gray-800">{result.penanggungJawab}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Verification Status */}
      <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
        <div className="flex items-center space-x-3">
          <CheckCircle className="w-5 h-5 text-blue-500 flex-shrink-0" />
          <div>
            <p className="font-semibold text-blue-800">Data Terverifikasi</p>
            <p className="text-sm text-blue-700">Semua informasi telah diverifikasi dan valid</p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-3">
        <button
          onClick={onRescan}
          className="flex-1 border-2 border-gray-300 text-gray-700 py-4 px-6 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-300"
        >
          Scan Lagi
        </button>
        <button
          onClick={onConfirm}
          className="flex-1 bg-green-500 text-white py-4 px-6 rounded-xl font-semibold hover:bg-green-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center space-x-2"
        >
          <CheckCircle className="w-5 h-5" />
          <span>Konfirmasi</span>
        </button>
      </div>

      {/* Security Notice */}
      <div className="bg-yellow-50 rounded-xl p-4 border border-yellow-200">
        <div className="flex items-start space-x-3">
          <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-semibold text-yellow-800 text-sm">Penting!</p>
            <p className="text-yellow-700 text-sm">
              Pastikan data sesuai dengan bantuan yang diterima. Laporkan segera jika ada ketidaksesuaian.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MasyarakatScanQR;