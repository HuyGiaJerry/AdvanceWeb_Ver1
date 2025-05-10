import apiClient from './apiClient';

const CategoryService = {
    getAllCategories: async () => {
        try {
            const response = await apiClient.get('/Category');
            return response.data; // Trả về danh sách danh mục
        } catch (error) {
            console.error('Error fetching categories:', error);
            throw error; // Ném lỗi để xử lý bên ngoài
        }
    }
};

export default CategoryService;