import React from 'react';
import { Alert, AlertTitle, AlertDescription } from '@ui';
import { Text } from '@shared';
import { useSubscriptionNotices } from '@/hooks/features/subscription/useSubscriptionNotices';

export interface TransactionNoticeProps {
    className?: string;
}

export const TransactionNotice: React.FC<TransactionNoticeProps> = ({ className = '' }) => {
    const { maxMonths } = useSubscriptionNotices();

    if (maxMonths === -1) {
        return null; // Unlimited access
    }

    return (
        <Alert variant="warning" className={className}>
            <AlertTitle>Transaction History Limited to {maxMonths} Months</AlertTitle>
            <AlertDescription>
                <Text size="sm">
                    Your current plan provides transaction history for the last {maxMonths} months.
                    Upgrade to access unlimited transaction history.
                </Text>
            </AlertDescription>
        </Alert>
    );
};

