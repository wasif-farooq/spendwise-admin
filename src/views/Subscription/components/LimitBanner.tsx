import React from 'react';
import { Alert, AlertTitle, AlertDescription } from '@ui';
import { UpgradeButton } from './UpgradeButton';
import { Block, Flex, Text } from '@shared';

export interface LimitBannerProps {
    featureName: string;
    current: number;
    limit: number;
    variant?: 'info' | 'warning' | 'error';
    className?: string;
    onUpgrade?: () => void;
}

export const LimitBanner: React.FC<LimitBannerProps> = ({
    featureName,
    current,
    limit,
    variant = 'warning',
    className = '',
    onUpgrade,
}) => {
    const isAtLimit = current >= limit;
    const percentage = (current / limit) * 100;

    return (
        <Alert variant={variant} className={className}>
            <Flex direction="col" gap={3}>
                <Block>
                    <AlertTitle>
                        {isAtLimit ? `${featureName} Limit Reached` : `Approaching ${featureName} Limit`}
                    </AlertTitle>
                    <AlertDescription>
                        <Text size="sm" className="mt-1">
                            You're using <Text as="span" weight="bold">{current} of {limit}</Text> {featureName}.
                            {isAtLimit && ' Upgrade your plan to add more.'}
                        </Text>
                    </AlertDescription>
                </Block>

                {/* Progress Bar */}
                <Block className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                    <Block
                        className={`h-full transition-all ${percentage >= 100
                                ? 'bg-red-500'
                                : percentage >= 80
                                    ? 'bg-yellow-500'
                                    : 'bg-blue-500'
                            }`}
                        style={{ width: `${Math.min(percentage, 100)}%` }}
                    />
                </Block>

                {onUpgrade && (
                    <Flex justify="end">
                        <UpgradeButton onClick={onUpgrade} size="sm" />
                    </Flex>
                )}
            </Flex>
        </Alert>
    );
};
