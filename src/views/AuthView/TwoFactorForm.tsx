import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { twoFactorSchema, type TwoFactorInput } from './schemas/authSchemas';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { CreditCard, ArrowLeft } from 'lucide-react';
import { useState } from 'react';

export const TwoFactorForm = () => {
    const navigate = useNavigate();
    const [resendDisabled, setResendDisabled] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<TwoFactorInput>({
        resolver: zodResolver(twoFactorSchema),
    });

    const onSubmit = (data: TwoFactorInput) => {
        console.log('2FA code:', data);
        // Handle 2FA verification logic here
        // Simulate successful verification and redirect to home/dashboard
        setTimeout(() => {
            navigate('/');
        }, 500);
    };

    const handleResendCode = () => {
        setResendDisabled(true);
        console.log('Resending verification code...');
        // Simulate API call
        setTimeout(() => {
            setResendDisabled(false);
        }, 30000); // Re-enable after 30 seconds
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
                    <h2 className="text-3xl font-bold text-gray-900">Two-Factor Authentication</h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Enter the 6-digit code sent to your device
                    </p>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    <div className="space-y-4">
                        <Input
                            label="Verification Code"
                            type="text"
                            placeholder="000000"
                            maxLength={6}
                            autoFocus
                            {...register('code')}
                            error={errors.code?.message}
                            className="text-center text-2xl tracking-widest font-mono"
                        />
                    </div>

                    <Button type="submit" className="w-full py-6 text-lg" disabled={isSubmitting}>
                        {isSubmitting ? 'Verifying...' : 'Verify Code'}
                    </Button>

                    <div className="flex flex-col space-y-3 text-center">
                        <button
                            type="button"
                            onClick={handleResendCode}
                            disabled={resendDisabled}
                            className="text-sm font-medium text-primary hover:underline disabled:text-gray-400 disabled:no-underline disabled:cursor-not-allowed"
                        >
                            {resendDisabled ? 'Code sent! Wait 30s to resend' : 'Resend code'}
                        </button>
                        <Link
                            to="/login"
                            className="inline-flex items-center justify-center text-sm font-medium text-gray-600 hover:text-gray-900"
                        >
                            <ArrowLeft className="h-4 w-4 mr-1" />
                            Back to login
                        </Link>
                    </div>
                </form>
            </motion.div>
        </div>
    );
};
