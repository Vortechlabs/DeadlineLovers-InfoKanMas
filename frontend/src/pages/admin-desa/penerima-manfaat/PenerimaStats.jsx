import React from 'react';
import { Users, CheckCircle, Clock, XCircle, DollarSign, Star } from 'lucide-react';

const PenerimaStats = ({ dataPenerima }) => {
  const stats = [
    {
      title: 'Total Penerima',
      value: dataPenerima.length,
      icon: Users,
      color: 'purple',
      description: 'orang'
    },
    {
      title: 'Sudah Diterima',
      value: dataPenerima.filter(p => p.status === 'diterima').length,
      icon: CheckCircle,
      color: 'green',
      description: 'sudah konfirmasi'
    },
    {
      title: 'Terverifikasi',
      value: dataPenerima.filter(p => p.status === 'diverifikasi').length,
      icon: CheckCircle,
      color: 'blue',
      description: 'siap distribusi'
    },
    {
      title: 'Menunggu',
      value: dataPenerima.filter(p => p.status === 'menunggu').length,
      icon: Clock,
      color: 'yellow',
      description: 'proses verifikasi'
    },
    {
      title: 'Ditolak',
      value: dataPenerima.filter(p => p.status === 'ditolak').length,
      icon: XCircle,
      color: 'red',
      description: 'perlu revisi'
    },
    {
      title: 'Rating Rata-rata',
      value: (dataPenerima.filter(p => p.rating).reduce((acc, p) => acc + p.rating, 0) / dataPenerima.filter(p => p.rating).length || 0).toFixed(1),
      icon: Star,
      color: 'orange',
      description: 'dari 5.0'
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div key={index} className="bg-white rounded-2xl p-4 border border-gray-200 hover:shadow-lg transition-all duration-300">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{stat.value}</h3>
                <p className="text-xs text-gray-500">{stat.description}</p>
              </div>
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${
                stat.color === 'purple' ? 'from-purple-500 to-purple-600' :
                stat.color === 'green' ? 'from-green-500 to-green-600' :
                stat.color === 'blue' ? 'from-blue-500 to-blue-600' :
                stat.color === 'yellow' ? 'from-yellow-500 to-yellow-600' :
                stat.color === 'red' ? 'from-red-500 to-red-600' :
                'from-orange-500 to-orange-600'
              } flex items-center justify-center shadow-lg`}>
                <Icon size={20} className="text-white" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PenerimaStats;