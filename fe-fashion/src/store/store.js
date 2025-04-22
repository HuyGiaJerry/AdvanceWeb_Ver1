import { configureStore, createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isLoggin: false, 
    },
    reducers: {
        login: (state) => {
            state.isLoggin = true;
            console.log('Login action dispatched, isLoggin:', state.isLoggin);
        },
        logout: (state) => {
            state.isLoggin = false;
            console.log('Logout action dispatched, isLoggin:', state.isLoggin);
        }
    },
});

export const { login, logout } = authSlice.actions;

const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
    },
});

export default store;