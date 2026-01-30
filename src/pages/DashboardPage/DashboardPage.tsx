import { Container, Grid } from '@shared';
import { StatsOverview } from '@/views/Dashboard/StatsOverview';
import { DashboardHeader } from '@/views/Dashboard/DashboardHeader';
import { SpendingAnalysisPreview } from '@/views/Dashboard/SpendingAnalysisPreview';
import { RecentTransactionsPreview } from '@/views/Dashboard/RecentTransactionsPreview';

const DashboardPage = () => {
    return (
        <Container size="wide" className="p-8 space-y-8">
            <DashboardHeader />

            {/* Stats Overview */}
            <StatsOverview />

            {/* Charts & Recent Activity Placeholders */}
            <Grid cols={1} className="lg:grid-cols-2" gap={8}>
                <SpendingAnalysisPreview />
                <RecentTransactionsPreview />
            </Grid>
        </Container >
    );
};

export default DashboardPage;
