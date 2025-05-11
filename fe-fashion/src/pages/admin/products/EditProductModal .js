import React, { useState, useEffect, useRef } from "react";
import dataProduct from "../../../services/test"; 
import "../../../assets/styles/EditProductModal.scss"; 

const EditProductModal = ({ isOpen, onClose, productId, onSave }) => {
  const [product, setProduct] = useState(null);
  const [activeTab, setActiveTab] = useState('general');
  const [loading, setLoading] = useState(true);
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    basePrice: 0,
    discountPrice: 0,
    sku: "",
    categoryId: 0,
    colors: []
  });
  const [newImage, setNewImage] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  // Tìm sản phẩm theo ID khi modal mở
  useEffect(() => {
    if (isOpen && productId) {
      const productData = dataProduct.find(p => p.productId === productId);
      if (productData) {
        setProduct(productData);
        setFormData({
          name: productData.name,
          description: productData.description,
          basePrice: productData.basePrice,
          discountPrice: productData.discountPrice,
          sku: productData.sku,
          categoryId: productData.categoryId,
          colors: JSON.parse(JSON.stringify(productData.colors)) // Deep copy colors array
        });
        setLoading(false);
      }
    }
  }, [isOpen, productId]);

  // Xử lý khi thay đổi thông tin chung
  const handleGeneralChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'basePrice' || name === 'discountPrice' || name === 'categoryId' 
        ? Number(value) 
        : value
    });
  };

  // Xử lý khi thay đổi thông tin màu sắc (chỉ đọc - không cho chỉnh sửa)
  const handleColorChange = (colorIndex, field, value) => {
    // Không cho phép chỉnh sửa thuộc tính phần biến thể màu sắc
    return;
  };

  // Xử lý khi thay đổi variant (chỉ đọc - không cho chỉnh sửa)
  const handleVariantChange = (colorIndex, variantIndex, field, value) => {
    // Không cho phép chỉnh sửa thuộc tính variant
    return;
  };

  // Xử lý khi thay đổi hình ảnh
  const handleImageChange = (colorIndex, imageIndex, field, value) => {
    const updatedColors = [...formData.colors];
    updatedColors[colorIndex].images[imageIndex][field] = 
      field === 'isPrimary' ? value : value;
    
    // Nếu đánh dấu là hình chính, hủy đánh dấu các hình khác
    if (field === 'isPrimary' && value === true) {
      updatedColors[colorIndex].images.forEach((img, idx) => {
        if (idx !== imageIndex) {
          img.isPrimary = false;
        }
      });
    }
    
    setFormData({
      ...formData,
      colors: updatedColors
    });
  };

  // Xử lý khi chọn file hình ảnh
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Kiểm tra file có phải là hình ảnh
    if (!file.type.match('image.*')) {
      alert('Vui lòng chọn file hình ảnh');
      return;
    }

    // Cập nhật tên file
    setNewImage(file.name);
    
    // Tạo URL và hiển thị preview
    const objectUrl = URL.createObjectURL(file);
    setImagePreview(objectUrl);
    
    // Trong môi trường thực tế, bạn sẽ cần tải file lên server và lấy URL từ phản hồi
    // Ví dụ:
    // const formData = new FormData();
    // formData.append('image', file);
    // 
    // fetch('/api/upload-image', {
    //   method: 'POST',
    //   body: formData
    // })
    // .then(response => response.json())
    // .then(data => {
    //   if (data.success) {
    //     setNewImage(data.imageUrl);
    //   } else {
    //     alert('Tải ảnh không thành công');
    //   }
    // })
    // .catch(error => {
    //   console.error('Lỗi khi tải ảnh:', error);
    //   alert('Đã xảy ra lỗi khi tải ảnh');
    // });
  };
  
  // Thêm hình ảnh mới
  const handleAddImage = (colorIndex) => {
    if (newImage.trim() === "") return;
    
    const updatedColors = [...formData.colors];
    const newImageObj = {
      imageId: Date.now(), // ID tạm thời
      imageUrl: imagePreview || newImage, // Sử dụng preview URL nếu có, nếu không thì dùng tên file
      isPrimary: updatedColors[colorIndex].images.length === 0 // Nếu là hình đầu tiên thì cho là hình chính
    };
    
    updatedColors[colorIndex].images.push(newImageObj);
    
    setFormData({
      ...formData,
      colors: updatedColors
    });
    
    // Reset form
    setNewImage("");
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Xóa hình ảnh
  const handleDeleteImage = (colorIndex, imageIndex) => {
    const updatedColors = [...formData.colors];
    const wasImagePrimary = updatedColors[colorIndex].images[imageIndex].isPrimary;
    
    // Xóa hình ảnh
    updatedColors[colorIndex].images.splice(imageIndex, 1);
    
    // Nếu đã xóa ảnh chính và còn ảnh khác, đặt ảnh đầu tiên làm ảnh chính
    if (wasImagePrimary && updatedColors[colorIndex].images.length > 0) {
      updatedColors[colorIndex].images[0].isPrimary = true;
    }
    
    setFormData({
      ...formData,
      colors: updatedColors
    });
  };

  // Lưu thay đổi
  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  // Nếu không mở thì không hiển thị gì
  if (!isOpen) return null;

  // Nếu đang loading hoặc không có sản phẩm, hiển thị thông báo loading
  if (loading) return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-loading">Đang tải...</div>
      </div>
    </div>
  );

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h2>Chỉnh sửa sản phẩm</h2>
          <button onClick={onClose} className="close-button">&times;</button>
        </div>

        {/* Tab navigation */}
        <div className="modal-tabs">
          <button 
            className={`tab-button ${activeTab === 'general' ? 'active' : ''}`}
            onClick={() => setActiveTab('general')}
          >
            Thông tin chung
          </button>
          <button 
            className={`tab-button ${activeTab === 'variants' ? 'active' : ''}`}
            onClick={() => setActiveTab('variants')}
          >
            Biến thể & Màu sắc
          </button>
          <button 
            className={`tab-button ${activeTab === 'images' ? 'active' : ''}`}
            onClick={() => setActiveTab('images')}
          >
            Hình ảnh
          </button>
        </div>

        <div className="modal-content">
          {/* Thông tin chung */}
          {activeTab === 'general' && (
            <div className="tab-content general-tab">
              <div className="form-row">
                <div className="form-group">
                  <label>Tên sản phẩm</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleGeneralChange}
                  />
                </div>
                <div className="form-group">
                  <label>SKU</label>
                  <input
                    type="text"
                    name="sku"
                    value={formData.sku}
                    onChange={handleGeneralChange}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Mô tả</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleGeneralChange}
                  rows="4"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Giá gốc</label>
                  <input
                    type="number"
                    name="basePrice"
                    value={formData.basePrice}
                    onChange={handleGeneralChange}
                  />
                </div>
                <div className="form-group">
                  <label>Giá khuyến mãi</label>
                  <input
                    type="number"
                    name="discountPrice"
                    value={formData.discountPrice}
                    onChange={handleGeneralChange}
                  />
                </div>
                <div className="form-group">
                  <label>Danh mục</label>
                  <select
                    name="categoryId"
                    value={formData.categoryId}
                    onChange={handleGeneralChange}
                  >
                    <option value={1}>Điện thoại</option>
                    <option value={2}>Máy tính</option>
                    <option value={3}>Phụ kiện</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Biến thể & Màu sắc */}
          {activeTab === 'variants' && (
            <div className="tab-content variants-tab">
              {/* Dropdown chọn màu */}
              <div className="color-selector">
                <label>Chọn màu:</label>
                <select 
                  value={selectedColorIndex}
                  onChange={(e) => setSelectedColorIndex(Number(e.target.value))}
                  className="color-dropdown"
                >
                  {formData.colors.map((color, index) => (
                    <option key={color.colorId} value={index}>
                      {color.colorName}
                    </option>
                  ))}
                </select>
              </div>

              {/* Hiển thị thông tin của màu đã chọn */}
              {formData.colors[selectedColorIndex] && (
                <div className="color-section">
                  <div className="color-header">
                    <h3>Màu sắc: {formData.colors[selectedColorIndex].colorName}</h3>
                  </div>
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label>Tên màu</label>
                      <input
                        type="text"
                        value={formData.colors[selectedColorIndex].colorName}
                        disabled
                        className="disabled-input"
                      />
                    </div>
                    <div className="form-group">
                      <label>SKU màu</label>
                      <input
                        type="text"
                        value={formData.colors[selectedColorIndex].colorSku}
                        disabled
                        className="disabled-input"
                      />
                    </div>
                  </div>

                  <h4>Kích thước & Số lượng:</h4>
                  <div className="variant-table-container">
                    <table className="variant-table">
                      <thead>
                        <tr>
                          <th>Kích thước</th>
                          <th>Số lượng</th>
                          <th>SKU Biến thể</th>
                        </tr>
                      </thead>
                      <tbody>
                        {formData.colors[selectedColorIndex].variants.map((variant, variantIndex) => (
                          <tr key={variant.variantId}>
                            <td>
                              <input
                                type="text"
                                value={variant.size}
                                disabled
                                className="disabled-input"
                              />
                            </td>
                            <td>
                              <input
                                type="number"
                                value={variant.stockQuantity}
                                disabled
                                className="disabled-input"
                              />
                            </td>
                            <td>
                              <input
                                type="text"
                                value={variant.variantSku}
                                disabled
                                className="disabled-input"
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Hình ảnh */}
          {activeTab === 'images' && (
            <div className="tab-content images-tab">
              {/* Dropdown chọn màu cho hình ảnh */}
              <div className="color-selector mb-3">
                <label>Chọn màu:</label>
                <select 
                  value={selectedColorIndex}
                  onChange={(e) => setSelectedColorIndex(Number(e.target.value))}
                  className="color-dropdown"
                >
                  {formData.colors.map((color, index) => (
                    <option key={color.colorId} value={index}>
                      {color.colorName}
                    </option>
                  ))}
                </select>
              </div>

              {/* Hiển thị hình ảnh của màu đã chọn */}
              {formData.colors[selectedColorIndex] && (
                <div className="color-section">
                  <h5>Màu: {formData.colors[selectedColorIndex].colorName}</h5>
                  
                  {/* Phần thêm hình ảnh mới */}
                  <div className="add-image-section mb-4">
                    <div className="upload-preview-container">
                      {imagePreview && (
                        <div className="image-preview">
                          <img src={imagePreview} alt="Preview" />
                        </div>
                      )}
                      <div className="upload-controls">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleFileChange}
                          ref={fileInputRef}
                          className="file-input"
                          id="file-upload"
                        />
                        <label htmlFor="file-upload" className="file-upload-label">
                          Chọn ảnh
                        </label>
                        {newImage && (
                          <div className="selected-file">
                            <span>{newImage}</span>
                          </div>
                        )}
                        <button 
                          onClick={() => handleAddImage(selectedColorIndex)}
                          className="btn-add-image"
                          disabled={!newImage}
                        >
                          Thêm ảnh
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  {/* Danh sách hình ảnh */}
                  <div className="image-list d-flex flex-wrap">
                    {formData.colors[selectedColorIndex].images.map((image, imageIndex) => (
                      <div key={imageIndex} className="image-item text-center me-3 mb-3">
                        <div className="image-container">
                          <img
                            src={image.imageUrl.startsWith('blob:') 
                              ? image.imageUrl 
                              : require(`../../../assets/images/${image.imageUrl}`)}
                            alt={`Color ${formData.colors[selectedColorIndex].colorName} - ${imageIndex}`}
                            className="img-thumbnail"
                            style={{ width: '100px', height: 'auto' }}
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = '/placeholder-image.png'; // Fallback image
                            }}
                          />
                          <button 
                            className="delete-image-btn"
                            onClick={() => handleDeleteImage(selectedColorIndex, imageIndex)}
                          >
                            &times;
                          </button>
                        </div>
                        <div className="mt-2">
                          <label>
                            <input
                              type="checkbox"
                              checked={image.isPrimary}
                              onChange={(e) =>
                                handleImageChange(
                                  selectedColorIndex,
                                  imageIndex,
                                  'isPrimary',
                                  e.target.checked
                                )
                              }
                            />{" "}
                            Hình chính
                          </label>
                        </div>
                        <div>
                          <input
                            type="text"
                            value={image.imageUrl}
                            onChange={(e) =>
                              handleImageChange(
                                selectedColorIndex,
                                imageIndex,
                                'imageUrl',
                                e.target.value
                              )
                            }
                            placeholder="Tên file ảnh"
                            className="image-url-input"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="modal-footer">
          <button onClick={onClose} className="cancel-button">Hủy</button>
          <button onClick={handleSave} className="save-button">Lưu thay đổi</button>
        </div>
      </div>
    </div>
  );
};

export default EditProductModal;