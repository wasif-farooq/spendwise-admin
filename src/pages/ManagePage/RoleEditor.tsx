import { AnimatePresence } from 'framer-motion';
import { Check, X, Info, AlertCircle, Save, ChevronLeft } from 'lucide-react';
import { Button, Input } from '@ui';
import {
    Block,
    Flex,
    Heading,
    Text,
    Grid,
    Inline,
    AnimatedBlock
} from '@shared';
import { FeatureLockedView } from '@/views/Subscription';
import { useRoleEditor } from '@/hooks/features/organization/useRoleEditor';

const RoleEditor = () => {
    const {
        isEditing,
        canAddRole,
        roleAccess,
        roleName,
        setRoleName,
        roleDescription,
        setRoleDescription,
        isProcessing,
        feedback,
        selectedPermissions,
        togglePermission,
        handleSave,
        handleCancel,
        resources
    } = useRoleEditor();

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
                        onClick={handleCancel}
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
                        onClick={handleCancel}
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
