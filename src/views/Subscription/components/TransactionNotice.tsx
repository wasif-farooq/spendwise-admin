import React from 'react';
import { Alert, AlertTitle, AlertDescription } from '@ui';
import { useAppSelector } from '@/store/redux';
import { selectTransactionHistoryMonths } from '@/store/slices/subscriptionSlice';
import { Text } from '@shared';

export interface TransactionNoticeProps {
    className?: string;
}

export const TransactionNotice: React.FC<TransactionNoticeProps> = ({ className = '' }) => {
    const maxMonths = useAppSelector(selectTransactionHistoryMonths);

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
