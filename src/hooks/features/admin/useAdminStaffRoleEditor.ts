import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Shield, ShieldCheck, Lock, Eye, PlusSquare, Headphones } from 'lucide-react';
import { useAdminStaffRoles } from './useAdminStaffRoles';
import { toast } from 'sonner';

// Resource definitions for INTERNAL ADMIN STAFF
const resources = [
    {
        id: 'dashboard',
        name: 'Dashboard',
        icon: Eye,
        description: 'Access to main analytics and overview.',
        permissions: [
            { id: 'view', name: 'View Dashboard', description: 'See platform metrics.', effect: 'Read-only analytics access.' }
        ]
    },
    {
        id: 'transactions',
        name: 'Transactions',
        icon: PlusSquare,
        description: 'Manage user transaction data.',
        permissions: [
            { id: 'view', name: 'View Transactions', description: 'See all user transactions.', effect: 'Access to financial logs.' },
            { id: 'create', name: 'Create Transactions', description: 'Manually add transactions for users.', effect: 'Can modify user data.' },
            { id: 'edit', name: 'Edit Transactions', description: 'Correct user transactions.', effect: 'Can alter historical data.' },
            { id: 'delete', name: 'Delete Transactions', description: 'Remove transactions.', effect: 'Permanent deletion.' }
        ]
    },
    {
        id: 'members',
        name: 'Staff Management',
        icon: Shield,
        description: 'Manage internal team access.',
        permissions: [
            { id: 'view', name: 'View Staff', description: 'See who is on the team.', effect: 'Access to staff directory.' },
            { id: 'create', name: 'Invite Staff', description: 'Add new staff members.', effect: 'Can expand the admin team.' },
            { id: 'delete', name: 'Remove Staff', description: 'Revoke staff access.', effect: 'Terminates admin access.' }
        ]
    },
    {
        id: 'roles',
        name: 'Staff Roles',
        icon: Lock,
        description: 'Manage staff permission sets.',
        permissions: [
            { id: 'view', name: 'View Roles', description: 'See configured staff roles.', effect: 'Access to security configs.' },
            { id: 'create', name: 'Create Roles', description: 'Define new staff roles.', effect: 'Can create access levels.' },
            { id: 'edit', name: 'Edit Roles', description: 'Modify existing roles.', effect: 'Can change security policies.' },
            { id: 'delete', name: 'Delete Roles', description: 'Remove custom roles.', effect: 'Deletes security profiles.' }
        ]
    },
    {
        id: 'billing',
        name: 'Use Billing',
        icon: ShieldCheck,
        description: 'Manage platform billing/subscriptions.',
        permissions: [
            { id: 'view', name: 'View Billing', description: 'See platform revenue.', effect: 'Access to financial reports.' },
            { id: 'edit', name: 'Manage Billing', description: 'Refunds and plan changes.', effect: 'Can modify platform revenue.' }
        ]
    }
];

export const useAdminStaffRoleEditor = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const isEditing = !!id;
    const { getRoleById, updateRolePermissions, createRole } = useAdminStaffRoles();

    const [roleName, setRoleName] = useState('');
    const [roleDescription, setRoleDescription] = useState('');
    const [selectedPermissions, setSelectedPermissions] = useState<Record<string, string[]>>({});
    const [isProcessing, setIsProcessing] = useState(false);
    const [loadingData, setLoadingData] = useState(isEditing);
    const [isSuperAdmin, setIsSuperAdmin] = useState(false);

    useEffect(() => {
        if (isEditing && id) {
            const role = getRoleById(Number(id));
            if (role) {
                setRoleName(role.name);
                setRoleDescription(role.description);
                setSelectedPermissions(role.permissions);
                setIsSuperAdmin(role.isDefault && role.id === 0);
                setLoadingData(false);
            } else {
                const checkRole = setTimeout(() => {
                    const found = getRoleById(Number(id));
                    if (found) {
                        setRoleName(found.name);
                        setRoleDescription(found.description);
                        setSelectedPermissions(found.permissions);
                        setIsSuperAdmin(found.isDefault && found.id === 0);
                    }
                    setLoadingData(false);
                }, 500);
                return () => clearTimeout(checkRole);
            }
        }
    }, [isEditing, id, getRoleById]);

    const togglePermission = (resourceId: string, actionId: string) => {
        if (isSuperAdmin) return; // Super Admin is immutable

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

        if (isSuperAdmin) {
            toast.error('Cannot modify Super Admin role');
            return;
        }

        setIsProcessing(true);

        try {
            if (isEditing && id) {
                await updateRolePermissions(Number(id), selectedPermissions);
                toast.success('Staff Role updated successfully');
            } else {
                await createRole({
                    name: roleName,
                    description: roleDescription,
                    permissions: selectedPermissions,
                    color: 'from-gray-500 to-gray-600',
                    iconName: 'Shield',
                    isDefault: false
                });
                toast.success('Staff Role created successfully');
            }
            setTimeout(() => navigate('/staff-roles'), 1000);
        } catch (error) {
            toast.error('Failed to save role');
            console.error(error);
            setIsProcessing(false);
        }
    };

    const handleCancel = () => {
        navigate('/staff-roles');
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
        loadingData,
        isSuperAdmin
    };
};
