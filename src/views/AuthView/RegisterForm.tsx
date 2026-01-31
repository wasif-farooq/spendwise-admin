import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Input, Button } from '@ui';
import { CreditCard } from 'lucide-react';
import {
    Block,
    Heading,
    Text,
    Container
} from '@shared';
import { SocialLogin } from './components/SocialLogin';
import { useRegisterForm } from '@/hooks/features/auth/useRegisterForm';

export const RegisterForm = () => {
    const {
        register,
        handleSubmit,
        errors,
        isSubmitting,
        onSubmit
    } = useRegisterForm();

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
                    <Heading as="h2" size="3xl" weight="bold" color="text-gray-900">Create your account</Heading>
                    <Text size="sm" color="text-gray-600" className="mt-2">
                        Already have an account?{' '}
                        <Link to="/login" className="font-medium text-primary hover:underline">
                            Sign in
                        </Link>
                    </Text>
                </Block>

                <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    <Block className="space-y-4">
                        <Input
                            label="Full Name"
                            type="text"
                            placeholder="John Doe"
                            {...register('fullName')}
                            error={errors.fullName?.message}
                        />
                        <Input
                            label="Email address"
                            type="email"
                            placeholder="name@company.com"
                            {...register('email')}
                            error={errors.email?.message}
                        />
                        <Input
                            label="Password"
                            type="password"
                            placeholder="••••••••"
                            {...register('password')}
                            error={errors.password?.message}
                        />
                    </Block>

                    <Text size="xs" color="text-gray-500">
                        By signing up, you agree to our{' '}
                        <Link to="/terms" className="text-primary hover:underline">Terms of Service</Link> and{' '}
                        <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>.
                    </Text>

                    <Button type="submit" className="w-full py-6 text-lg" disabled={isSubmitting}>
                        {isSubmitting ? 'Creating account...' : 'Create account'}
                    </Button>
                </form>

                <SocialLogin />
            </Block>
        </Container>
    );
};
