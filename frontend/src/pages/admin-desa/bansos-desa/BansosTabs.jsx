import React from 'react';
import { CheckCircle, Clock, PlayCircle, FileText, Package, DollarSign, GraduationCap, User } from 'lucide-react';

const BansosTabs = ({ activeTab, onTabChange, bansosData }) => {
  const tabs = [
    {
      id: 'semua',
      label: 'Semua Program',
      icon: FileText,
      count: bansosData.length,
      color: 'gray'
    },
    {
      id: 'aktif',
      label: 'Aktif',
      icon: PlayCircle,
      count: bansosData.filter(p => p.status === 'dalam_pengerjaan').length,
      color: 'green'
    },
    {
      id: 'selesai',
      label: 'Selesai',
      icon: CheckCircle,
      count: bansosData.filter(p => p.status === 'selesai').length,
      color: 'purple'
    },
    {
      id: 'pengajuan',
      label: 'Pengajuan',
      icon: Clock,
      count: bansosData.filter(p => p.status === 'menunggu_persetujuan').length,
      color: 'yellow'
    },
    {
      id: 'sembako',
      label: 'Sembako',
      icon: Package,
      count: bansosData.filter(p => p.jenis === 'sembako').length,
      color: 'orange'
    },
    {
      id: 'tunai',
      label: 'Tunai',
      icon: DollarSign,
      count: bansosData.filter(p => p.jenis === 'tunai').length,
      color: 'green'
    },
    {
      id: 'pendidikan',
      label: 'Pendidikan',
      icon: GraduationCap,
      count: bansosData.filter(p => p.jenis === 'pendidikan').length,
      color: 'blue'
    }
  ];

  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-x-auto">
      <div className="flex space-x-1 p-2 min-w-max">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                isActive
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <Icon size={18} />
              <span>{tab.label}</span>
              <span className={`px-2 py-1 rounded-full text-xs font-bold min-w-6 text-center ${
                isActive
                  ? 'bg-white/20 text-white'
                  : 'bg-gray-100 text-gray-600'
              }`}>
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BansosTabs;