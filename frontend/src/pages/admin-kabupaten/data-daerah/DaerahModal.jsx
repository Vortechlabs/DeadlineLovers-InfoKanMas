import React from 'react';
import { 
  X, 
  MapPin, 
  Users, 
  DollarSign, 
  TrendingUp, 
  AlertTriangle,
  CheckCircle,
  Clock,
  Download,
  FileText
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend 
} from 'recharts';

const DaerahModal = ({ daerah, onClose }) => {
  if (!daerah) return null;

  const monthlyData = [
    { month: 'Jan', anggaran: 2.1, realisasi: 1.8 },
    { month: 'Feb', anggaran: 2.3, realisasi: 2.0 },
    { month: 'Mar', anggaran: 2.5, realisasi: 2.3 },
    { month: 'Apr', anggaran: 2.2, realisasi: 1.9 },
    { month: 'Mei', anggaran: 2.4, realisasi: 2.1 }
  ];

  const programData = [
    { name: 'Bantuan Sosial', value: 45 },
    { name: 'Kesehatan', value: 25 },
    { name: 'Pendidikan', value: 20 },
    { name: 'Infrastruktur', value: 10 }
  ];

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-xl max-w-6xl w-full my-8 max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
              <MapPin size={24} className="text-blue-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{daerah.nama}</h2>
              <p className="text-sm text-gray-600">{daerah.provinsi} • {daerah.tipe}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Download size={20} className="text-gray-600" />
            </button>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X size={20} className="text-gray-600" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[70vh]">
          {/* Stats Overview */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
              <p className="text-sm text-blue-600 mb-1">Total Anggaran</p>
              <p className="text-xl font-bold text-blue-900">{daerah.totalAnggaran}</p>
            </div>
            <div className="bg-green-50 rounded-lg p-4 border border-green-200">
              <p className="text-sm text-green-600 mb-1">Program Aktif</p>
              <p className="text-xl font-bold text-green-900">{daerah.jumlahProgram}</p>
            </div>
            <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
              <p className="text-sm text-purple-600 mb-1">Realisasi</p>
              <p className="text-xl font-bold text-purple-900">{daerah.realisasi}%</p>
            </div>
            <div className="bg-indigo-50 rounded-lg p-4 border border-indigo-200">
              <p className="text-sm text-indigo-600 mb-1">Kepatuhan</p>
              <p className="text-xl font-bold text-indigo-900">{daerah.kepatuhan}%</p>
            </div>
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Monthly Trend */}
            <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
              <h3 className="font-bold text-gray-900 mb-4">Trend Bulanan</h3>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={monthlyData}>
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
                    formatter={(value) => `Rp ${value}M`}
                  />
                  <Legend wrapperStyle={{ fontSize: '12px' }} />
                  <Line 
                    type="monotone" 
                    dataKey="anggaran" 
                    stroke="#3b82f6" 
                    strokeWidth={2}
                    name="Anggaran"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="realisasi" 
                    stroke="#10b981" 
                    strokeWidth={2}
                    name="Realisasi"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Program Distribution */}
            <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
              <h3 className="font-bold text-gray-900 mb-4">Distribusi Program</h3>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={programData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="name" stroke="#9ca3af" style={{ fontSize: '12px' }} />
                  <YAxis stroke="#9ca3af" style={{ fontSize: '12px' }} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      fontSize: '12px'
                    }}
                    formatter={(value) => `${value}%`}
                  />
                  <Bar dataKey="value" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Program List */}
          <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
            <h3 className="font-bold text-gray-900 mb-4">Program Unggulan</h3>
            <div className="space-y-3">
              {daerah.programUnggulan && daerah.programUnggulan.map((program, index) => (
                <div key={index} className="bg-white rounded-lg p-4 border border-gray-200 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                      <FileText size={18} className="text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{program.nama}</p>
                      <p className="text-xs text-gray-500">Anggaran: {program.anggaran} • Progress: {program.progress}%</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      program.status === 'on_track' ? 'bg-green-100 text-green-800' :
                      program.status === 'at_risk' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {program.status === 'on_track' ? 'On Track' : 
                       program.status === 'at_risk' ? 'At Risk' : 'Tertunda'}
                    </span>
                    <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                      Lihat
                    </button>
                  </div>
                </div>
              ))}
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
          <button className="px-6 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center gap-2">
            <Download size={16} />
            Export Data
          </button>
        </div>
      </div>
    </div>
  );
};

export default DaerahModal;