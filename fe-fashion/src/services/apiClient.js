import axios from 'axios';

const apiClient = axios.create({
    baseURL: process.env.REACT_APP_API_URL, // Base URL từ .env
    timeout: process.env.REACT_APP_REQUEST_TIMEOUT || 5000, // Timeout mặc định
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor để thêm token vào mỗi request (nếu cần)
apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('accessToken'); // Lấy token từ localStorage
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default apiClient;