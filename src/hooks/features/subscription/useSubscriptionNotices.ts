import { useAppSelector } from '@/store/redux';
import { selectTransactionHistoryMonths, selectAnalyticsHistoryDays } from '@/store/slices/subscriptionSlice';

export const useSubscriptionNotices = () => {
    const maxMonths = useAppSelector(selectTransactionHistoryMonths);
    const maxDays = useAppSelector(selectAnalyticsHistoryDays);

    return {
        maxMonths,
        maxDays
    };
};

