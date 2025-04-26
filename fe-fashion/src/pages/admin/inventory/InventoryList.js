import React, { useState } from 'react';
import Layout from '../../../components/admin/Layout';
import Table from '../../../components/admin/Table';
import '../../../assets/styles/InventoryList.scss';
import { FaSearch, FaFilter } from 'react-icons/fa';

const InventoryList = () => {
  // Dữ liệu mẫu cho bảng tồn kho
  const [inventory, setInventory] = useState([
    { id: 1, code: 'P001', name: 'iPhone 15 Pro Max', category: 'Điện thoại', stock: 45, minStock: 10, status: 'Tốt' },
    { id: 2, code: 'P002', name: 'Samsung Galaxy S24', category: 'Điện thoại', stock: 60, minStock: 15, status: 'Tốt' },
    { id: 3, code: 'P003', name: 'MacBook Pro M3', category: 'Laptop', stock: 30, minStock: 10, status: 'Tốt' },
    { id: 4, code: 'P004', name: 'Airpods Pro 2', category: 'Phụ kiện', stock: 75, minStock: 20, status: 'Tốt' },
    { id: 5, code: 'P005', name: 'Samsung Galaxy Tab S9', category: 'Máy tính bảng', stock: 35, minStock: 10, status: 'Tốt' },
    { id: 6, code: 'P006', name: 'Apple Watch Series 9', category: 'Phụ kiện', stock: 5, minStock: 10, status: 'Cần nhập thêm' },
    { id: 7, code: 'P007', name: 'Sony WH-1000XM5', category: 'Phụ kiện', stock: 8, minStock: 15, status: 'Cần nhập thêm' },
  ]);

  const columns = [
    { key: 'code', name: 'Mã SP', sortable: true },
    { key: 'name', name: 'Tên sản phẩm', sortable: true },
    { key: 'category', name: 'Danh mục', sortable: true },
    { key: 'stock', name: 'Tồn kho', sortable: true },
    { key: 'minStock', name: 'Tồn kho tối thiểu', sortable: true },
    { key: 'status', name: 'Trạng thái', sortable: true },
  ];

  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  
  const filteredInventory = inventory.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase()) || 
                         item.code.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'all' || 
                         (filter === 'lowStock' && item.stock <= item.minStock);
    
    return matchesSearch && matchesFilter;
  });

  const handleAdjustStock = (id) => {
    // Xử lý điều chỉnh tồn kho
    const newStock = window.prompt('Nhập số lượng tồn kho mới:');
    if (newStock !== null) {
      setInventory(inventory.map(item => {
        if (item.id === id) {
          const updatedStock = parseInt(newStock);
          return { 
            ...item, 
            stock: updatedStock,
            status: updatedStock <= item.minStock ? 'Cần nhập thêm' : 'Tốt'
          };
        }
        return item;
      }));
    }
  };

  return (
    <Layout>
      <div className="inventory-list">
        <div className="page-header">
          <h1>Quản lý tồn kho</h1>
          <div className="header-actions">
            <div className="search-bar">
              <FaSearch />
              <input 
                type="text" 
                placeholder="Tìm kiếm sản phẩm..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="filter-dropdown">
              <FaFilter />
              <select value={filter} onChange={(e) => setFilter(e.target.value)}>
                <option value="all">Tất cả sản phẩm</option>
                <option value="lowStock">Sản phẩm cần nhập thêm</option>
              </select>
            </div>
            <button className="import-btn">Nhập hàng</button>
          </div>
        </div>
        
        <div className="inventory-summary">
          <div className="summary-box">
            <h3>Tổng sản phẩm</h3>
            <p>{inventory.length}</p>
          </div>
          <div className="summary-box">
            <h3>Cần nhập thêm</h3>
            <p>{inventory.filter(item => item.stock <= item.minStock).length}</p>
          </div>
          <div className="summary-box">
            <h3>Tổng giá trị tồn kho</h3>
            <p>1,250,000,000đ</p>
          </div>
        </div>
        
        <div className="inventory-table">
          <Table 
            columns={columns} 
            data={filteredInventory.map(item => ({
              ...item,
              status: <span className={`status ${item.status === 'Cần nhập thêm' ? 'warning' : 'good'}`}>{item.status}</span>
            }))} 
            onDelete={() => {}}
            customAction={(id) => (
              <button className="adjust-btn" onClick={() => handleAdjustStock(id)}>
                Điều chỉnh
              </button>
            )}
            title="Danh sách tồn kho"
          />
        </div>
      </div>
    </Layout>
  );
};

export default InventoryList;