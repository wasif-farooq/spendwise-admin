import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/redux';
import { selectPlans, selectCurrentPlan, upgradePlanThunk } from '@/store/slices/subscriptionSlice';
import { toast } from 'sonner';

export const useUpgradeModal = (onClose: () => void) => {
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

    return {
        plans,
        currentPlan,
        billingPeriod,
        setBillingPeriod,
        loading,
        handleUpgrade
    };
};
