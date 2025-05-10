import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUndo, FaRedo, FaBold, FaItalic, FaUnderline, FaStrikethrough, 
  FaAlignLeft, FaAlignCenter, FaAlignRight, FaAlignJustify, 
  FaListUl, FaListOl, FaLink, FaUpload, FaTrash, FaPlus } from 'react-icons/fa';
import '../../../assets/styles/Forms.scss';
import { addProduct } from '../../../services/test';
const ProductForm = ({ product = {}, categories = [], onSubmit, formType = 'create' }) => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  
  // Initialize state with default values from database schema
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    base_price: '',
    discount_price: '',
    sku: '',
    category_id: '',
    ...product
  });

  // State for managing product colors
  const [colors, setColors] = useState([
    { color_name: '', color_sku: '', images: [] }
  ]);

  // State for managing product variants
  const [variants, setVariants] = useState([
    { size: '', color_id: 0, stock_quantity: 0, variant_sku: '' }
  ]);

  // State for file uploads
  const [colorImages, setColorImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

const handleSubmit = (e) => {
  e.preventDefault();
  
  // Prepare the submission data with all related entities
  const submissionData = {
    product: formData,
    colors: colors,
    variants: variants,
    colorImages: colorImages
  };
  
  try {
    // Gọi hàm addProduct và nhận về sản phẩm mới đã được tạo
    const newProduct = addProduct(submissionData);
    if (!validateForm()) return;
    console.log("Sản phẩm mới đã được tạo:", newProduct);
    
    // Tạo sự kiện để thông báo cho ProductList biết có sản phẩm mới
    const productCreatedEvent = new CustomEvent('productCreated', {
      detail: { product: newProduct }
    });
    window.dispatchEvent(productCreatedEvent);
    
    // Nếu onSubmit được truyền từ component cha, gọi nó
    if (onSubmit) {
      onSubmit(submissionData);
    }
    
    // Chuyển hướng về trang danh sách sản phẩm
    navigate('/admin/products');
  } catch (error) {
    console.error("Lỗi khi tạo sản phẩm:", error);
    alert("Tạo sản phẩm thành công!");
  }
};
const validateForm = () => {
  // Kiểm tra form chính
  if (!formData.name || !formData.base_price || isNaN(formData.base_price)) {
    alert("Tên sản phẩm và giá gốc là bắt buộc.");
    return false;
  }

  // Giá khuyến mãi (nếu có) phải là số và không lớn hơn giá gốc
  if (formData.discount_price) {
    if (isNaN(formData.discount_price)) {
      alert("Giá khuyến mãi không hợp lệ.");
      return false;
    }
    if (parseFloat(formData.discount_price) >= parseFloat(formData.base_price)) {
      alert("Giá khuyến mãi phải nhỏ hơn giá gốc.");
      return false;
    }
  }

  // // Kiểm tra hình ảnh chung
  // if (!previewImages.some(img => img.colorIndex === -1)) {
  //   alert("Bạn cần tải lên ít nhất một hình ảnh chung cho sản phẩm.");
  //   return false;
  // }

  // Kiểm tra từng màu
  for (let i = 0; i < colors.length; i++) {
    const color = colors[i];
    if (!color.color_name || !color.color_sku) {
      alert(`Vui lòng nhập đầy đủ thông tin màu sắc #${i + 1}`);
      return false;
    }

    // Kiểm tra ảnh của màu
    const colorImages = previewImages.filter(img => img.colorIndex === i);
    if (colorImages.length === 0) {
      alert(`Vui lòng thêm ít nhất một ảnh cho màu sắc "${color.color_name || 'Không tên'}"`);
      return false;
    }
  }

  // Kiểm tra biến thể
  for (let i = 0; i < variants.length; i++) {
    const variant = variants[i];
    if (!variant.size || variant.color_id === "" || variant.stock_quantity === "" || !variant.variant_sku) {
      alert(`Vui lòng điền đầy đủ thông tin biến thể #${i + 1}`);
      return false;
    }
    if (isNaN(variant.stock_quantity) || variant.stock_quantity < 0) {
      alert(`Số lượng kho của biến thể #${i + 1} phải là số không âm.`);
      return false;
    }
  }
const skuRegex = /^PROD\d{3}(-[\p{L}]+){0,2}$/u;
  const allSkus = new Set();

const checkAndAddSku = (sku) => {
  if (!skuRegex.test(sku)) {
    alert(`SKU không đúng định dạng (VD: PROD001 hoặc PROD001-ĐEN-L): ${sku}`);
    return false;
  }
  if (allSkus.has(sku)) {
    alert(`SKU bị trùng: ${sku}`);
    return false;
  }
  allSkus.add(sku);
  return true;
};




  for (let c of colors) {
    if (!checkAndAddSku(c.color_sku)) return false;
  }
  for (let v of variants) {
    if (!checkAndAddSku(v.variant_sku)) return false;
  }

  return true;
};

  const handleDiscard = () => {
    navigate('/admin/products');
  };


  // Handle file selection for image uploads
  const handleBrowseClick = (colorIndex = -1) => {
    // Set the active color index for image upload
    fileInputRef.current.dataset.colorIndex = colorIndex;
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const colorIndex = parseInt(e.target.dataset.colorIndex || -1);
    
    if (files.length === 0) return;
    
    // Create preview URLs for the images
    const newImages = files.map(file => ({
      file,
      url: URL.createObjectURL(file),
      colorIndex
    }));
    
    setPreviewImages(prev => [...prev, ...newImages]);
    
    // If colorIndex is valid, add to that color's images
    if (colorIndex >= 0) {
      const updatedColors = [...colors];
      const currentImages = updatedColors[colorIndex].images || [];
      updatedColors[colorIndex].images = [...currentImages, ...files];
      setColors(updatedColors);
      
      // Also add to colorImages state for form submission
      const newColorImages = files.map(file => ({
        file,
        color_id: colorIndex + 1, // +1 because indices start at 0 but IDs at 1
        is_primary: currentImages.length === 0 && files.indexOf(file) === 0 // First image is primary
      }));
      
      setColorImages(prev => [...prev, ...newColorImages]);
    } else {
      // Add to general product images
      setColorImages(prev => [
        ...prev, 
        ...files.map((file, idx) => ({
          file,
          color_id: null,
          is_primary: idx === 0 && prev.length === 0
        }))
      ]);
    }
  };

  const removeImage = (index) => {
    // Get the image to remove
    const imageToRemove = previewImages[index];
    
    // Remove from preview images
    const updatedPreviewImages = [...previewImages];
    updatedPreviewImages.splice(index, 1);
    setPreviewImages(updatedPreviewImages);
    
    // Remove from color images if applicable
    if (imageToRemove.colorIndex >= 0) {
      const updatedColors = [...colors];
      const imageFile = imageToRemove.file;
      const currentImages = updatedColors[imageToRemove.colorIndex].images || [];
      updatedColors[imageToRemove.colorIndex].images = currentImages.filter(img => img !== imageFile);
      setColors(updatedColors);
    }
    
    // Remove from colorImages state
    setColorImages(prev => prev.filter(img => img.file !== imageToRemove.file));
    
    // Revoke URL to prevent memory leaks
    URL.revokeObjectURL(imageToRemove.url);
  };

  // Handle color management
  const addColor = () => {
    setColors([...colors, { color_name: '', color_sku: '', images: [] }]);
  };

  const removeColor = (index) => {
    const updatedColors = [...colors];
    updatedColors.splice(index, 1);
    setColors(updatedColors);
    
    // Remove associated images
    const updatedPreviewImages = previewImages.filter(img => img.colorIndex !== index);
    setPreviewImages(updatedPreviewImages);
    
    setColorImages(prev => prev.filter(img => img.color_id !== index + 1));
  };
  
  const updateColor = (index, field, value) => {
    const updatedColors = [...colors];
    updatedColors[index][field] = value;
    setColors(updatedColors);
  };

  // Handle variant management
  const addVariant = () => {
    setVariants([...variants, { size: '', color_id: 0, stock_quantity: 0, variant_sku: '' }]);
  };

  const removeVariant = (index) => {
    const updatedVariants = [...variants];
    updatedVariants.splice(index, 1);
    setVariants(updatedVariants);
  };
  
  const updateVariant = (index, field, value) => {
    const updatedVariants = [...variants];
    updatedVariants[index][field] = value;
    setVariants(updatedVariants);
  };

  return (
    <div className="product-form-container">
      <form onSubmit={handleSubmit}>
        <div className="product-form-header">
      <div className="m-40">
  <h1 className="text-white">{formType === 'create' ? 'Thêm sản phẩm mới' : 'Cập nhật sản phẩm'}</h1>
  <p className="text-white">Quản lý thông tin chi tiết sản phẩm</p>
</div>
          <div className="header-actions">
            <button type="button" className="discard-btn" onClick={handleDiscard}>Hủy bỏ</button>
            {/* <button type="button" className="save-draft-btn" onClick={handleSaveDraft}>Lưu nháp</button> */}
            <button type="submit" className="publish-btn">
              {formType === 'create' ? 'Tạo sản phẩm' : 'Cập nhật sản phẩm'}
            </button>
          </div>
        </div>

        <div className="form-content">
          <div className="form-main">
            {/* Basic Product Information */}
            <div className="form-section">
              <h2>Thông tin cơ bản</h2>
              
              <div className="form-group">
                <label htmlFor="name">Tên sản phẩm <span className="required">*</span></label>
                <input
                  type="text"
                  id="name"
                  name="name" 
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Nhập tên sản phẩm..."
                  className="form-control"
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="sku">Mã SKU <span className="required">*</span></label>
                <input
                  type="text"
                  id="sku"
                  name="sku"
                  value={formData.sku}
                  onChange={handleChange}
                  placeholder="VD: IP15-256-BLK"
                  className="form-control"
                  required
                />
                <small className="form-text">Mã SKU phải là duy nhất</small>
              </div>
              
              <div className="form-group">
                <label htmlFor="category_id">Danh mục <span className="required">*</span></label>
                <select
                  id="category_id"
                  name="category_id"
                  value={formData.category_id}
                  onChange={handleChange}
                  className="form-control"
                  required
                >
                  <option value="">-- Chọn danh mục --</option>
                  {categories.map(category => (
                    <option key={category.category_id} value={category.category_id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Product Description */}
            <div className="form-section">
              <h2>Mô tả sản phẩm</h2>
              <div className="text-editor-toolbar">
                <button type="button" className="toolbar-btn"><FaUndo /></button>
                <button type="button" className="toolbar-btn"><FaRedo /></button>
                <span className="divider"></span>
                <button type="button" className="toolbar-btn"><FaBold /></button>
                <button type="button" className="toolbar-btn"><FaItalic /></button>
                <button type="button" className="toolbar-btn"><FaUnderline /></button>
                <button type="button" className="toolbar-btn"><FaStrikethrough /></button>
                <span className="divider"></span>
                <button type="button" className="toolbar-btn"><FaAlignLeft /></button>
                <button type="button" className="toolbar-btn"><FaAlignCenter /></button>
                <button type="button" className="toolbar-btn"><FaAlignRight /></button>
                <button type="button" className="toolbar-btn"><FaAlignJustify /></button>
                <span className="divider"></span>
                <button type="button" className="toolbar-btn"><FaListUl /></button>
                <button type="button" className="toolbar-btn"><FaListOl /></button>
                <span className="divider"></span>
                <button type="button" className="toolbar-btn"><FaLink /></button>
              </div>
              <textarea
                name="description"
                id="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Nhập mô tả chi tiết về sản phẩm..."
                className="form-control text-editor"
                rows="8"
              ></textarea>
            </div>

            {/* Product Images
            <div className="form-section">
              <h2>Hình ảnh sản phẩm chung</h2>
              <div className="image-upload-area">
                {previewImages.filter(img => img.colorIndex === -1).length > 0 ? (
                  <div className="image-preview-container">
                    {previewImages
                      .filter(img => img.colorIndex === -1)
                      .map((image, index) => (
                        <div key={index} className="image-preview-item">
                          <img src={image.url} alt={`Preview ${index}`} />
                          <button
                            type="button"
                            className="remove-image-btn"
                            onClick={() => removeImage(previewImages.indexOf(image))}
                          >
                            <FaTrash />
                          </button>
                        </div>
                      ))}
                    <div
                      className="add-more-images"
                      onClick={() => handleBrowseClick(-1)}
                    >
                      <FaPlus size={24} />
                      <span>Thêm ảnh</span>
                    </div>
                  </div>
                ) : (
                  <div className="upload-placeholder" onClick={() => handleBrowseClick(-1)}>
                    <div className="upload-icon">
                      <FaUpload size={48} />
                    </div>
                    <p>
                      Kéo thả hình ảnh vào đây hoặc{' '}
                      <span className="browse-link">Browse from device</span>
                    </p>
                  </div>
                )}
              </div>
            </div> */}

            {/* Pricing Information */}
            <div className="form-section">
              <h2>Thông tin giá</h2>
              <div className="pricing-fields">
                <div className="form-group">
                  <label htmlFor="base_price">Giá gốc (VNĐ) <span className="required">*</span></label>
                  <div className="price-input">
                    <span className="currency">₫</span>
                    <input
                      type="number"
                      id="base_price"
                      name="base_price"
                      value={formData.base_price}
                      onChange={handleChange}
                      placeholder="0"
                      min="0"
                      step="1000"
                      className="form-control"
                      required
                    />
                  </div>
                </div>
                
                <div className="form-group">
                  <label htmlFor="discount_price">Giá khuyến mãi (VNĐ)</label>
                  <div className="price-input">
                    <span className="currency">₫</span>
                    <input
                      type="number"
                      id="discount_price"
                      name="discount_price"
                      value={formData.discount_price}
                      onChange={handleChange}
                      placeholder="0"
                      min="0"
                      step="1000"
                      className="form-control"
                    />
                  </div>
                  <small className="form-text">Để trống nếu không có giá khuyến mãi</small>
                </div>
              </div>
            </div>
            
            {/* Color Management */}
            <div className="form-section">
              <h2>Quản lý màu sắc</h2>
              <p className="section-description">
                Thêm các màu sắc có sẵn cho sản phẩm này.
              </p>
              
              {colors.map((color, index) => (
                <div key={index} className="color-item">
                  <div className="color-header">
                    <h3>Màu sắc #{index + 1}</h3>
                    {index > 0 && (
                      <button
                        type="button"
                        className="remove-btn"
                        onClick={() => removeColor(index)}
                      >
                        <FaTrash /> Xóa
                      </button>
                    )}
                  </div>
                  
                  <div className="color-fields">
                    <div className="form-group">
                      <label>Tên màu <span className="required">*</span></label>
                      <input
                        type="text"
                        value={color.color_name}
                        onChange={(e) => updateColor(index, 'color_name', e.target.value)}
                        placeholder="VD: Đen, Trắng, Xanh,..."
                        className="form-control"
                        required
                      />
                    </div>
                    
                    <div className="form-group">
                      <label>Mã SKU của màu <span className="required">*</span></label>
                      <input
                        type="text"
                        value={color.color_sku}
                        onChange={(e) => updateColor(index, 'color_sku', e.target.value)}
                        placeholder="VD: BLK, WHT, BLU,..."
                        className="form-control"
                        required
                      />
                      <small className="form-text">Mã SKU của màu phải là duy nhất</small>
                    </div>
                  </div>
                  
                  {/* Color-specific images */}
                  <div className="color-images">
                    <h4>Hình ảnh cho màu này</h4>
                    <div className="image-upload-area">
                      {previewImages.filter(img => img.colorIndex === index).length > 0 ? (
                        <div className="image-preview-container">
                          {previewImages
                            .filter(img => img.colorIndex === index)
                            .map((image, imgIndex) => (
                              <div key={imgIndex} className="image-preview-item">
                                <img src={image.url} alt={`${color.color_name || 'Color'} ${imgIndex}`} />
                                <button
                                  type="button"
                                  className="remove-image-btn"
                                  onClick={() => removeImage(previewImages.indexOf(image))}
                                >
                                  <FaTrash />
                                </button>
                              </div>
                            ))}
                          <div
                            className="add-more-images"
                            onClick={() => handleBrowseClick(index)}
                          >
                            <FaPlus size={24} />
                            <span>Thêm ảnh</span>
                          </div>
                        </div>
                      ) : (
                        <div className="upload-placeholder" onClick={() => handleBrowseClick(index)}>
                          <div className="upload-icon">
                            <FaUpload size={32} />
                          </div>
                          <p>
                            Kéo thả hình ảnh cho màu này hoặc{' '}
                            <span className="browse-link">Browse from device</span>
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              
              <button
                type="button"
                className="add-color-btn"
                onClick={addColor}
              >
                <FaPlus /> Thêm màu mới
              </button>
            </div>
            
            {/* Variant Management */}
            <div className="form-section">
              <h2>Quản lý biến thể sản phẩm</h2>
              <p className="section-description">
                Thêm các biến thể kích thước cho từng màu sắc sản phẩm.
              </p>
              
              {variants.map((variant, index) => (
                <div key={index} className="variant-item">
                  <div className="variant-header">
                    <h3>Biến thể #{index + 1}</h3>
                    {index > 0 && (
                      <button
                        type="button"
                        className="remove-btn"
                        onClick={() => removeVariant(index)}
                      >
                        <FaTrash /> Xóa
                      </button>
                    )}
                  </div>
                  
                  <div className="variant-fields">
                    <div className="form-group">
                      <label>Kích thước <span className="required">*</span></label>
                      <input
                        type="text"
                        value={variant.size}
                        onChange={(e) => updateVariant(index, 'size', e.target.value)}
                        placeholder="VD: S, M, L, XL, 256GB,..."
                        className="form-control"
                        required
                      />
                    </div>
                    
                    <div className="form-group">
                      <label>Chọn màu <span className="required">*</span></label>
                      <select
                        value={variant.color_id}
                        onChange={(e) => updateVariant(index, 'color_id', parseInt(e.target.value))}
                        className="form-control"
                        required
                      >
                        <option value="">-- Chọn màu sắc --</option>
                        {colors.map((color, colorIndex) => (
                          <option key={colorIndex} value={colorIndex + 1}>
                            {color.color_name || `Màu ${colorIndex + 1}`}
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    <div className="form-group">
                      <label>Số lượng trong kho <span className="required">*</span></label>
                      <input
                        type="number"
                        min="0"
                        value={variant.stock_quantity}
                        onChange={(e) => updateVariant(index, 'stock_quantity', parseInt(e.target.value))}
                        placeholder="0"
                        className="form-control"
                        required
                      />
                    </div>
                    
                    <div className="form-group">
                      <label>Mã SKU biến thể <span className="required">*</span></label>
                      <input
                        type="text"
                        value={variant.variant_sku}
                        onChange={(e) => updateVariant(index, 'variant_sku', e.target.value)}
                        placeholder="VD: IP15-256-BLK-L"
                        className="form-control"
                        required
                      />
                      <small className="form-text">Mã SKU biến thể phải là duy nhất</small>
                    </div>
                  </div>
                </div>
              ))}
              
              <button
                type="button"
                className="add-variant-btn"
                onClick={addVariant}
              >
                <FaPlus /> Thêm biến thể mới
              </button>
            </div>
          </div>
        </div>

        {/* Hidden file input for image uploads */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          multiple
          style={{ display: 'none' }}
        />
      </form>
    </div>
  );
};

export default ProductForm;