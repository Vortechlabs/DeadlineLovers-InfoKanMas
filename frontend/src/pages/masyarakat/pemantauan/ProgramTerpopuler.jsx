import React from 'react';
import { Star, TrendingUp, Users, Eye } from 'lucide-react';

const ProgramTerpopuler = () => {
  const popularPrograms = [
    {
      id: 1,
      nama: 'Bantuan Sembako 1000 KK',
      rating: 4.8,
      totalRating: 124,
      views: 856,
      progress: 75,
      warna: 'from-orange-500 to-orange-600'
    },
    {
      id: 2,
      nama: 'Perbaikan Jalan Desa',
      rating: 4.5,
      totalRating: 89,
      views: 723,
      progress: 45,
      warna: 'from-blue-500 to-blue-600'
    },
    {
      id: 3,
      nama: 'Renovasi Puskesmas',
      rating: 4.9,
      totalRating: 67,
      views: 612,
      progress: 90,
      warna: 'from-green-500 to-green-600'
    }
  ];

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-800 flex items-center space-x-2">
          <TrendingUp className="w-5 h-5 text-purple-500" />
          <span>Program Terpopuler</span>
        </h3>
        <Eye className="w-5 h-5 text-gray-400" />
      </div>

      <div className="space-y-4">
        {popularPrograms.map(program => (
          <div key={program.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer">
            <div className={`w-10 h-10 bg-gradient-to-br ${program.warna} rounded-lg flex items-center justify-center`}>
              <Star className="w-5 h-5 text-white" />
            </div>
            
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-gray-800 text-sm truncate">{program.nama}</h4>
              <div className="flex items-center space-x-4 mt-1">
                <div className="flex items-center space-x-1">
                  <Star className="w-3 h-3 text-yellow-400" />
                  <span className="text-xs text-gray-600">{program.rating}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Users className="w-3 h-3 text-gray-400" />
                  <span className="text-xs text-gray-600">{program.totalRating}</span>
                </div>
              </div>
            </div>

            <div className="text-right">
              <div className="text-sm font-semibold text-gray-800">{program.progress}%</div>
              <div className="text-xs text-gray-500">{program.views} views</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgramTerpopuler;