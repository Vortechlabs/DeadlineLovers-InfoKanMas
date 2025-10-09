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

const PenerimaChart = ({ dataPenerima, onViewDetail }) => {
  // Data for program distribution
  const programData = dataPenerima.reduce((acc, penerima) => {
    const existing = acc.find(item => item.name === penerima.program);
    if (existing) {
      existing.value += 1;
    } else {
      acc.push({
        name: penerima.program,
        value: 1
      });
    }
    return acc;
  }, []);

  // Data for status distribution
  const statusData = dataPenerima.reduce((acc, penerima) => {
    const statusMap = {
      'diterima': 'Diterima',
      'diverifikasi': 'Terverifikasi',
      'menunggu': 'Menunggu',
      'ditolak': 'Ditolak'
    };
    
    const status = statusMap[penerima.status];
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

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-semibold text-gray-900">{label}</p>
          <p className="text-sm text-blue-600">
            Jumlah: {payload[0]?.value} penerima
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
            <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Penerima</p>
              <p className="text-xl font-bold text-gray-900">{dataPenerima.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Terkonfirmasi</p>
              <p className="text-xl font-bold text-gray-900">
                {dataPenerima.filter(p => p.tanggalKonfirmasi).length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Rating Rata-rata</p>
              <p className="text-xl font-bold text-gray-900">
                {(dataPenerima.filter(p => p.rating).reduce((acc, p) => acc + p.rating, 0) / dataPenerima.filter(p => p.rating).length || 0).toFixed(1)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Program Distribution Pie Chart */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Distribusi per Program
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={programData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {programData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Status Distribution Bar Chart */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Distribusi Status Penerima
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={statusData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar dataKey="value" name="Jumlah Penerima" fill="#8884d8" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Penerima List */}
      <div className="bg-white rounded-2xl border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Daftar Penerima</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {dataPenerima.map((penerima, index) => (
            <div key={penerima.id} className="p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{penerima.nama}</h4>
                  <p className="text-sm text-gray-500 mt-1">{penerima.program}</p>
                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                    <span>NIK: {penerima.nik}</span>
                    <span>Dusun: {penerima.dusun}</span>
                    <span>Status: {penerima.status}</span>
                    {penerima.rating && (
                      <span>Rating: {penerima.rating}/5</span>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => onViewDetail(penerima)}
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

export default PenerimaChart;