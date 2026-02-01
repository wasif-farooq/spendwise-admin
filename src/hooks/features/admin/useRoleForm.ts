import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useAdminStaffRoles } from '@/hooks/features/admin/useAdminStaffRoles';
import type { StaffRole } from '@/store/types/admin.types';

export const useRoleForm = (id?: string) => {
    const navigate = useNavigate();
    const isEditing = !!id;
    const { getRoleById, createRole, updateRole } = useAdminStaffRoles();

    const [formData, setFormData] = useState<Partial<StaffRole>>({
        name: '',
        description: '',
        color: 'from-blue-500 to-blue-600',
        iconName: 'Shield',
        isDefault: false,
        permissions: {}
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isEditing && id) {
            const fetchRole = async () => {
                const roleId = parseInt(id, 10);
                if (!isNaN(roleId)) {
                    const role = await getRoleById(roleId);
                    if (role) {
                        setFormData({
                            name: role.name,
                            description: role.description,
                            color: role.color,
                            iconName: role.iconName,
                            isDefault: role.isDefault,
                            permissions: role.permissions || {}
                        });
                    }
                }
            };
            fetchRole();
        }
    }, [isEditing, id, getRoleById]);

    const handleChange = (field: string, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (isEditing && id) {
                const roleId = parseInt(id, 10);
                if (!isNaN(roleId)) {
                    await updateRole(roleId, formData);
                    toast.success('Role updated successfully');
                }
            } else {
                // @ts-ignore - id is optional in Partial but required in Omit<StaffRole, 'id'>, simple cast or ignore for now as createRole handles it
                await createRole(formData as any);
                toast.success('Role created successfully');
            }
            navigate('/admin/staff-roles');
        } catch (error) {
            toast.error('Failed to save role');
        } finally {
            setLoading(false);
        }
    };

    return {
        formData,
        loading,
        isEditing,
        handleChange,
        handleSubmit,
        navigate
    };
};
