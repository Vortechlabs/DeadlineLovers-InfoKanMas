import React, { useState, useRef } from 'react';
import { 
  MoreVertical, 
  Eye, 
  Edit, 
  Trash2, 
  Download, 
  FileText,
  Send,
  Copy,
  TrendingUp
} from 'lucide-react';

const ActionMenu = ({ 
  program, 
  onViewDetails, 
  onEditProgram, 
  onDeleteProgram, 
  onExportProgram,
  onUpdateProgress
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const menuItems = [
    {
      label: 'Lihat Detail',
      icon: Eye,
      action: () => onViewDetails(program),
      color: 'text-gray-700'
    },
    {
      label: 'Update Progress',
      icon: TrendingUp,
      action: () => onUpdateProgress(program),
      color: 'text-green-600',
      show: program.status === 'dalam_pengerjaan' || program.status === 'menunggu_persetujuan' || program.status === 'approved'
    },
    {
      label: 'Edit Program',
      icon: Edit,
      action: () => onEditProgram(program),
      color: 'text-blue-600',
      show: program.status === 'menunggu_persetujuan' || program.status === 'ditolak'
    },
    {
      label: 'Export Data',
      icon: Download,
      action: () => onExportProgram(program),
      color: 'text-green-600'
    },
    {
      label: 'Hapus Program',
      icon: Trash2,
      action: () => onDeleteProgram(program),
      color: 'text-red-600',
      show: program.status === 'menunggu_persetujuan' || program.status === 'ditolak'
    }
  ];

  const visibleMenuItems = menuItems.filter(item => item.show !== false);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-1 hover:bg-gray-100 rounded-lg transition-colors text-gray-500 hover:text-gray-700"
      >
        <MoreVertical size={16} />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-8 z-50 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1">
          {visibleMenuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <button
                key={index}
                onClick={() => {
                  item.action();
                  setIsOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${item.color}`}
              >
                <Icon size={14} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ActionMenu;