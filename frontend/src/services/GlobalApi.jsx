import axios from 'axios';

// Konfigurasi base URL untuk Vite
const getBaseUrl = () => {
  const envUrl = import.meta.env.VITE_BACKEND_BASE_URL || 'http://localhost:8000';
  return `${envUrl}/api/V1`;
};

const apiClient = axios.create({
  baseURL: getBaseUrl(),
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Tambahkan properti kustom
apiClient.storageBaseUrl = 'http://localhost:8000';

// Request Interceptor
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    if (config.data instanceof FormData) {
      delete config.headers['Content-Type'];
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      const requestURL = error.config?.url || '';

      // Kalau bukan endpoint login penting, logout
      if (!requestURL.includes('/users') || requestURL.endsWith('/me')) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('user');
        delete apiClient.defaults.headers.common.Authorization;

        if (!window.location.pathname.includes('/auth/login')) {
          window.location.href = '/auth/login';
        }
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;