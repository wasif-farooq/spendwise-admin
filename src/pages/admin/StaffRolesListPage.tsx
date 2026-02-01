import { useNavigate } from 'react-router-dom';
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
    Wallet,
    Headphones
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
import { useAdminStaffRoles } from '@/hooks/features/admin/useAdminStaffRoles';
import { motion, AnimatePresence } from 'framer-motion';

const ICON_MAP: Record<string, any> = {
    ShieldCheck,
    Users,
    Eye,
    CreditCard,
    Zap,
    Ticket,
    Home: Building2,
    Building2,
    Wallet,
    Headphones,
    Shield
};

export const StaffRolesListPage = () => {
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
    } = useAdminStaffRoles();

    const navigate = useNavigate();

    const renderIcon = (iconName: string, className?: string) => {
        const IconComponent = ICON_MAP[iconName] || Shield;
        return <IconComponent className={className} />;
    };

    return (
        <Block className="space-y-6">
            <Flex justify="between" align="center" className="pb-6 border-b border-gray-100">
                <Block>
                    <Text as="h1" className="text-3xl font-black text-gray-900 tracking-tight">Staff Roles & Permissions</Text>
                    <Text className="text-gray-500 font-medium">Manage access levels for internal staff</Text>
                </Block>
                <Button
                    className="gap-2 rounded-xl"
                    onClick={() => navigate('/staff-roles/new')}
                >
                    <Plus size={18} />
                    Create Staff Role
                </Button>
            </Flex>

            {/* Filters Row */}
            <Flex gap={4} className="flex-col sm:flex-row">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                        placeholder="Search roles..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 bg-white border-gray-200"
                    />
                </div>
            </Flex>

            {/* Table */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[300px]">Role Name</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <AnimatePresence>
                            {loading ? (
                                <TableRow>
                                    <TableCell colSpan={4} className="h-32 text-center text-gray-500">
                                        Loading roles...
                                    </TableCell>
                                </TableRow>
                            ) : roles.length > 0 ? (
                                roles.map((role) => (
                                    <motion.tr
                                        key={role.id}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="group hover:bg-gray-50/50 transition-colors"
                                    >
                                        <TableCell>
                                            <Flex align="center" gap={3}>
                                                <div className={`p-2.5 rounded-xl bg-gradient-to-br ${role.color} text-white shadow-sm ring-2 ring-white`}>
                                                    {renderIcon(role.iconName, "h-4 w-4")}
                                                </div>
                                                <Block>
                                                    <Text className="font-bold text-gray-900">{role.name}</Text>
                                                    <Text className="text-xs text-gray-400 font-mono">ID: {role.id}</Text>
                                                </Block>
                                            </Flex>
                                        </TableCell>
                                        <TableCell>
                                            <Text className="text-gray-500">{role.description}</Text>
                                        </TableCell>
                                        <TableCell>
                                            {role.isDefault ? (
                                                <Badge variant="secondary" className="gap-1 bg-gray-100 text-gray-600 border-gray-200">
                                                    <Lock className="h-3 w-3" />
                                                    System Locked
                                                </Badge>
                                            ) : (
                                                <Badge variant="outline" className="text-blue-600 bg-blue-50 border-blue-100">
                                                    Custom Role
                                                </Badge>
                                            )}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Flex align="center" justify="end" gap={2}>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="h-8 w-8 p-0 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg"
                                                    onClick={() => navigate(`/staff-roles/${role.id}`)}
                                                >
                                                    <Edit3 className="h-4 w-4" />
                                                </Button>
                                                {!role.isDefault && (
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        className="h-8 w-8 p-0 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                )}
                                            </Flex>
                                        </TableCell>
                                    </motion.tr>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={4} className="h-32 text-center text-gray-500">
                                        <Flex direction="col" align="center" gap={2}>
                                            <XCircle className="h-8 w-8 text-gray-300" />
                                            <Text>No roles found matching "{searchQuery}"</Text>
                                            <Button variant="link" onClick={clearFilters} className="text-primary">
                                                Clear filters
                                            </Button>
                                        </Flex>
                                    </TableCell>
                                </TableRow>
                            )}
                        </AnimatePresence>
                    </TableBody>
                </Table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="pt-4 border-t border-gray-100">
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                    />
                </div>
            )}
        </Block>
    );
};
