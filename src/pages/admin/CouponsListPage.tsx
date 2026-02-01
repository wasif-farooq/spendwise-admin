import {
    Search,
    Filter,
    XCircle,
    Ticket,
    Copy,
    Trash2,
    Plus,
    Edit2
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
import { useCouponsList } from '@/hooks/features/admin/useCouponsList';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { ConfirmationModal } from '@/components/ui/ConfirmationModal';
import { toast } from 'sonner';

export const CouponsListPage = () => {
    const {
        coupons,
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
        totalCount,
        showFilters,
        setShowFilters,
        handleCopyCode,
        navigate,
        deleteCoupon
    } = useCouponsList();

    const [deleteId, setDeleteId] = useState<string | null>(null);
    const [actionLoading, setActionLoading] = useState(false);

    const handleDelete = async () => {
        if (!deleteId) return;
        setActionLoading(true);
        try {
            await deleteCoupon(deleteId);
            toast.success('Coupon deleted successfully');
            setDeleteId(null);
        } catch (error) {
            toast.error('Failed to delete coupon');
        } finally {
            setActionLoading(false);
        }
    };

    if (loading && coupons.length === 0) {
        return <Block className="p-8 h-64 flex items-center justify-center"><Text className="animate-pulse text-gray-400">Loading coupons...</Text></Block>;
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
                title="Delete Coupon"
                description="Are you sure you want to delete this coupon? Users will no longer be able to redeem it."
                confirmText="Delete Coupon"
                variant="danger"
                loading={actionLoading}
            />

            <Flex justify="between" align="end" className="flex-wrap gap-4">
                <Block>
                    <Text as="h1" className="text-3xl font-black text-gray-900 tracking-tight">Coupons</Text>
                    <Text className="text-gray-500 font-medium">Manage {totalCount} discount codes</Text>
                </Block>
                <Button
                    className="gap-2 rounded-xl"
                    onClick={() => navigate('/admin/coupons/new')}
                >
                    <Plus size={18} />
                    Create Coupon
                </Button>
            </Flex>

            <Block className="bg-white p-4 rounded-3xl shadow-sm border border-gray-100 space-y-4">
                <Flex gap={4} align="center" className="flex-wrap md:flex-nowrap">
                    <Block className="flex-grow relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <Input
                            placeholder="Search by coupon code..."
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
                            <Block className="pt-4 border-t border-gray-50 grid grid-cols-1 md:grid-cols-2 gap-4">
                                <CustomSelect
                                    label="Status"
                                    value={filters.status || 'all'}
                                    onChange={(val) => setFilter('status', val)}
                                    options={[
                                        { label: 'All Statuses', value: 'all' },
                                        { label: 'Active', value: 'active' },
                                        { label: 'Expired', value: 'expired' },
                                        { label: 'Disabled', value: 'disabled' },
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
                            <TableHead className="py-4 pl-6">Code</TableHead>
                            <TableHead>Discount</TableHead>
                            <TableHead>Usage</TableHead>
                            <TableHead>Expiry</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right pr-6">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <AnimatePresence mode="popLayout">
                            {coupons.map((coupon) => (
                                <motion.tr
                                    key={coupon.id}
                                    layout
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="hover:bg-gray-50/50 transition-colors"
                                >
                                    <TableCell className="py-4 pl-6">
                                        <Flex align="center" gap={3}>
                                            <Block className="bg-purple-50 p-2 rounded-lg text-purple-600">
                                                <Ticket size={20} />
                                            </Block>
                                            <Block>
                                                <Text className="font-bold text-gray-900 font-mono tracking-wider">{coupon.code}</Text>
                                                <Text className="text-xs text-gray-500">ID: {coupon.id}</Text>
                                            </Block>
                                        </Flex>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="secondary" className="bg-purple-100 text-purple-700 hover:bg-purple-200">
                                            {coupon.type === 'percentage' ? `${coupon.discount}% OFF` : `$${coupon.discount} OFF`}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <Block>
                                            <Flex align="center" justify="between" className="mb-1">
                                                <Text className="text-xs font-medium text-gray-700">{coupon.uses} / {coupon.maxUses}</Text>
                                            </Flex>
                                            <Block className="w-24 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                                <Block
                                                    className="h-full bg-purple-500 rounded-full"
                                                    style={{ width: `${Math.min((coupon.uses / coupon.maxUses) * 100, 100)}%` }}
                                                />
                                            </Block>
                                        </Block>
                                    </TableCell>
                                    <TableCell>
                                        <Text className="text-sm text-gray-600">
                                            {new Date(coupon.expiryDate).toLocaleDateString()}
                                        </Text>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant={coupon.status === 'active' ? 'success' : 'error'}>
                                            {coupon.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right pr-6">
                                        <Flex justify="end" gap={2}>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => handleCopyCode(coupon.code)}
                                                className="text-gray-400 hover:text-purple-600"
                                                title="Copy Code"
                                            >
                                                <Copy size={16} />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="text-gray-400 hover:text-blue-600 hover:bg-blue-50"
                                                onClick={() => navigate(`/admin/coupons/${coupon.id}/edit`)}
                                                title="Edit"
                                            >
                                                <Edit2 size={16} />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="text-gray-400 hover:text-red-500 hover:bg-red-50"
                                                onClick={() => setDeleteId(coupon.id)}
                                                title="Delete"
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
                        <Text className="text-gray-400 font-medium">No coupons matched your filters.</Text>
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
