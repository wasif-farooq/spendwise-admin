import { PieChart as PieChartIcon, ArrowRight } from 'lucide-react';
import { Heading, Text, Block, Flex, AnimatedBlock } from '@shared';
import { Button } from '@ui';
import { useDashboard } from '@/hooks/features/dashboard/useDashboard';
import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    Tooltip,
    Legend
} from 'recharts';

export const SpendingAnalysisPreview = () => {
    const { data, loading } = useDashboard();

    if (loading || !data) {
        return (
            <Block className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm h-[450px] animate-pulse" />
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
            transition={{ delay: 0.3 }}
            className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm h-[450px] flex flex-col"
        >
            <Flex align="center" justify="between" className="mb-8">
                <Block>
                    <Heading as="h3" size="lg" weight="bold" color="text-gray-900" className="flex items-center">
                        <PieChartIcon className="h-5 w-5 mr-3 text-primary" />
                        Spending Analysis
                    </Heading>
                    <Text size="sm" color="text-gray-500" className="mt-1">Distribution by category</Text>
                </Block>
                <Button variant="ghost" size="sm" className="text-primary font-semibold group">
                    Details
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
            </Flex>

            <Block className="flex-grow min-h-0">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={chartData}
                            cx="50%"
                            cy="50%"
                            innerRadius={80}
                            outerRadius={120}
                            paddingAngle={5}
                            dataKey="amount"
                            nameKey="category"
                        >
                            {chartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={colorMap[entry.color] || '#cbd5e1'} stroke="none" />
                            ))}
                        </Pie>
                        <Tooltip
                            contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                            formatter={(value: any) => [`$${value.toLocaleString()}`, 'Amount']}
                        />
                        <Legend
                            layout="horizontal"
                            verticalAlign="bottom"
                            align="center"
                            iconType="circle"
                            formatter={(value) => <span className="text-xs font-medium text-gray-600">{value}</span>}
                        />
                    </PieChart>
                </ResponsiveContainer>
            </Block>

            <Flex className="mt-6 pt-6 border-t border-gray-50 overflow-x-auto gap-4 hide-scrollbar">
                {chartData.slice(0, 3).map((item) => (
                    <Block key={item.category} className="flex-shrink-0">
                        <Text size="xs" color="text-gray-400" className="uppercase tracking-wider font-bold mb-1">{item.category}</Text>
                        <Text size="sm" weight="bold" color="text-gray-900">{item.percentage}%</Text>
                    </Block>
                ))}
            </Flex>
        </AnimatedBlock>
    );
};
