import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
    ArrowLeft,
    Mail,
    Calendar,
    Shield,
    Trash2,
    Users,
    Building2,
    MoreVertical
} from 'lucide-react';
import { Block, Flex, Text } from '@shared';
import Button from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '@/components/ui';
import { ConfirmationModal } from '@/components/ui/ConfirmationModal';
import { useAdminOrganizations } from '@/hooks/features/admin/useAdminOrganizations';
import { useOrganizationMembers } from '@/hooks/features/admin/useOrganizationMembers';
import { motion, AnimatePresence } from 'framer-motion';

export const OrganizationDetailsPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { getOrgById } = useAdminOrganizations();
    const { members, loading: membersLoading, removeMember } = useOrganizationMembers(id);

    const [org, setOrg] = useState<any>(null);
    const [loadingOrg, setLoadingOrg] = useState(true);
    const [deleteMemberId, setDeleteMemberId] = useState<string | null>(null);
    const [actionLoading, setActionLoading] = useState(false);

    useEffect(() => {
        const fetchOrg = async () => {
            if (id) {
                setLoadingOrg(true);
                const data = await getOrgById(id);
                setOrg(data);
                setLoadingOrg(false);
            }
        };
        fetchOrg();
    }, [id, getOrgById]);

    const handleRemoveMember = async () => {
        if (!deleteMemberId) return;
        setActionLoading(true);
        try {
            await removeMember(deleteMemberId);
            setDeleteMemberId(null);
        } finally {
            setActionLoading(false);
        }
    };

    if (loadingOrg) {
        return (
            <Block className="p-8 flex justify-center">
                <Text className="animate-pulse text-gray-400">Loading organization details...</Text>
            </Block>
        );
    }

    if (!org) {
        return (
            <Block className="p-8 text-center">
                <Text className="text-red-500">Organization not found</Text>
                <Button variant="ghost" onClick={() => navigate('/admin/organizations')} className="mt-4">
                    Back to Organizations
                </Button>
            </Block>
        );
    }

    return (
        <Block className="space-y-6">
            <ConfirmationModal
                isOpen={!!deleteMemberId}
                onClose={() => setDeleteMemberId(null)}
                onConfirm={handleRemoveMember}
                title="Remove Member"
                description="Are you sure you want to remove this member from the organization? They will lose access to organization resources."
                confirmText="Remove Member"
                variant="danger"
                loading={actionLoading}
            />

            <Flex align="center" gap={4}>
                <Button variant="ghost" onClick={() => navigate('/admin/organizations')} className="p-2">
                    <ArrowLeft size={20} />
                </Button>
                <Block>
                    <Text as="h1" className="text-2xl font-bold text-gray-900">{org.name}</Text>
                    <Flex align="center" gap={2} className="text-gray-500 text-sm">
                        <Building2 size={14} />
                        <Text>Organization Details & Members</Text>
                    </Flex>
                </Block>
            </Flex>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Org Summary Card */}
                <Card className="p-6 space-y-4 md:col-span-1 h-fit">
                    <Flex align="center" gap={4}>
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold">
                            {org.name.charAt(0)}
                        </div>
                        <Block>
                            <Text className="font-bold text-lg">{org.name}</Text>
                            <Text className="text-sm text-gray-500">{org.id}</Text>
                        </Block>
                    </Flex>

                    <div className="pt-4 border-t border-gray-100 space-y-3">
                        <Flex justify="between">
                            <Text className="text-gray-500">Status</Text>
                            <Badge variant={org.status === 'active' ? 'success' : 'warning'}>{org.status}</Badge>
                        </Flex>
                        <Flex justify="between">
                            <Text className="text-gray-500">Plan</Text>
                            <Badge variant="secondary" className="uppercase">{org.plan}</Badge>
                        </Flex>
                        <Flex justify="between">
                            <Text className="text-gray-500">Members</Text>
                            <Text className="font-medium">{members.length} / {org.seats || '-'}</Text>
                        </Flex>
                        <Flex justify="between">
                            <Text className="text-gray-500">Created</Text>
                            <Text className="font-medium">{new Date(org.createdAt || Date.now()).toLocaleDateString()}</Text>
                        </Flex>
                    </div>
                </Card>

                {/* Members List */}
                <Block className="md:col-span-2 space-y-4">
                    <Flex justify="between" align="center">
                        <Text as="h2" className="text-xl font-bold text-gray-900">Members</Text>
                        {/* Could add 'Invite Member' button here if API supported generic invites */}
                    </Flex>

                    <Card className="overflow-hidden">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-gray-50/50">
                                    <TableHead className="py-4 pl-6">Member</TableHead>
                                    <TableHead>Role</TableHead>
                                    <TableHead>Joined</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right pr-6">Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {membersLoading ? (
                                    <TableRow>
                                        <TableCell colSpan={5} className="h-32 text-center text-gray-500">Loading members...</TableCell>
                                    </TableRow>
                                ) : members.length > 0 ? (
                                    members.map((member) => (
                                        <TableRow key={member.id} className="hover:bg-gray-50/50">
                                            <TableCell className="py-4 pl-6">
                                                <Flex align="center" gap={3}>
                                                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 font-bold text-xs">
                                                        {member.name.charAt(0)}
                                                    </div>
                                                    <Block>
                                                        <Text className="font-medium text-gray-900">{member.name}</Text>
                                                        <Text className="text-xs text-gray-500">{member.email}</Text>
                                                    </Block>
                                                </Flex>
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant="outline" className="border-gray-200 text-gray-600">
                                                    {member.role}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                <Text className="text-sm text-gray-600">{new Date(member.joinedDate).toLocaleDateString()}</Text>
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant={member.status === 'active' ? 'success' : 'secondary'}>
                                                    {member.status}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-right pr-6">
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="text-gray-400 hover:text-red-600 hover:bg-red-50"
                                                    onClick={() => setDeleteMemberId(member.id)}
                                                    title="Remove Member"
                                                >
                                                    <Trash2 size={16} />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={5} className="h-32 text-center text-gray-500">No members found in this organization.</TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </Card>
                </Block>
            </div>
        </Block>
    );
};
