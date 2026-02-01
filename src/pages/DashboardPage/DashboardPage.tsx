import { Container, Grid, Flex, Block, Text, Heading } from '@shared';
import { StatsOverview } from '@/views/Dashboard/StatsOverview';
import { DashboardHeader } from '@/views/Dashboard/DashboardHeader';
import { SpendingAnalysisPreview } from '@/views/Dashboard/SpendingAnalysisPreview';
import { RecentTransactionsPreview } from '@/views/Dashboard/RecentTransactionsPreview';
import { FinancialTrends } from '@/views/Dashboard/FinancialTrends';
import { AccountsSection } from '@/views/Dashboard/AccountsSection';
import { MonthlyExpenseBreakdown } from '@/views/Dashboard/MonthlyExpenseBreakdown';
import { CategoryBarChart } from '@/views/Dashboard/CategoryBarChart';
import { Button } from '@ui';
import { Plus, Download } from 'lucide-react';

const DashboardPage = () => {
    return (
        <Container size="wide" className="p-8 space-y-12">
            <Flex align="center" justify="between" wrap gap={4}>
                <DashboardHeader />
                <Flex gap={3}>
                    <Button variant="outline" className="rounded-2xl h-12 px-6">
                        <Download className="h-4 w-4 mr-2" />
                        Export
                    </Button>
                    <Button className="rounded-2xl h-12 px-6 shadow-lg shadow-primary/20">
                        <Plus className="h-4 w-4 mr-2" />
                        New Transaction
                    </Button>
                </Flex>
            </Flex>

            {/* Stats Overview */}
            <StatsOverview />

            {/* Per-Account Stats Section */}
            <AccountsSection />

            <Grid cols={1} className="xl:grid-cols-3" gap={10}>
                {/* Main Content Area */}
                <Block className="xl:col-span-2 space-y-10">
                    <FinancialTrends />

                    <Grid cols={1} className="lg:grid-cols-2" gap={10}>
                        <MonthlyExpenseBreakdown />
                        <CategoryBarChart />
                    </Grid>

                    <Grid cols={1} className="lg:grid-cols-2" gap={10}>
                        <Block className="bg-primary/5 p-8 rounded-3xl border border-primary/10 flex items-center justify-between">
                            <Block>
                                <Heading size="lg" weight="bold" color="text-primary">Ready to save more?</Heading>
                                <Text size="sm" color="text-primary/70" className="mt-1">Try our AI-powered budget suggestions</Text>
                            </Block>
                            <Button size="sm" className="bg-primary text-white rounded-xl">Analyze</Button>
                        </Block>
                        <Block className="bg-indigo-600 p-10 rounded-[3rem] shadow-xl shadow-indigo-100 flex flex-col justify-between text-white h-full min-h-[250px]">
                            <Block>
                                <Heading size="xl" weight="black">Pro Plan Active</Heading>
                                <Text size="sm" className="opacity-80 mt-2 font-bold uppercase tracking-widest">Unlimited accounts enabled</Text>
                            </Block>
                            <Button size="lg" variant="ghost" className="bg-white/10 hover:bg-white/20 text-white rounded-2xl w-full mt-6 h-14 font-black uppercase tracking-widest text-xs">
                                Manage Subscription
                            </Button>
                        </Block>
                    </Grid>
                </Block>

                {/* Sidebar Content Area */}
                <Block className="space-y-10">
                    <SpendingAnalysisPreview />
                    <RecentTransactionsPreview />
                </Block>
            </Grid>
        </Container >
    );
};

export default DashboardPage;
