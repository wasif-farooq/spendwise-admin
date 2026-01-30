export interface SecuritySettings {
    twoFactorEnabled: boolean;
    twoFactorMethod?: 'authenticator' | 'sms' | 'email';
    backupCodes?: string[];
    activeSessions: ActiveSession[];
    loginHistory: LoginHistoryItem[];
}

export interface ActiveSession {
    id: string;
    device: string;
    location: string;
    ipAddress: string;
    lastActive: string;
    isCurrent: boolean;
}

export interface LoginHistoryItem {
    id: string;
    timestamp: string;
    device: string;
    location: string;
    ipAddress: string;
    status: 'success' | 'failed';
}

export interface Setup2FADTO {
    method: 'authenticator' | 'sms' | 'email';
    phoneNumber?: string;
    email?: string;
}

export interface Verify2FADTO {
    code: string;
    backupCode?: string;
}

export interface ChangePasswordDTO {
    currentPassword: string;
    newPassword: string;
}

export interface SecurityState {
    settings: SecuritySettings | null;
    loading: boolean;
    error: string | null;
}
