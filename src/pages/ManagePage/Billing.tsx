import { motion } from 'framer-motion';
import { Block, Grid } from '@shared';

import { BillingHeader } from '@/views/Manage/Billing/BillingHeader';
import { PlanOverview } from '@/views/Manage/Billing/PlanOverview';
import { PaymentMethods } from '@/views/Manage/Billing/PaymentMethods';
import { BillingHistory } from '@/views/Manage/Billing/BillingHistory';

const Billing = () => {

    const currentPlan = {
        name: 'Premium Plan',
        price: '$29',
        period: 'month',
        nextBilling: 'Feb 29, 2026',
        status: 'Active',
        features: [
            'Up to 20 team members',
            'Unlimited transactions',
            'Advanced reporting',
            'Priority support',
            'Custom categories'
        ]
    };

    const paymentMethods = [
        { id: 1, type: 'Visa', last4: '4242', expiry: '12/26', isDefault: true },
        { id: 2, type: 'Mastercard', last4: '8888', expiry: '08/25', isDefault: false },
    ];

    const billingHistory = [
        { id: 'INV-001', date: 'Jan 29, 2026', amount: '$29.00', status: 'Paid' },
        { id: 'INV-002', date: 'Dec 29, 2025', amount: '$29.00', status: 'Paid' },
        { id: 'INV-003', date: 'Nov 29, 2025', amount: '$29.00', status: 'Paid' },
    ];

    return (
        <Block
            as={motion.div}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-12"
        >
            <BillingHeader />

            <Grid cols={1} gap={8} className="lg:grid-cols-3">
                {/* Plan Overview */}
                <Block className="lg:col-span-2 space-y-8">
                    <PlanOverview currentPlan={currentPlan} />
                    <PaymentMethods paymentMethods={paymentMethods} />
                </Block>

                {/* Billing History */}
                <BillingHistory billingHistory={billingHistory} />
            </Grid>
        </Block>
    );
};

export default Billing;
