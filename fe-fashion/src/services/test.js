const dataProduct = [
    {
        "productId": 1,
        "name": "Product 1",
        "description": "Description for Product 1",
        "basePrice": 288,
        "discountPrice": 203.18,
        "sku": "PROD001",
        "categoryId": 3,
        "createdAt": "2025-04-24T19:38:13",
        "updatedAt": "2025-04-24T19:38:13",
        "colors": [
            {
                "colorId": 1,
                "colorName": "Blue",
                "colorSku": "PROD001-BLUE",
                "variants": [
                    { "variantId": 3, "size": "L", "stockQuantity": 37, "variantSku": "PROD001-BLUE-L" },
                    { "variantId": 2, "size": "M", "stockQuantity": 18, "variantSku": "PROD001-BLUE-M" },
                    { "variantId": 1, "size": "S", "stockQuantity": 43, "variantSku": "PROD001-BLUE-S" },
                    { "variantId": 4, "size": "XL", "stockQuantity": 67, "variantSku": "PROD001-BLUE-XL" }
                ],
                "images": [
                    { "imageId": 1, "imageUrl": "shop1-color1.png", "isPrimary": true, "createdAt": "0001-01-01T00:00:00" },
                    { "imageId": 2, "imageUrl": "002.jpg", "isPrimary": false, "createdAt": "0001-01-01T00:00:00" },
                    { "imageId": 3, "imageUrl": "003.jpg", "isPrimary": false, "createdAt": "0001-01-01T00:00:00" },
                    { "imageId": 4, "imageUrl": "004.jpg", "isPrimary": false, "createdAt": "0001-01-01T00:00:00" }
                ]
            },
            {
                "colorId": 2,
                "colorName": "Black",
                "colorSku": "PROD001-BLACK",
                "variants": [
                    { "variantId": 7, "size": "L", "stockQuantity": 58, "variantSku": "PROD001-BLACK-L" },
                    { "variantId": 6, "size": "M", "stockQuantity": 0, "variantSku": "PROD001-BLACK-M" },
                    { "variantId": 5, "size": "S", "stockQuantity": 24, "variantSku": "PROD001-BLACK-S" },
                    { "variantId": 8, "size": "XL", "stockQuantity": 64, "variantSku": "PROD001-BLACK-XL" }
                ],
                "images": [
                    { "imageId": 5, "imageUrl": "005.jpg", "isPrimary": true, "createdAt": "0001-01-01T00:00:00" },
                    { "imageId": 6, "imageUrl": "006.jpg", "isPrimary": false, "createdAt": "0001-01-01T00:00:00" },
                    { "imageId": 7, "imageUrl": "007.jpg", "isPrimary": false, "createdAt": "0001-01-01T00:00:00" }
                ]
            },
            {
                "colorId": 3,
                "colorName": "Green",
                "colorSku": "PROD001-GREEN",
                "variants": [
                    { "variantId": 11, "size": "L", "stockQuantity": 66, "variantSku": "PROD001-GREEN-L" },
                    { "variantId": 10, "size": "M", "stockQuantity": 46, "variantSku": "PROD001-GREEN-M" },
                    { "variantId": 9, "size": "S", "stockQuantity": 78, "variantSku": "PROD001-GREEN-S" },
                    { "variantId": 12, "size": "XL", "stockQuantity": 80, "variantSku": "PROD001-GREEN-XL" }
                ],
                "images": [
                    { "imageId": 8, "imageUrl": "008.jpg", "isPrimary": true, "createdAt": "0001-01-01T00:00:00" },
                    { "imageId": 9, "imageUrl": "009.jpg", "isPrimary": false, "createdAt": "0001-01-01T00:00:00" },
                    { "imageId": 10, "imageUrl": "010.jpg", "isPrimary": false, "createdAt": "0001-01-01T00:00:00" },
                    { "imageId": 11, "imageUrl": "011.jpg", "isPrimary": false, "createdAt": "0001-01-01T00:00:00" }
                ]
            }
        ]
    },

    {
        "productId": 2,
        "name": "Product 2",
        "description": "Description for Product 2",
        "basePrice": 286.99,
        "discountPrice": 221.06,
        "sku": "PROD002",
        "categoryId": 4,
        "createdAt": "2025-04-24T19:38:13",
        "updatedAt": "2025-04-24T19:38:13",
        "colors": [
            {
                "colorId": 4,
                "colorName": "Black",
                "colorSku": "PROD002-BLACK",
                "variants": [
                    {
                        "variantId": 15,
                        "size": "L",
                        "stockQuantity": 7,
                        "variantSku": "PROD002-BLACK-L"
                    },
                    {
                        "variantId": 14,
                        "size": "M",
                        "stockQuantity": 27,
                        "variantSku": "PROD002-BLACK-M"
                    },
                    {
                        "variantId": 13,
                        "size": "S",
                        "stockQuantity": 63,
                        "variantSku": "PROD002-BLACK-S"
                    },
                    {
                        "variantId": 16,
                        "size": "XL",
                        "stockQuantity": 48,
                        "variantSku": "PROD002-BLACK-XL"
                    }
                ],
                "images": [
                    {
                        "imageId": 12,
                        "imageUrl": "shop2-color1.png",
                        "isPrimary": true,
                        "createdAt": "0001-01-01T00:00:00"
                    },
                    {
                        "imageId": 13,
                        "imageUrl": "013.jpg",
                        "isPrimary": false,
                        "createdAt": "0001-01-01T00:00:00"
                    }
                ]
            },
            {
                "colorId": 5,
                "colorName": "Green",
                "colorSku": "PROD002-GREEN",
                "variants": [
                    {
                        "variantId": 19,
                        "size": "L",
                        "stockQuantity": 8,
                        "variantSku": "PROD002-GREEN-L"
                    },
                    {
                        "variantId": 18,
                        "size": "M",
                        "stockQuantity": 54,
                        "variantSku": "PROD002-GREEN-M"
                    },
                    {
                        "variantId": 17,
                        "size": "S",
                        "stockQuantity": 20,
                        "variantSku": "PROD002-GREEN-S"
                    },
                    {
                        "variantId": 20,
                        "size": "XL",
                        "stockQuantity": 44,
                        "variantSku": "PROD002-GREEN-XL"
                    }
                ],
                "images": [
                    {
                        "imageId": 14,
                        "imageUrl": "014.jpg",
                        "isPrimary": true,
                        "createdAt": "0001-01-01T00:00:00"
                    },
                    {
                        "imageId": 15,
                        "imageUrl": "015.jpg",
                        "isPrimary": false,
                        "createdAt": "0001-01-01T00:00:00"
                    },
                    {
                        "imageId": 16,
                        "imageUrl": "016.jpg",
                        "isPrimary": false,
                        "createdAt": "0001-01-01T00:00:00"
                    },
                    {
                        "imageId": 17,
                        "imageUrl": "017.jpg",
                        "isPrimary": false,
                        "createdAt": "0001-01-01T00:00:00"
                    }
                ]
            },
            {
                "colorId": 6,
                "colorName": "Red",
                "colorSku": "PROD002-RED",
                "variants": [
                    {
                        "variantId": 23,
                        "size": "L",
                        "stockQuantity": 23,
                        "variantSku": "PROD002-RED-L"
                    },
                    {
                        "variantId": 22,
                        "size": "M",
                        "stockQuantity": 94,
                        "variantSku": "PROD002-RED-M"
                    },
                    {
                        "variantId": 21,
                        "size": "S",
                        "stockQuantity": 59,
                        "variantSku": "PROD002-RED-S"
                    },
                    {
                        "variantId": 24,
                        "size": "XL",
                        "stockQuantity": 91,
                        "variantSku": "PROD002-RED-XL"
                    }
                ],
                "images": [
                    {
                        "imageId": 18,
                        "imageUrl": "shop6-color1.png",
                        "isPrimary": true,
                        "createdAt": "0001-01-01T00:00:00"
                    },
                    {
                        "imageId": 19,
                        "imageUrl": "019.jpg",
                        "isPrimary": false,
                        "createdAt": "0001-01-01T00:00:00"
                    },
                    {
                        "imageId": 20,
                        "imageUrl": "020.jpg",
                        "isPrimary": false,
                        "createdAt": "0001-01-01T00:00:00"
                    }
                ]
            }
        ]
    },

    {
        "productId": 3,
        "name": "Product 3",
        "description": "Description for Product 3",
        "basePrice": 257.16,
        "discountPrice": 207.36,
        "sku": "PROD003",
        "categoryId": 5,
        "createdAt": "2025-04-24T19:38:13",
        "updatedAt": "2025-04-24T19:38:13",
        "colors": [
            {
                "colorId": 7,
                "colorName": "Black",
                "colorSku": "PROD003-BLACK",
                "variants": [
                    {
                        "variantId": 27,
                        "size": "L",
                        "stockQuantity": 35,
                        "variantSku": "PROD003-BLACK-L"
                    },
                    {
                        "variantId": 26,
                        "size": "M",
                        "stockQuantity": 48,
                        "variantSku": "PROD003-BLACK-M"
                    },
                    {
                        "variantId": 25,
                        "size": "S",
                        "stockQuantity": 22,
                        "variantSku": "PROD003-BLACK-S"
                    },
                    {
                        "variantId": 28,
                        "size": "XL",
                        "stockQuantity": 30,
                        "variantSku": "PROD003-BLACK-XL"
                    }
                ],
                "images": [
                    {
                        "imageId": 21,
                        "imageUrl": "shop3-color1.png",
                        "isPrimary": true,
                        "createdAt": "0001-01-01T00:00:00"
                    },
                    {
                        "imageId": 22,
                        "imageUrl": "022.jpg",
                        "isPrimary": false,
                        "createdAt": "0001-01-01T00:00:00"
                    },
                    {
                        "imageId": 23,
                        "imageUrl": "023.jpg",
                        "isPrimary": false,
                        "createdAt": "0001-01-01T00:00:00"
                    },
                    {
                        "imageId": 24,
                        "imageUrl": "024.jpg",
                        "isPrimary": false,
                        "createdAt": "0001-01-01T00:00:00"
                    }
                ]
            },
            {
                "colorId": 8,
                "colorName": "Green",
                "colorSku": "PROD003-GREEN",
                "variants": [
                    {
                        "variantId": 31,
                        "size": "L",
                        "stockQuantity": 76,
                        "variantSku": "PROD003-GREEN-L"
                    },
                    {
                        "variantId": 30,
                        "size": "M",
                        "stockQuantity": 22,
                        "variantSku": "PROD003-GREEN-M"
                    },
                    {
                        "variantId": 29,
                        "size": "S",
                        "stockQuantity": 52,
                        "variantSku": "PROD003-GREEN-S"
                    },
                    {
                        "variantId": 32,
                        "size": "XL",
                        "stockQuantity": 80,
                        "variantSku": "PROD003-GREEN-XL"
                    }
                ],
                "images": [
                    {
                        "imageId": 25,
                        "imageUrl": "025.jpg",
                        "isPrimary": true,
                        "createdAt": "0001-01-01T00:00:00"
                    },
                    {
                        "imageId": 26,
                        "imageUrl": "026.jpg",
                        "isPrimary": false,
                        "createdAt": "0001-01-01T00:00:00"
                    },
                    {
                        "imageId": 27,
                        "imageUrl": "027.jpg",
                        "isPrimary": false,
                        "createdAt": "0001-01-01T00:00:00"
                    },
                    {
                        "imageId": 28,
                        "imageUrl": "028.jpg",
                        "isPrimary": false,
                        "createdAt": "0001-01-01T00:00:00"
                    }
                ]
            },
            {
                "colorId": 9,
                "colorName": "Yellow",
                "colorSku": "PROD003-YELLOW",
                "variants": [
                    {
                        "variantId": 35,
                        "size": "L",
                        "stockQuantity": 58,
                        "variantSku": "PROD003-YELLOW-L"
                    },
                    {
                        "variantId": 34,
                        "size": "M",
                        "stockQuantity": 73,
                        "variantSku": "PROD003-YELLOW-M"
                    },
                    {
                        "variantId": 33,
                        "size": "S",
                        "stockQuantity": 50,
                        "variantSku": "PROD003-YELLOW-S"
                    },
                    {
                        "variantId": 36,
                        "size": "XL",
                        "stockQuantity": 69,
                        "variantSku": "PROD003-YELLOW-XL"
                    }
                ],
                "images": [
                    {
                        "imageId": 29,
                        "imageUrl": "029.jpg",
                        "isPrimary": true,
                        "createdAt": "0001-01-01T00:00:00"
                    },
                    {
                        "imageId": 30,
                        "imageUrl": "030.jpg",
                        "isPrimary": false,
                        "createdAt": "0001-01-01T00:00:00"
                    },
                    {
                        "imageId": 31,
                        "imageUrl": "031.jpg",
                        "isPrimary": false,
                        "createdAt": "0001-01-01T00:00:00"
                    }
                ]
            }
        ]
    },


    {
        "productId": 4,
        "name": "Product 4",
        "description": "Description for Product 4",
        "basePrice": 186.97,
        "discountPrice": 149.79,
        "sku": "PROD004",
        "categoryId": 1,
        "createdAt": "2025-04-24T19:38:13",
        "updatedAt": "2025-04-24T19:38:13",
        "colors": [
            {
                "colorId": 10,
                "colorName": "Yellow",
                "colorSku": "PROD004-YELLOW",
                "variants": [
                    {
                        "variantId": 39,
                        "size": "L",
                        "stockQuantity": 34,
                        "variantSku": "PROD004-YELLOW-L"
                    },
                    {
                        "variantId": 38,
                        "size": "M",
                        "stockQuantity": 6,
                        "variantSku": "PROD004-YELLOW-M"
                    },
                    {
                        "variantId": 37,
                        "size": "S",
                        "stockQuantity": 23,
                        "variantSku": "PROD004-YELLOW-S"
                    },
                    {
                        "variantId": 40,
                        "size": "XL",
                        "stockQuantity": 58,
                        "variantSku": "PROD004-YELLOW-XL"
                    }
                ],
                "images": [
                    {
                        "imageId": 32,
                        "imageUrl": "shop4-color1.png",
                        "isPrimary": true,
                        "createdAt": "0001-01-01T00:00:00"
                    },
                    {
                        "imageId": 33,
                        "imageUrl": "033.jpg",
                        "isPrimary": false,
                        "createdAt": "0001-01-01T00:00:00"
                    }
                ]
            },
            {
                "colorId": 11,
                "colorName": "Black",
                "colorSku": "PROD004-BLACK",
                "variants": [
                    {
                        "variantId": 43,
                        "size": "L",
                        "stockQuantity": 65,
                        "variantSku": "PROD004-BLACK-L"
                    },
                    {
                        "variantId": 42,
                        "size": "M",
                        "stockQuantity": 43,
                        "variantSku": "PROD004-BLACK-M"
                    },
                    {
                        "variantId": 41,
                        "size": "S",
                        "stockQuantity": 73,
                        "variantSku": "PROD004-BLACK-S"
                    },
                    {
                        "variantId": 44,
                        "size": "XL",
                        "stockQuantity": 35,
                        "variantSku": "PROD004-BLACK-XL"
                    }
                ],
                "images": [
                    {
                        "imageId": 34,
                        "imageUrl": "034.jpg",
                        "isPrimary": true,
                        "createdAt": "0001-01-01T00:00:00"
                    },
                    {
                        "imageId": 35,
                        "imageUrl": "035.jpg",
                        "isPrimary": false,
                        "createdAt": "0001-01-01T00:00:00"
                    },
                    {
                        "imageId": 36,
                        "imageUrl": "036.jpg",
                        "isPrimary": false,
                        "createdAt": "0001-01-01T00:00:00"
                    },
                    {
                        "imageId": 37,
                        "imageUrl": "037.jpg",
                        "isPrimary": false,
                        "createdAt": "0001-01-01T00:00:00"
                    }
                ]
            },
            {
                "colorId": 12,
                "colorName": "Red",
                "colorSku": "PROD004-RED",
                "variants": [
                    {
                        "variantId": 47,
                        "size": "L",
                        "stockQuantity": 48,
                        "variantSku": "PROD004-RED-L"
                    },
                    {
                        "variantId": 46,
                        "size": "M",
                        "stockQuantity": 44,
                        "variantSku": "PROD004-RED-M"
                    },
                    {
                        "variantId": 45,
                        "size": "S",
                        "stockQuantity": 89,
                        "variantSku": "PROD004-RED-S"
                    },
                    {
                        "variantId": 48,
                        "size": "XL",
                        "stockQuantity": 92,
                        "variantSku": "PROD004-RED-XL"
                    }
                ],
                "images": [
                    {
                        "imageId": 38,
                        "imageUrl": "038.jpg",
                        "isPrimary": true,
                        "createdAt": "0001-01-01T00:00:00"
                    },
                    {
                        "imageId": 39,
                        "imageUrl": "039.jpg",
                        "isPrimary": false,
                        "createdAt": "0001-01-01T00:00:00"
                    }
                ]
            },
            {
                "colorId": 13,
                "colorName": "Green",
                "colorSku": "PROD004-GREEN",
                "variants": [
                    {
                        "variantId": 51,
                        "size": "L",
                        "stockQuantity": 19,
                        "variantSku": "PROD004-GREEN-L"
                    },
                    {
                        "variantId": 50,
                        "size": "M",
                        "stockQuantity": 32,
                        "variantSku": "PROD004-GREEN-M"
                    },
                    {
                        "variantId": 49,
                        "size": "S",
                        "stockQuantity": 66,
                        "variantSku": "PROD004-GREEN-S"
                    },
                    {
                        "variantId": 52,
                        "size": "XL",
                        "stockQuantity": 12,
                        "variantSku": "PROD004-GREEN-XL"
                    }
                ],
                "images": [
                    {
                        "imageId": 40,
                        "imageUrl": "040.jpg",
                        "isPrimary": true,
                        "createdAt": "0001-01-01T00:00:00"
                    },
                    {
                        "imageId": 41,
                        "imageUrl": "041.jpg",
                        "isPrimary": false,
                        "createdAt": "0001-01-01T00:00:00"
                    },
                    {
                        "imageId": 42,
                        "imageUrl": "042.jpg",
                        "isPrimary": false,
                        "createdAt": "0001-01-01T00:00:00"
                    },
                    {
                        "imageId": 43,
                        "imageUrl": "043.jpg",
                        "isPrimary": false,
                        "createdAt": "0001-01-01T00:00:00"
                    }
                ]
            }
        ]
    },

    {
        "productId": 5,
        "name": "Product 5",
        "description": "Description for Product 5",
        "basePrice": 140.35,
        "discountPrice": 131.07,
        "sku": "PROD005",
        "categoryId": 4,
        "createdAt": "2025-04-24T19:38:14",
        "updatedAt": "2025-04-24T19:38:14",
        "colors": [
            {
                "colorId": 14,
                "colorName": "Red",
                "colorSku": "PROD005-RED",
                "variants": [
                    {
                        "variantId": 55,
                        "size": "L",
                        "stockQuantity": 41,
                        "variantSku": "PROD005-RED-L"
                    },
                    {
                        "variantId": 54,
                        "size": "M",
                        "stockQuantity": 87,
                        "variantSku": "PROD005-RED-M"
                    },
                    {
                        "variantId": 53,
                        "size": "S",
                        "stockQuantity": 77,
                        "variantSku": "PROD005-RED-S"
                    },
                    {
                        "variantId": 56,
                        "size": "XL",
                        "stockQuantity": 16,
                        "variantSku": "PROD005-RED-XL"
                    }
                ],
                "images": [
                    {
                        "imageId": 44,
                        "imageUrl": "shop5-color1.png",
                        "isPrimary": true,
                        "createdAt": "0001-01-01T00:00:00"
                    },
                    {
                        "imageId": 45,
                        "imageUrl": "045.jpg",
                        "isPrimary": false,
                        "createdAt": "0001-01-01T00:00:00"
                    },
                    {
                        "imageId": 46,
                        "imageUrl": "046.jpg",
                        "isPrimary": false,
                        "createdAt": "0001-01-01T00:00:00"
                    }
                ]
            },
            {
                "colorId": 15,
                "colorName": "Blue",
                "colorSku": "PROD005-BLUE",
                "variants": [
                    {
                        "variantId": 59,
                        "size": "L",
                        "stockQuantity": 37,
                        "variantSku": "PROD005-BLUE-L"
                    },
                    {
                        "variantId": 58,
                        "size": "M",
                        "stockQuantity": 44,
                        "variantSku": "PROD005-BLUE-M"
                    },
                    {
                        "variantId": 57,
                        "size": "S",
                        "stockQuantity": 16,
                        "variantSku": "PROD005-BLUE-S"
                    },
                    {
                        "variantId": 60,
                        "size": "XL",
                        "stockQuantity": 77,
                        "variantSku": "PROD005-BLUE-XL"
                    }
                ],
                "images": [
                    {
                        "imageId": 47,
                        "imageUrl": "047.jpg",
                        "isPrimary": true,
                        "createdAt": "0001-01-01T00:00:00"
                    },
                    {
                        "imageId": 48,
                        "imageUrl": "048.jpg",
                        "isPrimary": false,
                        "createdAt": "0001-01-01T00:00:00"
                    },
                    {
                        "imageId": 49,
                        "imageUrl": "049.jpg",
                        "isPrimary": false,
                        "createdAt": "0001-01-01T00:00:00"
                    },
                    {
                        "imageId": 50,
                        "imageUrl": "050.jpg",
                        "isPrimary": false,
                        "createdAt": "0001-01-01T00:00:00"
                    }
                ]
            }
        ]
    },

    {
        "productId": 6,
        "name": "Product 6",
        "description": "Description for Product 6",
        "basePrice": 164.36,
        "discountPrice": 149.9,
        "sku": "PROD006",
        "categoryId": 2,
        "createdAt": "2025-04-24T19:38:14",
        "updatedAt": "2025-04-24T19:38:14",
        "colors": [
            {
                "colorId": 16,
                "colorName": "Green",
                "colorSku": "PROD006-GREEN",
                "variants": [
                    {
                        "variantId": 63,
                        "size": "L",
                        "stockQuantity": 29,
                        "variantSku": "PROD006-GREEN-L"
                    },
                    {
                        "variantId": 62,
                        "size": "M",
                        "stockQuantity": 88,
                        "variantSku": "PROD006-GREEN-M"
                    },
                    {
                        "variantId": 61,
                        "size": "S",
                        "stockQuantity": 82,
                        "variantSku": "PROD006-GREEN-S"
                    },
                    {
                        "variantId": 64,
                        "size": "XL",
                        "stockQuantity": 67,
                        "variantSku": "PROD006-GREEN-XL"
                    }
                ],
                "images": [
                    {
                        "imageId": 51,
                        "imageUrl": "shop6-color1.png",
                        "isPrimary": true,
                        "createdAt": "0001-01-01T00:00:00"
                    },
                    {
                        "imageId": 52,
                        "imageUrl": "052.jpg",
                        "isPrimary": false,
                        "createdAt": "0001-01-01T00:00:00"
                    },
                    {
                        "imageId": 53,
                        "imageUrl": "053.jpg",
                        "isPrimary": false,
                        "createdAt": "0001-01-01T00:00:00"
                    },
                    {
                        "imageId": 54,
                        "imageUrl": "054.jpg",
                        "isPrimary": false,
                        "createdAt": "0001-01-01T00:00:00"
                    }
                ]
            },
            {
                "colorId": 17,
                "colorName": "Black",
                "colorSku": "PROD006-BLACK",
                "variants": [
                    {
                        "variantId": 67,
                        "size": "L",
                        "stockQuantity": 6,
                        "variantSku": "PROD006-BLACK-L"
                    },
                    {
                        "variantId": 66,
                        "size": "M",
                        "stockQuantity": 0,
                        "variantSku": "PROD006-BLACK-M"
                    },
                    {
                        "variantId": 65,
                        "size": "S",
                        "stockQuantity": 51,
                        "variantSku": "PROD006-BLACK-S"
                    },
                    {
                        "variantId": 68,
                        "size": "XL",
                        "stockQuantity": 8,
                        "variantSku": "PROD006-BLACK-XL"
                    }
                ],
                "images": [
                    {
                        "imageId": 55,
                        "imageUrl": "055.jpg",
                        "isPrimary": true,
                        "createdAt": "0001-01-01T00:00:00"
                    },
                    {
                        "imageId": 56,
                        "imageUrl": "056.jpg",
                        "isPrimary": false,
                        "createdAt": "0001-01-01T00:00:00"
                    },
                    {
                        "imageId": 57,
                        "imageUrl": "057.jpg",
                        "isPrimary": false,
                        "createdAt": "0001-01-01T00:00:00"
                    },
                    {
                        "imageId": 58,
                        "imageUrl": "058.jpg",
                        "isPrimary": false,
                        "createdAt": "0001-01-01T00:00:00"
                    }
                ]
            },
            {
                "colorId": 18,
                "colorName": "Yellow",
                "colorSku": "PROD006-YELLOW",
                "variants": [
                    {
                        "variantId": 71,
                        "size": "L",
                        "stockQuantity": 21,
                        "variantSku": "PROD006-YELLOW-L"
                    },
                    {
                        "variantId": 70,
                        "size": "M",
                        "stockQuantity": 74,
                        "variantSku": "PROD006-YELLOW-M"
                    },
                    {
                        "variantId": 69,
                        "size": "S",
                        "stockQuantity": 49,
                        "variantSku": "PROD006-YELLOW-S"
                    },
                    {
                        "variantId": 72,
                        "size": "XL",
                        "stockQuantity": 97,
                        "variantSku": "PROD006-YELLOW-XL"
                    }
                ],
                "images": [
                    {
                        "imageId": 59,
                        "imageUrl": "059.jpg",
                        "isPrimary": true,
                        "createdAt": "0001-01-01T00:00:00"
                    },
                    {
                        "imageId": 60,
                        "imageUrl": "060.jpg",
                        "isPrimary": false,
                        "createdAt": "0001-01-01T00:00:00"
                    }
                ]
            }
        ]
    },

    {
        "productId": 7,
        "name": "Product 7",
        "description": "Description for Product 7",
        "basePrice": 176.92,
        "discountPrice": 163.17,
        "sku": "PROD007",
        "categoryId": 2,
        "createdAt": "2025-04-24T19:38:14",
        "updatedAt": "2025-04-24T19:38:14",
        "colors": [
            {
                "colorId": 19,
                "colorName": "Green",
                "colorSku": "PROD007-GREEN",
                "variants": [
                    {
                        "variantId": 75,
                        "size": "L",
                        "stockQuantity": 90,
                        "variantSku": "PROD007-GREEN-L"
                    },
                    {
                        "variantId": 74,
                        "size": "M",
                        "stockQuantity": 47,
                        "variantSku": "PROD007-GREEN-M"
                    },
                    {
                        "variantId": 73,
                        "size": "S",
                        "stockQuantity": 82,
                        "variantSku": "PROD007-GREEN-S"
                    },
                    {
                        "variantId": 76,
                        "size": "XL",
                        "stockQuantity": 95,
                        "variantSku": "PROD007-GREEN-XL"
                    }
                ],
                "images": [
                    {
                        "imageId": 61,
                        "imageUrl": "shop7-color1.png",
                        "isPrimary": true,
                        "createdAt": "0001-01-01T00:00:00"
                    },
                    {
                        "imageId": 62,
                        "imageUrl": "062.jpg",
                        "isPrimary": false,
                        "createdAt": "0001-01-01T00:00:00"
                    },
                    {
                        "imageId": 63,
                        "imageUrl": "063.jpg",
                        "isPrimary": false,
                        "createdAt": "0001-01-01T00:00:00"
                    },
                    {
                        "imageId": 64,
                        "imageUrl": "064.jpg",
                        "isPrimary": false,
                        "createdAt": "0001-01-01T00:00:00"
                    }
                ]
            },
            {
                "colorId": 20,
                "colorName": "Yellow",
                "colorSku": "PROD007-YELLOW",
                "variants": [
                    {
                        "variantId": 79,
                        "size": "L",
                        "stockQuantity": 82,
                        "variantSku": "PROD007-YELLOW-L"
                    },
                    {
                        "variantId": 78,
                        "size": "M",
                        "stockQuantity": 71,
                        "variantSku": "PROD007-YELLOW-M"
                    },
                    {
                        "variantId": 77,
                        "size": "S",
                        "stockQuantity": 80,
                        "variantSku": "PROD007-YELLOW-S"
                    },
                    {
                        "variantId": 80,
                        "size": "XL",
                        "stockQuantity": 57,
                        "variantSku": "PROD007-YELLOW-XL"
                    }
                ],
                "images": [
                    {
                        "imageId": 65,
                        "imageUrl": "065.jpg",
                        "isPrimary": true,
                        "createdAt": "0001-01-01T00:00:00"
                    },
                    {
                        "imageId": 66,
                        "imageUrl": "066.jpg",
                        "isPrimary": false,
                        "createdAt": "0001-01-01T00:00:00"
                    },
                    {
                        "imageId": 67,
                        "imageUrl": "067.jpg",
                        "isPrimary": false,
                        "createdAt": "0001-01-01T00:00:00"
                    }
                ]
            }
        ]
    },

    {
        "productId": 8,
        "name": "Product 8",
        "description": "Description for Product 8",
        "basePrice": 131.45,
        "discountPrice": 95.24,
        "sku": "PROD008",
        "categoryId": 4,
        "createdAt": "2025-04-24T19:38:14",
        "updatedAt": "2025-04-24T19:38:14",
        "colors": [
            {
                "colorId": 21,
                "colorName": "Green",
                "colorSku": "PROD008-GREEN",
                "variants": [
                    {
                        "variantId": 83,
                        "size": "L",
                        "stockQuantity": 20,
                        "variantSku": "PROD008-GREEN-L"
                    },
                    {
                        "variantId": 82,
                        "size": "M",
                        "stockQuantity": 78,
                        "variantSku": "PROD008-GREEN-M"
                    },
                    {
                        "variantId": 81,
                        "size": "S",
                        "stockQuantity": 18,
                        "variantSku": "PROD008-GREEN-S"
                    },
                    {
                        "variantId": 84,
                        "size": "XL",
                        "stockQuantity": 91,
                        "variantSku": "PROD008-GREEN-XL"
                    }
                ],
                "images": [
                    {
                        "imageId": 68,
                        "imageUrl": "shop8-color1.png",
                        "isPrimary": true,
                        "createdAt": "0001-01-01T00:00:00"
                    },
                    {
                        "imageId": 69,
                        "imageUrl": "069.jpg",
                        "isPrimary": false,
                        "createdAt": "0001-01-01T00:00:00"
                    }
                ]
            },
            {
                "colorId": 22,
                "colorName": "Yellow",
                "colorSku": "PROD008-YELLOW",
                "variants": [
                    {
                        "variantId": 87,
                        "size": "L",
                        "stockQuantity": 6,
                        "variantSku": "PROD008-YELLOW-L"
                    },
                    {
                        "variantId": 86,
                        "size": "M",
                        "stockQuantity": 48,
                        "variantSku": "PROD008-YELLOW-M"
                    },
                    {
                        "variantId": 85,
                        "size": "S",
                        "stockQuantity": 60,
                        "variantSku": "PROD008-YELLOW-S"
                    },
                    {
                        "variantId": 88,
                        "size": "XL",
                        "stockQuantity": 4,
                        "variantSku": "PROD008-YELLOW-XL"
                    }
                ],
                "images": [
                    {
                        "imageId": 70,
                        "imageUrl": "070.jpg",
                        "isPrimary": true,
                        "createdAt": "0001-01-01T00:00:00"
                    },
                    {
                        "imageId": 71,
                        "imageUrl": "071.jpg",
                        "isPrimary": false,
                        "createdAt": "0001-01-01T00:00:00"
                    },
                    {
                        "imageId": 72,
                        "imageUrl": "072.jpg",
                        "isPrimary": false,
                        "createdAt": "0001-01-01T00:00:00"
                    }
                ]
            },
            {
                "colorId": 23,
                "colorName": "Blue",
                "colorSku": "PROD008-BLUE",
                "variants": [
                    {
                        "variantId": 91,
                        "size": "L",
                        "stockQuantity": 60,
                        "variantSku": "PROD008-BLUE-L"
                    },
                    {
                        "variantId": 90,
                        "size": "M",
                        "stockQuantity": 22,
                        "variantSku": "PROD008-BLUE-M"
                    },
                    {
                        "variantId": 89,
                        "size": "S",
                        "stockQuantity": 48,
                        "variantSku": "PROD008-BLUE-S"
                    },
                    {
                        "variantId": 92,
                        "size": "XL",
                        "stockQuantity": 89,
                        "variantSku": "PROD008-BLUE-XL"
                    }
                ],
                "images": [
                    {
                        "imageId": 73,
                        "imageUrl": "073.jpg",
                        "isPrimary": true,
                        "createdAt": "0001-01-01T00:00:00"
                    },
                    {
                        "imageId": 74,
                        "imageUrl": "074.jpg",
                        "isPrimary": false,
                        "createdAt": "0001-01-01T00:00:00"
                    },
                    {
                        "imageId": 75,
                        "imageUrl": "075.jpg",
                        "isPrimary": false,
                        "createdAt": "0001-01-01T00:00:00"
                    }
                ]
            }
        ]
    },

    {
        "productId": 9,
        "name": "Product 9",
        "description": "Description for Product 9",
        "basePrice": 294.86,
        "discountPrice": 246.97,
        "sku": "PROD009",
        "categoryId": 4,
        "createdAt": "2025-04-24T19:38:14",
        "updatedAt": "2025-04-24T19:38:14",
        "colors": [
            {
                "colorId": 24,
                "colorName": "Black",
                "colorSku": "PROD009-BLACK",
                "variants": [
                    {
                        "variantId": 95,
                        "size": "L",
                        "stockQuantity": 22,
                        "variantSku": "PROD009-BLACK-L"
                    },
                    {
                        "variantId": 94,
                        "size": "M",
                        "stockQuantity": 100,
                        "variantSku": "PROD009-BLACK-M"
                    },
                    {
                        "variantId": 93,
                        "size": "S",
                        "stockQuantity": 93,
                        "variantSku": "PROD009-BLACK-S"
                    },
                    {
                        "variantId": 96,
                        "size": "XL",
                        "stockQuantity": 91,
                        "variantSku": "PROD009-BLACK-XL"
                    }
                ],
                "images": [
                    {
                        "imageId": 76,
                        "imageUrl": "shop9-color1.png",
                        "isPrimary": true,
                        "createdAt": "0001-01-01T00:00:00"
                    },
                    {
                        "imageId": 77,
                        "imageUrl": "077.jpg",
                        "isPrimary": false,
                        "createdAt": "0001-01-01T00:00:00"
                    }
                ]
            },
            {
                "colorId": 25,
                "colorName": "Yellow",
                "colorSku": "PROD009-YELLOW",
                "variants": [
                    {
                        "variantId": 99,
                        "size": "L",
                        "stockQuantity": 18,
                        "variantSku": "PROD009-YELLOW-L"
                    },
                    {
                        "variantId": 98,
                        "size": "M",
                        "stockQuantity": 65,
                        "variantSku": "PROD009-YELLOW-M"
                    },
                    {
                        "variantId": 97,
                        "size": "S",
                        "stockQuantity": 11,
                        "variantSku": "PROD009-YELLOW-S"
                    },
                    {
                        "variantId": 100,
                        "size": "XL",
                        "stockQuantity": 15,
                        "variantSku": "PROD009-YELLOW-XL"
                    }
                ],
                "images": [
                    {
                        "imageId": 78,
                        "imageUrl": "078.jpg",
                        "isPrimary": true,
                        "createdAt": "0001-01-01T00:00:00"
                    },
                    {
                        "imageId": 79,
                        "imageUrl": "079.jpg",
                        "isPrimary": false,
                        "createdAt": "0001-01-01T00:00:00"
                    },
                    {
                        "imageId": 80,
                        "imageUrl": "080.jpg",
                        "isPrimary": false,
                        "createdAt": "0001-01-01T00:00:00"
                    },
                    {
                        "imageId": 81,
                        "imageUrl": "081.jpg",
                        "isPrimary": false,
                        "createdAt": "0001-01-01T00:00:00"
                    }
                ]
            },
            {
                "colorId": 26,
                "colorName": "Green",
                "colorSku": "PROD009-GREEN",
                "variants": [
                    {
                        "variantId": 103,
                        "size": "L",
                        "stockQuantity": 6,
                        "variantSku": "PROD009-GREEN-L"
                    },
                    {
                        "variantId": 102,
                        "size": "M",
                        "stockQuantity": 91,
                        "variantSku": "PROD009-GREEN-M"
                    },
                    {
                        "variantId": 101,
                        "size": "S",
                        "stockQuantity": 7,
                        "variantSku": "PROD009-GREEN-S"
                    },
                    {
                        "variantId": 104,
                        "size": "XL",
                        "stockQuantity": 55,
                        "variantSku": "PROD009-GREEN-XL"
                    }
                ],
                "images": [
                    {
                        "imageId": 82,
                        "imageUrl": "082.jpg",
                        "isPrimary": true,
                        "createdAt": "0001-01-01T00:00:00"
                    },
                    {
                        "imageId": 83,
                        "imageUrl": "083.jpg",
                        "isPrimary": false,
                        "createdAt": "0001-01-01T00:00:00"
                    }
                ]
            }
        ]
    }



];
// Hàm để thêm sản phẩm mới
const addProduct = (productData) => {
    // Tạo ID mới dựa trên ID lớn nhất hiện tại + 1
    const newId = Math.max(...dataProduct.map(product => product.productId), 0) + 1;

    // Tạo ngày hiện tại cho createdAt và updatedAt
    const currentDate = new Date().toISOString();

    // Tạo đối tượng sản phẩm mới với cấu trúc giống như dataProduct
    const newProduct = {
        productId: newId,
        name: productData.product.name,
        description: productData.product.description || "",
        basePrice: parseFloat(productData.product.base_price) || 0,
        discountPrice: parseFloat(productData.product.discount_price) || 0,
        sku: productData.product.sku,
        categoryId: parseInt(productData.product.category_id) || 0,
        createdAt: currentDate,
        updatedAt: currentDate,
        colors: productData.colors.map((color, idx) => {
            return {
                colorId: idx + 1,
                colorName: color.color_name,
                colorSku: color.color_sku,
                variants: [], // Sẽ thêm variants từ dữ liệu đầu vào
                images: [] // Sẽ xử lý hình ảnh ở một bước khác nếu cần
            };
        })
    };

    // Xử lý variants
    productData.variants.forEach((variant, idx) => {
        const colorIndex = variant.color_id - 1;
        if (colorIndex >= 0 && colorIndex < newProduct.colors.length) {
            newProduct.colors[colorIndex].variants.push({
                variantId: idx + 1,
                size: variant.size,
                stockQuantity: parseInt(variant.stock_quantity) || 0,
                variantSku: variant.variant_sku
            });
        }
    });

    // Thêm sản phẩm mới vào mảng dataProduct
    dataProduct.push(newProduct);

    return newProduct;
};

// Export cả dataProduct và các hàm helper
export default dataProduct;
export { dataProduct, addProduct };
