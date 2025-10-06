import React, { useState } from 'react';
import { 
  DollarSign, 
  Users, 
  Target, 
  TrendingUp, 
  BarChart3, 
  PieChart,
  Map,
  Clock,
  Filter,
  Download,
  RefreshCw
} from 'lucide-react';

import MetricCard from './MetricCard';
import { PerformanceChart, DonutChart, SparklineChart } from './AnalyticsChart';
import KpiGrid from './KpiGrid';
import HeatMap from './HeatMap';

const AnalyticsDashboard = () => {
  const [timeRange, setTimeRange] = useState('30d');
  const [viewMode, setViewMode] = useState('overview');

  // Mock data for charts
  const performanceData = [
    { name: 'Jan', anggaran: 4000, realisasi: 3800, target: 3900 },
    { name: 'Feb', anggaran: 4200, realisasi: 4100, target: 4000 },
    { name: 'Mar', anggaran: 3800, realisasi: 3900, target: 3800 },
    { name: 'Apr', anggaran: 4500, realisasi: 4400, target: 4300 },
    { name: 'Mei', anggaran: 4800, realisasi: 4700, target: 4600 },
    { name: 'Jun', anggaran: 5200, realisasi: 5100, target: 5000 }
  ];

  const budgetDistribution = [
    { name: 'Bantuan Sosial', value: 45 },
    { name: 'Kesehatan', value: 20 },
    { name: 'Pendidikan', value: 15 },
    { name: 'Infrastruktur', value: 12 },
    { name: 'Lainnya', value: 8 }
  ];

  const regionPerformance = [
    { name: 'Sleman', value: 85 },
    { name: 'Kota Yogya', value: 78 },
    { name: 'Bantul', value: 72 },
    { name: 'Kulon Progo', value: 68 },
    { name: 'Gunungkidul', value: 65 }
  ];

  const sparklineData = [
    { value: 45 }, { value: 52 }, { value: 48 }, { value: 55 }, 
    { value: 58 }, { value: 62 }, { value: 65 }, { value: 63 }
  ];

  const heatmapData = {
    1: { Mon: 25, Tue: 40, Wed: 35, Thu: 60, Fri: 45, Sat: 20, Sun: 15 },
    2: { Mon: 35, Tue: 50, Wed: 45, Thu: 70, Fri: 55, Sat: 30, Sun: 25 },
    3: { Mon: 45, Tue: 60, Wed: 55, Thu: 80, Fri: 65, Sat: 40, Sun: 35 },
    4: { Mon: 55, Tue: 70, Wed: 65, Thu: 90, Fri: 75, Sat: 50, Sun: 45 }
  };

  // Metric cards data
  const metrics = [
    {
      title: 'Total Anggaran',
      value: 'Rp 45.2M',
      change: '+12.5%',
      changeType: 'up',
      icon: DollarSign,
      color: 'bg-gradient-to-br from-blue-500 to-blue-600',
      chart: () => <SparklineChart data={sparklineData} color="#3b82f6" />,
      description: 'vs bulan lalu'
    },
    {
      title: 'Program Aktif',
      value: '42',
      change: '+3',
      changeType: 'up',
      icon: Target,
      color: 'bg-gradient-to-br from-green-500 to-green-600',
      chart: () => <SparklineChart data={sparklineData} color="#10b981" />,
      description: 'program baru'
    },
    {
      title: 'Penerima Manfaat',
      value: '12.4K',
      change: '+8.2%',
      changeType: 'up',
      icon: Users,
      color: 'bg-gradient-to-br from-purple-500 to-purple-600',
      chart: () => <SparklineChart data={sparklineData} color="#8b5cf6" />,
      description: 'growth rate'
    },
    {
      title: 'Avg Completion',
      value: '87%',
      change: '+2.1%',
      changeType: 'up',
      icon: TrendingUp,
      color: 'bg-gradient-to-br from-orange-500 to-orange-600',
      chart: () => <SparklineChart data={sparklineData} color="#f59e0b" />,
      description: 'vs target'
    }
  ];

  const chartColors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 p-4 sm:p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Analytics Dashboard</h1>
            <p className="text-gray-600">Real-time insights and performance metrics</p>
          </div>
          <div className="flex items-center gap-3">
            <select 
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-xl text-sm font-medium bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="7d">7 Days</option>
              <option value="30d">30 Days</option>
              <option value="90d">90 Days</option>
              <option value="1y">1 Year</option>
            </select>
            
            <div className="flex bg-gray-100 rounded-xl p-1">
              {['overview', 'performance', 'regional'].map((mode) => (
                <button
                  key={mode}
                  onClick={() => setViewMode(mode)}
                  className={`px-4 py-2 text-sm font-medium rounded-lg capitalize transition-all ${
                    viewMode === mode 
                      ? 'bg-white shadow-sm text-blue-600' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {mode}
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

        {/* KPI Grid */}
        <KpiGrid />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">
        {/* Performance Chart - Takes 2 columns */}
        <div className="xl:col-span-2">
          <PerformanceChart data={performanceData} type="line" />
        </div>

        {/* Donut Charts - Takes 1 column */}
        <div className="space-y-6">
          <DonutChart 
            data={budgetDistribution} 
            title="Budget Distribution"
            colors={chartColors}
          />
          <DonutChart 
            data={regionPerformance} 
            title="Regional Performance"
            colors={chartColors}
          />
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-6">
        {metrics.map((metric, index) => (
          <MetricCard key={index} {...metric} />
        ))}
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Heatmap */}
        <HeatMap data={heatmapData} title="Program Activity Heatmap" />
        
        {/* Recent Activity */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Recent Activity</h3>
          <div className="space-y-4">
            {[
              { action: 'Program approved', time: '2 min ago', type: 'success' },
              { action: 'Budget allocation updated', time: '1 hour ago', type: 'info' },
              { action: 'New report submitted', time: '3 hours ago', type: 'info' },
              { action: 'Risk alert detected', time: '5 hours ago', type: 'warning' },
              { action: 'Performance milestone achieved', time: '1 day ago', type: 'success' }
            ].map((activity, index) => (
              <div key={index} className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <div className={`w-2 h-2 rounded-full ${
                  activity.type === 'success' ? 'bg-green-500' :
                  activity.type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
                }`}></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
                <Clock size={16} className="text-gray-400" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Stats Footer */}
      <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
        {[
          { label: 'Data Accuracy', value: '98.7%', color: 'text-green-600' },
          { label: 'Update Frequency', value: 'Real-time', color: 'text-blue-600' },
          { label: 'AI Confidence', value: '94.2%', color: 'text-purple-600' },
          { label: 'System Uptime', value: '99.9%', color: 'text-green-600' }
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

export default AnalyticsDashboard;