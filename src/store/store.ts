import { configureStore } from '@reduxjs/toolkit';
import uiReducer from './uiSlice';
import authReducer from './slices/authSlice';
import subscriptionReducer from './slices/subscriptionSlice';
import adminUserReducer from './slices/adminUserSlice';
import adminOrganizationReducer from './slices/adminOrganizationSlice';
import adminAccountReducer from './slices/adminAccountSlice';
import adminDashboardReducer from './slices/adminDashboardSlice';

export const store = configureStore({
    reducer: {
        ui: uiReducer,
        auth: authReducer,
        subscription: subscriptionReducer,
        adminUsers: adminUserReducer,
        adminOrganizations: adminOrganizationReducer,
        adminAccounts: adminAccountReducer,
        adminDashboard: adminDashboardReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
