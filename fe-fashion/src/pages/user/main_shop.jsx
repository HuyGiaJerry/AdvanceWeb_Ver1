import React, { useState } from "react";
import ShopCard from "../../components/user/card/ShopCard";
import { sampleDataBrand, sampleDataCategory, sampleDataCollection } from "../../services/sampleDataShop";
import dataProduct from "../../services/test";
import searchIcon from "../../assets/icons/search.png"; // Gọi icon từ thư mục assets
import "./main_shop.scss";

const Main_Shop = () => {
    const [showSearchInput, setShowSearchInput] = useState(false); // Trạng thái hiển thị thanh input

    const toggleSearchInput = () => {
        setShowSearchInput(!showSearchInput); // Bật/tắt thanh input
    };
    const [currentPage, setCurrentPage] = useState(1); // Trạng thái trang hiện tại

    const itemsPerPage = 6; // Số lượng sản phẩm trên mỗi trang
    const totalPages = Math.ceil(dataProduct.length / itemsPerPage); // Tổng số trang

    const currentItems = dataProduct.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    )
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber); // Cập nhật trang hiện tại
    };
    // Hàm tạo danh sách các nút phân trang
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
                    <p className="page-breadcrumb">Home &gt; Fashion</p>
                </div>
            </div>

            <div className="row">
                {/* Sidebar Filter */}
                <div className="col-lg-3 col-md-4 col-sm-12 filter-sidebar">
                    <div className="filter-section">
                        <h5>Filters</h5>

                        {/* Collections Filter */}
                        <div className="filter-group">
                            <div className="filter-topic">Collections</div>
                            <div className="btn-group-vertical w-100">
                                {sampleDataCollection.map((collection) => (
                                    <button
                                        key={collection.id}
                                        className="btn btn-outline-secondary btn-sm text-start"
                                    >
                                        {collection.name}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Size Filter */}
                        <div className="filter-group">
                            <div className="filter-topic">Size</div>
                            <div className="list-unstyled">
                                <label>
                                    <input type="checkbox" className="me-2" /> S
                                </label>
                                <label>
                                    <input type="checkbox" className="me-2" /> M
                                </label>
                                <label>
                                    <input type="checkbox" className="me-2" /> L
                                </label>
                                <label>
                                    <input type="checkbox" className="me-2" /> XL
                                </label>
                            </div>
                        </div>

                        {/* Color Filter */}
                        <div className="filter-group">
                            <div className="filter-topic">Colors</div>
                            <div className="color-options">
                                {["#FFD1DC", "#C6AEC7", "#FFFFFF", "#000000", "#B1C5D4"].map((color, index) => (
                                    <span
                                        key={index}
                                        className="color-dot"
                                        style={{ backgroundColor: color }}
                                    ></span>
                                ))}
                            </div>
                        </div>

                        {/* Prices Filter */}
                        <div className="filter-group">
                            <div className="filter-topic">Prices</div>
                            <div className="list-unstyled">
                                <label>
                                    <input type="checkbox" className="me-2" /> $0 - $50
                                </label>
                                <label>
                                    <input type="checkbox" className="me-2" /> $50 - $100
                                </label>
                                <label>
                                    <input type="checkbox" className="me-2" /> $100 - $200
                                </label>
                                <label>
                                    <input type="checkbox" className="me-2" /> $200 - $400
                                </label>
                            </div>
                        </div>

                        {/* Brands Filter */}
                        <div className="filter-group">
                            <div className="filter-topic">Brands</div>
                            <div className="btn-group-vertical w-100">
                                {sampleDataBrand.map((brand) => (
                                    <button
                                        key={brand.id}
                                        className="btn btn-outline-secondary btn-sm text-start"
                                    >
                                        {brand.name}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Categories Filter */}
                        <div className="filter-group">
                            <div className="filter-topic">Categories</div>
                            <div className="btn-group-vertical w-100">
                                {sampleDataCategory.map((category) => (
                                    <button
                                        key={category.id}
                                        className="btn btn-outline-secondary btn-sm text-start"
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
                                {sampleDataCollection.map((category) => (
                                    <option key={category.id} value={category.name}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="col-sm-7 d-flex align-items-center search-container">
                            {showSearchInput && (
                                <input
                                    type="text"
                                    className="form-control me-2"
                                    placeholder="Search..."
                                    style={{ width: "200px" }}
                                />
                            )}
                            <button className="btn btn-outline-secondary" onClick={toggleSearchInput}>
                                <img src={searchIcon} alt="Search" style={{ width: "20px", height: "20px" }} />
                            </button>
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

                                    colors={item.colors}
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