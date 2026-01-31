import React from 'react';
import { Block, Heading, Text } from '@shared';
import { ComparisonTable } from './ComparisonTable';

export interface PlanComparisonProps {
    className?: string;
}

export const PlanComparison: React.FC<PlanComparisonProps> = ({ className = '' }) => {
    return (
        <Block className={className}>
            <Block className="mb-8 text-center">
                <Heading size="3xl" weight="black" color="text-gray-900" className="mb-2">
                    Compare Plans
                </Heading>
                <Text size="lg" color="text-gray-600">
                    Choose the perfect plan for your needs
                </Text>
            </Block>

            <ComparisonTable />
        </Block>
    );
};

export default PlanComparison;
