import { useNavigate } from 'react-router-dom';
import {
    Search,
    UserPlus,
    XCircle,
    MoreVertical,
    Mail,
    Shield,
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
import { useStaffList } from '@/hooks/features/admin/useStaffList';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { ConfirmationModal } from '@/components/ui/ConfirmationModal';
import { toast } from 'sonner';

export const StaffListPage = () => {
    const {
        staff,
        loading,
        error,
        searchQuery,
        setSearchQuery,
        currentPage,
        setCurrentPage,
        totalPages,
        clearFilters,
        totalCount,
        getRoleNames,
        navigate,
        deleteStaff,
        refresh
    } = useStaffList();

    const [deleteId, setDeleteId] = useState<string | null>(null);
    const [actionLoading, setActionLoading] = useState(false);

    const handleDelete = async () => {
        if (!deleteId) return;
        setActionLoading(true);
        try {
            await deleteStaff(deleteId);
            toast.success('Staff member removed successfully');
            setDeleteId(null);
            refresh();
        } catch (error) {
            toast.error('Failed to remove staff member');
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
                title="Remove Staff Member"
                description="Are you sure you want to remove this staff member? They will lose access to the admin panel immediately."
                confirmText="Remove Member"
                variant="danger"
                loading={actionLoading}
            />

            <Flex justify="between" align="center" className="pb-6 border-b border-gray-100">
                <Block>
                    <Text as="h1" className="text-3xl font-black text-gray-900 tracking-tight">Staff Management</Text>
                    <Text className="text-gray-500 font-medium">Manage internal team members and their access</Text>
                </Block>
                <Button
                    className="gap-2 rounded-xl"
                    onClick={() => navigate('/admin/staff/new')}
                >
                    <UserPlus size={18} />
                    Invite Staff
                </Button>
            </Flex>

            {/* Filters Row */}
            <Flex gap={4} className="flex-col sm:flex-row">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                        placeholder="Search staff by name or email..."
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
                            <TableHead className="w-[300px]">Staff Member</TableHead>
                            <TableHead>Roles</TableHead>
                            <TableHead>Joined Date</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <AnimatePresence>
                            {loading ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="h-32 text-center text-gray-500">
                                        Loading staff...
                                    </TableCell>
                                </TableRow>
                            ) : staff.length > 0 ? (
                                staff.map((member) => (
                                    <motion.tr
                                        key={member.id}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="group hover:bg-gray-50/50 transition-colors"
                                    >
                                        <TableCell>
                                            <Flex align="center" gap={3}>
                                                <img
                                                    src={member.avatar || `https://ui-avatars.com/api/?name=${member.name}&background=random`}
                                                    alt={member.name}
                                                    className="w-10 h-10 rounded-full border border-gray-100"
                                                />
                                                <Block>
                                                    <Text className="font-bold text-gray-900">{member.name}</Text>
                                                    <Flex align="center" gap={1} className="text-gray-500 text-xs">
                                                        <Mail className="w-3 h-3" />
                                                        {member.email}
                                                    </Flex>
                                                </Block>
                                            </Flex>
                                        </TableCell>
                                        <TableCell>
                                            <Flex gap={1} wrap>
                                                {getRoleNames(member.roles).map((roleName, index) => (
                                                    <Badge key={index} variant="secondary" className="bg-gray-100 text-gray-700 hover:bg-gray-200">
                                                        <Shield className="w-3 h-3 mr-1" />
                                                        {roleName}
                                                    </Badge>
                                                ))}
                                            </Flex>
                                        </TableCell>
                                        <TableCell>
                                            <Text className="text-gray-500 font-medium">{member.joinedDate}</Text>
                                        </TableCell>
                                        <TableCell>
                                            <Badge
                                                className={
                                                    member.status === 'Active' ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200' :
                                                        member.status === 'Inactive' ? 'bg-gray-100 text-gray-600' :
                                                            'bg-amber-100 text-amber-700'
                                                }
                                            >
                                                {member.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Flex justify="end" gap={2}>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => navigate(`/admin/staff/${member.id}/edit`)}
                                                >
                                                    <Edit2 size={16} className="text-gray-500" />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="text-red-500 hover:bg-red-50"
                                                    onClick={() => setDeleteId(member.id.toString())}
                                                >
                                                    <Trash2 size={16} />
                                                </Button>
                                            </Flex>
                                        </TableCell>
                                    </motion.tr>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={5} className="h-32 text-center text-gray-500">
                                        <Flex direction="col" align="center" gap={2}>
                                            <XCircle className="h-8 w-8 text-gray-300" />
                                            <Text>No staff found matching "{searchQuery}"</Text>
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
