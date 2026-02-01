import { useParams } from 'react-router-dom';
import { ArrowLeft, Save } from 'lucide-react';
import { Block, Flex, Text } from '@shared';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { CustomSelect } from '@/components/ui/CustomSelect';
import { useAccountForm } from '@/hooks/features/admin/useAccountForm';

export const AccountFormPage = () => {
    const { id } = useParams();
    const {
        formData,
        loading,
        isEditing,
        handleChange,
        handleSubmit,
        navigate
    } = useAccountForm(id);

    return (
        <Block className="space-y-6 max-w-2xl mx-auto">
            <Flex align="center" gap={4}>
                <Button variant="ghost" onClick={() => navigate('/admin/accounts')} className="p-2">
                    <ArrowLeft size={20} />
                </Button>
                <Block>
                    <Text as="h1" className="text-2xl font-bold text-gray-900">
                        {isEditing ? 'Edit Account' : 'Create Account'}
                    </Text>
                    <Text className="text-gray-500">
                        {isEditing ? 'Update account details' : 'Register a new financial account'}
                    </Text>
                </Block>
            </Flex>

            <Card className="p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <Input
                        label="Account Name"
                        placeholder="e.g. Main Operations"
                        value={formData.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                        required
                    />

                    <Input
                        label="Organization"
                        placeholder="Organization Name"
                        value={formData.organization}
                        onChange={(e) => handleChange('organization', e.target.value)}
                        required
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Input
                            label="Owner Email"
                            type="email"
                            placeholder="e.g. finance@acme.com"
                            value={formData.ownerEmail}
                            onChange={(e) => handleChange('ownerEmail', e.target.value)}
                        />

                        <CustomSelect
                            label="Account Type"
                            value={formData.type}
                            onChange={(val) => handleChange('type', val)}
                            options={[
                                { label: 'Checking', value: 'checking' },
                                { label: 'Savings', value: 'savings' },
                                { label: 'Investment', value: 'investment' } // Check types
                            ]}
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Input
                            label="Initial Balance"
                            type="number"
                            placeholder="0.00"
                            value={formData.balance}
                            onChange={(e) => handleChange('balance', parseFloat(e.target.value))}
                        />

                        <CustomSelect
                            label="Status"
                            value={formData.status}
                            onChange={(val) => handleChange('status', val)}
                            options={[
                                { label: 'Active', value: 'active' },
                                { label: 'Flagged', value: 'flagged' },
                                { label: 'Closed', value: 'closed' }
                            ]}
                        />
                    </div>

                    <Flex justify="end" gap={3} className="pt-4 border-t border-gray-100 mt-6">
                        <Button
                            type="button"
                            variant="ghost"
                            onClick={() => navigate('/admin/accounts')}
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
                            {loading ? 'Saving...' : 'Save Account'}
                        </Button>
                    </Flex>
                </form>
            </Card>
        </Block>
    );
};
