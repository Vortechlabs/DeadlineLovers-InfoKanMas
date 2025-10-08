import React, { useState, useRef } from 'react';
import { 
  MoreVertical, 
  Eye, 
  Edit, 
  Trash2, 
  Download, 
  FileText,
  Send,
  Copy
} from 'lucide-react';

const ActionMenu = ({ 
  program, 
  onViewDetails, 
  onEditProgram, 
  onDeleteProgram, 
  onExportProgram 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  // Close menu when clicking outside
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
      label: 'Edit Program',
      icon: Edit,
      action: () => onEditProgram(program),
      color: 'text-blue-600'
    },
    {
      label: 'Duplikat Program',
      icon: Copy,
      action: () => console.log('Duplikat program', program.id),
      color: 'text-purple-600'
    },
    {
      label: 'Export Data',
      icon: Download,
      action: () => onExportProgram(program),
      color: 'text-green-600'
    },
    {
      label: 'Laporan Progress',
      icon: FileText,
      action: () => console.log('Buat laporan progress', program.id),
      color: 'text-orange-600'
    },
    {
      label: 'Ajukan Revisi',
      icon: Send,
      action: () => console.log('Ajukan revisi', program.id),
      color: 'text-yellow-600',
      show: program.status === 'ditolak'
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