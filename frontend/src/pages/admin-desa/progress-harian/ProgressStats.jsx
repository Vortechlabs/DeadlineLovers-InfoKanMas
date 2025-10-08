import React from 'react';
import { CheckCircle, Clock, AlertCircle, Camera } from 'lucide-react';

const ProgressStats = ({ progressData }) => {
  const stats = [
    {
      title: 'Proyek Dilaporkan',
      value: progressData.length,
      icon: CheckCircle,
      color: 'green',
      description: 'proyek sudah lapor progress'
    },
    {
      title: 'Sedang Berjalan',
      value: progressData.filter(p => p.status === 'sedang_berjalan').length,
      icon: Clock,
      color: 'blue',
      description: 'dalam pengerjaan'
    },
    {
      title: 'Perlu Validasi',
      value: progressData.filter(p => !p.validasi.ai_verified).length,
      icon: AlertCircle,
      color: 'yellow',
      description: 'butuh pengecekan'
    },
    {
      title: 'Dokumentasi',
      value: progressData.reduce((acc, p) => acc + p.dokumentasi.foto, 0),
      icon: Camera,
      color: 'purple',
      description: 'foto diupload hari ini'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div key={index} className="bg-white rounded-2xl p-5 border border-gray-200 hover:shadow-lg transition-all duration-300">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600 mb-2">{stat.title}</p>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{stat.value}</h3>
                <p className="text-sm text-gray-500">{stat.description}</p>
              </div>
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${
                stat.color === 'green' ? 'from-green-500 to-green-600' :
                stat.color === 'blue' ? 'from-blue-500 to-blue-600' :
                stat.color === 'yellow' ? 'from-yellow-500 to-yellow-600' :
                'from-purple-500 to-purple-600'
              } flex items-center justify-center shadow-lg`}>
                <Icon size={24} className="text-white" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProgressStats;