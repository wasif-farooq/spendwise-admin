import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useToggle } from '@/hooks/useToggle';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { Smartphone, MessageSquare, Mail } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import {
    verify2FAThunk,
    resend2FACodeThunk,
    selectAuthLoading,
    selectAvailableMethods,
    selectTempToken
} from '@/store/slices/authSlice';
import { twoFactorSchema, type TwoFactorInput } from '@/views/AuthView/schemas/authSchemas';

type AuthMethod = 'authenticator' | 'sms' | 'email';

export const useTwoFactorForm = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useAppDispatch();
    const isVerifying = useRef(false);

    // Get 2FA state from Redux
    const loading = useAppSelector(selectAuthLoading);
    const availableMethods = useAppSelector(selectAvailableMethods);
    const tempToken = useAppSelector(selectTempToken);

    // Also check location state as fallback
    const locationMethods = location.state?.availableMethods || [];
    const locationTempToken = location.state?.tempToken || '';

    const methods2FA = availableMethods.length > 0 ? availableMethods : locationMethods;
    const token = tempToken || locationTempToken;

    const resendDisabled = useToggle(false);
    const [backupCode, setBackupCode] = useState('');
    const [countdown, setCountdown] = useState(0);
    const [method, setMethod] = useState<AuthMethod>('authenticator');
    const useBackupCode = useToggle(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<TwoFactorInput>({
        resolver: zodResolver(twoFactorSchema),
    });

    useEffect(() => {
        // Only redirect if no token/methods AND not currently verifying
        if ((!token || methods2FA.length === 0) && !isVerifying.current) {
            navigate('/login', { replace: true });
        } else if (token && methods2FA.length > 0) {
            // Set first available method as default
            const firstMethod = methods2FA[0];
            setMethod(firstMethod.type as AuthMethod);
        }
    }, [token, methods2FA, navigate]);

    useEffect(() => {
        // Countdown timer for resend button
        if (countdown > 0) {
            const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
            return () => clearTimeout(timer);
        } else {
            resendDisabled.setFalse();
        }
    }, [countdown, resendDisabled]);

    const toggleBackupCode = () => {
        useBackupCode.toggle();
    };

    const onSubmit = async (data: TwoFactorInput) => {
        if (!token) return;

        isVerifying.current = true;

        const result = await dispatch(verify2FAThunk({
            code: data.code,
            method,
            tempToken: token,
            backupCode: useBackupCode.value,
        }));

        if (verify2FAThunk.fulfilled.match(result)) {
            const from = location.state?.from?.pathname || '/dashboard';
            navigate(from, { replace: true });
        } else if (verify2FAThunk.rejected.match(result)) {
            isVerifying.current = false;
            toast.error(result.payload as string || 'Invalid verification code');
        }
    };

    const handleResendCode = async () => {
        if (method === 'authenticator' || resendDisabled.value) return;

        resendDisabled.setTrue();
        const result = await dispatch(resend2FACodeThunk(method));

        if (resend2FACodeThunk.fulfilled.match(result)) {
            setCountdown(60);
        }
    };

    // Map available methods to UI
    const availableMethodsUI = methods2FA.map((m: any) => {
        if (m.type === 'authenticator') {
            return { id: 'authenticator' as AuthMethod, label: 'App', icon: Smartphone, description: 'Authenticator App' };
        } else if (m.type === 'sms') {
            return { id: 'sms' as AuthMethod, label: 'SMS', icon: MessageSquare, description: m.phoneNumber || 'SMS' };
        } else {
            return { id: 'email' as AuthMethod, label: 'Email', icon: Mail, description: m.email || 'Email' };
        }
    });

    return {
        register,
        handleSubmit,
        errors,
        loading,
        method,
        setMethod,
        useBackupCode: useBackupCode.value,
        toggleBackupCode,
        countdown,
        resendDisabled: resendDisabled.value,
        availableMethodsUI,
        onSubmit,
        handleResendCode,
        backupCode,
        setBackupCode
    };
};
