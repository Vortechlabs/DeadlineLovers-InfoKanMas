import React, { useState } from 'react';
import { X, Truck, Calendar, MapPin, Users, CheckCircle, Clock, AlertCircle, Plus } from 'lucide-react';

const DistributionModal = ({ program, onClose }) => {
  const [activeTab, setActiveTab] = useState('jadwal');
  const [showAddForm, setShowAddForm] = useState(false);

  const getStatusColor = (status) => {
    switch (status) {
      case 'selesai':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'dalam_proses':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'dijadwalkan':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'selesai':
        return CheckCircle;
      case 'dalam_proses':
        return Clock;
      case 'dijadwalkan':
        return Calendar;
      default:
        return AlertCircle;
    }
  };

  const tabs = [
    { id: 'jadwal', label: 'Jadwal Distribusi', count: program.distribusi.length },
    { id: 'dokumentasi', label: 'Dokumentasi', count: program.dokumentasi.foto + program.dokumentasi.video },
    { id: 'laporan', label: 'Laporan', count: program.dokumentasi.dokumen }
  ];

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-xs flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Distribusi Bansos</h2>
            <p className="text-gray-600 mt-1">{program.nama}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Program Summary */}
        <div className="p-6 bg-gray-50 border-b border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                <Users className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Penerima</p>
                <p className="font-semibold text-gray-900">{program.penerima.total} orang</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                <Truck className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Terkirim</p>
                <p className="font-semibold text-gray-900">{program.penerima.terkirim} orang</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Terkonfirmasi</p>
                <p className="font-semibold text-gray-900">{program.penerima.konfirmasi} orang</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <div className="flex space-x-1 px-6">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-3 border-b-2 text-sm font-medium transition-colors ${
                    isActive
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <span>{tab.label}</span>
                  <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full min-w-6 text-center">
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-96">
          {activeTab === 'jadwal' && (
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Jadwal Distribusi</h3>
                <button
                  onClick={() => setShowAddForm(true)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center gap-2"
                >
                  <Plus size={16} />
                  Tambah Jadwal
                </button>
              </div>

              {program.distribusi.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <Truck className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p>Belum ada jadwal distribusi</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {program.distribusi.map((distribusi, index) => {
                    const StatusIcon = getStatusIcon(distribusi.status);
                    return (
                      <div key={index} className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-4 flex-1">
                            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                              <Truck className="w-6 h-6 text-blue-600" />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <h4 className="font-semibold text-gray-900">Tahap {distribusi.tahap}</h4>
                                <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(distribusi.status)} flex items-center gap-1`}>
                                  <StatusIcon size={12} />
                                  {distribusi.status === 'selesai' ? 'Selesai' : 
                                   distribusi.status === 'dalam_proses' ? 'Dalam Proses' : 'Dijadwalkan'}
                                </span>
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                                <div className="flex items-center gap-2">
                                  <Calendar size={14} />
                                  <span>{new Date(distribusi.tanggal).toLocaleDateString('id-ID')}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <MapPin size={14} />
                                  <span>{distribusi.lokasi}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Users size={14} />
                                  <span>{distribusi.jumlah} penerima</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 ml-4">
                            {distribusi.status !== 'selesai' && (
                              <button className="px-3 py-1 bg-blue-600 text-white text-xs rounded-lg hover:bg-blue-700 transition-colors">
                                Update
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {activeTab === 'dokumentasi' && (
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Dokumentasi Distribusi</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 bg-gray-50 rounded-xl">
                  <div className="text-2xl font-bold text-blue-600">{program.dokumentasi.foto}</div>
                  <div className="text-sm text-gray-600">Foto</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-xl">
                  <div className="text-2xl font-bold text-green-600">{program.dokumentasi.video}</div>
                  <div className="text-sm text-gray-600">Video</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-xl">
                  <div className="text-2xl font-bold text-purple-600">{program.dokumentasi.dokumen}</div>
                  <div className="text-sm text-gray-600">Dokumen</div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'laporan' && (
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Laporan Distribusi</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-xl p-4">
                  <h4 className="font-medium text-gray-900 mb-2">Ringkasan Distribusi</h4>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p>Total tahap distribusi: {program.distribusi.length}</p>
                    <p>Penerima terkirim: {program.penerima.terkirim} dari {program.penerima.total}</p>
                    <p>Tingkat konfirmasi: {((program.penerima.konfirmasi / program.penerima.terkirim) * 100).toFixed(1)}%</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-gray-200 bg-gray-50">
          <div className="text-sm text-gray-600">
            Progress distribusi: {program.progress}%
          </div>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Tutup
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
              Export Laporan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DistributionModal;