import { useAppSelector } from './redux';
import {
    selectSubscriptionPlan,
    selectFeatureUsage,
    selectCanAddMember,
    selectCanAddAccount,
    selectCanAddOrganization,
    selectCanAddCustomRole,
    selectHasAIAdvisorAccess,
    selectHasExchangeRatesAccess,
    selectHasPermissionOverridesAccess,
    selectTransactionHistoryMonths,
    selectAnalyticsHistoryDays,
    selectMemberLimit,
    selectAccountLimit,
    selectOrganizationLimit,
    selectCustomRoleLimit,
} from '@/store/slices/subscriptionSlice';

export type FeatureName =
    | 'members'
    | 'accounts'
    | 'organizations'
    | 'customRoles'
    | 'ai-advisor'
    | 'exchange-rates'
    | 'permission-overrides'
    | 'transaction-history'
    | 'analytics';

export interface FeatureAccessResult {
    hasAccess: boolean;
    limit: number;
    current: number;
    remaining: number;
    canUpgrade: boolean;
    reason: string;
}

/**
 * Hook to check feature access based on subscription plan
 * @param feature - The feature to check access for
 * @returns Feature access information including limits and current usage
 */
export function useFeatureAccess(feature: FeatureName): FeatureAccessResult {
    const plan = useAppSelector(selectSubscriptionPlan);
    const usage = useAppSelector(selectFeatureUsage);

    // Feature-specific access checks
    const canAddMember = useAppSelector(selectCanAddMember);
    const canAddAccount = useAppSelector(selectCanAddAccount);
    const canAddOrganization = useAppSelector(selectCanAddOrganization);
    const canAddCustomRole = useAppSelector(selectCanAddCustomRole);
    const hasAIAdvisor = useAppSelector(selectHasAIAdvisorAccess);
    const hasExchangeRates = useAppSelector(selectHasExchangeRatesAccess);
    const hasPermissionOverrides = useAppSelector(selectHasPermissionOverridesAccess);
    const transactionHistoryMonths = useAppSelector(selectTransactionHistoryMonths);
    const analyticsHistoryDays = useAppSelector(selectAnalyticsHistoryDays);

    // Limits
    const memberLimit = useAppSelector(selectMemberLimit);
    const accountLimit = useAppSelector(selectAccountLimit);
    const organizationLimit = useAppSelector(selectOrganizationLimit);
    const customRoleLimit = useAppSelector(selectCustomRoleLimit);

    // Calculate result based on feature
    switch (feature) {
        case 'members':
            return {
                hasAccess: canAddMember,
                limit: memberLimit,
                current: usage.members,
                remaining: memberLimit === -1 ? Infinity : Math.max(0, memberLimit - usage.members),
                canUpgrade: plan === 'free',
                reason: canAddMember ? '' : `You've reached the limit of ${memberLimit} members on the ${plan} plan`,
            };

        case 'accounts':
            return {
                hasAccess: canAddAccount,
                limit: accountLimit,
                current: usage.accounts,
                remaining: accountLimit === -1 ? Infinity : Math.max(0, accountLimit - usage.accounts),
                canUpgrade: plan === 'free' || plan === 'pro',
                reason: canAddAccount ? '' : `You've reached the limit of ${accountLimit} account(s) on the ${plan} plan`,
            };

        case 'organizations':
            return {
                hasAccess: canAddOrganization,
                limit: organizationLimit,
                current: usage.organizations,
                remaining: organizationLimit === -1 ? Infinity : Math.max(0, organizationLimit - usage.organizations),
                canUpgrade: plan === 'free' || plan === 'pro',
                reason: canAddOrganization ? '' : `You've reached the limit of ${organizationLimit} organizations on the ${plan} plan`,
            };

        case 'customRoles':
            return {
                hasAccess: canAddCustomRole,
                limit: customRoleLimit,
                current: usage.customRoles,
                remaining: customRoleLimit === -1 ? Infinity : Math.max(0, customRoleLimit - usage.customRoles),
                canUpgrade: plan === 'free' || plan === 'pro',
                reason: canAddCustomRole ? '' : `You've reached the limit of ${customRoleLimit} custom role(s) on the ${plan} plan`,
            };

        case 'ai-advisor':
            return {
                hasAccess: hasAIAdvisor,
                limit: hasAIAdvisor ? -1 : 0,
                current: 0,
                remaining: hasAIAdvisor ? Infinity : 0,
                canUpgrade: !hasAIAdvisor,
                reason: hasAIAdvisor ? '' : 'AI Advisor is only available on Pro and Enterprise plans',
            };

        case 'exchange-rates':
            return {
                hasAccess: hasExchangeRates,
                limit: hasExchangeRates ? -1 : 0,
                current: 0,
                remaining: hasExchangeRates ? Infinity : 0,
                canUpgrade: !hasExchangeRates,
                reason: hasExchangeRates ? '' : 'Real-time Exchange Rates are only available on Pro and Enterprise plans',
            };

        case 'permission-overrides':
            return {
                hasAccess: hasPermissionOverrides,
                limit: hasPermissionOverrides ? -1 : 0,
                current: 0,
                remaining: hasPermissionOverrides ? Infinity : 0,
                canUpgrade: !hasPermissionOverrides,
                reason: hasPermissionOverrides ? '' : 'Permission Overrides are only available on Pro and Enterprise plans',
            };

        case 'transaction-history':
            return {
                hasAccess: true,
                limit: transactionHistoryMonths,
                current: 0,
                remaining: transactionHistoryMonths === -1 ? Infinity : transactionHistoryMonths,
                canUpgrade: transactionHistoryMonths !== -1,
                reason: transactionHistoryMonths === -1 ? '' : `Transaction history is limited to ${transactionHistoryMonths} months on the ${plan} plan`,
            };

        case 'analytics':
            return {
                hasAccess: true,
                limit: analyticsHistoryDays,
                current: 0,
                remaining: analyticsHistoryDays === -1 ? Infinity : analyticsHistoryDays,
                canUpgrade: analyticsHistoryDays !== -1,
                reason: analyticsHistoryDays === -1 ? '' : `Analytics data is limited to ${analyticsHistoryDays} days on the ${plan} plan`,
            };

        default:
            return {
                hasAccess: true,
                limit: -1,
                current: 0,
                remaining: Infinity,
                canUpgrade: false,
                reason: '',
            };
    }
}
