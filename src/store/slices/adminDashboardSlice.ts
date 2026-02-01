import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { adminDashboardService } from '@/api/services/admin/adminDashboardService';
import type { AdminDashboardMetrics } from '../types/admin.types';

interface AdminDashboardState {
    metrics: AdminDashboardMetrics | null;
    loading: boolean;
    error: string | null;
}

const initialState: AdminDashboardState = {
    metrics: null,
    loading: false,
    error: null,
};

export const fetchAdminMetricsThunk = createAsyncThunk(
    'admin/dashboard/fetchMetrics',
    async (_, { rejectWithValue }) => {
        try {
            return await adminDashboardService.getMetrics();
        } catch (error: any) {
            return rejectWithValue(error.message || 'Failed to fetch dashboard metrics');
        }
    }
);

const adminDashboardSlice = createSlice({
    name: 'adminDashboard',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAdminMetricsThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAdminMetricsThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.metrics = action.payload;
            })
            .addCase(fetchAdminMetricsThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default adminDashboardSlice.reducer;
