import React, { useState } from 'react';
import { X, CheckCircle, AlertTriangle, Info, Bell, Settings } from 'lucide-react';

const NotificationModal = ({ isOpen, onClose, notifications }) => {
  const [activeTab, setActiveTab] = useState('all');

  if (!isOpen) return null;

  const getNotificationIcon = (type) => {
    const icons = {
      success: CheckCircle,
      warning: AlertTriangle,
      info: Info,
      alert: Bell
    };
    const Icon = icons[type] || Info;
    
    const colors = {
      success: 'text-green-600 bg-green-50',
      warning: 'text-yellow-600 bg-yellow-50',
      info: 'text-blue-600 bg-blue-50',
      alert: 'text-red-600 bg-red-50'
    };

    return <Icon size={18} className={colors[type]} />;
  };

  const getTimeAgo = (timestamp) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInMinutes = Math.floor((now - time) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Baru saja';
    if (diffInMinutes < 60) return `${diffInMinutes} menit lalu`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)} jam lalu`;
    return `${Math.floor(diffInMinutes / 1440)} hari lalu`;
  };

  const filteredNotifications = notifications.filter(notification => {
    if (activeTab === 'all') return true;
    if (activeTab === 'unread') return !notification.read;
    return notification.type === activeTab;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="fixed inset-0 bg-black/50 z-[2000] flex items-start justify-end pt-16 sm:pt-20">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 sm:mx-6 max-h-[80vh] overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Bell size={20} className="text-gray-700" />
            <div>
              <h3 className="font-semibold text-gray-900">Notifikasi</h3>
              <p className="text-sm text-gray-500">{unreadCount} belum dibaca</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
              <Settings size={16} className="text-gray-600" />
            </button>
            <button 
              onClick={onClose}
              className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X size={16} className="text-gray-600" />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <div className="flex px-4 gap-4">
            {[
              { id: 'all', label: 'Semua' },
              { id: 'unread', label: 'Belum Dibaca' },
              { id: 'alert', label: 'Peringatan' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Notifications List */}
        <div className="overflow-y-auto max-h-[60vh]">
          {filteredNotifications.length > 0 ? (
            <div className="divide-y divide-gray-100">
              {filteredNotifications.map((notification, index) => (
                <div
                  key={notification.id}
                  className={`p-4 hover:bg-gray-50 transition-colors cursor-pointer ${
                    !notification.read ? 'bg-blue-50/50' : ''
                  }`}
                  onClick={() => notification.onClick && notification.onClick()}
                >
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 mt-1">
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-1">
                        <p className={`text-sm font-medium ${
                          !notification.read ? 'text-gray-900' : 'text-gray-700'
                        }`}>
                          {notification.title}
                        </p>
                        {!notification.read && (
                          <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 ml-2 mt-1"></div>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                        {notification.message}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">
                          {getTimeAgo(notification.timestamp)}
                        </span>
                        {notification.category && (
                          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                            {notification.category}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Bell size={48} className="mx-auto text-gray-300 mb-3" />
              <p className="text-gray-500 text-sm">Tidak ada notifikasi</p>
              <p className="text-gray-400 text-xs mt-1">
                {activeTab === 'unread' ? 'Semua notifikasi telah dibaca' : 'Belum ada notifikasi'}
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <div className="flex justify-between items-center">
            <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
              Tandai semua sudah dibaca
            </button>
            <button className="text-sm text-gray-600 hover:text-gray-700">
              Lihat semua
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationModal;