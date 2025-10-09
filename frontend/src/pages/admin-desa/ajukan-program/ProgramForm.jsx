import React from 'react';
import { MapPin, User, Calendar, FileText } from 'lucide-react';

const ProgramForm = ({ formData, onUpdate, onNext, metadata }) => {
  
  // // Set default values dari metadata
  // useEffect(() => {
  //   if (metadata) {
  //     // Set default penanggung jawab dari user
  //     onUpdate({ 
  //       penanggungJawab: metadata.default_penanggung_jawab || 'Kepala Desa',
  //       // ✅ FIX: Simpan ID wilayah, bukan object
  //       lokasi: metadata.default_wilayah?.id || metadata.default_wilayah || ''
  //     });
  //   }
  // }, [metadata, onUpdate]);

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

  // Gunakan kategori dari metadata jika ada
  const kategoriOptions = metadata?.kategori_program || [
    { id: '', nama_kategori: 'Pilih Kategori' },
    { id: 1, nama_kategori: 'Infrastruktur' },
    { id: 2, nama_kategori: 'Bantuan Sosial' },
    { id: 3, nama_kategori: 'Pendidikan' },
    { id: 4, nama_kategori: 'Kesehatan' },
    { id: 5, nama_kategori: 'Pertanian' },
    { id: 6, nama_kategori: 'Lainnya' }
  ];

  // ✅ FIX: Gunakan wilayah dari metadata untuk dropdown
  const wilayahOptions = metadata?.wilayah_list || [];

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

  // ✅ FIX: Dapatkan nama wilayah untuk ditampilkan
  const getWilayahName = (wilayahId) => {
    if (!wilayahId) return '';
    const wilayah = wilayahOptions.find(w => w.id == wilayahId);
    return wilayah ? wilayah.nama_wilayah : '';
  };

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
              <option value="">Pilih Kategori</option>
              {kategoriOptions.map(option => (
                <option key={option.id || option.nama_kategori} value={option.nama_kategori?.toLowerCase()}>
                  {option.nama_kategori}
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
          {/* ✅ FIX: Lokasi sebagai DROPDOWN */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Lokasi <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <select
                value={formData.lokasi}
                onChange={(e) => handleChange('lokasi', e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors appearance-none"
                required
              >
                <option value="">Pilih Desa</option>
                {wilayahOptions.map(wilayah => (
                  <option key={wilayah.id} value={wilayah.id}>
                    {wilayah.nama_wilayah}
                  </option>
                ))}
              </select>
            </div>
            {/* Tampilkan nama wilayah yang dipilih */}
            {formData.lokasi && (
              <p className="text-xs text-green-600 mt-1">
                Terpilih: {getWilayahName(formData.lokasi)}
              </p>
            )}
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

        {/* Target Penerima Manfaat */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Target Penerima Manfaat (orang)
          </label>
          <input
            type="number"
            value={formData.targetPenerimaManfaat}
            onChange={(e) => handleChange('targetPenerimaManfaat', e.target.value)}
            placeholder="0"
            min="0"
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          />
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

        {/* Debug Info - Hapus di production */}
        <div className="bg-gray-100 p-3 rounded-lg">
          <p className="text-xs text-gray-600">
            <strong>Debug Info:</strong> lokasi = {formData.lokasi} (type: {typeof formData.lokasi})
          </p>
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