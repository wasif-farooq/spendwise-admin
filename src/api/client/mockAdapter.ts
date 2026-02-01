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
                // Determine if it's a sub-resource request (e.g. /v1/users/123 containing /users)
                // We strictly look for the pattern followed by a slash OR end of string.
                // However, since 'includes' is loose, we must be careful.
                // A better approach with 'includes' is checking if it matches the ID pattern AFTER the pattern.

                // Let's find where the pattern matches
                const matchIndex = cleanUrl.indexOf(pattern);
                const suffix = cleanUrl.slice(matchIndex + pattern.length);

                // If suffix is empty, it's an exact match on this segment pattern, so return data.
                if (!suffix) return data;

                // If suffix starts with /, it might be an ID
                if (suffix.startsWith('/')) {
                    const remainingPath = suffix.slice(1);
                    const parts = remainingPath.split('/');

                    // If data is array and only one path segment remains (the ID), try to find it
                    if (Array.isArray(data) && parts.length === 1 && parts[0]) {
                        const id = parts[0];
                        const item = data.find((d: any) => String(d.id) === id);
                        if (item) return item;

                        // If we are looking for an ID but didn't find it in the array,
                        // we should NOT return the whole array, as that causes the UI crash.
                        // We return null implies 404 behavior which is correct.
                        return null;
                    }
                }

                // If we are here, it matches the pattern but didn't resolve as a specific sub-resource ID.
                // Return original data (legacy behavior), UNLESS it looked like an ID request against an array.
                // If suffix was /123 and data was array, we already returned null above.
                // So this fallback is for non-array data or other paths.
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
