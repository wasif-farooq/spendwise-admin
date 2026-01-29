import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { forgotPasswordSchema, type ForgotPasswordInput } from './schemas/authSchemas';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { CreditCard, ArrowLeft } from 'lucide-react';

export const ForgotPasswordForm = () => {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ForgotPasswordInput>({
        resolver: zodResolver(forgotPasswordSchema),
    });

    const onSubmit = (data: ForgotPasswordInput) => {
        console.log('Forgot password data:', data);
        // Trigger password reset API here
        navigate('/check-email');
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
                    <h2 className="text-3xl font-bold text-gray-900">Forgot password?</h2>
                    <p className="mt-2 text-sm text-gray-600">
                        No worries, we'll send you reset instructions.
                    </p>
                </div>

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

                <div className="text-center">
                    <Link
                        to="/login"
                        className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-primary transition-colors"
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to login
                    </Link>
                </div>
            </motion.div>
        </div>
    );
};
