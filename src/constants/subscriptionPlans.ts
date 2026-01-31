export const SubscriptionPlan = {
    FREE: 'free',
    PRO: 'pro',
    ENTERPRISE: 'enterprise'
} as const;

export type SubscriptionPlan = typeof SubscriptionPlan[keyof typeof SubscriptionPlan];

export const SubscriptionStatus = {
    ACTIVE: 'active',
    TRIAL: 'trial',
    EXPIRED: 'expired',
    CANCELLED: 'cancelled'
} as const;

export type SubscriptionStatus = typeof SubscriptionStatus[keyof typeof SubscriptionStatus];

export interface PlanLimits {
    members: number;
    accounts: number;
    organizations: number;
    customRoles: number;
    transactionHistoryMonths: number;
    analyticsHistoryDays: number;
    hasAIAdvisor: boolean;
    hasExchangeRates: boolean;
    hasPermissionOverrides: boolean;
}

export interface PlanFeature {
    name: string;
    description: string;
    included: boolean;
    limit?: number | string;
}

export interface SubscriptionPlanDetails {
    id: SubscriptionPlan;
    name: string;
    price: number;
    currency: string;
    billingPeriod: 'monthly' | 'yearly';
    description: string;
    features: PlanFeature[];
    limits: PlanLimits;
    popular?: boolean;
}

// Plan Limits Configuration
export const PLAN_LIMITS: Record<SubscriptionPlan, PlanLimits> = {
    [SubscriptionPlan.FREE]: {
        members: 2,
        accounts: 1,
        organizations: 5,
        customRoles: 1,
        transactionHistoryMonths: 3,
        analyticsHistoryDays: 30,
        hasAIAdvisor: false,
        hasExchangeRates: false,
        hasPermissionOverrides: false,
    },
    [SubscriptionPlan.PRO]: {
        members: -1, // unlimited
        accounts: -1, // unlimited
        organizations: -1, // unlimited
        customRoles: -1, // unlimited
        transactionHistoryMonths: -1, // unlimited
        analyticsHistoryDays: -1, // unlimited
        hasAIAdvisor: true,
        hasExchangeRates: false,
        hasPermissionOverrides: true,
    },
    [SubscriptionPlan.ENTERPRISE]: {
        members: -1, // unlimited
        accounts: -1, // unlimited
        organizations: -1, // unlimited
        customRoles: -1, // unlimited
        transactionHistoryMonths: -1, // unlimited
        analyticsHistoryDays: -1, // unlimited
        hasAIAdvisor: true,
        hasExchangeRates: true,
        hasPermissionOverrides: true,
    },
};

// Subscription Plans Details
export const SUBSCRIPTION_PLANS: SubscriptionPlanDetails[] = [
    {
        id: SubscriptionPlan.FREE,
        name: 'Free',
        price: 0,
        currency: 'USD',
        billingPeriod: 'monthly',
        description: 'Perfect for getting started with basic expense tracking',
        features: [
            { name: 'Team Members', description: 'Invite team members', included: true, limit: '2 members' },
            { name: 'Accounts', description: 'Manage financial accounts', included: true, limit: '1 account' },
            { name: 'Transaction History', description: 'View past transactions', included: true, limit: '3 months' },
            { name: 'Analytics', description: 'Basic analytics dashboard', included: true, limit: '30 days' },
            { name: 'Organizations', description: 'Join organizations', included: true, limit: '5 organizations' },
            { name: 'Custom Roles', description: 'Create custom roles', included: true, limit: '1 role' },
            { name: 'AI Advisor', description: 'AI-powered financial insights', included: false },
            { name: 'Exchange Rates', description: 'Real-time exchange rates', included: false },
            { name: 'Permission Overrides', description: 'Advanced permission controls', included: false },
        ],
        limits: PLAN_LIMITS[SubscriptionPlan.FREE],
    },
    {
        id: SubscriptionPlan.PRO,
        name: 'Pro',
        price: 29,
        currency: 'USD',
        billingPeriod: 'monthly',
        description: 'For growing teams that need more power and flexibility',
        popular: true,
        features: [
            { name: 'Team Members', description: 'Invite team members', included: true, limit: '10 members' },
            { name: 'Accounts', description: 'Manage financial accounts', included: true, limit: '5 accounts' },
            { name: 'Transaction History', description: 'View past transactions', included: true, limit: 'Unlimited' },
            { name: 'Analytics', description: 'Advanced analytics dashboard', included: true, limit: 'Unlimited' },
            { name: 'Organizations', description: 'Join organizations', included: true, limit: '20 organizations' },
            { name: 'Custom Roles', description: 'Create custom roles', included: true, limit: 'Unlimited' },
            { name: 'AI Advisor', description: 'AI-powered financial insights', included: true },
            { name: 'Exchange Rates', description: 'Real-time exchange rates', included: true },
            { name: 'Permission Overrides', description: 'Advanced permission controls', included: true },
        ],
        limits: PLAN_LIMITS[SubscriptionPlan.PRO],
    },
    {
        id: SubscriptionPlan.ENTERPRISE,
        name: 'Enterprise',
        price: 99,
        currency: 'USD',
        billingPeriod: 'monthly',
        description: 'For large organizations with advanced needs',
        features: [
            { name: 'Team Members', description: 'Invite team members', included: true, limit: 'Unlimited' },
            { name: 'Accounts', description: 'Manage financial accounts', included: true, limit: 'Unlimited' },
            { name: 'Transaction History', description: 'View past transactions', included: true, limit: 'Unlimited' },
            { name: 'Analytics', description: 'Enterprise analytics', included: true, limit: 'Unlimited' },
            { name: 'Organizations', description: 'Join organizations', included: true, limit: 'Unlimited' },
            { name: 'Custom Roles', description: 'Create custom roles', included: true, limit: 'Unlimited' },
            { name: 'AI Advisor', description: 'AI-powered financial insights', included: true },
            { name: 'Exchange Rates', description: 'Real-time exchange rates', included: true },
            { name: 'Permission Overrides', description: 'Advanced permission controls', included: true },
            { name: 'Priority Support', description: '24/7 dedicated support', included: true },
            { name: 'Custom Integrations', description: 'API access and custom integrations', included: true },
        ],
        limits: PLAN_LIMITS[SubscriptionPlan.ENTERPRISE],
    },
];
