import { PricingCard } from '@ui';
import { Grid, Flex, Block, Container, Heading, Text } from '@shared';
import { usePricing } from '@/hooks/features/landing/usePricing';

export const Pricing = () => {
    const { isYearly, handleToggleBilling } = usePricing();

    const plans = [
        {
            name: 'Free Plan',
            price: '$0',
            period: 'month',
            description: 'Perfect for individuals just getting started.',
            features: [
                { text: '2 connected accounts', included: true },
                { text: 'Basic expense tracking', included: true },
                { text: '30-day history', included: true },
                { text: 'Team features', included: false },
                { text: 'Future scheduling', included: false },
            ],
        },
        {
            name: 'Pro Plan',
            price: isYearly ? '$7.99' : '$9.99',
            period: 'month',
            description: 'Advanced features for power users and small teams.',
            isPopular: true,
            features: [
                { text: 'Unlimited accounts', included: true },
                { text: 'Full team collaboration', included: true },
                { text: 'Advanced scheduling', included: true },
                { text: 'Complete audit history', included: true },
                { text: 'Priority support', included: true },
                { text: 'Custom categories', included: true },
            ],
            buttonText: 'Upgrade to Pro',
        },
    ];

    return (
        <Block as="section" id="pricing" className="py-20 bg-white">
            <Container>
                <Block className="text-center max-w-3xl mx-auto mb-12">
                    <Heading as="h2" weight="bold" color="text-gray-900" className="text-3xl mb-4">Simple, transparent pricing</Heading>
                    <Text size="lg" color="text-gray-600" className="mb-8">
                        Choose the plan that's right for you or your organization.
                    </Text>

                    <Flex align="center" justify="center" gap={4}>
                        <Text as="span" weight={!isYearly ? 'medium' : undefined} color={!isYearly ? 'text-gray-900' : 'text-gray-500'}>Monthly</Text>
                        <Block
                            as="button"
                            onClick={handleToggleBilling}
                            className="relative w-12 h-6 rounded-full bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                        >
                            <Block
                                className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${isYearly ? 'translate-x-6' : ''
                                    }`}
                            />
                        </Block>
                        <Text as="span" weight={isYearly ? 'medium' : undefined} color={isYearly ? 'text-gray-900' : 'text-gray-500'}>
                            Yearly <Text as="span" size="sm" weight="bold" className="text-secondary">(Save 20%)</Text>
                        </Text>
                    </Flex>
                </Block>

                <Grid cols={1} gap={8} className="md:grid-cols-2 max-w-4xl mx-auto">
                    {plans.map((plan, index) => (
                        <PricingCard key={index} {...plan} />
                    ))}
                </Grid>
            </Container>
        </Block>
    );
};

