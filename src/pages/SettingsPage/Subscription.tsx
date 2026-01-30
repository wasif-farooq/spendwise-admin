import { motion } from 'framer-motion';
import { Block, Grid } from '@shared';

import { SubscriptionHeader } from '@/views/Settings/Subscription/SubscriptionHeader';
import { SubscriptionPlan } from '@/views/Settings/Subscription/SubscriptionPlan';
import { RecentPayments } from '@/views/Settings/Subscription/RecentPayments';

const Subscription = () => {

    const currentPlan = {
        name: 'Pro Member',
        price: '$12',
        period: 'month',
        nextBilling: 'Feb 14, 2026',
        status: 'Active',
        features: [
            'Unlimited personal accounts',
            'AI Advisor access',
            'Advanced analytics',
            'Priority support',
            'Export to CSV/PDF'
        ]
    };

    const recentPayments = [
        { id: 'SUB-8821', date: 'Jan 14, 2026', amount: '$12.00', status: 'Paid' as const, method: 'Visa ending 4242' },
        { id: 'SUB-7734', date: 'Dec 14, 2025', amount: '$12.00', status: 'Paid' as const, method: 'Visa ending 4242' },
        { id: 'SUB-6612', date: 'Nov 14, 2025', amount: '$12.00', status: 'Paid' as const, method: 'Visa ending 4242' },
        { id: 'SUB-5590', date: 'Oct 14, 2025', amount: '$12.00', status: 'Pending' as const, method: 'Visa ending 4242' },
    ];

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
