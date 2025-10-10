import React, { useState, useEffect } from 'react';
import { Shield, AlertTriangle, CheckCircle, TrendingUp, Eye } from 'lucide-react';
import AiFraudDetectionService from '@/services/AiFraudDetectionService';

const FraudDetectionCard = ({ program, onAnalyzeClick }) => {
  const [analysisSummary, setAnalysisSummary] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (program?.id) {
      loadAnalysisSummary();
    }
  }, [program?.id]);

  const loadAnalysisSummary = async () => {
    try {
      setLoading(true);
      const response = await AiFraudDetectionService.comprehensiveProgramAnalysis(program.id);
      setAnalysisSummary(response.data);
    } catch (error) {
      console.error('Failed to load analysis summary:', error);
    } finally {
      setLoading(false);
    }
  };

  const getRiskColor = (level) => {
    switch (level) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getRiskIcon = (level) => {
    switch (level) {
      case 'critical':
      case 'high':
        return <AlertTriangle className="h-4 w-4" />;
      case 'medium':
        return <AlertTriangle className="h-4 w-4" />;
      case 'low':
        return <CheckCircle className="h-4 w-4" />;
      default:
        return <Shield className="h-4 w-4" />;
    }
  };

  const getRiskScoreColor = (score) => {
    if (score >= 80) return 'text-red-600';
    if (score >= 60) return 'text-orange-600';
    if (score >= 40) return 'text-yellow-600';
    return 'text-green-600';
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl p-5 border border-gray-200">
        <div className="animate-pulse">
          <div className="flex items-center justify-between mb-3">
            <div className="h-4 bg-gray-200 rounded w-1/3"></div>
            <div className="h-6 bg-gray-200 rounded w-1/4"></div>
          </div>
          <div className="space-y-2">
            <div className="h-3 bg-gray-200 rounded"></div>
            <div className="h-3 bg-gray-200 rounded w-2/3"></div>
          </div>
        </div>
      </div>
    );
  }

  const riskLevel = analysisSummary?.results?.level_risiko_keseluruhan || 'unknown';
  const riskScore = analysisSummary?.results?.skor_risiko_keseluruhan || 0;
  const suspiciousItems = analysisSummary?.results?.item_berisiko || [];

  return (
    <div className="bg-white rounded-xl p-5 border border-gray-200 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
            <Shield className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">AI Fraud Detection</h3>
            <p className="text-sm text-gray-500">Analisis risiko program</p>
          </div>
        </div>
        <div className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium border ${getRiskColor(riskLevel)}`}>
          {getRiskIcon(riskLevel)}
          <span>{riskLevel.toUpperCase()}</span>
        </div>
      </div>

      {/* Risk Score */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-600">Skor Risiko</span>
          <span className={`text-lg font-bold ${getRiskScoreColor(riskScore)}`}>
            {riskScore}/100
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className={`h-2 rounded-full ${
              riskScore >= 80 ? 'bg-red-500' :
              riskScore >= 60 ? 'bg-orange-500' :
              riskScore >= 40 ? 'bg-yellow-500' : 'bg-green-500'
            }`}
            style={{ width: `${riskScore}%` }}
          ></div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="text-center">
          <div className="text-lg font-bold text-gray-900">{suspiciousItems.length}</div>
          <div className="text-xs text-gray-500">Item Mencurigakan</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-gray-900">
            {analysisSummary?.data?.total_analyses || 0}
          </div>
          <div className="text-xs text-gray-500">Analisis Dilakukan</div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="flex gap-2">
        <button
          onClick={onAnalyzeClick}
          className="flex-1 bg-blue-600 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
        >
          <Eye className="h-4 w-4" />
          Detail Analisis
        </button>
        <button
          onClick={loadAnalysisSummary}
          className="px-3 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors flex items-center justify-center"
          title="Refresh Analisis"
        >
          <TrendingUp className="h-4 w-4" />
        </button>
      </div>

      {/* Quick Alert */}
      {riskScore >= 60 && (
        <div className="mt-3 p-2 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
          <AlertTriangle className="h-4 w-4 text-red-600 flex-shrink-0" />
          <div className="text-xs text-red-700">
            <strong>Perhatian:</strong> Program memiliki risiko tinggi. Disarankan untuk review mendalam.
          </div>
        </div>
      )}
    </div>
  );
};

export default FraudDetectionCard;