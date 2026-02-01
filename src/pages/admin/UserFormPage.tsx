import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save } from 'lucide-react';
import { Block, Flex, Text } from '@shared';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { CustomSelect } from '@/components/ui/CustomSelect';
import { toast } from 'sonner';
import { useAdminUsers } from '@/hooks/features/admin/useAdminUsers';

export const UserFormPage = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const isEditing = !!id;
    const { getUserById, createUser, updateUser } = useAdminUsers();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        role: 'user',
        status: 'active'
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isEditing && id) {
            const user = getUserById(id);
            if (user) {
                setFormData({
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    status: user.status
                });
            }
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

    return (
        <Block className="space-y-6 max-w-2xl mx-auto">
            <Flex align="center" gap={4}>
                <Button variant="ghost" onClick={() => navigate('/users')} className="p-2">
                    <ArrowLeft size={20} />
                </Button>
                <Block>
                    <Text as="h1" className="text-2xl font-bold text-gray-900">
                        {isEditing ? 'Edit User' : 'Create New User'}
                    </Text>
                    <Text className="text-gray-500">
                        {isEditing ? 'Update user details and permissions' : 'Add a new user to the platform'}
                    </Text>
                </Block>
            </Flex>

            <Card className="p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <Input
                        label="Full Name"
                        placeholder="e.g. John Doe"
                        value={formData.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                        required
                    />

                    <Input
                        label="Email Address"
                        type="email"
                        placeholder="e.g. john@example.com"
                        value={formData.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        required
                    />

                    <div className="grid grid-cols-2 gap-4">
                        <CustomSelect
                            label="Role"
                            value={formData.role}
                            onChange={(val) => handleChange('role', val)}
                            options={[
                                { label: 'User', value: 'user' },
                                { label: 'Admin', value: 'admin' },
                                { label: 'Staff', value: 'staff' }
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
                            onClick={() => navigate('/users')}
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
                            {loading ? 'Saving...' : 'Save User'}
                        </Button>
                    </Flex>
                </form>
            </Card>
        </Block>
    );
};
