import type { AxiosError } from 'axios';

export interface ApiError {
    message: string;
    code?: string;
    status?: number;
    details?: any;
}

export const handleError = (error: AxiosError): ApiError => {
    if (error.response) {
        // Server responded with error status
        const { status, data } = error.response;

        return {
            message: (data as any)?.message || error.message || 'An error occurred',
            code: (data as any)?.code,
            status,
            details: data,
        };
    } else if (error.request) {
        // Request was made but no response received
        return {
            message: 'No response from server. Please check your connection.',
            code: 'NETWORK_ERROR',
        };
    } else {
        // Error in request configuration
        return {
            message: error.message || 'An unexpected error occurred',
            code: 'REQUEST_ERROR',
        };
    }
};

export const isApiError = (error: any): error is ApiError => {
    return error && typeof error.message === 'string';
};
