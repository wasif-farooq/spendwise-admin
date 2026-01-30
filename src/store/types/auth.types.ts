export interface User {
    id: string;
    email: string;
    name: string;
    avatar?: string;
    role: string;
    accountType: 'personal' | 'organization';
    organizationId?: string;
    createdAt: string;
    updatedAt: string;
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface RegisterData {
    email: string;
    password: string;
    name: string;
    accountType: 'personal' | 'organization';
    organizationName?: string;
}

export interface AuthResponse {
    user: User;
    token: string;
    refreshToken?: string;
}

export interface ResetPasswordData {
    email: string;
}

export interface UpdatePasswordData {
    token: string;
    newPassword: string;
}

export interface AuthState {
    user: User | null;
    accessToken: string | null;
    loading: boolean;
    error: string | null;
    isAuthenticated: boolean;
}
