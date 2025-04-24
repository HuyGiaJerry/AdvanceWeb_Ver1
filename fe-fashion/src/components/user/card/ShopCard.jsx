import React, { useState } from "react";
import { FaEye, FaHeart, FaShoppingCart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, addToWishlist, login } from "../../../store/store";
import "./ShopCard.scss";

const ShopCard = (props) => {
    const dispatch = useDispatch();
    const isLoggin = useSelector((state) => state.auth.isLoggin);

    // Trạng thái màu đang được chọn
    const [activeColor, setActiveColor] = useState(props.colorOptions[0]);

    const handleAddToCart = () => {
        if (!isLoggin) {
            dispatch(login());
        } else {
            dispatch(addToCart());
        }
    };

    const handleAddToWishlist = () => {
        if (!isLoggin) {
            dispatch(login());
        } else {
            dispatch(addToWishlist());
        }
    };

    const handleColorClick = (color) => {
        setActiveColor(color); // Cập nhật màu đang được chọn
        console.log(`Selected color: ${color}`);
    };

    return (
        <div className="col-md-4 col-sm-6 mb-4">
            <div className="card shop-card" style={{border: "none"}}>
                <div className="card-img-container">
                    <img
                        src={require(`../../../assets/images/${props.image}`)}
                        className="card-img-top"
                        alt={props.name || "Product Image"}
                    />
                    <div className="card-hover-overlay">
                        <button className="btn btn-primary">
                            <FaEye className="icon" />
                        </button>
                        <button className="btn btn-secondary" onClick={handleAddToWishlist}>
                            <FaHeart className="icon" />
                        </button>
                        <button className="btn btn-success" onClick={handleAddToCart}>
                            <FaShoppingCart className="icon" />
                        </button>
                    </div>
                </div>
                <div className="card-body">
                    <h5 className="card-title">{props.name}</h5>
                    <p className="card-text">${props.price}</p>
                    <div className="color-options">
                        {props.colorOptions.map((color, index) => (
                            <button
                                key={index}
                                className={`color-dot ${activeColor === color ? "active" : ""}`}
                                style={{ backgroundColor: color }}
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