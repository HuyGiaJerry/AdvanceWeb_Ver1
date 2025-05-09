// Sample data for customer management
export const dataCustomers = [
  {
    "userId": 3,
    "email": "dkim@example.com",
    "phoneNumber": "+1-555-876-5432",
    "fullName": "David Kim",
    "avatarUrl": "avatar3.jpg",
    "role": "customer",
    "isActive": 1,
    "createdAt": "2025-01-15T14:25:18",
    "updatedAt": "2025-04-10T09:12:36",
    "oauthProvider": null,
    "oauthId": null,
    "twoFactorEnabled": 0,
    "orderHistory": [
      {
        "orderId": 4,
        "totalAmount": 283.99,
        "createdAt": "2025-04-24T09:37:18",
        "status": "pending",
        "itemCount": 2
      }
    ],
    "loyaltyPoints": 120,
    "totalSpent": 1845.75,
    "lastLogin": "2025-04-24T09:30:42"
  },
  {
    "userId": 5,
    "email": "emily.johnson@example.com",
    "phoneNumber": "+1-555-123-4567",
    "fullName": "Emily Johnson",
    "avatarUrl": "avatar5.jpg",
    "role": "customer",
    "isActive": 1,
    "createdAt": "2025-01-12T10:45:30",
    "updatedAt": "2025-04-15T14:32:09",
    "oauthProvider": "google",
    "oauthId": "g_12345678",
    "twoFactorEnabled": 1,
    "orderHistory": [
      {
        "orderId": 1,
        "totalAmount": 586.75,
        "createdAt": "2025-04-10T08:25:17",
        "status": "delivered",
        "itemCount": 2
      }
    ],
    "loyaltyPoints": 235,
    "totalSpent": 2150.99,
    "lastLogin": "2025-04-25T11:22:18"
  },
  {
    "userId": 8,
    "email": "m.rodriguez@example.com",
    "phoneNumber": "+1-555-987-6543",
    "fullName": "Michael Rodriguez",
    "avatarUrl": "avatar8.jpg",
    "role": "customer",
    "isActive": 0,
    "createdAt": "2025-01-18T16:30:45",
    "updatedAt": "2025-04-14T09:15:00",
    "oauthProvider": null,
    "oauthId": null,
    "twoFactorEnabled": 0,
    "orderHistory": [
      {
        "orderId": 2,
        "totalAmount": 412.87,
        "createdAt": "2025-04-12T15:48:32",
        "status": "shipped",
        "itemCount": 3
      }
    ],
    "loyaltyPoints": 180,
    "totalSpent": 1432.50,
    "lastLogin": "2025-04-22T18:35:09"
  },
  {
    "userId": 12,
    "email": "smartinez@example.com",
    "phoneNumber": "+1-555-234-5678",
    "fullName": "Sarah Martinez",
    "avatarUrl": "avatar12.jpg",
    "role": "customer",
    "isActive": 1,
    "createdAt": "2025-01-25T08:55:12",
    "updatedAt": "2025-04-18T14:22:37",
    "oauthProvider": "facebook",
    "oauthId": "fb_23456789",
    "twoFactorEnabled": 0,
    "orderHistory": [
      {
        "orderId": 3,
        "totalAmount": 750.30,
        "createdAt": "2025-04-18T12:10:45",
        "status": "confirmed",
        "itemCount": 2
      }
    ],
    "loyaltyPoints": 315,
    "totalSpent": 3120.42,
    "lastLogin": "2025-04-24T15:18:22"
  }
];