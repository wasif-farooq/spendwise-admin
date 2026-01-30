import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
    Legend
} from 'recharts';
import { Heading, Block, AnimatedBlock } from '@shared';

const COLORS = ['#4F46E5', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899'];

const categoryData = [
    { name: 'Food & Dining', value: 400 },
    { name: 'Shopping', value: 300 },
    { name: 'Transport', value: 300 },
    { name: 'Utilities', value: 200 },
    { name: 'Entertainment', value: 278 },
    { name: 'Healthcare', value: 189 },
];

export const SpendingCategoryChart = () => {
    return (
        <AnimatedBlock
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm"
        >
            <Heading as="h3" size="lg" weight="bold" color="text-gray-900" className="mb-6">Spending by Category</Heading>
            <Block className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={categoryData}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={5}
                            dataKey="value"
                        >
                            {categoryData.map((_, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip
                            contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                        />
                        <Legend verticalAlign="bottom" height={36} />
                    </PieChart>
                </ResponsiveContainer>
            </Block>
        </AnimatedBlock>
    );
};
