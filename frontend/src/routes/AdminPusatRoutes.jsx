import { AdminLayout } from "@/layouts/AdminLayout";
import AdminPusatDashboard from "@/pages/admin-pusat/dashboard";

const AdminPusatRoutes = [
  {
    path: "/admin-pusat",
    element: <AdminLayout />,
    roles: ["admin_pusat"],
    children: [
      {
        path: "dashboard",
        element: <AdminPusatDashboard />,
      },
    ],
  },
];

export default AdminPusatRoutes;
