import { apiClient } from '@/api/client/apiClient';
import type { SubscriptionPlanDetails } from '@/constants/subscriptionPlans';
import type { UserSubscription, FeatureUsage } from '@/types/subscription.types';

export interface GetPlansResponse {
    plans: SubscriptionPlanDetails[];
}

export interface GetUserSubscriptionResponse {
    subscription: UserSubscription;
    featureUsage: FeatureUsage;
}

export interface UpgradePlanRequest {
    planId: string;
    billingPeriod: 'monthly' | 'yearly';
}

export interface UpgradePlanResponse {
    subscription: UserSubscription;
    message: string;
}

class SubscriptionService {
    /**
     * Get all available subscription plans
     */
    async getPlans(): Promise<SubscriptionPlanDetails[]> {
        const response = await apiClient.get<GetPlansResponse>('/subscription/plans');
        return response.data.plans;
    }

    /**
     * Get current user's subscription details
     */
    async getUserSubscription(): Promise<GetUserSubscriptionResponse> {
        const response = await apiClient.get<GetUserSubscriptionResponse>('/subscription/current');
        return response.data;
    }

    /**
     * Upgrade to a new plan
     */
    async upgradePlan(data: UpgradePlanRequest): Promise<UpgradePlanResponse> {
        const response = await apiClient.post<UpgradePlanResponse>('/subscription/upgrade', data);
        return response.data;
    }

    /**
     * Cancel current subscription
     */
    async cancelSubscription(): Promise<{ message: string }> {
        const response = await apiClient.post<{ message: string }>('/subscription/cancel');
        return response.data;
    }

    /**
     * Check if user has access to a specific feature
     */
    async checkFeatureAccess(feature: string): Promise<{ hasAccess: boolean; reason?: string }> {
        const response = await apiClient.get<{ hasAccess: boolean; reason?: string }>(
            `/subscription/check-access/${feature}`
        );
        return response.data;
    }

    /**
     * Get feature usage statistics
     */
    async getFeatureUsage(): Promise<FeatureUsage> {
        const response = await apiClient.get<{ usage: FeatureUsage }>('/subscription/usage');
        return response.data.usage;
    }
}

export default new SubscriptionService();
