import React from 'react';
import { BarChart3, TrendingUp, Download } from 'lucide-react';

const GrafikProgress = ({ data, selectedTahun }) => {
  // Sample chart data
  const chartData = [
    { bulan: 'Jan', progress: 45, program: 8 },
    { bulan: 'Feb', progress: 60, program: 12 },
    { bulan: 'Mar', progress: 78, program: 18 },
    { bulan: 'Apr', progress: 65, program: 15 },
    { bulan: 'Mei', progress: 40, program: 10 },
    { bulan: 'Jun', progress: 55, program: 13 }
  ];

  const maxProgress = Math.max(...chartData.map(d => d.progress));
  const maxProgram = Math.max(...chartData.map(d => d.program));

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 h-full">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-semibold text-gray-800 flex items-center space-x-2">
          <BarChart3 className="w-5 h-5 text-blue-500" />
          <span>Progress Bulanan {selectedTahun}</span>
        </h3>
        <button className="flex items-center space-x-2 px-3 py-2 bg-gray-100 text-gray-600 rounded-xl hover:bg-gray-200 transition-colors">
          <Download className="w-4 h-4" />
          <span className="text-sm">Export</span>
        </button>
      </div>

      {/* Chart Container */}
      <div className="space-y-6">
        {/* Progress Bars */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-semibold text-gray-700">Rata-rata Progress</h4>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <TrendingUp className="w-4 h-4 text-green-500" />
              <span>+12% dari bulan lalu</span>
            </div>
          </div>
          
          <div className="space-y-3">
            {chartData.map((item, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className="w-12 text-sm text-gray-600 font-medium">{item.bulan}</div>
                <div className="flex-1 flex items-center space-x-2">
                  <div className="flex-1 bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-cyan-500 h-3 rounded-full transition-all duration-500"
                      style={{ width: `${(item.progress / maxProgress) * 100}%` }}
                    ></div>
                  </div>
                  <div className="w-12 text-sm font-semibold text-gray-800 text-right">
                    {item.progress}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Program Count */}
        <div>
          <h4 className="text-sm font-semibold text-gray-700 mb-3">Jumlah Program Aktif</h4>
          <div className="grid grid-cols-6 gap-2">
            {chartData.map((item, index) => (
              <div key={index} className="text-center">
                <div 
                  className="bg-gradient-to-b from-orange-400 to-orange-500 rounded-t-lg transition-all duration-300 hover:from-orange-500 hover:to-orange-600"
                  style={{ height: `${(item.program / maxProgram) * 80}px` }}
                ></div>
                <div className="text-xs text-gray-600 mt-1">{item.bulan}</div>
                <div className="text-xs font-semibold text-gray-800">{item.program}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Summary */}
        <div className="grid grid-cols-3 gap-3 pt-4 border-t border-gray-200">
          <div className="text-center p-3 bg-blue-50 rounded-xl">
            <div className="text-lg font-bold text-blue-600">
              {Math.round(chartData.reduce((acc, curr) => acc + curr.progress, 0) / chartData.length)}%
            </div>
            <div className="text-xs text-blue-800">Progress Rata-rata</div>
          </div>
          <div className="text-center p-3 bg-green-50 rounded-xl">
            <div className="text-lg font-bold text-green-600">
              {chartData[chartData.length - 1].progress}%
            </div>
            <div className="text-xs text-green-800">Progress Terkini</div>
          </div>
          <div className="text-center p-3 bg-orange-50 rounded-xl">
            <div className="text-lg font-bold text-orange-600">
              +{chartData[chartData.length - 1].progress - chartData[chartData.length - 2].progress}%
            </div>
            <div className="text-xs text-orange-800">Peningkatan</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GrafikProgress;