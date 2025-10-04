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
  const [tapel, setTapel] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);
  const [lastLogin, setLastLogin] = useState(null);
  const navigate = useNavigate();

  const persistAuthData = useCallback(
    (userData, authToken, remember, selectedTapel) => {
      // Clear both storages first
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("tapel");
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("user");
      sessionStorage.removeItem("tapel");

      const storage = remember ? localStorage : sessionStorage;

      if (authToken) storage.setItem("token", authToken);
      if (userData) {
        storage.setItem("user", JSON.stringify(userData));
        setLastLogin(userData.last_login_at || null);
      }
      if (selectedTapel) {
        storage.setItem("tapel", JSON.stringify(selectedTapel));
        setTapel(selectedTapel);
      }

      if (authToken) {
        apiClient.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${authToken}`;
      }
    },
    []
  );

  const clearAuthData = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("tapel");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("tapel");
    delete apiClient.defaults.headers.common["Authorization"];
    setUser(null);
    setToken(null);
    setTapel(null);
    setLastLogin(null);
  }, []);

  const fetchUserWithPermissions = useCallback(async (authToken) => {
    try {
      apiClient.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${authToken}`;
      
      const response = await apiClient.get("/user");
      return response.data.user;
    } catch (error) {
      console.error("Failed to fetch user data:", error);
      throw error;
    }
  }, []);

  const fetchTapelById = useCallback(async (tapelId) => {
    try {
      const response = await apiClient.get(`/tapel/${tapelId}`);
      return response.data.data;
    } catch (error) {
      console.error("Failed to fetch tapel data:", error);
      return null;
    }
  }, []);

  const initializeAuth = useCallback(async () => {
    setIsLoading(true);
    
    try {
      let storedToken = localStorage.getItem("token");
      let storedUser = localStorage.getItem("user");
      let storedTapel = localStorage.getItem("tapel");
      let isRemembered = true;

      if (!storedToken) {
        storedToken = sessionStorage.getItem("token");
        storedUser = sessionStorage.getItem("user");
        storedTapel = sessionStorage.getItem("tapel");
        isRemembered = false;
      }

      if (storedToken && storedUser) {
        try {
          const freshUserData = await fetchUserWithPermissions(storedToken);
          
          let tapelData = null;
          if (storedTapel) {
            tapelData = JSON.parse(storedTapel);
          }

          if (freshUserData) {
            setUser(freshUserData);
            setToken(storedToken);
            setTapel(tapelData);
            setLastLogin(freshUserData.last_login_at || null);

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
        setTapel(null);
        setLastLogin(null);
      }
    } catch (error) {
      console.error("Auth initialization failed:", error);
      clearAuthData();
    } finally {
      setIsLoading(false);
      setIsInitialized(true);
    }
  }, [clearAuthData, fetchUserWithPermissions]);

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  const login = useCallback(
    async (credentials) => {
      setIsLoading(true);
      try {
        const response = await apiClient.post(
          "/auth/login",
          credentials
        );
        
        const { token: authToken } = response.data;

        const completeUserData = await fetchUserWithPermissions(authToken);
        const tapelData = await fetchTapelById(credentials.tapel);
        
        if (completeUserData && tapelData) {
          setUser(completeUserData);
          setToken(authToken);
          setTapel(tapelData);
          setLastLogin(completeUserData.last_login_at || null);

          persistAuthData(completeUserData, authToken, credentials.remember, tapelData);

          const roleName = completeUserData.role.name;
          if (roleName === 'admin') {
            navigate('/admin/dashboard', { replace: true });
          } else if (roleName === 'teacher') {
            navigate('/teacher/dashboard', { replace: true });
          } else {
            navigate('/', { replace: true });
          }
        }
      } catch (error) {
        console.error("Login failed:", error);
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [persistAuthData, fetchUserWithPermissions, fetchTapelById, navigate]
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

  const handleGoogleLogin = useCallback(() => {
    window.location.href = `${apiClient.defaults.baseURL}/auth/google`;
  }, []);

  const handleGoogleCallback = useCallback(
    async (googleToken) => {
      setIsLoading(true);
      try {
        const completeUserData = await fetchUserWithPermissions(googleToken);
        
        if (completeUserData) {
          setUser(completeUserData);
          setToken(googleToken);
          setLastLogin(new Date().toISOString());

          sessionStorage.setItem("token", googleToken);
          sessionStorage.setItem("user", JSON.stringify(completeUserData));

          if (completeUserData.role.name === "admin") {
            navigate("/admin/dashboard", { replace: true });
          } else if (completeUserData.role.name === "teacher") {
            navigate("/teacher/dashboard", { replace: true });
          } else {
            navigate("/student/dashboard", { replace: true });
          }

          return true;
        }
        return false;
      } catch (error) {
        console.error("Google callback failed:", error);
        clearAuthData();
        navigate("/auth/login", { replace: true });
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    [navigate, clearAuthData, fetchUserWithPermissions]
  );

  const isAuthenticated = React.useMemo(() => {
    return !!user && !!token && isInitialized;
  }, [user, token, isInitialized]);

  const value = React.useMemo(
    () => ({
      user,
      token,
      tapel,
      isLoading,
      isInitialized,
      login,
      logout,
      handleGoogleLogin,
      handleGoogleCallback,
      isAuthenticated,
      lastLogin,
    }),
    [
      user,
      token,
      tapel,
      isLoading,
      isInitialized,
      lastLogin,
      login,
      logout,
      handleGoogleLogin,
      handleGoogleCallback,
      isAuthenticated,
    ]
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