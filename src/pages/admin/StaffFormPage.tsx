import { useParams } from 'react-router-dom';
import { ArrowLeft, Save } from 'lucide-react';
import { Block, Flex, Text } from '@shared';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { CustomSelect } from '@/components/ui/CustomSelect';
import { useStaffForm } from '@/hooks/features/admin/useStaffForm';

export const StaffFormPage = () => {
    const { id } = useParams();
    const {
        formData,
        loading,
        isEditing,
        handleChange,
        handleSubmit,
        navigate
    } = useStaffForm(id);

    return (
        <Block className="space-y-6 max-w-2xl mx-auto">
            <Flex align="center" gap={4}>
                <Button variant="ghost" onClick={() => navigate('/admin/staff')} className="p-2">
                    <ArrowLeft size={20} />
                </Button>
                <Block>
                    <Text as="h1" className="text-2xl font-bold text-gray-900">
                        {isEditing ? 'Edit Staff Member' : 'Invite Staff Member'}
                    </Text>
                    <Text className="text-gray-500">
                        {isEditing ? 'Update staff details and roles' : 'Add a new member to the admin team'}
                    </Text>
                </Block>
            </Flex>

            <Card className="p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <Input
                        label="Full Name"
                        placeholder="e.g. Alice Smith"
                        value={formData.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                        required
                    />

                    <Input
                        label="Email Address"
                        type="email"
                        placeholder="e.g. alice@spendwise.com"
                        value={formData.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        required
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <CustomSelect
                            label="Primary Role"
                            value={formData.roleId}
                            onChange={(val) => handleChange('roleId', Number(val))}
                            options={[
                                { label: 'Admin', value: 1 },
                                { label: 'Manager', value: 2 },
                                { label: 'Support', value: 3 },
                                { label: 'Analyst', value: 4 }
                            ]}
                        />

                        {isEditing && (
                            <CustomSelect
                                label="Status"
                                value={formData.status}
                                onChange={(val) => handleChange('status', val)}
                                options={[
                                    { label: 'Active', value: 'active' },
                                    { label: 'Inactive', value: 'inactive' }
                                ]}
                            />
                        )}
                    </div>

                    <Flex justify="end" gap={3} className="pt-4 border-t border-gray-100 mt-6">
                        <Button
                            type="button"
                            variant="ghost"
                            onClick={() => navigate('/admin/staff')}
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
                            {loading ? 'Sending...' : (isEditing ? 'Save Changes' : 'Send Invitation')}
                        </Button>
                    </Flex>
                </form>
            </Card>
        </Block>
    );
};
