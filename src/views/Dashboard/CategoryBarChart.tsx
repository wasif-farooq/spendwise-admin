import { BarChart as BarChartIcon, ArrowRight } from 'lucide-react';
import { Heading, Text, Block, Flex, AnimatedBlock, Grid } from '@shared';
import { Button } from '@ui';
import { useDashboard } from '@/hooks/features/dashboard/useDashboard';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Cell
} from 'recharts';

export const CategoryBarChart = () => {
    const { data, loading } = useDashboard();

    if (loading || !data) {
        return (
            <Block className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm h-[400px] animate-pulse" />
        );
    }

    const chartData = data.spendingByCategory;

    // Mapping Tailwind bg colors to HEX for Recharts
    const colorMap: Record<string, string> = {
        'bg-gray-900': '#111827',
        'bg-purple-500': '#A855F7',
        'bg-yellow-500': '#EAB308',
        'bg-blue-500': '#3B82F6',
        'bg-orange-500': '#F97316'
    };

    return (
        <AnimatedBlock
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm h-full flex flex-col"
        >
            <Flex align="center" justify="between" className="mb-8">
                <Block>
                    <Heading as="h3" size="lg" weight="bold" color="text-gray-900" className="flex items-center">
                        <BarChartIcon className="h-5 w-5 mr-3 text-primary" />
                        Spending by Category
                    </Heading>
                    <Text size="sm" color="text-gray-500" className="mt-1">Comparative view of your支出distribution</Text>
                </Block>
                <Button variant="ghost" size="sm" className="text-primary font-semibold group">
                    Category Reports
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
            </Flex>

            <Block className="flex-grow min-h-0">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        layout="vertical"
                        data={chartData}
                        margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f1f5f9" />
                        <XAxis type="number" hide />
                        <YAxis
                            dataKey="category"
                            type="category"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#64748b', fontSize: 12, fontWeight: 600 }}
                            width={100}
                        />
                        <Tooltip
                            cursor={{ fill: '#f8fafc' }}
                            contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                            formatter={(value: any) => [`$${value.toLocaleString()}`, 'Spent']}
                        />
                        <Bar
                            dataKey="amount"
                            radius={[0, 8, 8, 0]}
                            barSize={32}
                        >
                            {chartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={colorMap[entry.color] || '#cbd5e1'} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </Block>

            <Grid cols={3} gap={4} className="mt-6 pt-6 border-t border-gray-50">
                {chartData.slice(0, 3).map((item) => (
                    <Block key={item.category}>
                        <Flex align="center" gap={2} className="mb-1">
                            <Block className={`h-2 w-2 rounded-full ${item.color}`} />
                            <Text size="xs" color="text-gray-400" className="uppercase tracking-wider font-bold">{item.category}</Text>
                        </Flex>
                        <Text size="md" weight="black" color="text-gray-900">
                            ${item.amount.toLocaleString()}
                        </Text>
                    </Block>
                ))}
            </Grid>
        </AnimatedBlock>
    );
};
