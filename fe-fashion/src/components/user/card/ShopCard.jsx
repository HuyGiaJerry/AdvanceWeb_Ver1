import React, { useState } from "react";
import { FaEye, FaHeart, FaShoppingCart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { addToWishlist, login } from "../../../store/store";
import { useNavigate } from "react-router-dom";
import "./ShopCard.scss";
import dataWishList from "../../../services/sampleDataWishList";

const ShopCard = ({ id, name, price, images }) => {
    const dispatch = useDispatch();
    const isLoggin = useSelector((state) => state.auth.auth);
    const navigate = useNavigate();
    // Trạng thái màu và ảnh đang được chọn
    const [activeColor, setActiveColor] = useState(images[0].colorName); // Màu đầu tiên
    const [activeImage, setActiveImage] = useState(`https://localhost:7123${images[0].imageUrl}`); // Ảnh đầu tiên

    const [wishlist, setWishlist] = useState(dataWishList); // Trạng thái danh sách yêu thích
    const isInWishlist = wishlist.some((item) => item.productId === id); // Kiểm tra xem sản phẩm đã có trong danh sách yêu thích chưa


    const handleAddToWishlist = () => {
        if (!isLoggin) {
            dispatch(login());
        } else {
            dispatch(addToWishlist());
            if (isInWishlist) {
                // Nếu sản phẩm đã có trong wishlist, xóa nó
                setWishlist(wishlist.filter((item) => item.productId !== id));
            } else {
                // Nếu sản phẩm chưa có, thêm vào wishlist
                setWishlist([
                    ...wishlist,
                    {
                        productId: id,
                        name,
                        price,
                        color: activeColor,
                        imageUrl: activeImage,
                    },
                ]);
            }
        }
    };

    const handleViewDetails = () => {
        navigate(`product/detail/${id}`); // Điều hướng đến trang chi tiết với id sản phẩm
    };

    const handleColorClick = (color) => {
        setActiveColor(color.colorName); // Cập nhật màu đang được chọn
        setActiveImage(`https://localhost:7123${color.imageUrl}`); // Cập nhật ảnh tương ứng với màu đang được chọn
    };

    return (
        <div className="col-md-4 col-sm-6 mb-4">
            <div className="card shop-card" style={{ border: "none" }}>
                <div className="card-img-container">
                    <img
                        src={activeImage}
                        className="card-img-top"
                        alt={name || "Product Image"}
                    />
                    <div className="card-hover-overlay">
                        <button className="btn btn-primary" onClick={handleViewDetails}>
                            <FaEye className="icon" />
                        </button>
                    </div>
                </div>
                <div className="card-body">
                    <div className="card-title-container">
                        <h5 className="card-title">{name}</h5>
                        <button className={`btn heart-btn ${isInWishlist ? "active" : ""}`} onClick={handleAddToWishlist}>
                            <FaHeart className="icon" />
                        </button>
                    </div>
                    <p className="card-text">${price}</p>
                    <div className="color-options">
                        {images.map((color, index) => (
                            <button
                                key={index}
                                className={`color-dot ${activeColor === color.colorName ? "active" : ""}`}
                                style={{ backgroundColor: color.colorName.toLowerCase() }}
                                onClick={() => handleColorClick(color)}
                            ></button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShopCard;