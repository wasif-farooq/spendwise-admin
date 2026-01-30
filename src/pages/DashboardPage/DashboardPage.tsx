import { motion } from 'framer-motion';
import {
    TrendingUp,
    TrendingDown,
    Wallet,
    PieChart,
    Calendar
} from 'lucide-react';
import { Container, Heading, Text, Block, Flex } from '@shared';

const DashboardPage = () => {
    const stats = [
        { name: 'Total Balance', value: '$12,450.00', change: '+12.5%', icon: Wallet, color: 'text-blue-600', bg: 'bg-blue-50' },
        { name: 'Monthly Income', value: '$4,200.00', change: '+8.2%', icon: TrendingUp, color: 'text-green-600', bg: 'bg-green-50' },
        { name: 'Monthly Expenses', value: '$2,150.00', change: '-4.1%', icon: TrendingDown, color: 'text-red-600', bg: 'bg-red-50' },
    ];

    return (
        <Container size="wide" className="p-8 space-y-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <Heading size="3xl" weight="black" color="text-gray-900">Overview</Heading>
                <Text color="text-gray-500" className="mt-1">Welcome back, John! Here's what's happening today.</Text>
            </motion.div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {stats.map((stat, index) => (
                    <motion.div
                        key={stat.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
                    >
                        <Flex align="center" justify="between">
                            <Block className={`${stat.bg} p-3 rounded-2xl`}>
                                <stat.icon className={`h-6 w-6 ${stat.color}`} />
                            </Block>
                            <span className={`text-xs font-bold px-2 py-1 rounded-full ${stat.change.startsWith('+') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                }`}>
                                {stat.change}
                            </span>
                        </Flex>
                        <Block className="mt-4">
                            <Text size="sm" weight="medium" color="text-gray-500">{stat.name}</Text>
                            <Text size="2xl" weight="bold" color="text-gray-900" className="mt-1">{stat.value}</Text>
                        </Block>
                    </motion.div>
                ))}
            </div>

            {/* Charts & Recent Activity Placeholders */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <motion.div
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
                </motion.div>

                <motion.div
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
                    <div className="space-y-4">
                        {[1, 2, 3].map((i) => (
                            <Flex key={i} align="center" justify="between" className="p-3 hover:bg-gray-50 rounded-2xl transition-colors cursor-pointer">
                                <Flex align="center">
                                    <Block className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 font-bold">
                                        {i}
                                    </Block>
                                    <Block className="ml-3">
                                        <Text size="sm" weight="bold" color="text-gray-900">Transaction {i}</Text>
                                        <Text size="xs" color="text-gray-500">Jan 29, 2026</Text>
                                    </Block>
                                </Flex>
                                <Text size="sm" weight="bold" color="text-red-600">-$45.00</Text>
                            </Flex>
                        ))}
                    </div>
                </motion.div>
            </div>
        </Container>
    );
};

export default DashboardPage;
