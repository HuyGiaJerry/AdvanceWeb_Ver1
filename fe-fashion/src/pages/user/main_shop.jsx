import React from "react";
import ShopCard from "../../components/user/card/ShopCard";
import { sampleDataShop } from "../../services/sampleDataShop";
import "./main_shop.scss";

const Main_Shop = () => {
    return (
        <div className="container shop-container">
            <div className="row">
                {/* Sidebar Filter */}
                <div className="col-lg-3 col-md-4 col-sm-12 filter-sidebar">
                    <div className="filter-section">
                        <h5>Filters</h5>
                        <div className="filter-group">
                            <h6>Size</h6>
                            <div>
                                <button className="btn btn-outline-secondary btn-sm">S</button>
                                <button className="btn btn-outline-secondary btn-sm">M</button>
                                <button className="btn btn-outline-secondary btn-sm">L</button>
                            </div>
                        </div>
                        <div className="filter-group">
                            <h6>Colors</h6>
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
                        <div className="filter-group">
                            <h6>Prices</h6>
                            <ul className="list-unstyled">
                                <li><input type="checkbox" /> $0 - $50</li>
                                <li><input type="checkbox" /> $50 - $100</li>
                                <li><input type="checkbox" /> $100 - $200</li>
                                <li><input type="checkbox" /> $200 - $400</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Product Grid */}
                <div className="col-lg-9 col-md-8 col-sm-12">
                    <div className="row">
                        {sampleDataShop.map((item) => (
                            <div className="col-lg-4 col-md-6 col-sm-12 mb-4" key={item.id}>
                                <ShopCard
                                    name={item.name}
                                    price={item.price}
                                    image={item.image}
                                    colorOptions={item.colorOptions}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Main_Shop;