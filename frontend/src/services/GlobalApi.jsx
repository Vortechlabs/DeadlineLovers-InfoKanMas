import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://api-elearning.smkn1pbg.sch.id/api/v1',
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
      // Cek apakah dari endpoint yang sensitif
      const requestURL = error.config?.url || '';

      // Kalau bukan endpoint login penting (contoh: ubah password), jangan logout langsung
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