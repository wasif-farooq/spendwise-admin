import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema, type RegisterInput } from '@/views/AuthView/schemas/authSchemas';

export const useRegisterForm = () => {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<RegisterInput>({
        resolver: zodResolver(registerSchema),
    });

    const onSubmit = (data: RegisterInput) => {
        console.log('Register data:', data);
        // Handle registration logic here
        // In a real app, this would dispatch a Redux thunk similar to login
        navigate('/confirm-email');
    };

    return {
        register,
        handleSubmit,
        errors,
        isSubmitting,
        onSubmit
    };
};
