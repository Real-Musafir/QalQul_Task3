import { configureStore } from '@reduxjs/toolkit';
import documentReducer from '../features/documents/documentSlice';
import authReducer from '../features/auth/authSlice';
import onlineUsersReducer from '../features/users/onlineUsersSlice';

export const store = configureStore({
  reducer: {
    documents: documentReducer,
    auth: authReducer,
    onlineUsers: onlineUsersReducer,
  },
});
