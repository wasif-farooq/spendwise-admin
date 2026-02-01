import { useParams } from 'react-router-dom';
import { ArrowLeft, Save } from 'lucide-react';
import { Block, Flex, Text } from '@shared';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { CustomSelect } from '@/components/ui/CustomSelect';
import { useTransactionForm } from '@/hooks/features/admin/useTransactionForm';

export const TransactionFormPage = () => {
    const { id } = useParams();
    const {
        formData,
        loading,
        isEditing,
        handleChange,
        handleSubmit,
        navigate
    } = useTransactionForm(id);

    return (
        <Block className="space-y-6 max-w-2xl mx-auto">
            <Flex align="center" gap={4}>
                <Button variant="ghost" onClick={() => navigate('/admin/transactions')} className="p-2">
                    <ArrowLeft size={20} />
                </Button>
                <Block>
                    <Text as="h1" className="text-2xl font-bold text-gray-900">
                        {isEditing ? 'Edit Transaction' : 'Create Transaction'}
                    </Text>
                    <Text className="text-gray-500">
                        {isEditing ? 'Update transaction details' : 'Record a new financial transaction'}
                    </Text>
                </Block>
            </Flex>

            <Card className="p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <Input
                        label="Description"
                        placeholder="e.g. Office Supplies"
                        value={formData.description}
                        onChange={(e) => handleChange('description', e.target.value)}
                        required
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Input
                            label="Amount"
                            type="number"
                            placeholder="0.00"
                            value={formData.amount}
                            onChange={(e) => handleChange('amount', parseFloat(e.target.value))}
                            required
                        />

                        <Input
                            label="Date"
                            type="date"
                            value={formData.date}
                            onChange={(e) => handleChange('date', e.target.value)}
                            required
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <CustomSelect
                            label="Type"
                            value={formData.type}
                            onChange={(val) => handleChange('type', val)}
                            options={[
                                { label: 'Income', value: 'income' },
                                { label: 'Expense', value: 'expense' }
                            ]}
                        />

                        <CustomSelect
                            label="Category"
                            value={formData.category}
                            onChange={(val) => handleChange('category', val)}
                            options={[
                                { label: 'General', value: 'General' },
                                { label: 'Subscriptions', value: 'Subscriptions' },
                                { label: 'Office', value: 'Office' },
                                { label: 'Marketing', value: 'Marketing' },
                                { label: 'Travel', value: 'Travel' },
                                { label: 'Sales', value: 'Sales' }
                            ]}
                        />
                    </div>

                    <CustomSelect
                        label="Status"
                        value={formData.status}
                        onChange={(val) => handleChange('status', val)}
                        options={[
                            { label: 'Completed', value: 'completed' },
                            { label: 'Pending', value: 'pending' },
                            { label: 'Failed', value: 'failed' }
                        ]}
                    />

                    <Flex justify="end" gap={3} className="pt-4 border-t border-gray-100 mt-6">
                        <Button
                            type="button"
                            variant="ghost"
                            onClick={() => navigate('/admin/transactions')}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            variant="primary"
                            disabled={loading}
                            className="gap-2"
                        >
                            <Save size={18} />
                            {loading ? 'Saving...' : 'Save Transaction'}
                        </Button>
                    </Flex>
                </form>
            </Card>
        </Block>
    );
};
