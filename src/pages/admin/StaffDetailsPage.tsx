import { useStaffDetail } from '@/hooks/features/admin/useStaffDetail';
import { Block, Flex, Text } from '@shared';
import Button from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { CustomSelect } from '@/components/ui/CustomSelect';
import { Badge } from '@/components/ui/Badge';
import {
    ArrowLeft,
    Mail,
    Calendar,
    ShieldCheck,
    User,
    CheckCircle2
} from 'lucide-react';

export const StaffDetailsPage = () => {
    const {
        member,
        allRoles,
        selectedRole,
        handleRoleChange,
        currentRoleObject,
        navigate
    } = useStaffDetail();

    if (!member) {
        return <Block className="p-8"><Text className="animate-pulse text-gray-400">Loading staff details...</Text></Block>;
    }

    return (
        <Block className="space-y-6 max-w-4xl mx-auto">
            <Button variant="ghost" onClick={() => navigate('/staff')} className="text-gray-500 hover:text-gray-900 pl-0 gap-2">
                <ArrowLeft size={18} />
                Back to Staff List
            </Button>

            <Flex justify="between" align="start" className="flex-wrap gap-4">
                <Flex gap={4} align="center">
                    <Block className="w-16 h-16 rounded-2xl bg-gray-200 overflow-hidden shadow-inner">
                        <img
                            src={`https://ui-avatars.com/api/?name=${member.name}&background=random`}
                            alt={member.name}
                            className="w-full h-full object-cover"
                        />
                    </Block>
                    <Block>
                        <Text as="h1" className="text-3xl font-black text-gray-900 tracking-tight">{member.name}</Text>
                        <Flex align="center" gap={2} className="text-gray-500 mt-1">
                            <Mail size={14} />
                            <Text>{member.email}</Text>
                        </Flex>
                    </Block>
                </Flex>
                <Badge variant={member.status === 'Active' ? 'success' : 'error'} className="text-sm px-3 py-1">
                    {member.status.toUpperCase()}
                </Badge>
            </Flex>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Block className="md:col-span-2 space-y-6">
                    <Card className="p-6">
                        <Flex align="center" gap={3} className="mb-6 pb-4 border-b border-gray-100">
                            <Block className="bg-blue-100 p-2 rounded-xl">
                                <ShieldCheck size={20} className="text-blue-600" />
                            </Block>
                            <Text className="font-bold text-lg text-gray-900">Role & Access</Text>
                        </Flex>

                        <Block className="space-y-6">
                            <CustomSelect
                                label="Assigned Role"
                                value={selectedRole}
                                onChange={handleRoleChange}
                                options={allRoles.map(r => ({ label: r.name, value: r.id.toString() }))}
                            />

                            {currentRoleObject && (
                                <Block className="bg-blue-50/50 rounded-2xl p-4 border border-blue-100">
                                    <Text className="font-bold text-blue-900 mb-2">Effective Permissions</Text>
                                    <Text className="text-sm text-blue-700/80 mb-4">{currentRoleObject.description}</Text>

                                    <Block className="grid grid-cols-2 gap-2">
                                        {Object.entries(currentRoleObject.permissions).map(([resource, actions]) => (
                                            actions.length > 0 && (
                                                <Flex key={resource} align="center" gap={2} className="bg-white p-2 rounded-lg border border-blue-100/50">
                                                    <CheckCircle2 size={14} className="text-green-500" />
                                                    <Text className="text-sm text-gray-700">
                                                        <span className="font-bold capitalize">{resource}</span>: {actions.join(', ')}
                                                    </Text>
                                                </Flex>
                                            )
                                        ))}
                                    </Block>
                                </Block>
                            )}
                        </Block>
                    </Card>
                </Block>

                <Block className="space-y-6">
                    <Card className="p-6">
                        <Flex align="center" gap={3} className="mb-6">
                            <Block className="bg-gray-100 p-2 rounded-xl">
                                <User size={20} className="text-gray-600" />
                            </Block>
                            <Text className="font-bold text-lg text-gray-900">Profile</Text>
                        </Flex>

                        <Block className="space-y-4">
                            <Block>
                                <Text className="text-xs font-bold text-gray-400 uppercase tracking-wider">Member Since</Text>
                                <Flex align="center" gap={2} className="mt-1">
                                    <Calendar size={14} className="text-gray-400" />
                                    <Text className="text-gray-700 font-medium">{member.joinedDate || 'N/A'}</Text>
                                </Flex>
                            </Block>

                            <Block>
                                <Text className="text-xs font-bold text-gray-400 uppercase tracking-wider">User ID</Text>
                                <Text className="text-gray-700 font-mono text-xs bg-gray-50 p-2 rounded mt-1">{member.id}</Text>
                            </Block>
                        </Block>
                    </Card>
                </Block>
            </div>
        </Block>
    );
};
