import React from 'react';
import { Plus, Trash2, DollarSign, Calculator } from 'lucide-react';

const RABForm = ({ formData, onUpdate, onNext, onBack }) => {
  const addItem = () => {
    const newItems = [...formData.items, {
      id: Date.now(),
      nama: '',
      volume: '',
      satuan: '',
      hargaSatuan: '',
      total: 0
    }];
    onUpdate({ items: newItems });
  };

  const removeItem = (id) => {
    if (formData.items.length > 1) {
      const newItems = formData.items.filter(item => item.id !== id);
      onUpdate({ items: newItems });
    }
  };

  const updateItem = (id, field, value) => {
    const newItems = formData.items.map(item => {
      if (item.id === id) {
        const updatedItem = { ...item, [field]: value };
        
        // Calculate total if volume or hargaSatuan changes
        if (field === 'volume' || field === 'hargaSatuan') {
          const volume = field === 'volume' ? parseFloat(value) || 0 : parseFloat(item.volume) || 0;
          const hargaSatuan = field === 'hargaSatuan' ? parseFloat(value) || 0 : parseFloat(item.hargaSatuan) || 0;
          updatedItem.total = volume * hargaSatuan;
        }
        
        return updatedItem;
      }
      return item;
    });

    // Calculate total anggaran
    const totalAnggaran = newItems.reduce((sum, item) => sum + item.total, 0);
    
    onUpdate({ 
      items: newItems,
      totalAnggaran 
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const satuanOptions = [
    'm', 'm²', 'm³', 'unit', 'buah', 'paket', 'orang/hari', 'ls'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validasi RAB
    const hasEmptyFields = formData.items.some(item => 
      !item.nama || !item.volume || !item.satuan || !item.hargaSatuan
    );
    
    if (hasEmptyFields) {
      alert('Harap isi semua field pada item RAB');
      return;
    }

    if (formData.totalAnggaran === 0) {
      alert('Total anggaran tidak boleh 0');
      return;
    }

    onNext();
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
      <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-green-50 to-emerald-50">
        <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <Calculator size={20} className="text-green-600" />
          Rencana Anggaran Biaya (RAB)
        </h2>
        <p className="text-sm text-gray-600 mt-1">
          Detail rencana anggaran untuk program {formData.namaProgram}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="p-6">
        {/* RAB Items */}
        <div className="space-y-4 mb-6">
          {formData.items.map((item, index) => (
            <div key={item.id} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-gray-900">Item {index + 1}</h4>
                {formData.items.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeItem(item.id)}
                    className="p-1 text-red-600 hover:bg-red-100 rounded transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
                {/* Nama Item */}
                <div className="md:col-span-5">
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    Nama Item
                  </label>
                  <input
                    type="text"
                    value={item.nama}
                    onChange={(e) => updateItem(item.id, 'nama', e.target.value)}
                    placeholder="Contoh: Aspal Hotmix"
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                {/* Volume */}
                <div className="md:col-span-2">
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    Volume
                  </label>
                  <input
                    type="number"
                    value={item.volume}
                    onChange={(e) => updateItem(item.id, 'volume', e.target.value)}
                    placeholder="0"
                    min="0"
                    step="0.01"
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                {/* Satuan */}
                <div className="md:col-span-2">
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    Satuan
                  </label>
                  <select
                    value={item.satuan}
                    onChange={(e) => updateItem(item.id, 'satuan', e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Pilih</option>
                    {satuanOptions.map(satuan => (
                      <option key={satuan} value={satuan}>{satuan}</option>
                    ))}
                  </select>
                </div>

                {/* Harga Satuan */}
                <div className="md:col-span-3">
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    Harga Satuan
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-3 h-3" />
                    <input
                      type="number"
                      value={item.hargaSatuan}
                      onChange={(e) => updateItem(item.id, 'hargaSatuan', e.target.value)}
                      placeholder="0"
                      min="0"
                      className="w-full pl-6 pr-3 py-2 text-sm border border-gray-200 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* Total per Item */}
              <div className="mt-3 pt-3 border-t border-gray-200">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Total Item:</span>
                  <span className="font-semibold text-green-600">
                    {formatCurrency(item.total)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add Item Button */}
        <button
          type="button"
          onClick={addItem}
          className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-gray-400 hover:text-gray-700 transition-colors flex items-center justify-center gap-2 mb-6"
        >
          <Plus size={16} />
          Tambah Item RAB
        </button>

        {/* Total Anggaran */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-600">Total Anggaran Program</p>
              <p className="text-2xl font-bold text-gray-900">
                {formatCurrency(formData.totalAnggaran)}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">{formData.items.length} item</p>
              <p className="text-sm text-green-600 font-medium">RAB Siap</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between pt-4">
          <button
            type="button"
            onClick={onBack}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
          >
            ← Kembali
          </button>
          <button
            type="submit"
            className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all font-medium shadow-lg shadow-green-500/25 flex items-center gap-2"
          >
            Lanjut ke Dokumen
            <span className="text-sm">→</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default RABForm;