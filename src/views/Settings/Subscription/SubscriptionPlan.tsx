import { Zap, Clock, Check } from 'lucide-react';
import { Block, Flex, Heading, Text, Grid } from '@shared';
import { Button } from '@ui';


interface Plan {
    name: string;
    price: string;
    period: string;
    nextBilling: string;
    status: string;
    features: string[];
}

interface SubscriptionPlanProps {
    plan: Plan;
}

export const SubscriptionPlan = ({ plan }: SubscriptionPlanProps) => {
    return (
        <Block
            as="section"
            className="bg-gradient-to-br from-indigo-600 to-violet-600 rounded-[3rem] p-8 sm:p-10 text-white shadow-xl shadow-indigo-500/20 relative overflow-hidden group"
        >
            <Block className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform duration-500">
                <Zap className="h-48 w-48" />
            </Block>

            <Block className="relative z-10">
                <Flex align="center" justify="between" className="mb-8">
                    <Text
                        weight="black"
                        className="px-4 py-1.5 bg-white/20 backdrop-blur-md rounded-full text-xs uppercase tracking-widest"
                    >
                        Current Plan
                    </Text>
                    <Flex align="center" className="text-white/80 text-sm font-bold">
                        <Clock className="h-4 w-4 mr-2" />
                        Renews: {plan.nextBilling}
                    </Flex>
                </Flex>

                <Flex direction="col" gap={8} className="sm:flex-row sm:items-end justify-between">
                    <Block>
                        <Heading as="h3" size="3xl" weight="black" className="tracking-tight">{plan.name}</Heading>
                        <Flex align="baseline" className="mt-2">
                            <Text size="5xl" weight="black">{plan.price}</Text>
                            <Text size="lg" weight="bold" className="ml-2 text-white/70">/{plan.period}</Text>
                        </Flex>
                    </Block>
                    <Button
                        className="bg-white text-indigo-600 hover:bg-white/90 px-10 py-4 rounded-2xl font-black shadow-lg shadow-black/10 transition-all active:scale-95"
                    >
                        Upgrade Plan
                    </Button>
                </Flex>

                <Grid cols={1} gap={4} className="mt-10 sm:grid-cols-2">
                    {plan.features.map((feature, i) => (
                        <Flex key={i} align="center" className="text-sm font-bold text-white/90">
                            <Block className="bg-white/20 p-1 rounded-lg mr-3">
                                <Check className="h-3.5 w-3.5" />
                            </Block>
                            {feature}
                        </Flex>
                    ))}
                </Grid>
            </Block>
        </Block>
    );
};
