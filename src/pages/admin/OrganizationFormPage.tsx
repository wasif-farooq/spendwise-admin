import { useParams } from 'react-router-dom';
import { ArrowLeft, Save } from 'lucide-react';
import { Block, Flex, Text } from '@shared';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { CustomSelect } from '@/components/ui/CustomSelect';
import { useOrganizationForm } from '@/hooks/features/admin/useOrganizationForm';

export const OrganizationFormPage = () => {
    const { id } = useParams();
    const {
        formData,
        loading,
        isEditing,
        handleChange,
        handleSubmit,
        navigate
    } = useOrganizationForm(id);

    return (
        <Block className="space-y-6 max-w-2xl mx-auto">
            <Flex align="center" gap={4}>
                <Button variant="ghost" onClick={() => navigate('/admin/organizations')} className="p-2">
                    <ArrowLeft size={20} />
                </Button>
                <Block>
                    <Text as="h1" className="text-2xl font-bold text-gray-900">
                        {isEditing ? 'Edit Organization' : 'Create Organization'}
                    </Text>
                    <Text className="text-gray-500">
                        {isEditing ? 'Update organization details and plan' : 'Register a new organization'}
                    </Text>
                </Block>
            </Flex>

            <Card className="p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <Input
                        label="Organization Name"
                        placeholder="e.g. Acme Corp"
                        value={formData.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                        required
                    />

                    <Input
                        label="Owner Email"
                        type="email"
                        placeholder="e.g. admin@acme.com"
                        value={formData.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        required
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <CustomSelect
                            label="Subscription Plan"
                            value={formData.plan}
                            onChange={(val) => handleChange('plan', val)}
                            options={[
                                { label: 'Free', value: 'free' },
                                { label: 'Pro', value: 'pro' },
                                { label: 'Enterprise', value: 'enterprise' }
                            ]}
                        />

                        <CustomSelect
                            label="Status"
                            value={formData.status}
                            onChange={(val) => handleChange('status', val)}
                            options={[
                                { label: 'Active', value: 'active' },
                                { label: 'Suspended', value: 'suspended' }
                            ]}
                        />
                    </div>

                    <Flex justify="end" gap={3} className="pt-4 border-t border-gray-100 mt-6">
                        <Button
                            type="button"
                            variant="ghost"
                            onClick={() => navigate('/admin/organizations')}
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
                            {loading ? 'Saving...' : 'Save Organization'}
                        </Button>
                    </Flex>
                </form>
            </Card>
        </Block>
    );
};
