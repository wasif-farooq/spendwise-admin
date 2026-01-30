import { apiClient } from '../../client/apiClient';
import { mockAdapter } from '../../client/mockAdapter';
import mockData from './preferencesMockData.json';
import type { PreferencesData, UserPreferences } from '@/store/types/preferences.types';

// Register mock data
mockAdapter.registerMockData('/preferences/options', mockData);
mockAdapter.registerMockData('/preferences/user', {
    theme: 'light',
    colorScheme: 'blue',
    layout: 'sidebar-left',
    currency: 'USD',
    timezone: 'UTC',
    language: 'en',
    notifications: {
        email: true,
        push: true,
        sms: false,
    },
});

class PreferencesService {
    async getPreferencesOptions(): Promise<PreferencesData> {
        const response = await apiClient.get<PreferencesData>('/preferences/options');
        return response.data;
    }

    async getUserPreferences(): Promise<UserPreferences> {
        const response = await apiClient.get<UserPreferences>('/preferences/user');
        return response.data;
    }

    async updateUserPreferences(preferences: Partial<UserPreferences>): Promise<UserPreferences> {
        const response = await apiClient.put<UserPreferences>('/preferences/user', preferences);

        // Store preferences in localStorage for persistence
        localStorage.setItem('userPreferences', JSON.stringify(response.data));

        return response.data;
    }

    async updateTheme(theme: 'light' | 'dark' | 'system'): Promise<void> {
        await apiClient.patch('/preferences/user/theme', { theme });

        // Apply theme to document
        document.documentElement.classList.remove('light', 'dark');
        if (theme !== 'system') {
            document.documentElement.classList.add(theme);
        }
    }

    async updateColorScheme(colorScheme: string): Promise<void> {
        await apiClient.patch('/preferences/user/color-scheme', { colorScheme });
    }

    async updateCurrency(currency: string): Promise<void> {
        await apiClient.patch('/preferences/user/currency', { currency });
    }

    async updateTimezone(timezone: string): Promise<void> {
        await apiClient.patch('/preferences/user/timezone', { timezone });
    }

    async updateNotifications(notifications: UserPreferences['notifications']): Promise<void> {
        await apiClient.patch('/preferences/user/notifications', { notifications });
    }

    async resetToDefaults(): Promise<UserPreferences> {
        const response = await apiClient.post<UserPreferences>('/preferences/user/reset');
        localStorage.removeItem('userPreferences');
        return response.data;
    }
}

export const preferencesService = new PreferencesService();
