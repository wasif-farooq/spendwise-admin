import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useAdminStaff } from '@/hooks/features/admin/useAdminStaff';
import { useAdminStaffRoles } from '@/hooks/features/admin/useAdminStaffRoles';
import type { Staff } from '@/store/types/admin.types';

export const useStaffDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { staff } = useAdminStaff();
    const { roles } = useAdminStaffRoles();

    const [member, setMember] = useState<Staff | undefined>(undefined);
    const [selectedRole, setSelectedRole] = useState<string>('');

    useEffect(() => {
        if (staff.length > 0 && id) {
            const foundMember = staff.find(m => m.id === Number(id));
            if (foundMember) {
                setMember(foundMember);
                // Staff has 'roles' array of IDs. For this simple UI we might just pick the first one or manage multiple.
                // The original code assumed single role name match.
                // Staff interface: roles: number[]
                if (foundMember.roles.length > 0) {
                    setSelectedRole(foundMember.roles[0].toString());
                }
            }
        }
    }, [id, staff]);

    const handleRoleChange = (roleId: string) => {
        setSelectedRole(roleId);
        const roleName = roles.find(r => r.id.toString() === roleId)?.name;
        toast.success(`Role updated to ${roleName}`);
    };

    const currentRoleObject = roles.find(r => r.id.toString() === selectedRole);

    return {
        member,
        allRoles: roles,
        selectedRole,
        handleRoleChange,
        currentRoleObject,
        navigate
    };
};
