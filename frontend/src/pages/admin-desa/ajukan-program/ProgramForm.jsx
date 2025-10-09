import React from 'react';
import { MapPin, User, Calendar, FileText } from 'lucide-react';

const ProgramForm = ({ formData, onUpdate, onNext }) => {
  const handleChange = (field, value) => {
    onUpdate({ [field]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validasi sederhana
    if (!formData.namaProgram || !formData.kategori || !formData.lokasi) {
      alert('Harap isi semua field yang wajib diisi');
      return;
    }
    onNext();
  };

  const kategoriOptions = [
    { value: '', label: 'Pilih Kategori', disabled: true },
    { value: 'infrastruktur', label: 'Infrastruktur' },
    { value: 'bansos', label: 'Bantuan Sosial' },
    { value: 'pendidikan', label: 'Pendidikan' },
    { value: 'kesehatan', label: 'Kesehatan' },
    { value: 'pertanian', label: 'Pertanian' },
    { value: 'lainnya', label: 'Lainnya' }
  ];

  const jenisOptions = [
    { value: 'pembangunan', label: 'Pembangunan' },
    { value: 'renovasi', label: 'Renovasi' },
    { value: 'bantuan_langsung', label: 'Bantuan Langsung' },
    { value: 'pelatihan', label: 'Pelatihan' },
    { value: 'event', label: 'Kegiatan/Event' }
  ];

  const prioritasOptions = [
    { value: 'sangat_tinggi', label: 'Sangat Tinggi', color: 'text-red-600' },
    { value: 'tinggi', label: 'Tinggi', color: 'text-orange-600' },
    { value: 'sedang', label: 'Sedang', color: 'text-yellow-600' },
    { value: 'rendah', label: 'Rendah', color: 'text-green-600' }
  ];

  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
      <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
        <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <FileText size={20} className="text-blue-600" />
          Informasi Program
        </h2>
        <p className="text-sm text-gray-600 mt-1">
          Isi data dasar program yang akan diajukan
        </p>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        {/* Nama Program */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nama Program <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.namaProgram}
            onChange={(e) => handleChange('namaProgram', e.target.value)}
            placeholder="Contoh: Pembangunan Jalan Desa Sumberejo 2km"
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Kategori */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Kategori <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.kategori}
              onChange={(e) => handleChange('kategori', e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              required
            >
              {kategoriOptions.map(option => (
                <option key={option.value} value={option.value} disabled={option.disabled}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Jenis Program */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Jenis Program
            </label>
            <select
              value={formData.jenis}
              onChange={(e) => handleChange('jenis', e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            >
              {jenisOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Prioritas */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tingkat Prioritas
            </label>
            <select
              value={formData.prioritas}
              onChange={(e) => handleChange('prioritas', e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            >
              {prioritasOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Lokasi */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Lokasi <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                value={formData.lokasi}
                onChange={(e) => handleChange('lokasi', e.target.value)}
                placeholder="Contoh: Dusun 1, Desa Sumberejo"
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                required
              />
            </div>
          </div>

          {/* Penanggung Jawab */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Penanggung Jawab
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                value={formData.penanggungJawab}
                onChange={(e) => handleChange('penanggungJawab', e.target.value)}
                placeholder="Contoh: Kepala Desa"
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Tanggal Mulai */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tanggal Mulai
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="date"
                value={formData.tanggalMulai}
                onChange={(e) => handleChange('tanggalMulai', e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
            </div>
          </div>

          {/* Tanggal Selesai */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tanggal Selesai
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="date"
                value={formData.tanggalSelesai}
                onChange={(e) => handleChange('tanggalSelesai', e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Deskripsi */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Deskripsi Program
          </label>
          <textarea
            value={formData.deskripsi}
            onChange={(e) => handleChange('deskripsi', e.target.value)}
            placeholder="Jelaskan detail program, tujuan, manfaat, dan hal penting lainnya..."
            rows={4}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end pt-4">
          <button
            type="submit"
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all font-medium shadow-lg shadow-blue-500/25 flex items-center gap-2"
          >
            Lanjut ke RAB
            <span className="text-sm">→</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProgramForm;