import { configureStore } from '@reduxjs/toolkit';
import petsReducer from './petSlice';

export const store = configureStore({
  reducer: {
    pets: petsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;