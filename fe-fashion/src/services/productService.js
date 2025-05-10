import apiClient from './apiClient';

const productService = {
    getProducts: async () => {
        const response = await apiClient.get('/Product/products');
        return response.data;
    },

    getProductById: async (id) => {
        const response = await apiClient.get(`/Product/${id}`);
        return response.data;
    },
    searchProductByName: async (searchName) => {
        try {
            const response = await apiClient.get(`/Product/productName?searchTerm=${searchName}`);
            return response.data; // Trả về danh sách sản phẩm từ API
        } catch (error) {
            console.error('Lỗi khi tìm kiếm sản phẩm theo tên:', error);
            throw error; // Ném lỗi để xử lý ở nơi gọi hàm
        }
    },

};

export default productService;