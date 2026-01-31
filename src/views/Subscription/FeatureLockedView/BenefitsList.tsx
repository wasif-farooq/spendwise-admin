import React from 'react';
import { Block, Flex, Text } from '@shared';
import { Check } from 'lucide-react';

export interface BenefitsListProps {
    benefits: string[];
}

export const BenefitsList: React.FC<BenefitsListProps> = ({ benefits }) => {
    return (
        <Block as="ul" className="space-y-4">
            {benefits.map((benefit, index) => (
                <Flex as="li" key={index} align="start" gap={3}>
                    <Block className="flex-shrink-0 mt-1">
                        <Block className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                            <Check className="h-4 w-4 text-green-600" />
                        </Block>
                    </Block>
                    <Text size="md" color="text-gray-700">
                        {benefit}
                    </Text>
                </Flex>
            ))}
        </Block>
    );
};
