import { motion, AnimatePresence } from 'framer-motion';
import { Shield, ShieldCheck, Check, X, Lock, Eye, PlusSquare, Pencil, Trash, ChevronLeft, Info, AlertCircle, Save } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';

const RoleEditor = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const isEditing = !!id;

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
        if (isEditing) {
            // Mock loading existing role
            setRoleName('Custom Role');
            setRoleDescription('A role with specific descriptive permissions.');
            setSelectedPermissions({
                dashboard: ['view'],
                transactions: ['view', 'create'],
            });
        }
    }, [isEditing]);

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
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-6xl mx-auto space-y-12 pb-20"
        >
            <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div className="flex items-center space-x-4">
                    <button
                        onClick={() => navigate('/manage/roles')}
                        className="p-3 rounded-2xl bg-gray-100 text-gray-500 hover:bg-gray-200 transition-all"
                    >
                        <ChevronLeft className="h-6 w-6" />
                    </button>
                    <div>
                        <h2 className="text-3xl font-black text-gray-900 tracking-tight">
                            {isEditing ? 'Edit Role' : 'Create Custom Role'}
                        </h2>
                        <p className="text-gray-500 mt-1 font-medium">Define precise access levels and understand their impact.</p>
                    </div>
                </div>
                <div className="flex items-center space-x-4">
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
                            <span className="flex items-center">
                                <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                                Saving...
                            </span>
                        ) : (
                            <>
                                <Save className="h-5 w-5 mr-2" />
                                {isEditing ? 'Save Changes' : 'Create Role'}
                            </>
                        )}
                    </Button>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Left Column: Role Info */}
                <div className="lg:col-span-1 space-y-8">
                    <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-xl shadow-gray-200/50 space-y-6">
                        <div className="flex items-center space-x-3 mb-2">
                            <div className="bg-primary/10 p-2 rounded-xl">
                                <Info className="h-5 w-5 text-primary" />
                            </div>
                            <h3 className="text-xl font-black text-gray-900">Role Details</h3>
                        </div>

                        <Input
                            label="Role Name"
                            placeholder="e.g. Project Manager"
                            value={roleName}
                            onChange={(e) => setRoleName(e.target.value)}
                            className="bg-gray-50 border-none h-14 rounded-2xl focus:ring-2 focus:ring-primary font-bold"
                            required
                        />

                        <div className="space-y-2">
                            <label className="text-sm font-black text-gray-900 uppercase tracking-widest px-1">Description</label>
                            <textarea
                                placeholder="Describe the purpose of this role..."
                                value={roleDescription}
                                onChange={(e) => setRoleDescription(e.target.value)}
                                className="w-full bg-gray-50 border-none rounded-2xl p-4 focus:ring-2 focus:ring-primary font-medium min-h-[120px] resize-none"
                            />
                        </div>

                        <div className="bg-amber-50 p-6 rounded-3xl border border-amber-100 flex items-start space-x-4">
                            <div className="bg-amber-100 p-2 rounded-xl">
                                <AlertCircle className="h-5 w-5 text-amber-600" />
                            </div>
                            <div>
                                <p className="text-xs font-black text-amber-900 uppercase tracking-widest">Security Note</p>
                                <p className="text-[11px] text-amber-700 font-bold mt-1 leading-relaxed">
                                    Permissions are additive. Users with multiple roles will have the combined permissions of all assigned roles.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Permission List */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="flex items-center justify-between px-2">
                        <h3 className="text-xl font-black text-gray-900 tracking-tight">Permissions & Effects</h3>
                        <span className="text-xs font-black text-gray-400 uppercase tracking-widest">
                            {Object.values(selectedPermissions).flat().length} Active Permissions
                        </span>
                    </div>

                    <div className="space-y-6">
                        {resources.map((resource) => (
                            <motion.div
                                key={resource.id}
                                className="bg-white rounded-[2.5rem] border border-gray-100 shadow-lg shadow-gray-200/30 overflow-hidden"
                            >
                                <div className="p-8 bg-gray-50/50 border-b border-gray-100 flex items-center justify-between">
                                    <div className="flex items-center space-x-4">
                                        <div className="p-3 rounded-2xl bg-white shadow-sm text-primary">
                                            <resource.icon className="h-6 w-6" />
                                        </div>
                                        <div>
                                            <h4 className="text-lg font-black text-gray-900">{resource.name}</h4>
                                            <p className="text-xs text-gray-500 font-medium">{resource.description}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="divide-y divide-gray-50">
                                    {resource.permissions.map((perm) => {
                                        const isSelected = selectedPermissions[resource.id]?.includes(perm.id);
                                        return (
                                            <div
                                                key={perm.id}
                                                onClick={() => togglePermission(resource.id, perm.id)}
                                                className={`p-8 flex items-start justify-between cursor-pointer transition-all hover:bg-gray-50/80 group ${isSelected ? 'bg-primary/5' : ''
                                                    }`}
                                            >
                                                <div className="flex-grow max-w-2xl">
                                                    <div className="flex items-center space-x-3 mb-1">
                                                        <span className={`font-black text-sm transition-colors ${isSelected ? 'text-primary' : 'text-gray-900'}`}>
                                                            {perm.name}
                                                        </span>
                                                        {isSelected && (
                                                            <span className="px-2 py-0.5 bg-primary text-white text-[9px] font-black uppercase tracking-widest rounded-md">
                                                                Active
                                                            </span>
                                                        )}
                                                    </div>
                                                    <p className="text-sm text-gray-500 font-medium leading-relaxed">
                                                        {perm.description}
                                                    </p>
                                                    <div className="mt-3 flex items-center space-x-2">
                                                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Effect:</span>
                                                        <span className={`text-[11px] font-bold ${isSelected ? 'text-primary' : 'text-gray-600'}`}>
                                                            {perm.effect}
                                                        </span>
                                                    </div>
                                                </div>

                                                <div className={`w-14 h-8 rounded-full transition-all relative flex items-center px-1 ${isSelected ? 'bg-primary shadow-lg shadow-primary/20' : 'bg-gray-200'
                                                    }`}>
                                                    <motion.div
                                                        animate={{ x: isSelected ? 24 : 0 }}
                                                        className="w-6 h-6 bg-white rounded-full shadow-sm"
                                                    />
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {feedback && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="fixed bottom-12 left-1/2 -translate-x-1/2 z-50"
                    >
                        <div className={`px-8 py-4 rounded-3xl shadow-2xl flex items-center space-x-3 font-black text-white ${feedback.type === 'success' ? 'bg-emerald-500 shadow-emerald-200' : 'bg-rose-500 shadow-rose-200'
                            }`}>
                            {feedback.type === 'success' ? <Check className="h-5 w-5" /> : <X className="h-5 w-5" />}
                            <span>{feedback.message}</span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default RoleEditor;
