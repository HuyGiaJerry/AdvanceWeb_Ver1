import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrash, FaSort, FaSortUp, FaSortDown } from 'react-icons/fa';
import '../../assets/styles/Table.scss';

const Table = ({ columns, data, onDelete, editUrl, createUrl }) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const getClassNamesFor = (name) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };

  const getSortIcon = (name) => {
    if (sortConfig.key !== name) return <FaSort />;
    if (sortConfig.direction === 'ascending') return <FaSortUp />;
    return <FaSortDown />;
  };

  const sortedData = React.useMemo(() => {
    let sortableItems = [...data];
    if (sortConfig.key) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [data, sortConfig]);

  return (
    <div className="table-container">
      <div className="table-header">
        <h2>{columns.title || 'Danh sách'}</h2>
        {createUrl && (
          <Link to={createUrl} className="create-btn">Thêm mới</Link>
        )}
      </div>
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
          {sortedData.map((item) => (
            <tr key={item.id}>
              {columns.map((column) => (
                <td key={`${item.id}-${column.key}`}>{item[column.key]}</td>
              ))}
              <td className="actions">
                {editUrl && (
                  <Link to={`${editUrl}/${item.id}`} className="edit-btn">
                    <FaEdit /> Sửa
                  </Link>
                )}
                <button onClick={() => onDelete(item.id)} className="delete-btn">
                  <FaTrash /> Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button>&laquo;</button>
        <button className="active">1</button>
        <button>2</button>
        <button>3</button>
        <button>&raquo;</button>
      </div>
    </div>
  );
};

export default Table;