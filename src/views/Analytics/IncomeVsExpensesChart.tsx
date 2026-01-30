import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';
import { Heading, Block, AnimatedBlock } from '@shared';

const incomeVsExpenseData = [
    { name: 'Jan', income: 4000, expenses: 2400 },
    { name: 'Feb', income: 3000, expenses: 1398 },
    { name: 'Mar', income: 2000, expenses: 9800 },
    { name: 'Apr', income: 2780, expenses: 3908 },
    { name: 'May', income: 1890, expenses: 4800 },
    { name: 'Jun', income: 2390, expenses: 3800 },
];

export const IncomeVsExpensesChart = () => {
    return (
        <AnimatedBlock
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="lg:col-span-2 bg-white p-8 rounded-3xl border border-gray-100 shadow-sm"
        >
            <Heading as="h3" size="lg" weight="bold" color="text-gray-900" className="mb-6">Income vs Expenses</Heading>
            <Block className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={incomeVsExpenseData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 12 }} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 12 }} />
                        <Tooltip
                            cursor={{ fill: '#f9fafb' }}
                            contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                        />
                        <Bar dataKey="income" fill="#4F46E5" radius={[4, 4, 0, 0]} name="Income" />
                        <Bar dataKey="expenses" fill="#F87171" radius={[4, 4, 0, 0]} name="Expenses" />
                    </BarChart>
                </ResponsiveContainer>
            </Block>
        </AnimatedBlock>
    );
};
