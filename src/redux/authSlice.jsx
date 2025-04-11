// redux/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: false,
    user: null,
    registeredUser: null, // <-- add this line
  },
  reducers: {
    register: (state, action) => {
      state.registeredUser = action.payload;
    },
    login: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

export const { login, logout, register } = authSlice.actions;
export default authSlice.reducer;
