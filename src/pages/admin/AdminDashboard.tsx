import {
    Building2,
    Users as UsersIcon,
    BarChart3,
    DollarSign
} from 'lucide-react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    AreaChart,
    Area
} from 'recharts';
import { Block, Flex, Text } from '@shared';
import { StatCard } from '@/components/ui/StatCard';
import { useAdminDashboard } from '@/hooks/features/admin/useAdminDashboard';
import Button from '@/components/ui/Button';

export const AdminDashboard = () => {
    const { metrics, loading, error, growthData } = useAdminDashboard();

    if (loading && !metrics) {
        return <Block className="p-8"><Text>Loading dashboard metrics...</Text></Block>;
    }

    if (error) {
        return <Block className="p-8"><Text className="text-red-500">Error: {error}</Text></Block>;
    }

    return (
        <Block className="space-y-8">
            <Block>
                <Text as="h1" className="text-2xl font-bold text-gray-900">System Overview</Text>
                <Text className="text-gray-500">Real-time metrics and growth analytics</Text>
            </Block>

            <Block className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Total Users"
                    value={metrics?.totalUsers.toLocaleString() || '0'}
                    change="+12%"
                    trend="up"
                    icon={UsersIcon}
                    color={{ bg: 'bg-blue-50', text: 'text-blue-600' }}
                />
                <StatCard
                    title="Organizations"
                    value={metrics?.activeOrganizations.toString() || '0'}
                    change="+5%"
                    trend="up"
                    icon={Building2}
                    color={{ bg: 'bg-purple-50', text: 'text-purple-600' }}
                />
                <StatCard
                    title="Monthly Revenue"
                    value={`$${metrics?.monthlyRevenue.toLocaleString() || '0'}`}
                    change="+18%"
                    trend="up"
                    icon={DollarSign}
                    color={{ bg: 'bg-green-50', text: 'text-green-600' }}
                />
                <StatCard
                    title="Conversion"
                    value={`${metrics?.conversionRate}%`}
                    change="-2%"
                    trend="down"
                    icon={BarChart3}
                    color={{ bg: 'bg-orange-50', text: 'text-orange-600' }}
                />
            </Block>

            <Block className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Block className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                    <Flex justify="between" align="center" className="mb-6">
                        <Block>
                            <Text className="font-bold text-gray-900">User Acquisition</Text>
                        </Block>
                        <Block className="bg-blue-50 text-blue-600 p-2 rounded-xl text-sm font-bold">
                            +24%
                        </Block>
                    </Flex>
                    <Block className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={growthData}>
                                <defs>
                                    <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1} />
                                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} />
                                <Tooltip
                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                                />
                                <Area type="monotone" dataKey="users" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorUsers)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </Block>
                </Block>

                <Block className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                    <Flex justify="between" align="center" className="mb-6">
                        <Block>
                            <Text className="font-bold text-gray-900">Revenue Growth</Text>
                        </Block>
                        <Block className="bg-green-50 text-green-600 p-2 rounded-xl text-sm font-bold">
                            +18%
                        </Block>
                    </Flex>
                    <Block className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={growthData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} />
                                <Tooltip
                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                                />
                                <Bar dataKey="revenue" fill="#10b981" radius={[6, 6, 0, 0]} barSize={40} />
                            </BarChart>
                        </ResponsiveContainer>
                    </Block>
                </Block>
            </Block>

            <Block className="bg-gray-900 rounded-3xl p-8 text-white">
                <Flex justify="between" align="center">
                    <Block className="space-y-2">
                        <Text className="text-2xl font-bold">System Health: Optimal</Text>
                        <Text className="text-gray-400">All services are running smoothly.</Text>
                    </Block>
                    <Button variant="outline" className="border-gray-700 text-white hover:bg-gray-800">
                        Diagnostics
                    </Button>
                </Flex>
            </Block>
        </Block>
    );
};
