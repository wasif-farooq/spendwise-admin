import {
    Search,
    Filter,
    XCircle,
    ArrowUpRight,
    ArrowDownLeft,
    Download,
    Eye
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
import { useTransactionsList } from '@/hooks/features/admin/useTransactionsList';
import { motion, AnimatePresence } from 'framer-motion';

export const TransactionsListPage = () => {
    const {
        transactions,
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
        formatCurrency
    } = useTransactionsList();

    return (
        <Block className="space-y-6">
            <Block>
                <Text as="h1" className="text-3xl font-black text-gray-900 tracking-tight">Transactions</Text>
                <Text className="text-gray-500 font-medium">Monitor {totalCount} financial activities across the platform</Text>
            </Block>

            <Block className="bg-white p-4 rounded-3xl shadow-sm border border-gray-100 space-y-4">
                <Flex gap={4} align="center" className="flex-wrap md:flex-nowrap">
                    <Block className="flex-grow relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <Input
                            placeholder="Search by description or category..."
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
                    <Button variant="outline" className="rounded-2xl shrink-0">
                        <Download size={18} className="mr-2" />
                        Export
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
                                    label="Transaction Type"
                                    value={filters.type || 'all'}
                                    onChange={(val) => setFilter('type', val)}
                                    options={[
                                        { label: 'All Types', value: 'all' },
                                        { label: 'Income', value: 'income' },
                                        { label: 'Expense', value: 'expense' },
                                    ]}
                                />
                                <CustomSelect
                                    label="Status"
                                    value={filters.status || 'all'}
                                    onChange={(val) => setFilter('status', val)}
                                    options={[
                                        { label: 'All Statuses', value: 'all' },
                                        { label: 'Completed', value: 'completed' },
                                        { label: 'Pending', value: 'pending' },
                                        { label: 'Failed', value: 'failed' },
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
                            <TableHead className="py-4 pl-6">Description</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right pr-6">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <AnimatePresence mode="popLayout">
                            {transactions.map((transaction) => (
                                <motion.tr
                                    key={transaction.id}
                                    layout
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="hover:bg-gray-50/50 transition-colors"
                                >
                                    <TableCell className="py-4 pl-6">
                                        <Flex align="center" gap={3}>
                                            <Block className={`p-2 rounded-xl ${transaction.type === 'income' ? 'bg-green-100/50 text-green-600' : 'bg-red-100/50 text-red-600'}`}>
                                                {transaction.type === 'income' ? <ArrowDownLeft size={16} /> : <ArrowUpRight size={16} />}
                                            </Block>
                                            <Block>
                                                <Text className="font-bold text-gray-900">{transaction.description}</Text>
                                                <Text className="text-xs text-gray-500 capitalize">{transaction.type}</Text>
                                            </Block>
                                        </Flex>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="secondary" className="bg-gray-100 text-gray-700 border-gray-200">
                                            {transaction.category}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <Text className="text-sm text-gray-600">
                                            {new Date(transaction.date).toLocaleDateString()}
                                        </Text>
                                        <Text className="text-xs text-gray-400">
                                            {new Date(transaction.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </Text>
                                    </TableCell>
                                    <TableCell>
                                        <Text className={`font-bold ${transaction.type === 'income' ? 'text-green-600' : 'text-gray-900'}`}>
                                            {transaction.type === 'income' ? '+' : ''}{formatCurrency(transaction.amount)}
                                        </Text>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant={transaction.status === 'completed' ? 'success' : transaction.status === 'pending' ? 'warning' : 'error'}>
                                            {transaction.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right pr-6">
                                        <Button variant="ghost" size="sm" className="text-gray-400 hover:text-primary">
                                            <Eye size={16} />
                                        </Button>
                                    </TableCell>
                                </motion.tr>
                            ))}
                        </AnimatePresence>
                    </TableBody>
                </Table>

                {totalCount === 0 && (
                    <Block className="p-20 text-center">
                        <Text className="text-gray-400 font-medium">No transactions found.</Text>
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
