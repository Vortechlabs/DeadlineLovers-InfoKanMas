import { AdminLayout } from "@/layouts/AdminLayout";
import AdminProfilePage from "@/pages/admin-pusat/admin-pusat-profile";
import AnalyticsDashboard from "@/pages/admin-pusat/analytics";
import CompliancePage from "@/pages/admin-pusat/compliance";
import AdminPusatDashboard from "@/pages/admin-pusat/dashboard";
import DataDaerahPage from "@/pages/admin-pusat/data-daerah";
import LaporanPage from "@/pages/admin-pusat/laporan";
import LaporanMasyarakatPage from "@/pages/admin-pusat/laporan-masyarkat";
import MonitoringPage from "@/pages/admin-pusat/monitoring";
import ReviewRABPage from "@/pages/admin-pusat/rab-review";

const AdminPusatRoutes = [
  {
    path: "/admin-pusat",
    element: <AdminLayout />,
    roles: ["admin_pusat"],
    children: [
      {
        path: "",
        element: <AdminPusatDashboard />,
      },
      {
        path: "dashboard",
        element: <AdminPusatDashboard />,
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

export default AdminPusatRoutes;
