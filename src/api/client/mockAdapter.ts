import type { AxiosRequestConfig, AxiosResponse } from 'axios';

class MockAdapter {
    private mockDataRegistry: Map<string, any> = new Map();
    private delay = 300; // Simulate network delay

    registerMockData(endpoint: string, data: any) {
        this.mockDataRegistry.set(endpoint, data);
    }

    async handleRequest(config: AxiosRequestConfig): Promise<AxiosResponse> {
        await this.simulateDelay();

        // Check registry for static data
        const mockData = this.findMockData(config.url || '');

        if (!mockData) {
            console.warn(`⚠️ No mock data found for ${config.url}`);
            throw new Error(`No mock data registered for endpoint: ${config.url}`);
        }

        // Handle different HTTP methods
        const method = config.method?.toUpperCase() || 'GET';
        let responseData = mockData;

        switch (method) {
            case 'POST':
                responseData = (mockData && typeof mockData === 'object') ? mockData : { ...config.data, id: `new-${Date.now()}` };
                break;
            case 'PUT':
            case 'PATCH':
                responseData = { ...mockData, ...config.data };
                break;
            case 'DELETE':
                responseData = { success: true, message: 'Deleted successfully' };
                break;
            default:
                responseData = mockData;
        }

        return {
            data: responseData,
            status: 200,
            statusText: 'OK',
            headers: {},
            config: config as any,
        };
    }

    private findMockData(url: string): any {
        // Strip out base URL if present to match keys in registry
        const cleanUrl = url.replace(/^(?:https?:\/\/[^/]+)?(?:\/api)?/, '');

        // Exact match
        if (this.mockDataRegistry.has(cleanUrl)) {
            return this.mockDataRegistry.get(cleanUrl);
        }

        // Pattern match
        for (const [pattern, data] of this.mockDataRegistry.entries()) {
            if (cleanUrl.includes(pattern)) {
                return data;
            }
        }
        return null;
    }

    private simulateDelay(): Promise<void> {
        const randomDelay = this.delay + Math.random() * 200;
        return new Promise((resolve) => setTimeout(resolve, randomDelay));
    }
}

export const mockAdapter = new MockAdapter();
