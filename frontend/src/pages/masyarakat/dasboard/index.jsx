import React from 'react';
import { 
  Eye, 
  CheckCircle, 
  Star, 
  AlertCircle, 
  TrendingUp, 
  Users, 
  MapPin, 
  Clock,
  Heart,
  Wrench,
  Building,
  ChevronRight,
  PlayCircle
} from 'lucide-react';

function MasyarakatDashboard() {
  // Data sample untuk dashboard
  const statsData = {
    totalProgram: 12,
    programAktif: 8,
    perluKonfirmasi: 3,
    ratingDiberikan: 5,
    laporanAktif: 2
  };

  const programTerbaru = [
    {
      id: 1,
      nama: "Bantuan Sembako 1000 KK",
      jenis: "bansos",
      progress: 75,
      status: "berjalan",
      tanggal: "15 Mar 2024",
      warna: "from-orange-500 to-orange-600",
      icon: Heart
    },
    {
      id: 2,
      nama: "Perbaikan Jalan Desa",
      jenis: "infrastruktur", 
      progress: 45,
      status: "berjalan",
      tanggal: "20 Mar 2024",
      warna: "from-blue-500 to-blue-600",
      icon: Wrench
    },
    {
      id: 3,
      nama: "Renovasi Puskesmas",
      jenis: "kesehatan",
      progress: 90,
      status: "hampir selesai",
      tanggal: "10 Mar 2024",
      warna: "from-green-500 to-green-600",
      icon: Building
    }
  ];

  const aksiCepat = [
    { 
      icon: CheckCircle, 
      label: "Konfirmasi Bantuan", 
      deskripsi: "3 menunggu konfirmasi",
      warna: "bg-gradient-to-r from-green-500 to-emerald-500",
      path: "/masyarakat/konfirmasi",
      badge: "3"
    },
    { 
      icon: Star, 
      label: "Beri Rating", 
      deskripsi: "2 program perlu dinilai",
      warna: "bg-gradient-to-r from-yellow-500 to-orange-500",
      path: "/masyarakat/rating",
      badge: "2"
    },
    { 
      icon: AlertCircle, 
      label: "Lapor Masalah", 
      deskripsi: "Sampaikan keluhan",
      warna: "bg-gradient-to-r from-red-500 to-pink-500",
      path: "/masyarakat/laporan"
    },
    { 
      icon: Eye, 
      label: "Lihat Semua Program", 
      deskripsi: "12 program aktif",
      warna: "bg-gradient-to-r from-blue-500 to-cyan-500",
      path: "/masyarakat/program"
    }
  ];

  const StatCard = ({ icon: Icon, label, value, color, subtitle }) => (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600 mb-1">{label}</p>
          <p className={`text-2xl font-bold ${color} mb-1`}>{value}</p>
          {subtitle && <p className="text-xs text-gray-500">{subtitle}</p>}
        </div>
        <div className="w-12 h-12 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl flex items-center justify-center">
          <Icon className="w-6 h-6 text-blue-500" />
        </div>
      </div>
    </div>
  );

  const ProgramCard = ({ program }) => {
    const IconComponent = program.icon;
    
    return (
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 group">
        <div className="flex items-start justify-between mb-4">
          <div className="w-12 h-12 bg-gradient-to-br rounded-xl flex items-center justify-center">
            <IconComponent className="w-6 h-6 text-white" />
          </div>
          <span className="text-xs font-medium px-2 py-1 bg-gray-100 rounded-full text-gray-600">
            {program.status}
          </span>
        </div>
        
        <h3 className="font-semibold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
          {program.nama}
        </h3>
        
        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-sm text-gray-600 mb-1">
              <span>Progress</span>
              <span>{program.progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r h-2 rounded-full transition-all duration-500"
                style={{ 
                  width: `${program.progress}%`,
                  background: `linear-gradient(to right, ${program.warna.replace('from-', '').replace('to-', '').split(' ')[0]}, ${program.warna.replace('from-', '').replace('to-', '').split(' ')[1]})`
                }}
              ></div>
            </div>
          </div>
          
          <div className="flex justify-between items-center text-xs text-gray-500">
            <span>📅 {program.tanggal}</span>
            <button className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 font-medium">
              <span>Detail</span>
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    );
  };

  const AksiCepatCard = ({ aksi }) => {
    const IconComponent = aksi.icon;
    
    return (
      <button className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 group text-left">
        <div className="flex items-start justify-between mb-3">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${aksi.warna}`}>
            <IconComponent className="w-5 h-5 text-white" />
          </div>
          {aksi.badge && (
            <span className="px-2 py-1 bg-red-100 text-red-600 text-xs rounded-full font-bold">
              {aksi.badge}
            </span>
          )}
        </div>
        
        <h3 className="font-semibold text-gray-800 mb-1 group-hover:text-blue-600 transition-colors">
          {aksi.label}
        </h3>
        <p className="text-xs text-gray-600">{aksi.deskripsi}</p>
      </button>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 p-4">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-2xl font-bold text-gray-900">Dashboard Masyarakat</h1>
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
            <Users className="w-5 h-5 text-white" />
          </div>
        </div>
        <p className="text-gray-600">Pantau program dan berikan partisipasimu</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <StatCard 
          icon={Eye}
          label="Total Program"
          value={statsData.totalProgram}
          color="text-blue-600"
          subtitle="Aktif: 8 program"
        />
        <StatCard 
          icon={CheckCircle}
          label="Perlu Konfirmasi"
          value={statsData.perluKonfirmasi}
          color="text-orange-600"
          subtitle="Menunggu respon"
        />
      </div>

      {/* Hero Section dengan Visual */}
      <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl p-5 text-white mb-6 relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-xl font-bold mb-2">Selamat Datang!</h2>
          <p className="text-blue-100 mb-4">
            Partisipasimu membantu transparansi program desa
          </p>
          <div className="flex items-center space-x-2 text-sm">
            <div className="flex items-center space-x-1">
              <CheckCircle className="w-4 h-4" />
              <span>Konfirmasi bantuan</span>
            </div>
            <div className="w-1 h-1 bg-blue-300 rounded-full"></div>
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4" />
              <span>Beri rating</span>
            </div>
            <div className="w-1 h-1 bg-blue-300 rounded-full"></div>
            <div className="flex items-center space-x-1">
              <Eye className="w-4 h-4" />
              <span>Pantau progress</span>
            </div>
          </div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>
      </div>

      {/* Aksi Cepat */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-900">Aksi Cepat</h2>
          <PlayCircle className="w-5 h-5 text-gray-500" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          {aksiCepat.map((aksi, index) => (
            <AksiCepatCard key={index} aksi={aksi} />
          ))}
        </div>
      </div>

      {/* Program Terbaru */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-900">Program Terbaru</h2>
          <button className="text-sm text-blue-600 font-medium flex items-center space-x-1">
            <span>Lihat Semua</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        <div className="space-y-4">
          {programTerbaru.map((program) => (
            <ProgramCard key={program.id} program={program} />
          ))}
        </div>
      </div>

      {/* Tips Partisipasi */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
        <h3 className="font-semibold text-gray-800 mb-3 flex items-center space-x-2">
          <TrendingUp className="w-5 h-5 text-green-500" />
          <span>Tips Partisipasi Aktif</span>
        </h3>
        <div className="space-y-2 text-sm text-gray-600">
          <div className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg">
            <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
              <span className="text-green-600 text-xs font-bold">1</span>
            </div>
            <span>Konfirmasi segera setelah terima bantuan</span>
          </div>
          <div className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg">
            <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-blue-600 text-xs font-bold">2</span>
            </div>
            <span>Beri rating jujur untuk perbaikan program</span>
          </div>
          <div className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg">
            <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center">
              <span className="text-orange-600 text-xs font-bold">3</span>
            </div>
            <span>Laporkan masalah dengan bukti yang jelas</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MasyarakatDashboard;