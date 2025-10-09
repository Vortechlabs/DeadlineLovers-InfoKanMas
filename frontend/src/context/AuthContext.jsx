// contexts/AuthContext.js
import apiClient from "@/services/GlobalApi";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);
  const navigate = useNavigate();

  const persistAuthData = useCallback((userData, authToken, remember) => {
    console.log("Persisting auth data:", { userData, authToken, remember });

    // Clear both storages first
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");

    const storage = remember ? localStorage : sessionStorage;

    if (authToken) {
      storage.setItem("token", authToken);
      setToken(authToken);
    }

    if (userData) {
      storage.setItem("user", JSON.stringify(userData));
      setUser(userData);
    }

    // Set authorization header for API client
    if (authToken) {
      apiClient.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${authToken}`;
    }
  }, []);

  const clearAuthData = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    delete apiClient.defaults.headers.common["Authorization"];
    setUser(null);
    setToken(null);
  }, []);

  // Function untuk handle redirect berdasarkan role
  const redirectBasedOnRole = useCallback((userData) => {
    const role = userData?.role;
    console.log("Redirecting based on role:", role);

    // Beri sedikit delay untuk memastikan state sudah ter-update
    setTimeout(() => {
      switch (role) {
        case "admin_kabupaten":
          navigate("/admin-kabupaten/dashboard", { replace: true });
          break;
        case "admin_dinas":
          navigate("/admin-dinas/dashboard", { replace: true });
          break;
        case "admin_kecamatan":
          navigate("/admin-kecamatan/dashboard", { replace: true });
          break;
        case "admin_desa":
          navigate("/admin-desa/dashboard", { replace: true });
          break;
        case "user":
        case "masyarakat":
          navigate("/masyarakat/dashboard", { replace: true });
          break;
        default:
          navigate("/", { replace: true });
          break;
      }
    }, 100);
  }, [navigate]);

  const initializeAuth = useCallback(async () => {
    setIsLoading(true);

    try {
      let storedToken = localStorage.getItem("token");
      let storedUser = localStorage.getItem("user");

      if (!storedToken) {
        storedToken = sessionStorage.getItem("token");
        storedUser = sessionStorage.getItem("user");
      }

      console.log("Initializing auth with token:", storedToken);

      if (storedToken && storedUser) {
        try {
          // Set header untuk request selanjutnya
          apiClient.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${storedToken}`;

          const userData = JSON.parse(storedUser);
          setUser(userData);
          setToken(storedToken);

          console.log("Auth initialized with stored user:", userData);
        } catch (error) {
          console.error("Token validation failed:", error);
          clearAuthData();
        }
      } else {
        setUser(null);
        setToken(null);
      }
    } catch (error) {
      console.error("Auth initialization failed:", error);
      clearAuthData();
    } finally {
      setIsLoading(false);
      setIsInitialized(true);
    }
  }, [clearAuthData]);

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  const login = useCallback(
    async (credentials) => {
      setIsLoading(true);
      try {
        console.log("Attempting login with:", credentials);

        // Login request
        const response = await apiClient.post("/Auth/login", credentials);
        console.log("Login response:", response.data);

        const { data } = response.data;
        const authToken = data.access_token;
        const userData = data.user;

        console.log("Received token:", authToken);
        console.log("Received user:", userData);

        if (!authToken || !userData) {
          throw new Error("Invalid response from server");
        }

        // Set header untuk request selanjutnya
        apiClient.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${authToken}`;

        // Gunakan user data langsung dari login response
        // Tidak perlu fetch ulang ke /user/me
        setUser(userData);
        setToken(authToken);

        // Persist data based on remember me
        persistAuthData(userData, authToken, credentials.remember);

        // Redirect based on role
        redirectBasedOnRole(userData);

        return userData;

      } catch (error) {
        console.error("Login failed:", error);
        // Clear auth data jika login gagal
        clearAuthData();
        
        const errorMessage =
          error.response?.data?.message || error.message || "Login gagal";
        throw new Error(errorMessage);
      } finally {
        setIsLoading(false);
      }
    },
    [persistAuthData, redirectBasedOnRole, clearAuthData]
  );

  const logout = useCallback(async () => {
    try {
      if (token) {
        await apiClient.post("/auth/logout");
      }
    } catch (error) {
      console.error("Logout failed", error);
    } finally {
      clearAuthData();
      navigate("/auth/login", { replace: true });
    }
  }, [token, navigate, clearAuthData]);

  const isAuthenticated = React.useMemo(() => {
    return !!user && !!token && isInitialized;
  }, [user, token, isInitialized]);

  const value = React.useMemo(
    () => ({
      user,
      token,
      isLoading,
      isInitialized,
      login,
      logout,
      isAuthenticated,
    }),
    [user, token, isLoading, isInitialized, login, logout, isAuthenticated]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};