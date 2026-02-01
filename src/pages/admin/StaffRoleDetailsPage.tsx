import { useAdminStaffRoleEditor } from '@/hooks/features/admin/useAdminStaffRoleEditor';
import { Block, Flex, Text, Inline } from '@shared';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import {
    ChevronLeft,
    Save,
    Info,
    AlertCircle,
    Lock
} from 'lucide-react';
import { motion } from 'framer-motion';

export const StaffRoleDetailsPage = () => {
    const {
        isEditing,
        roleName,
        setRoleName,
        roleDescription,
        setRoleDescription,
        isProcessing,
        selectedPermissions,
        togglePermission,
        handleSave,
        handleCancel,
        resources,
        loadingData,
        isSuperAdmin
    } = useAdminStaffRoleEditor();

    if (loadingData) {
        return <Block className="p-8"><Text className="animate-pulse text-gray-400">Loading staff role data...</Text></Block>;
    }

    return (
        <Block className="space-y-12 pb-20">
            {/* Header */}
            <Flex as="header" direction="col" justify="between" gap={6} className="sm:flex-row sm:items-center">
                <Flex align="center" gap={4}>
                    <Button
                        variant="ghost"
                        onClick={handleCancel}
                        className="p-3 rounded-2xl bg-white border border-gray-100 text-gray-500 hover:bg-gray-50 transition-all"
                    >
                        <ChevronLeft className="h-6 w-6" />
                    </Button>
                    <Block>
                        <Text as="h2" className="text-3xl font-black tracking-tight text-gray-900">
                            {isEditing ? 'Edit Staff Role' : 'Create Staff Role'}
                        </Text>
                        <Text className="text-gray-500 font-medium mt-1">Define permissions for internal admin staff.</Text>
                    </Block>
                </Flex>
                <Flex align="center" gap={4}>
                    <Button
                        variant="ghost"
                        onClick={handleCancel}
                        className="px-6 py-3 rounded-2xl text-gray-500 font-bold hover:bg-gray-50"
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={(e) => handleSave(e)}
                        disabled={isProcessing || !roleName || Object.keys(selectedPermissions).length === 0 || isSuperAdmin}
                        className="px-8 py-3 rounded-2xl shadow-xl shadow-primary/20 flex items-center bg-primary text-white hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isProcessing ? (
                            <Flex align="center">
                                <Block className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                                Saving...
                            </Flex>
                        ) : (
                            <Flex align="center">
                                {isSuperAdmin ? <Lock className="h-5 w-5 mr-2" /> : <Save className="h-5 w-5 mr-2" />}
                                {isSuperAdmin ? 'Role Locked' : (isEditing ? 'Save Changes' : 'Create Role')}
                            </Flex>
                        )}
                    </Button>
                </Flex>
            </Flex>

            {isSuperAdmin && (
                <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl flex items-center gap-3 text-amber-800">
                    <Lock className="w-5 h-5" />
                    <span className="font-bold">This is the Super Admin role. It has full access and cannot be modified.</span>
                </div>
            )}

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Role Info */}
                <Block className="lg:col-span-1 space-y-8">
                    <Block className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-xl shadow-gray-200/50 space-y-6">
                        <Flex align="center" gap={3} className="mb-2">
                            <Block className="bg-blue-50 p-2 rounded-xl">
                                <Info className="h-5 w-5 text-blue-600" />
                            </Block>
                            <Text as="h3" className="text-xl font-black text-gray-900">Role Details</Text>
                        </Flex>

                        <Block>
                            <Text className="text-sm font-black uppercase tracking-widest text-gray-900 mb-2 px-1">Role Name</Text>
                            <Input
                                placeholder="e.g. Support Manager"
                                value={roleName}
                                onChange={(e) => setRoleName(e.target.value)}
                                className="bg-gray-50 border-none h-14 rounded-2xl focus:ring-2 focus:ring-primary font-bold w-full"
                                required
                                disabled={isSuperAdmin}
                            />
                        </Block>

                        <Block className="space-y-2">
                            <Text className="text-sm font-black uppercase tracking-widest text-gray-900 px-1">Description</Text>
                            <textarea
                                placeholder="Describe the purpose of this role..."
                                value={roleDescription}
                                onChange={(e) => setRoleDescription(e.target.value)}
                                className="w-full bg-gray-50 border-none rounded-2xl p-4 focus:ring-2 focus:ring-primary font-medium min-h-[120px] resize-none outline-none disabled:opacity-50"
                                disabled={isSuperAdmin}
                            />
                        </Block>

                        <Flex align="start" gap={4} className="bg-amber-50 p-6 rounded-3xl border border-amber-100">
                            <Block className="bg-amber-100 p-2 rounded-xl">
                                <AlertCircle className="h-5 w-5 text-amber-600" />
                            </Block>
                            <Block>
                                <Text className="text-xs font-black uppercase tracking-widest text-amber-900">Note</Text>
                                <Text className="text-xs font-bold text-amber-700 mt-1 leading-relaxed">
                                    These permissions apply to internal staff members only.
                                </Text>
                            </Block>
                        </Flex>
                    </Block>
                </Block>

                {/* Right Column: Permission List */}
                <Block className="lg:col-span-2 space-y-8">
                    <Flex align="center" justify="between" className="px-2">
                        <Text as="h3" className="text-xl font-black text-gray-900 tracking-tight">Permissions & Effects</Text>
                        <Text className="text-xs font-black text-gray-400 uppercase tracking-widest">
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
                                            <Text as="h4" className="text-lg font-black text-gray-900">{resource.name}</Text>
                                            <Text className="text-xs text-gray-500 font-medium">{resource.description}</Text>
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
                                                className={`p-8 cursor-pointer transition-all hover:bg-gray-50/80 group ${(isSelected || isSuperAdmin) ? 'bg-blue-50/50' : ''
                                                    } ${isSuperAdmin ? 'cursor-not-allowed' : ''}`}
                                            >
                                                <Flex justify="between" align="start">
                                                    <Block className="flex-grow max-w-2xl">
                                                        <Flex align="center" gap={3} className="mb-1">
                                                            <Text className={`text-sm font-black transition-colors ${isSelected ? 'text-primary' : 'text-gray-900'}`}>
                                                                {perm.name}
                                                            </Text>
                                                            {isSelected && (
                                                                <Inline className="px-2 py-0.5 bg-primary text-white text-[9px] font-black uppercase tracking-widest rounded-md">
                                                                    Active
                                                                </Inline>
                                                            )}
                                                        </Flex>
                                                        <Text className="text-sm text-gray-500 font-medium leading-relaxed">
                                                            {perm.description}
                                                        </Text>
                                                        <Flex align="center" gap={2} className="mt-3">
                                                            <Text className="text-xs font-black text-gray-400 uppercase tracking-widest">Effect:</Text>
                                                            <Text className={`text-xs font-bold ${isSelected ? 'text-primary' : 'text-gray-600'}`}>
                                                                {perm.effect}
                                                            </Text>
                                                        </Flex>
                                                    </Block>

                                                    <Block className={`w-14 h-8 rounded-full transition-all relative flex items-center px-1 ${isSelected ? 'bg-primary shadow-lg shadow-primary/20' : 'bg-gray-200'
                                                        }`}>
                                                        <motion.div
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
            </div>
        </Block>
    );
};
