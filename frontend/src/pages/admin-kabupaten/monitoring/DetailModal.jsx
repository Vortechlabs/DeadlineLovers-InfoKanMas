import React from 'react';
import { 
  MapPin, 
  Download, 
  CheckCircle, 
  Activity, 
  Clock 
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Legend 
} from 'recharts';

const DetailModal = ({ program, onClose }) => {
  if (!program) return null;

  const spendingData = [
    { month: 'Jan', planned: 100, actual: 95 },
    { month: 'Feb', planned: 200, actual: 185 },
    { month: 'Mar', planned: 300, actual: 310 },
    { month: 'Apr', planned: 400, actual: 420 },
    { month: 'Mei', planned: 500, actual: 480 }
  ];

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-xl max-w-5xl w-full my-8">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{program.name}</h2>
            <p className="text-sm text-gray-500 mt-1 flex items-center gap-1">
              <MapPin size={14} />
              {program.region}
            </p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Download size={24} className="text-gray-600" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[70vh] overflow-y-auto">
          {/* Status Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
              <p className="text-sm text-blue-600 mb-1">Progress</p>
              <p className="text-2xl font-bold text-blue-900">{program.progress}%</p>
            </div>
            <div className="bg-green-50 rounded-lg p-4 border border-green-200">
              <p className="text-sm text-green-600 mb-1">Anggaran</p>
              <p className="text-2xl font-bold text-green-900">{program.budget}</p>
            </div>
            <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
              <p className="text-sm text-purple-600 mb-1">Terpakai</p>
              <p className="text-2xl font-bold text-purple-900">{program.spent}</p>
            </div>
            <div className="bg-indigo-50 rounded-lg p-4 border border-indigo-200">
              <p className="text-sm text-indigo-600 mb-1">Penerima</p>
              <p className="text-2xl font-bold text-indigo-900">{program.beneficiaries}</p>
            </div>
          </div>

          {/* Spending Chart */}
          <div className="bg-gray-50 rounded-xl p-5 mb-6 border border-gray-200">
            <h3 className="font-bold text-gray-900 mb-4">Realisasi Anggaran</h3>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={spendingData}>
                <defs>
                  <linearGradient id="colorPlanned" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#9ca3af" style={{ fontSize: '12px' }} />
                <YAxis stroke="#9ca3af" style={{ fontSize: '12px' }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '12px'
                  }} 
                />
                <Legend wrapperStyle={{ fontSize: '12px' }} />
                <Area 
                  type="monotone" 
                  dataKey="planned" 
                  stroke="#3b82f6" 
                  fillOpacity={1}
                  fill="url(#colorPlanned)"
                  name="Rencana"
                />
                <Area 
                  type="monotone" 
                  dataKey="actual" 
                  stroke="#10b981" 
                  fillOpacity={1}
                  fill="url(#colorActual)"
                  name="Realisasi"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Timeline */}
          <div className="bg-gray-50 rounded-xl p-5 mb-6 border border-gray-200">
            <h3 className="font-bold text-gray-900 mb-4">Timeline Program</h3>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center">
                    <CheckCircle size={20} className="text-white" />
                  </div>
                  <div className="w-0.5 h-full bg-gray-300 mt-2"></div>
                </div>
                <div className="flex-1 pb-8">
                  <p className="text-sm font-semibold text-gray-900">Proposal Disetujui</p>
                  <p className="text-xs text-gray-500 mt-1">15 Januari 2025</p>
                  <p className="text-xs text-gray-600 mt-2">RAB disetujui dengan AI Score 92/100</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center">
                    <CheckCircle size={20} className="text-white" />
                  </div>
                  <div className="w-0.5 h-full bg-gray-300 mt-2"></div>
                </div>
                <div className="flex-1 pb-8">
                  <p className="text-sm font-semibold text-gray-900">Pencairan Tahap 1</p>
                  <p className="text-xs text-gray-500 mt-1">20 Januari 2025</p>
                  <p className="text-xs text-gray-600 mt-2">Rp 250 Juta (40%)</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center animate-pulse">
                    <Activity size={20} className="text-white" />
                  </div>
                  <div className="w-0.5 h-full bg-gray-300 mt-2"></div>
                </div>
                <div className="flex-1 pb-8">
                  <p className="text-sm font-semibold text-gray-900">Pelaksanaan Program</p>
                  <p className="text-xs text-gray-500 mt-1">Sedang Berjalan</p>
                  <p className="text-xs text-gray-600 mt-2">Progress: 65% - On Track</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
                    <Clock size={20} className="text-gray-500" />
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-500">Target Selesai</p>
                  <p className="text-xs text-gray-400 mt-1">30 Juni 2025</p>
                </div>
              </div>
            </div>
          </div>

          {/* Documents */}
          <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
            <h3 className="font-bold text-gray-900 mb-4">Dokumentasi</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="bg-white rounded-lg p-3 border border-gray-200 flex items-center justify-between hover:shadow-md transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                    <Download size={18} className="text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Laporan Progress</p>
                    <p className="text-xs text-gray-500">PDF • 2.4 MB</p>
                  </div>
                </div>
                <button className="text-blue-600 hover:text-blue-700">
                  <Download size={18} />
                </button>
              </div>

              <div className="bg-white rounded-lg p-3 border border-gray-200 flex items-center justify-between hover:shadow-md transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center">
                    <Download size={18} className="text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Foto Kegiatan</p>
                    <p className="text-xs text-gray-500">ZIP • 15.8 MB</p>
                  </div>
                </div>
                <button className="text-blue-600 hover:text-blue-700">
                  <Download size={18} />
                </button>
              </div>

              <div className="bg-white rounded-lg p-3 border border-gray-200 flex items-center justify-between hover:shadow-md transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center">
                    <Download size={18} className="text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Daftar Penerima</p>
                    <p className="text-xs text-gray-500">XLSX • 0.8 MB</p>
                  </div>
                </div>
                <button className="text-blue-600 hover:text-blue-700">
                  <Download size={18} />
                </button>
              </div>

              <div className="bg-white rounded-lg p-3 border border-gray-200 flex items-center justify-between hover:shadow-md transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-yellow-50 flex items-center justify-center">
                    <Download size={18} className="text-yellow-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Bukti Transfer</p>
                    <p className="text-xs text-gray-500">PDF • 1.2 MB</p>
                  </div>
                </div>
                <button className="text-blue-600 hover:text-blue-700">
                  <Download size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
          <button 
            onClick={onClose}
            className="px-6 py-2.5 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
          >
            Tutup
          </button>
          <button className="px-6 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
            Export Laporan
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailModal;