use dbtest;



-- Danh mục cha (id 1 - 6)
INSERT INTO categories (name, parent_id) VALUES
('Áo', NULL),          -- id = 1
('Quần', NULL),        -- id = 2
('Giày dép', NULL),    -- id = 3
('Phụ kiện', NULL),    -- id = 4
('Túi xách', NULL),    -- id = 5
('Đồ bộ', NULL);       -- id = 6 (nếu muốn thêm mới)

-- Danh mục con cho 'Áo' (parent_id = 1)
INSERT INTO categories (name, parent_id) VALUES
('Áo thun', 1),        -- id = 7
('Áo sơ mi', 1);       -- id = 8

-- Danh mục con cho 'Quần' (parent_id = 2)
INSERT INTO categories (name, parent_id) VALUES
('Quần jeans', 2),     -- id = 9
('Quần short', 2);     -- id = 10

-- Danh mục con cho 'Giày dép' (parent_id = 3)
INSERT INTO categories (name, parent_id) VALUES
('Giày thể thao', 3),  -- id = 11
('Giày lười', 3),
('Dép sandal', 3);

-- Danh mục con cho 'Phụ kiện' (parent_id = 4)
INSERT INTO categories (name, parent_id) VALUES
('Thắt lưng', 4),
('Kính mát', 4),
('Mũ nón', 4);

-- Danh mục con cho 'Túi xách' (parent_id = 5)
INSERT INTO categories (name, parent_id) VALUES
('Túi đeo chéo', 5),
('Túi tote', 5),
('Ba lô', 5);

-- Product
SET @row := 0;
INSERT INTO products (name, description, base_price, discount_price, sku, category_id)
SELECT 
  CONCAT('Sản phẩm ', n),
  CONCAT('Mô tả sản phẩm ', n),
  100000 + FLOOR(RAND() * 50000),
  90000 + FLOOR(RAND() * 40000),
  CONCAT('SKU', LPAD(n, 4, '0')),
  FLOOR(RAND() * 5) + 1  -- category_id từ 1 đến 5
FROM (
  SELECT @row := @row + 1 AS n FROM information_schema.columns LIMIT 250
) AS t;

SET @img_index := 0;
-- Gán ảnh theo tên: /images/001.jpg đến /images/1000.jpg
INSERT INTO product_images (product_id, image_url, is_primary)
SELECT 
  p.product_id,
  CONCAT('/images/', LPAD(@img_index := @img_index + 1, 3, '0'), '.jpg'),
  CASE WHEN i = 1 THEN TRUE ELSE FALSE END
FROM (
  SELECT product_id FROM products ORDER BY product_id LIMIT 250
) p
JOIN (
  SELECT 1 AS i UNION ALL
  SELECT 2 UNION ALL
  SELECT 3 UNION ALL
  SELECT 4
) imgs;

SET @row_number := 0;

INSERT INTO product_variants (product_id, size, color, stock_quantity, variant_sku, additional_price)
SELECT 
  p.product_id,
  v.size,
  v.color,
  FLOOR(RAND() * 100), -- Tồn kho ngẫu nhiên từ 0 đến 99
  CONCAT(p.sku, '-', v.size, '-', v.color, '-', LPAD(@row_number := @row_number + 1, 4, '0')), -- SKU duy nhất cho mỗi biến thể
  FLOOR(RAND() * 5000) -- Giá cộng thêm ngẫu nhiên từ 0 đến 4999
FROM products p
JOIN (
  SELECT 'M' AS size, 'Trắng' AS color UNION ALL
  SELECT 'L', 'Đen' UNION ALL
  SELECT 'XL', 'Đỏ' UNION ALL
  SELECT 'M', 'Xanh' UNION ALL
  SELECT 'L', 'Trắng' UNION ALL
  SELECT 'XL', 'Đen'
) v ON 1=1
ORDER BY p.product_id;


select * from products
join product_images on products.product_id = product_images.product_id
where products.product_id = 2;





