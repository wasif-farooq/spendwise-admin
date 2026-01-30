import { apiClient } from '../../client/apiClient';
import { mockAdapter } from '../../client/mockAdapter';
import mockData from './authMockData.json';
import type { User, LoginCredentials, RegisterData, AuthResponse, ResetPasswordData, UpdatePasswordData } from '@/store/types/auth.types';

// Register mock data
mockAdapter.registerMockData('/auth/login', {
    user: mockData.currentUser,
    token: mockData.token,
    refreshToken: mockData.refreshToken,
});

mockAdapter.registerMockData('/auth/register', {
    user: mockData.currentUser,
    token: mockData.token,
    refreshToken: mockData.refreshToken,
});

mockAdapter.registerMockData('/auth/me', mockData.currentUser);
mockAdapter.registerMockData('/auth/logout', { success: true });
mockAdapter.registerMockData('/auth/forgot-password', { success: true, message: 'Password reset email sent' });
mockAdapter.registerMockData('/auth/reset-password', { success: true, message: 'Password reset successfully' });

class AuthService {
    async login(credentials: LoginCredentials): Promise<AuthResponse> {
        const response = await apiClient.post<AuthResponse>('/auth/login', credentials);

        // Store token in localStorage
        if (response.data.token) {
            localStorage.setItem('authToken', response.data.token);
            if (response.data.refreshToken) {
                localStorage.setItem('refreshToken', response.data.refreshToken);
            }
        }

        return response.data;
    }

    async register(data: RegisterData): Promise<AuthResponse> {
        const response = await apiClient.post<AuthResponse>('/auth/register', data);

        // Store token in localStorage
        if (response.data.token) {
            localStorage.setItem('authToken', response.data.token);
            if (response.data.refreshToken) {
                localStorage.setItem('refreshToken', response.data.refreshToken);
            }
        }

        return response.data;
    }

    async logout(): Promise<void> {
        await apiClient.post('/auth/logout');

        // Clear tokens from localStorage
        localStorage.removeItem('authToken');
        localStorage.removeItem('refreshToken');
    }

    async getCurrentUser(): Promise<User> {
        const response = await apiClient.get<User>('/auth/me');
        return response.data;
    }

    async forgotPassword(data: ResetPasswordData): Promise<{ success: boolean; message: string }> {
        const response = await apiClient.post<{ success: boolean; message: string }>('/auth/forgot-password', data);
        return response.data;
    }

    async resetPassword(data: UpdatePasswordData): Promise<{ success: boolean; message: string }> {
        const response = await apiClient.post<{ success: boolean; message: string }>('/auth/reset-password', data);
        return response.data;
    }

    async refreshToken(): Promise<{ token: string }> {
        const refreshToken = localStorage.getItem('refreshToken');
        const response = await apiClient.post<{ token: string }>('/auth/refresh', { refreshToken });

        if (response.data.token) {
            localStorage.setItem('authToken', response.data.token);
        }

        return response.data;
    }

    isAuthenticated(): boolean {
        return !!localStorage.getItem('authToken');
    }

    getToken(): string | null {
        return localStorage.getItem('authToken');
    }
}

export const authService = new AuthService();
