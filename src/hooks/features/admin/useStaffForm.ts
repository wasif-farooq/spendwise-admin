import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useAdminStaff } from '@/hooks/features/admin/useAdminStaff';

export const useStaffForm = (id?: string) => {
    const navigate = useNavigate();
    const isEditing = !!id;
    const { getStaffById, createStaff, updateStaff } = useAdminStaff();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        roleId: 0, // Assuming 0 is default or placeholder
        status: 'active'
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isEditing && id) {
            const fetchStaff = async () => {
                const staff = await getStaffById(Number(id));
                if (staff) {
                    setFormData({
                        name: staff.name,
                        email: staff.email,
                        roleId: staff.roles[0] || 0, // Assuming picking first role for sync
                        status: staff.status
                    });
                }
            };
            fetchStaff();
        }
    }, [isEditing, id, getStaffById]);

    const handleChange = (field: string, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (isEditing && id) {
                // For update, we might separate role update if needed, but assuming simple update here
                await updateStaff(id, formData as any);
                toast.success('Staff member updated successfully');
            } else {
                await createStaff(formData);
                toast.success('Staff invitation sent successfully');
            }
            navigate('/admin/staff');
        } catch (error) {
            toast.error('Failed to save staff member');
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
