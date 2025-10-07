import React from 'react';
import { FileText, CheckCircle, Clock, AlertTriangle, Users, Settings } from 'lucide-react';

const StatsOverview = ({ stats }) => {
  const statConfigs = {
    totalProgram: {
      icon: FileText,
      color: 'bg-blue-500',
      label: 'Total Program'
    },
    approved: {
      icon: CheckCircle,
      color: 'bg-green-500',
      label: 'Disetujui'
    },
    pending: {
      icon: Clock,
      color: 'bg-yellow-500',
      label: 'Menunggu'
    },
    issues: {
      icon: AlertTriangle,
      color: 'bg-red-500',
      label: 'Masalah'
    },
    managedRegions: {
      icon: Users,
      color: 'bg-purple-500',
      label: 'Daerah'
    },
    activities: {
      icon: Settings,
      color: 'bg-orange-500',
      label: 'Aktivitas'
    }
  };

  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      {Object.entries(stats).map(([key, value]) => {
        const config = statConfigs[key];
        if (!config) return null;
        
        const Icon = config.icon;
        
        return (
          <div key={key} className="bg-white rounded-xl p-4 border border-gray-200 hover:shadow-md transition-all">
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-lg ${config.color} flex items-center justify-center`}>
                <Icon size={20} className="text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{value}</p>
                <p className="text-sm text-gray-600">{config.label}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StatsOverview;