import { motion } from 'framer-motion';
import { Block, Grid } from '@shared';
import { useState } from 'react';
import { useAppSelector } from '@/store/redux';
import { selectSubscriptionPlan, selectSubscription } from '@/store/slices/subscriptionSlice';
import { UpgradeModal } from '@/views/Subscription';

import { SubscriptionHeader } from '@/views/Settings/Subscription/SubscriptionHeader';
import { SubscriptionPlan } from '@/views/Settings/Subscription/SubscriptionPlan';
import { RecentPayments } from '@/views/Settings/Subscription/RecentPayments';
import mockData from '@/data/mockData.json';

const Subscription = () => {
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

    return (
        <Block
            as={motion.div}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-12"
        >
            <SubscriptionHeader />

            <Grid cols={1} gap={8}>
                <SubscriptionPlan
                    plan={planDisplay}
                    onAction={!isPro ? () => setIsUpgradeModalOpen(true) : undefined}
                    actionLabel={!isPro ? "Upgrade to Pro" : "Current Plan"}
                />
                <RecentPayments payments={recentPayments} />
            </Grid>

            <UpgradeModal
                isOpen={isUpgradeModalOpen}
                onClose={() => setIsUpgradeModalOpen(false)}
            />
        </Block>
    );
};

export default Subscription;
