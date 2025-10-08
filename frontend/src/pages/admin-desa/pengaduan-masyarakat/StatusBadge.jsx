import React from 'react';

const StatusBadge = ({ status, prioritas }) => {
  const statusConfig = {
    baru: { color: 'bg-blue-100 text-blue-800', label: 'Baru' },
    dalam_investigasi: { color: 'bg-yellow-100 text-yellow-800', label: 'Investigasi' },
    diverifikasi: { color: 'bg-green-100 text-green-800', label: 'Terverifikasi' },
    dalam_penyidikan: { color: 'bg-orange-100 text-orange-800', label: 'Penyidikan' },
    selesai: { color: 'bg-purple-100 text-purple-800', label: 'Selesai' },
    ditolak: { color: 'bg-red-100 text-red-800', label: 'Ditolak' }
  };

  const prioritasConfig = {
    sangat_tinggi: { color: 'bg-red-100 text-red-800', label: 'Sangat Tinggi' },
    tinggi: { color: 'bg-orange-100 text-orange-800', label: 'Tinggi' },
    sedang: { color: 'bg-yellow-100 text-yellow-800', label: 'Sedang' },
    rendah: { color: 'bg-gray-100 text-gray-800', label: 'Rendah' }
  };

  return (
    <div className="flex flex-col gap-1">
      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${statusConfig[status]?.color || 'bg-gray-100 text-gray-800'}`}>
        {statusConfig[status]?.label || status}
      </span>
      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${prioritasConfig[prioritas]?.color || 'bg-gray-100 text-gray-800'}`}>
        {prioritasConfig[prioritas]?.label || prioritas}
      </span>
    </div>
  );
};

export default StatusBadge;