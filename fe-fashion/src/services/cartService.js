import apiClient from './apiClient';

const cartService = {
    getCart: async (userId) => {
        try {
            const response = await apiClient.get(`/Cart/${userId}`);
            return response.data; // Trả về dữ liệu từ API
        } catch (error) {
            console.error('Lỗi khi lấy giỏ hàng:', error);
            throw error; // Ném lỗi để xử lý ở nơi gọi hàm
        }
    },
    mergeCart: async (userId, cartItems) => {
        try {
            const response = await apiClient.post(`/Cart/merge/${userId}`, cartItems);
            return response.data; // Trả về dữ liệu từ API
        } catch (error) {
            console.error('Lỗi khi merge giỏ hàng:', error);
            throw error; // Ném lỗi để xử lý ở nơi gọi hàm
        }
    },
    deleteCartItem: async (userId, variantId) => {
        try {
            const response = await apiClient.delete(`/Cart/${userId}/${variantId}`);
            return response.data; // Trả về dữ liệu từ API
        } catch (error) {
            console.error('Lỗi khi xóa sản phẩm khỏi giỏ hàng:', error);
            throw error; // Ném lỗi để xử lý ở nơi gọi hàm
        }
    },
    addToCart: async (userId, cartItem) => {
        try {
            const response = await apiClient.post(`/Cart/${userId}`, cartItem);
            return response.data; // Trả về dữ liệu từ API
        } catch (error) {
            console.error('Lỗi khi thêm sản phẩm vào giỏ hàng:', error);
            throw error; // Ném lỗi để xử lý ở nơi gọi hàm
        }
    },
    decreaseCartItem: async (userId, variantId, quantity = 1) => {
        try {
            // Gọi API với query parameter quantity
            const response = await apiClient.put(`/Cart/${userId}/decrease/${variantId}?quantity=${quantity}`);
            return {
                variantId: response.data.variantId, // Trả về variantId từ API
                quantityInCart: response.data.quantityInCart, // Trả về số lượng mới trong giỏ hàng
            };
        } catch (error) {
            console.error('Lỗi khi giảm số lượng sản phẩm:', error);
            throw error; // Ném lỗi để xử lý ở nơi gọi hàm
        }
    },
    increaseCartItem: async (userId, variantId, quantity = 1) => {
        try {
            // Gọi API với query parameter quantity
            const response = await apiClient.put(`/Cart/${userId}/increase/${variantId}?quantity=${quantity}`);
            return {
                variantId: response.data.result.variantId, // Trả về variantId từ API
                quantityInCart: response.data.result.quantityInCart, // Trả về số lượng mới trong giỏ hàng
                messeage: response.data.message, // Trả về thông báo từ API
            };
        } catch (error) {
            console.error('Lỗi khi tăng số lượng sản phẩm:', error);
            throw error; // Ném lỗi để xử lý ở nơi gọi hàm
        }
    },
};

export default cartService;