import React from 'react';
import { CheckCircle, XCircle, Clock, AlertTriangle, FileText, User } from 'lucide-react';

const AuditTimeline = ({ audits }) => {
  const getStatusIcon = (status) => {
    const icons = {
      completed: CheckCircle,
      failed: XCircle,
      pending: Clock,
      warning: AlertTriangle
    };
    const Icon = icons[status] || Clock;
    
    const colors = {
      completed: 'text-green-500 bg-green-50',
      failed: 'text-red-500 bg-red-50',
      pending: 'text-yellow-500 bg-yellow-50',
      warning: 'text-orange-500 bg-orange-50'
    };

    return <Icon size={16} className={colors[status]} />;
  };

  const getStatusColor = (status) => {
    const colors = {
      completed: 'border-green-200',
      failed: 'border-red-200',
      pending: 'border-yellow-200',
      warning: 'border-orange-200'
    };
    return colors[status] || 'border-gray-200';
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Recent Audit Trail</h3>
      
      <div className="space-y-4">
        {audits.map((audit, index) => (
          <div 
            key={audit.id}
            className={`p-4 rounded-xl border-2 ${getStatusColor(audit.status)} hover:shadow-md transition-all duration-300`}
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-3">
                {getStatusIcon(audit.status)}
                <div>
                  <h4 className="font-semibold text-gray-900">{audit.title}</h4>
                  <p className="text-sm text-gray-600">{audit.description}</p>
                </div>
              </div>
              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                {audit.date}
              </span>
            </div>
            
            <div className="flex items-center justify-between mt-3">
              <div className="flex items-center gap-4 text-xs text-gray-500">
                <div className="flex items-center gap-1">
                  <User size={12} />
                  <span>{audit.auditor}</span>
                </div>
                <div className="flex items-center gap-1">
                  <FileText size={12} />
                  <span>{audit.category}</span>
                </div>
              </div>
              
              {audit.issues > 0 && (
                <span className="text-xs font-medium text-red-600 bg-red-50 px-2 py-1 rounded-full">
                  {audit.issues} finding{audit.issues > 1 ? 's' : ''}
                </span>
              )}
            </div>
            
            {/* Findings */}
            {audit.findings && audit.findings.length > 0 && (
              <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                <p className="text-xs font-medium text-gray-700 mb-2">Key Findings:</p>
                <ul className="text-xs text-gray-600 space-y-1">
                  {audit.findings.slice(0, 2).map((finding, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <AlertTriangle size={10} className="text-yellow-600 mt-0.5 flex-shrink-0" />
                      {finding}
                    </li>
                  ))}
                  {audit.findings.length > 2 && (
                    <li className="text-gray-500">
                      +{audit.findings.length - 2} more findings
                    </li>
                  )}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AuditTimeline;