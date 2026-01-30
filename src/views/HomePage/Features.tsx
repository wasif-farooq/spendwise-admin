import { LayoutDashboard, Users, Calendar, History, PieChart, Cloud } from 'lucide-react';
import { FeatureCard } from '@ui';
import { Grid } from '@shared';

const features = [
    {
        title: 'Multi-Account Dashboard',
        description: 'Monitor expenses across different bank accounts and cards in one unified view.',
        icon: LayoutDashboard,
    },
    {
        title: 'Team Collaboration',
        description: 'Invite members with specific view or add permissions. Perfect for organizations.',
        icon: Users,
    },
    {
        title: 'Future Expense Scheduler',
        description: 'Plan ahead by scheduling upcoming expenses and visualizing cash flow.',
        icon: Calendar,
    },
    {
        title: 'Audit Trail',
        description: 'Complete modification history for every transaction. Never lose track of changes.',
        icon: History,
    },
    {
        title: 'Smart Categorization',
        description: 'Automatically categorize transactions to understand spending habits instantly.',
        icon: PieChart,
    },
    {
        title: 'Real-time Sync',
        description: 'Your data is synced across all devices in real-time. Access from anywhere.',
        icon: Cloud,
    },
];

export const Features = () => {
    return (
        <section id="features" className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Everything you need to manage expenses</h2>
                    <p className="text-lg text-gray-600">
                        Powerful features designed for individuals and teams to take control of their financial health.
                    </p>
                </div>

                <Grid cols={1} className="md:grid-cols-2 lg:grid-cols-3" gap={8}>
                    {features.map((feature, index) => (
                        <FeatureCard
                            key={index}
                            title={feature.title}
                            description={feature.description}
                            icon={feature.icon}
                            delay={index * 0.1}
                        />
                    ))}
                </Grid>
            </div>
        </section>
    );
};
