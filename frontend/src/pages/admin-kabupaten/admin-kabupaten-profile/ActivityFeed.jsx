import React from 'react';
import { CheckCircle, FileText, User, Settings, AlertTriangle, Clock } from 'lucide-react';

const ActivityFeed = ({ activities }) => {
  const getActivityIcon = (type) => {
    const icons = {
      approval: CheckCircle,
      submission: FileText,
      user_management: User,
      system: Settings,
      alert: AlertTriangle,
      update: Clock
    };
    const Icon = icons[type] || FileText;
    
    const colors = {
      approval: 'text-green-600 bg-green-50',
      submission: 'text-blue-600 bg-blue-50',
      user_management: 'text-purple-600 bg-purple-50',
      system: 'text-gray-600 bg-gray-50',
      alert: 'text-red-600 bg-red-50',
      update: 'text-yellow-600 bg-yellow-50'
    };

    return <Icon size={16} className={colors[type]} />;
  };

  const getActionText = (activity) => {
    const actions = {
      approval: 'Menyetujui program',
      submission: 'Mengajukan RAB',
      user_management: 'Mengelola pengguna',
      system: 'Melakukan perubahan sistem',
      alert: 'Menangani peringatan',
      update: 'Memperbarui data'
    };
    
    return actions[activity.type] || 'Melakukan aktivitas';
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Aktivitas Terbaru</h3>
      
      <div className="space-y-4">
        {activities.map((activity, index) => (
          <div key={index} className="flex items-start gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors group">
            <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">
              {getActivityIcon(activity.type)}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between mb-1">
                <p className="text-sm font-medium text-gray-900">
                  {getActionText(activity)}
                </p>
                <span className="text-xs text-gray-500 whitespace-nowrap ml-2">
                  {activity.time}
                </span>
              </div>
              
              <p className="text-sm text-gray-600 mb-1">{activity.description}</p>
              
              {activity.details && (
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  {activity.details.region && (
                    <span className="bg-gray-100 px-2 py-1 rounded">
                      {activity.details.region}
                    </span>
                  )}
                  {activity.details.program && (
                    <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded">
                      {activity.details.program}
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      
      <button className="w-full mt-4 py-2 text-sm text-blue-600 hover:text-blue-700 font-medium border border-gray-200 rounded-lg hover:border-blue-200 transition-colors">
        Lihat Semua Aktivitas
      </button>
    </div>
  );
};

export default ActivityFeed;