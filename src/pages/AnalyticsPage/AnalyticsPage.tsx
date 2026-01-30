import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    AreaChart,
    Area,
    PieChart,
    Pie,
    Cell,
    Legend
} from 'recharts';
import {
    TrendingUp,
    TrendingDown,
    DollarSign,
    Target,
    Filter,
    Calendar,
    ArrowUpRight,
    ArrowDownRight
} from 'lucide-react';
import { Container, Heading, Text, Block, Flex, Grid, AnimatedBlock } from '@shared';

const COLORS = ['#4F46E5', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899'];

const incomeVsExpenseData = [
    { name: 'Jan', income: 4000, expenses: 2400 },
    { name: 'Feb', income: 3000, expenses: 1398 },
    { name: 'Mar', income: 2000, expenses: 9800 },
    { name: 'Apr', income: 2780, expenses: 3908 },
    { name: 'May', income: 1890, expenses: 4800 },
    { name: 'Jun', income: 2390, expenses: 3800 },
];

const categoryData = [
    { name: 'Food & Dining', value: 400 },
    { name: 'Shopping', value: 300 },
    { name: 'Transport', value: 300 },
    { name: 'Utilities', value: 200 },
    { name: 'Entertainment', value: 278 },
    { name: 'Healthcare', value: 189 },
];

const spendingTrendData = [
    { date: '2026-01-24', amount: 120 },
    { date: '2026-01-25', amount: 450 },
    { date: '2026-01-26', amount: 300 },
    { date: '2026-01-27', amount: 900 },
    { date: '2026-01-28', amount: 200 },
    { date: '2026-01-29', amount: 150 },
    { date: '2026-01-30', amount: 400 },
];


const StatCard = ({ title, value, change, trend, icon: Icon, color }: any) => (
    <AnimatedBlock className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
        <Flex align="center" justify="between" className="mb-4">
            <Block className={`p-3 rounded-2xl ${color.bg}`}>
                <Icon className={`h-6 w-6 ${color.text}`} />
            </Block>
            <Flex align="center" className={`text-xs font-bold px-2 py-1 rounded-full ${trend === 'up' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                {trend === 'up' ? <ArrowUpRight className="h-3 w-3 mr-1" /> : <ArrowDownRight className="h-3 w-3 mr-1" />}
                {change}
            </Flex>
        </Flex>
        <Text size="sm" weight="medium" color="text-gray-500">{title}</Text>
        <Text size="2xl" weight="bold" color="text-gray-900" className="mt-1">{value}</Text>
    </AnimatedBlock>
);

const AnalyticsPage = () => {
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
                    <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors text-gray-700">
                        <Calendar className="h-4 w-4" />
                        Last 30 Days
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl text-sm font-medium hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20">
                        <Filter className="h-4 w-4" />
                        Filters
                    </button>
                </Flex>
            </Flex>

            {/* Stats Overview */}
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

            <Grid cols={1} className="lg:grid-cols-3" gap={8}>
                {/* Income vs Expenses Bar Chart */}
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

                {/* Categories Pie Chart */}
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
            </Grid>

            {/* Spending Trend Area Chart */}
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
        </Container>
    );
};

export default AnalyticsPage;
