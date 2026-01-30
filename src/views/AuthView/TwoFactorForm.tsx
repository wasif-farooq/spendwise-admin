import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { twoFactorSchema, type TwoFactorInput } from './schemas/authSchemas';
import { Input, Button } from '@ui';
import {
    Block,
    Flex,
    Heading,
    Text,
    Container,
    Grid
} from '@shared';
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
            navigate('/dashboard');
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
        <Container as="div" size="full" className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <Block
                as={motion.div}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-md w-full space-y-8 bg-white p-8 rounded-3xl shadow-2xl border border-gray-100"
            >
                <Block className="text-center">
                    <Link to="/" className="inline-flex items-center mb-6 group">
                        <Flex className="bg-primary/10 p-3 rounded-2xl group-hover:scale-110 transition-transform">
                            <CreditCard className="h-8 w-8 text-primary" />
                        </Flex>
                        <Heading as="span" size="2xl" weight="bold" className="ml-3 bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600">
                            SpendWise
                        </Heading>
                    </Link>
                    <Flex justify="center" className="mb-4">
                        <Block className="bg-green-50 p-3 rounded-full">
                            <ShieldCheck className="h-8 w-8 text-green-600" />
                        </Block>
                    </Flex>
                    <Heading as="h2" size="3xl" weight="extrabold" color="text-gray-900" className="tracking-tight">Security Check</Heading>
                    <Text size="sm" color="text-gray-500" className="mt-3 leading-relaxed">
                        Choose your preferred method to receive a 6-digit verification code.
                    </Text>
                </Block>

                <Grid cols={3} gap={3} className="mt-8">
                    {methods.map((m) => {
                        const Icon = m.icon;
                        const isActive = method === m.id;
                        return (
                            <Button
                                variant="ghost"
                                key={m.id}
                                type="button"
                                onClick={() => setMethod(m.id)}
                                className={`flex flex-col items-center p-4 rounded-2xl border-2 transition-all duration-200 ${isActive
                                    ? 'border-primary bg-primary/5 ring-4 ring-primary/10'
                                    : 'border-gray-100 bg-white hover:border-gray-200 hover:bg-gray-50'
                                    }`}
                            >
                                <Icon className={`h-6 w-6 mb-2 ${isActive ? 'text-primary' : 'text-gray-400'}`} />
                                <Text size="xs" weight="bold" className={isActive ? 'text-primary' : 'text-gray-500'}>
                                    {m.label}
                                </Text>
                            </Button>
                        );
                    })}
                </Grid>

                <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    <AnimatePresence mode="wait">
                        <Block
                            as={motion.div}
                            key={method}
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            className="text-center"
                        >
                            <Text size="sm" weight="medium" color="text-gray-600" className="mb-4">
                                {method === 'authenticator' && 'Enter the code from your Authenticator app'}
                                {method === 'whatsapp' && 'We\'ve sent a code to your WhatsApp'}
                                {method === 'email' && 'We\'ve sent a code to your email'}
                            </Text>
                        </Block>
                    </AnimatePresence>

                    <Block className="space-y-4">
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
                    </Block>

                    <Button type="submit" className="w-full py-6 text-lg font-bold shadow-lg shadow-primary/20" disabled={isSubmitting}>
                        {isSubmitting ? 'Verifying...' : 'Verify & Continue'}
                    </Button>

                    <Flex direction="col" gap={4} className="text-center">
                        <Button
                            variant="ghost"
                            type="button"
                            onClick={handleResendCode}
                            disabled={resendDisabled}
                            className="text-sm font-semibold text-primary hover:text-primary/80 disabled:text-gray-400 transition-colors"
                        >
                            {resendDisabled ? 'Code sent! Wait 30s' : 'Didn\'t receive a code? Resend'}
                        </Button>
                        <Link
                            to="/login"
                            className="inline-flex items-center justify-center text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
                        >
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Return to sign in
                        </Link>
                    </Flex>
                </form>
            </Block>
        </Container>
    );
};
