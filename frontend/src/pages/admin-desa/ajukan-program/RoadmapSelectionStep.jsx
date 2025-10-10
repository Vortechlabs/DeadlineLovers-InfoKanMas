// RoadmapSelectionStep.jsx - KOMPONEN BARU
import React from 'react';
import { Upload, FileText, Sparkles, CheckCircle, Clock, Play } from 'lucide-react';

const RoadmapSelectionStep = ({ program, programData, onUseDefault, onUploadRundown, onBack }) => {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
      <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-purple-50 to-pink-50">
        <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <Sparkles size={20} className="text-purple-600" />
          Roadmap Program
        </h2>
        <p className="text-sm text-gray-600 mt-1">
          Pilih metode pembuatan tahapan pelaksanaan untuk {programData.namaProgram}
        </p>
      </div>

      <div className="p-6">
        {/* Program Info */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
          <div className="flex items-center gap-3">
            <CheckCircle size={20} className="text-green-600" />
            <div>
              <h3 className="font-semibold text-green-900">Program Berhasil Dibuat!</h3>
              <p className="text-sm text-green-700 mt-1">
                Kode: <span className="font-mono">{program?.kode_program}</span> - 
                Sekarang buat roadmap tahapan pelaksanaan
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Option 1: AI Roadmap */}
          <div className="border border-gray-200 rounded-xl p-6 hover:border-purple-300 hover:shadow-md transition-all">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
                <Sparkles size={24} className="text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">AI Roadmap Generator</h3>
                <p className="text-sm text-gray-600">Upload rundown, AI buatkan tahapan otomatis</p>
              </div>
            </div>
            
            <ul className="space-y-2 mb-4">
              <li className="flex items-center gap-2 text-sm text-gray-600">
                <CheckCircle size={16} className="text-green-500" />
                Ekstrak tahapan otomatis dari dokumen
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-600">
                <CheckCircle size={16} className="text-green-500" />
                Analisis risiko dan optimasi timeline
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-600">
                <CheckCircle size={16} className="text-green-500" />
                Format profesional & terstruktur
              </li>
            </ul>

            <button
              onClick={onUploadRundown}
              className="w-full px-4 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-lg hover:from-purple-600 hover:to-pink-700 transition-colors font-medium flex items-center justify-center gap-2"
            >
              <Upload size={16} />
              Upload Rundown (AI)
            </button>
          </div>

          {/* Option 2: Template Default */}
          <div className="border border-gray-200 rounded-xl p-6 hover:border-blue-300 hover:shadow-md transition-all">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-lg flex items-center justify-center">
                <FileText size={24} className="text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Template Default</h3>
                <p className="text-sm text-gray-600">Gunakan template tahapan standar</p>
              </div>
            </div>
            
            <ul className="space-y-2 mb-4">
              <li className="flex items-center gap-2 text-sm text-gray-600">
                <CheckCircle size={16} className="text-green-500" />
                4 tahapan standar pelaksanaan
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-600">
                <CheckCircle size={16} className="text-green-500" />
                Timeline otomatis berdasarkan tanggal program
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-600">
                <CheckCircle size={16} className="text-green-500" />
                Cepat dan mudah
              </li>
            </ul>

            <button
              onClick={onUseDefault}
              className="w-full px-4 py-3 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-lg hover:from-blue-600 hover:to-cyan-700 transition-colors font-medium flex items-center justify-center gap-2"
            >
              <Play size={16} />
              Gunakan Template Default
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between pt-4 border-t border-gray-200">
          <button
            onClick={onBack}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
          >
            ← Kembali ke Dokumen
          </button>
          
          <div className="text-sm text-gray-500 flex items-center gap-2">
            <Clock size={16} />
            Pilih salah satu metode di atas untuk melanjutkan
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoadmapSelectionStep;