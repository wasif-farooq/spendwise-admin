import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';
import { Heading, Block, AnimatedBlock } from '@shared';

const spendingTrendData = [
    { date: '2026-01-24', amount: 120 },
    { date: '2026-01-25', amount: 450 },
    { date: '2026-01-26', amount: 300 },
    { date: '2026-01-27', amount: 900 },
    { date: '2026-01-28', amount: 200 },
    { date: '2026-01-29', amount: 150 },
    { date: '2026-01-30', amount: 400 },
];

export const SpendingTrendChart = () => {
    return (
        <AnimatedBlock
            className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm"
        >
            <Heading as="h3" size="lg" weight="bold" color="text-gray-900" className="mb-6">Daily Spending Trend</Heading>
            <Block className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={spendingTrendData}>
                        <defs>
                            <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.1} />
                                <stop offset="95%" stopColor="#4F46E5" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                        <XAxis
                            dataKey="date"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#9CA3AF', fontSize: 12 }}
                            tickFormatter={(str) => {
                                const date = new Date(str);
                                return date.toLocaleDateString('en-US', { day: 'numeric', month: 'short' });
                            }}
                        />
                        <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 12 }} />
                        <Tooltip
                            contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                        />
                        <Area
                            type="monotone"
                            dataKey="amount"
                            stroke="#4F46E5"
                            strokeWidth={3}
                            fillOpacity={1}
                            fill="url(#colorAmount)"
                            name="Spending"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </Block>
        </AnimatedBlock>
    );
};
