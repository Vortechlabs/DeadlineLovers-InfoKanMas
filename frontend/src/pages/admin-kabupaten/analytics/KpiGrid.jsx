import React from 'react';
import { Target, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';

const KpiGrid = () => {
  const kpis = [
    {
      title: "Target Achievement",
      value: "87%",
      target: "90%",
      status: "on_track",
      icon: Target,
      color: "bg-gradient-to-br from-blue-500 to-blue-600"
    },
    {
      title: "Growth Rate",
      value: "24%",
      target: "20%",
      status: "exceeded",
      icon: TrendingUp,
      color: "bg-gradient-to-br from-green-500 to-green-600"
    },
    {
      title: "Risk Level",
      value: "Medium",
      target: "Low",
      status: "warning",
      icon: AlertTriangle,
      color: "bg-gradient-to-br from-yellow-500 to-yellow-600"
    },
    {
      title: "Completion Rate",
      value: "94%",
      target: "95%",
      status: "on_track",
      icon: CheckCircle,
      color: "bg-gradient-to-br from-purple-500 to-purple-600"
    }
  ];

  const getStatusColor = (status) => {
    const colors = {
      on_track: 'text-green-600 bg-green-50',
      exceeded: 'text-blue-600 bg-blue-50',
      warning: 'text-yellow-600 bg-yellow-50'
    };
    return colors[status] || colors.on_track;
  };

  const getStatusText = (status) => {
    const texts = {
      on_track: 'On Track',
      exceeded: 'Exceeded',
      warning: 'Attention Needed'
    };
    return texts[status] || status;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {kpis.map((kpi, index) => {
        const Icon = kpi.icon;
        return (
          <div key={index} className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-300 group">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl ${kpi.color} group-hover:scale-110 transition-transform duration-300`}>
                <Icon size={24} className="text-white" />
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(kpi.status)}`}>
                {getStatusText(kpi.status)}
              </span>
            </div>
            
            <h3 className="text-2xl font-bold text-gray-900 mb-1">{kpi.value}</h3>
            <p className="text-sm font-medium text-gray-600 mb-2">{kpi.title}</p>
            
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>Target: {kpi.target}</span>
              <div className="w-16 bg-gray-200 rounded-full h-1.5">
                <div 
                  className={`h-1.5 rounded-full ${
                    kpi.status === 'exceeded' ? 'bg-blue-500' :
                    kpi.status === 'warning' ? 'bg-yellow-500' : 'bg-green-500'
                  }`}
                  style={{ 
                    width: kpi.status === 'exceeded' ? '110%' : 
                           kpi.status === 'warning' ? '75%' : '95%' 
                  }}
                ></div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default KpiGrid;