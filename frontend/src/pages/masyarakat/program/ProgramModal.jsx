import React from 'react';
import { 
  X, 
  Heart, 
  Wrench, 
  Building, 
  Users, 
  TrendingUp, 
  DollarSign,
  Star,
  MapPin,
  Calendar,
  User,
  Clock,
  CheckCircle,
  AlertCircle,
  Image
} from 'lucide-react';

const ProgramModal = ({ program, onClose }) => {
  const getIcon = (iconName) => {
    const icons = {
      Heart: Heart,
      Wrench: Wrench,
      Building: Building,
      Users: Users,
      TrendingUp: TrendingUp,
      DollarSign: DollarSign
    };
    return icons[iconName] || Heart;
  };

  const IconComponent = getIcon(program.icon);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const getStatusColor = (status) => {
    const colors = {
      'akan datang': 'bg-blue-100 text-blue-700 border-blue-200',
      'berjalan': 'bg-green-100 text-green-700 border-green-200',
      'hampir selesai': 'bg-orange-100 text-orange-700 border-orange-200',
      'selesai': 'bg-gray-100 text-gray-700 border-gray-200'
    };
    return colors[status] || 'bg-gray-100 text-gray-700 border-gray-200';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/20 backdrop-blur-xs">
      <div 
        className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 rounded-t-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className={`w-12 h-12 bg-gradient-to-br ${program.warna} rounded-xl flex items-center justify-center`}>
                <IconComponent className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">{program.nama}</h2>
                <p className="text-gray-600">{program.deskripsi}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
            >
              <X className="w-6 h-6 text-gray-600" />
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            <span className={`px-3 py-1 text-sm font-medium rounded-full border ${getStatusColor(program.status)}`}>
              {program.status}
            </span>
            {program.konfirmasiDibutuhkan && (
              <span className="px-3 py-1 bg-orange-100 text-orange-700 text-sm font-medium rounded-full border border-orange-200">
                <AlertCircle className="w-4 h-4 inline mr-1" />
                Perlu Konfirmasi
              </span>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Progress Section */}
          <div className="bg-gray-50 rounded-xl p-4">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-semibold text-gray-800">Progress Pelaksanaan</h3>
              <span className="text-2xl font-bold text-gray-900">{program.progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="h-3 rounded-full transition-all duration-500"
                style={{ 
                  width: `${program.progress}%`,
                  background: `linear-gradient(to right, ${program.warna.replace('from-', '').replace('to-', '').split(' ')[0]}, ${program.warna.replace('from-', '').replace('to-', '').split(' ')[1]})`
                }}
              ></div>
            </div>
          </div>

          {/* Grid Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Informasi Program */}
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-800 flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>Informasi Program</span>
              </h3>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <User className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">Penanggung Jawab</p>
                    <p className="font-medium text-gray-800">{program.penanggungJawab}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">Lokasi</p>
                    <p className="font-medium text-gray-800">{program.lokasi}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Calendar className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">Periode</p>
                    <p className="font-medium text-gray-800">
                      {program.tanggalMulai} - {program.tanggalSelesai}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Users className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">Penerima Manfaat</p>
                    <p className="font-medium text-gray-800">{program.penerimaManfaat} orang</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Anggaran & Rating */}
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-800 flex items-center space-x-2">
                <DollarSign className="w-5 h-5 text-green-500" />
                <span>Anggaran & Penilaian</span>
              </h3>

              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Anggaran</p>
                  <p className="font-bold text-lg text-gray-800">{formatCurrency(program.anggaran)}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-600 mb-1">Realisasi</p>
                  <p className="font-semibold text-gray-800">{formatCurrency(program.realisasi)}</p>
                  <p className="text-xs text-gray-600">
                    ({Math.round((program.realisasi / program.anggaran) * 100)}% terealisasi)
                  </p>
                </div>

                {program.rating > 0 && (
                  <div className="flex items-center space-x-3">
                    <Star className="w-5 h-5 text-yellow-400" />
                    <div>
                      <p className="text-sm text-gray-600">Rating Program</p>
                      <div className="flex items-center space-x-2">
                        <span className="font-semibold text-gray-800">{program.rating}</span>
                        <span className="text-sm text-gray-600">({program.totalRating} penilaian)</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Dokumentasi */}
          {program.dokumentasi.length > 0 && (
            <div>
              <h3 className="font-semibold text-gray-800 mb-4 flex items-center space-x-2">
                <Image className="w-5 h-5 text-blue-500" />
                <span>Dokumentasi Pelaksanaan</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {program.dokumentasi.map((doc, index) => (
                  <div key={index} className="rounded-xl overflow-hidden">
                    <img 
                      src={doc} 
                      alt={`Dokumentasi ${program.nama} ${index + 1}`}
                      className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            {program.konfirmasiDibutuhkan && (
              <button className="flex-1 bg-orange-500 text-white py-3 px-6 rounded-xl font-semibold hover:bg-orange-600 transition-colors flex items-center justify-center space-x-2">
                <CheckCircle className="w-5 h-5" />
                <span>Konfirmasi Penerimaan</span>
              </button>
            )}
            <button className="flex-1 bg-blue-500 text-white py-3 px-6 rounded-xl font-semibold hover:bg-blue-600 transition-colors flex items-center justify-center space-x-2">
              <Star className="w-5 h-5" />
              <span>Beri Rating Program</span>
            </button>
            <button className="flex-1 border border-gray-300 text-gray-700 py-3 px-6 rounded-xl font-semibold hover:bg-gray-50 transition-colors">
              Laporkan Masalah
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgramModal;