import React from 'react';
import { MapPin, Users, Calendar, Eye, AlertTriangle } from 'lucide-react';

const ProgramCard = ({ program, onViewDetail }) => {
  const getStatusColor = (status) => {
    const colors = {
      on_track: 'bg-green-50 text-green-700 border-green-200',
      at_risk: 'bg-yellow-50 text-yellow-700 border-yellow-200',
      delayed: 'bg-red-50 text-red-700 border-red-200',
      completed: 'bg-blue-50 text-blue-700 border-blue-200'
    };
    return colors[status] || colors.on_track;
  };

  const getStatusText = (status) => {
    const texts = {
      on_track: 'On Track',
      at_risk: 'At Risk',
      delayed: 'Tertunda',
      completed: 'Selesai'
    };
    return texts[status] || status;
  };

  const progressColor = program.progress >= 75 ? 'bg-green-500' : 
                       program.progress >= 50 ? 'bg-yellow-500' : 'bg-red-500';

  return (
    <div className="bg-white rounded-xl p-5 border border-gray-200 hover:shadow-md transition-all">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-bold text-gray-900 mb-1">{program.name}</h3>
          <p className="text-sm text-gray-600 flex items-center gap-1">
            <MapPin size={14} />
            {program.region}
          </p>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(program.status)}`}>
          {getStatusText(program.status)}
        </span>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Progress</span>
          <span className="text-sm font-bold text-gray-900">{program.progress}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div 
            className={`h-2.5 rounded-full ${progressColor} transition-all duration-500`}
            style={{ width: `${program.progress}%` }}
          ></div>
        </div>
      </div>

      {/* Budget Info */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-gray-50 rounded-lg p-3">
          <p className="text-xs text-gray-500 mb-1">Anggaran</p>
          <p className="text-sm font-bold text-gray-900">{program.budget}</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-3">
          <p className="text-xs text-gray-500 mb-1">Terpakai</p>
          <p className="text-sm font-bold text-gray-900">{program.spent}</p>
        </div>
      </div>

      {/* Alerts */}
      {program.alerts && program.alerts.length > 0 && (
        <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="flex items-start gap-2">
            <AlertTriangle size={16} className="text-yellow-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-xs font-semibold text-yellow-900 mb-1">Peringatan</p>
              <p className="text-xs text-yellow-800">{program.alerts[0]}</p>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-gray-200">
        <div className="flex items-center gap-4 text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <Users size={12} />
            <span>{program.beneficiaries}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar size={12} />
            <span>{program.deadline}</span>
          </div>
        </div>
        <button 
          onClick={() => onViewDetail(program)}
          className="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1"
        >
          Detail
          <Eye size={14} />
        </button>
      </div>
    </div>
  );
};

export default ProgramCard;