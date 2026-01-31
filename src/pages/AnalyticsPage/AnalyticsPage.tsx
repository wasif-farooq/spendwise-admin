import { IncomeVsExpensesChart } from '@/views/Analytics/IncomeVsExpensesChart';
import { SpendingCategoryChart } from '@/views/Analytics/SpendingCategoryChart';
import { SpendingTrendChart } from '@/views/Analytics/SpendingTrendChart';
import { Filter, Calendar } from 'lucide-react';
import { Container, Heading, Text, Flex, Grid, AnimatedBlock } from '@shared';
import { StatsOverview } from '@/views/Analytics/StatsOverview';
import { useAnalytics } from '@/hooks/features/analytics/useAnalytics';

const AnalyticsPage = () => {
    const {
        timeRange,
        handleTimeRangeClick,
        handleFilterClick
    } = useAnalytics();

    return (
        <Container size="wide" className="p-8 space-y-8">
            <Flex direction="col" className="md:flex-row" align="stretch" justify="between" gap={4}>
                <AnimatedBlock
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                >
                    <Heading size="3xl" weight="bold" color="text-gray-900">Analytics</Heading>
                    <Text color="text-gray-500" className="mt-1">Deep dive into your financial health and spending patterns.</Text>
                </AnimatedBlock>

                <Flex align="center" gap={3}>
                    <button
                        onClick={handleTimeRangeClick}
                        className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors text-gray-700"
                    >
                        <Calendar className="h-4 w-4" />
                        {timeRange}
                    </button>
                    <button
                        onClick={handleFilterClick}
                        className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl text-sm font-medium hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
                    >
                        <Filter className="h-4 w-4" />
                        Filters
                    </button>
                </Flex>
            </Flex>

            {/* Stats Overview */}
            <StatsOverview />

            <Grid cols={1} className="lg:grid-cols-3" gap={8}>
                {/* Income vs Expenses Bar Chart */}
                <IncomeVsExpensesChart />

                {/* Categories Pie Chart */}
                <SpendingCategoryChart />
            </Grid>

            {/* Spending Trend Area Chart */}
            <SpendingTrendChart />
        </Container>
    );
};

export default AnalyticsPage;

