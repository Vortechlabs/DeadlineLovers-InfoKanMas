import React from 'react';
import { CheckCircle, Clock, PlayCircle, FileText } from 'lucide-react';

const ProgramTabs = ({ activeTab, onTabChange, programData }) => {
  const tabs = [
    {
      id: 'semua',
      label: 'Semua Program',
      icon: FileText,
      count: programData.length,
      color: 'gray'
    },
    {
      id: 'aktif',
      label: 'Aktif',
      icon: PlayCircle,
      count: programData.filter(p => p.status === 'dalam_pengerjaan').length,
      color: 'green'
    },
    {
      id: 'selesai',
      label: 'Selesai',
      icon: CheckCircle,
      count: programData.filter(p => p.status === 'selesai').length,
      color: 'purple'
    },
    {
      id: 'pengajuan',
      label: 'Pengajuan',
      icon: Clock,
      count: programData.filter(p => p.status === 'menunggu_persetujuan').length,
      color: 'yellow'
    }
  ];

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-2">
      <div className="flex space-x-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 flex-1 justify-center ${
                isActive
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <Icon size={18} />
              <span>{tab.label}</span>
              <span className={`px-2 py-1 rounded-full text-xs font-bold min-w-6 ${
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

export default ProgramTabs;