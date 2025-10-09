import React from "react";
import {
  Building,
  Lightbulb,
  Sprout,
  MapPin,
  Calendar,
  Users,
  DollarSign,
  Clock,
  CheckCircle,
  AlertCircle,
  ChevronRight,
  BrickWall,
  TrafficCone,
  Droplet,
} from "lucide-react";

const InfrastrukturCard = ({ project, viewMode, onClick }) => {
  const getIcon = (iconName) => {
    const icons = {
      TrafficCone: TrafficCone,
      BrickWall: BrickWall,
      Building: Building,
      Droplet: Droplet,
      Lightbulb: Lightbulb,
      Sprout: Sprout,
    };
    return icons[iconName] || Building;
  };

  const getStatusColor = (status) => {
    const colors = {
      akan_datang: "bg-blue-100 text-blue-700 border-blue-200",
      berjalan: "bg-green-100 text-green-700 border-green-200",
      hampir_selesai: "bg-orange-100 text-orange-700 border-orange-200",
      selesai: "bg-gray-100 text-gray-700 border-gray-200",
    };
    return colors[status] || "bg-gray-100 text-gray-700";
  };

  const getStatusIcon = (status) => {
    const icons = {
      akan_datang: Clock,
      berjalan: Clock,
      hampir_selesai: CheckCircle,
      selesai: CheckCircle,
    };
    return icons[status] || Clock;
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const IconComponent = getIcon(project.icon);
  const StatusIcon = getStatusIcon(project.status);

  if (viewMode === "list") {
    return (
      <div
        onClick={onClick}
        className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 cursor-pointer group"
      >
        <div className="flex items-start space-x-4">
          {/* Icon */}
          <div
            className={`w-14 h-14 bg-gradient-to-br ${project.warna} rounded-xl flex items-center justify-center flex-shrink-0`}
          >
            <IconComponent className="w-6 h-6 text-white" />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800 group-hover:text-blue-600 transition-colors line-clamp-1 text-lg">
                  {project.nama}
                </h3>
                <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                  {project.deskripsi}
                </p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors flex-shrink-0 mt-1" />
            </div>

            {/* Status Badges */}
            <div className="flex flex-wrap gap-2 mb-3">
              <span
                className={`px-3 py-1 text-xs font-medium rounded-full border ${getStatusColor(
                  project.status
                )}`}
              >
                <StatusIcon className="w-3 h-3 inline mr-1" />
                {project.status.replace("_", " ")}
              </span>
              <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full">
                {project.jenis}
              </span>
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-3">
              <div className="flex items-center space-x-2">
                <DollarSign className="w-4 h-4 text-green-500" />
                <span className="text-gray-600">
                  {formatCurrency(project.anggaran)}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-purple-500" />
                <span className="text-gray-600 truncate">{project.lokasi}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-orange-500" />
                <span className="text-gray-600">{project.tanggalMulai}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4 text-blue-500" />
                <span className="text-gray-600">{project.dampak}</span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mt-4">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Progress Pengerjaan</span>
                <span>{project.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="h-2 rounded-full transition-all duration-500"
                  style={{
                    width: `${project.progress}%`,
                    background: `linear-gradient(to right, ${
                      project.warna
                        .replace("from-", "")
                        .replace("to-", "")
                        .split(" ")[0]
                    }, ${
                      project.warna
                        .replace("from-", "")
                        .replace("to-", "")
                        .split(" ")[1]
                    })`,
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Grid View (Default)
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 cursor-pointer group"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div
          className={`w-12 h-12 bg-gradient-to-br ${project.warna} rounded-xl flex items-center justify-center`}
        >
          <IconComponent className="w-6 h-6 text-white" />
        </div>
        <div className="flex flex-col items-end space-y-2">
          <span
            className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
              project.status
            )}`}
          >
            <StatusIcon className="w-3 h-3 inline mr-1" />
            {project.status.replace("_", " ")}
          </span>
          {project.rating > 0 && (
            <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs font-medium rounded-full">
              ⭐ {project.rating}
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <h3 className="font-semibold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
        {project.nama}
      </h3>
      <p className="text-sm text-gray-600 mb-4 line-clamp-2">
        {project.deskripsi}
      </p>

      {/* Info Grid */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="text-center p-2 bg-gray-50 rounded-lg">
          <p className="text-xs text-gray-600">Anggaran</p>
          <p className="text-sm font-bold text-green-600 truncate">
            {formatCurrency(project.anggaran)}
          </p>
        </div>
        <div className="text-center p-2 bg-gray-50 rounded-lg">
          <p className="text-xs text-gray-600">Dampak</p>
          <p className="text-sm font-bold text-blue-600 truncate">
            {project.dampak}
          </p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex justify-between text-sm text-gray-600 mb-1">
          <span>Progress</span>
          <span>{project.progress}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="h-2 rounded-full transition-all duration-500"
            style={{
              width: `${project.progress}%`,
              background: `linear-gradient(to right, ${
                project.warna
                  .replace("from-", "")
                  .replace("to-", "")
                  .split(" ")[0]
              }, ${
                project.warna
                  .replace("from-", "")
                  .replace("to-", "")
                  .split(" ")[1]
              })`,
            }}
          ></div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between text-sm text-gray-600">
        <div className="flex items-center space-x-1">
          <MapPin className="w-4 h-4" />
          <span className="truncate max-w-[100px]">{project.lokasi}</span>
        </div>
        <div className="flex items-center space-x-1">
          <Calendar className="w-4 h-4" />
          <span>{project.tanggalMulai}</span>
        </div>
      </div>

      {/* Quick Issues */}
      {project.masalah.length > 0 && (
        <div className="mt-3 p-2 bg-orange-50 border border-orange-200 rounded-lg">
          <div className="flex items-center space-x-2">
            <AlertCircle className="w-3 h-3 text-orange-500 flex-shrink-0" />
            <p className="text-xs text-orange-700 line-clamp-1">
              {project.masalah[0]}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default InfrastrukturCard;
