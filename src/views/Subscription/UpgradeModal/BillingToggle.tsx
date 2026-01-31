import React from 'react';
import { Block, Flex, Text } from '@shared';

export interface BillingToggleProps {
    billingPeriod: 'monthly' | 'yearly';
    onToggle: (period: 'monthly' | 'yearly') => void;
}

export const BillingToggle: React.FC<BillingToggleProps> = ({ billingPeriod, onToggle }) => {
    return (
        <Flex align="center" justify="center" gap={3} className="mb-8">
            <button
                onClick={() => onToggle('monthly')}
                className={`px-6 py-2 rounded-full font-semibold transition-all ${billingPeriod === 'monthly'
                        ? 'bg-primary text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
            >
                Monthly
            </button>
            <button
                onClick={() => onToggle('yearly')}
                className={`px-6 py-2 rounded-full font-semibold transition-all ${billingPeriod === 'yearly'
                        ? 'bg-primary text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
            >
                <Flex align="center" gap={2}>
                    <Text>Yearly</Text>
                    <Block className="bg-green-500 text-white text-xs px-2 py-0.5 rounded-full">
                        Save 20%
                    </Block>
                </Flex>
            </button>
        </Flex>
    );
};
