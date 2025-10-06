import React from 'react';
import { TrendingUp, TrendingDown, AlertTriangle, CheckCircle, Clock } from 'lucide-react';

const ComplianceScoreCard = ({ title, score, trend, status, icon: Icon, color, issues = 0 }) => {
  const getStatusColor = () => {
    const colors = {
      excellent: 'text-green-600 bg-green-50',
      good: 'text-blue-600 bg-blue-50',
      warning: 'text-yellow-600 bg-yellow-50',
      critical: 'text-red-600 bg-red-50'
    };
    return colors[status] || colors.good;
  };

  const getStatusIcon = () => {
    const icons = {
      excellent: CheckCircle,
      good: CheckCircle,
      warning: Clock,
      critical: AlertTriangle
    };
    return icons[status] || CheckCircle;
  };

  const StatusIcon = getStatusIcon();

  const getScoreColor = () => {
    if (score >= 90) return 'text-green-600';
    if (score >= 80) return 'text-blue-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-300 group">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
            <Icon size={24} className="text-white" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <div className="flex items-center gap-2">
              <h3 className={`text-2xl font-bold ${getScoreColor()}`}>{score}%</h3>
              {trend && (
                trend > 0 ? (
                  <TrendingUp size={16} className="text-green-600" />
                ) : (
                  <TrendingDown size={16} className="text-red-600" />
                )
              )}
            </div>
          </div>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${getStatusColor()}`}>
          <StatusIcon size={12} />
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      </div>

      {/* Progress Bar */}
      <div className="mb-3">
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className={`h-2 rounded-full transition-all duration-1000 ${
              score >= 90 ? 'bg-green-500' :
              score >= 80 ? 'bg-blue-500' :
              score >= 70 ? 'bg-yellow-500' : 'bg-red-500'
            }`}
            style={{ width: `${score}%` }}
          ></div>
        </div>
      </div>

      {/* Issues Count */}
      <div className="flex items-center justify-between text-sm">
        <span className="text-gray-600">Compliance Level</span>
        {issues > 0 && (
          <span className="text-red-600 font-medium">
            {issues} issue{issues > 1 ? 's' : ''}
          </span>
        )}
      </div>
    </div>
  );
};

export default ComplianceScoreCard;