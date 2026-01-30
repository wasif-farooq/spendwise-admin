import { motion } from 'framer-motion';
import { CreditCard, Plus, Download, Check, ArrowUpRight, Zap, ShieldCheck, Clock } from 'lucide-react';
import { Button } from '@ui';
import {
    Block,
    Flex,
    Heading,
    Text,
    Grid
} from '@shared';

const Billing = () => {

    const currentPlan = {
        name: 'Premium Plan',
        price: '$29',
        period: 'month',
        nextBilling: 'Feb 29, 2026',
        status: 'Active',
        features: [
            'Up to 20 team members',
            'Unlimited transactions',
            'Advanced reporting',
            'Priority support',
            'Custom categories'
        ]
    };

    const paymentMethods = [
        { id: 1, type: 'Visa', last4: '4242', expiry: '12/26', isDefault: true },
        { id: 2, type: 'Mastercard', last4: '8888', expiry: '08/25', isDefault: false },
    ];

    const billingHistory = [
        { id: 'INV-001', date: 'Jan 29, 2026', amount: '$29.00', status: 'Paid' },
        { id: 'INV-002', date: 'Dec 29, 2025', amount: '$29.00', status: 'Paid' },
        { id: 'INV-003', date: 'Nov 29, 2025', amount: '$29.00', status: 'Paid' },
    ];

    return (
        <Block
            as={motion.div}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-12"
        >
            <Flex as="header" direction="col" justify="between" gap={6} className="sm:flex-row sm:items-center">
                <Block>
                    <Heading as="h2" weight="black" className="text-3xl tracking-tight text-gray-900">Billing & Subscription</Heading>
                    <Text color="text-gray-500" weight="medium" className="mt-1">Manage your plan, payment methods, and billing history.</Text>
                </Block>
            </Flex>

            <Grid cols={1} gap={8} className="lg:grid-cols-3">
                {/* Plan Overview */}
                <Block className="lg:col-span-2 space-y-8">
                    <Block
                        as="section"
                        className="bg-gradient-to-br from-primary to-blue-600 rounded-[3rem] p-8 sm:p-10 text-white shadow-xl shadow-primary/20 relative overflow-hidden group"
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
                                    Next billing: {currentPlan.nextBilling}
                                </Flex>
                            </Flex>

                            <Flex direction="col" gap={8} className="sm:flex-row sm:items-end justify-between">
                                <Block>
                                    <Heading as="h3" size="3xl" weight="black" className="tracking-tight">{currentPlan.name}</Heading>
                                    <Flex align="baseline" className="mt-2">
                                        <Text size="5xl" weight="black">{currentPlan.price}</Text>
                                        <Text size="lg" weight="bold" className="ml-2 text-white/70">/{currentPlan.period}</Text>
                                    </Flex>
                                </Block>
                                <Button
                                    className="bg-white text-primary hover:bg-white/90 px-10 py-4 rounded-2xl font-black shadow-lg shadow-black/10 transition-all active:scale-95"
                                >
                                    Change Plan
                                </Button>
                            </Flex>

                            <Grid cols={1} gap={4} className="mt-10 sm:grid-cols-2">
                                {currentPlan.features.map((feature, i) => (
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

                    {/* Payment Methods */}
                    <Block as="section" className="bg-white rounded-[3rem] p-8 sm:p-10 border border-gray-100 shadow-sm">
                        <Flex align="center" justify="between" className="mb-8">
                            <Flex align="center" gap={3}>
                                <Block className="bg-primary/10 p-2.5 rounded-xl">
                                    <CreditCard className="h-5 w-5 text-primary" />
                                </Block>
                                <Heading as="h3" weight="black" className="text-xl tracking-tight text-gray-900">Payment Methods</Heading>
                            </Flex>
                            <button className="text-primary font-black text-sm flex items-center hover:underline">
                                <Plus className="h-4 w-4 mr-1" />
                                Add New
                            </button>
                        </Flex>

                        <Block className="space-y-4">
                            {paymentMethods.map((method) => (
                                <Flex
                                    key={method.id}
                                    align="center"
                                    justify="between"
                                    className="p-6 rounded-[2rem] border border-gray-100 bg-gray-50/50 hover:bg-white hover:shadow-md transition-all group"
                                >
                                    <Flex align="center">
                                        <Block className="bg-white p-3 rounded-xl shadow-sm mr-5 group-hover:scale-110 transition-transform">
                                            <CreditCard className="h-6 w-6 text-gray-400" />
                                        </Block>
                                        <Block>
                                            <Text weight="bold" className="text-gray-900">{method.type} ending in {method.last4}</Text>
                                            <Text size="xs" color="text-gray-500" weight="bold" className="uppercase tracking-wider mt-0.5">Expires {method.expiry}</Text>
                                        </Block>
                                    </Flex>
                                    <Flex align="center" gap={4}>
                                        {method.isDefault && (
                                            <Text
                                                weight="black"
                                                className="px-3 py-1 bg-green-100 text-green-700 text-[10px] uppercase tracking-widest rounded-full"
                                            >
                                                Default
                                            </Text>
                                        )}
                                        <button className="p-2 text-gray-400 hover:text-primary transition-colors">
                                            <ArrowUpRight className="h-5 w-5" />
                                        </button>
                                    </Flex>
                                </Flex>
                            ))}
                        </Block>
                    </Block>
                </Block>

                {/* Billing History */}
                <Block className="space-y-8">
                    <Block as="section" className="bg-white rounded-[3rem] p-8 border border-gray-100 shadow-sm h-full">
                        <Flex align="center" gap={3} className="mb-8">
                            <Block className="bg-blue-50 p-2.5 rounded-xl">
                                <ShieldCheck className="h-5 w-5 text-blue-600" />
                            </Block>
                            <Heading as="h3" weight="black" className="text-xl tracking-tight text-gray-900">Billing History</Heading>
                        </Flex>

                        <Block className="space-y-6">
                            {billingHistory.map((invoice) => (
                                <Flex key={invoice.id} align="center" justify="between" className="group">
                                    <Block>
                                        <Text weight="bold" className="text-gray-900">{invoice.date}</Text>
                                        <Text size="xs" color="text-gray-400" weight="bold" className="uppercase tracking-widest mt-0.5">{invoice.id}</Text>
                                    </Block>
                                    <Block className="text-right">
                                        <Text weight="black" className="text-gray-900">{invoice.amount}</Text>
                                        <button className="text-primary hover:text-primary/80 transition-colors mt-1">
                                            <Download className="h-4 w-4" />
                                        </button>
                                    </Block>
                                </Flex>
                            ))}
                        </Block>

                        <button className="w-full mt-10 py-4 bg-gray-50 text-gray-500 font-black text-sm rounded-2xl hover:bg-gray-100 transition-all border border-gray-100">
                            View All Invoices
                        </button>
                    </Block>
                </Block>
            </Grid>
        </Block>
    );
};

export default Billing;
