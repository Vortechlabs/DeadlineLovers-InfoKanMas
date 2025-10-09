import React, { useState } from 'react';
import { 
  X, 
  Building, 
  Lightbulb, 
  Sprout,
  MapPin,
  Calendar,
  Users,
  DollarSign,
  Clock,
  CheckCircle,
  AlertCircle,
  Star,
  Image,
  Download,
  Share2,
  ThumbsUp,
  ThumbsDown,
  MessageCircle,
  Droplet,
  BrickWall,
  TrafficCone
} from 'lucide-react';

const InfrastrukturModal = ({ project, onClose }) => {
  const [activeTab, setActiveTab] = useState('info');
  const [selectedImage, setSelectedImage] = useState(null);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const getIcon = (iconName) => {
    const icons = {
      Road: TrafficCone,
      Bridge: BrickWall,
      Building: Building,
      Water: Droplet,
      Lightbulb: Lightbulb,
      Sprout: Sprout
    };
    return icons[iconName] || Building;
  };

  const getStatusColor = (status) => {
    const colors = {
      'akan_datang': 'bg-blue-100 text-blue-700 border-blue-200',
      'berjalan': 'bg-green-100 text-green-700 border-green-200',
      'hampir_selesai': 'bg-orange-100 text-orange-700 border-orange-200',
      'selesai': 'bg-gray-100 text-gray-700 border-gray-200'
    };
    return colors[status] || 'bg-gray-100 text-gray-700';
  };

  const getStatusIcon = (status) => {
    const icons = {
      'akan_datang': Clock,
      'berjalan': Clock,
      'hampir_selesai': CheckCircle,
      'selesai': CheckCircle
    };
    return icons[status] || Clock;
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const IconComponent = getIcon(project.icon);
  const StatusIcon = getStatusIcon(project.status);

  const tabs = [
    { id: 'info', label: 'Informasi', icon: Image },
    { id: 'progress', label: 'Progress', icon: Clock },
    { id: 'dokumentasi', label: 'Dokumentasi', icon: Image },
    { id: 'rating', label: 'Penilaian', icon: Star }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'info':
        return (
          <div className="space-y-6">
            {/* Informasi Umum */}
            <div>
              <h4 className="font-semibold text-gray-800 mb-3 flex items-center space-x-2">
                <Image className="w-5 h-5 text-blue-500" />
                <span>Informasi Umum</span>
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-600">Lokasi</p>
                      <p className="font-medium text-gray-800">{project.lokasi}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Calendar className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-600">Periode</p>
                      <p className="font-medium text-gray-800">
                        {project.tanggalMulai} - {project.tanggalSelesai}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Users className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-600">Penanggung Jawab</p>
                      <p className="font-medium text-gray-800">{project.penanggungJawab}</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <DollarSign className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-600">Kontraktor</p>
                      <p className="font-medium text-gray-800">{project.kontraktor}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Users className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-600">Dampak</p>
                      <p className="font-medium text-gray-800">{project.dampak}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Spesifikasi Teknis */}
            <div>
              <h4 className="font-semibold text-gray-800 mb-3">Spesifikasi Teknis</h4>
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {project.panjang && (
                    <div className="text-center">
                      <p className="text-sm text-gray-600">Panjang</p>
                      <p className="font-semibold text-gray-800">{project.panjang}</p>
                    </div>
                  )}
                  {project.lebar && (
                    <div className="text-center">
                      <p className="text-sm text-gray-600">Lebar</p>
                      <p className="font-semibold text-gray-800">{project.lebar}</p>
                    </div>
                  )}
                  {project.luas && (
                    <div className="text-center">
                      <p className="text-sm text-gray-600">Luas</p>
                      <p className="font-semibold text-gray-800">{project.luas}</p>
                    </div>
                  )}
                  {project.diameter && (
                    <div className="text-center">
                      <p className="text-sm text-gray-600">Diameter</p>
                      <p className="font-semibold text-gray-800">{project.diameter}</p>
                    </div>
                  )}
                  {project.jumlah && (
                    <div className="text-center">
                      <p className="text-sm text-gray-600">Jumlah</p>
                      <p className="font-semibold text-gray-800">{project.jumlah}</p>
                    </div>
                  )}
                  {project.material && (
                    <div className="text-center">
                      <p className="text-sm text-gray-600">Material</p>
                      <p className="font-semibold text-gray-800">{project.material}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Anggaran */}
            <div>
              <h4 className="font-semibold text-gray-800 mb-3">Anggaran</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-green-50 rounded-xl">
                  <p className="text-sm text-gray-600">Anggaran</p>
                  <p className="text-lg font-bold text-green-600">
                    {formatCurrency(project.anggaran)}
                  </p>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-xl">
                  <p className="text-sm text-gray-600">Realisasi</p>
                  <p className="text-lg font-bold text-blue-600">
                    {formatCurrency(project.realisasi)}
                  </p>
                  <p className="text-xs text-gray-600">
                    ({Math.round((project.realisasi / project.anggaran) * 100)}% terealisasi)
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'progress':
        return (
          <div className="space-y-6">
            {/* Progress Utama */}
            <div className="bg-gray-50 rounded-xl p-4">
              <div className="flex justify-between items-center mb-3">
                <h4 className="font-semibold text-gray-800">Progress Pengerjaan</h4>
                <span className="text-2xl font-bold text-gray-900">{project.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="h-3 rounded-full transition-all duration-500 bg-gradient-to-r from-blue-500 to-cyan-500"
                  style={{ width: `${project.progress}%` }}
                ></div>
              </div>
            </div>

            {/* Timeline */}
            <div>
              <h4 className="font-semibold text-gray-800 mb-3">Timeline</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-xl">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="font-medium text-gray-800">Mulai Pengerjaan</span>
                  </div>
                  <span className="text-sm text-gray-600">{project.tanggalMulai}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-xl">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${
                      project.progress >= 100 ? 'bg-green-500' : 'bg-orange-500'
                    }`}></div>
                    <span className="font-medium text-gray-800">Target Selesai</span>
                  </div>
                  <span className="text-sm text-gray-600">{project.tanggalSelesai}</span>
                </div>
              </div>
            </div>

            {/* Masalah/Pencapaian */}
            {project.masalah.length > 0 && (
              <div>
                <h4 className="font-semibold text-gray-800 mb-3 flex items-center space-x-2">
                  <AlertCircle className="w-5 h-5 text-orange-500" />
                  <span>Update Terkini</span>
                </h4>
                <div className="space-y-2">
                  {project.masalah.map((masalah, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 bg-orange-50 rounded-xl border border-orange-200">
                      <AlertCircle className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-orange-800">{masalah}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );

      case 'dokumentasi':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold text-gray-800">Dokumentasi Proyek</h4>
              <div className="flex items-center space-x-2">
                <button className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
                  <Download className="w-4 h-4 text-gray-600" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
                  <Share2 className="w-4 h-4 text-gray-600" />
                </button>
              </div>
            </div>

            {project.dokumentasi.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {project.dokumentasi.map((doc, index) => (
                  <div 
                    key={index} 
                    className="rounded-xl overflow-hidden cursor-pointer group"
                    onClick={() => setSelectedImage(doc)}
                  >
                    <img 
                      src={doc} 
                      alt={`Dokumentasi ${project.nama} ${index + 1}`}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="p-2 bg-black bg-opacity-50 text-white text-xs text-center">
                      Progress {Math.round((index + 1) / project.dokumentasi.length * 100)}%
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Image className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-600">Belum ada dokumentasi</p>
                <p className="text-sm text-gray-500">Dokumentasi akan diupload selama pengerjaan proyek</p>
              </div>
            )}
          </div>
        );

      case 'rating':
        return (
          <div className="space-y-6">
            {/* Current Rating */}
            <div className="text-center">
              <h4 className="font-semibold text-gray-800 mb-2">Rating Proyek</h4>
              <div className="flex items-center justify-center space-x-1 mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-8 h-8 ${
                      star <= (project.rating || 0)
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <p className="text-gray-600">
                {project.rating > 0 ? `${project.rating}/5 • ${project.totalRating} penilaian` : 'Belum ada rating'}
              </p>
            </div>

            {/* Your Rating */}
            <div>
              <h4 className="font-semibold text-gray-800 mb-3">Beri Penilaian Anda</h4>
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="text-center mb-4">
                  <div className="flex items-center justify-center space-x-1 mb-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => setRating(star)}
                        className="hover:scale-110 transition-transform"
                      >
                        <Star
                          className={`w-8 h-8 ${
                            star <= rating
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                  <p className="text-sm text-gray-600">
                    {rating === 0 ? 'Pilih bintang' : `Anda memberi ${rating} bintang`}
                  </p>
                </div>

                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Bagaimana pendapat Anda tentang proyek ini?"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  rows="3"
                />

                <div className="flex space-x-3 mt-4">
                  <button className="flex-1 flex items-center justify-center space-x-2 p-2 bg-green-50 text-green-700 rounded-lg border border-green-200 hover:bg-green-100 transition-colors">
                    <ThumbsUp className="w-4 h-4" />
                    <span className="text-sm font-medium">Puas</span>
                  </button>
                  <button className="flex-1 flex items-center justify-center space-x-2 p-2 bg-red-50 text-red-700 rounded-lg border border-red-200 hover:bg-red-100 transition-colors">
                    <ThumbsDown className="w-4 h-4" />
                    <span className="text-sm font-medium">Tidak Puas</span>
                  </button>
                </div>

                <button className="w-full mt-4 bg-blue-500 text-white py-3 px-6 rounded-xl font-semibold hover:bg-blue-600 transition-colors">
                  Kirim Penilaian
                </button>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <>
      {/* Main Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/20 backdrop-blur-xs">
        <div 
          className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-gray-200 rounded-t-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className={`w-12 h-12 bg-gradient-to-br ${project.warna} rounded-xl flex items-center justify-center`}>
                  <IconComponent className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">{project.nama}</h2>
                  <p className="text-gray-600">{project.deskripsi}</p>
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
              <span className={`px-3 py-1 text-sm font-medium rounded-full border ${getStatusColor(project.status)}`}>
                <StatusIcon className="w-4 h-4 inline mr-1" />
                {project.status.replace('_', ' ')}
              </span>
              <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm font-medium rounded-full">
                {project.jenis}
              </span>
              {project.rating > 0 && (
                <span className="px-3 py-1 bg-yellow-100 text-yellow-700 text-sm font-medium rounded-full">
                  ⭐ {project.rating} ({project.totalRating} penilaian)
                </span>
              )}
            </div>
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-200">
            <div className="flex overflow-x-auto">
              {tabs.map((tab) => {
                const TabIcon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 px-4 py-3 border-b-2 transition-colors whitespace-nowrap ${
                      activeTab === tab.id
                        ? 'border-blue-500 text-blue-600 bg-blue-50'
                        : 'border-transparent text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                    }`}
                  >
                    <TabIcon className="w-4 h-4" />
                    <span className="font-medium">{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {renderTabContent()}
          </div>

          {/* Action Buttons */}
          <div className="sticky bottom-0 bg-white border-t border-gray-200 rounded-b-2xl p-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <button className="flex-1 bg-blue-500 text-white py-3 px-6 rounded-xl font-semibold hover:bg-blue-600 transition-colors flex items-center justify-center space-x-2">
                <MessageCircle className="w-5 h-5" />
                <span>Laporkan Masalah</span>
              </button>
              <button className="flex-1 border border-gray-300 text-gray-700 py-3 px-6 rounded-xl font-semibold hover:bg-gray-50 transition-colors">
                Bagikan Info Proyek
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Image Viewer Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black bg-opacity-90">
          <div className="relative max-w-4xl max-h-full">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-12 right-0 p-2 text-white hover:text-gray-300 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            <img 
              src={selectedImage} 
              alt="Dokumentasi proyek"
              className="max-w-full max-h-[80vh] object-contain rounded-lg"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default InfrastrukturModal;