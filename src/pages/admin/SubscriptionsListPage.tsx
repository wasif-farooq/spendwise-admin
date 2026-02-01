import {
    Search,
    Filter,
    XCircle,
    Calendar,
    CreditCard
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
import { useSubscriptionsList } from '@/hooks/features/admin/useSubscriptionsList';
import { motion, AnimatePresence } from 'framer-motion';

export const SubscriptionsListPage = () => {
    const {
        subscriptions,
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
        setShowFilters
    } = useSubscriptionsList();

    if (loading && subscriptions.length === 0) {
        return <Block className="p-8 h-64 flex items-center justify-center"><Text className="animate-pulse text-gray-400">Loading subscriptions...</Text></Block>;
    }

    if (error) {
        return <Block className="p-8"><Text className="text-red-500 bg-red-50 p-4 rounded-xl border border-red-100">Error: {error}</Text></Block>;
    }

    return (
        <Block className="space-y-6">
            <Block>
                <Text as="h1" className="text-3xl font-black text-gray-900 tracking-tight">Subscriptions</Text>
                <Text className="text-gray-500 font-medium">Manage {totalCount} recurring payments and plans</Text>
            </Block>

            <Block className="bg-white p-4 rounded-3xl shadow-sm border border-gray-100 space-y-4">
                <Flex gap={4} align="center" className="flex-wrap md:flex-nowrap">
                    <Block className="flex-grow relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <Input
                            placeholder="Search by ID or payment method..."
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
                                        { label: 'Paid', value: 'Paid' },
                                        { label: 'Pending', value: 'Pending' },
                                        { label: 'Failed', value: 'Failed' },
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
                            <TableHead className="py-4 pl-6">Subscription ID</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead>Payment Method</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right pr-6">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <AnimatePresence mode="popLayout">
                            {subscriptions.map((sub) => (
                                <motion.tr
                                    key={sub.id}
                                    layout
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="hover:bg-gray-50/50 transition-colors"
                                >
                                    <TableCell className="py-4 pl-6">
                                        <Text className="font-mono text-gray-600 bg-gray-100 px-2 py-1 rounded-md text-sm">{sub.id}</Text>
                                    </TableCell>
                                    <TableCell>
                                        <Flex align="center" gap={2}>
                                            <Calendar size={14} className="text-gray-400" />
                                            <Text className="text-sm text-gray-600">{sub.date}</Text>
                                        </Flex>
                                    </TableCell>
                                    <TableCell>
                                        <Text className="font-bold text-gray-900">{sub.amount}</Text>
                                    </TableCell>
                                    <TableCell>
                                        <Flex align="center" gap={2}>
                                            <CreditCard size={14} className="text-gray-400" />
                                            <Text className="text-sm text-gray-600">{sub.method}</Text>
                                        </Flex>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant={sub.status === 'Paid' ? 'success' : sub.status === 'Pending' ? 'warning' : 'error'}>
                                            {sub.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right pr-6">
                                        <Button variant="ghost" size="sm" className="text-gray-400 hover:text-primary">
                                            View Details
                                        </Button>
                                    </TableCell>
                                </motion.tr>
                            ))}
                        </AnimatePresence>
                    </TableBody>
                </Table>

                {totalCount === 0 && (
                    <Block className="p-20 text-center">
                        <Text className="text-gray-400 font-medium">No subscriptions matched your filters.</Text>
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
