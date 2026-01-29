import { motion, AnimatePresence } from 'framer-motion';
import { Shield, ShieldCheck, Plus, Trash2, Edit2, Check, X, Lock, AlertTriangle, ChevronLeft, ChevronRight, Eye, PlusSquare, Pencil, Trash } from 'lucide-react';
import { useState, useMemo } from 'react';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { Modal } from '../../components/Modal';

const Roles = () => {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const [editingRole, setEditingRole] = useState<any>(null);
    const [deletingRole, setDeletingRole] = useState<any>(null);

    const [roleName, setRoleName] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [feedback, setFeedback] = useState<{ type: 'success' | 'error', message: string } | null>(null);

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;

    const resources = [
        { id: 'dashboard', name: 'Dashboard', icon: Eye, allowedActions: ['view'] },
        { id: 'transactions', name: 'Transactions', icon: PlusSquare, allowedActions: ['view', 'create', 'edit', 'delete'] },
        { id: 'members', name: 'Members', icon: Shield, allowedActions: ['view', 'create', 'delete'] },
        { id: 'roles', name: 'Roles', icon: Lock, allowedActions: ['view', 'create', 'edit', 'delete'] },
        { id: 'billing', name: 'Billing', icon: ShieldCheck, allowedActions: ['view', 'edit'] },
    ];

    const actions = [
        { id: 'view', name: 'View', icon: Eye },
        { id: 'create', name: 'Create', icon: PlusSquare },
        { id: 'edit', name: 'Edit', icon: Pencil },
        { id: 'delete', name: 'Delete', icon: Trash },
    ];

    // Initial granular permissions for Admin (only applicable ones)
    const allPermissions = resources.reduce((acc: any, res) => {
        acc[res.id] = res.allowedActions;
        return acc;
    }, {});

    const [roles, setRoles] = useState([
        {
            id: 1,
            name: 'Admin',
            description: 'Full access to all features and settings',
            isDefault: true,
            permissions: allPermissions
        },
        {
            id: 2,
            name: 'Member',
            description: 'Standard access for team members',
            isDefault: false,
            permissions: {
                dashboard: ['view'],
                transactions: ['view', 'create', 'edit'],
                members: ['view'],
            }
        },
        {
            id: 3,
            name: 'Viewer',
            description: 'Read-only access to dashboard and reports',
            isDefault: false,
            permissions: {
                dashboard: ['view'],
                transactions: ['view'],
            }
        },
    ]);

    const [selectedPermissions, setSelectedPermissions] = useState<any>({});

    // Pagination logic
    const totalPages = Math.ceil(roles.length / itemsPerPage);
    const paginatedRoles = useMemo(() => {
        const start = (currentPage - 1) * itemsPerPage;
        return roles.slice(start, start + itemsPerPage);
    }, [currentPage, roles]);

    const handleCreateRole = (e: React.FormEvent) => {
        e.preventDefault();
        setIsProcessing(true);
        setFeedback(null);

        setTimeout(() => {
            const newRole = {
                id: roles.length + 1,
                name: roleName,
                description: 'Custom organization role',
                isDefault: false,
                permissions: selectedPermissions
            };
            setRoles([...roles, newRole]);
            setIsProcessing(false);
            setFeedback({ type: 'success', message: `Role "${roleName}" created successfully!` });
            setRoleName('');
            setSelectedPermissions({});
            setTimeout(() => {
                setIsCreateModalOpen(false);
                setFeedback(null);
            }, 1500);
        }, 1500);
    };

    const handleEditRole = (e: React.FormEvent) => {
        e.preventDefault();
        setIsProcessing(true);
        setFeedback(null);

        setTimeout(() => {
            setRoles(roles.map(r => r.id === editingRole.id ? { ...r, name: roleName, permissions: selectedPermissions } : r));
            setIsProcessing(false);
            setFeedback({ type: 'success', message: `Role "${roleName}" updated successfully!` });
            setTimeout(() => {
                setIsEditModalOpen(false);
                setEditingRole(null);
                setRoleName('');
                setSelectedPermissions({});
                setFeedback(null);
            }, 1500);
        }, 1500);
    };

    const handleDeleteRole = () => {
        setIsProcessing(true);
        setTimeout(() => {
            setRoles(roles.filter(r => r.id !== deletingRole.id));
            setIsProcessing(false);
            setIsDeleteModalOpen(false);
            setDeletingRole(null);
        }, 1000);
    };

    const openEditModal = (role: any) => {
        setEditingRole(role);
        setRoleName(role.name);
        setSelectedPermissions(role.permissions);
        setIsEditModalOpen(true);
    };

    const openDeleteModal = (role: any) => {
        setDeletingRole(role);
        setIsDeleteModalOpen(true);
    };

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

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-12"
        >
            <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div>
                    <h2 className="text-3xl font-black text-gray-900 tracking-tight">Roles & Permissions</h2>
                    <p className="text-gray-500 mt-1 font-medium">Define granular access for your team members.</p>
                </div>
                <Button
                    onClick={() => {
                        setRoleName('');
                        setSelectedPermissions({});
                        setIsCreateModalOpen(true);
                    }}
                    className="px-8 py-4 rounded-2xl shadow-xl shadow-primary/20 flex items-center justify-center"
                >
                    <Plus className="h-5 w-5 mr-2" />
                    Create Custom Role
                </Button>
            </header>

            <div className="space-y-6">
                <div className="grid grid-cols-1 gap-6">
                    {paginatedRoles.map((role) => (
                        <div key={role.id} className="bg-gray-50/50 rounded-[2.5rem] p-8 border border-gray-100 hover:bg-white hover:shadow-md transition-all group relative overflow-hidden">
                            {role.isDefault && (
                                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none">
                                    <ShieldCheck className="h-32 w-32 text-primary" />
                                </div>
                            )}

                            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-8 relative z-10">
                                <div className="max-w-md">
                                    <div className="flex items-center space-x-3 mb-2">
                                        <div className={`p-2 rounded-xl ${role.isDefault ? 'bg-primary/10 text-primary' : 'bg-gray-200 text-gray-500'}`}>
                                            <Shield className="h-5 w-5" />
                                        </div>
                                        <h3 className="text-xl font-black text-gray-900 tracking-tight">{role.name}</h3>
                                        {role.isDefault && (
                                            <span className="px-2.5 py-1 bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest rounded-lg flex items-center">
                                                <Lock className="h-3 w-3 mr-1" />
                                                System Default
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-gray-500 font-medium text-sm">{role.description}</p>
                                </div>

                                <div className="flex-grow lg:max-w-2xl">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {Object.entries(role.permissions).map(([resId, perms]: [string, any]) => {
                                            const resource = resources.find(r => r.id === resId);
                                            return (
                                                <div key={resId} className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
                                                    <div className="flex items-center space-x-2 mb-3">
                                                        {resource && <resource.icon className="h-4 w-4 text-primary" />}
                                                        <span className="text-sm font-black text-gray-900">{resource?.name}</span>
                                                    </div>
                                                    <div className="flex flex-wrap gap-1.5">
                                                        {perms.map((p: string) => (
                                                            <span key={p} className="px-2 py-1 bg-gray-50 text-[10px] font-black uppercase tracking-wider text-gray-500 rounded-md border border-gray-100">
                                                                {p}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>

                                <div className="flex items-center space-x-3">
                                    <button
                                        onClick={() => openEditModal(role)}
                                        disabled={role.isDefault}
                                        className={`p-3 rounded-2xl transition-all ${role.isDefault
                                                ? 'text-gray-300 cursor-not-allowed'
                                                : 'text-gray-400 hover:bg-gray-100 hover:text-primary'
                                            }`}
                                    >
                                        <Edit2 className="h-5 w-5" />
                                    </button>
                                    <button
                                        onClick={() => openDeleteModal(role)}
                                        disabled={role.isDefault}
                                        className={`p-3 rounded-2xl transition-all ${role.isDefault
                                                ? 'text-gray-300 cursor-not-allowed'
                                                : 'text-gray-400 hover:bg-red-50 hover:text-red-600'
                                            }`}
                                    >
                                        <Trash2 className="h-5 w-5" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Pagination UI */}
                <div className="px-8 py-6 flex items-center justify-between bg-gray-50/50 rounded-[2rem] border border-gray-100">
                    <p className="text-sm text-gray-500 font-medium">
                        Showing <span className="font-bold text-gray-900">{(currentPage - 1) * itemsPerPage + 1}</span> to <span className="font-bold text-gray-900">{Math.min(currentPage * itemsPerPage, roles.length)}</span> of <span className="font-bold text-gray-900">{roles.length}</span> roles
                    </p>
                    <div className="flex items-center space-x-2">
                        <button
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className="p-2 rounded-xl border border-gray-200 text-gray-500 hover:bg-white hover:shadow-sm disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                        >
                            <ChevronLeft className="h-5 w-5" />
                        </button>
                        {[...Array(totalPages)].map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setCurrentPage(i + 1)}
                                className={`w-10 h-10 rounded-xl text-sm font-bold transition-all ${currentPage === i + 1
                                        ? 'bg-primary text-white shadow-lg shadow-primary/20'
                                        : 'text-gray-500 hover:bg-white border border-transparent hover:border-gray-200'
                                    }`}
                            >
                                {i + 1}
                            </button>
                        ))}
                        <button
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                            className="p-2 rounded-xl border border-gray-200 text-gray-500 hover:bg-white hover:shadow-sm disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                        >
                            <ChevronRight className="h-5 w-5" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Create/Edit Role Modal */}
            <Modal
                isOpen={isCreateModalOpen || isEditModalOpen}
                onClose={() => {
                    setIsCreateModalOpen(false);
                    setIsEditModalOpen(false);
                    setEditingRole(null);
                }}
                title={isEditModalOpen ? "Edit Role" : "Create Custom Role"}
                maxWidth="max-w-5xl"
            >
                <form onSubmit={isEditModalOpen ? handleEditRole : handleCreateRole} className="space-y-8">
                    <div className="space-y-6">
                        <Input
                            label="Role Name"
                            placeholder="e.g. Project Manager, Accountant"
                            value={roleName}
                            onChange={(e) => setRoleName(e.target.value)}
                            className="bg-gray-50 border-none h-14 rounded-2xl focus:ring-2 focus:ring-primary font-bold"
                            required
                        />

                        <div className="space-y-4">
                            <div className="flex items-center justify-between px-1">
                                <label className="text-sm font-black text-gray-900 uppercase tracking-widest">Permission Matrix</label>
                            </div>

                            <div className="bg-gray-50 rounded-[2rem] border border-gray-100 overflow-hidden">
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left border-collapse">
                                        <thead>
                                            <tr className="bg-white/50">
                                                <th className="px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-widest">Resource</th>
                                                {actions.map(action => (
                                                    <th key={action.id} className="px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-widest text-center">
                                                        <div className="flex flex-col items-center space-y-1">
                                                            <action.icon className="h-3.5 w-3.5" />
                                                            <span>{action.name}</span>
                                                        </div>
                                                    </th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-100">
                                            {resources.map((resource) => (
                                                <tr key={resource.id} className="hover:bg-white transition-colors">
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center space-x-3">
                                                            <div className="p-2 bg-white rounded-xl shadow-sm">
                                                                <resource.icon className="h-4 w-4 text-primary" />
                                                            </div>
                                                            <span className="font-bold text-gray-900">{resource.name}</span>
                                                        </div>
                                                    </td>
                                                    {actions.map(action => {
                                                        const isAllowed = resource.allowedActions.includes(action.id);
                                                        const isSelected = selectedPermissions[resource.id]?.includes(action.id);

                                                        return (
                                                            <td key={action.id} className="px-6 py-4 text-center">
                                                                {isAllowed ? (
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => togglePermission(resource.id, action.id)}
                                                                        className={`w-8 h-8 rounded-lg transition-all flex items-center justify-center mx-auto ${isSelected
                                                                                ? 'bg-primary text-white shadow-md shadow-primary/20'
                                                                                : 'bg-white text-gray-200 border border-gray-100 hover:border-primary/30 hover:text-primary/30'
                                                                            }`}
                                                                    >
                                                                        <Check className={`h-4 w-4 ${isSelected ? 'opacity-100' : 'opacity-0'}`} />
                                                                    </button>
                                                                ) : (
                                                                    <div className="w-8 h-8 mx-auto flex items-center justify-center">
                                                                        <div className="w-1.5 h-1.5 bg-gray-200 rounded-full" />
                                                                    </div>
                                                                )}
                                                            </td>
                                                        );
                                                    })}
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>

                    <AnimatePresence>
                        {feedback && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className={`p-4 rounded-2xl text-sm font-bold flex items-center ${feedback.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                    }`}
                            >
                                {feedback.type === 'success' ? <Check className="h-4 w-4 mr-2" /> : <X className="h-4 w-4 mr-2" />}
                                {feedback.message}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-gray-100">
                        <Button
                            variant="outline"
                            type="button"
                            onClick={() => {
                                setIsCreateModalOpen(false);
                                setIsEditModalOpen(false);
                                setEditingRole(null);
                            }}
                            className="flex-grow py-4 rounded-2xl"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={isProcessing || !roleName || Object.keys(selectedPermissions).length === 0}
                            className="flex-grow py-4 rounded-2xl shadow-lg shadow-primary/20"
                        >
                            {isProcessing ? (isEditModalOpen ? 'Updating...' : 'Creating...') : (isEditModalOpen ? 'Update Role' : 'Create Role')}
                        </Button>
                    </div>
                </form>
            </Modal>

            {/* Delete Role Modal */}
            <Modal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                title="Delete Role"
            >
                <div className="space-y-6">
                    <div className="bg-red-50 p-6 rounded-3xl flex items-start space-x-4">
                        <div className="bg-red-100 p-2 rounded-xl flex-shrink-0">
                            <AlertTriangle className="h-6 w-6 text-red-600" />
                        </div>
                        <div>
                            <p className="font-bold text-red-900">Warning: This action is permanent</p>
                            <p className="text-sm text-red-700 mt-1 leading-relaxed">
                                Deleting the <span className="font-black">"{deletingRole?.name}"</span> role will remove it from all assigned members. They will lose access to the associated permissions.
                            </p>
                        </div>
                    </div>

                    <p className="text-gray-600 text-sm px-2">
                        Are you sure you want to delete this role? This cannot be undone.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                        <Button
                            variant="outline"
                            onClick={() => setIsDeleteModalOpen(false)}
                            className="flex-grow py-4 rounded-2xl"
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleDeleteRole}
                            disabled={isProcessing}
                            className="flex-grow py-4 bg-red-600 hover:bg-red-700 text-white rounded-2xl shadow-lg shadow-red-200"
                        >
                            {isProcessing ? 'Deleting...' : 'Confirm Delete'}
                        </Button>
                    </div>
                </div>
            </Modal>
        </motion.div>
    );
};

export default Roles;
