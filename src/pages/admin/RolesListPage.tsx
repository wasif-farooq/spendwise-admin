import {
    Search,
    Plus,
    Shield,
    Users,
    Edit3,
    Trash2,
    Lock,
    XCircle,
    ShieldCheck,
    Eye,
    CreditCard,
    Zap,
    Ticket,
    Building2,
    Wallet
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
import { useAdminRoles } from '@/hooks/features/admin/useAdminRoles';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const ICON_MAP: Record<string, any> = {
    ShieldCheck,
    Users,
    Eye,
    CreditCard,
    Zap,
    Ticket,
    Building2,
    Wallet,
    Shield // Fallback
};

export const RolesListPage = () => {
    const {
        roles,
        loading,
        error,
        searchQuery,
        setSearchQuery,
        currentPage,
        setCurrentPage,
        totalPages,
        clearFilters,
        totalCount
    } = useAdminRoles();

    const navigate = useNavigate();

    // Helper to dynamically render icons
    const renderIcon = (iconName: string, className?: string) => {
        const IconComponent = ICON_MAP[iconName] || ICON_MAP.Shield;
        return <IconComponent className={className} />;
    };

    if (loading && roles.length === 0) {
        return <Block className="p-8 h-64 flex items-center justify-center"><Text className="animate-pulse text-gray-400">Loading roles...</Text></Block>;
    }

    if (error) {
        return <Block className="p-8"><Text className="text-red-500 bg-red-50 p-4 rounded-xl border border-red-100">Error: {error}</Text></Block>;
    }

    return (
        <Block className="space-y-6">
            <Flex justify="between" align="end" className="flex-wrap gap-4">
                <Block>
                    <Text as="h1" className="text-3xl font-black text-gray-900 tracking-tight">Roles & Permissions</Text>
                    <Text className="text-gray-500 font-medium">Manage access levels and effective permissions</Text>
                </Block>
                <Button
                    className="gap-2 rounded-xl"
                    onClick={() => navigate('/roles/new')}
                >
                    <Plus size={18} />
                    Create New Role
                </Button>
            </Flex>

            <Block className="bg-white p-4 rounded-3xl shadow-sm border border-gray-100 space-y-4">
                <Flex gap={4} align="center" className="flex-wrap md:flex-nowrap">
                    <Block className="flex-grow relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <Input
                            placeholder="Search roles by name or description..."
                            className="pl-11"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </Block>
                    {searchQuery && (
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
            </Block>

            <Block className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-gray-50/50">
                            <TableHead className="py-4 pl-6">Role Name</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead>Users</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead className="text-right pr-6">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <AnimatePresence mode="popLayout">
                            {roles.map((role) => (
                                <motion.tr
                                    key={role.id}
                                    layout
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="hover:bg-gray-50/50 transition-colors cursor-pointer"
                                    onClick={() => navigate(`/roles/${role.id}`)}
                                >
                                    <TableCell className="py-4 pl-6">
                                        <Flex align="center" gap={3}>
                                            <Block className={`p-2 rounded-xl bg-gradient-to-br ${role.color} text-white shadow-sm`}>
                                                {renderIcon(role.iconName, "w-5 h-5")}
                                            </Block>
                                            <Text className="font-bold text-gray-900">{role.name}</Text>
                                        </Flex>
                                    </TableCell>
                                    <TableCell>
                                        <Text className="text-sm text-gray-500 max-w-xs truncate">{role.description}</Text>
                                    </TableCell>
                                    <TableCell>
                                        <Flex align="center" gap={1.5}>
                                            <Users size={14} className="text-gray-400" />
                                            <Text className="text-sm font-medium">{role.usersCount || 0}</Text>
                                        </Flex>
                                    </TableCell>
                                    <TableCell>
                                        {role.isDefault ? (
                                            <Badge variant="primary" className="bg-blue-50 text-blue-700 hover:bg-blue-100 border-blue-100">
                                                Default
                                            </Badge>
                                        ) : (
                                            <Badge variant="secondary" className="bg-gray-100 text-gray-600 border-gray-200">
                                                Custom
                                            </Badge>
                                        )}
                                    </TableCell>
                                    <TableCell className="text-right pr-6">
                                        <div onClick={(e) => e.stopPropagation()}>
                                            <Flex justify="end" gap={2}>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => navigate(`/roles/${role.id}`)}
                                                    className="text-gray-400 hover:text-primary"
                                                >
                                                    <Edit3 size={16} />
                                                </Button>
                                                {role.isDefault ? (
                                                    <Button variant="ghost" size="sm" disabled className="text-gray-300 cursor-not-allowed">
                                                        <Lock size={16} />
                                                    </Button>
                                                ) : (
                                                    <Button variant="ghost" size="sm" className="text-gray-400 hover:text-red-500 hover:bg-red-50">
                                                        <Trash2 size={16} />
                                                    </Button>
                                                )}
                                            </Flex>
                                        </div>
                                    </TableCell>
                                </motion.tr>
                            ))}
                        </AnimatePresence>
                    </TableBody>
                </Table>

                {totalCount === 0 && (
                    <Block className="p-20 text-center">
                        <Text className="text-gray-400 font-medium">No roles matched your search.</Text>
                        <Button variant="ghost" onClick={clearFilters} className="mt-4 text-primary">Clear filters</Button>
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
