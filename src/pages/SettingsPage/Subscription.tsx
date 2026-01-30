import { motion } from 'framer-motion';
import { Block, Grid } from '@shared';

import { SubscriptionHeader } from '@/views/Settings/Subscription/SubscriptionHeader';
import { SubscriptionPlan } from '@/views/Settings/Subscription/SubscriptionPlan';
import { RecentPayments } from '@/views/Settings/Subscription/RecentPayments';
import mockData from '@/data/mockData.json';

const Subscription = () => {

    const currentPlan = mockData.subscription.currentPlan;
    // Cast the status string to the specific union type required by RecentPayments
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
                <SubscriptionPlan plan={currentPlan} />
                <RecentPayments payments={recentPayments} />
            </Grid>
        </Block>
    );
};

export default Subscription;
