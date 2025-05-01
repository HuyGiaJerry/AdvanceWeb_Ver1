// Sample data for orders management
const dataOrders = [
    {
      "orderId": 1,
      "userId": 5,
      "customerName": "Emily Johnson",
      "customerEmail": "emily.johnson@example.com",
      "customerPhone": "+1-555-123-4567",
      "totalAmount": 586.75,
      "status": "delivered",
      "shippingAddress": "123 Pine Street, Apt 4B, San Francisco, CA 94103",
      "createdAt": "2025-04-10T08:25:17",
      "updatedAt": "2025-04-15T14:32:09",
      "items": [
        {
          "orderItemId": 1,
          "variantId": 3,
          "productName": "Product 1",
          "colorName": "Blue",
          "size": "L",
          "quantity": 2,
          "unitPrice": 203.18,
          "totalPrice": 406.36,
          "variantSku": "PROD001-BLUE-L"
        },
        {
          "orderItemId": 2,
          "variantId": 15,
          "productName": "Product 2",
          "colorName": "Red",
          "size": "M",
          "quantity": 1,
          "unitPrice": 180.39,
          "totalPrice": 180.39,
          "variantSku": "PROD002-RED-M"
        }
      ],
      "payment": {
        "paymentId": 1,
        "paymentMethod": "credit_card",
        "amount": 586.75,
        "status": "completed",
        "transactionId": "txn_12345abcde",
        "createdAt": "2025-04-10T08:27:45"
      }
    },
    {
      "orderId": 2,
      "userId": 8,
      "customerName": "Michael Rodriguez",
      "customerEmail": "m.rodriguez@example.com",
      "customerPhone": "+1-555-987-6543",
      "totalAmount": 412.87,
      "status": "shipped",
      "shippingAddress": "456 Oak Avenue, Seattle, WA 98101",
      "createdAt": "2025-04-12T15:48:32",
      "updatedAt": "2025-04-14T09:15:00",
      "items": [
        {
          "orderItemId": 3,
          "variantId": 7,
          "productName": "Product 1",
          "colorName": "Black",
          "size": "L",
          "quantity": 1,
          "unitPrice": 203.18,
          "totalPrice": 203.18,
          "variantSku": "PROD001-BLACK-L"
        },
        {
          "orderItemId": 4,
          "variantId": 22,
          "productName": "Product 3",
          "colorName": "White",
          "size": "S",
          "quantity": 1,
          "unitPrice": 145.50,
          "totalPrice": 145.50,
          "variantSku": "PROD003-WHITE-S"
        },
        {
          "orderItemId": 5,
          "variantId": 32,
          "productName": "Product 5",
          "colorName": "Gray",
          "size": "M",
          "quantity": 1,
          "unitPrice": 64.19,
          "totalPrice": 64.19,
          "variantSku": "PROD005-GRAY-M"
        }
      ],
      "payment": {
        "paymentId": 2,
        "paymentMethod": "paypal",
        "amount": 412.87,
        "status": "completed",
        "transactionId": "paypal_67890fghij",
        "createdAt": "2025-04-12T15:50:12"
      }
    },
    {
      "orderId": 3,
      "userId": 12,
      "customerName": "Sarah Martinez",
      "customerEmail": "smartinez@example.com",
      "customerPhone": "+1-555-234-5678",
      "totalAmount": 750.30,
      "status": "confirmed",
      "shippingAddress": "789 Maple Road, Chicago, IL 60601",
      "createdAt": "2025-04-18T12:10:45",
      "updatedAt": "2025-04-18T14:22:37",
      "items": [
        {
          "orderItemId": 6,
          "variantId": 40,
          "productName": "Product 7",
          "colorName": "Navy",
          "size": "XL",
          "quantity": 1,
          "unitPrice": 320.80,
          "totalPrice": 320.80,
          "variantSku": "PROD007-NAVY-XL"
        },
        {
          "orderItemId": 7,
          "variantId": 25,
          "productName": "Product 4",
          "colorName": "Brown",
          "size": "L",
          "quantity": 2,
          "unitPrice": 214.75,
          "totalPrice": 429.50,
          "variantSku": "PROD004-BROWN-L"
        }
      ],
      "payment": {
        "paymentId": 3,
        "paymentMethod": "credit_card",
        "amount": 750.30,
        "status": "completed",
        "transactionId": "txn_54321edcba",
        "createdAt": "2025-04-18T12:14:23"
      }
    },
    {
      "orderId": 4,
      "userId": 3,
      "customerName": "David Kim",
      "customerEmail": "dkim@example.com",
      "customerPhone": "+1-555-876-5432",
      "totalAmount": 283.99,
      "status": "pending",
      "shippingAddress": "321 Elm Street, Boston, MA 02110",
      "createdAt": "2025-04-24T09:37:18",
      "updatedAt": "2025-04-24T09:37:18",
      "items": [
        {
          "orderItemId": 8,
          "variantId": 12,
          "productName": "Product 1",
          "colorName": "Green",
          "size": "XL",
          "quantity": 1,
          "unitPrice": 203.18,
          "totalPrice": 203.18,
          "variantSku": "PROD001-GREEN-XL"
        },
        {
          "orderItemId": 9,
          "variantId": 37,
          "productName": "Product 6",
          "colorName": "Purple",
          "size": "S",
          "quantity": 1,
          "unitPrice": 80.81,
          "totalPrice": 80.81,
          "variantSku": "PROD006-PURPLE-S"
        }
      ],
      "payment": {
        "paymentId": 4,
        "paymentMethod": "bank_transfer",
        "amount": 283.99,
        "status": "pending",
        "transactionId": null,
        "createdAt": "2025-04-24T09:38:42"
      }
    },
    {
      "orderId": 5,
      "userId": 19,
      "customerName": "Amanda Williams",
      "customerEmail": "awilliams@example.com",
      "customerPhone": "+1-555-345-6789",
      "totalAmount": 1205.64,
      "status": "cancelled",
      "shippingAddress": "567 Cedar Lane, Austin, TX 78701",
      "createdAt": "2025-04-05T16:28:54",
      "updatedAt": "2025-04-07T08:12:30",
      "items": [
        {
          "orderItemId": 10,
          "variantId": 42,
          "productName": "Product 8",
          "colorName": "Beige",
          "size": "M",
          "quantity": 1,
          "unitPrice": 455.25,
          "totalPrice": 455.25,
          "variantSku": "PROD008-BEIGE-M"
        },
        {
          "orderItemId": 11,
          "variantId": 18,
          "productName": "Product 2",
          "colorName": "Yellow",
          "size": "XL",
          "quantity": 1,
          "unitPrice": 180.39,
          "totalPrice": 180.39,
          "variantSku": "PROD002-YELLOW-XL"
        },
        {
          "orderItemId": 12,
          "variantId": 30,
          "productName": "Product 5",
          "colorName": "Pink",
          "size": "S",
          "quantity": 3,
          "unitPrice": 190.00,
          "totalPrice": 570.00,
          "variantSku": "PROD005-PINK-S"
        }
      ],
      "payment": {
        "paymentId": 5,
        "paymentMethod": "credit_card",
        "amount": 1205.64,
        "status": "failed",
        "transactionId": "txn_09876zyxwv",
        "createdAt": "2025-04-05T16:30:12"
      }
    },
    {
      "orderId": 6,
      "userId": 25,
      "customerName": "Thomas Lee",
      "customerEmail": "tlee@example.com",
      "customerPhone": "+1-555-789-0123",
      "totalAmount": 495.27,
      "status": "delivered",
      "shippingAddress": "890 Pine Avenue, Portland, OR 97201",
      "createdAt": "2025-04-08T11:12:36",
      "updatedAt": "2025-04-12T16:45:20",
      "items": [
        {
          "orderItemId": 13,
          "variantId": 28,
          "productName": "Product 4",
          "colorName": "Orange",
          "size": "L",
          "quantity": 1,
          "unitPrice": 214.75,
          "totalPrice": 214.75,
          "variantSku": "PROD004-ORANGE-L"
        },
        {
          "orderItemId": 14,
          "variantId": 45,
          "productName": "Product 9",
          "colorName": "Teal",
          "size": "M",
          "quantity": 2,
          "unitPrice": 140.26,
          "totalPrice": 280.52,
          "variantSku": "PROD009-TEAL-M"
        }
      ],
      "payment": {
        "paymentId": 6,
        "paymentMethod": "paypal",
        "amount": 495.27,
        "status": "completed",
        "transactionId": "paypal_12345mnopq",
        "createdAt": "2025-04-08T11:15:48"
      }
    },
    {
      "orderId": 7,
      "userId": 14,
      "customerName": "Jennifer Smith",
      "customerEmail": "j.smith@example.com",
      "customerPhone": "+1-555-456-7890",
      "totalAmount": 860.79,
      "status": "shipped",
      "shippingAddress": "432 Oak Street, Denver, CO 80202",
      "createdAt": "2025-04-20T14:39:25",
      "updatedAt": "2025-04-22T10:18:42",
      "items": [
        {
          "orderItemId": 15,
          "variantId": 50,
          "productName": "Product 10",
          "colorName": "Burgundy",
          "size": "XL",
          "quantity": 1,
          "unitPrice": 380.45,
          "totalPrice": 380.45,
          "variantSku": "PROD010-BURGUNDY-XL"
        },
        {
          "orderItemId": 16,
          "variantId": 10,
          "productName": "Product 1",
          "colorName": "Green",
          "size": "M",
          "quantity": 1,
          "unitPrice": 203.18,
          "totalPrice": 203.18,
          "variantSku": "PROD001-GREEN-M"
        },
        {
          "orderItemId": 17,
          "variantId": 35,
          "productName": "Product 6",
          "colorName": "Charcoal",
          "size": "L",
          "quantity": 1,
          "unitPrice": 277.16,
          "totalPrice": 277.16,
          "variantSku": "PROD006-CHARCOAL-L"
        }
      ],
      "payment": {
        "paymentId": 7,
        "paymentMethod": "apple_pay",
        "amount": 860.79,
        "status": "completed",
        "transactionId": "apple_67890rstuv",
        "createdAt": "2025-04-20T14:42:37"
      }
    },
    {
      "orderId": 8,
      "userId": 30,
      "customerName": "Robert Davis",
      "customerEmail": "rdavis@example.com",
      "customerPhone": "+1-555-567-8901",
      "totalAmount": 324.57,
      "status": "confirmed",
      "shippingAddress": "765 Maple Boulevard, Atlanta, GA 30303",
      "createdAt": "2025-04-23T16:54:12",
      "updatedAt": "2025-04-24T08:32:45",
      "items": [
        {
          "orderItemId": 18,
          "variantId": 23,
          "productName": "Product 3",
          "colorName": "White",
          "size": "M",
          "quantity": 1,
          "unitPrice": 145.50,
          "totalPrice": 145.50,
          "variantSku": "PROD003-WHITE-M"
        },
        {
          "orderItemId": 19,
          "variantId": 48,
          "productName": "Product 9",
          "colorName": "Olive",
          "size": "XL",
          "quantity": 1,
          "unitPrice": 179.07,
          "totalPrice": 179.07,
          "variantSku": "PROD009-OLIVE-XL"
        }
      ],
      "payment": {
        "paymentId": 8,
        "paymentMethod": "credit_card",
        "amount": 324.57,
        "status": "completed",
        "transactionId": "txn_45678wxyz1",
        "createdAt": "2025-04-23T16:56:39"
      }
    },
    {
      "orderId": 9,
      "userId": 22,
      "customerName": "Lisa Thompson",
      "customerEmail": "lisa.t@example.com",
      "customerPhone": "+1-555-678-9012",
      "totalAmount": 577.12,
      "status": "pending",
      "shippingAddress": "543 Elm Avenue, Miami, FL 33130",
      "createdAt": "2025-04-25T10:21:37",
      "updatedAt": "2025-04-25T10:21:37",
      "items": [
        {
          "orderItemId": 20,
          "variantId": 55,
          "productName": "Product 11",
          "colorName": "Indigo",
          "size": "M",
          "quantity": 1,
          "unitPrice": 248.95,
          "totalPrice": 248.95,
          "variantSku": "PROD011-INDIGO-M"
        },
        {
          "orderItemId": 21,
          "variantId": 6,
          "productName": "Product 1",
          "colorName": "Black",
          "size": "M",
          "quantity": 1,
          "unitPrice": 203.18,
          "totalPrice": 203.18,
          "variantSku": "PROD001-BLACK-M"
        },
        {
          "orderItemId": 22,
          "variantId": 33,
          "productName": "Product 5",
          "colorName": "Gray",
          "size": "L",
          "quantity": 1,
          "unitPrice": 124.99,
          "totalPrice": 124.99,
          "variantSku": "PROD005-GRAY-L"
        }
      ],
      "payment": {
        "paymentId": 9,
        "paymentMethod": "google_pay",
        "amount": 577.12,
        "status": "pending",
        "transactionId": "google_23456abcde",
        "createdAt": "2025-04-25T10:24:18"
      }
    },
    {
      "orderId": 10,
      "userId": 16,
      "customerName": "Daniel Brown",
      "customerEmail": "dbrown@example.com",
      "customerPhone": "+1-555-789-0123",
      "totalAmount": 1104.32,
      "status": "delivered",
      "shippingAddress": "321 Oak Street, Philadelphia, PA 19103",
      "createdAt": "2025-04-02T09:17:45",
      "updatedAt": "2025-04-06T15:40:12",
      "items": [
        {
          "orderItemId": 23,
          "variantId": 60,
          "productName": "Product 12",
          "colorName": "Khaki",
          "size": "L",
          "quantity": 1,
          "unitPrice": 534.99,
          "totalPrice": 534.99,
          "variantSku": "PROD012-KHAKI-L"
        },
        {
          "orderItemId": 24,
          "variantId": 42,
          "productName": "Product 8",
          "colorName": "Beige",
          "size": "M",
          "quantity": 1,
          "unitPrice": 455.25,
          "totalPrice": 455.25,
          "variantSku": "PROD008-BEIGE-M"
        },
        {
          "orderItemId": 25,
          "variantId": 37,
          "productName": "Product 6",
          "colorName": "Purple",
          "size": "S",
          "quantity": 1,
          "unitPrice": 80.81,
          "totalPrice": 80.81,
          "variantSku": "PROD006-PURPLE-S"
        },
        {
          "orderItemId": 26,
          "variantId": 1,
          "productName": "Product 1",
          "colorName": "Blue",
          "size": "S",
          "quantity": 1,
          "unitPrice": 33.27,
          "totalPrice": 33.27,
          "variantSku": "PROD001-BLUE-S"
        }
      ],
      "payment": {
        "paymentId": 10,
        "paymentMethod": "credit_card",
        "amount": 1104.32,
        "status": "completed",
        "transactionId": "txn_98765fghij",
        "createdAt": "2025-04-02T09:20:37"
      }
    }
  ];
  
  export default dataOrders;