import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useAccountsList } from '@/hooks/features/admin/useAccountsList';

export const useAccountForm = (id?: string) => {
    const navigate = useNavigate();
    const isEditing = !!id;
    const { getAccountById, createAccount, updateAccount } = useAccountsList();

    const [formData, setFormData] = useState({
        name: '',
        organization: '',
        type: 'checking',
        ownerEmail: '',
        balance: 0,
        currency: 'USD',
        status: 'active'
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isEditing && id) {
            const fetchAccount = async () => {
                const account = await getAccountById(id);
                if (account) {
                    setFormData({
                        name: account.name,
                        organization: account.organization || '',
                        type: account.type || 'checking',
                        ownerEmail: account.ownerEmail || '',
                        balance: account.balance || 0,
                        currency: 'USD', // Default or fetch if available
                        status: account.status || 'active'
                    });
                }
            };
            fetchAccount();
        }
    }, [isEditing, id, getAccountById]);

    const handleChange = (field: string, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (isEditing && id) {
                await updateAccount(id, formData);
                toast.success('Account updated successfully');
            } else {
                await createAccount(formData);
                toast.success('Account created successfully');
            }
            navigate('/admin/accounts');
        } catch (error) {
            toast.error('Failed to save account');
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
