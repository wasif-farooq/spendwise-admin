import type { AxiosRequestConfig, AxiosResponse } from 'axios';
import mockAuthData from '../services/auth/authMockData.json';
import mockSubscriptionData from '../services/subscription/subscriptionMockData.json';

class MockAdapter {
    private mockDataRegistry: Map<string, any> = new Map();
    private delay = 300; // Simulate network delay
    private currentUserId = 'user-001'; // Default to user-001

    registerMockData(endpoint: string, data: any) {
        this.mockDataRegistry.set(endpoint, data);
    }

    async handleRequest(config: AxiosRequestConfig): Promise<AxiosResponse> {
        await this.simulateDelay();

        // Special handling for login endpoint
        if (config.url?.includes('/auth/login') && config.method?.toUpperCase() === 'POST') {
            return this.handleLogin(config);
        }

        // Special handling for 2FA verification endpoint
        if (config.url?.includes('/auth/2fa/verify') && config.method?.toUpperCase() === 'POST') {
            return this.handle2FAVerification(config);
        }

        // Special handling for subscription endpoints
        if (config.url?.includes('/subscription/plans') && config.method?.toUpperCase() === 'GET') {
            return this.handleGetPlans(config);
        }

        if (config.url?.includes('/subscription/current') && config.method?.toUpperCase() === 'GET') {
            return this.handleGetUserSubscription(config);
        }

        if (config.url?.includes('/subscription/upgrade') && config.method?.toUpperCase() === 'POST') {
            return this.handleUpgradePlan(config);
        }

        if (config.url?.includes('/subscription/cancel') && config.method?.toUpperCase() === 'POST') {
            return this.handleCancelSubscription(config);
        }

        if (config.url?.includes('/subscription/usage') && config.method?.toUpperCase() === 'GET') {
            return this.handleGetFeatureUsage(config);
        }

        if (config.url?.includes('/subscription/check-access/') && config.method?.toUpperCase() === 'GET') {
            return this.handleCheckFeatureAccess(config);
        }

        const mockData = this.findMockData(config.url || '');

        if (!mockData) {
            console.warn(`⚠️ No mock data found for ${config.url}`);
            throw new Error(`No mock data registered for endpoint: ${config.url}`);
        }

        // Handle different HTTP methods
        const method = config.method?.toUpperCase() || 'GET';
        let responseData = mockData;

        switch (method) {
            case 'POST':
                // For POST, you might want to return the created item
                responseData = { ...config.data, id: Date.now().toString() };
                break;
            case 'PUT':
            case 'PATCH':
                // For PUT/PATCH, return the updated item
                responseData = { ...mockData, ...config.data };
                break;
            case 'DELETE':
                // For DELETE, return success message
                responseData = { success: true, message: 'Deleted successfully' };
                break;
            default:
                // GET returns the mock data as-is
                responseData = mockData;
        }

        return {
            data: responseData,
            status: 200,
            statusText: 'OK',
            headers: {},
            config: config as any,
        };
    }

    private async handleLogin(config: AxiosRequestConfig): Promise<AxiosResponse> {
        const { email, password } = config.data || {};

        // Find user with matching credentials
        const user = mockAuthData.users.find(
            (u: any) => u.email === email && u.password === password
        );

        if (!user) {
            // ... (error handling)
            const error: any = new Error('Invalid credentials');
            error.response = {
                data: null,
                status: 401,
                statusText: 'Unauthorized',
                headers: {},
                config: config as any,
            };
            error.config = config;
            throw error;
        }

        // Set current user ID
        this.currentUserId = user.id;
        console.log(`[MockAdapter] Logged in as ${user.name} (${user.id})`);

        // ... (rest of handleLogin)
        // Check if user has 2FA enabled
        if (user.twoFactorEnabled) {
            // Return 2FA required response
            return {
                data: {
                    requiresTwoFactor: true,
                    availableMethods: user.twoFactorMethods,
                    tempToken: `temp-token-${user.id}-${Date.now()}`,
                },
                status: 200,
                statusText: 'OK',
                headers: {},
                config: config as any,
            };
        }

        // User doesn't have 2FA, return full auth response
        const { password: _, twoFactorEnabled, twoFactorMethods, backupCodes, ...userWithoutSensitiveData } = user;

        return {
            data: {
                user: userWithoutSensitiveData,
                token: mockAuthData.token,
                refreshToken: mockAuthData.refreshToken,
            },
            status: 200,
            statusText: 'OK',
            headers: {},
            config: config as any,
        };
    }

