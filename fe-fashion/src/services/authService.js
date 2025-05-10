import apiClient from './apiClient';

const authService = {
    login: async (credentials) => {
        const response = await apiClient.post('/User/login', credentials);
        return response.data;
    },

    googleLogin: async (code) => {
        const response = await apiClient.post('/Auth/google-login', { code });
        return response.data;
    },

    logout: () => {
        localStorage.removeItem('authState'); // Xóa thông tin đăng nhập khỏi localStorage
    },
};

export default authService;