import React from 'react';

const BudgetCard = ({ title, value, percentage, icon: Icon, color }) => {
  return (
    <div className="bg-white rounded-xl p-5 border border-gray-200">
      <div className="flex items-center gap-3 mb-3">
        <div className={`w-10 h-10 rounded-lg bg-${color}-50 text-${color}-600 flex items-center justify-center`}>
          <Icon size={20} />
        </div>
        <p className="text-sm font-medium text-gray-600">{title}</p>
      </div>
      <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
      {percentage && (
        <p className="text-sm text-gray-500 mt-1">{percentage} dari total</p>
      )}
    </div>
  );
};

export default BudgetCard;