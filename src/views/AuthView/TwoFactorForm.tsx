import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { twoFactorSchema, type TwoFactorInput } from './schemas/authSchemas';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { CreditCard, ArrowLeft, Smartphone, MessageSquare, Mail, ShieldCheck } from 'lucide-react';
import { useState } from 'react';

type AuthMethod = 'authenticator' | 'whatsapp' | 'email';

export const TwoFactorForm = () => {
    const navigate = useNavigate();
    const [resendDisabled, setResendDisabled] = useState(false);
    const [method, setMethod] = useState<AuthMethod>('authenticator');

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<TwoFactorInput>({
        resolver: zodResolver(twoFactorSchema),
    });

    const onSubmit = (data: TwoFactorInput) => {
        console.log('2FA code:', data, 'Method:', method);
        setTimeout(() => {
            navigate('/');
        }, 500);
    };

    const handleResendCode = () => {
        setResendDisabled(true);
        setTimeout(() => {
            setResendDisabled(false);
        }, 30000);
    };

    const methods = [
        { id: 'authenticator' as AuthMethod, label: 'App', icon: Smartphone, description: 'Authenticator App' },
        { id: 'whatsapp' as AuthMethod, label: 'WhatsApp', icon: MessageSquare, description: 'SMS/WhatsApp' },
        { id: 'email' as AuthMethod, label: 'Email', icon: Mail, description: 'Email Address' },
    ];

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-md w-full space-y-8 bg-white p-8 rounded-3xl shadow-2xl border border-gray-100"
            >
                <div className="text-center">
                    <Link to="/" className="inline-flex items-center mb-6 group">
                        <div className="bg-primary/10 p-3 rounded-2xl group-hover:scale-110 transition-transform">
                            <CreditCard className="h-8 w-8 text-primary" />
                        </div>
                        <span className="ml-3 text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600">
                            ExpenseFlow
                        </span>
                    </Link>
                    <div className="flex justify-center mb-4">
                        <div className="bg-green-50 p-3 rounded-full">
                            <ShieldCheck className="h-8 w-8 text-green-600" />
                        </div>
                    </div>
                    <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Security Check</h2>
                    <p className="mt-3 text-gray-500 text-sm leading-relaxed">
                        Choose your preferred method to receive a 6-digit verification code.
                    </p>
                </div>

                <div className="grid grid-cols-3 gap-3 mt-8">
                    {methods.map((m) => {
                        const Icon = m.icon;
                        const isActive = method === m.id;
                        return (
                            <button
                                key={m.id}
                                type="button"
                                onClick={() => setMethod(m.id)}
                                className={`flex flex-col items-center p-4 rounded-2xl border-2 transition-all duration-200 ${isActive
                                        ? 'border-primary bg-primary/5 ring-4 ring-primary/10'
                                        : 'border-gray-100 bg-white hover:border-gray-200 hover:bg-gray-50'
                                    }`}
                            >
                                <Icon className={`h-6 w-6 mb-2 ${isActive ? 'text-primary' : 'text-gray-400'}`} />
                                <span className={`text-xs font-bold ${isActive ? 'text-primary' : 'text-gray-500'}`}>
                                    {m.label}
                                </span>
                            </button>
                        );
                    })}
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={method}
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            className="text-center"
                        >
                            <p className="text-sm font-medium text-gray-600 mb-4">
                                {method === 'authenticator' && 'Enter the code from your Authenticator app'}
                                {method === 'whatsapp' && 'We\'ve sent a code to your WhatsApp'}
                                {method === 'email' && 'We\'ve sent a code to your email'}
                            </p>
                        </motion.div>
                    </AnimatePresence>

                    <div className="space-y-4">
                        <Input
                            label="Verification Code"
                            type="text"
                            placeholder="000 000"
                            maxLength={6}
                            autoFocus
                            {...register('code')}
                            error={errors.code?.message}
                            className="text-center text-3xl tracking-[0.5em] font-bold bg-gray-50 border-none focus:ring-2 focus:ring-primary h-16"
                        />
                    </div>

                    <Button type="submit" className="w-full py-6 text-lg font-bold shadow-lg shadow-primary/20" disabled={isSubmitting}>
                        {isSubmitting ? 'Verifying...' : 'Verify & Continue'}
                    </Button>

                    <div className="flex flex-col space-y-4 text-center">
                        <button
                            type="button"
                            onClick={handleResendCode}
                            disabled={resendDisabled}
                            className="text-sm font-semibold text-primary hover:text-primary/80 disabled:text-gray-400 transition-colors"
                        >
                            {resendDisabled ? 'Code sent! Wait 30s' : 'Didn\'t receive a code? Resend'}
                        </button>
                        <Link
                            to="/login"
                            className="inline-flex items-center justify-center text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
                        >
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Return to sign in
                        </Link>
                    </div>
                </form>
            </motion.div>
        </div>
    );
};
