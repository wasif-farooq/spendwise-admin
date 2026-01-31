import React from 'react';
import { Alert, AlertTitle, AlertDescription } from '@ui';
import { Text } from '@shared';
import { useSubscriptionNotices } from '@/hooks/features/subscription/useSubscriptionNotices';

export interface DateRangeNoticeProps {
    className?: string;
}

export const DateRangeNotice: React.FC<DateRangeNoticeProps> = ({ className = '' }) => {
    const { maxDays } = useSubscriptionNotices();

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

