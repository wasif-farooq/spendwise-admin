import React from 'react';
import { Alert, AlertTitle, AlertDescription } from '@ui';
import { useAppSelector } from '@/store/redux';
import { selectAnalyticsHistoryDays } from '@/store/slices/subscriptionSlice';
import { Text } from '@shared';

export interface DateRangeNoticeProps {
    className?: string;
}

export const DateRangeNotice: React.FC<DateRangeNoticeProps> = ({ className = '' }) => {
    const maxDays = useAppSelector(selectAnalyticsHistoryDays);

    if (maxDays === -1) {
        return null; // Unlimited access
    }

    return (
        <Alert variant="info" className={className}>
            <AlertTitle>Analytics Limited to {maxDays} Days</AlertTitle>
            <AlertDescription>
                <Text size="sm">
                    Your current plan provides analytics data for the last {maxDays} days.
                    Upgrade to Pro or Enterprise for unlimited historical data.
                </Text>
            </AlertDescription>
        </Alert>
    );
};
