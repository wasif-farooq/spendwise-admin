import { useAppDispatch, useAppSelector } from '@hooks/redux';
import { toggleBillingCycle } from '@store/uiSlice';

export const usePricing = () => {
    const dispatch = useAppDispatch();
    const isYearly = useAppSelector((state: any) => state.ui.isYearlyBilling);

    const handleToggleBilling = () => {
        dispatch(toggleBillingCycle());
    };

    return {
        isYearly,
        handleToggleBilling
    };
};
