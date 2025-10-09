import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';
import { Eye, TrendingUp } from 'lucide-react';

const DistributionChart = ({ programs, onViewRecipients }) => {
  // Data for bar chart - budget vs realization
  const budgetData = programs.map(program => ({
    name: program.nama.length > 15 ? program.nama.substring(0, 15) + '...' : program.nama,
    anggaran: program.anggaran / 1000000,
    realisasi: program.realisasi / 1000000,
    progress: program.progress
  }));

  // Data for pie chart - distribution by type
  const typeData = programs.reduce((acc, program) => {
    const existing = acc.find(item => item.name === program.jenis);
    if (existing) {
      existing.value += program.anggaran;
      existing.count += 1;
    } else {
      acc.push({
        name: program.jenis,
        value: program.anggaran,
        count: 1
      });
    }
    return acc;
  }, []);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];

  // Data for status distribution
  const statusData = programs.reduce((acc, program) => {
    const statusMap = {
      'selesai': 'Selesai',
      'dalam_pengerjaan': 'Berjalan',
      'menunggu_persetujuan': 'Pengajuan',
      'ditolak': 'Ditolak'
    };
    
    const status = statusMap[program.status];
    const existing = acc.find(item => item.name === status);
    if (existing) {
      existing.value += 1;
    } else {
      acc.push({
        name: status,
        value: 1
      });
    }
    return acc;
  }, []);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-semibold text-gray-900">{label}</p>
          <p className="text-sm text-blue-600">
            Anggaran: Rp {payload[0]?.value} Jt
          </p>
          <p className="text-sm text-green-600">
            Realisasi: Rp {payload[1]?.value} Jt
          </p>
          <p className="text-sm text-gray-600">
            Progress: {payload[2]?.value}%
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Program</p>
              <p className="text-xl font-bold text-gray-900">{programs.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Anggaran</p>
              <p className="text-xl font-bold text-gray-900">
                Rp {(programs.reduce((acc, p) => acc + p.anggaran, 0) / 1000000).toFixed(0)} Jt
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Rata-rata Progress</p>
              <p className="text-xl font-bold text-gray-900">
                {Math.round(programs.reduce((acc, p) => acc + p.progress, 0) / programs.length)}%
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Budget vs Realization Bar Chart */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <TrendingUp size={20} />
            Anggaran vs Realisasi (Juta Rupiah)
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={budgetData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar dataKey="anggaran" name="Anggaran" fill="#0088FE" radius={[4, 4, 0, 0]} />
              <Bar dataKey="realisasi" name="Realisasi" fill="#00C49F" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Distribution by Type Pie Chart */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Distribusi Berdasarkan Jenis
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={typeData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {typeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`Rp ${(value / 1000000).toFixed(1)} Jt`, 'Anggaran']} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Program List */}
      <div className="bg-white rounded-2xl border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Daftar Program</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {programs.map((program, index) => (
            <div key={program.id} className="p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{program.nama}</h4>
                  <p className="text-sm text-gray-500 mt-1">{program.deskripsi}</p>
                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                    <span>Anggaran: Rp {(program.anggaran / 1000000).toFixed(0)} Jt</span>
                    <span>Progress: {program.progress}%</span>
                    <span>Penerima: {program.penerima.terkirim}/{program.penerima.total}</span>
                  </div>
                </div>
                <button
                  onClick={() => onViewRecipients(program)}
                  className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors ml-4"
                  title="Lihat Detail"
                >
                  <Eye size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DistributionChart;