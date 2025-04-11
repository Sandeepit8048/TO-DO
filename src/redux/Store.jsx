import { configureStore } from '@reduxjs/toolkit';
import taskReducer from './TaskSlice'; // adjust if path is different
import authReducer from './authSlice';

export const store = configureStore({
  reducer: {
    tasks: taskReducer,
    auth: authReducer,
  },
});

export default store;



