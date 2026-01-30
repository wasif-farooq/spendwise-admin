import { motion } from 'framer-motion';
import { Block, Grid } from '@shared';

import { BillingHeader } from '@/views/Manage/Billing/BillingHeader';
import { PlanOverview } from '@/views/Manage/Billing/PlanOverview';
import { PaymentMethods } from '@/views/Manage/Billing/PaymentMethods';
import { BillingHistory } from '@/views/Manage/Billing/BillingHistory';
import mockData from '@/data/mockData.json';

const Billing = () => {

    const currentPlan = mockData.billing.currentPlan;
    const paymentMethods = mockData.billing.paymentMethods;
    const billingHistory = mockData.billing.history;

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
