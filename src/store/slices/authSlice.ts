import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { authService } from '@/api/services/auth/authService';
import type { AuthState, LoginCredentials, RegisterData, ResetPasswordData, UpdatePasswordData } from '../types/auth.types';
import type { RootState } from '../store';

// Initial state
const initialState: AuthState = {
    user: null,
    accessToken: null,
    isAuthenticated: false,
    loading: false,
    error: null,
    // 2FA fields
    requiresTwoFactor: false,
    availableMethods: [],
    tempToken: null,
    twoFactorVerified: false,
};

// Async thunks
export const loginThunk = createAsyncThunk(
    'auth/login',
    async (credentials: LoginCredentials, { rejectWithValue }) => {
        try {
            const response = await authService.login(credentials);
            return response;
        } catch (error: any) {
            return rejectWithValue(error.message || 'Login failed');
        }
    }
);

export const registerThunk = createAsyncThunk(
    'auth/register',
    async (data: RegisterData, { rejectWithValue }) => {
        try {
            const response = await authService.register(data);
            return response;
        } catch (error: any) {
            return rejectWithValue(error.message || 'Registration failed');
        }
    }
);

export const logoutThunk = createAsyncThunk(
    'auth/logout',
    async (_, { rejectWithValue }) => {
        try {
            await authService.logout();
        } catch (error: any) {
            return rejectWithValue(error.message || 'Logout failed');
        }
    }
);

export const refreshTokenThunk = createAsyncThunk(
    'auth/refreshToken',
    async (_, { rejectWithValue }) => {
        try {
            const response = await authService.refreshToken();
            return response;
        } catch (error: any) {
            return rejectWithValue(error.message || 'Token refresh failed');
        }
    }
);

export const getCurrentUserThunk = createAsyncThunk(
    'auth/getCurrentUser',
    async (_, { rejectWithValue }) => {
        try {
            const user = await authService.getCurrentUser();
            return user;
        } catch (error: any) {
            return rejectWithValue(error.message || 'Failed to fetch user');
        }
    }
);

export const forgotPasswordThunk = createAsyncThunk(
    'auth/forgotPassword',
    async (data: ResetPasswordData, { rejectWithValue }) => {
        try {
            const response = await authService.forgotPassword(data);
            return response;
        } catch (error: any) {
            return rejectWithValue(error.message || 'Password reset request failed');
        }
    }
);

export const resetPasswordThunk = createAsyncThunk(
    'auth/resetPassword',
    async (data: UpdatePasswordData, { rejectWithValue }) => {
        try {
            const response = await authService.resetPassword(data);
            return response;
        } catch (error: any) {
            return rejectWithValue(error.message || 'Password reset failed');
        }
    }
);

// 2FA Thunks
export const verify2FAThunk = createAsyncThunk(
    'auth/verify2FA',
    async (data: { code: string; method: 'authenticator' | 'sms' | 'email'; tempToken: string; backupCode?: boolean }, { rejectWithValue }) => {
        try {
            // This will be implemented in authService
            const response = await authService.verify2FA(data);
            return response;
        } catch (error: any) {
            return rejectWithValue(error.message || '2FA verification failed');
        }
    }
);

export const resend2FACodeThunk = createAsyncThunk(
    'auth/resend2FACode',
    async (method: 'sms' | 'email', { rejectWithValue }) => {
        try {
            await authService.resend2FACode(method);
        } catch (error: any) {
            return rejectWithValue(error.message || 'Failed to resend code');
        }
    }
);

