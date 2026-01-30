import { apiClient } from '../../client/apiClient';
import { mockAdapter } from '../../client/mockAdapter';
import mockData from './securityMockData.json';
import type { SecuritySettings, Setup2FADTO, Verify2FADTO, ChangePasswordDTO, ActiveSession } from '@/store/types/security.types';

// Register mock data
mockAdapter.registerMockData('/security/settings', mockData);
mockAdapter.registerMockData('/security/2fa/setup', { qrCode: 'mock-qr-code-url', secret: 'MOCK-SECRET-KEY' });
mockAdapter.registerMockData('/security/2fa/verify', { success: true, backupCodes: ['CODE1', 'CODE2', 'CODE3'] });
mockAdapter.registerMockData('/security/sessions', mockData.activeSessions);
mockAdapter.registerMockData('/security/login-history', mockData.loginHistory);

class SecurityService {
    async getSecuritySettings(): Promise<SecuritySettings> {
        const response = await apiClient.get<SecuritySettings>('/security/settings');
        return response.data;
    }

    async setup2FA(data: Setup2FADTO): Promise<{ qrCode?: string; secret?: string }> {
        const response = await apiClient.post<{ qrCode?: string; secret?: string }>('/security/2fa/setup', data);
        return response.data;
    }

    async verify2FA(data: Verify2FADTO): Promise<{ success: boolean; backupCodes?: string[] }> {
        const response = await apiClient.post<{ success: boolean; backupCodes?: string[] }>('/security/2fa/verify', data);
        return response.data;
    }

    async disable2FA(password: string): Promise<void> {
        await apiClient.post('/security/2fa/disable', { password });
    }

    async regenerateBackupCodes(): Promise<string[]> {
        const response = await apiClient.post<{ backupCodes: string[] }>('/security/2fa/backup-codes/regenerate');
        return response.data.backupCodes;
    }

    async changePassword(data: ChangePasswordDTO): Promise<void> {
        await apiClient.post('/security/password/change', data);
    }

    async getActiveSessions(): Promise<ActiveSession[]> {
        const response = await apiClient.get<ActiveSession[]>('/security/sessions');
        return response.data;
    }

    async revokeSession(sessionId: string): Promise<void> {
        await apiClient.delete(`/security/sessions/${sessionId}`);
    }

    async revokeAllSessions(): Promise<void> {
        await apiClient.post('/security/sessions/revoke-all');
    }

    async getLoginHistory(): Promise<any[]> {
        const response = await apiClient.get<any[]>('/security/login-history');
        return response.data;
    }
}

export const securityService = new SecurityService();
