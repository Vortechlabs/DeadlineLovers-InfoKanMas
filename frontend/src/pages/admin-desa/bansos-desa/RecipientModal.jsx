import React, { useState } from 'react';
import { X, Search, Filter, CheckCircle, Clock, AlertCircle, User, MapPin, Phone } from 'lucide-react';

const RecipientModal = ({ program, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('semua');

  const statusOptions = [
    { value: 'semua', label: 'Semua Status' },
    { value: 'diverifikasi', label: 'Terverifikasi' },
    { value: 'diterima', label: 'Sudah Diterima' },
    { value: 'menunggu', label: 'Menunggu' }
  ];

  const filteredRecipients = program.penerima.daftar.filter(recipient => {
    const searchMatch = recipient.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
                       recipient.nik.includes(searchQuery);
    const statusMatch = filterStatus === 'semua' || recipient.status === filterStatus;
    return searchMatch && statusMatch;
  });

  const getStatusIcon = (status) => {
    switch (status) {
      case 'diterima':
        return { icon: CheckCircle, color: 'text-green-600 bg-green-100' };
      case 'diverifikasi':
        return { icon: CheckCircle, color: 'text-blue-600 bg-blue-100' };
      default:
        return { icon: Clock, color: 'text-yellow-600 bg-yellow-100' };
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'diterima':
        return 'Sudah Diterima';
      case 'diverifikasi':
        return 'Terverifikasi';
      default:
        return 'Menunggu';
    }
  };

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-xs flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Daftar Penerima</h2>
            <p className="text-gray-600 mt-1">{program.nama}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 p-6 bg-gray-50 border-b border-gray-200">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">{program.penerima.total}</div>
            <div className="text-sm text-gray-600">Total Penerima</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{program.penerima.terverifikasi}</div>
            <div className="text-sm text-gray-600">Terverifikasi</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{program.penerima.terkirim}</div>
            <div className="text-sm text-gray-600">Terkirim</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">{program.penerima.konfirmasi}</div>
            <div className="text-sm text-gray-600">Konfirmasi</div>
          </div>
        </div>

        {/* Filters */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Cari penerima berdasarkan nama atau NIK..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {statusOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Recipients List */}
        <div className="overflow-y-auto max-h-96">
          {filteredRecipients.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <User className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p>Tidak ada penerima yang sesuai dengan filter</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {filteredRecipients.map((recipient) => {
                const StatusData = getStatusIcon(recipient.status);
                const StatusIcon = StatusData.icon;
                
                return (
                  <div key={recipient.id} className="p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3 flex-1">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <User size={16} className="text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-medium text-gray-900">{recipient.nama}</h4>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${StatusData.color} flex items-center gap-1`}>
                              <StatusIcon size={10} />
                              {getStatusText(recipient.status)}
                            </span>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-600">
                            <div className="flex items-center gap-2">
                              <span className="font-mono">NIK: {recipient.nik}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <MapPin size={12} />
                              <span>{recipient.dusun}</span>
                            </div>
                          </div>
                          {recipient.konfirmasi && (
                            <div className="flex items-center gap-2 mt-2 text-sm text-green-600">
                              <CheckCircle size={12} />
                              <span>Terkonfirmasi pada {recipient.tanggal}</span>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 ml-4">
                        {recipient.konfirmasi ? (
                          <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full font-medium">
                            Terkonfirmasi
                          </span>
                        ) : (
                          <button className="px-3 py-1 bg-blue-600 text-white text-xs rounded-lg hover:bg-blue-700 transition-colors">
                            Konfirmasi
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

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-gray-200 bg-gray-50">
          <div className="text-sm text-gray-600">
            Menampilkan {filteredRecipients.length} dari {program.penerima.daftar.length} penerima
          </div>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Tutup
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
              Export Data
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipientModal;