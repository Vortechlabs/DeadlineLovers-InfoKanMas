import React from 'react';
import { CheckCircle, XCircle, Clock, FileText, Download, ExternalLink } from 'lucide-react';

const RegulationList = ({ regulations }) => {
  const getStatusIcon = (status) => {
    const icons = {
      compliant: CheckCircle,
      non_compliant: XCircle,
      in_progress: Clock
    };
    const Icon = icons[status] || Clock;
    
    const colors = {
      compliant: 'text-green-600',
      non_compliant: 'text-red-600',
      in_progress: 'text-yellow-600'
    };

    return <Icon size={20} className={colors[status]} />;
  };

  const getStatusColor = (status) => {
    const colors = {
      compliant: 'border-green-200 bg-green-50',
      non_compliant: 'border-red-200 bg-red-50',
      in_progress: 'border-yellow-200 bg-yellow-50'
    };
    return colors[status] || 'border-gray-200';
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Regulatory Compliance</h3>
          <p className="text-sm text-gray-500 mt-1">Tracking against regulatory requirements</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors">
            <Download size={16} />
            Export
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {regulations.map((regulation) => (
          <div 
            key={regulation.id}
            className={`border-2 rounded-xl p-4 hover:shadow-md transition-all duration-300 ${getStatusColor(regulation.status)}`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-start gap-3 flex-1">
                {getStatusIcon(regulation.status)}
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <h4 className="font-semibold text-gray-900">{regulation.title}</h4>
                    <span className="text-xs text-gray-500 bg-white px-2 py-1 rounded-full ml-2">
                      {regulation.category}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{regulation.description}</p>
                  
                  {/* Requirements */}
                  <div className="mt-3">
                    <p className="text-xs font-medium text-gray-700 mb-2">Key Requirements:</p>
                    <ul className="text-xs text-gray-600 space-y-1">
                      {regulation.requirements.map((req, index) => (
                        <li key={index} className="flex items-center gap-2">
                          {req.compliant ? (
                            <CheckCircle size={12} className="text-green-600 flex-shrink-0" />
                          ) : (
                            <XCircle size={12} className="text-red-600 flex-shrink-0" />
                          )}
                          {req.description}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-gray-200">
              <div className="flex items-center gap-4 text-xs text-gray-500">
                <div className="flex items-center gap-1">
                  <FileText size={12} />
                  <span>Version {regulation.version}</span>
                </div>
                <span>Effective: {regulation.effectiveDate}</span>
                <span>Review: {regulation.nextReview}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1">
                  <ExternalLink size={14} />
                  Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RegulationList;