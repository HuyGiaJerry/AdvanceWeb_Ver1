import { useState, useEffect } from "react";
import ShopCard from "../../components/user/card/ShopCard";
import productService from "../../services/productService";
import ProductInforService from "../../services/productInfor";
import CategoryService from "../../services/categoryService";
import FilterService from "../../services/filterService";
import { NavLink } from "react-router-dom";
import "./main_shop.scss";

const Main_Shop = () => {
    const [defaultProducts, setDefaultProducts] = useState([]); // Danh sách sản phẩm mặc định
    const [filteredProducts, setFilteredProducts] = useState([]); // Danh sách sản phẩm sau khi lọc
    const [sizes, setSizes] = useState([]); // Danh sách kích thước
    const [colors, setColors] = useState([]); // Danh sách màu sắc
    const [categories, setCategories] = useState([]); // Danh sách danh mục
    const [filters, setFilters] = useState({}); // Bộ lọc hiện tại
    const [activeCategory, setActiveCategory] = useState(null); // Danh mục đang active
    const [activeColor, setActiveColor] = useState(null); // Màu sắc đang active
    const [activePriceRange, setActivePriceRange] = useState(null); // Khoảng giá đang active
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    // Gọi API để lấy dữ liệu ban đầu
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [productData, sizeData, colorData, categoryData] = await Promise.all([
                    productService.getProducts(),
                    ProductInforService.getAllSizes(),
                    ProductInforService.getAllColors(),
                    CategoryService.getAllCategories(),
                ]);

                setDefaultProducts(productData); // Lưu danh sách sản phẩm mặc định
                setFilteredProducts(productData); // Hiển thị sản phẩm mặc định ban đầu
                setSizes(sizeData); // Lưu kích thước
                setColors(colorData); // Lưu màu sắc
                setCategories(categoryData); // Lưu danh mục
            } catch (error) {
                console.error("Lỗi khi lấy dữ liệu:", error);
            }
        };

        fetchData();
    }, []);

    // Gọi API để lọc sản phẩm
    const applyFilters = async (newFilter) => {
        const updatedFilters = {
            ...filters,
            ...newFilter,
        };

        // Loại bỏ các bộ lọc rỗng
        const cleanedFilters = Object.keys(updatedFilters).reduce((acc, key) => {
            if (updatedFilters[key] && updatedFilters[key].length > 0) {
                acc[key] = updatedFilters[key];
            }
            return acc;
        }, {});

        // Nếu không có bộ lọc nào, hiển thị sản phẩm mặc định
        if (Object.keys(cleanedFilters).length === 0) {
            setFilteredProducts(defaultProducts);
            setFilters({});
            return;
        }

        try {
            const filteredProducts = await FilterService.filters(filters, newFilter);
            setFilteredProducts(filteredProducts); // Cập nhật danh sách sản phẩm sau khi lọc
            setFilters(cleanedFilters); // Cập nhật bộ lọc hiện tại
        } catch (error) {
            console.error("Lỗi khi áp dụng bộ lọc:", error);
        }
    };

    // Xử lý khi chọn kích thước
    const handleSizeFilter = (size) => {
        const updatedSizes = filters.sizes
            ? filters.sizes.includes(size)
                ? filters.sizes.filter((s) => s !== size) // Bỏ kích thước nếu đã chọn
                : [...filters.sizes, size] // Thêm kích thước nếu chưa chọn
            : [size];

        applyFilters({ sizes: updatedSizes });
    };

    // Xử lý khi chọn màu sắc
    const handleColorFilter = (color) => {
        const updatedColor = activeColor === color ? null : color; // Chỉ chọn một màu
        setActiveColor(updatedColor); // Cập nhật màu active
        applyFilters({ colors: updatedColor ? [updatedColor] : [] });
    };

    // Xử lý khi chọn danh mục
    const handleCategoryFilter = (categoryId) => {
        const updatedCategory = activeCategory === categoryId ? null : categoryId; // Chỉ chọn một danh mục
        setActiveCategory(updatedCategory); // Cập nhật danh mục active
        applyFilters({ categoryIds: updatedCategory ? [updatedCategory] : [] });
    };

    // Xử lý khi chọn khoảng giá
    const handlePriceFilter = (minPrice, maxPrice) => {
        const updatedPriceRange =
            activePriceRange && activePriceRange.minPrice === minPrice && activePriceRange.maxPrice === maxPrice
                ? null // Bỏ khoảng giá nếu đã chọn
                : { minPrice, maxPrice }; // Chọn khoảng giá mới

        setActivePriceRange(updatedPriceRange); // Cập nhật khoảng giá active

        // Nếu không có khoảng giá nào được chọn, hiển thị sản phẩm mặc định
        if (!updatedPriceRange) {
            applyFilters({ priceRanges: [] });
        } else {
            applyFilters({ priceRanges: [updatedPriceRange] });
        }
    };

    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage); // Tổng số trang
    const currentItems = filteredProducts.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber); // Cập nhật trang hiện tại
    };

    const renderPagination = () => {
        const pagination = [];
        const maxVisiblePages = 3; // Số trang hiển thị giữa
        const startPage = Math.max(2, currentPage - 1);
        const endPage = Math.min(totalPages - 1, currentPage + 1);

        // Nút "<" để lùi trang
        pagination.push(
            <button
                key="prev"
                className="btn btn-outline-secondary mx-1"
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
            >
                &lt;
            </button>
        );

        // Trang đầu tiên
        pagination.push(
            <button
                key={1}
                className={`btn btn-outline-secondary mx-1 ${currentPage === 1 ? "active" : ""}`}
                onClick={() => handlePageChange(1)}
            >
                1
            </button>
        );

        // Dấu "..." nếu cần
        if (startPage > 2) {
            pagination.push(
                <span key="start-ellipsis" className="mx-1">
                    ...
                </span>
            );
        }

        // Các trang ở giữa
        for (let i = startPage; i <= endPage; i++) {
            pagination.push(
                <button
                    key={i}
                    className={`btn btn-outline-secondary mx-1 ${currentPage === i ? "active" : ""}`}
                    onClick={() => handlePageChange(i)}
                >
                    {i}
                </button>
            );
        }

        // Dấu "..." nếu cần
        if (endPage < totalPages - 1) {
            pagination.push(
                <span key="end-ellipsis" className="mx-1">
                    ...
                </span>
            );
        }

        // Trang cuối cùng
        if (totalPages > 1) {
            pagination.push(
                <button
                    key={totalPages}
                    className={`btn btn-outline-secondary mx-1 ${currentPage === totalPages ? "active" : ""}`}
                    onClick={() => handlePageChange(totalPages)}
                >
                    {totalPages}
                </button>
            );
        }

        // Nút ">" để tiến trang
        pagination.push(
            <button
                key="next"
                className="btn btn-outline-secondary mx-1"
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
            >
                &gt;
            </button>
        );

        return pagination;
    };

    return (
        <div className="container shop-container">
            {/* Page Title */}
            <div className="row">
                <div className="col-12 text-center my-4">
                    <h1 className="page-title">Fashion</h1>
                    <p style={{ color: "gray" }}>
                        <NavLink to="/home" style={{ color: "gray", textDecoration: "none" }}>Home</NavLink> &gt; Shop
                    </p>
                </div>
            </div>

            <div className="row">
                {/* Sidebar Filter */}
                <div className="col-lg-3 col-md-4 col-sm-10 filter-sidebar">
                    <div className="filter-section">
                        <h5>Filters</h5>

                        {/* Size Filter */}
                        <div className="filter-group">
                            <div className="filter-topic">Size</div>
                            <div className="list-unstyled-size">
                                {sizes.map((size, index) => (
                                    <label key={index}>
                                        <input
                                            type="checkbox"
                                            className="me-2"
                                            onChange={() => handleSizeFilter(size.size)}
                                        />{" "}
                                        {size.size}
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Color Filter */}
                        <div className="filter-group">
                            <div className="filter-topic">Colors</div>
                            <div className="color-options">
                                {colors.map((color, index) => (
                                    <span
                                        key={index}
                                        className={`color-dot ${activeColor === color.colorName ? "active" : ""}`}
                                        style={{ backgroundColor: color.colorName }}
                                        onClick={() => handleColorFilter(color.colorName)}
                                    ></span>
                                ))}
                            </div>
                        </div>

                        {/* Prices Filter */}
                        <div className="filter-group">
                            <div className="filter-topic">Prices</div>
                            <div className="list-unstyled">
                                <label>
                                    <input
                                        type="checkbox"
                                        className="me-2"
                                        checked={activePriceRange?.minPrice === 100 && activePriceRange?.maxPrice === 150}
                                        onChange={() => handlePriceFilter(100, 150)}
                                    />{" "}
                                    $100 - $150
                                </label>
                                <label>
                                    <input
                                        type="checkbox"
                                        className="me-2"
                                        checked={activePriceRange?.minPrice === 150 && activePriceRange?.maxPrice === 200}
                                        onChange={() => handlePriceFilter(150, 200)}
                                    />{" "}
                                    $150 - $200
                                </label>
                                <label>
                                    <input
                                        type="checkbox"
                                        className="me-2"
                                        checked={activePriceRange?.minPrice === 200 && activePriceRange?.maxPrice === 250}
                                        onChange={() => handlePriceFilter(200, 250)}
                                    />{" "}
                                    $200 - $250
                                </label>
                                <label>
                                    <input
                                        type="checkbox"
                                        className="me-2"
                                        checked={activePriceRange?.minPrice === 250 && activePriceRange?.maxPrice === 300}
                                        onChange={() => handlePriceFilter(250, 300)}
                                    />{" "}
                                    $250 - $300
                                </label>
                            </div>
                        </div>

                        {/* Categories Filter */}
                        <div className="filter-group">
                            <div className="filter-topic">Categories</div>
                            <div className="btn-group-vertical w-100">
                                {categories.map((category) => (
                                    <button
                                        key={category.categoryId}
                                        className={`btn btn-outline-secondary btn-sm text-start ${activeCategory === category.categoryId ? "active" : ""
                                            }`}
                                        onClick={() => handleCategoryFilter(category.categoryId)}
                                    >
                                        {category.name}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Product Grid */}
                <div className="col-lg-9 col-md-8 col-sm-12">
                    {/* Filter and Search */}
                    <div className="row mb-5 top-filter">
                        <div className="col-sm-4">
                            <select className="form-select" aria-label="Sort by">
                                <option value="default">All product</option>
                                <option value="price-asc">New Arrival</option>
                                <option value="price-desc">Best Seller</option>
                            </select>
                        </div>
                    </div>

                    {/* Product Cards */}
                    <div className="row">
                        {currentItems.map((item) => (
                            <div className="col-lg-4 col-md-6 col-sm-12 mb-4" key={item.productId}>
                                <ShopCard
                                    id={item.productId}
                                    name={item.name}
                                    price={item.basePrice}
                                    images={item.images}
                                />
                            </div>
                        ))}
                    </div>

                    {/* Pagination */}
                    <div className="pagination-container d-flex justify-content-center mt-4">
                        {renderPagination()}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Main_Shop;