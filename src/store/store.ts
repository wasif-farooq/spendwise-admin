import { configureStore } from '@reduxjs/toolkit';
import uiReducer from './uiSlice';
import authReducer from './slices/authSlice';
import subscriptionReducer from './slices/subscriptionSlice';

export const store = configureStore({
    reducer: {
        ui: uiReducer,
        auth: authReducer,
        subscription: subscriptionReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
