import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, Badge, Button } from '@ui';
import { Block, Flex, Text, Heading } from '@shared';
import { FeatureList } from './FeatureList';
import type { SubscriptionPlanDetails } from '@/types/subscription.types';
import { Check } from 'lucide-react';

export interface PlanCardProps {
    plan: SubscriptionPlanDetails;
    billingPeriod: 'monthly' | 'yearly';
    isCurrentPlan: boolean;
    isPopular?: boolean;
    onSelect: () => void;
    loading?: boolean;
}

export const PlanCard: React.FC<PlanCardProps> = ({
    plan,
    billingPeriod,
    isCurrentPlan,
    isPopular = false,
    onSelect,
    loading = false,
}) => {
    const price = billingPeriod === 'monthly' ? plan.price.monthly : plan.price.yearly;
    const displayPrice = billingPeriod === 'yearly' ? (price / 12).toFixed(2) : price;
    const savings = billingPeriod === 'yearly' ? Math.round((1 - (price / 12) / plan.price.monthly) * 100) : 0;

    return (
        <Card
            variant={isPopular ? 'elevated' : 'default'}
            hover={!isCurrentPlan}
            className={`relative transition-all ${isPopular
                    ? 'border-blue-500 border-2 shadow-xl shadow-blue-500/20'
                    : 'border-gray-200'
                }`}
        >
            {isPopular && (
                <Block className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge variant="gradient" size="md" className="px-4 py-1">
                        Most Popular
                    </Badge>
                </Block>
            )}

            <CardHeader className="pb-4">
                <Flex direction="col" gap={1}>
                    <CardTitle className="text-2xl">{plan.name}</CardTitle>
                    <CardDescription className="text-base">{plan.description}</CardDescription>
                </Flex>
            </CardHeader>

            <CardContent className="space-y-6">
                {/* Pricing Section */}
                <Block>
                    <Flex align="baseline" gap={1}>
                        <Heading size="5xl" weight="black" color="text-gray-900">
                            ${displayPrice}
                        </Heading>
                        <Text size="lg" color="text-gray-600" weight="medium">
                            /month
                        </Text>
                    </Flex>

                    {billingPeriod === 'yearly' && savings > 0 && (
                        <Flex align="center" gap={2} className="mt-2">
                            <Text size="sm" color="text-gray-600">
                                Billed ${price} annually
                            </Text>
                            <Badge variant="success" size="sm">
                                Save {savings}%
                            </Badge>
                        </Flex>
                    )}
                </Block>

                {/* Features Section */}
                <Block className="pt-4 border-t border-gray-100">
                    <Text size="sm" weight="semibold" color="text-gray-700" className="mb-3">
                        What's included:
                    </Text>
                    <FeatureList features={plan.features} highlight={isPopular} />
                </Block>
            </CardContent>

            <CardFooter className="pt-6">
                <Button
                    onClick={onSelect}
                    disabled={isCurrentPlan || loading}
                    size="lg"
                    className={`w-full font-semibold ${isPopular
                            ? 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-lg'
                            : isCurrentPlan
                                ? 'bg-gray-100 text-gray-600 cursor-not-allowed'
                                : 'bg-gray-900 hover:bg-gray-800 text-white'
                        }`}
                >
                    {loading ? (
                        'Processing...'
                    ) : isCurrentPlan ? (
                        <Flex align="center" gap={2} className="justify-center">
                            <Check className="h-4 w-4" />
                            Current Plan
                        </Flex>
                    ) : (
                        `Upgrade to ${plan.name}`
                    )}
                </Button>
            </CardFooter>
        </Card>
    );
};
