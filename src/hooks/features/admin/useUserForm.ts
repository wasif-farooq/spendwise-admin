import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useAdminUsers } from '@/hooks/features/admin/useAdminUsers';

export const useUserForm = (id?: string) => {
    const navigate = useNavigate();
    const isEditing = !!id;
    const { getUserById, createUser, updateUser } = useAdminUsers();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        role: 'user',
        status: 'active',
        subscriptionPlan: 'free'
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isEditing && id) {
            const fetchUser = async () => {
                const user = await getUserById(id);
                // Mock subscription data since API might not return it yet
                // in real app this would come from user object
                const mockPlan = (user as any).subscription?.plan || 'free';

                if (user) {
                    setFormData({
                        name: user.name,
                        email: user.email,
                        role: user.role,
                        status: user.status,
                        subscriptionPlan: mockPlan
                    });
                }
            };
            fetchUser();
        }
    }, [isEditing, id, getUserById]);

    const handleChange = (field: string, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (isEditing && id) {
                await updateUser(id, formData as any);
                toast.success('User updated successfully');
            } else {
                await createUser(formData as any);
                toast.success('User created successfully');
            }
            navigate('/users');
        } catch (error) {
            toast.error('Failed to save user');
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
