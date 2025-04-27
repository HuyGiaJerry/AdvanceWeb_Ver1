import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import dataProduct from "../../services/test";
import "./detail.scss";

const Detail = () => {
    const { id } = useParams(); // Lấy id từ URL
    const product = dataProduct.find((item) => item.productId === parseInt(id)); // Tìm sản phẩm theo id

    // Trạng thái
    const [mainImageIndex, setMainImageIndex] = useState(0); // Chỉ số ảnh chính mặc định
    const [currentColor, setCurrentColor] = useState(null); // Màu hiện tại
    const [colorPick, setColorPick] = useState(""); // Tên màu hiện tại
    const [quantity, setQuantity] = useState(1); // Số lượng sản phẩm
    const [selectedSize, setSelectedSize] = useState(""); // Kích thước hiện tại
    const [quantityStock, setQuantityStock] = useState(0); // Số lượng tồn kho hiện tại

    // Khi trang được tải lần đầu, đặt màu và size mặc định
    useEffect(() => {
        if (product && product.colors.length > 0) {
            const defaultColor = product.colors[0]; // Màu đầu tiên
            setCurrentColor(defaultColor);
            setColorPick(defaultColor.colorName);

            if (defaultColor.variants.length > 0) {
                const defaultSize = defaultColor.variants[0]; // Size đầu tiên
                setSelectedSize(defaultSize.size);
                setQuantityStock(defaultSize.stockQuantity); // Số lượng tồn kho của size đầu tiên
            }
        }
    }, [product]);

    // Lấy danh sách ảnh hiển thị
    const imagesToShow = currentColor
        ? currentColor.images // Nếu đã chọn màu, hiển thị ảnh của màu đó
        : product.colors.flatMap((color) => color.images); // Nếu chưa chọn, hiển thị tất cả ảnh

    // Xử lý khi chọn màu
    const handleColorImageClick = (color) => {
        setCurrentColor(color);
        setColorPick(color.colorName); // Cập nhật tên màu hiện tại

        // Đặt size đầu tiên của màu được chọn làm mặc định
        if (color.variants.length > 0) {
            const defaultSize = color.variants[0];
            setSelectedSize(defaultSize.size);
            setQuantityStock(defaultSize.stockQuantity); // Số lượng tồn kho của size đầu tiên
        } else {
            setSelectedSize(""); // Nếu không có size, reset size
            setQuantityStock(0); // Reset số lượng tồn kho
        }

        // Tìm ảnh có isPrimary = true trong danh sách ảnh của màu
        const primaryImageIndex = color.images.findIndex((image) => image.isPrimary === true);
        setMainImageIndex(primaryImageIndex !== -1 ? primaryImageIndex : 0);
    };

    // Xử lý khi chọn kích thước
    const handleSizeClick = (size) => {
        setSelectedSize(size); // Cập nhật kích thước được chọn

        // Tìm số lượng tồn kho dựa trên màu và kích thước
        const variant = currentColor?.variants.find((variant) => variant.size === size);
        setQuantityStock(variant ? variant.stockQuantity : 0); // Cập nhật số lượng tồn kho
    };

    // Xử lý tăng số lượng
    const handleIncrease = () => {
        setQuantity((prev) => prev + 1); // Tăng số lượng
    };

    // Xử lý giảm số lượng
    const handleDecrease = () => {
        setQuantity((prev) => (prev > 1 ? prev - 1 : 1)); // Giảm số lượng, không nhỏ hơn 1
    };

    const handleNextImage = () => {
        setMainImageIndex((prevIndex) => (prevIndex + 1) % imagesToShow.length); // Chuyển sang ảnh tiếp theo
    };

    const handlePrevImage = () => {
        setMainImageIndex((prevIndex) =>
            prevIndex === 0 ? imagesToShow.length - 1 : prevIndex - 1
        ); // Quay lại ảnh trước đó
    };

    if (!product) {
        return <div className="container" style={{ marginTop: "100px" }}>Product not found!</div>;
    }

    return (
        <div className="container" style={{ marginTop: "100px" }}>
            <div className="row">
                {/* Sidebar tất cả hình ảnh sp bên trái */}
                <div className="col-lg-2 col-md-3 col-sm-12 mb-3">
                    <div className="image-thumbnails d-flex flex-lg-column flex-md-column flex-row align-items-center">
                        {imagesToShow.map((image, index) => (
                            <img
                                key={index}
                                src={require(`../../assets/images/${image.imageUrl}`)}
                                alt={`Thumbnail ${index + 1}`}
                                className={`img-thumbnail mb-2 w-100 ${mainImageIndex === index ? "active-thumbnail" : ""}`}
                                style={{ maxWidth: "60px", height: "auto" }}
                                onClick={() => setMainImageIndex(index)}
                            />
                        ))}
                    </div>
                </div>

                {/* Hình ảnh chính */}
                <div className="col-lg-5 col-md-6 col-sm-12 mb-3">
                    <div className="main-image-container position-relative">
                        <button className="prev-btn" onClick={handlePrevImage}>
                            &#8249;
                        </button>
                        <img
                            src={require(`../../assets/images/${imagesToShow[mainImageIndex].imageUrl}`)}
                            alt="Main Product"
                            className="img-fluid product-main-image"
                        />
                        <button className="next-btn" onClick={handleNextImage}>
                            &#8250;
                        </button>
                    </div>
                </div>

                {/* Thông tin sản phẩm */}
                <div className="col-lg-5 col-md-6 col-sm-12">
                    <h2 className="product-title">{product.name}</h2>
                    <p className="product-brand">{product.description}</p>
                    <div className="product-price mb-3">
                        <span className="text-danger fs-4">${product.discountPrice}</span>{" "}
                        <del className="text-muted">${product.basePrice}</del>
                    </div>

                    {/* Tiêu đề chọn màu và số lượng tồn kho */}
                    <h6 className="color-pick">
                        Chọn màu: {colorPick || "Chưa chọn"}{" "}
                        <span className="text-muted">(Tồn kho: {quantityStock})</span>
                    </h6>

                    {/* Slide bar chọn màu */}
                    <div className="color-thumbnails d-flex flex-row">
                        {product.colors.map((color, index) => (
                            <div key={index} className="text-center me-2">
                                <img
                                    src={require(`../../assets/images/${color.images[0].imageUrl}`)}
                                    alt={`Color ${color.colorName}`}
                                    className={`img-thumbnail ${currentColor?.colorId === color.colorId ? "active-thumbnail" : ""}`}
                                    style={{ maxWidth: "60px", height: "auto" }}
                                    onClick={() => handleColorImageClick(color)}
                                />
                                <p className="mt-1" style={{ fontSize: "0.9rem", backgroundColor: "Gray", color: "white" }}>
                                    {color.colorName}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Tiêu đề chọn size */}
                    <h6 className="size-pick mt-2">Chọn size: {selectedSize || "Chưa chọn"}</h6>

                    {/* Danh sách size */}
                    <div className="size-thumbnails d-flex flex-row flex-wrap mb-2">
                        {currentColor?.variants.map((variant, index) => (
                            <button
                                key={index}
                                className={`size-btn ${selectedSize === variant.size ? "active-size" : ""}`}
                                onClick={() => handleSizeClick(variant.size)}
                            >
                                {variant.size}
                            </button>
                        ))}
                    </div>

                    {/* Quantity và Add to Cart */}
                    <h6 className="mt-4 quantity-choose">Quantity:</h6>
                    <div className="d-flex align-items-center mt-2">
                        {/* Quantity */}
                        <div className="quantity-container d-flex align-items-center">
                            <button className="quantity-btn" onClick={handleDecrease}>
                                -
                            </button>
                            <input
                                type="text"
                                className="quantity-input"
                                value={quantity}
                                readOnly
                            />
                            <button className="quantity-btn" onClick={handleIncrease}>
                                +
                            </button>
                        </div>

                        {/* Add to Cart */}
                        <button className="BtnAddCart ms-3">Add to cart</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Detail;