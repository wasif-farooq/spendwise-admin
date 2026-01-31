import React from 'react';
import { Block, Flex, Text } from '@shared';
import { Check } from 'lucide-react';

export interface FeatureListProps {
    features: string[];
    highlight?: boolean;
}

export const FeatureList: React.FC<FeatureListProps> = ({ features, highlight = false }) => {
    return (
        <Block as="ul" className="space-y-3">
            {features.map((feature, index) => (
                <Flex
                    as="li"
                    key={index}
                    align="start"
                    gap={3}
                    className="group"
                >
                    <Block
                        className={`flex-shrink-0 mt-0.5 rounded-full p-0.5 ${highlight
                                ? 'bg-blue-100 text-blue-600'
                                : 'bg-gray-100 text-gray-600'
                            }`}
                    >
                        <Check className="h-4 w-4" strokeWidth={3} />
                    </Block>
                    <Text
                        size="sm"
                        color={highlight ? 'text-gray-900' : 'text-gray-700'}
                        weight={highlight ? 'medium' : 'normal'}
                    >
                        {feature}
                    </Text>
                </Flex>
            ))}
        </Block>
    );
};
