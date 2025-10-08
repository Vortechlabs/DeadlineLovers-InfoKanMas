import React from 'react';
import { Eye, CheckCircle, XCircle, MapPin, Camera, Video, Navigation } from 'lucide-react';

const ProgressTable = ({ progressData, onViewDetails, onApproveProgress, onRequestRevision }) => {
  const getStatusColor = (status) => {
    const colors = {
      selesai: 'bg-green-100 text-green-800',
      sedang_berjalan: 'bg-blue-100 text-blue-800',
      tertunda: 'bg-yellow-100 text-yellow-800',
      dibatalkan: 'bg-red-100 text-red-800'
    };
    return colors[status] || colors.sedang_berjalan;
  };

  const getStatusText = (status) => {
    const texts = {
      selesai: 'Selesai',
      sedang_berjalan: 'Berjalan',
      tertunda: 'Tertunda',
      dibatalkan: 'Dibatalkan'
    };
    return texts[status] || status;
  };

  const getValidationStatus = (validasi) => {
    if (validasi.ai_verified && validasi.gps_match && validasi.timestamp_valid) {
      return { status: 'valid', text: 'Tervalidasi', color: 'text-green-600' };
    }
    if (!validasi.gps_match) {
      return { status: 'warning', text: 'GPS Tidak Sesuai', color: 'text-yellow-600' };
    }
    return { status: 'pending', text: 'Perlu Validasi', color: 'text-blue-600' };
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Detail Progress Proyek</h3>
        <p className="text-sm text-gray-500 mt-1">Monitor dan validasi progress harian proyek desa</p>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Proyek</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Milestone</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Progress</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Dokumentasi</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Validasi</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {progressData.map((project) => {
              const validation = getValidationStatus(project.validasi);
              
              return (
                <tr key={project.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{project.name}</p>
                      <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                        <MapPin size={12} />
                        {project.location}
                      </p>
                    </div>
                  </td>
                  
                  <td className="px-6 py-4">
                    <p className="text-sm text-gray-700">{project.milestone}</p>
                  </td>
                  
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div 
                          className="h-2 rounded-full bg-blue-600 transition-all duration-500"
                          style={{ width: `${project.progress}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-gray-700 w-8">{project.progress}%</span>
                    </div>
                  </td>
                  
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Camera size={14} />
                        <span>{project.dokumentasi.foto}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Video size={14} />
                        <span>{project.dokumentasi.video}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Navigation size={14} className={project.dokumentasi.gps ? 'text-green-600' : 'text-red-600'} />
                      </div>
                    </div>
                  </td>
                  
                  <td className="px-6 py-4">
                    <span className={`text-xs font-medium ${validation.color}`}>
                      {validation.text}
                    </span>
                  </td>
                  
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                      {getStatusText(project.status)}
                    </span>
                  </td>
                  
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => onViewDetails(project)}
                        className="text-blue-600 hover:text-blue-700 flex items-center gap-1 text-sm font-medium p-2 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <Eye size={14} />
                        Detail
                      </button>
                      
                      {project.validasi.ai_verified && (
                        <button 
                          onClick={() => onApproveProgress(project.id)}
                          className="text-green-600 hover:text-green-700 flex items-center gap-1 text-sm font-medium p-2 hover:bg-green-50 rounded-lg transition-colors"
                        >
                          <CheckCircle size={14} />
                          Setujui
                        </button>
                      )}
                      
                      {!project.validasi.ai_verified && (
                        <button 
                          onClick={() => onRequestRevision(project.id)}
                          className="text-yellow-600 hover:text-yellow-700 flex items-center gap-1 text-sm font-medium p-2 hover:bg-yellow-50 rounded-lg transition-colors"
                        >
                          <XCircle size={14} />
                          Revisi
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProgressTable;