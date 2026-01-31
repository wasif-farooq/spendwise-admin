import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, type LoginInput } from './schemas/authSchemas';
import { Input, Button } from '@ui';
import {
    Block,
    Flex,
    Heading,
    Text,
    Container
} from '@shared';
import { SocialLogin } from './components/SocialLogin';
import { CreditCard } from 'lucide-react';
import { toast } from 'sonner';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { loginThunk, selectAuthLoading } from '@/store/slices/authSlice';

export const LoginForm = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const loading = useAppSelector(selectAuthLoading);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginInput>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (data: LoginInput) => {
        try {
            const result = await dispatch(loginThunk(data));

            if (loginThunk.fulfilled.match(result)) {
                // Check if 2FA is required
                if (result.payload.requiresTwoFactor) {
                    // Redux state is already updated, just navigate
                    navigate('/verify-2fa');
                } else {
                    // No 2FA required, redirect to dashboard
                    navigate('/dashboard');
                }
            } else if (loginThunk.rejected.match(result)) {
                // Handle error
                toast.error(result.payload as string || 'Login failed');
            }
        } catch (error: any) {
            console.error('Login error:', error);
            toast.error('An error occurred during login. Please try again.');
        }
    };

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
                    <Heading as="h2" size="3xl" weight="bold" color="text-gray-900">Welcome back</Heading>
                    <Text size="sm" color="text-gray-600" className="mt-2">
                        Don't have an account?{' '}
                        <Link to="/register" className="font-medium text-primary hover:underline">
                            Sign up for free
                        </Link>
                    </Text>
                </Block>

                <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    <Block className="space-y-4">
                        <Input
                            label="Email address"
                            type="email"
                            placeholder="name@company.com"
                            {...register('email')}
                            error={errors.email?.message}
                        />
                        <Block className="space-y-1">
                            <Input
                                label="Password"
                                type="password"
                                placeholder="••••••••"
                                {...register('password')}
                                error={errors.password?.message}
                            />
                            <Flex justify="end">
                                <Link
                                    to="/forgot-password"
                                    className="text-sm font-medium text-primary hover:underline"
                                >
                                    Forgot password?
                                </Link>
                            </Flex>
                        </Block>
                    </Block>

                    <Button type="submit" className="w-full py-6 text-lg" disabled={loading}>
                        {loading ? 'Signing in...' : 'Sign in'}
                    </Button>
                </form>

                <SocialLogin />
            </Block>
        </Container>
    );
};
