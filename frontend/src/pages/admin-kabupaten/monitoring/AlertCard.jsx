import React from 'react';
import { AlertTriangle } from 'lucide-react';

const AlertCard = ({ alert }) => {
  const getAlertColor = (severity) => {
    const colors = {
      critical: 'bg-red-50 border-red-200',
      high: 'bg-orange-50 border-orange-200',
      medium: 'bg-yellow-50 border-yellow-200',
      low: 'bg-blue-50 border-blue-200'
    };
    return colors[severity] || colors.medium;
  };

  const getAlertIcon = (severity) => {
    const icons = {
      critical: 'text-red-600',
      high: 'text-orange-600',
      medium: 'text-yellow-600',
      low: 'text-blue-600'
    };
    return icons[severity] || icons.medium;
  };

  return (
    <div className={`rounded-lg border p-4 ${getAlertColor(alert.severity)}`}>
      <div className="flex items-start gap-3">
        <AlertTriangle size={20} className={`mt-0.5 flex-shrink-0 ${getAlertIcon(alert.severity)}`} />
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <h4 className="text-sm font-semibold text-gray-900">{alert.title}</h4>
            <span className="text-xs font-medium text-gray-500 whitespace-nowrap">{alert.time}</span>
          </div>
          <p className="text-sm text-gray-700 mb-2">{alert.message}</p>
          <div className="flex items-center gap-2">
            <span className="text-xs px-2 py-1 bg-white rounded-full font-medium text-gray-700">
              {alert.region}
            </span>
            <span className="text-xs text-gray-500">{alert.program}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertCard;