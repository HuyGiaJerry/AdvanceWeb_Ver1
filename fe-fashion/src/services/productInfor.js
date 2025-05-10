import apiClient from './apiClient';

const ProductInforService = {
    // Lấy danh sách tất cả các màu sắc
    getAllColors: async () => {
        try {
            const response = await apiClient.get('/ProductInfo/colors');
            return response.data; // Trả về danh sách màu sắc
        } catch (error) {
            console.error('Error fetching colors:', error);
            throw error; // Ném lỗi để xử lý bên ngoài
        }
    },

    // Lấy danh sách tất cả các kích thước
    getAllSizes: async () => {
        try {
            const response = await apiClient.get('/ProductInfo/sizes');
            return response.data; // Trả về danh sách kích thước
        } catch (error) {
            console.error('Error fetching sizes:', error);
            throw error; // Ném lỗi để xử lý bên ngoài
        }
    },
};

export default ProductInforService;