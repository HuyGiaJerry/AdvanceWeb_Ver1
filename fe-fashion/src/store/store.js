import { configureStore, createSlice } from '@reduxjs/toolkit';
const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isLoggin: false,
    },
    reducers: {
        login: (state) => {
            state.isLoggin = true;
        },
        logout: (state) => {
            state.isLoggin = false;
        }
    },
});

export const {login, logout} = authSlice.actions;
const store =  configureStore({
    reducer: {
        auth: authSlice.reducer,
    },
});

export default store;