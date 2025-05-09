import { configureStore, createSlice } from '@reduxjs/toolkit';

// Get State from localStorage
let persistedState;
try {
    persistedState = JSON.parse(localStorage.getItem('authState')) || {
        auth: false,
        userId: '',
        userName: '',
        accessToken: '',
        refreshToken: '',
        cartCount: 0,
        wishlistCount: 0,
    };
} catch (error) {
    console.error('Error parsing authState from localStorage:', error);
    persistedState = {
        auth: false,
        userId: '',
        userName: '',
        accessToken: '',
        refreshToken: '',
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
            state.userId = action.payload.userId; // Lưu userId
            state.userName = action.payload.userName;
            state.accessToken = action.payload.accessToken; // Lưu accessToken
            state.refreshToken = action.payload.refreshToken; // Lưu refreshToken
        },
        logout: (state) => {
            state.auth = false;
            state.userId = '';
            state.userName = '';
            state.accessToken = '';
            state.refreshToken = '';
            // localStorage.removeItem('authState'); // Xóa state khỏi localStorage khi logout
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

// Lưu state redux vào localStorage mỗi khi thay đổi
store.subscribe(() => {
    try {
        localStorage.setItem('authState', JSON.stringify(store.getState().auth));
    } catch (error) {
        console.error('Error saving authState to localStorage:', error);
    }
});
export default store;