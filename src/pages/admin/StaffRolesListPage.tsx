import {
    Search,
    Plus,
    Edit3,
    Trash2,
    Lock,
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
import { useStaffRolesList } from '@/hooks/features/admin/useStaffRolesList';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { ConfirmationModal } from '@/components/ui/ConfirmationModal';
import { toast } from 'sonner';
import { PermissionGuard } from '@/components/shared/PermissionGuard';
import { RESOURCES, ACTIONS } from '@/constants/permissions';

export const StaffRolesListPage = () => {
    const {
        roles,
        loading,
        searchQuery,
        setSearchQuery,
        currentPage,
        setCurrentPage,
        totalPages,
        clearFilters,
        getIconComponent,
        navigate,
        deleteRole
    } = useStaffRolesList();

    const [deleteId, setDeleteId] = useState<number | null>(null);
    const [actionLoading, setActionLoading] = useState(false);

    const handleDelete = async () => {
        if (!deleteId) return;
        setActionLoading(true);
        try {
            await deleteRole(deleteId);
            toast.success('Role deleted successfully');
            setDeleteId(null);
        } catch (error) {
            toast.error('Failed to delete role');
        } finally {
            setActionLoading(false);
        }
    };

    return (
        <Block className="space-y-6">
            <ConfirmationModal
                isOpen={!!deleteId}
                onClose={() => setDeleteId(null)}
                onConfirm={handleDelete}
                title="Delete Role"
                description="Are you sure you want to delete this role? This action cannot be undone."
                confirmText="Delete Role"
                variant="danger"
                loading={actionLoading}
            />

            <Flex justify="between" align="center" className="pb-6 border-b border-gray-100">
                <Block>
                    <Text as="h1" className="text-3xl font-black text-gray-900 tracking-tight">Staff Roles & Permissions</Text>
                    <Text className="text-gray-500 font-medium">Manage access levels for internal staff</Text>
                </Block>
                <PermissionGuard resource={RESOURCES.STAFF_ROLES} action={ACTIONS.CREATE}>
                    <Button
                        className="gap-2 rounded-xl"
                        onClick={() => navigate('/admin/staff-roles/new')}
                    >
                        <Plus size={18} />
                        Create Staff Role
                    </Button>
                </PermissionGuard>
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
                                                    {(() => {
                                                        const Icon = getIconComponent(role.iconName);
                                                        return <Icon className="h-4 w-4" />;
                                                    })()}
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
                                                <Badge variant="secondary" className="text-blue-600 bg-blue-50 border-blue-100">
                                                    Custom Role
                                                </Badge>
                                            )}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Flex align="center" justify="end" gap={2}>
                                                <PermissionGuard resource={RESOURCES.STAFF_ROLES} action={ACTIONS.UPDATE}>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        className="h-8 w-8 p-0 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg"
                                                        onClick={() => navigate(`/admin/staff-roles/${role.id}/edit`)}
                                                    >
                                                        <Edit3 className="h-4 w-4" />
                                                    </Button>
                                                </PermissionGuard>
                                                {!role.isDefault && (
                                                    <PermissionGuard resource={RESOURCES.STAFF_ROLES} action={ACTIONS.DELETE}>
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            className="h-8 w-8 p-0 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg"
                                                            onClick={() => setDeleteId(role.id)}
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </Button>
                                                    </PermissionGuard>
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
                                            <Button variant="ghost" onClick={clearFilters} className="text-primary hover:bg-primary/5">
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
