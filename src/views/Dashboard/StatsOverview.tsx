import {
    TrendingUp,
    TrendingDown,
    Wallet
} from 'lucide-react';
import { Grid, AnimatedBlock } from '@shared';
import { StatCard } from '@ui';

export const StatsOverview = () => {
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
    );
};
