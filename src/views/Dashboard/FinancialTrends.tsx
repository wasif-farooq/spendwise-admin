import { TrendingUp, ArrowRight } from 'lucide-react';
import { Heading, Text, Block, Flex, AnimatedBlock } from '@shared';
import { Button } from '@ui';
import { useDashboard } from '@/hooks/features/dashboard/useDashboard';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from 'recharts';

export const FinancialTrends = () => {
    const { data, loading } = useDashboard();

    if (loading || !data) {
        return (
            <Block className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm h-[400px] animate-pulse" />
        );
    }

    const chartData = [...data.incomeVsExpense].reverse();

    return (
        <AnimatedBlock
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm h-[400px] flex flex-col"
        >
            <Flex align="center" justify="between" className="mb-8">
                <Block>
                    <Heading as="h3" size="lg" weight="bold" color="text-gray-900" className="flex items-center">
                        <TrendingUp className="h-5 w-5 mr-3 text-primary" />
                        Financial Trends
                    </Heading>
                    <Text size="sm" color="text-gray-500" className="mt-1">Monthly income vs expenses performance</Text>
                </Block>
                <Button variant="ghost" size="sm" className="text-primary font-semibold group">
                    Report
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
            </Flex>

            <Block className="flex-grow min-h-0">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                        data={chartData}
                        margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                    >
                        <defs>
                            <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#22c55e" stopOpacity={0.1} />
                                <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.1} />
                                <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis
                            dataKey="month"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#94a3b8', fontSize: 12 }}
                            dy={10}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#94a3b8', fontSize: 12 }}
                        />
                        <Tooltip
                            contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                        />
                        <Area
                            type="monotone"
                            dataKey="income"
                            stroke="#22c55e"
                            strokeWidth={3}
                            fillOpacity={1}
                            fill="url(#colorIncome)"
                        />
                        <Area
                            type="monotone"
                            dataKey="expense"
                            stroke="#ef4444"
                            strokeWidth={3}
                            fillOpacity={1}
                            fill="url(#colorExpense)"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </Block>
        </AnimatedBlock>
    );
};
