import { TrendingDown, ArrowRight, Zap, AlertCircle } from 'lucide-react';
import { Heading, Text, Block, Flex, AnimatedBlock } from '@shared';
import { Button } from '@ui';
import { useDashboard } from '@/hooks/features/dashboard/useDashboard';

export const MonthlyExpenseBreakdown = () => {
    const { data, loading } = useDashboard();

    if (loading || !data) {
        return (
            <Block className="bg-white p-8 rounded-[3rem] border border-gray-100 shadow-sm h-[350px] animate-pulse" />
        );
    }

    const { stats, spendingByCategory } = data;
    const topSpending = spendingByCategory.length > 0 ? spendingByCategory[0] : { category: 'N/A', amount: 0 };
    const budgetLimit = 5000; // Mock budget limit
    const progress = (stats.monthlyExpenses / budgetLimit) * 100;

    return (
        <AnimatedBlock
            className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm flex flex-col justify-between"
        >
            <Flex align="start" justify="between" className="mb-8">
                <Block>
                    <Heading as="h3" size="xl" weight="black" color="text-gray-900" className="flex items-center">
                        <TrendingDown className="h-6 w-6 mr-3 text-red-500" />
                        Monthly Breakdown
                    </Heading>
                    <Text size="sm" color="text-gray-500" className="mt-1">Detailed view of your January spending</Text>
                </Block>
                <Button variant="ghost" size="sm" className="text-primary font-black uppercase tracking-widest text-[10px]">
                    Manage Budget
                </Button>
            </Flex>

            <Block className="space-y-8">
                {/* Budget Progress */}
                <Block className="space-y-3">
                    <Flex justify="between" align="end">
                        <Text size="xs" weight="black" color="text-gray-400" className="uppercase tracking-widest">Budget Utilization</Text>
                        <Text size="sm" weight="black" color="text-gray-900">{progress.toFixed(1)}%</Text>
                    </Flex>
                    <Block className="h-4 bg-gray-50 rounded-full overflow-hidden">
                        <Block
                            className={`h-full transition-all duration-1000 ${progress > 90 ? 'bg-red-500' : progress > 70 ? 'bg-amber-500' : 'bg-primary'}`}
                            style={{ width: `${Math.min(progress, 100)}%` }}
                        />
                    </Block>
                    <Flex justify="between">
                        <Text size="xs" color="text-gray-400 font-bold">${stats.monthlyExpenses.toLocaleString()}</Text>
                        <Text size="xs" color="text-gray-400 font-bold">${budgetLimit.toLocaleString()}</Text>
                    </Flex>
                </Block>

                <Block className="grid grid-cols-2 gap-4">
                    <Block className="p-6 bg-red-50 rounded-[2rem] border border-red-100">
                        <Flex align="center" gap={3} className="mb-2">
                            <AlertCircle className="h-4 w-4 text-red-600" />
                            <Text size="xs" weight="black" color="text-red-600" className="uppercase tracking-widest">Highest Category</Text>
                        </Flex>
                        <Heading size="lg" weight="black" color="text-red-900">{topSpending.category}</Heading>
                        <Text size="xs" weight="bold" color="text-red-600/70" className="mt-1">${topSpending.amount.toLocaleString()} this month</Text>
                    </Block>

                    <Block className="p-6 bg-primary/5 rounded-[2rem] border border-primary/10">
                        <Flex align="center" gap={3} className="mb-2">
                            <Zap className="h-4 w-4 text-primary" />
                            <Text size="xs" weight="black" color="text-primary" className="uppercase tracking-widest">Active Alerts</Text>
                        </Flex>
                        <Heading size="lg" weight="black" color="text-primary">2 Over Budget</Heading>
                        <Text size="xs" weight="bold" color="text-primary/70" className="mt-1">Review category limits</Text>
                    </Block>
                </Block>
            </Block>

            <Button className="mt-8 w-full rounded-2xl h-14 font-black uppercase tracking-widest text-xs shadow-lg shadow-primary/10">
                View Expense Report
                <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
        </AnimatedBlock>
    );
};
