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
};

export default productService;