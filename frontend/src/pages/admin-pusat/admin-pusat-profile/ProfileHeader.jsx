import React from 'react';
import { Camera, MapPin, Calendar, Mail, Phone, Shield } from 'lucide-react';

const ProfileHeader = ({ admin, onEditPhoto }) => {
  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200">
      <div className="flex flex-col lg:flex-row items-center lg:items-start gap-6">
        {/* Profile Photo */}
        <div className="relative group">
          <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
            {admin.photo ? (
              <img 
                src={admin.photo} 
                alt={admin.name}
                className="w-full h-full rounded-2xl object-cover"
              />
            ) : (
              admin.name.split(' ').map(n => n[0]).join('')
            )}
          </div>
          <button
            onClick={onEditPhoto}
            className="absolute bottom-2 right-2 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center text-gray-600 hover:text-blue-600 transition-all opacity-0 group-hover:opacity-100"
          >
            <Camera size={16} />
          </button>
        </div>

        {/* Profile Info */}
        <div className="flex-1 text-center lg:text-left">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">{admin.name}</h1>
              <div className="flex items-center justify-center lg:justify-start gap-4 text-sm text-gray-600 mb-3">
                <div className="flex items-center gap-1">
                  <Shield size={14} />
                  <span>{admin.role}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin size={14} />
                  <span>{admin.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar size={14} />
                  <span>Bergabung {admin.joinDate}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 mt-4 lg:mt-0 justify-center lg:justify-start">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                admin.status === 'active' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-gray-100 text-gray-800'
              }`}>
                {admin.status === 'active' ? 'Aktif' : 'Non-aktif'}
              </span>
            </div>
          </div>

          {/* Contact Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center gap-3 text-sm">
              <Mail size={16} className="text-gray-400" />
              <div>
                <p className="text-gray-500">Email</p>
                <p className="text-gray-900 font-medium">{admin.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Phone size={16} className="text-gray-400" />
              <div>
                <p className="text-gray-500">Telepon</p>
                <p className="text-gray-900 font-medium">{admin.phone}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;