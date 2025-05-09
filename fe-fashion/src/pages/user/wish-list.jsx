import React, { useState } from "react";
import dataWishList from "../../services/sampleDataWishList"; // Import dữ liệu mẫu
import ShopCard from "../../components/user/card/ShopCard"; // Import ShopCard component
import "./wish-list.scss";

const WishList = () => {
    const [wishlist] = useState(dataWishList); // Lấy dữ liệu từ file mẫu

    return (
        <div className="wishlist-page container">
            <h1 className="text-center my-4">Your Wishlist</h1>
            <div className="row">
                {wishlist.map((product) => (
                    <ShopCard
                        key={product.productId}
                        id={product.productId}
                        name={product.name}
                        price={product.discountPrice || product.basePrice}
                        colors={product.colors}
                    />
                ))}
            </div>
        </div>
    );
};

export default WishList;