    private async handle2FAVerification(config: AxiosRequestConfig): Promise<AxiosResponse> {
        const { code, tempToken, backupCode } = config.data || {};

        // Extract user ID from temp token (format: temp-token-{userId}-{timestamp})
        // Match everything after 'temp-token-' until the last hyphen
        const tokenMatch = tempToken?.match(/^temp-token-(.+)-\d+$/);
        if (!tokenMatch) {
            const error: any = new Error('Invalid or expired token');
            error.response = {
                data: null,
                status: 401,
                statusText: 'Unauthorized',
                headers: {},
                config: config as any,
            };
            error.config = config;
            throw error;
        }

        const userId = tokenMatch[1];
        const user = mockAuthData.users.find((u: any) => u.id === userId);

        if (!user) {
            const error: any = new Error('User not found');
            error.response = {
                data: null,
                status: 404,
                statusText: 'Not Found',
                headers: {},
                config: config as any,
            };
            error.config = config;
            throw error;
        }

        // For mock purposes, accept any 6-digit code or valid backup code
        const isValidCode = backupCode
            ? user.backupCodes?.includes(code)
            : /^\d{6}$/.test(code);

        if (!isValidCode) {
            const error: any = new Error('Invalid verification code');
            error.response = {
                data: null,
                status: 401,
                statusText: 'Unauthorized',
                headers: {},
                config: config as any,
            };
            error.config = config;
            throw error;
        }

        // Return full auth response
        const { password: _, twoFactorEnabled, twoFactorMethods, backupCodes, ...userWithoutSensitiveData } = user;

        return {
            data: {
                user: userWithoutSensitiveData,
                token: mockAuthData.token,
                refreshToken: mockAuthData.refreshToken,
            },
            status: 200,
            statusText: 'OK',
            headers: {},
            config: config as any,
        };
    }

    // Subscription Handlers
    private async handleGetPlans(config: AxiosRequestConfig): Promise<AxiosResponse> {
        return {
            data: {
                plans: mockSubscriptionData.plans,
            },
            status: 200,
            statusText: 'OK',
            headers: {},
            config: config as any,
        };
    }

    // handleGetUserSubscription is already present

    private async handleUpgradePlan(config: AxiosRequestConfig): Promise<AxiosResponse> {
        const { planId } = config.data || {};

        if (!planId) {
            const error: any = new Error('Plan ID is required');
            error.response = {
                data: { message: 'Plan ID is required' },
                status: 400,
                statusText: 'Bad Request',
                headers: {},
                config: config as any,
            };
            error.config = config;
            throw error;
        }

        // Simulate successful upgrade
        return {
            data: {
                subscription: {
                    plan: planId,
                    status: 'active',
                    startDate: new Date().toISOString(),
                    expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
                    cancelledAt: null,
                    trialEndsAt: null,
                },
                message: `Successfully upgraded to ${planId} plan`,
            },
            status: 200,
            statusText: 'OK',
            headers: {},
            config: config as any,
        };
    }

    private async handleCancelSubscription(config: AxiosRequestConfig): Promise<AxiosResponse> {
        return {
            data: {
                message: 'Subscription cancelled successfully',
            },
            status: 200,
            statusText: 'OK',
            headers: {},
            config: config as any,
        };
    }

    // handleGetFeatureUsage is already present

