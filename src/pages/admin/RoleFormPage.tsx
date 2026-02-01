import { useParams } from 'react-router-dom';
import { ArrowLeft, Save } from 'lucide-react';
import { Block, Flex, Text } from '@shared';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { CustomSelect } from '@/components/ui/CustomSelect';
import { useRoleForm } from '@/hooks/features/admin/useRoleForm';

export const RoleFormPage = () => {
    const { id } = useParams();
    const {
        formData,
        loading,
        isEditing,
        handleChange,
        handleSubmit,
        navigate
    } = useRoleForm(id);

    return (
        <Block className="space-y-6 max-w-2xl mx-auto">
            <Flex align="center" gap={4}>
                <Button variant="ghost" onClick={() => navigate('/admin/staff-roles')} className="p-2">
                    <ArrowLeft size={20} />
                </Button>
                <Block>
                    <Text as="h1" className="text-2xl font-bold text-gray-900">
                        {isEditing ? 'Edit Role' : 'Create Role'}
                    </Text>
                    <Text className="text-gray-500">
                        {isEditing ? 'Update role details' : 'Define a new staff role'}
                    </Text>
                </Block>
            </Flex>

            <Card className="p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <Input
                        label="Role Name"
                        placeholder="e.g. Support Specialist"
                        value={formData.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                        required
                    />

                    <Input
                        label="Description"
                        placeholder="Brief description of the role responsibilities"
                        value={formData.description}
                        onChange={(e) => handleChange('description', e.target.value)}
                        required
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <CustomSelect
                            label="Color Theme"
                            value={formData.color}
                            onChange={(val) => handleChange('color', val)}
                            options={[
                                { label: 'Blue', value: 'from-blue-500 to-blue-600' },
                                { label: 'Purple', value: 'from-purple-500 to-purple-600' },
                                { label: 'Green', value: 'from-green-500 to-green-600' },
                                { label: 'Red', value: 'from-red-500 to-red-600' },
                                { label: 'Orange', value: 'from-orange-500 to-orange-600' },
                                { label: 'Pink', value: 'from-pink-500 to-pink-600' }
                            ]}
                        />

                        <CustomSelect
                            label="Icon"
                            value={formData.iconName}
                            onChange={(val) => handleChange('iconName', val)}
                            options={[
                                { label: 'Shield', value: 'Shield' },
                                { label: 'Users', value: 'Users' },
                                { label: 'Eye', value: 'Eye' },
                                { label: 'CreditCard', value: 'CreditCard' },
                                { label: 'Zap', value: 'Zap' },
                                { label: 'Ticket', value: 'Ticket' },
                                { label: 'Building', value: 'Building2' },
                                { label: 'Wallet', value: 'Wallet' },
                                { label: 'Headphones', value: 'Headphones' }
                            ]}
                        />
                    </div>

                    <Flex justify="end" gap={3} className="pt-4 border-t border-gray-100 mt-6">
                        <Button
                            type="button"
                            variant="ghost"
                            onClick={() => navigate('/admin/staff-roles')}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            variant="primary"
                            disabled={loading || formData.isDefault}
                            className="gap-2"
                        >
                            <Save size={18} />
                            {loading ? 'Saving...' : 'Save Role'}
                        </Button>
                    </Flex>
                </form>
            </Card>
        </Block>
    );
};
