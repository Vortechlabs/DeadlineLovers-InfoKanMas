import React, { useState } from 'react';
import { 
  Shield, 
  FileCheck, 
  AlertTriangle, 
  CheckCircle, 
  TrendingUp,
  Filter,
  Download,
  RefreshCw,
  BarChart3,
  Clock,
  Users,
  Settings
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from 'recharts';

import ComplianceScoreCard from './ComplianceScoreCard';
import AuditTimeline from './AuditTimeline';
import RiskMatrix from './RiskMatrix';
import RegulationList from './RegulationList';

const CompliancePage = () => {
  const [timeRange, setTimeRange] = useState('90d');
  const [view, setView] = useState('overview');

  // Compliance Scores Data
  const complianceScores = [
    {
      title: 'Overall Compliance',
      score: 87,
      trend: 2.5,
      status: 'good',
      icon: Shield,
      color: 'bg-gradient-to-br from-blue-500 to-blue-600',
      issues: 3
    },
    {
      title: 'Financial Compliance',
      score: 92,
      trend: 1.2,
      status: 'excellent',
      icon: FileCheck,
      color: 'bg-gradient-to-br from-green-500 to-green-600',
      issues: 1
    },
    {
      title: 'Operational Compliance',
      score: 78,
      trend: -1.5,
      status: 'warning',
      icon: Settings,
      color: 'bg-gradient-to-br from-yellow-500 to-yellow-600',
      issues: 5
    },
    {
      title: 'Data Privacy',
      score: 95,
      trend: 3.1,
      status: 'excellent',
      icon: Users,
      color: 'bg-gradient-to-br from-purple-500 to-purple-600',
      issues: 0
    }
  ];

  // Audit Data
  const auditData = [
    {
      id: 1,
      title: 'Q1 2025 Financial Audit',
      description: 'Comprehensive review of financial transactions and reporting',
      status: 'completed',
      date: '2025-03-15',
      auditor: 'Internal Audit Team',
      category: 'Financial',
      issues: 2,
      findings: [
        'Minor discrepancies in expense reporting',
        'Documentation missing for 3 transactions'
      ]
    },
    {
      id: 2,
      title: 'Data Privacy Compliance Check',
      description: 'Assessment of GDPR and local data protection compliance',
      status: 'completed',
      date: '2025-03-10',
      auditor: 'Compliance Office',
      category: 'Data Privacy',
      issues: 0,
      findings: []
    },
    {
      id: 3,
      title: 'Operational Process Review',
      description: 'Evaluation of operational procedures and controls',
      status: 'warning',
      date: '2025-03-08',
      auditor: 'Quality Assurance',
      category: 'Operational',
      issues: 4,
      findings: [
        'Inconsistent documentation across departments',
        'Training records incomplete for new staff',
        'Process deviations in 2 departments'
      ]
    },
    {
      id: 4,
      title: 'Vendor Compliance Assessment',
      description: 'Review of third-party vendor compliance standards',
      status: 'pending',
      date: '2025-03-20',
      auditor: 'Procurement Team',
      category: 'Vendor',
      issues: 0,
      findings: []
    }
  ];

  // Risk Data for Matrix
  const riskData = [
    {
      id: 1,
      title: 'Incomplete Documentation',
      description: 'Missing supporting documents for financial transactions',
      impact: 2, // High
      probability: 3, // Likely
      severity: 'high',
      category: 'Financial',
      lastUpdated: '2025-03-12',
      mitigation: 'Implement automated document tracking system'
    },
    {
      id: 2,
      title: 'Data Privacy Violation',
      description: 'Potential exposure of sensitive personal data',
      impact: 3, // Critical
      probability: 1, // Unlikely
      severity: 'critical',
      category: 'Data Privacy',
      lastUpdated: '2025-03-10',
      mitigation: 'Enhanced encryption and access controls'
    },
    {
      id: 3,
      title: 'Process Non-compliance',
      description: 'Departments not following established procedures',
      impact: 1, // Medium
      probability: 3, // Likely
      severity: 'medium',
      category: 'Operational',
      lastUpdated: '2025-03-08',
      mitigation: 'Additional training and monitoring'
    }
  ];

  // Regulation Data
  const regulationData = [
    {
      id: 1,
      title: 'Financial Accountability Act',
      description: 'Regulations governing financial transparency and reporting',
      status: 'compliant',
      category: 'Financial',
      version: '2.1',
      effectiveDate: '2024-01-01',
      nextReview: '2025-06-30',
      requirements: [
        { description: 'Quarterly financial reporting', compliant: true },
        { description: 'External audit requirement', compliant: true },
        { description: 'Whistleblower protection', compliant: true }
      ]
    },
    {
      id: 2,
      title: 'Data Protection Regulation',
      description: 'Requirements for personal data handling and privacy',
      status: 'compliant',
      category: 'Data Privacy',
      version: '1.4',
      effectiveDate: '2023-05-15',
      nextReview: '2025-09-15',
      requirements: [
        { description: 'Data encryption standards', compliant: true },
        { description: 'User consent management', compliant: true },
        { description: 'Data breach notification', compliant: true }
      ]
    },
    {
      id: 3,
      title: 'Operational Safety Standards',
      description: 'Health and safety requirements for operational activities',
      status: 'in_progress',
      category: 'Operational',
      version: '3.2',
      effectiveDate: '2024-03-01',
      nextReview: '2025-04-30',
      requirements: [
        { description: 'Safety training completion', compliant: true },
        { description: 'Equipment maintenance logs', compliant: false },
        { description: 'Emergency procedure drills', compliant: true }
      ]
    }
  ];

  // Compliance Trend Data
  const complianceTrendData = [
    { month: 'Oct', overall: 82, financial: 85, operational: 78 },
    { month: 'Nov', overall: 84, financial: 88, operational: 79 },
    { month: 'Dec', overall: 85, financial: 90, operational: 80 },
    { month: 'Jan', overall: 86, financial: 91, operational: 81 },
    { month: 'Feb', overall: 87, financial: 92, operational: 82 },
    { month: 'Mar', overall: 87, financial: 92, operational: 78 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 p-4 sm:p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Compliance Dashboard</h1>
            <p className="text-gray-600">Monitor and manage regulatory compliance across all operations</p>
          </div>
          <div className="flex items-center gap-3">
            <select 
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-xl text-sm font-medium bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="30d">30 Days</option>
              <option value="90d">90 Days</option>
              <option value="1y">1 Year</option>
            </select>
            
            <div className="flex bg-gray-100 rounded-xl p-1">
              {['overview', 'risks', 'regulations', 'audits'].map((viewMode) => (
                <button
                  key={viewMode}
                  onClick={() => setView(viewMode)}
                  className={`px-4 py-2 text-sm font-medium rounded-lg capitalize transition-all ${
                    view === viewMode 
                      ? 'bg-white shadow-sm text-blue-600' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {viewMode}
                </button>
              ))}
            </div>
            
            <button className="p-2 bg-white border border-gray-300 rounded-xl hover:shadow-md transition-all">
              <Filter size={20} className="text-gray-600" />
            </button>
            <button className="p-2 bg-white border border-gray-300 rounded-xl hover:shadow-md transition-all">
              <Download size={20} className="text-gray-600" />
            </button>
            <button className="p-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all">
              <RefreshCw size={20} />
            </button>
          </div>
        </div>

        {/* Compliance Score Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
          {complianceScores.map((score, index) => (
            <ComplianceScoreCard key={index} {...score} />
          ))}
        </div>
      </div>

      {/* Main Content Grid */}
      {view === 'overview' && (
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">
          {/* Compliance Trend Chart */}
          <div className="xl:col-span-2">
            <div className="bg-white rounded-2xl p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Compliance Trend Analysis</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={complianceTrendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                  <XAxis 
                    dataKey="month" 
                    stroke="#9ca3af"
                    fontSize={12}
                  />
                  <YAxis 
                    stroke="#9ca3af"
                    fontSize={12}
                    domain={[70, 100]}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white',
                      border: 'none',
                      borderRadius: '12px',
                      boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                      fontSize: '12px'
                    }}
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="overall" 
                    stroke="#3b82f6" 
                    strokeWidth={3}
                    strokeLinecap="round"
                    dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, fill: '#2563eb' }}
                    name="Overall"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="financial" 
                    stroke="#10b981" 
                    strokeWidth={3}
                    strokeLinecap="round"
                    dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, fill: '#059669' }}
                    name="Financial"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="operational" 
                    stroke="#f59e0b" 
                    strokeWidth={3}
                    strokeLinecap="round"
                    dot={{ fill: '#f59e0b', strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, fill: '#d97706' }}
                    name="Operational"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Audit Timeline */}
          <div className="xl:col-span-1">
            <AuditTimeline audits={auditData} />
          </div>
        </div>
      )}

      {/* Risk Matrix View */}
      {view === 'risks' && (
        <div className="grid grid-cols-1 gap-6 mb-6">
          <RiskMatrix risks={riskData} />
        </div>
      )}

      {/* Regulations View */}
      {view === 'regulations' && (
        <div className="grid grid-cols-1 gap-6 mb-6">
          <RegulationList regulations={regulationData} />
        </div>
      )}

      {/* Audits View */}
      {view === 'audits' && (
        <div className="grid grid-cols-1 gap-6 mb-6">
          <AuditTimeline audits={auditData} />
        </div>
      )}

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
        {[
          { label: 'Open Issues', value: '8', color: 'text-red-600' },
          { label: 'Pending Actions', value: '12', color: 'text-yellow-600' },
          { label: 'Completed Audits', value: '24', color: 'text-green-600' },
          { label: 'Compliance Rate', value: '94.2%', color: 'text-blue-600' }
        ].map((stat, index) => (
          <div key={index} className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-gray-200/50">
            <div className={`text-2xl font-bold ${stat.color} mb-1`}>{stat.value}</div>
            <div className="text-sm text-gray-600">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompliancePage;