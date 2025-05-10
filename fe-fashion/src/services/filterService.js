import apiClient from './apiClient';

const FilterService = {
    // Lọc theo size, màu sắc, giá, categories
    filters: async (currentFilters, newFilter) => {
        try {
            // Ghi đè bộ lọc hiện tại với bộ lọc mới
            const updatedFilters = {
                ...currentFilters,
                ...newFilter,
            };

            // Loại bỏ các trường không cần thiết (nếu giá trị rỗng hoặc không hợp lệ)
            const cleanedFilters = Object.keys(updatedFilters).reduce((acc, key) => {
                const value = updatedFilters[key];
                if (Array.isArray(value) && value.length > 0) {
                    acc[key] = value; // Giữ lại nếu là mảng và có phần tử
                } else if (key === "priceRanges" && value.length > 0) {
                    acc[key] = value.filter(
                        (range) => range.minPrice > 0 || range.maxPrice > 0
                    ); // Giữ lại nếu có giá trị hợp lệ
                }
                return acc;
            }, {});

            // Gửi request với bộ lọc đã làm sạch
            const response = await apiClient.post('/Product/filter', cleanedFilters);
            return response.data; // Trả về danh sách sản phẩm
        } catch (error) {
            console.error('Error fetching filtered products:', error);
            throw error; // Ném lỗi để xử lý bên ngoài
        }
    },
};

export default FilterService;