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

  const fetchUserProfile = useCallback(async (authToken) => {
    try {
      console.log("Fetching user profile with token:", authToken);

      const response = await apiClient.get("/user/me");
      console.log("User profile response:", response.data);

      return response.data.data;
    } catch (error) {
      console.error("Failed to fetch user profile:", error);
      throw error;
    }
  }, []);

  const initializeAuth = useCallback(async () => {
    setIsLoading(true);

    try {
      let storedToken = localStorage.getItem("token");
      let storedUser = localStorage.getItem("user");
      let isRemembered = true;

      if (!storedToken) {
        storedToken = sessionStorage.getItem("token");
        storedUser = sessionStorage.getItem("user");
        isRemembered = false;
      }

      console.log("Initializing auth with token:", storedToken);

      if (storedToken) {
        try {
          // Set header dulu sebelum fetch user profile
          apiClient.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${storedToken}`;

          // Validasi token dengan mengambil data user terbaru
          const freshUserData = await fetchUserProfile(storedToken);

          if (freshUserData) {
            setUser(freshUserData);
            setToken(storedToken);

            // Update storage dengan data terbaru
            const storage = isRemembered ? localStorage : sessionStorage;
            storage.setItem("user", JSON.stringify(freshUserData));
          }
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
  }, [clearAuthData, fetchUserProfile]);

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

        // Set header untuk request selanjutnya
        apiClient.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${authToken}`;

        // Get fresh user data
        const completeUserData = await fetchUserProfile(authToken);
        console.log("Complete user data:", completeUserData);

        if (completeUserData) {
          setUser(completeUserData);
          setToken(authToken);

          // Persist data based on remember me
          persistAuthData(completeUserData, authToken, credentials.remember);

          // Redirect based on role
          const role = completeUserData.role;
          console.log("User role:", role);

          if (role === "admin_kabupaten") {
            navigate("/admin-kabupaten/dashboard", { replace: true });
          } else if (role === "admin_dinas") {
            navigate("/admin-dinas/dashboard", { replace: true });
          } else if (role === "admin_kecamatan") {
            navigate("/admin-kecamatan/dashboard", { replace: true });
          } else if (role === "admin_desa") {
            navigate("/admin-desa/dashboard", { replace: true });
          } else if (role === "user") {
            navigate("/masyarakat/dashboard", { replace: true });
          } else {
            navigate("/", { replace: true });
          }

          return completeUserData;
        }
      } catch (error) {
        console.error("Login failed:", error);
        // Throw error dengan message yang lebih spesifik
        const errorMessage =
          error.response?.data?.message || error.message || "Login gagal";
        throw new Error(errorMessage);
      } finally {
        setIsLoading(false);
      }
    },
    [persistAuthData, fetchUserProfile, navigate]
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
