import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import {
    loginThunk,
    registerThunk,
    logoutThunk,
    getCurrentUserThunk,
    forgotPasswordThunk,
    resetPasswordThunk,
    selectAuth,
    selectUser,
    selectIsAuthenticated,
    selectAuthLoading,
    selectAuthError,
    clearError,
} from '../slices/authSlice';
import type { LoginCredentials, RegisterData, ResetPasswordData, UpdatePasswordData } from '../types/auth.types';

export const useAuth = () => {
    const dispatch = useAppDispatch();
    const auth = useAppSelector(selectAuth);
    const user = useAppSelector(selectUser);
    const isAuthenticated = useAppSelector(selectIsAuthenticated);
    const loading = useAppSelector(selectAuthLoading);
    const error = useAppSelector(selectAuthError);

    const login = useCallback(
        async (credentials: LoginCredentials) => {
            const result = await dispatch(loginThunk(credentials));
            return result;
        },
        [dispatch]
    );

    const register = useCallback(
        async (data: RegisterData) => {
            const result = await dispatch(registerThunk(data));
            return result;
        },
        [dispatch]
    );

    const logout = useCallback(async () => {
        await dispatch(logoutThunk());
    }, [dispatch]);

    const getCurrentUser = useCallback(async () => {
        const result = await dispatch(getCurrentUserThunk());
        return result;
    }, [dispatch]);

    const forgotPassword = useCallback(
        async (data: ResetPasswordData) => {
            const result = await dispatch(forgotPasswordThunk(data));
            return result;
        },
        [dispatch]
    );

    const resetPassword = useCallback(
        async (data: UpdatePasswordData) => {
            const result = await dispatch(resetPasswordThunk(data));
            return result;
        },
        [dispatch]
    );

    const clearAuthError = useCallback(() => {
        dispatch(clearError());
    }, [dispatch]);

    // Helper functions
    const hasRole = useCallback(
        (role: string): boolean => {
            if (!user) return false;
            return user.role === role;
        },
        [user]
    );

    const hasPermission = useCallback(
        (_permission: string): boolean => {
            // This would need to be implemented based on your permission structure
            // For now, admins have all permissions
            if (!user) return false;
            return user.role === 'Admin';
        },
        [user]
    );

    return {
        // State
        user,
        isAuthenticated,
        loading,
        error,
        auth,

        // Actions
        login,
        register,
        logout,
        getCurrentUser,
        forgotPassword,
        resetPassword,
        clearAuthError,

        // Helpers
        hasRole,
        hasPermission,
    };
};
