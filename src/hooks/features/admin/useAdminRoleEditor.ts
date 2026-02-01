import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Shield, ShieldCheck, Lock, Eye, PlusSquare } from 'lucide-react';
import { useAdminRoles, type Role } from './useAdminRoles';
import { toast } from 'sonner';

// Resource definitions matching spendwise-web
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
    }
];

export const useAdminRoleEditor = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const isEditing = !!id;
    const { getRoleById, updateRolePermissions, createRole } = useAdminRoles(); // We assume createRole exists or we'll add it

    const [roleName, setRoleName] = useState('');
    const [roleDescription, setRoleDescription] = useState('');
    const [selectedPermissions, setSelectedPermissions] = useState<Record<string, string[]>>({});
    const [isProcessing, setIsProcessing] = useState(false);
    const [loadingData, setLoadingData] = useState(isEditing);

    useEffect(() => {
        if (isEditing && id) {
            // Fetch role data
            // In a real app we might need to fetch if not loaded.
            // For now we assume useAdminRoles has data or we fetch from it.
            // Since useAdminRoles mocks fetching, we might need a way to ensure it's ready or fetch specific.
            // For simplicity, we'll try to get it from the list.
            const role = getRoleById(Number(id));
            if (role) {
                setRoleName(role.name);
                setRoleDescription(role.description);
                setSelectedPermissions(role.permissions);
                setLoadingData(false);
            } else {
                // If not found in internal list (maybe page refresh), we might need to wait or it doesn't exist.
                // For now, we'll just set loading false after a timeout to simulate check.
                const checkRole = setTimeout(() => {
                    const found = getRoleById(Number(id));
                    if (found) {
                        setRoleName(found.name);
                        setRoleDescription(found.description);
                        setSelectedPermissions(found.permissions);
                    }
                    setLoadingData(false);
                }, 500);
                return () => clearTimeout(checkRole);
            }
        }
    }, [isEditing, id, getRoleById]);

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

    const handleSave = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        setIsProcessing(true);

        try {
            if (isEditing && id) {
                await updateRolePermissions(Number(id), selectedPermissions);
                // Also update name/desc if API supported it
                toast.success('Role updated successfully');
            } else {
                if (createRole) {
                    await createRole({
                        name: roleName,
                        description: roleDescription,
                        permissions: selectedPermissions,
                        color: 'from-gray-500 to-gray-600', // Default
                        iconName: 'Shield',
                        isDefault: false
                    });
                    toast.success('Role created successfully');
                } else {
                    console.warn('createRole not implemented in useAdminRoles');
                    toast.error('Create role not implemented');
                }
            }
            setTimeout(() => navigate('/roles'), 1000);
        } catch (error) {
            toast.error('Failed to save role');
            console.error(error);
            setIsProcessing(false);
        }
    };

    const handleCancel = () => {
        navigate('/roles');
    };

    return {
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
        loadingData
    };
};
