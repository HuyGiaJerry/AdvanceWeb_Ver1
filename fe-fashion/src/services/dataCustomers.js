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
  },

  {
    userId: 25,
    email: "james.doe@example.com",
    phoneNumber: "+1-555-111-2222",
    fullName: "James Doe",
    avatarUrl: "avatar25.jpg",
    role: "customer",
    isActive: 1,
    createdAt: "2025-03-01T10:30:45",
    updatedAt: "2025-04-22T11:15:00",
    oauthProvider: null,
    oauthId: null,
    twoFactorEnabled: 0,
    orderHistory: [
      {
        orderId: 8,
        totalAmount: 520.00,
        createdAt: "2025-04-21T13:40:20",
        status: "delivered",
        itemCount: 2
      }
    ],
    loyaltyPoints: 210,
    totalSpent: 2200.75,
    lastLogin: "2025-04-25T09:50:12"
  },
  {
    userId: 27,
    email: "anna.smith@example.com",
    phoneNumber: "+1-555-333-4444",
    fullName: "Anna Smith",
    avatarUrl: "avatar27.jpg",
    role: "customer",
    isActive: 1,
    createdAt: "2025-03-12T08:45:22",
    updatedAt: "2025-04-23T16:40:30",
    oauthProvider: "google",
    oauthId: "g_98765432",
    twoFactorEnabled: 1,
    orderHistory: [
      {
        orderId: 9,
        totalAmount: 690.99,
        createdAt: "2025-04-22T10:12:33",
        status: "shipped",
        itemCount: 3
      }
    ],
    loyaltyPoints: 280,
    totalSpent: 2850.60,
    lastLogin: "2025-04-26T14:10:55"
  },
  {
    userId: 30,
    email: "chris.evans@example.com",
    phoneNumber: "+1-555-555-6666",
    fullName: "Chris Evans",
    avatarUrl: "avatar30.jpg",
    role: "customer",
    isActive: 0,
    createdAt: "2025-03-20T14:10:10",
    updatedAt: "2025-04-24T12:35:42",
    oauthProvider: null,
    oauthId: null,
    twoFactorEnabled: 0,
    orderHistory: [
      {
        orderId: 10,
        totalAmount: 850.00,
        createdAt: "2025-04-23T11:50:50",
        status: "confirmed",
        itemCount: 4
      }
    ],
    loyaltyPoints: 330,
    totalSpent: 3750.90,
    lastLogin: "2025-04-20T17:30:25"
  },
  {
    userId: 33,
    email: "kate.wilson@example.com",
    phoneNumber: "+1-555-777-8888",
    fullName: "Kate Wilson",
    avatarUrl: "avatar33.jpg",
    role: "customer",
    isActive: 1,
    createdAt: "2025-04-01T09:15:30",
    updatedAt: "2025-04-25T14:50:18",
    oauthProvider: "facebook",
    oauthId: "fb_76543210",
    twoFactorEnabled: 1,
    orderHistory: [
      {
        orderId: 11,
        totalAmount: 450.45,
        createdAt: "2025-04-24T08:30:40",
        status: "pending",
        itemCount: 2
      }
    ],
    loyaltyPoints: 190,
    totalSpent: 2050.75,
    lastLogin: "2025-04-26T10:20:05"
  },
  {
    userId: 35,
    email: "mark.lee@example.com",
    phoneNumber: "+1-555-999-0000",
    fullName: "Mark Lee",
    avatarUrl: "avatar35.jpg",
    role: "customer",
    isActive: 0,
    createdAt: "2025-04-05T15:20:10",
    updatedAt: "2025-04-26T11:35:30",
    oauthProvider: null,
    oauthId: null,
    twoFactorEnabled: 0,
    orderHistory: [
      {
        orderId: 12,
        totalAmount: 975.99,
        createdAt: "2025-04-25T14:20:10",
        status: "shipped",
        itemCount: 5
      }
    ],
    loyaltyPoints: 350,
    totalSpent: 4125.60,
    lastLogin: "2025-04-23T18:40:55"
  }

];