import {
    MoreVertical,
    UserX,
    UserCheck,
    Mail,
    Shield,
    Search,
    Filter,
    XCircle
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
import { useAdminUsers } from '@/hooks/features/admin/useAdminUsers';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

export const UsersListPage = () => {
    const {
        users,
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
        totalCount
    } = useAdminUsers();

    const [showFilters, setShowFilters] = useState(false);

    if (loading && users.length === 0) {
        return <Block className="p-8 h-64 flex items-center justify-center"><Text className="animate-pulse text-gray-400">Loading users...</Text></Block>;
    }

    if (error) {
        return <Block className="p-8"><Text className="text-red-500 bg-red-50 p-4 rounded-xl border border-red-100">Error: {error}</Text></Block>;
    }

    return (
        <Block className="space-y-6">
            <Block>
                <Text as="h1" className="text-3xl font-black text-gray-900 tracking-tight">Users Management</Text>
                <Text className="text-gray-500 font-medium">Manage {totalCount} registered users across the platform</Text>
            </Block>

            <Block className="bg-white p-4 rounded-3xl shadow-sm border border-gray-100 space-y-4">
                <Flex gap={4} align="center" className="flex-wrap md:flex-nowrap">
                    <Block className="flex-grow relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <Input
                            placeholder="Search by name, email or role..."
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
                                    label="User Role"
                                    value={filters.role || 'all'}
                                    onChange={(val) => setFilter('role', val)}
                                    options={[
                                        { label: 'All Roles', value: 'all' },
                                        { label: 'Admin', value: 'admin' },
                                        { label: 'Staff', value: 'staff' },
                                        { label: 'User', value: 'user' },
                                    ]}
                                />
                                <CustomSelect
                                    label="Account Status"
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
                            <TableHead className="py-4 pl-6">User</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead>Joined Orgs</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right pr-6">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <AnimatePresence mode="popLayout">
                            {users.map((user) => (
                                <motion.tr
                                    key={user.id}
                                    layout
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="hover:bg-gray-50/50 transition-colors"
                                >
                                    <TableCell className="py-4 pl-6">
                                        <Block>
                                            <Text className="font-bold text-gray-900">{user.name}</Text>
                                            <Flex align="center" gap={1}>
                                                <Mail size={12} className="text-gray-400" />
                                                <Text className="text-xs text-gray-500">{user.email}</Text>
                                            </Flex>
                                        </Block>
                                    </TableCell>
                                    <TableCell>
                                        <Flex align="center" gap={1.5}>
                                            <Shield size={14} className="text-gray-400" />
                                            <Text className="capitalize text-sm font-medium">{user.role}</Text>
                                        </Flex>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="secondary" className="bg-blue-50 text-blue-700 hover:bg-blue-100">
                                            {user.joinedOrgsCount || 0} Orgs
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant={user.status === 'active' ? 'success' : 'error'}>
                                            {user.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right pr-6">
                                        <Flex justify="end" gap={2}>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => handleToggleStatus(user.id)}
                                                title={user.status === 'active' ? 'Suspend' : 'Activate'}
                                                className={user.status === 'active' ? 'text-gray-400 hover:text-red-500 hover:bg-red-50' : 'text-gray-400 hover:text-green-500 hover:bg-green-50'}
                                            >
                                                {user.status === 'active' ? <UserX size={16} /> : <UserCheck size={16} />}
                                            </Button>
                                            <Button variant="ghost" size="sm" className="text-gray-400">
                                                <MoreVertical size={16} />
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
                        <Text className="text-gray-400 font-medium">No users matched your filters.</Text>
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
