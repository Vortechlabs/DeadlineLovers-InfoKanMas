import React from 'react';
import { CheckCircle, Clock, AlertCircle } from 'lucide-react';

const ProgressTimeline = ({ progressData }) => {
  const timelineEvents = [
    {
      time: '07:45',
      project: 'Perbaikan Drainase',
      activity: 'Upload foto sebelum pekerjaan',
      status: 'completed',
      type: 'documentation'
    },
    {
      time: '08:00',
      project: 'Pembangunan Jalan',
      activity: 'Mulai pekerjaan tanah',
      status: 'completed',
      type: 'progress'
    },
    {
      time: '09:15',
      project: 'Pembangunan MCK',
      activity: 'Upload progress pondasi',
      status: 'completed',
      type: 'documentation'
    },
    {
      time: '12:30',
      project: 'Pembangunan Jalan',
      activity: 'Upload video progress',
      status: 'completed',
      type: 'documentation'
    },
    {
      time: '14:00',
      project: 'Penerangan Jalan',
      activity: 'Tunggak dokumentasi GPS',
      status: 'pending',
      type: 'alert'
    }
  ];

  const getStatusIcon = (status, type) => {
    if (type === 'alert') return AlertCircle;
    if (status === 'completed') return CheckCircle;
    return Clock;
  };

  const getStatusColor = (status, type) => {
    if (type === 'alert') return 'text-yellow-600 bg-yellow-100';
    if (status === 'completed') return 'text-green-600 bg-green-100';
    return 'text-blue-600 bg-blue-100';
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Timeline Aktivitas Hari Ini</h3>
      
      <div className="space-y-4">
        {timelineEvents.map((event, index) => {
          const Icon = getStatusIcon(event.status, event.type);
          return (
            <div key={index} className="flex items-start gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${getStatusColor(event.status, event.type)}`}>
                <Icon size={16} />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-medium text-gray-900">{event.time}</span>
                  <span className="text-sm text-gray-500">•</span>
                  <span className="text-sm font-medium text-blue-600">{event.project}</span>
                </div>
                <p className="text-sm text-gray-700">{event.activity}</p>
              </div>
              
              <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                event.type === 'alert' ? 'bg-yellow-100 text-yellow-800' :
                event.status === 'completed' ? 'bg-green-100 text-green-800' :
                'bg-blue-100 text-blue-800'
              }`}>
                {event.type === 'alert' ? 'Perhatian' : event.status === 'completed' ? 'Selesai' : 'Berjalan'}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProgressTimeline;