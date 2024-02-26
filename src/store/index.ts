import { configureStore } from '@reduxjs/toolkit';
import userSlice from './modules/userSlice';
import organizationSlice from './modules/organizationSlice';

export const store = configureStore({
  reducer: {
    user: userSlice,
    organization: organizationSlice,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
