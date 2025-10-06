import { AuthLayout } from "@/layouts/AuthLayout";
import LoginPage from "@/pages/auth/login";


const AuthRoutes = [
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <LoginPage />,
      },
    ],
  },
];

export default AuthRoutes 
