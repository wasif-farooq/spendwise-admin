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
    Wallet,
    Trash2,
    AlertTriangle,
    CreditCard
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
import { useUserDetail } from '@/hooks/features/admin/useUserDetail';
import { ConfirmationModal } from '@/components/ui/ConfirmationModal';
import { useState } from 'react';
import { CustomSelect } from '@/components/ui/CustomSelect';

export const UserDetailDashboard = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const {
        user,
        loading,
        actionLoading,
        handleStatusChange,
        handleDeleteUser,
        handleUpdateSubscription,
        handleDeleteOrg,
        handleFlagAccount,
        handleDeleteAccount,
        handleDeleteTransaction
    } = useUserDetail(id);

    // Modal States
    const [modals, setModals] = useState({
        suspend: false,
        activate: false,
        deleteUser: false,
        deleteOrg: null as string | null,
        deleteAccount: null as string | null,
        subUpgrade: false
    });

    const toggleModal = (key: keyof typeof modals, value: any) => {
        setModals(prev => ({ ...prev, [key]: value }));
    };

    if (loading || !user) {
        return <Block className="p-10 text-center text-gray-400">Loading profile...</Block>;
    }

    return (
        <Block className="space-y-8">
            {/* Confirmation Modals */}
            <ConfirmationModal
                isOpen={modals.suspend}
                onClose={() => toggleModal('suspend', false)}
                onConfirm={() => {
                    handleStatusChange('suspended');
                    toggleModal('suspend', false);
                }}
                title="Suspend User Access"
                description="Are you sure you want to suspend this user? They will no longer be able to log in or access any organization resources."
                confirmText="Suspend User"
                variant="warning"
                loading={actionLoading}
            />

            <ConfirmationModal
                isOpen={modals.activate}
                onClose={() => toggleModal('activate', false)}
                onConfirm={() => {
                    handleStatusChange('active');
                    toggleModal('activate', false);
                }}
                title="Reactivate User"
                description="This will restore full access for the user. Continue?"
                confirmText="Reactivate"
                variant="info"
                loading={actionLoading}
            />

            <ConfirmationModal
                isOpen={modals.deleteUser}
                onClose={() => toggleModal('deleteUser', false)}
                onConfirm={handleDeleteUser}
                title="Delete User Permanently"
                description="This action cannot be undone. All user data, including personal settings and logs, will be erased. Organization memberships will be revoked."
                confirmText="Delete User"
                variant="danger"
                loading={actionLoading}
            />

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
                        <Button
                            variant="outline"
                            className="text-red-600 border-red-200 hover:bg-red-50 gap-2"
                            onClick={() => toggleModal('suspend', true)}
                        >
                            <UserX size={18} />
                            Suspend User
                        </Button>
                    ) : (
                        <Button
                            variant="outline"
                            className="text-green-600 border-green-200 hover:bg-green-50 gap-2"
                            onClick={() => toggleModal('activate', true)}
                        >
                            <UserCheck size={18} />
                            Reactivate User
                        </Button>
                    )}
                    <Button
                        variant="ghost"
                        className="text-red-500 hover:bg-red-50 hover:text-red-600 gap-2"
                        onClick={() => toggleModal('deleteUser', true)}
                    >
                        <Trash2 size={18} />
                        Delete
                    </Button>
                </Flex>
            </Flex>

            <Block className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Basic Info & Stats */}
                <Block className="space-y-6">
                    <Card className="p-6">
                        <Flex justify="between" align="center" className="mb-4">
                            <Text className="font-bold text-gray-900">Profile Overview</Text>
                            <Button size="sm" variant="ghost" onClick={() => navigate(`/users/${user.id}/edit`)}>
                                <Settings size={14} />
                            </Button>
                        </Flex>
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
                            <CustomSelect
                                label="Change Plan"
                                value={user.subscription.plan}
                                onChange={(val) => handleUpdateSubscription(val)}
                                options={[
                                    { label: 'Free Tier', value: 'free' },
                                    { label: 'Pro Plan', value: 'pro' },
                                    { label: 'Enterprise', value: 'enterprise' }
                                ]}
                            />
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
                                    <TableHead>Role</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {user.organizations.map((org: any) => (
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
                                            <Badge variant="secondary" size="sm" className="capitalize">{org.role}</Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Flex justify="end" gap={2}>
                                                <Button size="sm" variant="ghost">Edit</Button>
                                                <Button
                                                    size="sm"
                                                    variant="ghost"
                                                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                                                    onClick={() => handleDeleteOrg(org.id)}
                                                >
                                                    <Trash2 size={14} />
                                                </Button>
                                            </Flex>
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
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {user.accounts.map((account: any) => (
                                    <TableRow key={account.id}>
                                        <TableCell>
                                            <Flex align="center" gap={3}>
                                                <Block className="bg-green-50 p-2 rounded-lg">
                                                    <Wallet size={16} className="text-green-600" />
                                                </Block>
                                                <Block>
                                                    <Text className="font-bold text-sm text-gray-900">{account.name}</Text>
                                                    <Text className="text-xs text-gray-500 font-mono">${account.balance.toLocaleString()}</Text>
                                                </Block>
                                            </Flex>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant={account.status === 'flagged' ? 'warning' : 'success'} size="sm">
                                                {account.status || 'Active'}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Flex justify="end" gap={2}>
                                                <Button
                                                    size="sm"
                                                    variant="ghost"
                                                    title="Flag Account"
                                                    onClick={() => handleFlagAccount(account.id)}
                                                    className="text-amber-500 hover:bg-amber-50"
                                                >
                                                    <AlertTriangle size={14} />
                                                </Button>
                                                <Button size="sm" variant="ghost">Edit</Button>
                                                <Button
                                                    size="sm"
                                                    variant="ghost"
                                                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                                                    onClick={() => handleDeleteAccount(account.id)}
                                                >
                                                    <Trash2 size={14} />
                                                </Button>
                                            </Flex>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Card>
                </Block>
            </Block>
        </Block >
    );
};
