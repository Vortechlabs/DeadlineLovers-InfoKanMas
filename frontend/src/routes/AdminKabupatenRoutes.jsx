import { AdminLayout } from "@/layouts/AdminLayout";
import AdminProfilePage from "@/pages/admin-kabupaten/admin-kabupaten-profile";
import AnalyticsDashboard from "@/pages/admin-kabupaten/analytics";
import CompliancePage from "@/pages/admin-kabupaten/compliance";
import AdminKabupatenDashboard from "@/pages/admin-kabupaten/dashboard";
import DataDaerahPage from "@/pages/admin-kabupaten/data-daerah";
import LaporanPage from "@/pages/admin-kabupaten/laporan";
import LaporanMasyarakatPage from "@/pages/admin-kabupaten/laporan-masyarkat";
import MonitoringPage from "@/pages/admin-kabupaten/monitoring";
import ReviewRABPage from "@/pages/admin-kabupaten/rab-review";

const AdminKabupatenRoutes = [
  {
    path: "/admin-kabupaten",
    element: <AdminLayout />,
    roles: ["admin_kabupaten"],
    children: [
      {
        path: "",
        element: <AdminKabupatenDashboard />,
      },
      {
        path: "dashboard",
        element: <AdminKabupatenDashboard />,
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

export default AdminKabupatenRoutes;
