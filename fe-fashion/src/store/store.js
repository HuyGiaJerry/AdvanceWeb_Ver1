import { configureStore, createSlice } from '@reduxjs/toolkit';

// Slice
const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isLoggin: false,
        userName: '', // Thêm trạng thái userName
        cartCount: 0,
        wishlistCount: 0,
    },
    reducers: {
        login: (state, action) => {
            state.isLoggin = true;
            state.userName = action.payload.userName; // Lưu userName khi đăng nhập
        },
        logout: (state) => {
            state.isLoggin = false;
            state.userName = ''; // Xóa userName khi đăng xuất
        },
        addToCart: (state) => {
            state.cartCount += 1;
        },
        addToWishlist: (state) => {
            state.wishlistCount += 1;
        },
    },
});

export const { login, logout, addToCart, addToWishlist } = authSlice.actions;

// Store
const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
    },
});

export default store;