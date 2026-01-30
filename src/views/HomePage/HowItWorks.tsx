import { CreditCard, Users, Calendar, History } from 'lucide-react';
import { Block, Grid, AnimatedBlock, Container, Heading, Text } from '@shared';

const steps = [
    {
        title: 'Add Accounts',
        description: 'Connect your bank accounts and credit cards securely to get a unified view.',
        icon: CreditCard,
    },
    {
        title: 'Set Up Teams',
        description: 'Create your organization and invite team members with specific roles.',
        icon: Users,
    },
    {
        title: 'Track & Schedule',
        description: 'Monitor daily spending and schedule future expenses for better planning.',
        icon: Calendar,
    },
    {
        title: 'Review History',
        description: 'Access a complete audit trail and detailed reports of your financial activity.',
        icon: History,
    },
];

export const HowItWorks = () => {
    return (
        <Block as="section" id="how-it-works" className="py-20 bg-white">
            <Container>
                <Block className="text-center max-w-3xl mx-auto mb-16">
                    <Heading as="h2" weight="bold" color="text-gray-900" className="text-3xl mb-4">How It Works</Heading>
                    <Text size="lg" color="text-gray-600">
                        Get started with SpendWise in four simple steps and take control of your finances.
                    </Text>
                </Block>

                <Block className="relative">
                    {/* Connector Line (Desktop) */}
                    <Block className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 bg-gray-100 -translate-y-1/2 z-0"></Block>

                    <Grid cols={1} gap={8} className="md:grid-cols-2 lg:grid-cols-4 relative z-10">
                        {steps.map((step, index) => (
                            <AnimatedBlock
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="bg-white p-6 text-center"
                            >
                                <Block className="relative inline-block mb-6">
                                    <Block className="h-16 w-16 rounded-full bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/20">
                                        <step.icon className="h-8 w-8" />
                                    </Block>
                                    <Block className="absolute -top-2 -right-2 h-8 w-8 rounded-full bg-secondary flex items-center justify-center text-white font-bold border-4 border-white">
                                        {index + 1}
                                    </Block>
                                </Block>
                                <Heading as="h3" size="xl" weight="semibold" color="text-gray-900" className="mb-2">{step.title}</Heading>
                                <Text size="sm" color="text-gray-600" className="leading-relaxed">{step.description}</Text>
                            </AnimatedBlock>
                        ))}
                    </Grid>
                </Block>
            </Container>
        </Block>
    );
};
