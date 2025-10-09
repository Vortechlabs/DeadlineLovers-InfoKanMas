import React from 'react';
import { X, Download, Send, FileText, DollarSign, MapPin, Calendar, User, CheckCircle } from 'lucide-react';

const PreviewModal = ({ programData, onClose, onSubmit }) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('id-ID', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getDocumentCount = () => {
    let count = 0;
    if (programData.dokumen.proposal) count++;
    if (programData.dokumen.gambarTeknis) count++;
    if (programData.dokumen.suratPermohonan) count++;
    if (programData.dokumen.fotoLokasi && programData.dokumen.fotoLokasi.length > 0) {
      count += programData.dokumen.fotoLokasi.length;
    }
    return count;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 sticky top-0 bg-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Preview Pengajuan Program</h2>
              <p className="text-sm text-gray-500">Review sebelum mengajukan ke Kecamatan</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Program Overview */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4">
            <h3 className="font-semibold text-gray-900 mb-2">{programData.namaProgram}</h3>
            <p className="text-sm text-gray-600">{programData.deskripsi}</p>
          </div>

          {/* Informasi Utama */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                <CheckCircle size={16} className="text-green-500" />
                Informasi Program
              </h4>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Kategori:</span>
                  <span className="font-medium capitalize">{programData.kategori}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Jenis:</span>
                  <span className="font-medium capitalize">{programData.jenis}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Prioritas:</span>
                  <span className="font-medium capitalize">{programData.prioritas}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Penanggung Jawab:</span>
                  <span className="font-medium">{programData.penanggungJawab}</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                <MapPin size={16} className="text-blue-500" />
                Lokasi & Timeline
              </h4>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Lokasi:</span>
                  <span className="font-medium">{programData.lokasi}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Mulai:</span>
                  <span className="font-medium">{formatDate(programData.tanggalMulai)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Selesai:</span>
                  <span className="font-medium">{formatDate(programData.tanggalSelesai)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* RAB Summary */}
          <div className="border border-gray-200 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <DollarSign size={16} className="text-green-500" />
              Rencana Anggaran Biaya
            </h4>
            
            <div className="space-y-2 mb-4">
              {programData.items.map((item, index) => (
                <div key={item.id} className="flex justify-between text-sm py-1 border-b border-gray-100">
                  <div>
                    <span className="font-medium">{item.nama || `Item ${index + 1}`}</span>
                    <span className="text-gray-500 ml-2">
                      {item.volume} {item.satuan} × {formatCurrency(item.hargaSatuan)}
                    </span>
                  </div>
                  <span className="font-semibold">{formatCurrency(item.total)}</span>
                </div>
              ))}
            </div>
            
            <div className="flex justify-between items-center pt-3 border-t border-gray-200">
              <span className="font-semibold text-gray-900">Total Anggaran</span>
              <span className="text-xl font-bold text-green-600">
                {formatCurrency(programData.totalAnggaran)}
              </span>
            </div>
          </div>

          {/* Dokumen Pendukung */}
          <div className="border border-gray-200 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <FileText size={16} className="text-purple-500" />
              Dokumen Pendukung
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle size={16} className={programData.dokumen.proposal ? "text-green-500" : "text-gray-300"} />
                <span>Proposal Program</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle size={16} className={programData.dokumen.gambarTeknis ? "text-green-500" : "text-gray-300"} />
                <span>Gambar Teknis</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle size={16} className={programData.dokumen.suratPermohonan ? "text-green-500" : "text-gray-300"} />
                <span>Surat Permohonan</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle size={16} className={programData.dokumen.fotoLokasi && programData.dokumen.fotoLokasi.length > 0 ? "text-green-500" : "text-gray-300"} />
                <span>Foto Lokasi ({programData.dokumen.fotoLokasi ? programData.dokumen.fotoLokasi.length : 0})</span>
              </div>
            </div>
            
            <div className="mt-3 text-sm text-gray-600">
              Total: {getDocumentCount()} dokumen terupload
            </div>
          </div>

          {/* Alur Persetujuan */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h4 className="font-semibold text-yellow-800 mb-2">Alur Persetujuan</h4>
            <div className="flex items-center justify-between text-sm text-yellow-700">
              <div className="text-center">
                <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-white font-bold mx-auto mb-1">
                  1
                </div>
                <span>Desa</span>
              </div>
              <div className="flex-1 h-0.5 bg-yellow-300 mx-2"></div>
              <div className="text-center">
                <div className="w-8 h-8 bg-yellow-300 rounded-full flex items-center justify-center text-yellow-700 font-bold mx-auto mb-1">
                  2
                </div>
                <span>Kecamatan</span>
              </div>
              <div className="flex-1 h-0.5 bg-yellow-200 mx-2"></div>
              <div className="text-center">
                <div className="w-8 h-8 bg-yellow-200 rounded-full flex items-center justify-center text-yellow-600 font-bold mx-auto mb-1">
                  3
                </div>
                <span>Bupati</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-gray-200 bg-gray-50 rounded-b-2xl">
          <button 
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors flex items-center gap-2"
          >
            <X size={16} />
            Tutup Preview
          </button>
          
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors flex items-center gap-2">
              <Download size={16} />
              Export PDF
            </button>
            
            <button 
              onClick={onSubmit}
              className="px-6 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all font-medium shadow-lg shadow-green-500/25 flex items-center gap-2"
            >
              <Send size={16} />
              🚀 Ajukan Sekarang
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewModal;