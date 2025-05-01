// Sample data for statistics and reports
const dataStatistics = {
    // Tổng quan doanh số
    "overview": {
      "totalRevenue": 45780.65,
      "ordersCount": 128,
      "averageOrderValue": 357.66,
      "customerCount": 85
    },
    
    // Doanh số theo ngày (7 ngày gần nhất)
    "dailySales": [
      { "date": "2025-04-24", "revenue": 3286.45, "orders": 12 },
      { "date": "2025-04-25", "revenue": 4105.78, "orders": 15 },
      { "date": "2025-04-26", "revenue": 3580.20, "orders": 13 },
      { "date": "2025-04-27", "revenue": 2985.65, "orders": 10 },
      { "date": "2025-04-28", "revenue": 3845.90, "orders": 14 },
      { "date": "2025-04-29", "revenue": 4210.35, "orders": 16 },
      { "date": "2025-04-30", "revenue": 2540.80, "orders": 9 }
    ],
    
    // Doanh số theo tháng
    "monthlySales": [
      { "month": "2025-01", "revenue": 32450.75 },
      { "month": "2025-02", "revenue": 38750.40 },
      { "month": "2025-03", "revenue": 42180.90 },
      { "month": "2025-04", "revenue": 45780.65 }
    ],
    
    // Top 5 sản phẩm bán chạy
    "topProducts": [
      { "productId": 1, "name": "Product 1", "unitsSold": 85, "revenue": 17270.30 },
      { "productId": 8, "name": "Product 8", "unitsSold": 52, "revenue": 23673.00 },
      { "productId": 4, "name": "Product 4", "unitsSold": 47, "revenue": 10093.25 },
      { "productId": 2, "name": "Product 2", "unitsSold": 45, "revenue": 8117.55 },
      { "productId": 6, "name": "Product 6", "unitsSold": 38, "revenue": 7261.08 }
    ],
    
    // Doanh số theo danh mục
    "categoryPerformance": [
      { "categoryId": 3, "name": "Men's T-Shirts", "unitsSold": 124, "revenue": 18750.40 },
      { "categoryId": 6, "name": "Women's Dresses", "unitsSold": 98, "revenue": 22450.30 },
      { "categoryId": 10, "name": "Bags", "unitsSold": 42, "revenue": 12840.50 },
      { "categoryId": 7, "name": "Women's Tops", "unitsSold": 78, "revenue": 15680.20 },
      { "categoryId": 5, "name": "Men's Jackets", "unitsSold": 36, "revenue": 16580.90 }
    ],
    
    // Phương thức thanh toán
    "paymentMethods": [
      { "method": "credit_card", "count": 78, "amount": 28450.90 },
      { "method": "paypal", "count": 25, "amount": 9850.45 },
      { "method": "bank_transfer", "count": 15, "amount": 4920.80 },
      { "method": "apple_pay", "count": 6, "amount": 1840.30 },
      { "method": "google_pay", "count": 4, "amount": 718.20 }
    ],
    
    // Trạng thái đơn hàng
    "orderStatus": [
      { "status": "delivered", "count": 82 },
      { "status": "shipped", "count": 15 },
      { "status": "confirmed", "count": 18 },
      { "status": "pending", "count": 10 },
      { "status": "cancelled", "count": 3 }
    ]
  };
  
  export default dataStatistics;