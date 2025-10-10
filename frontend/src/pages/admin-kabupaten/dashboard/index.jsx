import React, { useState } from 'react';
import { Calendar, TrendingUp, FileText, CheckCircle, Clock, XCircle, DollarSign, Shield } from 'lucide-react';

// Import komponen
import StatsCard from './StatsCard';
import BudgetCard from './BudgetCard';
import AlertCard from './AlertCard';
import TrendChart from './TrendChart';
import DistributionChart from './DistributionChart';
import RecentSubmissionsTable from './RecentSubmissionsTable';
import FraudDetectionCard from './FraudDetectionCard';
import FraudAnalysisModal from './FraudAnalysisModal';

const AdminKabupatenDashboard = () => {
  const [timeFilter, setTimeFilter] = useState('bulan_ini');
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [showFraudModal, setShowFraudModal] = useState(false);

  // Data statistik dengan fraud detection
  const stats = [
    {
      title: 'Total Pengajuan RAB',
      value: '156',
      change: '+12%',
      trend: 'up',
      icon: FileText,
      color: 'blue',
      description: 'dari bulan lalu'
    },
    {
      title: 'RAB Disetujui',
      value: '128',
      change: '+8%',
      trend: 'up',
      icon: CheckCircle,
      color: 'green',
      description: 'dari bulan lalu'
    },
    {
      title: 'Menunggu Review',
      value: '23',
      change: '-5%',
      trend: 'down',
      icon: Clock,
      color: 'yellow',
      description: 'dari bulan lalu'
    },
    {
      title: 'RAB Berisiko Tinggi',
      value: '7',
      change: '+40%',
      trend: 'up',
      icon: Shield,
      color: 'red',
      description: 'perlu perhatian khusus'
    }
  ];

  // Data anggaran
  const budgetStats = [
    {
      title: 'Total Anggaran',
      value: 'Rp 45,2 M',
      icon: DollarSign,
      color: 'blue'
    },
    {
      title: 'Dana Tersalurkan',
      value: 'Rp 38,7 M',
      percentage: '85.6%',
      icon: TrendingUp,
      color: 'green'
    },
    {
      title: 'Sisa Anggaran',
      value: 'Rp 6,5 M',
      percentage: '14.4%',
      icon: DollarSign,
      color: 'yellow'
    }
  ];

  // Data grafik trend pengajuan
  const trendData = [
    { bulan: 'Jan', pengajuan: 45, disetujui: 38, ditolak: 7 },
    { bulan: 'Feb', pengajuan: 52, disetujui: 45, ditolak: 7 },
    { bulan: 'Mar', pengajuan: 48, disetujui: 42, ditolak: 6 },
    { bulan: 'Apr', pengajuan: 61, disetujui: 53, ditolak: 8 },
    { bulan: 'Mei', pengajuan: 55, disetujui: 48, ditolak: 7 },
    { bulan: 'Jun', pengajuan: 67, disetujui: 58, ditolak: 9 }
  ];

  // Data distribusi anggaran per daerah
  const regionalData = [
    { name: 'Jawa Barat', value: 8500, color: '#3b82f6' },
    { name: 'Jawa Timur', value: 7200, color: '#10b981' },
    { name: 'Jawa Tengah', value: 6800, color: '#f59e0b' },
    { name: 'Sumatra Utara', value: 5400, color: '#8b5cf6' },
    { name: 'Sulawesi Selatan', value: 4800, color: '#ec4899' },
    { name: 'Lainnya', value: 12500, color: '#6b7280' }
  ];

  // Data pengajuan terbaru dengan info risiko
  const recentSubmissions = [
    {
      id: 'RAB-2025-001',
      region: 'Jawa Barat',
      program: 'Bantuan Sosial PKH',
      amount: 'Rp 850 Juta',
      status: 'pending',
      date: '2 jam lalu',
      priority: 'high',
      riskLevel: 'high',
      programData: { id: 1, nama_program: 'Bantuan Sosial PKH', anggaran_total: 850000000 }
    },
    {
      id: 'RAB-2025-002',
      region: 'Jawa Timur',
      program: 'Program Sembako',
      amount: 'Rp 620 Juta',
      status: 'review',
      date: '5 jam lalu',
      priority: 'medium',
      riskLevel: 'medium',
      programData: { id: 2, nama_program: 'Program Sembako', anggaran_total: 620000000 }
    },
    {
      id: 'RAB-2025-003',
      region: 'Sumatra Utara',
      program: 'Rehabilitasi Sosial',
      amount: 'Rp 450 Juta',
      status: 'approved',
      date: '1 hari lalu',
      priority: 'low',
      riskLevel: 'low',
      programData: { id: 3, nama_program: 'Rehabilitasi Sosial', anggaran_total: 450000000 }
    },
    {
      id: 'RAB-2025-004',
      region: 'Sulawesi Selatan',
      program: 'Bantuan Pangan',
      amount: 'Rp 380 Juta',
      status: 'approved',
      date: '1 hari lalu',
      priority: 'medium',
      riskLevel: 'critical',
      programData: { id: 4, nama_program: 'Bantuan Pangan', anggaran_total: 380000000 }
    }
  ];

  // Data alert termasuk fraud detection
  const alerts = [
    {
      id: 1,
      type: 'warning',
      title: 'RAB Mendekati Deadline',
      message: '5 pengajuan RAB akan melewati batas waktu review dalam 24 jam',
      time: '30 menit lalu'
    },
    {
      id: 2,
      type: 'info',
      title: 'Laporan Masyarakat Baru',
      message: '3 laporan baru memerlukan verifikasi',
      time: '2 jam lalu'
    },
    {
      id: 3,
      type: 'warning',
      title: 'Program Berisiko Tinggi Terdeteksi',
      message: 'AI mendeteksi 2 program dengan indikasi kecurangan',
      time: '1 jam lalu'
    }
  ];

  const handleReviewSubmission = (submission) => {
    console.log('Review submission:', submission);
    // Navigate to review page or open review modal
  };

  const handleFraudAnalysis = (program) => {
    setSelectedProgram(program);
    setShowFraudModal(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      {/* Main Content */}
      <div className="w-full max-w-full">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-4 sm:px-6 py-6 w-full max-w-full">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 w-full max-w-full">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-sm text-gray-500 mt-1">Monitor dan kelola anggaran sosial secara real-time</p>
            </div>
            <div className="flex items-center gap-3">
              <select 
                value={timeFilter}
                onChange={(e) => setTimeFilter(e.target.value)}
                className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="hari_ini">Hari Ini</option>
                <option value="minggu_ini">Minggu Ini</option>
                <option value="bulan_ini">Bulan Ini</option>
                <option value="tahun_ini">Tahun Ini</option>
              </select>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center gap-2">
                <Calendar size={16} />
                Export Laporan
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 space-y-6 w-full max-w-full">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <StatsCard key={index} {...stat} />
            ))}
          </div>

          {/* Budget Overview & Fraud Detection */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            {/* Budget Cards */}
            <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-4">
              {budgetStats.map((item, index) => (
                <BudgetCard key={index} {...item} />
              ))}
            </div>
            
            {/* Fraud Detection Card */}
            <FraudDetectionCard 
              program={recentSubmissions[0]?.programData}
              onAnalyzeClick={() => handleFraudAnalysis(recentSubmissions[0]?.programData)}
            />
          </div>

          {/* Alerts */}
          <AlertCard alerts={alerts} />

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <TrendChart 
              data={trendData}
              title="Trend Pengajuan RAB"
              description="6 bulan terakhir"
            />
            <DistributionChart 
              data={regionalData}
              title="Distribusi Anggaran"
              description="Per provinsi (dalam juta)"
            />
          </div>

          {/* Recent Submissions */}
          <RecentSubmissionsTable 
            submissions={recentSubmissions}
            onReview={handleReviewSubmission}
          />
        </div>
      </div>

      {/* Fraud Analysis Modal */}
      {showFraudModal && (
        <FraudAnalysisModal
          program={selectedProgram}
          isOpen={showFraudModal}
          onClose={() => setShowFraudModal(false)}
        />
      )}
    </div>
  );
};

export default AdminKabupatenDashboard;