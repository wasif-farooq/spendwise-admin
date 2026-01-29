import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, type LoginInput } from './schemas/authSchemas';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { SocialLogin } from './components/SocialLogin';
import { CreditCard } from 'lucide-react';

export const LoginForm = () => {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LoginInput>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = (data: LoginInput) => {
        console.log('Login data:', data);
        // Simulate successful login and redirect to 2FA
        setTimeout(() => {
            navigate('/verify-2fa');
        }, 500);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-xl border border-gray-100"
            >
                <div className="text-center">
                    <Link to="/" className="inline-flex items-center mb-6">
                        <CreditCard className="h-10 w-10 text-primary" />
                        <span className="ml-2 text-2xl font-bold text-gray-900">ExpenseFlow</span>
                    </Link>
                    <h2 className="text-3xl font-bold text-gray-900">Welcome back</h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Don't have an account?{' '}
                        <Link to="/register" className="font-medium text-primary hover:underline">
                            Sign up for free
                        </Link>
                    </p>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    <div className="space-y-4">
                        <Input
                            label="Email address"
                            type="email"
                            placeholder="name@company.com"
                            {...register('email')}
                            error={errors.email?.message}
                        />
                        <div className="space-y-1">
                            <Input
                                label="Password"
                                type="password"
                                placeholder="••••••••"
                                {...register('password')}
                                error={errors.password?.message}
                            />
                            <div className="flex justify-end">
                                <Link
                                    to="/forgot-password"
                                    className="text-sm font-medium text-primary hover:underline"
                                >
                                    Forgot password?
                                </Link>
                            </div>
                        </div>
                    </div>

                    <Button type="submit" className="w-full py-6 text-lg" disabled={isSubmitting}>
                        {isSubmitting ? 'Signing in...' : 'Sign in'}
                    </Button>
                </form>

                <SocialLogin />
            </motion.div>
        </div>
    );
};
