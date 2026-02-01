import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useOrganizationsList } from '@/hooks/features/admin/useOrganizationsList';

export const useOrganizationForm = (id?: string) => {
    const navigate = useNavigate();
    const isEditing = !!id;
    const { getOrgById, createOrg, updateOrg } = useOrganizationsList();

    const [formData, setFormData] = useState({
        name: '',
        email: '', // Owner email or contact
        plan: 'free',
        status: 'active'
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isEditing && id) {
            const fetchOrg = async () => {
                const org = await getOrgById(id);
                if (org) {
                    setFormData({
                        name: org.name,
                        email: org.owner || '', // Assuming owner field maps to email or creating placeholder
                        plan: org.plan || 'free',
                        status: org.status
                    });
                }
            };
            fetchOrg();
        }
    }, [isEditing, id, getOrgById]);

    const handleChange = (field: string, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (isEditing && id) {
                await updateOrg(id, formData);
                toast.success('Organization updated successfully');
            } else {
                await createOrg(formData);
                toast.success('Organization created successfully');
            }
            navigate('/admin/organizations');
        } catch (error) {
            toast.error('Failed to save organization');
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
