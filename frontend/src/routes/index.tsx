import { Routes, Route } from "react-router-dom";
import publicRoutes from "./PublicRoutes";
import AuthRoutes from "./AuthRoutes";
import ProtectedRoute from "./ProtectedRoute";
import NotFoundPage from "@/components/NotFoundPage";
import { RootLayout } from "@/layouts/RootLayout";
import AdminKabupatenRoutes from "./AdminKabupatenRoutes";
import AdminDesaRoutes from "./AdminDesaRoutes";
import MasyarakatRoutes from "./MasyarakatRoutes";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<RootLayout />}>
        {publicRoutes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Route>

      {/* Auth Routes Routes */}
      {AuthRoutes.map((route) => (
        <Route
          key={route.path}
          path={route.path}
          element={
            route.element
            //   <ProtectedRoute
            //     roles={route.roles}
            //     permissions={route.permissions}
            //   >
            //     {route.element}
            //   </ProtectedRoute>
          }
        >
          {route.children?.map((child) => (
            <Route key={child.path} path={child.path} element={child.element} />
          ))}
        </Route>
      ))}

      {/* Admin Kabupaten Routes */}
      {AdminKabupatenRoutes.map((route) => (
        <Route
          key={route.path}
          path={route.path}
          element={
            route.element
            //   <ProtectedRoute
            //     roles={route.roles}
            //     permissions={route.permissions}
            //   >
            //     {route.element}
            //   </ProtectedRoute>
          }
        >
          {route.children?.map((child) => (
            <Route key={child.path} path={child.path} element={child.element} />
          ))}
        </Route>
      ))}

      {/* Admin Desa Routes */}
      {AdminDesaRoutes.map((route) => (
        <Route
          key={route.path}
          path={route.path}
          element={
            route.element
            //   <ProtectedRoute
            //     roles={route.roles}
            //     permissions={route.permissions}
            //   >
            //     {route.element}
            //   </ProtectedRoute>
          }
        >
          {route.children?.map((child) => (
            <Route key={child.path} path={child.path} element={child.element} />
          ))}
        </Route>
      ))}

      {/* Masyarakat Routes */}
      {MasyarakatRoutes.map((route) => (
        <Route
          key={route.path}
          path={route.path}
          element={
            route.element
            //   <ProtectedRoute
            //     roles={route.roles}
            //     permissions={route.permissions}
            //   >
            //     {route.element}
            //   </ProtectedRoute>
          }
        >
          {route.children?.map((child) => (
            <Route key={child.path} path={child.path} element={child.element} />
          ))}
        </Route>
      ))}

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
