import React from 'react';
import { MapPin, User, Calendar, AlertCircle, CheckCircle, Clock, XCircle, Eye } from 'lucide-react';

const StatusTimeline = ({ programs, onViewDetails }) => {
  const getStatusIcon = (status) => {
    switch (status) {
      case 'selesai': return CheckCircle;
      case 'dalam_pengerjaan': return Clock;
      case 'menunggu_persetujuan': return AlertCircle;
      case 'ditolak': return XCircle;
      default: return Clock;
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      menunggu_persetujuan: 'text-yellow-600 bg-yellow-100 border-yellow-200',
      dalam_pengerjaan: 'text-blue-600 bg-blue-100 border-blue-200',
      selesai: 'text-green-600 bg-green-100 border-green-200',
      ditolak: 'text-red-600 bg-red-100 border-red-200'
    };
    return colors[status] || colors.menunggu_persetujuan;
  };

  const getStatusText = (status) => {
    const texts = {
      menunggu_persetujuan: 'Menunggu Persetujuan',
      dalam_pengerjaan: 'Dalam Pengerjaan',
      selesai: 'Selesai',
      ditolak: 'Ditolak'
    };
    return texts[status] || status;
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short'
    });
  };

  // Group programs by status
  const groupedPrograms = {
    menunggu_persetujuan: programs.filter(p => p.status === 'menunggu_persetujuan'),
    dalam_pengerjaan: programs.filter(p => p.status === 'dalam_pengerjaan'),
    selesai: programs.filter(p => p.status === 'selesai'),
    ditolak: programs.filter(p => p.status === 'ditolak')
  };

  const statusOrder = ['menunggu_persetujuan', 'dalam_pengerjaan', 'selesai', 'ditolak'];

  if (programs.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-gray-200 p-8 text-center">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl">📋</span>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Tidak ada program</h3>
        <p className="text-gray-500">
          Tidak ada program yang sesuai dengan filter yang dipilih.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Timeline Status Program</h3>
        <p className="text-sm text-gray-500 mt-1">Monitor progress program berdasarkan status</p>
      </div>

      <div className="p-6 space-y-8">
        {statusOrder.map((status) => {
          if (groupedPrograms[status].length === 0) return null;

          const StatusIcon = getStatusIcon(status);

          return (
            <div key={status} className="border border-gray-200 rounded-xl overflow-hidden">
              {/* Status Header */}
              <div className={`px-4 py-3 border-b ${getStatusColor(status).split(' ')[2]} flex items-center gap-3`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getStatusColor(status).split(' ')[1]}`}>
                  <StatusIcon size={16} className={getStatusColor(status).split(' ')[0]} />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{getStatusText(status)}</h4>
                  <p className="text-sm text-gray-500">{groupedPrograms[status].length} program</p>
                </div>
              </div>

              {/* Programs List */}
              <div className="divide-y divide-gray-200">
                {groupedPrograms[status].map((program) => (
                  <div key={program.id} className="p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <h5 className="font-medium text-gray-900 text-sm">{program.nama}</h5>
                          <button 
                            onClick={() => onViewDetails(program)}
                            className="p-1 hover:bg-gray-200 rounded-lg transition-colors ml-2"
                          >
                            <Eye size={14} className="text-gray-500" />
                          </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-gray-600 mb-3">
                          <div className="flex items-center gap-2">
                            <MapPin size={12} />
                            <span>{program.lokasi}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <User size={12} />
                            <span>{program.penanggungJawab}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar size={12} />
                            <span>{formatDate(program.tanggalMulai)} - {formatDate(program.tanggalSelesai)}</span>
                          </div>
                        </div>

                        {/* Progress and Budget */}
                        <div className="flex items-center justify-between">
                          <div className="flex-1 max-w-xs">
                            <div className="flex justify-between text-xs text-gray-600 mb-1">
                              <span>Progress</span>
                              <span>{program.progress}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className="h-2 rounded-full bg-green-500 transition-all duration-500"
                                style={{ width: `${program.progress}%` }}
                              ></div>
                            </div>
                          </div>

                          <div className="text-right ml-4">
                            <div className="text-xs font-medium text-gray-900">
                              {formatCurrency(program.anggaran)}
                            </div>
                            <div className="text-xs text-green-600">
                              {formatCurrency(program.realisasi)}
                            </div>
                          </div>
                        </div>

                        {/* Status Detail */}
                        <div className="mt-2">
                          <p className="text-xs text-gray-500">{program.statusDetail}</p>
                        </div>

                        {/* Milestones Preview */}
                        {program.milestones && program.milestones.length > 0 && (
                          <div className="mt-3 flex items-center gap-2">
                            {program.milestones.slice(0, 3).map((milestone, index) => (
                              <div
                                key={index}
                                className={`px-2 py-1 rounded-full text-xs ${
                                  milestone.status === 'selesai'
                                    ? 'bg-green-100 text-green-800'
                                    : milestone.status === 'dalam_proses'
                                    ? 'bg-blue-100 text-blue-800'
                                    : milestone.status === 'dalam_pengerjaan'
                                    ? 'bg-yellow-100 text-yellow-800'
                                    : 'bg-gray-100 text-gray-800'
                                }`}
                              >
                                {milestone.nama}
                              </div>
                            ))}
                            {program.milestones.length > 3 && (
                              <span className="text-xs text-gray-500">
                                +{program.milestones.length - 3} lainnya
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StatusTimeline;