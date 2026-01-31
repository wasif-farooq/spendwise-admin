import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Input, Button } from '@ui';
import {
    Block,
    Heading,
    Text,
    Container
} from '@shared';
import { CreditCard } from 'lucide-react';
import { useResetPasswordForm } from '@/hooks/features/auth/useResetPasswordForm';

export const ResetPasswordForm = () => {
    const {
        register,
        handleSubmit,
        errors,
        isSubmitting,
        onSubmit
    } = useResetPasswordForm();

    return (
        <Container as="div" size="full" className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <Block
                as={motion.div}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-xl border border-gray-100"
            >
                <Block className="text-center">
                    <Link to="/" className="inline-flex items-center mb-6">
                        <CreditCard className="h-10 w-10 text-primary" />
                        <Heading as="span" size="2xl" weight="bold" color="text-gray-900" className="ml-2">SpendWise</Heading>
                    </Link>
                    <Heading as="h2" size="3xl" weight="bold" color="text-gray-900">Set new password</Heading>
                    <Text size="sm" color="text-gray-600" className="mt-2">
                        Your new password must be different from previously used passwords.
                    </Text>
                </Block>

                <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    <Block className="space-y-4">
                        <Input
                            label="New Password"
                            type="password"
                            placeholder="••••••••"
                            {...register('password')}
                            error={errors.password?.message}
                        />
                        <Input
                            label="Confirm Password"
                            type="password"
                            placeholder="••••••••"
                            {...register('confirmPassword')}
                            error={errors.confirmPassword?.message}
                        />
                    </Block>

                    <Button type="submit" className="w-full py-6 text-lg" disabled={isSubmitting}>
                        {isSubmitting ? 'Resetting...' : 'Reset password'}
                    </Button>
                </form>
            </Block>
        </Container>
    );
};

