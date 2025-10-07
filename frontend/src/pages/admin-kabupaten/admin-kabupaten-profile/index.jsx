import React, { useState } from 'react';
import { 
  Edit3, 
  Settings, 
  Bell, 
  Shield, 
  Download,
  User,
  BarChart3
} from 'lucide-react';

import ProfileHeader from './ProfileHeader';
import StatsOverview from './StatsOverview';
import ActivityFeed from './ActivityFeed';
import EditProfileModal from './EditProfileModal';
import SecuritySettings from './SecuritySettings';

const AdminProfilePage = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [showEditModal, setShowEditModal] = useState(false);

  // Mock Admin Data
  const [admin, setAdmin] = useState({
    name: 'Ahmad Wijaya',
    email: 'ahmad.wijaya@infokanmas.go.id',
    phone: '+62 812-3456-7890',
    location: 'Jakarta Pusat',
    role: 'Admin Pusat',
    department: 'Kementerian Sosial',
    status: 'active',
    joinDate: '15 Jan 2023',
    photo: null
  });

  // Mock Stats Data
  const stats = {
    totalProgram: 156,
    approved: 128,
    pending: 18,
    issues: 5,
    managedRegions: 8,
    activities: 342
  };

  // Mock Activities Data
  const activities = [
    {
      type: 'approval',
      description: 'Menyetujui RAB Program Bantuan Pangan Sleman',
      time: '2 jam lalu',
      details: {
        region: 'Kab. Sleman',
        program: 'Bantuan Pangan'
      }
    },
    {
      type: 'submission',
      description: 'Mengajukan revisi anggaran program kesehatan',
      time: '5 jam lalu',
      details: {
        region: 'Kota Yogya',
        program: 'Program Kesehatan'
      }
    },
    {
      type: 'user_management',
      description: 'Menambahkan admin daerah baru untuk Bantul',
      time: '1 hari lalu',
      details: {
        region: 'Kab. Bantul'
      }
    },
    {
      type: 'alert',
      description: 'Menangani peringatan anomali anggaran',
      time: '1 hari lalu',
      details: {
        region: 'Kab. Kulon Progo'
      }
    },
    {
      type: 'system',
      description: 'Memperbarui konfigurasi sistem monitoring',
      time: '2 hari lalu'
    }
  ];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: User },
    { id: 'security', label: 'Keamanan', icon: Shield },
    { id: 'preferences', label: 'Preferensi', icon: Settings },
    { id: 'notifications', label: 'Notifikasi', icon: Bell }
  ];

  const handleSaveProfile = async (updatedData) => {
    // Simulate API call
    setTimeout(() => {
      setAdmin(prev => ({ ...prev, ...updatedData }));
      setShowEditModal(false);
      alert('Profil berhasil diperbarui!');
    }, 1000);
  };

  const handleEditPhoto = () => {
    // Trigger file input for photo change
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setAdmin(prev => ({ ...prev, photo: e.target.result }));
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Actions */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Profil Admin</h1>
            <p className="text-gray-600 mt-1">Kelola informasi profil dan pengaturan akun</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2">
              <Download size={16} />
              Export Data
            </button>
            <button 
              onClick={() => setShowEditModal(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <Edit3 size={16} />
              Edit Profil
            </button>
          </div>
        </div>

        {/* Profile Header */}
        <div className="mb-6">
          <ProfileHeader admin={admin} onEditPhoto={handleEditPhoto} />
        </div>

        {/* Navigation Tabs */}
        <div className="mb-6">
          <div className="bg-white rounded-2xl p-1 border border-gray-200 inline-flex">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-3 rounded-xl text-sm font-medium transition-all flex items-center gap-2 ${
                    activeTab === tab.id
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Icon size={16} />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="xl:col-span-2 space-y-6">
            {activeTab === 'overview' && (
              <>
                {/* Stats Overview */}
                <StatsOverview stats={stats} />

                {/* Activity Feed */}
                <ActivityFeed activities={activities} />
              </>
            )}

            {activeTab === 'security' && (
              <SecuritySettings />
            )}

            {activeTab === 'preferences' && (
              <div className="bg-white rounded-2xl p-6 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Preferensi Sistem</h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="text-md font-medium text-gray-900 mb-4">Tampilan</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <button className="p-4 border-2 border-blue-500 rounded-lg text-center">
                        <div className="w-full h-8 bg-gray-100 rounded mb-2"></div>
                        <span className="text-sm font-medium">Light Mode</span>
                      </button>
                      <button className="p-4 border-2 border-gray-200 rounded-lg text-center hover:border-gray-300">
                        <div className="w-full h-8 bg-gray-800 rounded mb-2"></div>
                        <span className="text-sm font-medium">Dark Mode</span>
                      </button>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-md font-medium text-gray-900 mb-4">Bahasa</h4>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option>Bahasa Indonesia</option>
                      <option>English</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="bg-white rounded-2xl p-6 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Pengaturan Notifikasi</h3>
                <div className="space-y-4">
                  {[
                    { label: 'Email Notifications', description: 'Kirim notifikasi via email', enabled: true },
                    { label: 'Push Notifications', description: 'Notifikasi real-time di browser', enabled: true },
                    { label: 'SMS Alerts', description: 'Kirim alert penting via SMS', enabled: false },
                    { label: 'Desktop Notifications', description: 'Tampilkan notifikasi desktop', enabled: true }
                  ].map((setting, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">{setting.label}</p>
                        <p className="text-sm text-gray-600">{setting.description}</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked={setting.enabled} />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Ringkasan Kinerja</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Rating Kinerja</span>
                  <span className="text-lg font-bold text-green-600">4.8/5.0</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Response Time</span>
                  <span className="text-lg font-bold text-blue-600">2.3h</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Completion Rate</span>
                  <span className="text-lg font-bold text-purple-600">94%</span>
                </div>
              </div>
            </div>

            {/* System Info */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Informasi Sistem</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Last Login</span>
                  <span className="font-medium">Today, 08:30</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">IP Address</span>
                  <span className="font-medium">192.168.1.100</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Browser</span>
                  <span className="font-medium">Chrome 121</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Session Duration</span>
                  <span className="font-medium">4h 22m</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {showEditModal && (
        <EditProfileModal
          admin={admin}
          onSave={handleSaveProfile}
          onClose={() => setShowEditModal(false)}
        />
      )}
    </div>
  );
};

export default AdminProfilePage;