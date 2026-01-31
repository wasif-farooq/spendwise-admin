import { useState } from 'react';
import { useAppSelector } from '@/store/redux';
import { selectSubscriptionPlan, selectSubscription } from '@/store/slices/subscriptionSlice';
import mockData from '@/data/mockData.json';

export const useSubscriptionSettings = () => {
    const currentPlanId = useAppSelector(selectSubscriptionPlan);
    const subscription = useAppSelector(selectSubscription);
    const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);

    // Get current plan details
    const isPro = currentPlanId === 'pro';

    // Construct plan object for display
    const planDisplay = {
        name: isPro ? 'Pro Plan' : 'Free Plan',
        price: isPro ? '$19' : '$0',
        period: 'month',
        nextBilling: subscription?.expiresAt ? new Date(subscription.expiresAt).toLocaleDateString() : 'Never',
        status: subscription?.status || 'active',
        features: isPro ? [
            'Unlimited team members',
            'Unlimited accounts',
            'AI Advisor Access',
            'Unlimited history'
        ] : [
            '2 team members',
            '1 account',
            'Basic analytics',
            '3 months history'
        ]
    };

    const recentPayments = mockData.subscription.recentPayments.map(p => ({
        ...p,
        status: p.status as 'Paid' | 'Pending' | 'Failed'
    }));

    return {
        isPro,
        planDisplay,
        recentPayments,
        isUpgradeModalOpen,
        setIsUpgradeModalOpen
    };
};
