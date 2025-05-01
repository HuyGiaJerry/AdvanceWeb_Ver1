// Sample data for categories management
const dataCategories = [
    {
      "categoryId": 1,
      "name": "Men's Clothing",
      "parentId": null,
      "createdAt": "2025-03-15T10:30:00",
      "subCategories": [
        {
          "categoryId": 3,
          "name": "Men's T-Shirts",
          "parentId": 1,
          "createdAt": "2025-03-15T11:45:00",
          "productCount": 24
        },
        {
          "categoryId": 4,
          "name": "Men's Pants",
          "parentId": 1,
          "createdAt": "2025-03-15T12:15:00",
          "productCount": 18
        },
        {
          "categoryId": 5,
          "name": "Men's Jackets",
          "parentId": 1,
          "createdAt": "2025-03-15T13:30:00",
          "productCount": 12
        }
      ],
      "productCount": 54
    },
    {
      "categoryId": 2,
      "name": "Women's Clothing",
      "parentId": null,
      "createdAt": "2025-03-15T10:45:00",
      "subCategories": [
        {
          "categoryId": 6,
          "name": "Women's Dresses",
          "parentId": 2,
          "createdAt": "2025-03-15T14:30:00",
          "productCount": 36
        },
        {
          "categoryId": 7,
          "name": "Women's Tops",
          "parentId": 2,
          "createdAt": "2025-03-15T15:15:00",
          "productCount": 28
        },
        {
          "categoryId": 8,
          "name": "Women's Skirts",
          "parentId": 2,
          "createdAt": "2025-03-15T16:00:00",
          "productCount": 15
        }
      ],
      "productCount": 79
    },
    {
      "categoryId": 9,
      "name": "Accessories",
      "parentId": null,
      "createdAt": "2025-03-16T09:30:00",
      "subCategories": [
        {
          "categoryId": 10,
          "name": "Bags",
          "parentId": 9,
          "createdAt": "2025-03-16T10:15:00",
          "productCount": 22
        },
        {
          "categoryId": 11,
          "name": "Hats",
          "parentId": 9,
          "createdAt": "2025-03-16T11:00:00",
          "productCount": 14
        },
        {
          "categoryId": 12,
          "name": "Jewelry",
          "parentId": 9,
          "createdAt": "2025-03-16T11:45:00",
          "productCount": 31
        }
      ],
      "productCount": 67
    },
    {
      "categoryId": 13,
      "name": "Shoes",
      "parentId": null,
      "createdAt": "2025-03-17T09:00:00",
      "subCategories": [
        {
          "categoryId": 14,
          "name": "Men's Shoes",
          "parentId": 13,
          "createdAt": "2025-03-17T09:45:00",
          "productCount": 18
        },
        {
          "categoryId": 15,
          "name": "Women's Shoes",
          "parentId": 13,
          "createdAt": "2025-03-17T10:30:00",
          "productCount": 24
        },
        {
          "categoryId": 16,
          "name": "Children's Shoes",
          "parentId": 13,
          "createdAt": "2025-03-17T11:15:00",
          "productCount": 10
        }
      ],
      "productCount": 52
    },
    {
      "categoryId": 17,
      "name": "Seasonal",
      "parentId": null,
      "createdAt": "2025-03-18T09:00:00",
      "subCategories": [
        {
          "categoryId": 18,
          "name": "Summer Collection",
          "parentId": 17,
          "createdAt": "2025-03-18T09:45:00",
          "productCount": 42
        },
        {
          "categoryId": 19,
          "name": "Winter Collection",
          "parentId": 17,
          "createdAt": "2025-03-18T10:30:00",
          "productCount": 36
        }
      ],
      "productCount": 78
    }
  ];
  
  export default dataCategories;