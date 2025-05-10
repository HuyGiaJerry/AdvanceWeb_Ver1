import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaEdit, FaTrash, FaSort, FaSortUp, FaSortDown } from "react-icons/fa";
import "../../assets/styles/Table.scss";
import {   FaPlus } from "react-icons/fa";
const Table = ({
  columns,
  data,
  onDelete,
  editUrl,
  createUrl,
  itemsPerPage = 6,
  showActions = true,
  showAddButton = true,
}) => {

  const [sortConfig, setSortConfig] = useState({ key: null, direction: "ascending" });
  const [currentPage, setCurrentPage] = useState(1);
  const [sortedData, setSortedData] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentItems, setCurrentItems] = useState([]);

  // Reset về trang 1 khi dữ liệu thay đổi (searchTerm thay đổi hoặc data thay đổi)
  useEffect(() => {
    setCurrentPage(1);
  }, [data]);

  // Sắp xếp dữ liệu khi dữ liệu hoặc cấu hình sắp xếp thay đổi
  useEffect(() => {
    let sortableItems = [...data];
    if (sortConfig.key) {
      sortableItems.sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];

        // Xử lý trường hợp giá trị null hoặc undefined
        if (aValue === undefined || aValue === null) return sortConfig.direction === "ascending" ? -1 : 1;
        if (bValue === undefined || bValue === null) return sortConfig.direction === "ascending" ? 1 : -1;

        // So sánh chữ thường để sắp xếp chuỗi không phân biệt hoa thường
        const aValueLower = typeof aValue === 'string' ? aValue.toLowerCase() : aValue;
        const bValueLower = typeof bValue === 'string' ? bValue.toLowerCase() : bValue;

        if (aValueLower < bValueLower) return sortConfig.direction === "ascending" ? -1 : 1;
        if (aValueLower > bValueLower) return sortConfig.direction === "ascending" ? 1 : -1;
        return 0;
      });
    }
    setSortedData(sortableItems);
  }, [data, sortConfig]);

  // Cập nhật số trang và các mục hiện tại khi dữ liệu được sắp xếp thay đổi hoặc trang hiện tại thay đổi
  useEffect(() => {
    const total = Math.ceil(sortedData.length / itemsPerPage) || 1;
    setTotalPages(total);
    
    // Đảm bảo trang hiện tại không vượt quá tổng số trang
    const safePage = Math.min(currentPage, total);
    if (safePage !== currentPage) {
      setCurrentPage(safePage);
    }
    
    // Tính toán các mục hiển thị trên trang hiện tại
    const start = (safePage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    setCurrentItems(sortedData.slice(start, end));
  }, [sortedData, currentPage, itemsPerPage]);

  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const getSortIcon = (name) => {
    if (sortConfig.key !== name) return <FaSort />;
    return sortConfig.direction === "ascending" ? <FaSortUp /> : <FaSortDown />;
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const renderPagination = () => {
    if (totalPages <= 1) return null; // Không hiển thị phân trang nếu chỉ có 1 trang

    const pagination = [];
    // Giới hạn số nút hiển thị
    let startPage = Math.max(1, currentPage - 1);
    let endPage = Math.min(totalPages, currentPage + 1);

    // Đảm bảo luôn hiển thị ít nhất 3 nút (nếu có đủ trang)
    if (endPage - startPage + 1 < 3 && totalPages >= 3) {
      if (currentPage === 1) {
        endPage = 3;
      } else if (currentPage === totalPages) {
        startPage = Math.max(1, totalPages - 2);
      }
    }

    // Nút Previous
    pagination.push(
      <button
        key="prev"
        className="pagination-button"
        disabled={currentPage === 1}
        onClick={() => handlePageChange(currentPage - 1)}
      >
        &laquo;
      </button>
    );

    // Hiển thị nút trang đầu tiên và dấu chấm lửng nếu cần
    if (startPage > 1) {
      pagination.push(
        <button
          key={1}
          className={`pagination-button ${currentPage === 1 ? "active" : ""}`}
          onClick={() => handlePageChange(1)}
        >
          1
        </button>
      );
      if (startPage > 2) {
        pagination.push(<span key="start-ellipsis" className="ellipsis">...</span>);
      }
    }

    // Hiển thị các nút trang trong khoảng
    for (let i = startPage; i <= endPage; i++) {
      pagination.push(
        <button
          key={i}
          className={`pagination-button ${currentPage === i ? "active" : ""}`}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </button>
      );
    }

    // Hiển thị dấu chấm lửng và nút trang cuối cùng nếu cần
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pagination.push(<span key="end-ellipsis" className="ellipsis">...</span>);
      }
      pagination.push(
        <button
          key={totalPages}
          className={`pagination-button ${currentPage === totalPages ? "active" : ""}`}
          onClick={() => handlePageChange(totalPages)}
        >
          {totalPages}
        </button>
      );
    }

    // Nút Next
    pagination.push(
      <button
        key="next"
        className="pagination-button"
        disabled={currentPage === totalPages}
        onClick={() => handlePageChange(currentPage + 1)}
      >
        &raquo;
      </button>
    );

    return pagination;
  };

  return (
    <div className="table-wrapper">
      <div className="table-header">
        <h2>{columns.title || "Danh sách"}</h2>
      </div>
      <div className="table-card">
        {showAddButton && createUrl && (
  <Link to={createUrl} className="button-add">
    <FaPlus style={{ marginRight: "8px" }} />
    Thêm mới
  </Link>
)}



        <table className="data-table">
          <thead>
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  onClick={() => column.sortable ? requestSort(column.key) : null}
                  className={column.sortable ? "sortable" : ""}
                >
                  {column.name}
                  {column.sortable && <span className="sort-icon">{getSortIcon(column.key)}</span>}
                </th>
              ))}
            {showActions && <th>Hành động</th>}

            </tr>
          </thead>
          <tbody>
            {currentItems.length > 0 ? (
              currentItems.map((item) => (
                <tr
                  key={item.id || item.product_id || item.userId} // Hỗ trợ nhiều kiểu ID
                  onClick={() => item.onClick && item.onClick()} 
                  style={{ cursor: item.onClick ? "pointer" : "default" }}
                >
                  {columns.map((column) => (
                    <td key={`${item.id || item.product_id || item.userId}-${column.key}`}>{item[column.key]}</td>
                  ))}
                  {showActions && (
  <td className="actions">
    {item.onEdit ? (
      <button
        onClick={(e) => {
          e.stopPropagation();
          item.onEdit();
        }}
        className="button-edit"
      >
        <FaEdit />
      </button>
    ) : (
      editUrl && (
        <Link to={`${editUrl}/${item.id || item.product_id || item.userId}`} className="button-edit">
          <FaEdit />
        </Link>
      )
    )}

    {onDelete && (
      <button
        onClick={(e) => {
          e.stopPropagation();
          const itemId = item.id || item.product_id || item.userId;
          onDelete(itemId);
        }}
        className="button-delete"
      >
        <FaTrash />
      </button>
    )}
  </td>
)}

                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length + 1} style={{ textAlign: "center", padding: "20px" }}>
                  Không có dữ liệu nào phù hợp với từ khóa tìm kiếm
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="pagination">{renderPagination()}</div>
    </div>
  );
};

export default Table;