import React, { useState } from 'react';
import { Send, Paperclip, X } from 'lucide-react';

const ResponseForm = ({ laporan, onSubmit, onCancel }) => {
  const [response, setResponse] = useState('');
  const [status, setStatus] = useState(laporan.status);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!response.trim()) return;

    setIsSubmitting(true);
    try {
      await onSubmit({
        laporanId: laporan.id,
        response,
        status,
        timestamp: new Date().toISOString()
      });
      setResponse('');
    } catch (error) {
      console.error('Error submitting response:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-xl p-5 border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Berikan Tanggapan</h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Status Update */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Update Status
          </label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="pending">Menunggu</option>
            <option value="in_review">Dalam Review</option>
            <option value="resolved">Selesai</option>
            <option value="rejected">Ditolak</option>
          </select>
        </div>

        {/* Response Text */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tanggapan
          </label>
          <textarea
            value={response}
            onChange={(e) => setResponse(e.target.value)}
            rows={4}
            placeholder="Tulis tanggapan untuk laporan ini..."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-3">
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              title="Lampirkan file"
            >
              <Paperclip size={18} />
            </button>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg font-medium hover:bg-gray-200 transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={!response.trim() || isSubmitting}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <Send size={16} />
              {isSubmitting ? 'Mengirim...' : 'Kirim Tanggapan'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ResponseForm;