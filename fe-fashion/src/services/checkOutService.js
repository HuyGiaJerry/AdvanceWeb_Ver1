import apiClient from './apiClient';

const checkOutService = {
    checkoutOrderCod: async (orderData) => {
        try {
            const response = await apiClient.post('/Order/checkout', orderData);
            return response.data; // Trả về dữ liệu từ API
        } catch (error) {
            console.error('Lỗi khi thanh toán:', error);
            throw error; // Ném lỗi để xử lý ở nơi gọi hàm
        }
    },
    createVnPayPaymentUrl: async (orderData) => {
        try {
            const response = await apiClient.post('/VnPay/create-payment-url', orderData);
            return response.data; // Trả về paymentUrl và orderId
        } catch (error) {
            console.error('Lỗi khi tạo URL thanh toán VNPAY:', error);
            throw error; // Ném lỗi để xử lý ở nơi gọi hàm
        }
    },
};

export default checkOutService;