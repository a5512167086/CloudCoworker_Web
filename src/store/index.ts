import { configureStore } from '@reduxjs/toolkit';
import userSlice from './modules/userSlice';

export const store = configureStore({
  reducer: {
    user: userSlice,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