    private async handleGetUserSubscription(config: AxiosRequestConfig): Promise<AxiosResponse> {
        const userId = this.currentUserId;
        console.log(`[MockAdapter] Getting subscription for user: ${userId}`);

        const userSubscription = mockSubscriptionData.userSubscriptions.find(
            (sub: any) => sub.userId === userId
        );

        if (!userSubscription) {
            console.error(`[MockAdapter] Subscription NOT FOUND for user ${userId}`);
            // ...
            const error: any = new Error('Subscription not found');
            error.response = {
                data: { message: 'Subscription not found' },
                status: 404,
                statusText: 'Not Found',
                headers: {},
                config: config as any,
            };
            error.config = config;
            throw error;
        }

        console.log(`[MockAdapter] Found subscription:`, userSubscription);

        return {
            data: {
                subscription: {
                    plan: userSubscription.plan,
                    status: userSubscription.status,
                    startDate: userSubscription.startDate,
                    expiresAt: userSubscription.expiresAt,
                    cancelledAt: userSubscription.cancelledAt,
                    trialEndsAt: userSubscription.trialEndsAt,
                },
                featureUsage: userSubscription.featureUsage,
            },
            status: 200,
            statusText: 'OK',
            headers: {},
            config: config as any,
        };
    }

    // ... (handleUpgradePlan)
    // ... (handleCancelSubscription)

    private async handleGetFeatureUsage(config: AxiosRequestConfig): Promise<AxiosResponse> {
        const userId = this.currentUserId;
        console.log(`[MockAdapter] Getting feature usage for user: ${userId}`);

        const userSubscription = mockSubscriptionData.userSubscriptions.find(
            (sub: any) => sub.userId === userId
        );

        if (!userSubscription) {
            console.error(`[MockAdapter] User subscription not found for ${userId} in usage check`);
        } else {
            console.log(`[MockAdapter] Found subscription for ${userId} in usage check`, userSubscription);
        }

        // FAIL SAFE: If user not found, assume MAX usage to prevent leaks
        const defaultUsage = userSubscription ? {
            members: 0,
            accounts: 0,
            organizations: 0,
            customRoles: 0,
        } : {
            members: 9999,
            accounts: 9999,
            organizations: 9999,
            customRoles: 9999,
        };

        const usage = userSubscription?.featureUsage || defaultUsage;

        console.log(`[MockAdapter] Returning usage:`, usage);

        return {
            data: {
                usage,
            },
            status: 200,
            statusText: 'OK',
            headers: {},
            config: config as any,
        };
    }

    private async handleCheckFeatureAccess(config: AxiosRequestConfig): Promise<AxiosResponse> {
        const feature = config.url?.split('/').pop();
        const userId = this.currentUserId;
        // ...
        const userSubscription = mockSubscriptionData.userSubscriptions.find(
            (sub: any) => sub.userId === userId
        );

        if (!userSubscription) {
            return {
                data: {
                    hasAccess: false,
                    reason: 'No active subscription',
                },
                status: 200,
                statusText: 'OK',
                headers: {},
                config: config as any,
            };
        }

        const plan = mockSubscriptionData.plans.find((p: any) => p.id === userSubscription.plan);

        if (!plan) {
            return {
                data: {
                    hasAccess: false,
                    reason: 'Invalid plan',
                },
                status: 200,
                statusText: 'OK',
                headers: {},
                config: config as any,
            };
        }

        // Check feature access based on plan limits
        let hasAccess = true;
        let reason = '';

        switch (feature) {
            case 'ai-advisor':
                hasAccess = plan.limits.hasAIAdvisor;
                reason = hasAccess ? '' : 'AI Advisor is only available on Pro and Enterprise plans';
                break;
            case 'exchange-rates':
                hasAccess = plan.limits.hasExchangeRates;
                reason = hasAccess ? '' : 'Exchange Rates is only available on Pro and Enterprise plans';
                break;
            case 'permission-overrides':
                hasAccess = plan.limits.hasPermissionOverrides;
                reason = hasAccess ? '' : 'Permission Overrides is only available on Pro and Enterprise plans';
                break;
            default:
                hasAccess = true;
        }

        return {
            data: {
                hasAccess,
                reason,
            },
            status: 200,
            statusText: 'OK',
            headers: {},
            config: config as any,
        };
    }

    private findMockData(url: string): any {
        // Match URL patterns to mock data
        for (const [pattern, data] of this.mockDataRegistry.entries()) {
            if (url.includes(pattern)) {
                return data;
            }
        }
        return null;
    }

    private simulateDelay(): Promise<void> {
        const randomDelay = this.delay + Math.random() * 200; // Add some randomness
        return new Promise((resolve) => setTimeout(resolve, randomDelay));
    }
}

export const mockAdapter = new MockAdapter();
