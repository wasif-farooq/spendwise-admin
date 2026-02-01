import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { loginThunk, selectAuthLoading } from '@/store/slices/authSlice';
import { loginSchema, type LoginInput } from '@/views/AuthView/schemas/authSchemas';

export const useLoginForm = () => {
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
                    // Redirect to dashboard
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

    return {
        register,
        handleSubmit,
        errors,
        loading,
        onSubmit
    };
};
