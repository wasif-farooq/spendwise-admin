import { ArrowRight, CheckCircle2, PlayCircle } from 'lucide-react';
import { Button } from '@ui';
import { Block, Flex, Grid, AnimatedBlock, Container, Heading, Text } from '@shared';

export const Hero = () => {
    return (
        <Block as="section" className="relative pt-20 pb-16 md:pt-32 md:pb-24 overflow-hidden">
            <Container className="relative z-10">
                <Block className="text-center max-w-4xl mx-auto">
                    <AnimatedBlock
                        transition={{ duration: 0.5 }}
                    >
                        <Flex as="span" align="center" className="inline-flex rounded-full px-4 py-1 text-sm font-medium text-primary bg-primary/10 mb-6">
                            🚀 Smart Multi-Account Expense Tracking
                        </Flex>
                        <Heading as="h1" className="text-4xl md:text-6xl font-bold tracking-tight text-gray-900 mb-6">
                            Master Your Finances with <Text as="span" className="text-primary">SpendWise</Text>
                        </Heading>
                        <Text className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                            The all-in-one platform for individuals and teams to track expenses, manage budgets, and plan for the future across multiple accounts.
                        </Text>
                    </AnimatedBlock>

                    <AnimatedBlock
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
                    >
                        <Button size="lg" className="w-full sm:w-auto gap-2">
                            Start Free Trial <ArrowRight className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="lg" className="w-full sm:w-auto gap-2">
                            <PlayCircle className="h-4 w-4" /> View Demo
                        </Button>
                    </AnimatedBlock>

                    <AnimatedBlock
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        <Grid cols={2} gap={4} className="md:grid-cols-4 text-left max-w-3xl mx-auto mb-16">
                            {[
                                "Multi-Account Tracking",
                                "Team Collaboration",
                                "Future Planning",
                                "Full Audit History"
                            ].map((feature, index) => (
                                <Flex key={index} align="center" gap={2} className="text-sm text-gray-600 font-medium">
                                    <CheckCircle2 className="h-4 w-4 text-secondary flex-shrink-0" />
                                    {feature}
                                </Flex>
                            ))}
                        </Grid>
                    </AnimatedBlock>
                </Block>

                <AnimatedBlock
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="relative mx-auto max-w-5xl rounded-xl shadow-2xl border border-gray-200 bg-white overflow-hidden"
                >
                    {/* Dashboard Preview Placeholder */}
                    <Block className="aspect-[16/9] bg-gray-50 flex items-center justify-center relative group">
                        <Block className="absolute inset-0 bg-gradient-to-tr from-gray-100 to-gray-50 opacity-50" />
                        <Block className="relative z-10 text-center">
                            <Text color="text-gray-400" weight="medium">Dashboard Preview</Text>
                            <Text size="xs" color="text-gray-400" className="mt-2">(Interactive Component or Image)</Text>
                        </Block>
                        {/* Abstract UI elements representation */}
                        <Block className="absolute top-4 left-4 right-4 bottom-4 border-2 border-dashed border-gray-200 rounded-lg opacity-50"></Block>
                    </Block>
                </AnimatedBlock>
            </Container>

            {/* Background decoration */}
            <Block className="absolute top-0 inset-x-0 h-full -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-50 via-white to-white opacity-70"></Block>
        </Block>
    );
};
