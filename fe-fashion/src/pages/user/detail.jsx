import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import productService from "../../services/productService";
import { addToCart } from "../../store/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import "./detail.scss";
import { toast } from "react-toastify";
import cartService from "../../services/cartService";
const Detail = () => {
    const { id } = useParams(); // Lấy id từ URL
    const [product, setProduct] = useState(null); // Trạng thái lưu chi tiết sản phẩm
    const [mainImageIndex, setMainImageIndex] = useState(0); // Chỉ số ảnh chính mặc định
    const [currentColor, setCurrentColor] = useState(null); // Màu hiện tại
    const [colorPick, setColorPick] = useState(""); // Tên màu hiện tại
    const [quantity, setQuantity] = useState(1); // Số lượng sản phẩm
    const [selectedSize, setSelectedSize] = useState(""); // Kích thước hiện tại
    const [quantityStock, setQuantityStock] = useState(0); // Số lượng tồn kho hiện tại

    const dispatch = useDispatch(); // Khởi tạo dispatch từ Redux
    const authState = useSelector((state) => state.auth); // Lấy trạng thái auth từ Redux


    // Gọi API để lấy chi tiết sản phẩm
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const data = await productService.getProductById(id); // Gọi API
                setProduct(data); // Lưu dữ liệu sản phẩm vào state

                // Đặt màu và size mặc định
                if (data.colors.length > 0) {
                    const defaultColor = data.colors[0]; // Màu đầu tiên
                    setCurrentColor(defaultColor);
                    setColorPick(defaultColor.colorName);

                    if (defaultColor.variants.length > 0) {
                        const defaultSize = defaultColor.variants[0]; // Size đầu tiên
                        setSelectedSize(defaultSize.size);
                        setQuantityStock(defaultSize.stockQuantity); // Số lượng tồn kho của size đầu tiên
                    }
                }
            } catch (error) {
                console.error("Lỗi khi lấy chi tiết sản phẩm:", error);
            }
        };

        fetchProduct();
    }, [id]);

    // Lấy danh sách ảnh hiển thị
    const imagesToShow = currentColor
        ? currentColor.images // Nếu đã chọn màu, hiển thị ảnh của màu đó
        : product?.colors.flatMap((color) => color.images) || []; // Nếu chưa chọn, hiển thị tất cả ảnh

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

    // Xử lý thêm vào giỏ hàng
    const handleAddToCart = async () => {
        const variant = currentColor?.variants.find((variant) => variant.size === selectedSize);

        if (!variant) {
            toast.info("Vui lòng chọn kích thước trước khi thêm vào giỏ hàng!");
            return;
        }

        const cartItem = {
            variantId: variant.variantId,
            productId: product.productId,
            productName: product.name,
            colorId: currentColor?.colorId,
            colorName: colorPick,
            size: selectedSize,
            quantity,
            price: product.discountPrice,
            imageUrl: imagesToShow[mainImageIndex]?.imageUrl,
        };

        if (!authState.auth) {
            // Nếu chưa đăng nhập, thêm vào Redux và localStorage
            dispatch(addToCart(cartItem)); // Thêm sản phẩm vào Redux
            toast.success("Sản phẩm đã được thêm vào giỏ hàng!");
        } else {
            // Nếu đã đăng nhập, gọi API để thêm vào giỏ hàng
            const userId = JSON.parse(localStorage.getItem("authState"))?.userId;

            if (!userId) {
                toast.error("Không thể xác định người dùng. Vui lòng đăng nhập lại.");
                return;
            }

            try {
                await cartService.addToCart(userId, cartItem); // Gọi API thêm vào giỏ hàng
                toast.success("Sản phẩm đã được thêm vào giỏ hàng!");
            } catch (error) {
                console.error("Lỗi khi thêm sản phẩm vào giỏ hàng:", error);
                toast.error("Không thể thêm sản phẩm vào giỏ hàng. Vui lòng thử lại.");
            }
        }
    };

    if (!product) {
        return <div className="container" style={{ marginTop: "100px" }}>Loading...</div>;
    }

    return (
        <div className="container" style={{ marginTop: "100px", marginBottom: "150px" }}>
            <div className="row">
                {/* Sidebar tất cả hình ảnh sp bên trái */}
                <div className="col-lg-2 col-md-3 col-sm-12 mb-3">
                    <div className="image-thumbnails d-flex flex-lg-column flex-md-column flex-row align-items-center">
                        {imagesToShow.map((image, index) => (
                            <img
                                key={index}
                                src={`https://localhost:7123${image.imageUrl}`}
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
                            src={`https://localhost:7123${imagesToShow[mainImageIndex]?.imageUrl}`}
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
                                    src={`https://localhost:7123${color.images[0]?.imageUrl}`}
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
                        <button className="BtnAddCart ms-3" onClick={handleAddToCart}>
                            Add to cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Detail;