import { useLocation, Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Loader2 } from "lucide-react";

export default function ProtectedRoute({
  children,
  roles = [],
  permissions = [],
  redirectTo = "/auth/login",
}) {
  const { user, isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center w-screen h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  if (!user || !user.role) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  // Check role first
  if (roles.length > 0 && !roles.includes(user.role.name)) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  // Then check permissions if needed
  if (permissions.length > 0) {
    const userPermissions = user.role.permissions || [];
    const hasPermission = permissions.some(permission => 
      userPermissions.includes(permission)
    );

    if (!hasPermission) {
      return <Navigate to="/" state={{ from: location }} replace />;
    }
  }

  return <>{children}</>;
}