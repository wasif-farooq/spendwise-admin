import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { adminAccountService } from '@/api/services/admin/adminAccountService';
import type { AdminAccount } from '../types/admin.types';

interface AdminAccountState {
    accounts: AdminAccount[];
    loading: boolean;
    error: string | null;
}

const initialState: AdminAccountState = {
    accounts: [],
    loading: false,
    error: null,
};

export const fetchAllAccountsThunk = createAsyncThunk(
    'adminAccounts/fetchAll',
    async (_, { rejectWithValue }) => {
        try {
            return await adminAccountService.getAllAccounts();
        } catch (error: any) {
            return rejectWithValue(error.message || 'Failed to fetch accounts');
        }
    }
);

export const flagAccountThunk = createAsyncThunk(
    'adminAccounts/flag',
    async (id: string, { rejectWithValue }) => {
        try {
            return await adminAccountService.flagAccount(id);
        } catch (error: any) {
            return rejectWithValue(error.message || 'Failed to flag account');
        }
    }
);

const adminAccountSlice = createSlice({
    name: 'adminAccounts',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllAccountsThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAllAccountsThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.accounts = action.payload;
            })
            .addCase(fetchAllAccountsThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(flagAccountThunk.fulfilled, (state, action) => {
                const index = state.accounts.findIndex(a => a.id === action.payload.id);
                if (index !== -1) {
                    state.accounts[index] = action.payload;
                }
            });
    },
});

export default adminAccountSlice.reducer;
