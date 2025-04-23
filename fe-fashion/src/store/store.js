import { configureStore, createSlice } from '@reduxjs/toolkit';

// Slice
const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isLoggin: false,
        cartCount: 0,
        wishlistCount: 0,
    },
    reducers: {
        login: (state) => {
            state.isLoggin = true;
        },
        logout: (state) => {
            state.isLoggin = false;
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