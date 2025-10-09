import React, { useState } from 'react';
import { X, Truck, Calendar, MapPin, User, CheckCircle, Camera, QrCode } from 'lucide-react';

const DistribusiModal = ({ penerima, onClose }) => {
  const [distribusiData, setDistribusiData] = useState({
    tanggalDistribusi: new Date().toISOString().split('T')[0],
    lokasi: 'Balai Desa',
    metode: 'langsung',
    penanggungJawab: 'Admin Desa',
    catatan: '',
    buktiFoto: null,
    buktiQr: null
  });

  const handleInputChange = (field, value) => {
    setDistribusiData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle distribusi submission
    console.log('Data distribusi:', distribusiData);
    onClose();
  };

  const handleTakePhoto = () => {
    // Implement photo capture functionality
    console.log('Take photo');
  };

  const handleScanQR = () => {
    // Implement QR scan functionality
    console.log('Scan QR');
  };

  return (
    <div className="fixed inset-0 h-[50%] bg-black/20 backdrop-blur-xs flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl w-full max-w-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <Truck className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Proses Distribusi</h2>
              <p className="text-gray-600">Untuk {penerima.nama}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="p-6 space-y-6">
            {/* Penerima Info */}
            <div className="bg-gray-50 rounded-xl p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">{penerima.nama}</h4>
                  <p className="text-sm text-gray-500">{penerima.nik}</p>
                  <p className="text-sm text-gray-500">{penerima.dusun}, RT {penerima.rt}/RW {penerima.rw}</p>
                </div>
              </div>
            </div>

            {/* Distribusi Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tanggal Distribusi
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="date"
                    value={distribusiData.tanggalDistribusi}
                    onChange={(e) => handleInputChange('tanggalDistribusi', e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Metode Distribusi
                </label>
                <select
                  value={distribusiData.metode}
                  onChange={(e) => handleInputChange('metode', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                >
                  <option value="langsung">Langsung</option>
                  <option value="transfer">Transfer Bank</option>
                  <option value="kurir">Kurir</option>
                  <option value="pos">Pos</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Lokasi Distribusi
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    value={distribusiData.lokasi}
                    onChange={(e) => handleInputChange('lokasi', e.target.value)}
                    placeholder="Masukkan lokasi distribusi..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  />
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Penanggung Jawab
                </label>
                <input
                  type="text"
                  value={distribusiData.penanggungJawab}
                  onChange={(e) => handleInputChange('penanggungJawab', e.target.value)}
                  placeholder="Nama penanggung jawab..."
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>
            </div>

            {/* Bukti Distribusi */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Bukti Distribusi</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={handleTakePhoto}
                  className="p-4 border-2 border-dashed border-gray-300 rounded-xl hover:border-green-500 hover:bg-green-50 transition-colors flex flex-col items-center justify-center"
                >
                  <Camera className="w-8 h-8 text-gray-400 mb-2" />
                  <span className="text-sm font-medium text-gray-700">Ambil Foto</span>
                  <span className="text-xs text-gray-500 mt-1">Bukti serah terima</span>
                </button>

                <button
                  type="button"
                  onClick={handleScanQR}
                  className="p-4 border-2 border-dashed border-gray-300 rounded-xl hover:border-green-500 hover:bg-green-50 transition-colors flex flex-col items-center justify-center"
                >
                  <QrCode className="w-8 h-8 text-gray-400 mb-2" />
                  <span className="text-sm font-medium text-gray-700">Scan QR Code</span>
                  <span className="text-xs text-gray-500 mt-1">Konfirmasi penerima</span>
                </button>
              </div>
            </div>

            {/* Catatan */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Catatan Distribusi
              </label>
              <textarea
                value={distribusiData.catatan}
                onChange={(e) => handleInputChange('catatan', e.target.value)}
                placeholder="Tambahkan catatan mengenai proses distribusi..."
                rows="3"
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
              />
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-end p-6 border-t border-gray-200 bg-gray-50 space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors flex items-center gap-2"
            >
              <CheckCircle size={16} />
              Konfirmasi Distribusi
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DistribusiModal;