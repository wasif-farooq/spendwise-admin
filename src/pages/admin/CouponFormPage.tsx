import { useParams } from 'react-router-dom';
import { ArrowLeft, Save } from 'lucide-react';
import { Block, Flex, Text } from '@shared';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { CustomSelect } from '@/components/ui/CustomSelect';
import { useCouponForm } from '@/hooks/features/admin/useCouponForm';

export const CouponFormPage = () => {
    const { id } = useParams();
    const {
        formData,
        loading,
        isEditing,
        handleChange,
        handleSubmit,
        navigate
    } = useCouponForm(id);

    return (
        <Block className="space-y-6 max-w-2xl mx-auto">
            <Flex align="center" gap={4}>
                <Button variant="ghost" onClick={() => navigate('/admin/coupons')} className="p-2">
                    <ArrowLeft size={20} />
                </Button>
                <Block>
                    <Text as="h1" className="text-2xl font-bold text-gray-900">
                        {isEditing ? 'Edit Coupon' : 'Create Coupon'}
                    </Text>
                    <Text className="text-gray-500">
                        {isEditing ? 'Update coupon details' : 'Create a new discount code'}
                    </Text>
                </Block>
            </Flex>

            <Card className="p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Input
                            label="Coupon Code"
                            placeholder="e.g. SUMMER2024"
                            value={formData.code}
                            onChange={(e) => handleChange('code', e.target.value.toUpperCase())}
                            required
                        />

                        <CustomSelect
                            label="Discount Type"
                            value={formData.type}
                            onChange={(val) => handleChange('type', val)}
                            options={[
                                { label: 'Percentage', value: 'percentage' },
                                { label: 'Fixed Amount', value: 'fixed' }
                            ]}
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Input
                            label="Discount Value"
                            type="number"
                            placeholder="e.g. 20"
                            value={formData.discount}
                            onChange={(e) => handleChange('discount', Number(e.target.value))}
                            required
                        />

                        <Input
                            label="Max Uses"
                            type="number"
                            placeholder="e.g. 100"
                            value={formData.maxUses}
                            onChange={(e) => handleChange('maxUses', Number(e.target.value))}
                            required
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Input
                            label="Expiry Date"
                            type="date"
                            value={formData.expiryDate}
                            onChange={(e) => handleChange('expiryDate', e.target.value)}
                            required
                        />

                        <CustomSelect
                            label="Status"
                            value={formData.status}
                            onChange={(val) => handleChange('status', val)}
                            options={[
                                { label: 'Active', value: 'active' },
                                { label: 'Disabled', value: 'disabled' },
                                { label: 'Expired', value: 'expired' }
                            ]}
                        />
                    </div>

                    <Flex justify="end" gap={3} className="pt-4 border-t border-gray-100 mt-6">
                        <Button
                            type="button"
                            variant="ghost"
                            onClick={() => navigate('/admin/coupons')}
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
                            {loading ? 'Saving...' : (isEditing ? 'Save Changes' : 'Create Coupon')}
                        </Button>
                    </Flex>
                </form>
            </Card>
        </Block>
    );
};
