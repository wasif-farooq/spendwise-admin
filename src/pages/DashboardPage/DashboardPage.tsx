import {
    TrendingUp,
    TrendingDown,
    Wallet,
    PieChart,
    Calendar
} from 'lucide-react';
import { Container, Heading, Text, Block, Flex, Grid, AnimatedBlock } from '@shared';
import { StatCard, RecentTransactionItem } from '@ui';

const DashboardPage = () => {
    const stats = [
        {
            name: 'Total Balance',
            value: '$12,450.00',
            change: '12.5% vs last month',
            trend: 'up' as const,
            icon: Wallet,
            color: { text: 'text-blue-600', bg: 'bg-blue-50' }
        },
        {
            name: 'Monthly Income',
            value: '$4,200.00',
            change: '8.2% increased',
            trend: 'up' as const,
            icon: TrendingUp,
            color: { text: 'text-green-600', bg: 'bg-green-50' }
        },
        {
            name: 'Monthly Expenses',
            value: '$2,150.00',
            change: '4.1% decreased',
            trend: 'down' as const,
            icon: TrendingDown,
            color: { text: 'text-red-600', bg: 'bg-red-50' }
        },
    ];

    return (
        <Container size="wide" className="p-8 space-y-8">
            <AnimatedBlock>
                <Heading size="3xl" weight="black" color="text-gray-900">Overview</Heading>
                <Text color="text-gray-500" className="mt-1">Welcome back, John! Here's what's happening today.</Text>
            </AnimatedBlock>

            {/* Stats Grid */}
            <Grid cols={1} className="md:grid-cols-3" gap={6}>
                {stats.map((stat, index) => (
                    <AnimatedBlock
                        key={stat.name}
                        transition={{ delay: index * 0.1 }}
                    >
                        <StatCard
                            title={stat.name}
                            value={stat.value}
                            change={stat.change}
                            trend={stat.trend}
                            icon={stat.icon}
                            color={stat.color}
                        />
                    </AnimatedBlock>
                ))}
            </Grid>

            {/* Charts & Recent Activity Placeholders */}
            <Grid cols={1} className="lg:grid-cols-2" gap={8}>
                <AnimatedBlock
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 }}
                    className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm h-80 flex flex-col"
                >
                    <Flex align="center" justify="between" className="mb-6">
                        <Heading as="h3" size="lg" weight="bold" color="text-gray-900" className="flex items-center">
                            <PieChart className="h-5 w-5 mr-2 text-primary" />
                            Spending Analysis
                        </Heading>
                        <button className="text-sm text-primary font-semibold hover:underline">View Details</button>
                    </Flex>
                    <Block className="flex-grow bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 flex items-center justify-center">
                        <Text weight="medium" color="text-gray-400">Chart Visualization Placeholder</Text>
                    </Block>
                </AnimatedBlock>

                <AnimatedBlock
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 }}
                    className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm h-80 flex flex-col"
                >
                    <Flex align="center" justify="between" className="mb-6">
                        <Heading as="h3" size="lg" weight="bold" color="text-gray-900" className="flex items-center">
                            <Calendar className="h-5 w-5 mr-2 text-primary" />
                            Recent Transactions
                        </Heading>
                        <button className="text-sm text-primary font-semibold hover:underline">See All</button>
                    </Flex>
                    <Block className="space-y-4 overflow-y-auto pr-2">
                        {[1, 2, 3].map((i) => (
                            <RecentTransactionItem
                                key={i}
                                index={i}
                                description={`Transaction ${i}`}
                                date="Jan 29, 2026"
                                amount="$45.00"
                                isExpense={true}
                            />
                        ))}
                    </Block>
                </AnimatedBlock>
            </Grid>
        </Container>
    );
};

export default DashboardPage;
