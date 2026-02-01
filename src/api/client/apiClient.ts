import axios from 'axios';
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { mockAdapter } from './mockAdapter';
import { handleError } from './errorHandler';

class ApiClient {
    private client: AxiosInstance;
    public mockMode: boolean;

    constructor() {
        const rawBaseURL = import.meta.env.VITE_API_URL || '/api';
        // Add /admin prefix to separate from user APIs
        const baseURL = rawBaseURL.endsWith('/')
            ? `${rawBaseURL}admin`
            : `${rawBaseURL}/admin`;

        this.mockMode = import.meta.env.VITE_MOCK_MODE === 'true';

        this.client = axios.create({
            baseURL,
            timeout: 10000,
            headers: {
                'Content-Type': 'application/json',
            },
        });

        this.setupInterceptors();
    }

    private setupInterceptors() {
        // Request interceptor
        this.client.interceptors.request.use(
            (config) => {
                // Add auth token if available
                const token = localStorage.getItem('authToken');
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }

                if (this.mockMode && import.meta.env.DEV) {
                    console.warn('🔶 Mock Mode: Request intercepted', config.url);
                }

                return config;
            },
            (error) => Promise.reject(error)
        );

        // Response interceptor
        this.client.interceptors.response.use(
            (response) => response,
            async (error) => {
                // If real API fails and mock mode is enabled, fallback to mock
                if (this.mockMode && error.response?.status >= 500) {
                    return mockAdapter.handleRequest(error.config);
                }
                return Promise.reject(handleError(error));
            }
        );
    }

    async get<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        if (this.mockMode) {
            return mockAdapter.handleRequest({ ...config, url: this.getFullUrl(url), method: 'GET' });
        }
        return this.client.get<T>(url, config);
    }

    async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        if (this.mockMode) {
            return mockAdapter.handleRequest({ ...config, url: this.getFullUrl(url), method: 'POST', data });
        }
        return this.client.post<T>(url, data, config);
    }

    async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        if (this.mockMode) {
            return mockAdapter.handleRequest({ ...config, url: this.getFullUrl(url), method: 'PUT', data });
        }
        return this.client.put<T>(url, data, config);
    }

    async patch<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        if (this.mockMode) {
            return mockAdapter.handleRequest({ ...config, url: this.getFullUrl(url), method: 'PATCH', data });
        }
        return this.client.patch<T>(url, data, config);
    }

    async delete<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        if (this.mockMode) {
            return mockAdapter.handleRequest({ ...config, url: this.getFullUrl(url), method: 'DELETE' });
        }
        return this.client.delete<T>(url, config);
    }

    private getFullUrl(url: string): string {
        const baseURL = this.client.defaults.baseURL || '';
        if (url.startsWith('http')) return url;
        const cleanBase = baseURL.endsWith('/') ? baseURL.slice(0, -1) : baseURL;
        const cleanUrl = url.startsWith('/') ? url : `/${url}`;
        return `${cleanBase}${cleanUrl}`;
    }
}

export const apiClient = new ApiClient();
