import React, { useState } from 'react';
import { Modal } from '@ui';
import { Block, Text, Heading, Flex } from '@shared';
import { BillingToggle } from './BillingToggle';
import { PlanCard } from './PlanCard';
import { useAppDispatch, useAppSelector } from '@/store/redux';
import { selectPlans, selectCurrentPlan, upgradePlanThunk } from '@/store/slices/subscriptionSlice';
import { toast } from 'sonner';
import { Sparkles } from 'lucide-react';

export interface UpgradeModalProps {
    isOpen: boolean;
    onClose: () => void;
    triggerFeature?: string;
}

export const UpgradeModal: React.FC<UpgradeModalProps> = ({
    isOpen,
    onClose,
    triggerFeature,
}) => {
    const dispatch = useAppDispatch();
    const plans = selectPlans();
    const currentPlan = useAppSelector(selectCurrentPlan);
    const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');
    const [loading, setLoading] = useState(false);

    const handleUpgrade = async (planId: string) => {
        setLoading(true);
        try {
            await dispatch(upgradePlanThunk({ planId, billingPeriod })).unwrap();
            toast.success(`Successfully upgraded to ${planId} plan!`);
            onClose();
        } catch (error) {
            toast.error('Failed to upgrade plan. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="" maxWidth="max-w-5xl">
            <Block className="py-2">
                {/* Header Section */}
                <Flex direction="col" align="center" gap={3} className="mb-8">
                    <Flex align="center" gap={2}>
                        <Sparkles className="h-6 w-6 text-blue-500" />
                        <Heading size="3xl" weight="bold" color="text-gray-900">
                            Upgrade Your Plan
                        </Heading>
                    </Flex>
                    <Text size="lg" color="text-gray-600" className="text-center max-w-2xl">
                        Choose the plan that's right for you and unlock powerful features
                    </Text>
                </Flex>

                {/* Contextual Message */}
                {triggerFeature && (
                    <Block className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <Flex align="center" gap={2}>
                            <Sparkles className="h-5 w-5 text-blue-600 flex-shrink-0" />
                            <Text size="sm" color="text-blue-900">
                                <Text as="span" weight="bold">
                                    {triggerFeature}
                                </Text>{' '}
                                is a premium feature. Upgrade to unlock it and more!
                            </Text>
                        </Flex>
                    </Block>
                )}

                {/* Billing Toggle */}
                <Flex justify="center" className="mb-8">
                    <BillingToggle billingPeriod={billingPeriod} onToggle={setBillingPeriod} />
                </Flex>

                {/* Plan Cards Grid */}
                <Block className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-6">
                    {plans.map((plan) => (
                        <PlanCard
                            key={plan.id}
                            plan={plan}
                            billingPeriod={billingPeriod}
                            isCurrentPlan={currentPlan === plan.id}
                            isPopular={plan.id === 'pro'}
                            onSelect={() => handleUpgrade(plan.id)}
                            loading={loading}
                        />
                    ))}
                </Block>

                {/* Footer Note */}
                <Block className="text-center pt-4 border-t border-gray-100">
                    <Text size="sm" color="text-gray-500">
                        ✨ All plans include a 14-day free trial • Cancel anytime • No credit card required
                    </Text>
                </Block>
            </Block>
        </Modal>
    );
};

export default UpgradeModal;
