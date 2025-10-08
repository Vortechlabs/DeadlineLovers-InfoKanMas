import React from 'react';
import { TrendingUp, Clock, CheckCircle, AlertCircle, DollarSign, FileText } from 'lucide-react';

const ProgramStats = ({ programData }) => {
  const stats = [
    {
      title: 'Total Program',
      value: programData.length,
      icon: FileText,
      color: 'blue',
      description: 'semua program desa'
    },
    {
      title: 'Dalam Pengerjaan',
      value: programData.filter(p => p.status === 'dalam_pengerjaan').length,
      icon: TrendingUp,
      color: 'green',
      description: 'sedang berjalan'
    },
    {
      title: 'Menunggu Persetujuan',
      value: programData.filter(p => p.status === 'menunggu_persetujuan').length,
      icon: Clock,
      color: 'yellow',
      description: 'perlu tindakan'
    },
    {
      title: 'Selesai',
      value: programData.filter(p => p.status === 'selesai').length,
      icon: CheckCircle,
      color: 'purple',
      description: 'program tuntas'
    },
    {
      title: 'Total Anggaran',
      value: `Rp ${(programData.reduce((acc, p) => acc + p.anggaran, 0) / 1000000).toFixed(0)} Jt`,
      icon: DollarSign,
      color: 'green',
      description: 'total diajukan'
    },
    {
      title: 'Realisasi',
      value: `Rp ${(programData.reduce((acc, p) => acc + p.realisasi, 0) / 1000000).toFixed(0)} Jt`,
      icon: DollarSign,
      color: 'blue',
      description: 'total terealisasi'
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
                <h3 className="text-xl font-bold text-gray-900 mb-2">{stat.value}</h3>
                <p className="text-xs text-gray-500">{stat.description}</p>
              </div>
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${
                stat.color === 'blue' ? 'from-blue-500 to-blue-600' :
                stat.color === 'green' ? 'from-green-500 to-green-600' :
                stat.color === 'yellow' ? 'from-yellow-500 to-yellow-600' :
                'from-purple-500 to-purple-600'
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

export default ProgramStats;