import React, { useState } from 'react';
import { AlertTriangle, CheckCircle, X, FileText, DollarSign, Shield } from 'lucide-react';
import AiFraudDetectionService from '@/services/AiFraudDetectionService';

const FraudAnalysisModal = ({ program, isOpen, onClose }) => {
  const [analysisType, setAnalysisType] = useState('comprehensive');
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const runAnalysis = async () => {
    if (!program) return;

    setAnalyzing(true);
    try {
      let result;
      
      if (analysisType === 'document' && selectedFile) {
        result = await AiFraudDetectionService.analyzeDocumentForFraud(
          program.id, 
          selectedFile, 
          'proposal'
        );
      } else if (analysisType === 'rab') {
        result = await AiFraudDetectionService.analyzeRABForAnomalies(
          program.id, 
          program.rab_items || []
        );
      } else {
        result = await AiFraudDetectionService.comprehensiveProgramAnalysis(program.id);
      }

      setAnalysisResult(result.data);
    } catch (error) {
      console.error('Analysis error:', error);
      alert('Gagal melakukan analisis: ' + error.message);
    } finally {
      setAnalyzing(false);
    }
  };

  const getRiskColor = (level) => {
    switch (level) {
      case 'low': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'critical': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center space-x-3">
            <Shield className="h-6 w-6 text-blue-600" />
            <h2 className="text-xl font-bold">AI Fraud Detection</h2>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Analysis Type Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Pilih Jenis Analisis:
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button
                onClick={() => setAnalysisType('comprehensive')}
                className={`p-4 border rounded-lg text-left ${
                  analysisType === 'comprehensive' 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <Shield className="h-5 w-5 mb-2 text-blue-600" />
                <div className="font-medium">Analisis Komprehensif</div>
                <div className="text-sm text-gray-600 mt-1">Analisis semua aspek program</div>
              </button>

              <button
                onClick={() => setAnalysisType('document')}
                className={`p-4 border rounded-lg text-left ${
                  analysisType === 'document' 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <FileText className="h-5 w-5 mb-2 text-green-600" />
                <div className="font-medium">Analisis Dokumen</div>
                <div className="text-sm text-gray-600 mt-1">Upload dan analisis dokumen</div>
              </button>

              <button
                onClick={() => setAnalysisType('rab')}
                className={`p-4 border rounded-lg text-left ${
                  analysisType === 'rab' 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <DollarSign className="h-5 w-5 mb-2 text-purple-600" />
                <div className="font-medium">Analisis RAB</div>
                <div className="text-sm text-gray-600 mt-1">Deteksi anomali harga</div>
              </button>
            </div>
          </div>

          {/* File Upload for Document Analysis */}
          {analysisType === 'document' && (
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload Dokumen untuk Dianalisis:
              </label>
              <input
                type="file"
                onChange={handleFileSelect}
                accept=".pdf,.doc,.docx,.txt"
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
              <p className="text-xs text-gray-500 mt-1">
                Format yang didukung: PDF, DOC, DOCX, TXT (max 10MB)
              </p>
            </div>
          )}

          {/* Analysis Button */}
          <button
            onClick={runAnalysis}
            disabled={analyzing || (analysisType === 'document' && !selectedFile)}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed"
          >
            {analyzing ? (
              <span className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Sedang Menganalisis...
              </span>
            ) : (
              'Jalankan Analisis AI'
            )}
          </button>

          {/* Analysis Results */}
          {analysisResult && (
            <div className="mt-6 border rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-4">Hasil Analisis</h3>
              
              {/* Risk Summary */}
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center space-x-2">
                      <AlertTriangle className={`h-5 w-5 ${
                        analysisResult.results.level_risiko === 'critical' ? 'text-red-600' :
                        analysisResult.results.level_risiko === 'high' ? 'text-orange-600' :
                        analysisResult.results.level_risiko === 'medium' ? 'text-yellow-600' : 'text-green-600'
                      }`} />
                      <span className="font-medium">Level Risiko: </span>
                      <span className={`px-2 py-1 rounded-full text-sm font-medium ${getRiskColor(analysisResult.results.level_risiko)}`}>
                        {analysisResult.results.level_risiko?.toUpperCase()}
                      </span>
                    </div>
                    <div className="mt-2">
                      <span className="font-medium">Skor Risiko: </span>
                      <span className="text-lg font-bold">{analysisResult.results.skor_risiko}/100</span>
                    </div>
                  </div>
                  {analysisResult.results.flag_meragukan ? (
                    <div className="text-red-600 flex items-center">
                      <AlertTriangle className="h-5 w-5 mr-1" />
                      <span className="font-medium">DOKUMEN MERAGUKAN</span>
                    </div>
                  ) : (
                    <div className="text-green-600 flex items-center">
                      <CheckCircle className="h-5 w-5 mr-1" />
                      <span className="font-medium">DOKUMEN AMAN</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Key Findings */}
              {analysisResult.results.temuan_kunci && analysisResult.results.temuan_kunci.length > 0 && (
                <div className="mb-4">
                  <h4 className="font-medium mb-2">Temuan Kunci:</h4>
                  <div className="space-y-2">
                    {analysisResult.results.temuan_kunci.map((temuan, index) => (
                      <div key={index} className="border-l-4 border-yellow-500 pl-3 py-1">
                        <div className="font-medium">{temuan.deskripsi}</div>
                        <div className="text-sm text-gray-600">Rekomendasi: {temuan.rekomendasi}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Suspicious Items */}
              {analysisResult.results.item_mencurigakan && analysisResult.results.item_mencurigakan.length > 0 && (
                <div className="mb-4">
                  <h4 className="font-medium mb-2">Item Mencurigakan:</h4>
                  <div className="space-y-3">
                    {analysisResult.results.item_mencurigakan.map((item, index) => (
                      <div key={index} className="border rounded-lg p-3 bg-red-50">
                        <div className="font-medium">{item.nama_item}</div>
                        <div className="text-sm">
                          <span>Harga: Rp {item.harga_satuan?.toLocaleString()}</span>
                          <span className="mx-2">•</span>
                          <span>Harga Wajar: Rp {item.harga_pasar_wajar?.toLocaleString()}</span>
                          <span className="mx-2">•</span>
                          <span className="text-red-600">Selisih: {item.selisih_persen}%</span>
                        </div>
                        <div className="text-sm text-gray-600 mt-1">{item.rekomendasi}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Recommendations */}
              {analysisResult.results.rekomendasi && analysisResult.results.rekomendasi.length > 0 && (
                <div>
                  <h4 className="font-medium mb-2">Rekomendasi:</h4>
                  <ul className="list-disc list-inside space-y-1">
                    {analysisResult.results.rekomendasi.map((rekomendasi, index) => (
                      <li key={index} className="text-sm">{rekomendasi}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Summary */}
              {analysisResult.results.ringkasan_analisis && (
                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                  <div className="text-sm font-medium">Ringkasan Analisis:</div>
                  <div className="text-sm text-gray-700 mt-1">{analysisResult.results.ringkasan_analisis}</div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FraudAnalysisModal;