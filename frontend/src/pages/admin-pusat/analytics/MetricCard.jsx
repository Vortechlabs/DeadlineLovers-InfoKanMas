import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

const MetricCard = ({ title, value, change, changeType, icon: Icon, color, chart: Chart, description }) => {
  const getTrendIcon = () => {
    if (changeType === 'up') return <TrendingUp size={16} className="text-green-600" />;
    if (changeType === 'down') return <TrendingDown size={16} className="text-red-600" />;
    return <Minus size={16} className="text-gray-400" />;
  };

  const getChangeColor = () => {
    if (changeType === 'up') return 'text-green-600';
    if (changeType === 'down') return 'text-red-600';
    return 'text-gray-600';
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-300 group">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <div className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
              <Icon size={24} className="text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">{title}</p>
              <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
            </div>
          </div>
          
          {change && (
            <div className="flex items-center gap-2">
              {getTrendIcon()}
              <span className={`text-sm font-medium ${getChangeColor()}`}>
                {change}
              </span>
              <span className="text-sm text-gray-500">{description}</span>
            </div>
          )}
        </div>
      </div>
      
      {/* Mini Chart */}
      {Chart && (
        <div className="mt-3">
          <Chart />
        </div>
      )}
    </div>
  );
};

export default MetricCard;