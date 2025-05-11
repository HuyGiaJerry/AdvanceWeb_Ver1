import apiClient from './apiClient';

const orderService = {
    filterOrder: async (status, userId) => {
        try {
            const response = await apiClient.get('/Order/filter-by-status', {
                params: { status, userId }, // Gửi các tham số qua query params
            });
            return response.data; // Trả về dữ liệu từ API
        } catch (error) {
            console.error('Lỗi khi lọc đơn hàng:', error);
            throw error; // Ném lỗi để xử lý ở nơi gọi hàm
        }
    },
};

export default orderService;