import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { forgotPasswordSchema, type ForgotPasswordInput } from '@/views/AuthView/schemas/authSchemas';

export const useForgotPasswordForm = () => {
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

    return {
        register,
        handleSubmit,
        errors,
        onSubmit
    };
};
