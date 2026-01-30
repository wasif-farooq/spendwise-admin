import type { AxiosRequestConfig, AxiosResponse } from 'axios';

class MockAdapter {
    private mockDataRegistry: Map<string, any> = new Map();
    private delay = 300; // Simulate network delay

    registerMockData(endpoint: string, data: any) {
        this.mockDataRegistry.set(endpoint, data);
    }

    async handleRequest(config: AxiosRequestConfig): Promise<AxiosResponse> {
        await this.simulateDelay();

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
                // For POST, you might want to return the created item
                responseData = { ...config.data, id: Date.now().toString() };
                break;
            case 'PUT':
            case 'PATCH':
                // For PUT/PATCH, return the updated item
                responseData = { ...mockData, ...config.data };
                break;
            case 'DELETE':
                // For DELETE, return success message
                responseData = { success: true, message: 'Deleted successfully' };
                break;
            default:
                // GET returns the mock data as-is
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
        // Match URL patterns to mock data
        for (const [pattern, data] of this.mockDataRegistry.entries()) {
            if (url.includes(pattern)) {
                return data;
            }
        }
        return null;
    }

    private simulateDelay(): Promise<void> {
        const randomDelay = this.delay + Math.random() * 200; // Add some randomness
        return new Promise((resolve) => setTimeout(resolve, randomDelay));
    }
}

export const mockAdapter = new MockAdapter();
