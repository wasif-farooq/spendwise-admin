import {
    Wallet,
    Building2,
    MoreVertical,
    AlertCircle,
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
import { useAccountsList } from '@/hooks/features/admin/useAccountsList';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { ConfirmationModal } from '@/components/ui/ConfirmationModal';
import { toast } from 'sonner';

export const AccountsListPage = () => {
    const {
        accounts,
        loading,
        error,
        searchQuery,
        setSearchQuery,
        currentPage,
        setCurrentPage,
        totalPages,
        filters,
        setFilter,
        clearFilters,
        handleFlagAccount,
        deleteAccount,
        totalLiquid,
        totalLiability,
        totalCount,
        showFilters,
        setShowFilters,
        navigate
    } = useAccountsList();

    const [deleteId, setDeleteId] = useState<string | null>(null);
    const [actionLoading, setActionLoading] = useState(false);

    const handleDelete = async () => {
        if (!deleteId) return;
        setActionLoading(true);
        try {
            await deleteAccount(deleteId);
            toast.success('Account deleted successfully');
            setDeleteId(null);
        } catch (error) {
            toast.error('Failed to delete account');
        } finally {
            setActionLoading(false);
        }
    };

    if (loading && accounts.length === 0) {
        return <Block className="p-8 h-64 flex items-center justify-center"><Text className="animate-pulse text-gray-400">Loading accounts...</Text></Block>;
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
                title="Delete Account"
                description="Are you sure you want to delete this account? This action cannot be undone."
                confirmText="Delete Account"
                variant="danger"
                loading={actionLoading}
            />

            <Flex justify="between" align="end" className="flex-wrap gap-4">
                <Block>
                    <Text as="h1" className="text-3xl font-black text-gray-900 tracking-tight">Financial Accounts</Text>
                    <Text className="text-gray-500 font-medium">Monitoring {totalCount} total financial entities</Text>
                </Block>
                <Flex gap={4}>
                    <Block className="bg-white/80 backdrop-blur-md p-4 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-6">
                        <Block>
                            <Text className="text-[10px] text-gray-400 uppercase font-black tracking-widest mb-1">Total Liquid</Text>
                            <Text className="font-bold text-xl text-green-600">${totalLiquid.toLocaleString()}</Text>
                        </Block>
                        <Block className="w-[1px] h-10 bg-gray-100" />
                        <Block>
                            <Text className="text-[10px] text-gray-400 uppercase font-black tracking-widest mb-1">Total Liability</Text>
                            <Text className="font-bold text-xl text-red-600">${totalLiability.toLocaleString()}</Text>
                        </Block>
                    </Block>
                    <Button
                        className="gap-2 rounded-xl h-[88px]"
                        onClick={() => navigate('/admin/accounts/new')}
                    >
                        <Plus size={18} />
                        <span className="hidden md:inline">Add Account</span>
                    </Button>
                </Flex>
            </Flex>

            <Block className="bg-white p-4 rounded-3xl shadow-sm border border-gray-100 space-y-4">
                <Flex gap={4} align="center" className="flex-wrap md:flex-nowrap">
                    <Block className="flex-grow relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <Input
                            placeholder="Quick search by name or organization..."
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
                        Advanced Filters
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
                            <Block className="pt-4 border-t border-gray-50 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                <CustomSelect
                                    label="Account Type"
                                    value={filters.type || 'all'}
                                    onChange={(val) => setFilter('type', val)}
                                    options={[
                                        { label: 'All Types', value: 'all' },
                                        { label: 'Checking', value: 'checking' },
                                        { label: 'Savings', value: 'savings' },
                                        { label: 'Investment', value: 'investment' },
                                    ]}
                                />
                                <Input
                                    label="Owner Email"
                                    placeholder="Filter by member..."
                                    value={filters.ownerEmail || ''}
                                    onChange={(e) => setFilter('ownerEmail', e.target.value)}
                                />
                                <Block className="space-y-2">
                                    <Text className="text-sm font-semibold text-gray-700 ml-1">Balance Range</Text>
                                    <Flex gap={2}>
                                        <Input
                                            placeholder="Min"
                                            type="number"
                                            value={filters.balance?.min ?? ''}
                                            onChange={(e) => setFilter('balance', { ...filters.balance, min: e.target.value ? Number(e.target.value) : undefined })}
                                        />
                                        <Input
                                            placeholder="Max"
                                            type="number"
                                            value={filters.balance?.max ?? ''}
                                            onChange={(e) => setFilter('balance', { ...filters.balance, max: e.target.value ? Number(e.target.value) : undefined })}
                                        />
                                    </Flex>
                                </Block>
                                <Input
                                    label="Organization"
                                    placeholder="Specific org name..."
                                    value={filters.organization || ''}
                                    onChange={(e) => setFilter('organization', e.target.value)}
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
                            <TableHead className="py-4 pl-6">Account</TableHead>
                            <TableHead>Organization</TableHead>
                            <TableHead>Member</TableHead>
                            <TableHead>Balance</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right pr-6">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <AnimatePresence mode="popLayout">
                            {accounts.map((account) => (
                                <motion.tr
                                    key={account.id}
                                    layout
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="hover:bg-gray-50/50 transition-colors group"
                                >
                                    <TableCell className="py-4 pl-6">
                                        <Flex align="center" gap={3}>
                                            <Block className="p-2 bg-gray-100 rounded-xl group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                                                <Wallet size={18} />
                                            </Block>
                                            <Block>
                                                <Text className="font-bold text-gray-900">{account.name}</Text>
                                                <Text className="text-[10px] text-gray-400 uppercase font-black tracking-widest">{account.type}</Text>
                                            </Block>
                                        </Flex>
                                    </TableCell>
                                    <TableCell>
                                        <Flex align="center" gap={1.5}>
                                            <Building2 size={14} className="text-gray-400" />
                                            <Text className="text-sm text-gray-600 font-medium">{account.organization}</Text>
                                        </Flex>
                                    </TableCell>
                                    <TableCell>
                                        <Text className="text-sm text-gray-500 italic">{account.ownerEmail}</Text>
                                    </TableCell>
                                    <TableCell>
                                        <Text className={`font-black ${account.balance < 0 ? 'text-red-500' : 'text-gray-900'}`}>
                                            {account.balance < 0 ? '-' : ''}${Math.abs(account.balance).toLocaleString()}
                                        </Text>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant={account.status === 'active' ? 'success' : account.status === 'flagged' ? 'warning' : 'secondary'}>
                                            {account.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right pr-6">
                                        <Flex justify="end" gap={2}>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => handleFlagAccount(account.id)}
                                                title="Flag Account"
                                                className={account.status === 'flagged' ? 'text-orange-500 bg-orange-50' : 'text-gray-400'}
                                            >
                                                <AlertCircle size={16} />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="text-gray-400 hover:text-blue-600 hover:bg-blue-50"
                                                onClick={() => navigate(`/admin/accounts/${account.id}/edit`)}
                                            >
                                                <Edit2 size={16} />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="text-gray-400 hover:text-red-600 hover:bg-red-50"
                                                onClick={() => setDeleteId(account.id)}
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
                        <Text className="text-gray-400 font-medium">No accounts matched your filters.</Text>
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
