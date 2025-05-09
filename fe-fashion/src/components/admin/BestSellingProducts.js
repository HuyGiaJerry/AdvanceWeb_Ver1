import React from "react";
import Table from "../../components/admin/Table";

const BestSellingProducts = ({ bestSellingProducts }) => {
  const columns = [
    { key: "name", name: "Tên sản phẩm", sortable: true },
    { key: "unitsSold", name: "Số lượng bán", sortable: true },
    { key: "revenue", name: "Doanh thu", sortable: true },
  ];

  const formattedData = bestSellingProducts.map((product) => ({
    ...product,
    revenue: product.revenue.toLocaleString("vi-VN") + "₫",
  }));

  return (
    <div className="top-products">
      <h2>Sản phẩm bán chạy</h2>
      <Table columns={columns} data={formattedData} itemsPerPage={5} />
    </div>
  );
};

export default BestSellingProducts;