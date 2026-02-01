import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useTransactionsList } from '@/hooks/features/admin/useTransactionsList';

export const useTransactionForm = (id?: string) => {
    const navigate = useNavigate();
    const isEditing = !!id;
    const { getTransactionById, createTransaction, updateTransaction } = useTransactionsList();

    const [formData, setFormData] = useState({
        description: '',
        amount: 0,
        type: 'expense' as 'income' | 'expense',
        category: 'General',
        date: new Date().toISOString().split('T')[0],
        status: 'completed' as 'completed' | 'pending' | 'failed'
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isEditing && id) {
            const fetchTransaction = async () => {
                const transaction = await getTransactionById(id);
                if (transaction) {
                    setFormData({
                        description: transaction.description,
                        amount: transaction.amount,
                        type: transaction.type,
                        category: transaction.category,
                        date: new Date(transaction.date).toISOString().split('T')[0],
                        status: transaction.status
                    });
                }
            };
            fetchTransaction();
        }
    }, [isEditing, id, getTransactionById]);

    const handleChange = (field: string, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (isEditing && id) {
                await updateTransaction(id, {
                    ...formData,
                    date: new Date(formData.date).toISOString()
                });
                toast.success('Transaction updated successfully');
            } else {
                await createTransaction({
                    ...formData,
                    date: new Date(formData.date).toISOString()
                });
                toast.success('Transaction created successfully');
            }
            navigate('/admin/transactions');
        } catch (error) {
            toast.error('Failed to save transaction');
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
