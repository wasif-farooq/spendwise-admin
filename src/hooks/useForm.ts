import { useState, useCallback, ChangeEvent } from 'react';

interface ValidationRules {
    [key: string]: (value: any) => string | undefined;
}

/**
 * Hook to manage form state and validation.
 * @param initialValues Initial form values
 * @param validationRules Optional validation rules map
 */
export function useForm<T extends object>(initialValues: T, validationRules: ValidationRules = {}) {
    const [values, setValues] = useState<T>(initialValues);
    const [errors, setErrors] = useState<Record<keyof T, string>>({} as Record<keyof T, string>);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = useCallback((e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        const checked = (e.target as HTMLInputElement).checked;

        const newValue = type === 'checkbox' ? checked : value;

        setValues((prev) => ({
            ...prev,
            [name]: newValue,
        }));

        // Clear error on change
        if (errors[name as keyof T]) {
            setErrors((prev) => {
                const newErrors = { ...prev };
                delete newErrors[name as keyof T];
                return newErrors;
            });
        }
    }, [errors]);

    // Manual setter for custom components (like Select)
    const setFieldValue = useCallback((name: keyof T, value: any) => {
        setValues((prev) => ({
            ...prev,
            [name]: value,
        }));

        if (errors[name]) {
            setErrors((prev) => {
                const newErrors = { ...prev };
                delete newErrors[name];
                return newErrors;
            });
        }
    }, [errors]);

    const validate = useCallback((): boolean => {
        const newErrors: any = {};
        let isValid = true;

        Object.keys(validationRules).forEach((key) => {
            const rule = validationRules[key];
            const value = values[key as keyof T];
            const error = rule(value);
            if (error) {
                newErrors[key] = error;
                isValid = false;
            }
        });

        setErrors(newErrors);
        return isValid;
    }, [values, validationRules]);

    const handleSubmit = useCallback((onSubmit: (values: T) => void | Promise<void>) => async (e?: React.FormEvent) => {
        if (e) e.preventDefault();

        if (validate()) {
            setIsSubmitting(true);
            try {
                await onSubmit(values);
            } finally {
                setIsSubmitting(false);
            }
        }
    }, [values, validate]);

    const reset = useCallback(() => {
        setValues(initialValues);
        setErrors({} as Record<keyof T, string>);
    }, [initialValues]);

    return {
        values,
        errors,
        isSubmitting,
        handleChange,
        setFieldValue,
        handleSubmit,
        reset,
        setValues // Exposed for complete overrides if needed
    };
}

export default useForm;
