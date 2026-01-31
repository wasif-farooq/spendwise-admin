import type { SubscriptionPlan, SubscriptionStatus } from '@/constants/subscriptionPlans';

export interface UserSubscription {
    plan: SubscriptionPlan;
    status: SubscriptionStatus;
    startDate: string;
    expiresAt: string | null;
    cancelledAt: string | null;
    trialEndsAt: string | null;
}

export interface FeatureUsage {
    members: number;
    accounts: number;
    organizations: number;
    customRoles: number;
}

export interface SubscriptionPlanDetails {
    id: SubscriptionPlan;
    name: string;
    description: string;
    price: {
        monthly: number;
        yearly: number;
    };
    features: string[];
}

export interface SubscriptionState {
    currentSubscription: UserSubscription | null;
    featureUsage: FeatureUsage;
    loading: boolean;
    error: string | null;
}
