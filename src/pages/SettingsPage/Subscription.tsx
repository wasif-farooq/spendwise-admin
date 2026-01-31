import { motion } from 'framer-motion';
import { Block, Grid } from '@shared';
import { UpgradeModal } from '@/views/Subscription';
import { SubscriptionHeader } from '@/views/Settings/Subscription/SubscriptionHeader';
import { SubscriptionPlan } from '@/views/Settings/Subscription/SubscriptionPlan';
import { RecentPayments } from '@/views/Settings/Subscription/RecentPayments';
import { useSubscriptionSettings } from '@/hooks/features/settings/useSubscriptionSettings';

const Subscription = () => {
    const {
        isPro,
        planDisplay,
        recentPayments,
        isUpgradeModalOpen,
        setIsUpgradeModalOpen
    } = useSubscriptionSettings();

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

