import React from 'react';

const StatistikCard = ({ icon: Icon, label, value, change, color }) => {
  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600 mb-1">{label}</p>
          <p className={`text-2xl font-bold ${color} mb-1`}>{value}</p>
          <p className="text-xs text-gray-500">{change}</p>
        </div>
        <div className="w-12 h-12 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl flex items-center justify-center">
          <Icon className="w-6 h-6 text-blue-500" />
        </div>
      </div>
    </div>
  );
};

export default StatistikCard;