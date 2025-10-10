import React from 'react';
import { AlertTriangle, Info, CheckCircle, X, ChevronRight } from 'lucide-react';

const AlertCard = ({ alerts = [] }) => {
  const getAlertIcon = (type) => {
    switch (type) {
      case 'warning':
        return <AlertTriangle size={20} className="text-yellow-600 mt-0.5 flex-shrink-0" />;
      case 'info':
        return <Info size={20} className="text-blue-600 mt-0.5 flex-shrink-0" />;
      case 'success':
        return <CheckCircle size={20} className="text-green-600 mt-0.5 flex-shrink-0" />;
      default:
        return <Info size={20} className="text-gray-600 mt-0.5 flex-shrink-0" />;
    }
  };

  const getAlertColor = (type) => {
    switch (type) {
      case 'warning':
        return 'bg-yellow-50 border-yellow-200 text-yellow-900';
      case 'info':
        return 'bg-blue-50 border-blue-200 text-blue-900';
      case 'success':
        return 'bg-green-50 border-green-200 text-green-900';
      default:
        return 'bg-gray-50 border-gray-200 text-gray-900';
    }
  };

  if (alerts.length === 0) {
    return null;
  }

  return (
    <div className="space-y-3">
      {alerts.map((alert) => (
        <div 
          key={alert.id} 
          className={`border rounded-lg p-4 flex items-start gap-3 ${getAlertColor(alert.type)}`}
        >
          {getAlertIcon(alert.type)}
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-semibold">{alert.title}</h4>
            <p className="text-sm mt-1">{alert.message}</p>
            <p className="text-xs opacity-75 mt-2">{alert.time}</p>
          </div>
          <button className="opacity-70 hover:opacity-100 transition-opacity">
            <ChevronRight size={20} />
          </button>
        </div>
      ))}
    </div>
  );
};

export default AlertCard;