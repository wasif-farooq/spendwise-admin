import {
    TrendingUp,
    TrendingDown,
    Wallet,
    Percent,
    CreditCard,
    History
} from 'lucide-react';
import { Grid, AnimatedBlock } from '@shared';
import { StatCard } from '@ui';
import { useDashboard } from '@/hooks/features/dashboard/useDashboard';

export const StatsOverview = () => {
    const { data, loading } = useDashboard();

    if (loading || !data) {
        return (
            <Grid cols={1} className="md:grid-cols-3 xl:grid-cols-6" gap={6}>
                {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="h-32 bg-gray-50 animate-pulse rounded-3xl" />
                ))}
            </Grid>
        );
    }

    const { stats } = data;

    const statItems = [
        {
            name: 'Total Balance',
            value: `$${stats.totalBalance.toLocaleString()}`,
            change: '+12.5% vs last month',
            trend: 'up' as const,
            icon: Wallet,
            color: { text: 'text-blue-600', bg: 'bg-blue-50' }
        },
        {
            name: 'Monthly Income',
            value: `$${stats.monthlyIncome.toLocaleString()}`,
            change: '+8.2% vs last month',
            trend: 'up' as const,
            icon: TrendingUp,
            color: { text: 'text-green-600', bg: 'bg-green-50' }
        },
        {
            name: 'Monthly Expenses',
            value: `$${stats.monthlyExpenses.toLocaleString()}`,
            change: '-4.1% vs last month',
            trend: 'down' as const,
            icon: TrendingDown,
            color: { text: 'text-red-600', bg: 'bg-red-50' }
        },
        {
            name: 'Savings Rate',
            value: `${stats.savingsRate}%`,
            change: 'Above target',
            trend: 'up' as const,
            icon: Percent,
            color: { text: 'text-purple-600', bg: 'bg-purple-50' }
        },
        {
            name: 'Accounts',
            value: stats.accountsCount.toString(),
            change: 'Active accounts',
            trend: 'up' as const,
            icon: CreditCard,
            color: { text: 'text-orange-600', bg: 'bg-orange-50' }
        },
        {
            name: 'Recent Activity',
            value: stats.transactionsCount.toString(),
            change: 'Last 7 days',
            trend: 'up' as const,
            icon: History,
            color: { text: 'text-indigo-600', bg: 'bg-indigo-50' }
        },
    ];

    return (
        <Grid cols={1} className="sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6" gap={6}>
            {statItems.map((stat, index) => (
                <AnimatedBlock
                    key={stat.name}
                    transition={{ delay: index * 0.05 }}
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
    );
};
