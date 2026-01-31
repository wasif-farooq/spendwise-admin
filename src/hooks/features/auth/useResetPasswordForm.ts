import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { resetPasswordSchema, type ResetPasswordInput } from '@/views/AuthView/schemas/authSchemas';

export const useResetPasswordForm = () => {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<ResetPasswordInput>({
        resolver: zodResolver(resetPasswordSchema),
    });

    const onSubmit = (data: ResetPasswordInput) => {
        console.log('Reset password data:', data);
        // Trigger password update API here
        navigate('/login');
    };

    return {
        register,
        handleSubmit,
        errors,
        isSubmitting,
        onSubmit
    };
};
