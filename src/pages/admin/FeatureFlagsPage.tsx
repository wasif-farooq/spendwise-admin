import {
    Search,
    AlertTriangle,
    Plus,
    RefreshCw,
    Filter,
    XCircle
} from 'lucide-react';
import { Block, Flex, Text } from '@shared';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import {
    Table,
    TableHeader,
    TableBody,
    TableRow,
    TableHead,
    TableCell,
    Pagination
} from '@/components/ui';
import { CustomSelect } from '@/components/ui/CustomSelect';
import { useAdminFeatureFlags } from '@/hooks/features/admin/useAdminFeatureFlags';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

export const FeatureFlagsPage = () => {
    const {
        flags,
        loading,
        error,
        searchQuery,
        setSearchQuery,
        toggleFlag,
        currentPage,
        setCurrentPage,
        totalPages,
        filters,
        setFilter,
        clearFilters,
        totalCount,
        refresh
    } = useAdminFeatureFlags();

    const [showFilters, setShowFilters] = useState(false);

    if (loading && flags.length === 0) {
        return <Block className="p-8 h-64 flex items-center justify-center"><Text className="animate-pulse text-gray-400">Loading feature flags...</Text></Block>;
    }

    if (error) {
        return <Block className="p-8"><Text className="text-red-500 bg-red-50 p-4 rounded-xl border border-red-100">Error: {error}</Text></Block>;
    }

    return (
        <Block className="space-y-6">
            <Flex justify="between" align="end" className="flex-wrap gap-4">
                <Block>
                    <Text as="h1" className="text-3xl font-black text-gray-900 tracking-tight">Feature Toggles</Text>
                    <Text className="text-gray-500 font-medium">Control system features and experimental rollouts</Text>
                </Block>
                <Flex gap={2}>
                    <Button variant="outline" className="gap-2 rounded-xl" onClick={refresh}>
                        <RefreshCw size={18} />
                        Sync config
                    </Button>
                    <Button className="gap-2 rounded-xl">
                        <Plus size={18} />
                        New Flag
                    </Button>
                </Flex>
            </Flex>

            <Block className="bg-amber-50/50 border border-amber-100 rounded-3xl p-5 flex gap-4 shadow-sm">
                <Block className="bg-amber-100 p-2 rounded-xl h-fit">
                    <AlertTriangle className="text-amber-600" size={20} />
                </Block>
                <Block>
                    <Text className="font-bold text-amber-900 text-lg">Critical System Controls</Text>
                    <Text className="text-sm text-amber-800 mt-1 leading-relaxed">
                        Changes to feature flags take effect immediately for all active sessions.
                        Toggling critical features in <strong>production</strong> may impact system stability.
                    </Text>
                </Block>
            </Block>

            <Block className="bg-white p-4 rounded-3xl shadow-sm border border-gray-100 space-y-4">
                <Flex gap={4} align="center" className="flex-wrap md:flex-nowrap">
                    <Block className="flex-grow relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <Input
                            placeholder="Search flags by name or identifier..."
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
                                        { label: 'Enabled', value: 'enabled' },
                                        { label: 'Disabled', value: 'disabled' },
                                        { label: 'Experimental', value: 'experimental' },
                                    ]}
                                />
                                {/* Could add Environment filter if data supports it properly in useTable */}
                            </Block>
                        </motion.div>
                    )}
                </AnimatePresence>
            </Block>

            <Block className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-gray-50/50">
                            <TableHead className="w-[200px] py-4 pl-6">Feature</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="w-[150px]">Environments</TableHead>
                            <TableHead className="w-[120px]">Updated At</TableHead>
                            <TableHead className="text-right pr-6">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <AnimatePresence mode="popLayout">
                            {flags.map(flag => (
                                <motion.tr
                                    key={flag.id}
                                    layout
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="hover:bg-gray-50/50 transition-colors"
                                >
                                    <TableCell className="py-4 pl-6">
                                        <Block className="space-y-1">
                                            <Text className="font-bold text-gray-900">{flag.name}</Text>
                                            <Text className="text-xs font-mono text-gray-400 block bg-gray-100 px-1.5 py-0.5 rounded w-fit">{flag.id}</Text>
                                        </Block>
                                    </TableCell>
                                    <TableCell className="max-w-[300px]">
                                        <Text className="text-sm text-gray-600 line-clamp-2">
                                            {flag.description}
                                        </Text>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant={flag.status === 'enabled' ? 'success' : flag.status === 'experimental' ? 'warning' : 'secondary'}>
                                            {flag.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <Flex gap={1} wrap>
                                            {flag.environments.map(env => (
                                                <Text key={env} className="text-[10px] font-bold uppercase py-0.5 px-2 bg-gray-100 text-gray-600 rounded">
                                                    {env}
                                                </Text>
                                            ))}
                                        </Flex>
                                    </TableCell>
                                    <TableCell>
                                        <Text className="text-xs text-gray-500 whitespace-nowrap">
                                            {flag.updatedAt}
                                        </Text>
                                    </TableCell>
                                    <TableCell className="text-right pr-6">
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input
                                                type="checkbox"
                                                className="sr-only peer"
                                                checked={flag.status === 'enabled'}
                                                onChange={() => toggleFlag(flag.id)}
                                            />
                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                                        </label>
                                    </TableCell>
                                </motion.tr>
                            ))}
                        </AnimatePresence>
                        {totalCount === 0 && (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center py-12">
                                    <Text className="text-gray-400 italic">No feature flags found matching your criteria</Text>
                                    <Button variant="ghost" onClick={clearFilters} className="mt-4 text-primary">Clear all filters</Button>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </Block>

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
            />
        </Block>
    );
};
