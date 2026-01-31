import { useState, useEffect } from 'react';
import { useToggle } from '@/hooks/useToggle';
import { useNavigate, useParams } from 'react-router-dom';
import { Shield, ShieldCheck, Lock, Eye, PlusSquare } from 'lucide-react';
import { useFeatureAccess } from '@/hooks/useFeatureAccess';
import mockData from '@/data/mockData.json';

// Defined outside to be stable, or could be inside if it depended on something. 
// It uses Lucide icons which are imported.
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

export const useRoleEditor = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const isEditing = !!id;

    const roleAccess = useFeatureAccess('customRoles');
    const canAddRole = roleAccess.hasAccess;

    const [roleName, setRoleName] = useState('');
    const [roleDescription, setRoleDescription] = useState('');
    const isProcessing = useToggle(false);
    const [feedback, setFeedback] = useState<{ type: 'success' | 'error', message: string } | null>(null);
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
        isProcessing.setTrue();
        setFeedback(null);

        setTimeout(() => {
            isProcessing.setFalse();
            setFeedback({ type: 'success', message: `Role "${roleName}" ${isEditing ? 'updated' : 'created'} successfully!` });
            setTimeout(() => {
                navigate('/manage/roles');
            }, 1500);
        }, 1500);
    };

    const handleCancel = () => {
        navigate('/manage/roles');
    };

    return {
        isEditing,
        canAddRole,
        roleAccess,
        roleName,
        setRoleName,
        roleDescription,
        setRoleDescription,
        isProcessing: isProcessing.value,
        feedback,
        selectedPermissions,
        togglePermission,
        handleSave,
        handleCancel,
        resources
    };
};
