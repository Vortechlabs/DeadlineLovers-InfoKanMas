import AdminDesaLayout from "@/layouts/AdminDesaLayout";
import { AdminLayout } from "@/layouts/AdminLayout";
import AdminDesaDashboard from "@/pages/admin-desa/dashboard";
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
        path: "pengajuan",
        element: <ReviewRABPage />,
      },
      {
        path: "monitoring",
        element: <MonitoringPage />,
      },
      {
        path: "laporan",
        element: <LaporanPage />,
      },
      {
        path: "daerah",
        element: <DataDaerahPage />,
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
