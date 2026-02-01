import {
    Building2,
    Shield,
    Calendar,
    Mail,
    History,
    Settings,
    UserX,
    UserCheck,
    ArrowLeft,
    ChevronRight,
    Wallet
} from 'lucide-react';
import { Block, Flex, Text } from '@shared';
import Button from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { useNavigate, useParams } from 'react-router-dom';
import {
    Table,
    TableHeader,
    TableBody,
    TableRow,
    TableHead,
    TableCell
} from '@/components/ui/Table';
import { Link } from 'react-router-dom';

export const UserDetailDashboard = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    // Mock user detail data
    const user = {
        id: id || '1',
        name: 'Alice Johnson',
        email: 'alice@example.com',
        role: 'user',
        status: 'active',
        createdAt: '2025-01-15T10:00:00Z',
        bio: 'Financial consultant based in NY.',
        organizations: [
            { id: '1', name: 'Personal', role: 'owner', joinedAt: '2025-01-15' },
            { id: '2', name: 'Tech Solutions', role: 'admin', joinedAt: '2025-02-10' }
        ],
        accounts: [
            { id: 'A1', name: 'Primary Checking', balance: 2450.00, type: 'checking' },
            { id: 'A2', name: 'Vacation Savings', balance: 5000.00, type: 'savings' }
        ],
        subscription: {
            plan: 'pro',
            status: 'active',
            billingCycle: 'monthly',
            nextBilling: '2026-03-15'
        },
        transactions: [
            { id: 'T1', date: '2026-02-01', description: 'Grocery Store', amount: -150.00, status: 'completed' },
            { id: 'T2', date: '2026-01-28', description: 'Salary Deposit', amount: 3500.00, status: 'completed' },
            { id: 'T3', date: '2026-01-25', description: 'Netflix Subscription', amount: -15.99, status: 'pending' },
            { id: 'T4', date: '2026-01-20', description: 'Electric Bill', amount: -120.50, status: 'completed' }
        ]
    };

    return (
        <Block className="space-y-8">
            <Flex align="center" gap={4}>
                <Button variant="ghost" onClick={() => navigate('/users')} className="p-2">
                    <ArrowLeft size={20} />
                </Button>
                <Block>
                    <Text as="h1" className="text-2xl font-bold text-gray-900">{user.name}</Text>
                    <Text className="text-gray-500">Global ID: {user.id}</Text>
                </Block>
                <Flex gap={2} className="ml-auto">
                    {user.status === 'active' ? (
                        <Button variant="outline" className="text-red-600 border-red-200 hover:bg-red-50 gap-2">
                            <UserX size={18} />
                            Suspend User
                        </Button>
                    ) : (
                        <Button variant="outline" className="text-green-600 border-green-200 hover:bg-green-50 gap-2">
                            <UserCheck size={18} />
                            Reactivate User
                        </Button>
                    )}
                    <Button
                        className="gap-2"
                        onClick={() => navigate(`/users/${user.id}/edit`)}
                    >
                        <Settings size={18} />
                        Edit Profile
                    </Button>
                </Flex>
            </Flex>

            <Block className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Basic Info & Stats */}
                <Block className="space-y-6">
                    <Card className="p-6">
                        <Text className="font-bold text-gray-900 mb-4 block">Profile Overview</Text>
                        <Flex direction="col" gap={4}>
                            <Flex align="center" gap={3}>
                                <Mail size={16} className="text-gray-400" />
                                <Text className="text-sm text-gray-600">{user.email}</Text>
                            </Flex>
                            <Flex align="center" gap={3}>
                                <Shield size={16} className="text-gray-400" />
                                <Badge variant="secondary">{user.role.toUpperCase()}</Badge>
                            </Flex>
                            <Flex align="center" gap={3}>
                                <Calendar size={16} className="text-gray-400" />
                                <Text className="text-sm text-gray-600">Joined {new Date(user.createdAt).toLocaleDateString()}</Text>
                            </Flex>
                        </Flex>
                    </Card>

                    <Card className="p-6">
                        <Text className="font-bold text-gray-900 mb-4 block">Subscription</Text>
                        <Block className="bg-gray-50 rounded-2xl p-4 space-y-3">
                            <Flex justify="between" align="center">
                                <Text className="text-sm text-gray-500">Current Plan</Text>
                                <Badge variant="warning">{user.subscription.plan.toUpperCase()}</Badge>
                            </Flex>
                            <Flex justify="between" align="center">
                                <Text className="text-sm text-gray-500">Status</Text>
                                <Text className="text-sm font-bold text-green-600 capitalize">{user.subscription.status}</Text>
                            </Flex>
                            <Flex justify="between" align="center">
                                <Text className="text-sm text-gray-500">Next Billing</Text>
                                <Text className="text-sm font-bold">{user.subscription.nextBilling}</Text>
                            </Flex>
                            <Button variant="outline" className="w-full mt-2 text-xs">Direct Plan Override</Button>
                        </Block>
                    </Card>
                </Block>

                {/* Right Column: Detailed Lists */}
                <Block className="lg:col-span-2 space-y-6">
                    <Card className="p-0 overflow-hidden">
                        <Block className="p-6 border-b border-gray-100">
                            <Flex justify="between" align="center">
                                <Text className="font-bold text-gray-900">Organizations</Text>
                                <Badge variant="secondary">{user.organizations.length}</Badge>
                            </Flex>
                        </Block>
                        <Table hoverable>
                            <TableHeader>
                                <TableRow className="bg-gray-50/50">
                                    <TableHead>Organization</TableHead>
                                    <TableHead>Joined At</TableHead>
                                    <TableHead>Role</TableHead>
                                    <TableHead className="text-right"></TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {user.organizations.map(org => (
                                    <TableRow key={org.id}>
                                        <TableCell>
                                            <Flex align="center" gap={3}>
                                                <Block className="bg-blue-50 p-2 rounded-lg">
                                                    <Building2 size={16} className="text-blue-600" />
                                                </Block>
                                                <Text className="font-bold text-sm text-gray-900">{org.name}</Text>
                                            </Flex>
                                        </TableCell>
                                        <TableCell>
                                            <Text className="text-xs text-gray-500">{org.joinedAt}</Text>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="secondary" size="sm" className="capitalize">{org.role}</Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <ChevronRight size={16} className="text-gray-300 inline-block" />
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Card>

                    <Card className="p-0 overflow-hidden">
                        <Block className="p-6 border-b border-gray-100">
                            <Flex justify="between" align="center">
                                <Text className="font-bold text-gray-900">Financial Accounts</Text>
                                <Badge variant="secondary">{user.accounts.length}</Badge>
                            </Flex>
                        </Block>
                        <Table hoverable>
                            <TableHeader>
                                <TableRow className="bg-gray-50/50">
                                    <TableHead>Account</TableHead>
                                    <TableHead>Type</TableHead>
                                    <TableHead className="text-right">Balance</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {user.accounts.map(account => (
                                    <TableRow key={account.id}>
                                        <TableCell>
                                            <Flex align="center" gap={3}>
                                                <Block className="bg-green-50 p-2 rounded-lg">
                                                    <Wallet size={16} className="text-green-600" />
                                                </Block>
                                                <Text className="font-bold text-sm text-gray-900">{account.name}</Text>
                                            </Flex>
                                        </TableCell>
                                        <TableCell>
                                            <Text className="text-xs text-gray-500 uppercase">{account.type}</Text>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Text className="font-bold text-sm text-gray-900">${account.balance.toLocaleString()}</Text>
                                            <Text className="text-[10px] text-gray-400 block">USD</Text>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Card>

                    <Card className="p-6">
                        <Flex align="center" gap={2} className="mb-4">
                            <History size={20} className="text-gray-400" />
                            <Text className="font-bold text-gray-900">Recent Admin Audit Log</Text>
                        </Flex>
                        <Block className="space-y-4">
                            {[1, 2].map(i => (
                                <Flex key={i} gap={4} className="border-l-2 border-gray-100 pl-4 py-1">
                                    <Block className="w-[120px] shrink-0">
                                        <Text className="text-xs text-gray-400">Feb 1, 2026 10:00</Text>
                                    </Block>
                                    <Text className="text-sm text-gray-600">
                                        <span className="font-bold text-gray-900">System</span> triggered
                                        <span className="mx-1 px-1 bg-gray-100 rounded">RECURRING_BILLING_SUCCESS</span>
                                    </Text>
                                </Flex>
                            ))}
                        </Block>
                    </Card>
                </Block>
            </Block>
        </Block >
    );
};