// Slice
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            const { user, token } = action.payload;
            state.user = user;
            state.accessToken = token;
            state.isAuthenticated = true;
            state.error = null;
        },
        clearCredentials: (state) => {
            state.user = null;
            state.accessToken = null;
            state.isAuthenticated = false;
            state.error = null;
        },
        updateUser: (state, action) => {
            if (state.user) {
                state.user = { ...state.user, ...action.payload };
            }
        },
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        // Login
        builder
            .addCase(loginThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginThunk.fulfilled, (state, action) => {
                state.loading = false;

                // Check if 2FA is required
                if (action.payload.requiresTwoFactor) {
                    state.requiresTwoFactor = true;
                    state.availableMethods = action.payload.availableMethods || [];
                    state.tempToken = action.payload.tempToken || null;
                    state.isAuthenticated = false;
                } else {
                    // Direct login without 2FA
                    state.user = action.payload.user || null;
                    state.accessToken = action.payload.token || null;
                    state.isAuthenticated = true;
                    state.requiresTwoFactor = false;
                    state.twoFactorVerified = false;
                }
                state.error = null;
            })
            .addCase(loginThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
                state.isAuthenticated = false;
            });

        // Register
        builder
            .addCase(registerThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerThunk.fulfilled, (state, action) => {
                state.loading = false;
                // Registration typically doesn't require immediate 2FA
                state.user = action.payload.user || null;
                state.accessToken = action.payload.token || null;
                state.isAuthenticated = true;
                state.error = null;
            })
            .addCase(registerThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
                state.isAuthenticated = false;
            });

        // Logout
        builder
            .addCase(logoutThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(logoutThunk.fulfilled, (state) => {
                state.loading = false;
                state.user = null;
                state.accessToken = null;
                state.isAuthenticated = false;
                state.error = null;
            })
            .addCase(logoutThunk.rejected, (state) => {
                // Even if logout fails, clear local state
                state.loading = false;
                state.user = null;
                state.accessToken = null;
                state.isAuthenticated = false;
            });

        // Refresh Token
        builder
            .addCase(refreshTokenThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(refreshTokenThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.accessToken = action.payload.token;
                state.error = null;
            })
            .addCase(refreshTokenThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
                // On refresh failure, logout user
                state.user = null;
                state.accessToken = null;
                state.isAuthenticated = false;
            });

        // Get Current User
        builder
            .addCase(getCurrentUserThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(getCurrentUserThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.isAuthenticated = true;
                state.error = null;
            })
            .addCase(getCurrentUserThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });

        // Forgot Password
        builder
            .addCase(forgotPasswordThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(forgotPasswordThunk.fulfilled, (state) => {
                state.loading = false;
                state.error = null;
            })
            .addCase(forgotPasswordThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });

        // Reset Password
        builder
            .addCase(resetPasswordThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(resetPasswordThunk.fulfilled, (state) => {
                state.loading = false;
                state.error = null;
            })
            .addCase(resetPasswordThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });

        // Verify 2FA
        builder
            .addCase(verify2FAThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(verify2FAThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user || null;
                state.accessToken = action.payload.token || null;
                state.isAuthenticated = true;
                state.requiresTwoFactor = false;
                state.twoFactorVerified = true;
                state.tempToken = null;
                state.availableMethods = [];
                state.error = null;
            })
            .addCase(verify2FAThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });

        // Resend 2FA Code
        builder
            .addCase(resend2FACodeThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(resend2FACodeThunk.fulfilled, (state) => {
                state.loading = false;
                state.error = null;
            })
            .addCase(resend2FACodeThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

// Actions
export const { setCredentials, clearCredentials, updateUser, clearError } = authSlice.actions;

// Selectors
export const selectAuth = (state: RootState) => state.auth;
export const selectUser = (state: RootState) => state.auth.user;
export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated;
export const selectAuthLoading = (state: RootState) => state.auth.loading;
export const selectAuthError = (state: RootState) => state.auth.error;
export const selectAccessToken = (state: RootState) => state.auth.accessToken;
// 2FA Selectors
export const selectRequiresTwoFactor = (state: RootState) => state.auth.requiresTwoFactor;
export const selectAvailableMethods = (state: RootState) => state.auth.availableMethods;
export const selectTempToken = (state: RootState) => state.auth.tempToken;
export const selectTwoFactorVerified = (state: RootState) => state.auth.twoFactorVerified;

// Reducer
export default authSlice.reducer;
