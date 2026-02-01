import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { adminUserService } from '@/api/services/admin/adminUserService';
import type { AdminUser } from '../types/admin.types';

interface AdminUserState {
    users: AdminUser[];
    loading: boolean;
    error: string | null;
}

const initialState: AdminUserState = {
    users: [],
    loading: false,
    error: null,
};

// Async thunks
export const fetchAllUsersThunk = createAsyncThunk(
    'adminUsers/fetchAll',
    async (_, { rejectWithValue }) => {
        try {
            return await adminUserService.getAllUsers();
        } catch (error: any) {
            return rejectWithValue(error.message || 'Failed to fetch users');
        }
    }
);

export const toggleUserStatusThunk = createAsyncThunk(
    'adminUsers/toggleStatus',
    async (id: string, { rejectWithValue }) => {
        try {
            return await adminUserService.toggleUserStatus(id);
        } catch (error: any) {
            return rejectWithValue(error.message || 'Failed to update user status');
        }
    }
);

// Slice
const adminUserSlice = createSlice({
    name: 'adminUsers',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch All
            .addCase(fetchAllUsersThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAllUsersThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload;
            })
            .addCase(fetchAllUsersThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            // Toggle Status
            .addCase(toggleUserStatusThunk.fulfilled, (state, action) => {
                const index = state.users.findIndex(u => u.id === action.payload.id);
                if (index !== -1) {
                    state.users[index] = action.payload;
                }
            });
    },
});

export default adminUserSlice.reducer;
