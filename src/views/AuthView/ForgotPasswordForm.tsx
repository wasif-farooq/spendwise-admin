import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Input, Button } from '@ui';
import {
    Block,
    Heading,
    Text,
    Container
} from '@shared';
import { CreditCard, ArrowLeft } from 'lucide-react';
import { useForgotPasswordForm } from '@/hooks/features/auth/useForgotPasswordForm';

export const ForgotPasswordForm = () => {
    const {
        register,
        handleSubmit,
        errors,
        onSubmit
    } = useForgotPasswordForm();

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
                    <Heading as="h2" size="3xl" weight="bold" color="text-gray-900">Forgot password?</Heading>
                    <Text size="sm" color="text-gray-600" className="mt-2">
                        No worries, we'll send you reset instructions.
                    </Text>
                </Block>

                <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    <Input
                        label="Email address"
                        type="email"
                        placeholder="name@company.com"
                        {...register('email')}
                        error={errors.email?.message}
                    />

                    <Button type="submit" className="w-full py-6 text-lg">
                        Reset password
                    </Button>
                </form>

                <Block className="text-center">
                    <Link
                        to="/login"
                        className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-primary transition-colors"
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to login
                    </Link>
                </Block>
            </Block>
        </Container>
    );
};

