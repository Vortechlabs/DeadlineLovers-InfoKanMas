import React, { useState } from 'react';
import { AlertTriangle, Info } from 'lucide-react';

const RiskMatrix = ({ risks }) => {
  const [selectedRisk, setSelectedRisk] = useState(null);

  const impactLevels = ['Low', 'Medium', 'High', 'Critical'];
  const probabilityLevels = ['Rare', 'Unlikely', 'Possible', 'Likely', 'Certain'];

  const getRiskColor = (impact, probability) => {
    const riskScore = (impact + 1) * (probability + 1);
    
    if (riskScore >= 16) return 'bg-red-500'; // Critical
    if (riskScore >= 12) return 'bg-orange-500'; // High
    if (riskScore >= 8) return 'bg-yellow-500'; // Medium
    if (riskScore >= 4) return 'bg-blue-500'; // Low
    return 'bg-green-500'; // Very Low
  };

  const getRiskLevel = (impact, probability) => {
    const riskScore = (impact + 1) * (probability + 1);
    
    if (riskScore >= 16) return 'Critical';
    if (riskScore >= 12) return 'High';
    if (riskScore >= 8) return 'Medium';
    if (riskScore >= 4) return 'Low';
    return 'Very Low';
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Risk Assessment Matrix</h3>
          <p className="text-sm text-gray-500 mt-1">Visual representation of compliance risks</p>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded bg-green-500"></div>
            <span>Low</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded bg-yellow-500"></div>
            <span>Medium</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded bg-orange-500"></div>
            <span>High</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded bg-red-500"></div>
            <span>Critical</span>
          </div>
        </div>
      </div>

      <div className="relative">
        {/* Y-axis Label */}
        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-8 -rotate-90 text-sm font-medium text-gray-700 whitespace-nowrap">
          Impact Level
        </div>

        {/* X-axis Label */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-8 text-sm font-medium text-gray-700">
          Probability Level
        </div>

        {/* Matrix Grid */}
        <div className="grid grid-cols-5 gap-2 ml-8">
          {/* Probability Headers */}
          <div className="col-start-2 col-span-5 grid grid-cols-5 gap-2 mb-2">
            {probabilityLevels.map((level, index) => (
              <div key={level} className="text-center text-xs font-medium text-gray-700 p-2">
                {level}
              </div>
            ))}
          </div>

          {/* Matrix Cells */}
          {impactLevels.map((impact, impactIndex) => (
            <React.Fragment key={impact}>
              {/* Impact Header */}
              <div className="text-xs font-medium text-gray-700 flex items-center justify-center p-2">
                {impact}
              </div>

              {/* Risk Cells */}
              {probabilityLevels.map((probability, probabilityIndex) => {
                const cellRisks = risks.filter(
                  risk => risk.impact === impactIndex && risk.probability === probabilityIndex
                );
                
                return (
                  <div
                    key={`${impactIndex}-${probabilityIndex}`}
                    className={`${getRiskColor(impactIndex, probabilityIndex)} rounded-lg p-3 min-h-[80px] cursor-pointer hover:opacity-80 transition-opacity relative group`}
                    onClick={() => cellRisks.length > 0 && setSelectedRisk({
                      impact: impactIndex,
                      probability: probabilityIndex,
                      risks: cellRisks,
                      level: getRiskLevel(impactIndex, probabilityIndex)
                    })}
                  >
                    {cellRisks.length > 0 && (
                      <>
                        <div className="text-white text-xs font-bold text-center">
                          {cellRisks.length}
                        </div>
                        <div className="text-white text-xs text-center opacity-90">
                          {getRiskLevel(impactIndex, probabilityIndex)}
                        </div>
                        
                        {/* Hover Tooltip */}
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block z-10">
                          <div className="bg-gray-900 text-white text-xs rounded py-1 px-2 whitespace-nowrap">
                            {cellRisks.length} risk{cellRisks.length > 1 ? 's' : ''} - {getRiskLevel(impactIndex, probabilityIndex)}
                          </div>
                          <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
                        </div>
                      </>
                    )}
                  </div>
                );
              })}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Risk Details Modal */}
      {selectedRisk && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">
                  Risk Details - {selectedRisk.level} Risk
                </h3>
                <button 
                  onClick={() => setSelectedRisk(null)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <Info size={20} className="text-gray-600" />
                </button>
              </div>
              <p className="text-sm text-gray-600 mt-1">
                Impact: {impactLevels[selectedRisk.impact]} • 
                Probability: {probabilityLevels[selectedRisk.probability]}
              </p>
            </div>

            <div className="p-6">
              <div className="space-y-4">
                {selectedRisk.risks.map((risk, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-gray-900">{risk.title}</h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        risk.severity === 'high' ? 'bg-red-100 text-red-800' :
                        risk.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {risk.severity}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700 mb-3">{risk.description}</p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>Category: {risk.category}</span>
                      <span>Last updated: {risk.lastUpdated}</span>
                    </div>
                    {risk.mitigation && (
                      <div className="mt-3 p-3 bg-green-50 rounded-lg">
                        <p className="text-xs font-medium text-green-800 mb-1">Mitigation Plan:</p>
                        <p className="text-xs text-green-700">{risk.mitigation}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RiskMatrix;