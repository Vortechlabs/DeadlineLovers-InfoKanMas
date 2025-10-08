import AdminDesaLayout from "@/layouts/AdminDesaLayout";
import { AdminLayout } from "@/layouts/AdminLayout";
import AdminDesaAjukanProgram from "@/pages/admin-desa/AjukanProgram";
import AdminDesaDashboard from "@/pages/admin-desa/dashboard";
import AdminDesaMonitoringProgram from "@/pages/admin-desa/monitoring-program";
import AdminDesaPengaduanWarga from "@/pages/admin-desa/pengaduan-masyarakat";
import AdminDesaProgramDesa from "@/pages/admin-desa/program-desa";
import AdminDesaProgressHarian from "@/pages/admin-desa/progress-harian";
import AdminProfilePage from "@/pages/admin-kabupaten/admin-kabupaten-profile";
import AnalyticsDashboard from "@/pages/admin-kabupaten/analytics";
import CompliancePage from "@/pages/admin-kabupaten/compliance";
import DataDaerahPage from "@/pages/admin-kabupaten/data-daerah";
import LaporanPage from "@/pages/admin-kabupaten/laporan";
import LaporanMasyarakatPage from "@/pages/admin-kabupaten/laporan-masyarkat";
import MonitoringPage from "@/pages/admin-kabupaten/monitoring";
import ReviewRABPage from "@/pages/admin-kabupaten/rab-review";

const AdminDesaRoutes = [
  {
    path: "/admin-desa",
    element: <AdminDesaLayout />,
    roles: ["admin_desa"],
    children: [
      {
        path: "",
        element: <AdminDesaDashboard />,
      },
      {
        path: "dashboard",
        element: <AdminDesaDashboard />,
      },
      {
        path: "progress",
        element: <AdminDesaProgressHarian />,
      },
      {
        path: "pengaduan",
        element: <AdminDesaPengaduanWarga />,
      },
      {
        path: "monitoring",
        element: <AdminDesaMonitoringProgram />,
      },
      {
        path: "pengajuan",
        element: <AdminDesaAjukanProgram />,
      },
      {
        path: "proyek",
        element: <AdminDesaProgramDesa />,
      },
      {
        path: "pengaduan",
        element: <LaporanMasyarakatPage />,
      },
      {
        path: "analytics",
        element: <AnalyticsDashboard />,
      },
      {
        path: "compliance",
        element: <CompliancePage />,
      },
      {
        path: "profile",
        element: <AdminProfilePage />,
      },
    ],
  },
];

export default AdminDesaRoutes;
