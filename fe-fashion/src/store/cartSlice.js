import { createSlice } from '@reduxjs/toolkit';

// Lấy trạng thái giỏ hàng từ localStorage
const initialCartState = JSON.parse(localStorage.getItem('cart')) || [];

const cartSlice = createSlice({
    name: 'cart',
    initialState: initialCartState,
    reducers: {
        addToCart: (state, action) => {
            const { variantId, quantity, imageUrl, productId, productName, price, colorId, colorName, size } = action.payload;
            const existingItem = state.find((item) => item.variantId === variantId);

            if (existingItem) {
                // Nếu sản phẩm đã tồn tại, tăng số lượng
                existingItem.quantity += quantity;
            } else {
                // Nếu sản phẩm chưa tồn tại, thêm mới
                state.push({ variantId, quantity, imageUrl, productId, productName, price, colorId, colorName, size });
            }
        },
        removeFromCart: (state, action) => {
            const variantId = action.payload;
            return state.filter((item) => item.variantId !== variantId);
        },
        updateQuantity: (state, action) => {
            const { variantId, quantity } = action.payload;
            const existingItem = state.find((item) => item.variantId === variantId);

            if (existingItem) {
                existingItem.quantity = quantity;
            }
        },
        clearCart: () => {
            return [];
        },
    },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;

export default cartSlice.reducer;