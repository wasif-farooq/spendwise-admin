import { AnimatePresence } from 'framer-motion';
import { Shield, ShieldCheck, Check, X, Lock, Eye, PlusSquare, ChevronLeft, Info, AlertCircle, Save } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Input } from '@ui';
import mockData from '@/data/mockData.json';
import {
    Block,
    Flex,
    Heading,
    Text,
    Grid,
    Inline,
    AnimatedBlock
} from '@shared';
import { useFeatureAccess } from '@/hooks/useFeatureAccess';
import { FeatureLockedView } from '@/views/Subscription';

const RoleEditor = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const isEditing = !!id;

    const roleAccess = useFeatureAccess('customRoles');
    const canAddRole = roleAccess.hasAccess;

    if (!isEditing && !canAddRole) {
        return (
            <Block className="min-h-screen bg-gray-50 p-8">
                <Block className="mx-auto max-w-4xl">
                    <FeatureLockedView
                        featureName="Custom Roles"
                        featureDescription={roleAccess.reason || "You have reached the limit for custom roles on your current plan."}
                        benefits={[
                            'Create granular permission sets',
                            'Define specific access levels',
                            'Secure your organization data',
                            'Customize user capabilities'
                        ]}
                    />
                </Block>
            </Block>
        );
    }

    const [roleName, setRoleName] = useState('');
    const [roleDescription, setRoleDescription] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [feedback, setFeedback] = useState<{ type: 'success' | 'error', message: string } | null>(null);

    const resources = [
        {
            id: 'dashboard',
            name: 'Dashboard',
            icon: Eye,
            description: 'Access to main analytics and overview.',
            permissions: [
                { id: 'view', name: 'View Dashboard', description: 'Allows user to see organization-wide performance metrics.', effect: 'Read-only access to analytics.' }
            ]
        },
        {
            id: 'transactions',
            name: 'Transactions',
            icon: PlusSquare,
            description: 'Financial records and logs.',
            permissions: [
                { id: 'view', name: 'View Transactions', description: 'Allows user to see all transaction history.', effect: 'Access to financial records.' },
                { id: 'create', name: 'Create Transactions', description: 'Allows user to add new income or expenses.', effect: 'Can modify financial balance.' },
                { id: 'edit', name: 'Edit Transactions', description: 'Allows user to correct or update past transactions.', effect: 'Can alter historical data.' },
                { id: 'delete', name: 'Delete Transactions', description: 'Permanently remove financial records.', effect: 'Irreversible data removal.' }
            ]
        },
        {
            id: 'members',
            name: 'Members',
            icon: Shield,
            description: 'Team management and invites.',
            permissions: [
                { id: 'view', name: 'View Members', description: 'Allows user to see who is in the organization.', effect: 'Access to team directory.' },
                { id: 'create', name: 'Invite Members', description: 'Allows user to send invites and add new users.', effect: 'Can expand the organization team.' },
                { id: 'delete', name: 'Remove Members', description: 'Allows user to revoke access for any team member.', effect: 'Can terminate user access.' }
            ]
        },
        {
            id: 'roles',
            name: 'Roles',
            icon: Lock,
            description: 'Permission and access control.',
            permissions: [
                { id: 'view', name: 'View Roles', description: 'Allows user to see access control settings.', effect: 'Access to security configurations.' },
                { id: 'create', name: 'Create Roles', description: 'Allows user to define new permission sets.', effect: 'Can create new access levels.' },
                { id: 'edit', name: 'Edit Roles', description: 'Allows user to change permissions for existing roles.', effect: 'Can modify security policies.' },
                { id: 'delete', name: 'Delete Roles', description: 'Delete custom roles.', effect: 'Can remove security profiles.' }
            ]
        },
        {
            id: 'billing',
            name: 'Billing',
            icon: ShieldCheck,
            description: 'Subscription and invoices.',
            permissions: [
                { id: 'view', name: 'View Billing', description: 'Allows user to see payment history and plan details.', effect: 'Access to financial invoices.' },
                { id: 'edit', name: 'Manage Billing', description: 'Allows user to change plans and update credit cards.', effect: 'Can modify organization spending.' }
            ]
        },
    ];

    const [selectedPermissions, setSelectedPermissions] = useState<any>({});

    useEffect(() => {
        if (isEditing && id) {
            // Find role in mockData
            const role = (mockData as any).roles.find((r: any) => r.id === Number(id));

            if (role) {
                setRoleName(role.name);
                setRoleDescription(role.description);
                setSelectedPermissions(role.permissions || {});
            }
        }
    }, [isEditing, id]);

    const togglePermission = (resourceId: string, actionId: string) => {
        const currentResPerms = selectedPermissions[resourceId] || [];
        let newResPerms;
        if (currentResPerms.includes(actionId)) {
            newResPerms = currentResPerms.filter((p: string) => p !== actionId);
        } else {
            newResPerms = [...currentResPerms, actionId];
        }

        const newSelectedPermissions = { ...selectedPermissions };
        if (newResPerms.length === 0) {
            delete newSelectedPermissions[resourceId];
        } else {
            newSelectedPermissions[resourceId] = newResPerms;
        }
        setSelectedPermissions(newSelectedPermissions);
    };

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        setIsProcessing(true);
        setFeedback(null);

        setTimeout(() => {
            setIsProcessing(false);
            setFeedback({ type: 'success', message: `Role "${roleName}" ${isEditing ? 'updated' : 'created'} successfully!` });
            setTimeout(() => {
                navigate('/manage/roles');
            }, 1500);
        }, 1500);
    };

    return (
        <AnimatedBlock
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full mx-auto space-y-12 pb-20"
        >
            <Flex as="header" direction="col" justify="between" gap={6} className="sm:flex-row sm:items-center">
                <Flex align="center" gap={4}>
                    <Button
                        variant="ghost"
                        onClick={() => navigate('/manage/roles')}
                        className="p-3 rounded-2xl bg-gray-100 text-gray-500 hover:bg-gray-200 transition-all"
                    >
                        <ChevronLeft className="h-6 w-6" />
                    </Button>
                    <Block>
                        <Heading as="h2" weight="black" className="text-3xl tracking-tight text-gray-900">
                            {isEditing ? 'Edit Role' : 'Create Custom Role'}
                        </Heading>
                        <Text color="text-gray-500" weight="medium" className="mt-1">Define precise access levels and understand their impact.</Text>
                    </Block>
                </Flex>
                <Flex align="center" gap={4}>
                    <Button
                        variant="outline"
                        onClick={() => navigate('/manage/roles')}
                        className="px-8 py-4 rounded-2xl"
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleSave}
                        disabled={isProcessing || !roleName || Object.keys(selectedPermissions).length === 0}
                        className="px-8 py-4 rounded-2xl shadow-xl shadow-primary/20 flex items-center"
                    >
                        {isProcessing ? (
                            <Flex align="center">
                                <Block className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                                Saving...
                            </Flex>
                        ) : (
                            <Flex align="center">
                                <Save className="h-5 w-5 mr-2" />
                                {isEditing ? 'Save Changes' : 'Create Role'}
                            </Flex>
                        )}
                    </Button>
                </Flex>
            </Flex>

            <Grid cols={1} gap={6} className="lg:grid-cols-3">
                {/* Left Column: Role Info */}
                <Block className="lg:col-span-1 space-y-8">
                    <Block className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-xl shadow-gray-200/50 space-y-6">
                        <Flex align="center" gap={3} className="mb-2">
                            <Block className="bg-primary/10 p-2 rounded-xl">
                                <Info className="h-5 w-5 text-primary" />
                            </Block>
                            <Heading as="h3" weight="black" className="text-xl text-gray-900">Role Details</Heading>
                        </Flex>

                        <Input
                            label="Role Name"
                            placeholder="e.g. Project Manager"
                            value={roleName}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRoleName(e.target.value)}
                            className="bg-gray-50 border-none h-14 rounded-2xl focus:ring-2 focus:ring-primary font-bold"
                            required
                        />

                        <Block className="space-y-2">
                            <Text as="label" size="sm" weight="black" className="uppercase tracking-widest px-1 text-gray-900">Description</Text>
                            <textarea
                                placeholder="Describe the purpose of this role..."
                                value={roleDescription}
                                onChange={(e) => setRoleDescription(e.target.value)}
                                className="w-full bg-gray-50 border-none rounded-2xl p-4 focus:ring-2 focus:ring-primary font-medium min-h-[120px] resize-none"
                            />
                        </Block>

                        <Flex align="start" gap={4} className="bg-amber-50 p-6 rounded-3xl border border-amber-100">
                            <Block className="bg-amber-100 p-2 rounded-xl">
                                <AlertCircle className="h-5 w-5 text-amber-600" />
                            </Block>
                            <Block>
                                <Text size="xs" weight="black" className="uppercase tracking-widest text-amber-900">Security Note</Text>
                                <Text size="xs" weight="bold" color="text-amber-700" className="mt-1 leading-relaxed">
                                    Permissions are additive. Users with multiple roles will have the combined permissions of all assigned roles.
                                </Text>
                            </Block>
                        </Flex>
                    </Block>
                </Block>

                {/* Right Column: Permission List */}
                <Block className="lg:col-span-2 space-y-8">
                    <Flex align="center" justify="between" className="px-2">
                        <Heading as="h3" weight="black" className="text-xl text-gray-900 tracking-tight">Permissions & Effects</Heading>
                        <Text size="xs" weight="black" color="text-gray-400" className="uppercase tracking-widest">
                            {Object.values(selectedPermissions).flat().length} Active Permissions
                        </Text>
                    </Flex>

                    <Block className="space-y-6">
                        {resources.map((resource) => (
                            <Block
                                key={resource.id}
                                className="bg-white rounded-[2.5rem] border border-gray-100 shadow-lg shadow-gray-200/30 overflow-hidden"
                            >
                                <Block className="p-8 bg-gray-50/50 border-b border-gray-100">
                                    <Flex align="center" gap={4}>
                                        <Block className="p-3 rounded-2xl bg-white shadow-sm text-primary">
                                            <resource.icon className="h-6 w-6" />
                                        </Block>
                                        <Block>
                                            <Heading as="h4" weight="black" className="text-lg text-gray-900">{resource.name}</Heading>
                                            <Text size="xs" color="text-gray-500" weight="medium">{resource.description}</Text>
                                        </Block>
                                    </Flex>
                                </Block>

                                <Block className="divide-y divide-gray-50">
                                    {resource.permissions.map((perm) => {
                                        const isSelected = selectedPermissions[resource.id]?.includes(perm.id);
                                        return (
                                            <Block
                                                key={perm.id}
                                                onClick={() => togglePermission(resource.id, perm.id)}
                                                className={`p-8 cursor-pointer transition-all hover:bg-gray-50/80 group ${isSelected ? 'bg-primary/5' : ''
                                                    }`}
                                            >
                                                <Flex justify="between" align="start">
                                                    <Block className="flex-grow max-w-2xl">
                                                        <Flex align="center" gap={3} className="mb-1">
                                                            <Text weight="black" className={`text-sm transition-colors ${isSelected ? 'text-primary' : 'text-gray-900'}`}>
                                                                {perm.name}
                                                            </Text>
                                                            {isSelected && (
                                                                <Inline className="px-2 py-0.5 bg-primary text-white text-[9px] font-black uppercase tracking-widest rounded-md">
                                                                    Active
                                                                </Inline>
                                                            )}
                                                        </Flex>
                                                        <Text size="sm" color="text-gray-500" weight="medium" className="leading-relaxed">
                                                            {perm.description}
                                                        </Text>
                                                        <Flex align="center" gap={2} className="mt-3">
                                                            <Text size="xs" weight="black" color="text-gray-400" className="uppercase tracking-widest">Effect:</Text>
                                                            <Text size="xs" weight="bold" className={`${isSelected ? 'text-primary' : 'text-gray-600'}`}>
                                                                {perm.effect}
                                                            </Text>
                                                        </Flex>
                                                    </Block>

                                                    <Block className={`w-14 h-8 rounded-full transition-all relative flex items-center px-1 ${isSelected ? 'bg-primary shadow-lg shadow-primary/20' : 'bg-gray-200'
                                                        }`}>
                                                        <AnimatedBlock
                                                            initial={false}
                                                            animate={{ x: isSelected ? 24 : 0 }}
                                                            className="w-6 h-6 bg-white rounded-full shadow-sm"
                                                        />
                                                    </Block>
                                                </Flex>
                                            </Block>
                                        );
                                    })}
                                </Block>
                            </Block>
                        ))}
                    </Block>
                </Block>
            </Grid>

            <AnimatePresence>
                {feedback && (
                    <AnimatedBlock
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="fixed bottom-12 left-1/2 -translate-x-1/2 z-50"
                    >
                        <Flex align="center" gap={3} className={`px-8 py-4 rounded-3xl shadow-2xl font-black text-white ${feedback.type === 'success' ? 'bg-emerald-500 shadow-emerald-200' : 'bg-rose-500 shadow-rose-200'
                            }`}>
                            {feedback.type === 'success' ? <Check className="h-5 w-5" /> : <X className="h-5 w-5" />}
                            <Text as="span">{feedback.message}</Text>
                        </Flex>
                    </AnimatedBlock>
                )}
            </AnimatePresence>
        </AnimatedBlock>
    );
};

export default RoleEditor;
