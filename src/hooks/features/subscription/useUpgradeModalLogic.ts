import { useState } from 'react';
import { useToggle } from '@/hooks/useToggle';
import { useAppDispatch, useAppSelector } from '@/store/redux';
import { selectPlans, selectCurrentPlan, upgradePlanThunk } from '@/store/slices/subscriptionSlice';
import { toast } from 'sonner';

export const useUpgradeModal = (onClose: () => void) => {
    const dispatch = useAppDispatch();
    const plans = selectPlans();
    const currentPlan = useAppSelector(selectCurrentPlan);
    const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');
    const loading = useToggle(false);

    const handleUpgrade = async (planId: string) => {
        loading.setTrue();
        try {
            await dispatch(upgradePlanThunk({ planId, billingPeriod })).unwrap();
            toast.success(`Successfully upgraded to ${planId} plan!`);
            onClose();
        } catch (error) {
            toast.error('Failed to upgrade plan. Please try again.');
        } finally {
            loading.setFalse();
        }
    };

    return {
        plans,
        currentPlan,
        billingPeriod,
        setBillingPeriod,
        loading: loading.value,
        handleUpgrade
    };
};
