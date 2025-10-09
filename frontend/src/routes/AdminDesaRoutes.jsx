import AdminDesaLayout from "@/layouts/AdminDesaLayout";
import AdminDesaAjukanProgram from "@/pages/admin-desa/ajukan-program";
import AdminDesaBansosDesa from "@/pages/admin-desa/bansos-desa";
import AdminDesaDashboard from "@/pages/admin-desa/dashboard";
import AdminDesaDataWarga from "@/pages/admin-desa/data-warga";
import AdminDesaInfrastruktur from "@/pages/admin-desa/infrastruktur";
import AdminDesaMonitoringProgram from "@/pages/admin-desa/monitoring-program";
import AdminDesaPenerimaManfaat from "@/pages/admin-desa/penerima-manfaat";
import AdminDesaPengaduanWarga from "@/pages/admin-desa/pengaduan-masyarakat";
import AdminDesaProgramDesa from "@/pages/admin-desa/program-desa";
import AdminDesaProgressHarian from "@/pages/admin-desa/progress-harian";

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
        path: "infrastruktur",
        element: <AdminDesaInfrastruktur />,
      },
      {
        path: "bansos",
        element: <AdminDesaBansosDesa />,
      },
      {
        path: "warga",
        element: <AdminDesaDataWarga />,
      },
      {
        path: "penerima",
        element: <AdminDesaPenerimaManfaat />,
      },
    ],
  },
];

export default AdminDesaRoutes;
