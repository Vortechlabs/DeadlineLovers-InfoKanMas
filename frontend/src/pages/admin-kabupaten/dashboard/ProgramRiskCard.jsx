// components/ProgramRiskCard.jsx
import React from 'react';
import { AlertTriangle, CheckCircle, Shield } from 'lucide-react';

const ProgramRiskCard = ({ program, onAnalyzeClick }) => {
  const getRiskBadge = (level) => {
    const config = {
      low: { color: 'bg-green-100 text-green-800', icon: CheckCircle },
      medium: { color: 'bg-yellow-100 text-yellow-800', icon: AlertTriangle },
      high: { color: 'bg-orange-100 text-orange-800', icon: AlertTriangle },
      critical: { color: 'bg-red-100 text-red-800', icon: AlertTriangle }
    };
    
    const { color, icon: Icon } = config[level] || config.low;
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${color}`}>
        <Icon className="h-3 w-3 mr-1" />
        {level.toUpperCase()}
      </span>
    );
  };

  return (
    <div className="bg-white rounded-lg border p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold flex items-center">
          <Shield className="h-4 w-4 mr-2 text-blue-600" />
          AI Fraud Detection
        </h3>
        {getRiskBadge(program.risk_level || 'low')}
      </div>
      
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span>Analisis Dilakukan:</span>
          <span>{program.fraud_analysis_count || 0} kali</span>
        </div>
        
        <div className="flex justify-between">
          <span>Item Mencurigakan:</span>
          <span className={program.suspicious_items_count > 0 ? 'text-red-600 font-medium' : ''}>
            {program.suspicious_items_count || 0}
          </span>
        </div>
      </div>
      
      <button
        onClick={onAnalyzeClick}
        className="w-full mt-3 bg-blue-600 text-white py-2 px-4 rounded text-sm font-medium hover:bg-blue-700"
      >
        Jalankan Analisis AI
      </button>
    </div>
  );
};

export default ProgramRiskCard;