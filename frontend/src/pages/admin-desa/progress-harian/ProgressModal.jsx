import React from 'react';
import { X, Camera, Video, MapPin, Calendar, CheckCircle, XCircle, Download } from 'lucide-react';

const ProgressModal = ({ project, onClose, onApprove, onRequestRevision }) => {
  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-xs flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-xl font-bold text-gray-900">{project.name}</h2>
            <p className="text-sm text-gray-500 mt-1 flex items-center gap-2">
              <MapPin size={14} />
              {project.location} • {project.tanggal}
            </p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Progress Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 rounded-xl p-4">
              <h3 className="text-sm font-medium text-blue-900 mb-2">Milestone Saat Ini</h3>
              <p className="text-lg font-semibold text-blue-700">{project.milestone}</p>
            </div>
            <div className="bg-green-50 rounded-xl p-4">
              <h3 className="text-sm font-medium text-green-900 mb-2">Progress</h3>
              <div className="flex items-center gap-2">
                <div className="w-full bg-green-200 rounded-full h-2">
                  <div 
                    className="h-2 rounded-full bg-green-600 transition-all duration-500"
                    style={{ width: `${project.progress}%` }}
                  ></div>
                </div>
                <span className="text-lg font-semibold text-green-700">{project.progress}%</span>
              </div>
            </div>
            <div className="bg-purple-50 rounded-xl p-4">
              <h3 className="text-sm font-medium text-purple-900 mb-2">Dokumentasi</h3>
              <div className="flex items-center gap-3 text-purple-700">
                <div className="flex items-center gap-1">
                  <Camera size={16} />
                  <span className="font-semibold">{project.dokumentasi.foto}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Video size={16} />
                  <span className="font-semibold">{project.dokumentasi.video}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Validasi AI */}
          <div className="bg-gray-50 rounded-xl p-4">
            <h3 className="text-sm font-medium text-gray-900 mb-3">Hasil Validasi AI</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className={`flex items-center gap-2 ${project.validasi.ai_verified ? 'text-green-600' : 'text-yellow-600'}`}>
                {project.validasi.ai_verified ? <CheckCircle size={16} /> : <XCircle size={16} />}
                <span className="text-sm">AI Verified</span>
              </div>
              <div className={`flex items-center gap-2 ${project.validasi.gps_match ? 'text-green-600' : 'text-red-600'}`}>
                {project.validasi.gps_match ? <CheckCircle size={16} /> : <XCircle size={16} />}
                <span className="text-sm">GPS Match</span>
              </div>
              <div className={`flex items-center gap-2 ${project.validasi.timestamp_valid ? 'text-green-600' : 'text-red-600'}`}>
                {project.validasi.timestamp_valid ? <CheckCircle size={16} /> : <XCircle size={16} />}
                <span className="text-sm">Timestamp Valid</span>
              </div>
              <div className={`flex items-center gap-2 ${!project.validasi.duplicate_check ? 'text-green-600' : 'text-red-600'}`}>
                {!project.validasi.duplicate_check ? <CheckCircle size={16} /> : <XCircle size={16} />}
                <span className="text-sm">Original Photo</span>
              </div>
            </div>
          </div>

          {/* Bukti Dokumentasi */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Bukti Dokumentasi</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {project.bukti.map((bukti, index) => (
                <div key={index} className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3 mb-3">
                    {bukti.type === 'foto' ? (
                      <Camera size={20} className="text-blue-600" />
                    ) : (
                      <Video size={20} className="text-purple-600" />
                    )}
                    <div>
                      <p className="text-sm font-medium text-gray-900">{bukti.description}</p>
                      <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                        <Calendar size={12} />
                        {bukti.timestamp}
                      </p>
                      {bukti.gps && (
                        <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                          <MapPin size={12} />
                          {bukti.gps}
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <div className="bg-gray-100 rounded-lg h-48 flex items-center justify-center">
                    {bukti.type === 'foto' ? (
                      <div className="text-center">
                        <Camera size={32} className="text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-500">Preview Foto</p>
                        <button className="text-blue-600 text-sm font-medium mt-2 flex items-center gap-1 mx-auto">
                          <Download size={14} />
                          Download
                        </button>
                      </div>
                    ) : (
                      <div className="text-center">
                        <Video size={32} className="text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-500">Preview Video</p>
                        <p className="text-xs text-gray-400">{bukti.duration}</p>
                        <button className="text-blue-600 text-sm font-medium mt-2 flex items-center gap-1 mx-auto">
                          <Download size={14} />
                          Download
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            {project.bukti.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <Camera size={48} className="mx-auto mb-3 text-gray-300" />
                <p>Belum ada dokumentasi yang diupload</p>
              </div>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between p-6 border-t border-gray-200 bg-gray-50 rounded-b-2xl">
          <button 
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
          >
            Tutup
          </button>
          
          <div className="flex items-center gap-3">
            <button 
              onClick={() => onRequestRevision(project.id)}
              className="px-4 py-2 border border-yellow-300 text-yellow-700 rounded-lg hover:bg-yellow-50 transition-colors flex items-center gap-2"
            >
              <XCircle size={16} />
              Minta Revisi
            </button>
            
            <button 
              onClick={() => onApprove(project.id)}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
            >
              <CheckCircle size={16} />
              Setujui Progress
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressModal;