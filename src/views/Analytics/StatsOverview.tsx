import {
    DollarSign,
    TrendingDown,
    TrendingUp,
    Target
} from 'lucide-react';
import { Grid } from '@shared';
import { StatCard } from '@ui';

export const StatsOverview = () => {
    return (
        <Grid cols={1} className="md:grid-cols-2 lg:grid-cols-4" gap={6}>
            <StatCard
                title="Net Savings"
                value="$5,840.00"
                change="12% vs last month"
                trend="up"
                icon={DollarSign}
                color={{ bg: 'bg-indigo-50', text: 'text-indigo-600' }}
            />
            <StatCard
                title="Monthly Expenses"
                value="$2,150.00"
                change="4.1% decreased"
                trend="down"
                icon={TrendingDown}
                color={{ bg: 'bg-red-50', text: 'text-red-600' }}
            />
            <StatCard
                title="Avg Daily Spend"
                value="$72.50"
                change="2% increased"
                trend="up"
                icon={TrendingUp}
                color={{ bg: 'bg-blue-50', text: 'text-blue-600' }}
            />
            <StatCard
                title="Savings Goal"
                value="84%"
                change="5% to target"
                trend="up"
                icon={Target}
                color={{ bg: 'bg-emerald-50', text: 'text-emerald-600' }}
            />
        </Grid>
    );
};
