import { Routes, Route } from "react-router-dom";
import publicRoutes from "./PublicRoutes";
import AuthRoutes from "./AuthRoutes";
import AdminRoutes from "./AdminRoutes";
import ProtectedRoute from "./ProtectedRoute";
import NotFoundPage from "@/components/NotFoundPage";
import { RootLayout } from "@/layouts/RootLayout";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<RootLayout />}>
        {publicRoutes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Route>

      {/* Auth Routes */}
      <Route element={<RootLayout />}>
        {AuthRoutes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Route>


      {/* Admin Routes */}
      {AdminRoutes.map((route) => (
        <Route
          key={route.path}
          path={route.path}
          // element={
          //   <ProtectedRoute
          //     roles={route.roles}
          //     permissions={route.permissions}
          //   >
          //     {route.element}
          //   </ProtectedRoute>
          // }
        >
          {route.children?.map((child) => (
            <Route
              key={child.path}
              path={child.path}
              element={child.element}
            />
          ))}
        </Route>
      ))}

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}