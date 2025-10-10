import React from 'react';
import { MapPin, ChevronRight, AlertTriangle } from 'lucide-react';

const RecentSubmissionsTable = ({ submissions, onReview }) => {
  const getStatusStyle = (status) => {
    const styles = {
      pending: 'bg-yellow-50 text-yellow-700 border-yellow-200',
      review: 'bg-blue-50 text-blue-700 border-blue-200',
      approved: 'bg-green-50 text-green-700 border-green-200',
      rejected: 'bg-red-50 text-red-700 border-red-200'
    };
    return styles[status] || styles.pending;
  };

  const getStatusText = (status) => {
    const texts = {
      pending: 'Menunggu',
      review: 'Direview',
      approved: 'Disetujui',
      rejected: 'Ditolak'
    };
    return texts[status] || status;
  };

  const getPriorityColor = (priority) => {
    const colors = {
      high: 'bg-red-500',
      medium: 'bg-yellow-500',
      low: 'bg-green-500'
    };
    return colors[priority] || colors.medium;
  };

  const getRiskBadge = (riskLevel) => {
    if (!riskLevel || riskLevel === 'low') return null;
    
    const colors = {
      medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      high: 'bg-orange-100 text-orange-800 border-orange-200',
      critical: 'bg-red-100 text-red-800 border-red-200'
    };
    
    return (
      <span className={`ml-2 inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium border ${colors[riskLevel]}`}>
        <AlertTriangle size={10} className="mr-1" />
        Risiko {riskLevel}
      </span>
    );
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200">
      <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Pengajuan Terbaru</h3>
          <p className="text-sm text-gray-500 mt-1">Daftar RAB yang baru masuk</p>
        </div>
        <button className="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1">
          Lihat Semua
          <ChevronRight size={16} />
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">ID & Daerah</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Program</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Nilai</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Risiko AI</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Waktu</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {submissions.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${getPriorityColor(item.priority)}`}></div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{item.id}</p>
                      <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                        <MapPin size={12} />
                        {item.region}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm text-gray-900">{item.program}</p>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm font-medium text-gray-900">{item.amount}</p>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium border ${getStatusStyle(item.status)}`}>
                    {getStatusText(item.status)}
                  </span>
                </td>
                <td className="px-6 py-4">
                  {getRiskBadge(item.riskLevel)}
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm text-gray-500">{item.date}</p>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button 
                      onClick={() => onReview(item)}
                      className="text-sm font-medium text-blue-600 hover:text-blue-700"
                    >
                      Review
                    </button>
                    {item.riskLevel && item.riskLevel !== 'low' && (
                      <button className="text-sm font-medium text-red-600 hover:text-red-700">
                        Analisis
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentSubmissionsTable;