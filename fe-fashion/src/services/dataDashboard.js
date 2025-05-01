// Sample data for dashboard overview
const dataDashboard = {
    // Thông tin tổng quan
    "summary": {
      "totalRevenue": 45780.65,
      "totalOrders": 128,
      "pendingOrders": 10,
      "totalProducts": 150,
      "lowStockProducts": 8,
      "totalCustomers": 85,
      "newCustomers": 12
    },
    
    // Doanh số 7 ngày gần đây
    "recentSales": [
      { "date": "24/04", "revenue": 3286.45 },
      { "date": "25/04", "revenue": 4105.78 },
      { "date": "26/04", "revenue": 3580.20 },
      { "date": "27/04", "revenue": 2985.65 },
      { "date": "28/04", "revenue": 3845.90 },
      { "date": "29/04", "revenue": 4210.35 },
      { "date": "30/04", "revenue": 2540.80 }
    ],
    
    // Danh sách đơn hàng mới nhất
    "recentOrders": [
      {
        "orderId": 9,
        "customerName": "Lisa Thompson",
        "date": "2025-04-25T10:21:37",
        "totalAmount": 577.12,
        "status": "pending"
      },
      {
        "orderId": 8,
        "customerName": "Robert Davis",
        "date": "2025-04-23T16:54:12",
        "totalAmount": 324.57,
        "status": "confirmed"
      },
      {
        "orderId": 7, 
        "customerName": "Jennifer Smith",
        "date": "2025-04-20T14:39:25",
        "totalAmount": 860.79,
        "status": "shipped"
      },
      {
        "orderId": 4,
        "customerName": "David Kim",
        "date": "2025-04-24T09:37:18",
        "totalAmount": 283.99,
        "status": "pending"
      },
      {
        "orderId": 3,
        "customerName": "Sarah Martinez",
        "date": "2025-04-18T12:10:45",
        "totalAmount": 750.30,
        "status": "confirmed"
      }
    ],
    
    // Sản phẩm bán chạy
    "bestSellingProducts": [
      { "name": "Product 1", "unitsSold": 85, "revenue": 17270.30 },
      { "name": "Product 8", "unitsSold": 52, "revenue": 23673.00 },
      { "name": "Product 4", "unitsSold": 47, "revenue": 10093.25 },
      { "name": "Product 2", "unitsSold": 45, "revenue": 8117.55 },
      { "name": "Product 6", "unitsSold": 38, "revenue": 7261.08 }
    ],
    
    // Sản phẩm sắp hết hàng
    "lowStockAlert": [
      { "variantId": 6, "name": "Product 1", "color": "Black", "size": "M", "stock": 0 },
      { "variantId": 25, "name": "Product 4", "color": "Brown", "size": "L", "stock": 0 },
      { "variantId": 32, "name": "Product 5", "color": "Gray", "size": "M", "stock": 3 },
      { "variantId": 15, "name": "Product 2", "color": "Red", "size": "M", "stock": 5 },
      { "variantId": 22, "name": "Product 3", "color": "White", "size": "S", "stock": 8 }
    ]
  };
  
  export default dataDashboard;