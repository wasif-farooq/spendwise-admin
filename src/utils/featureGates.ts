import type { SubscriptionPlan } from '@/constants/subscriptionPlans';
import { PLAN_LIMITS } from '@/constants/subscriptionPlans';
import type { FeatureUsage } from '@/types/subscription.types';

/**
 * Check if a user has access to a specific feature based on their plan
 */
export function checkFeatureAccess(
    feature: string,
    plan: SubscriptionPlan,
    usage?: FeatureUsage
): boolean {
    const limits = PLAN_LIMITS[plan as keyof typeof PLAN_LIMITS];

    if (!limits) return false;

    switch (feature) {
        case 'ai-advisor':
            return limits.hasAIAdvisor;
        case 'exchange-rates':
            return limits.hasExchangeRates;
        case 'permission-overrides':
            return limits.hasPermissionOverrides;
        case 'members':
            if (!usage) return true;
            return limits.members === -1 || usage.members < limits.members;
        case 'accounts':
            if (!usage) return true;
            return limits.accounts === -1 || usage.accounts < limits.accounts;
        case 'organizations':
            if (!usage) return true;
            return limits.organizations === -1 || usage.organizations < limits.organizations;
        case 'customRoles':
            if (!usage) return true;
            return limits.customRoles === -1 || usage.customRoles < limits.customRoles;
        default:
            return true;
    }
}

/**
 * Get the limit for a specific feature based on plan
 */
export function getFeatureLimit(feature: string, plan: SubscriptionPlan): number {
    const limits = PLAN_LIMITS[plan as keyof typeof PLAN_LIMITS];

    if (!limits) return 0;

    switch (feature) {
        case 'members':
            return limits.members;
        case 'accounts':
            return limits.accounts;
        case 'organizations':
            return limits.organizations;
        case 'customRoles':
            return limits.customRoles;
        case 'transaction-history':
            return limits.transactionHistoryMonths;
        case 'analytics':
            return limits.analyticsHistoryDays;
        default:
            return -1;
    }
}

/**
 * Check if a feature is available on a specific plan (boolean features)
 */
export function isFeatureAvailable(feature: string, plan: SubscriptionPlan): boolean {
    const limits = PLAN_LIMITS[plan as keyof typeof PLAN_LIMITS];

    if (!limits) return false;

    switch (feature) {
        case 'ai-advisor':
            return limits.hasAIAdvisor;
        case 'exchange-rates':
            return limits.hasExchangeRates;
        case 'permission-overrides':
            return limits.hasPermissionOverrides;
        default:
            return true;
    }
}

/**
 * Get remaining quota for a feature
 */
export function getRemainingQuota(
    feature: string,
    plan: SubscriptionPlan,
    usage: FeatureUsage
): number {
    const limit = getFeatureLimit(feature, plan);

    if (limit === -1) return Infinity;

    switch (feature) {
        case 'members':
            return Math.max(0, limit - usage.members);
        case 'accounts':
            return Math.max(0, limit - usage.accounts);
        case 'organizations':
            return Math.max(0, limit - usage.organizations);
        case 'customRoles':
            return Math.max(0, limit - usage.customRoles);
        default:
            return Infinity;
    }
}

/**
 * Format limit value for display (-1 means unlimited)
 */
export function formatLimit(limit: number): string {
    return limit === -1 ? 'Unlimited' : limit.toString();
}

/**
 * Check if user can upgrade from current plan
 */
export function canUpgradeFrom(currentPlan: SubscriptionPlan): boolean {
    return currentPlan === 'free' || currentPlan === 'pro';
}

/**
 * Get suggested upgrade plan based on current plan
 */
export function getSuggestedUpgradePlan(currentPlan: SubscriptionPlan): SubscriptionPlan | null {
    switch (currentPlan) {
        case 'free':
            return 'pro';
        case 'pro':
            return 'enterprise';
        case 'enterprise':
            return null;
        default:
            return 'pro';
    }
}
