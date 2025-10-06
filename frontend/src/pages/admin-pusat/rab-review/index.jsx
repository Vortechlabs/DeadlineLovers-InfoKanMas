import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Download,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
  TrendingUp,
  FileText,
  MapPin,
  Calendar,
  DollarSign,
  ChevronDown,
  ChevronRight,
  Star,
  Shield
} from 'lucide-react';

// ============= COMPONENTS =============

// RAB Card Component
const RABCard = ({ rab, onViewDetail, onApprove, onReject }) => {
  const getStatusColor = (status) => {
    const colors = {
      pending: 'border-yellow-300 bg-yellow-50',
      review: 'border-blue-300 bg-blue-50',
      approved: 'border-green-300 bg-green-50',
      rejected: 'border-red-300 bg-red-50'
    };
    return colors[status] || colors.pending;
  };

  const getAIScoreColor = (score) => {
    if (score >= 80) return 'text-green-600 bg-green-50';
    if (score >= 60) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  const getFraudRiskColor = (risk) => {
    const colors = {
      low: 'text-green-600 bg-green-50 border-green-200',
      medium: 'text-yellow-600 bg-yellow-50 border-yellow-200',
      high: 'text-red-600 bg-red-50 border-red-200',
      critical: 'text-red-700 bg-red-100 border-red-300'
    };
    return colors[risk] || colors.medium;
  };

  return (
    <div className={`rounded-xl border-2 p-5 hover:shadow-lg transition-all ${getStatusColor(rab.status)}`}>
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-lg font-bold text-gray-900">{rab.id}</h3>
            {rab.priority === 'high' && (
              <span className="px-2 py-1 bg-red-500 text-white text-xs font-bold rounded-full">
                URGENT
              </span>
            )}
          </div>
          <p className="text-sm text-gray-600 flex items-center gap-1">
            <MapPin size={14} />
            {rab.region}
          </p>
        </div>
        
        {/* AI Score Badge */}
        <div className="text-right">
          <div className={`px-3 py-1.5 rounded-lg ${getAIScoreColor(rab.aiScore)} inline-flex items-center gap-2 mb-2`}>
            <Star size={16} fill="currentColor" />
            <span className="font-bold text-lg">{rab.aiScore}</span>
          </div>
          <p className="text-xs text-gray-500">AI Score</p>
        </div>
      </div>

      {/* Program Info */}
      <div className="mb-4 p-3 bg-white rounded-lg border border-gray-200">
        <p className="text-sm font-semibold text-gray-900 mb-1">{rab.programName}</p>
        <p className="text-xs text-gray-500">{rab.category}</p>
      </div>

      {/* Budget & Beneficiaries */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-white rounded-lg p-3 border border-gray-200">
          <p className="text-xs text-gray-500 mb-1">Total Anggaran</p>
          <p className="text-sm font-bold text-gray-900">{rab.totalBudget}</p>
        </div>
        <div className="bg-white rounded-lg p-3 border border-gray-200">
          <p className="text-xs text-gray-500 mb-1">Penerima Manfaat</p>
          <p className="text-sm font-bold text-gray-900">{rab.beneficiaries} orang</p>
        </div>
      </div>

      {/* AI Fraud Detection */}
      <div className={`mb-4 p-3 rounded-lg border ${getFraudRiskColor(rab.fraudRisk)}`}>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Shield size={16} />
            <span className="text-sm font-semibold">Fraud Risk: {rab.fraudRisk.toUpperCase()}</span>
          </div>
          <span className="text-xs font-bold">{rab.fraudScore}%</span>
        </div>
        {rab.redFlags && rab.redFlags.length > 0 && (
          <div className="mt-2 space-y-1">
            {rab.redFlags.slice(0, 2).map((flag, idx) => (
              <div key={idx} className="flex items-start gap-2">
                <AlertTriangle size={12} className="mt-0.5 flex-shrink-0" />
                <p className="text-xs">{flag}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* AI Recommendation */}
      <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
        <div className="flex items-start gap-2">
          <TrendingUp size={16} className="text-blue-600 mt-0.5" />
          <div>
            <p className="text-xs font-semibold text-blue-900 mb-1">AI Recommendation</p>
            <p className="text-xs text-blue-700">{rab.aiRecommendation}</p>
          </div>
        </div>
      </div>

      {/* Meta Info */}
      <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
        <div className="flex items-center gap-1">
          <Calendar size={12} />
          <span>{rab.submittedDate}</span>
        </div>
        <div className="flex items-center gap-1">
          <Clock size={12} />
          <span>Deadline: {rab.deadline}</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <button 
          onClick={() => onViewDetail(rab)}
          className="flex-1 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
        >
          <Eye size={16} />
          Detail
        </button>
        {rab.status === 'pending' && (
          <>
            <button 
              onClick={() => onReject(rab)}
              className="px-4 py-2 bg-red-500 text-white rounded-lg text-sm font-medium hover:bg-red-600 transition-colors flex items-center gap-2"
            >
              <XCircle size={16} />
              Tolak
            </button>
            <button 
              onClick={() => onApprove(rab)}
              className="px-4 py-2 bg-green-500 text-white rounded-lg text-sm font-medium hover:bg-green-600 transition-colors flex items-center gap-2"
            >
              <CheckCircle size={16} />
              Setujui
            </button>
          </>
        )}
      </div>
    </div>
  );
};

// Filter Section Component
const FilterSection = ({ filters, setFilters, stats }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Filter size={20} className="text-gray-600" />
          <h3 className="font-semibold text-gray-900">Filter & Pencarian</h3>
        </div>
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-blue-600 text-sm font-medium flex items-center gap-1"
        >
          {isExpanded ? 'Sembunyikan' : 'Tampilkan'} Filter
          <ChevronDown size={16} className={`transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative mb-4">
        <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Cari berdasarkan ID, daerah, atau program..."
          value={filters.search}
          onChange={(e) => setFilters({ ...filters, search: e.target.value })}
          className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Expanded Filters */}
      {isExpanded && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <select
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">Semua Status</option>
            <option value="pending">Menunggu Review</option>
            <option value="review">Sedang Direview</option>
            <option value="approved">Disetujui</option>
            <option value="rejected">Ditolak</option>
          </select>

          <select
            value={filters.fraudRisk}
            onChange={(e) => setFilters({ ...filters, fraudRisk: e.target.value })}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">Semua Risk Level</option>
            <option value="low">Low Risk</option>
            <option value="medium">Medium Risk</option>
            <option value="high">High Risk</option>
            <option value="critical">Critical Risk</option>
          </select>

          <select
            value={filters.aiScore}
            onChange={(e) => setFilters({ ...filters, aiScore: e.target.value })}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">Semua AI Score</option>
            <option value="high">Tinggi (≥80)</option>
            <option value="medium">Sedang (60-79)</option>
            <option value="low">Rendah (&lt;60)</option>
          </select>

          <select
            value={filters.priority}
            onChange={(e) => setFilters({ ...filters, priority: e.target.value })}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">Semua Prioritas</option>
            <option value="high">Urgent</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
      )}

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4 pt-4 border-t border-gray-200">
        <div className="text-center">
          <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
          <p className="text-xs text-gray-500">Menunggu</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-blue-600">{stats.review}</p>
          <p className="text-xs text-gray-500">Review</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-green-600">{stats.approved}</p>
          <p className="text-xs text-gray-500">Disetujui</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-red-600">{stats.rejected}</p>
          <p className="text-xs text-gray-500">Ditolak</p>
        </div>
      </div>
    </div>
  );
};

// Detail Modal Component
const DetailModal = ({ rab, onClose, onApprove, onReject }) => {
  if (!rab) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-xl max-w-4xl w-full my-8">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{rab.id}</h2>
            <p className="text-sm text-gray-500 mt-1">{rab.region}</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <XCircle size={24} className="text-gray-600" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[70vh] overflow-y-auto">
          {/* AI Analysis Section */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-5 mb-6 border border-blue-200">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <TrendingUp size={20} className="text-blue-600" />
              AI Analysis Summary
            </h3>
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="bg-white rounded-lg p-3 text-center">
                <p className="text-3xl font-bold text-blue-600">{rab.aiScore}</p>
                <p className="text-xs text-gray-600 mt-1">AI Score</p>
              </div>
              <div className="bg-white rounded-lg p-3 text-center">
                <p className="text-3xl font-bold text-red-600">{rab.fraudScore}%</p>
                <p className="text-xs text-gray-600 mt-1">Fraud Risk</p>
              </div>
              <div className="bg-white rounded-lg p-3 text-center">
                <p className="text-xl font-bold text-green-600">{rab.completeness}%</p>
                <p className="text-xs text-gray-600 mt-1">Completeness</p>
              </div>
            </div>
            <div className="bg-white rounded-lg p-4">
              <p className="text-sm font-semibold text-gray-900 mb-2">AI Recommendation:</p>
              <p className="text-sm text-gray-700">{rab.aiRecommendation}</p>
            </div>
          </div>

          {/* Red Flags */}
          {rab.redFlags && rab.redFlags.length > 0 && (
            <div className="bg-red-50 rounded-xl p-5 mb-6 border border-red-200">
              <h3 className="font-bold text-red-900 mb-3 flex items-center gap-2">
                <AlertTriangle size={20} />
                Red Flags Detected
              </h3>
              <ul className="space-y-2">
                {rab.redFlags.map((flag, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-red-800">
                    <span className="text-red-600 mt-0.5">•</span>
                    <span>{flag}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Program Details */}
          <div className="bg-gray-50 rounded-xl p-5 mb-6">
            <h3 className="font-bold text-gray-900 mb-4">Detail Program</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500 mb-1">Nama Program</p>
                <p className="text-sm font-semibold text-gray-900">{rab.programName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Kategori</p>
                <p className="text-sm font-semibold text-gray-900">{rab.category}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Total Anggaran</p>
                <p className="text-sm font-semibold text-gray-900">{rab.totalBudget}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Penerima Manfaat</p>
                <p className="text-sm font-semibold text-gray-900">{rab.beneficiaries} orang</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Durasi</p>
                <p className="text-sm font-semibold text-gray-900">{rab.duration}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Tanggal Pengajuan</p>
                <p className="text-sm font-semibold text-gray-900">{rab.submittedDate}</p>
              </div>
            </div>
          </div>

          {/* Documents */}
          <div className="bg-gray-50 rounded-xl p-5">
            <h3 className="font-bold text-gray-900 mb-4">Dokumen Pendukung</h3>
            <div className="space-y-2">
              {rab.documents.map((doc, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200">
                  <div className="flex items-center gap-3">
                    <FileText size={20} className="text-blue-600" />
                    <span className="text-sm font-medium text-gray-900">{doc.name}</span>
                  </div>
                  <button className="text-blue-600 text-sm font-medium hover:text-blue-700">
                    Download
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-gray-200 flex gap-3">
          <button 
            onClick={onClose}
            className="flex-1 px-4 py-2.5 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
          >
            Tutup
          </button>
          {rab.status === 'pending' && (
            <>
              <button 
                onClick={() => { onReject(rab); onClose(); }}
                className="flex-1 px-4 py-2.5 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition-colors flex items-center justify-center gap-2"
              >
                <XCircle size={18} />
                Tolak RAB
              </button>
              <button 
                onClick={() => { onApprove(rab); onClose(); }}
                className="flex-1 px-4 py-2.5 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
              >
                <CheckCircle size={18} />
                Setujui RAB
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

// ============= MAIN PAGE =============

const ReviewRABPage = () => {
  const [filters, setFilters] = useState({
    search: '',
    status: 'all',
    fraudRisk: 'all',
    aiScore: 'all',
    priority: 'all'
  });

  const [selectedRAB, setSelectedRAB] = useState(null);

  // Mock Data
  const rabData = [
    {
      id: 'RAB-2025-001',
      region: 'Kabupaten Sleman',
      programName: 'Bantuan Pangan Warga Miskin',
      category: 'Kesejahteraan Sosial',
      totalBudget: 'Rp 850 Juta',
      beneficiaries: 1200,
      duration: '6 bulan',
      status: 'pending',
      priority: 'high',
      aiScore: 92,
      fraudScore: 12,
      fraudRisk: 'low',
      completeness: 95,
      aiRecommendation: 'Auto-approve recommended. High quality submission with complete documentation and reasonable budget allocation.',
      redFlags: [],
      submittedDate: '2025-01-15',
      deadline: '2025-01-22',
      documents: [
        { name: 'Proposal Program.pdf', size: '2.4 MB' },
        { name: 'RAB Detail.xlsx', size: '1.2 MB' },
        { name: 'Surat Permohonan.pdf', size: '0.8 MB' }
      ]
    },
    {
      id: 'RAB-2025-002',
      region: 'Kota Yogyakarta',
      programName: 'Rehabilitasi Sosial Anak',
      category: 'Perlindungan Sosial',
      totalBudget: 'Rp 650 Juta',
      beneficiaries: 80,
      duration: '12 bulan',
      status: 'pending',
      priority: 'medium',
      aiScore: 58,
      fraudScore: 45,
      fraudRisk: 'medium',
      completeness: 78,
      aiRecommendation: 'Manual review required. Budget allocation shows some irregularities that need verification.',
      redFlags: [
        'Administrative cost 25% (normal: 10%)',
        'Budget per beneficiary 2.8x higher than similar programs',
        'Missing vendor verification documents'
      ],
      submittedDate: '2025-01-14',
      deadline: '2025-01-21',
      documents: [
        { name: 'Proposal Program.pdf', size: '1.8 MB' },
        { name: 'RAB Summary.xlsx', size: '0.9 MB' }
      ]
    },
    {
      id: 'RAB-2025-003',
      region: 'Kabupaten Bantul',
      programName: 'Program Sembako Lansia',
      category: 'Kesejahteraan Sosial',
      totalBudget: 'Rp 420 Juta',
      beneficiaries: 500,
      duration: '3 bulan',
      status: 'pending',
      priority: 'high',
      aiScore: 28,
      fraudScore: 82,
      fraudRisk: 'critical',
      completeness: 62,
      aiRecommendation: 'REJECT - Multiple critical fraud indicators detected. Immediate investigation recommended.',
      redFlags: [
        'Document metadata inconsistent with submission date',
        'Duplicate items from previously rejected RAB',
        'Vendor pattern matches known fraud cases',
        'Unrealistic timeline for program scale',
        'Missing required legal documents'
      ],
      submittedDate: '2025-01-13',
      deadline: '2025-01-20',
      documents: [
        { name: 'Proposal.pdf', size: '1.1 MB' }
      ]
    },
    {
      id: 'RAB-2025-004',
      region: 'Kabupaten Kulon Progo',
      programName: 'Pelatihan Keterampilan Kerja',
      category: 'Pemberdayaan Sosial',
      totalBudget: 'Rp 780 Juta',
      beneficiaries: 200,
      duration: '9 bulan',
      status: 'review',
      priority: 'medium',
      aiScore: 75,
      fraudScore: 28,
      fraudRisk: 'low',
      completeness: 88,
      aiRecommendation: 'Approve with minor clarifications. Good program design with realistic budget.',
      redFlags: [
        'Equipment cost slightly above market average'
      ],
      submittedDate: '2025-01-12',
      deadline: '2025-01-19',
      documents: [
        { name: 'Proposal Lengkap.pdf', size: '3.2 MB' },
        { name: 'RAB Detail.xlsx', size: '1.5 MB' },
        { name: 'MoU Vendor.pdf', size: '1.0 MB' },
        { name: 'Timeline Program.pdf', size: '0.6 MB' }
      ]
    }
  ];

  const stats = {
    pending: rabData.filter(r => r.status === 'pending').length,
    review: rabData.filter(r => r.status === 'review').length,
    approved: rabData.filter(r => r.status === 'approved').length,
    rejected: rabData.filter(r => r.status === 'rejected').length
  };

  const handleApprove = (rab) => {
    alert(`RAB ${rab.id} disetujui!`);
  };

  const handleReject = (rab) => {
    alert(`RAB ${rab.id} ditolak!`);
  };

  const handleExport = () => {
    alert('Export laporan...');
  };

  // Filter logic
  const filteredData = rabData.filter(rab => {
    if (filters.status !== 'all' && rab.status !== filters.status) return false;
    if (filters.fraudRisk !== 'all' && rab.fraudRisk !== filters.fraudRisk) return false;
    if (filters.priority !== 'all' && rab.priority !== filters.priority) return false;
    if (filters.aiScore !== 'all') {
      if (filters.aiScore === 'high' && rab.aiScore < 80) return false;
      if (filters.aiScore === 'medium' && (rab.aiScore < 60 || rab.aiScore >= 80)) return false;
      if (filters.aiScore === 'low' && rab.aiScore >= 60) return false;
    }
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      return rab.id.toLowerCase().includes(searchLower) ||
             rab.region.toLowerCase().includes(searchLower) ||
             rab.programName.toLowerCase().includes(searchLower);
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 sm:px-6 py-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Review RAB</h1>
            <p className="text-sm text-gray-500 mt-1">
              Review dan verifikasi pengajuan Rencana Anggaran Biaya dengan bantuan AI
            </p>
          </div>
          <button 
            onClick={handleExport}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <Download size={16} />
            Export Data
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 sm:p-6">
        <FilterSection filters={filters} setFilters={setFilters} stats={stats} />

        {/* Results */}
        <div className="mb-4 flex items-center justify-between">
          <p className="text-sm text-gray-600">
            Menampilkan <span className="font-semibold">{filteredData.length}</span> dari <span className="font-semibold">{rabData.length}</span> pengajuan
          </p>
        </div>

        {/* RAB Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredData.map((rab) => (
            <RABCard
              key={rab.id}
              rab={rab}
              onViewDetail={setSelectedRAB}
              onApprove={handleApprove}
              onReject={handleReject}
            />
          ))}
        </div>

        {filteredData.length === 0 && (
          <div className="text-center py-12">
            <FileText size={48} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500">Tidak ada pengajuan RAB yang sesuai dengan filter</p>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {selectedRAB && (
        <DetailModal
          rab={selectedRAB}
          onClose={() => setSelectedRAB(null)}
          onApprove={handleApprove}
          onReject={handleReject}
        />
      )}
    </div>
  );
};

export default ReviewRABPage;