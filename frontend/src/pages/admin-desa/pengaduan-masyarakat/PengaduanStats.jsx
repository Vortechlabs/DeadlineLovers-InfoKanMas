import React from 'react';
import { AlertCircle, CheckCircle, Clock, XCircle, TrendingUp, Flag } from 'lucide-react';

const PengaduanStats = ({ dataPengaduan }) => {
  const stats = [
    {
      title: 'Pengaduan Baru',
      value: dataPengaduan.filter(p => p.status === 'baru').length,
      icon: AlertCircle,
      color: 'blue',
      description: 'perlu tindakan segera'
    },
    {
      title: 'Dalam Investigasi',
      value: dataPengaduan.filter(p => p.status === 'dalam_investigasi').length,
      icon: Clock,
      color: 'yellow',
      description: 'sedang ditindaklanjuti'
    },
    {
      title: 'Terverifikasi',
      value: dataPengaduan.filter(p => p.status === 'diverifikasi').length,
      icon: CheckCircle,
      color: 'green',
      description: 'bukti valid'
    },
    {
      title: 'Selesai',
      value: dataPengaduan.filter(p => p.status === 'selesai').length,
      icon: Flag,
      color: 'purple',
      description: 'telah diselesaikan'
    },
    {
      title: 'Prioritas Tinggi',
      value: dataPengaduan.filter(p => p.prioritas === 'tinggi' || p.prioritas === 'sangat_tinggi').length,
      icon: TrendingUp,
      color: 'red',
      description: 'perlu perhatian khusus'
    },
    {
      title: 'Ditolak',
      value: dataPengaduan.filter(p => p.status === 'ditolak').length,
      icon: XCircle,
      color: 'gray',
      description: 'tidak valid'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div key={index} className="bg-white rounded-2xl p-4 border border-gray-200 hover:shadow-lg transition-all duration-300">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{stat.value}</h3>
                <p className="text-xs text-gray-500">{stat.description}</p>
              </div>
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${
                stat.color === 'blue' ? 'from-blue-500 to-blue-600' :
                stat.color === 'yellow' ? 'from-yellow-500 to-yellow-600' :
                stat.color === 'green' ? 'from-green-500 to-green-600' :
                stat.color === 'purple' ? 'from-purple-500 to-purple-600' :
                stat.color === 'red' ? 'from-red-500 to-red-600' :
                'from-gray-500 to-gray-600'
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

export default PengaduanStats;