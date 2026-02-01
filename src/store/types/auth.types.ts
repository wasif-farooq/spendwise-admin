export interface User {
    id: string;
    email: string;
    name: string;
    avatar?: string;
    role: 'user' | 'admin' | 'staff' | 'SUPER_ADMIN';
    permissions?: string[];
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
    user?: User;
    token?: string;
    refreshToken?: string;
    // 2FA fields
    requiresTwoFactor?: boolean;
    availableMethods?: TwoFactorMethod[];
    tempToken?: string;
}

export interface ResetPasswordData {
    email: string;
}

export interface UpdatePasswordData {
    token: string;
    newPassword: string;
}

// Two-Factor Authentication Types
export interface TwoFactorMethod {
    type: 'authenticator' | 'sms' | 'email';
    enabled: boolean;
    verified: boolean;
    phoneNumber?: string; // For SMS
    email?: string; // For email
}

export interface TwoFactorSetup {
    qrCode?: string; // For authenticator app
    secret?: string; // For authenticator app
    backupCodes?: string[];
}

export interface TwoFactorVerification {
    code: string;
    method: 'authenticator' | 'sms' | 'email';
    backupCode?: boolean;
    tempToken: string;
}

export interface AuthState {
    user: User | null;
    accessToken: string | null;
    loading: boolean;
    error: string | null;
    isAuthenticated: boolean;
    // 2FA fields
    requiresTwoFactor: boolean;
    availableMethods: TwoFactorMethod[];
    tempToken: string | null;
    twoFactorVerified: boolean;
    isInitialized: boolean;
}
