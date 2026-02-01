import {
    Building2,
    Users,
    CreditCard,
    MoreVertical,
    Lock,
    Unlock,
    Search,
    Filter,
    XCircle,
    Plus,
    Edit2,
    Trash2
} from 'lucide-react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
    Pagination
} from '@/components/ui';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { Block, Flex, Text } from '@shared';
import { Badge } from '@/components/ui/Badge';
import { CustomSelect } from '@/components/ui/CustomSelect';
import { useOrganizationsList } from '@/hooks/features/admin/useOrganizationsList';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { ConfirmationModal } from '@/components/ui/ConfirmationModal';
import { toast } from 'sonner';

export const OrganizationsListPage = () => {
    const {
        organizations,
        loading,
        error,
        searchQuery,
        setSearchQuery,
        handleToggleStatus,
        currentPage,
        setCurrentPage,
        totalPages,
        filters,
        setFilter,
        clearFilters,
        totalCount,
        showFilters,
        setShowFilters,
        navigate,
        deleteOrg,
        refresh
    } = useOrganizationsList();

    const [deleteId, setDeleteId] = useState<string | null>(null);
    const [actionLoading, setActionLoading] = useState(false);

    const handleDelete = async () => {
        if (!deleteId) return;
        setActionLoading(true);
        try {
            await deleteOrg(deleteId);
            toast.success('Organization deleted successfully');
            setDeleteId(null);
            refresh();
        } catch (error) {
            toast.error('Failed to delete organization');
        } finally {
            setActionLoading(false);
        }
    };

    if (loading && organizations.length === 0) {
        return <Block className="p-8 h-64 flex items-center justify-center"><Text className="animate-pulse text-gray-400">Loading organizations...</Text></Block>;
    }

    if (error) {
        return <Block className="p-8"><Text className="text-red-500 bg-red-50 p-4 rounded-xl border border-red-100">Error: {error}</Text></Block>;
    }

    return (
        <Block className="space-y-6">
            <ConfirmationModal
                isOpen={!!deleteId}
                onClose={() => setDeleteId(null)}
                onConfirm={handleDelete}
                title="Delete Organization"
                description="Are you sure you want to delete this organization? This action cannot be undone and will remove all associated data."
                confirmText="Delete Organization"
                variant="danger"
                loading={actionLoading}
            />

            <Flex justify="between" align="center" className="pb-6 border-b border-gray-100">
                <Block>
                    <Text as="h1" className="text-3xl font-black text-gray-900 tracking-tight">Organizations Management</Text>
                    <Text className="text-gray-500 font-medium">Oversee {totalCount} active organizations</Text>
                </Block>
                <Button
                    className="gap-2 rounded-xl"
                    onClick={() => navigate('/admin/organizations/new')}
                >
                    <Plus size={18} />
                    Add Organization
                </Button>
            </Flex>

            <Block className="bg-white p-4 rounded-3xl shadow-sm border border-gray-100 space-y-4">
                <Flex gap={4} align="center" className="flex-wrap md:flex-nowrap">
                    <Block className="flex-grow relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <Input
                            placeholder="Search by organization name..."
                            className="pl-11"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </Block>
                    <Button
                        variant={showFilters ? 'primary' : 'outline'}
                        onClick={() => setShowFilters(!showFilters)}
                        className="rounded-2xl shrink-0"
                    >
                        <Filter size={18} className="mr-2" />
                        Filters
                    </Button>
                    {(Object.keys(filters).length > 0 || searchQuery) && (
                        <Button
                            variant="ghost"
                            onClick={clearFilters}
                            className="text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-2xl shrink-0"
                        >
                            <XCircle size={18} className="mr-2" />
                            Reset
                        </Button>
                    )}
                </Flex>

                <AnimatePresence>
                    {showFilters && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                        >
                            <Block className="pt-4 border-t border-gray-50 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                <CustomSelect
                                    label="Subscription Plan"
                                    value={filters.plan || 'all'}
                                    onChange={(val) => setFilter('plan', val)}
                                    options={[
                                        { label: 'All Plans', value: 'all' },
                                        { label: 'Free', value: 'free' },
                                        { label: 'Pro', value: 'pro' },
                                        { label: 'Enterprise', value: 'enterprise' },
                                    ]}
                                />
                                <CustomSelect
                                    label="Status"
                                    value={filters.status || 'all'}
                                    onChange={(val) => setFilter('status', val)}
                                    options={[
                                        { label: 'All Statuses', value: 'all' },
                                        { label: 'Active', value: 'active' },
                                        { label: 'Suspended', value: 'suspended' },
                                    ]}
                                />
                            </Block>
                        </motion.div>
                    )}
                </AnimatePresence>
            </Block>

            <Block className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-gray-50/50">
                            <TableHead className="py-4 pl-6">Organization</TableHead>
                            <TableHead>Plan</TableHead>
                            <TableHead>Stats</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right pr-6">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <AnimatePresence mode="popLayout">
                            {organizations.map((org) => (
                                <motion.tr
                                    key={org.id}
                                    layout
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="hover:bg-gray-50/50 transition-colors"
                                >
                                    <TableCell className="py-4 pl-6">
                                        <Flex align="center" gap={3}>
                                            <Block className="p-2 bg-gray-100 rounded-xl text-gray-400">
                                                <Building2 size={20} />
                                            </Block>
                                            <Block>
                                                <Text className="font-bold text-gray-900">{org.name}</Text>
                                                <Text className="text-xs text-gray-500">ID: {org.id.slice(0, 8)}</Text>
                                            </Block>
                                        </Flex>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant={org.plan.toLowerCase() === 'enterprise' ? 'warning' : 'primary'}>
                                            {org.plan.toUpperCase()}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <Flex gap={4}>
                                            <Flex align="center" gap={1.5}>
                                                <Users size={14} className="text-gray-400" />
                                                <Text className="text-sm font-medium">{org.membersCount || 0}</Text>
                                            </Flex>
                                            <Flex align="center" gap={1.5}>
                                                <CreditCard size={14} className="text-gray-400" />
                                                <Text className="text-sm font-medium">{org.accountsCount || 0}</Text>
                                            </Flex>
                                        </Flex>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant={org.status === 'active' ? 'success' : 'error'}>
                                            {org.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right pr-6">
                                        <Flex justify="end" gap={2}>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => handleToggleStatus(org.id)}
                                                title={org.status === 'active' ? 'Suspend' : 'Activate'}
                                                className={org.status === 'active' ? 'text-gray-400 hover:text-red-500 hover:bg-red-50' : 'text-gray-400 hover:text-green-500 hover:bg-green-50'}
                                            >
                                                {org.status === 'active' ? <Lock size={16} /> : <Unlock size={16} />}
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="text-gray-400 hover:text-blue-600 hover:bg-blue-50"
                                                onClick={() => navigate(`/admin/organizations/${org.id}/edit`)}
                                            >
                                                <Edit2 size={16} />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="text-gray-400 hover:text-red-600 hover:bg-red-50"
                                                onClick={() => setDeleteId(org.id)}
                                            >
                                                <Trash2 size={16} />
                                            </Button>
                                        </Flex>
                                    </TableCell>
                                </motion.tr>
                            ))}
                        </AnimatePresence>
                    </TableBody>
                </Table>

                {totalCount === 0 && (
                    <Block className="p-20 text-center">
                        <Text className="text-gray-400 font-medium">No organizations matched your filters.</Text>
                        <Button variant="ghost" onClick={clearFilters} className="mt-4 text-primary">Clear all filters</Button>
                    </Block>
                )}
            </Block>

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
            />
        </Block>
    );
};
