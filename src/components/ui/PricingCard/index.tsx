import { Check, X } from 'lucide-react';
import { Button } from '@ui';
import { cn } from '@utils/cn';
import { Block, Flex, Heading, Text } from '@shared';

interface PricingFeature {
    text: string;
    included: boolean;
}

interface PricingCardProps {
    name: string;
    price: string;
    period: string;
    description: string;
    features: PricingFeature[];
    isPopular?: boolean;
    buttonText?: string;
    onSelect?: () => void;
}

export const PricingCard: React.FC<PricingCardProps> = ({
    name,
    price,
    period,
    description,
    features,
    isPopular = false,
    buttonText = 'Get Started',
    onSelect,
}) => {
    return (
        <Block
            className={cn(
                'relative rounded-2xl p-8 shadow-sm border transition-all duration-300 hover:shadow-md',
                isPopular
                    ? 'bg-white border-primary ring-2 ring-primary ring-opacity-50'
                    : 'bg-white border-gray-200'
            )}
        >
            {isPopular && (
                <Block className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <Text as="span" className="inline-block bg-primary text-white text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wide">
                        Most Popular
                    </Text>
                </Block>
            )}

            <Block className="text-center mb-8">
                <Heading as="h3" className="text-lg font-semibold text-gray-900 mb-2">{name}</Heading>
                <Text className="text-sm text-gray-500 mb-6">{description}</Text>
                <Flex align="baseline" justify="center">
                    <Text as="span" className="text-4xl font-bold text-gray-900">{price}</Text>
                    <Text as="span" className="text-gray-500 ml-1">/{period}</Text>
                </Flex>
            </Block>

            <Block as="ul" className="space-y-4 mb-8">
                {features.map((feature, index) => (
                    <Flex as="li" key={index} align="start">
                        {feature.included ? (
                            <Check className="h-5 w-5 text-secondary flex-shrink-0 mr-3" />
                        ) : (
                            <X className="h-5 w-5 text-gray-300 flex-shrink-0 mr-3" />
                        )}
                        <Text as="span" className={cn('text-sm', feature.included ? 'text-gray-600' : 'text-gray-400')}>
                            {feature.text}
                        </Text>
                    </Flex>
                ))}
            </Block>

            <Button
                variant={isPopular ? 'primary' : 'outline'}
                className="w-full"
                onClick={onSelect}
            >
                {buttonText}
            </Button>
        </Block>
    );
};
