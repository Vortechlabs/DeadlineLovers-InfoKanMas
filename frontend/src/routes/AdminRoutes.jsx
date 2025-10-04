import { AdminLayout } from "../layouts/AdminLayout";
import DashboardAdmin from "../pages/admin/dashboard";

const AdminRoutes = [
  {
    path: "/admin",
    element: <AdminLayout />,
    roles: ["admin"],
    children: [
      {
        path: "dashboard",
        element: <DashboardAdmin />,
      },
    ],
  },
];

export default AdminRoutes;
