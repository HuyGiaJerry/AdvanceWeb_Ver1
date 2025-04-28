import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrash, FaSort, FaSortUp, FaSortDown } from 'react-icons/fa';
import '../../assets/styles/Table.scss';

const Table = ({ columns, data, onDelete, editUrl, createUrl, itemsPerPage = 5 }) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const [currentPage, setCurrentPage] = useState(1);

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const getSortIcon = (name) => {
    if (sortConfig.key !== name) return <FaSort />;
    return sortConfig.direction === 'ascending' ? <FaSortUp /> : <FaSortDown />;
  };

  const sortedData = React.useMemo(() => {
    let sortableItems = [...data];
    if (sortConfig.key) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'ascending' ? -1 : 1;
        if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'ascending' ? 1 : -1;
        return 0;
      });
    }
    return sortableItems;
  }, [data, sortConfig]);

  const totalItems = sortedData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const currentItems = sortedData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  const renderPagination = () => {
    const pagination = [];
    const startPage = Math.max(2, currentPage - 1);
    const endPage = Math.min(totalPages - 1, currentPage + 1);

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

    pagination.push(
      <button
        key={1}
        className={`pagination-button ${currentPage === 1 ? 'active' : ''}`}
        onClick={() => handlePageChange(1)}
      >
        1
      </button>
    );

    if (startPage > 2) {
      pagination.push(<span key="start-ellipsis" className="ellipsis">...</span>);
    }

    for (let i = startPage; i <= endPage; i++) {
      pagination.push(
        <button
          key={i}
          className={`pagination-button ${currentPage === i ? 'active' : ''}`}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </button>
      );
    }

    if (endPage < totalPages - 1) {
      pagination.push(<span key="end-ellipsis" className="ellipsis">...</span>);
    }

    if (totalPages > 1) {
      pagination.push(
        <button
          key={totalPages}
          className={`pagination-button ${currentPage === totalPages ? 'active' : ''}`}
          onClick={() => handlePageChange(totalPages)}
        >
          {totalPages}
        </button>
      );
    }

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
        <h2>{columns.title || 'Danh sách'}</h2>
        {createUrl && (
          <Link to={createUrl} className="button-add">➕ Thêm mới</Link>
        )}
      </div>
      <div className="table-card">
        <table className="data-table">
          <thead>
            <tr>
              {columns.map((column) => (
                <th 
                  key={column.key}
                  onClick={() => column.sortable ? requestSort(column.key) : null}
                  className={column.sortable ? 'sortable' : ''}
                >
                  {column.name}
                  {column.sortable && <span className="sort-icon">{getSortIcon(column.key)}</span>}
                </th>
              ))}
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item) => (
              <tr key={item.product_id}>
                {columns.map((column) => (
                  <td key={`${item.product_id}-${column.key}`}>{item[column.key]}</td>
                ))}
                <td className="actions">
                  {editUrl && (
                    <Link to={`${editUrl}/${item.product_id}`} className="button-edit">
                      <FaEdit /> 
                    </Link>
                  )}
                  <button onClick={() => onDelete(item.product_id)} className="button-delete">
                    <FaTrash /> 
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="pagination">
        {renderPagination()}
      </div>
    </div>
  );
};

export default Table;
