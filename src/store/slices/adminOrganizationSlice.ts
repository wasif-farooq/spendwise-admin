import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { adminOrganizationService } from '@/api/services/admin/adminOrganizationService';
import type { AdminOrganization } from '../types/admin.types';

interface AdminOrganizationState {
    organizations: AdminOrganization[];
    loading: boolean;
    error: string | null;
}

const initialState: AdminOrganizationState = {
    organizations: [],
    loading: false,
    error: null,
};

// Async thunks
export const fetchAllOrgsThunk = createAsyncThunk(
    'adminOrganizations/fetchAll',
    async (_, { rejectWithValue }) => {
        try {
            return await adminOrganizationService.getAllOrganizations();
        } catch (error: any) {
            return rejectWithValue(error.message || 'Failed to fetch organizations');
        }
    }
);

export const toggleOrgStatusThunk = createAsyncThunk(
    'adminOrganizations/toggleStatus',
    async (id: string, { rejectWithValue }) => {
        try {
            return await adminOrganizationService.toggleOrgStatus(id);
        } catch (error: any) {
            return rejectWithValue(error.message || 'Failed to update organization status');
        }
    }
);

// Slice
const adminOrganizationSlice = createSlice({
    name: 'adminOrganizations',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch All
            .addCase(fetchAllOrgsThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAllOrgsThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.organizations = action.payload;
            })
            .addCase(fetchAllOrgsThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            // Toggle Status
            .addCase(toggleOrgStatusThunk.fulfilled, (state, action) => {
                const index = state.organizations.findIndex(o => o.id === action.payload.id);
                if (index !== -1) {
                    state.organizations[index] = action.payload;
                }
            });
    },
});

export default adminOrganizationSlice.reducer;
