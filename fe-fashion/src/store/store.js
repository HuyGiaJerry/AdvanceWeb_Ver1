import { configureStore, createSlice } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
// Get State from localStorage
let persistedState;
try {
    persistedState = JSON.parse(localStorage.getItem('authState')) || {
        auth: false,
        userId: null,
        email: null,
        phoneNumber: null,
        fullName: null,
        avatarUrl: null,
        role: null,
        isGoogleLinked: false,
        accessToken: null,
        refreshToken: null,
        cartCount: 0,
        wishlistCount: 0,
    };
} catch (error) {
    console.error('Error parsing authState from localStorage:', error);
    persistedState = {
        auth: false,
        userId: null,
        email: null,
        phoneNumber: null,
        fullName: null,
        avatarUrl: null,
        role: null,
        isGoogleLinked: false,
        accessToken: null,
        refreshToken: null,
        cartCount: 0,
        wishlistCount: 0,

    };
}


// Slice
const authSlice = createSlice({
    name: 'auth',
    initialState: persistedState,
    reducers: {
        login: (state, action) => {
            state.auth = true;
            state.userId = action.payload.userId;
            state.email = action.payload.email;
            state.phoneNumber = action.payload.phoneNumber;
            state.fullName = action.payload.fullName;
            state.avatarUrl = action.payload.avatarUrl;
            state.role = action.payload.role;
            state.isGoogleLinked = action.payload.isGoogleLinked;
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;

        },
        logout: (state) => {
            state.auth = false;
            state.userId = null;
            state.email = null;
            state.phoneNumber = null;
            state.fullName = null;
            state.avatarUrl = null;
            state.role = null;
            state.isGoogleLinked = false;
            state.accessToken = null;
            state.refreshToken = null;
            localStorage.removeItem('authState'); // Xóa thông tin đăng nhập khỏi localStorage
            localStorage.removeItem('cart'); // Xóa giỏ hàng khỏi localStorage
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
        cart: cartReducer,
    },
});

// Lưu state redux vào localStorage mỗi khi thay đổi
store.subscribe(() => {
    try {
        localStorage.setItem('authState', JSON.stringify(store.getState().auth));
    } catch (error) {
        console.error('Error saving authState to localStorage:', error);
    }
});

store.subscribe(() => {
    try {
        localStorage.setItem('cart', JSON.stringify(store.getState().cart));
    } catch (error) {
        console.error('Error saving cart to localStorage:', error);
    }
}
);
export default store;