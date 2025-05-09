import React, { useState } from "react";
import ProductCardNewArrival from "../../components/user/card/ProductCardNewArrival";
import { NewArrivalProductSampleData } from "../../services/sampleDataNewArrival";
const NewArrival = () => {
    const [activeCategory, setActiveCategory] = useState("Women's Fashion");

    const categories = [
        "Men's Fashion",
        "Women's Fashion",
        "Women Accessories",
        "Men Accessories",
        "Discount Deals",
    ];

    const handleCategoryClick = (category) => {
        setActiveCategory(category);
    };

    const filteredProducts = NewArrivalProductSampleData.filter(
        (product) => product.category === activeCategory
    );

    return (
        <div className="container my-5">
            <h1 className="text-center mb-3">New Arrivals</h1>
            <p className="text-center text-muted">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                <br />
                Scelerisque duis ultrices sollicitudin aliquam sem.
            </p>

            {/* Category Buttons */}
            <div className="d-flex justify-content-center mb-4">
                {categories.map((category, index) => (
                    <button
                        key={index}
                        className={`btn mx-2 ${activeCategory === category ? "btn-dark text-white" : "btn-light text-dark"}`}
                        onClick={() => handleCategoryClick(category)}
                    >
                        {category}
                    </button>
                ))}
            </div>

            {/* Product Cards */}
            <div className="row">
                {filteredProducts.map((product) => (
                    <div className="col-md-4 mb-4" key={product.id}>
                        <ProductCardNewArrival {...product} />
                    </div>
                ))}
            </div>

            {/* View More Button */}
            <div className="text-center mt-4">
                <button className="btn btn-dark" style={{ fontSize: '0.8rem', padding: '10px 35px' }}>View More</button>
            </div>
        </div>
    );
};

export default NewArrival;