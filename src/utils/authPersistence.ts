import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
    exp: number;
    iat: number;
    [key: string]: any;
}

const AUTH_TOKEN_KEY = 'authToken';
const REFRESH_TOKEN_KEY = 'refreshToken';
const USER_KEY = 'user';

export const authPersistence = {
    // Save auth state
    saveAuthState(accessToken: string, refreshToken?: string, user?: any) {
        try {
            localStorage.setItem(AUTH_TOKEN_KEY, accessToken);
            if (refreshToken) {
                localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
            }
            if (user) {
                localStorage.setItem(USER_KEY, JSON.stringify(user));
            }
        } catch (error) {
            console.error('Failed to save auth state:', error);
        }
    },

    // Load auth state
    loadAuthState() {
        try {
            const accessToken = localStorage.getItem(AUTH_TOKEN_KEY);
            const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
            const userStr = localStorage.getItem(USER_KEY);
            const user = userStr ? JSON.parse(userStr) : null;

            return {
                accessToken,
                refreshToken,
                user,
            };
        } catch (error) {
            console.error('Failed to load auth state:', error);
            return {
                accessToken: null,
                refreshToken: null,
                user: null,
            };
        }
    },

    // Clear auth state
    clearAuthState() {
        try {
            localStorage.removeItem(AUTH_TOKEN_KEY);
            localStorage.removeItem(REFRESH_TOKEN_KEY);
            localStorage.removeItem(USER_KEY);
        } catch (error) {
            console.error('Failed to clear auth state:', error);
        }
    },

    // Get access token
    getAccessToken(): string | null {
        return localStorage.getItem(AUTH_TOKEN_KEY);
    },

    // Get refresh token
    getRefreshToken(): string | null {
        return localStorage.getItem(REFRESH_TOKEN_KEY);
    },

    // Check if token is expired
    isTokenExpired(token: string): boolean {
        try {
            const decoded = jwtDecode<DecodedToken>(token);
            const currentTime = Date.now() / 1000;
            return decoded.exp < currentTime;
        } catch (error) {
            // If we can't decode the token, consider it expired
            return true;
        }
    },

    // Get token expiration time
    getTokenExpiration(token: string): number | null {
        try {
            const decoded = jwtDecode<DecodedToken>(token);
            return decoded.exp * 1000; // Convert to milliseconds
        } catch (error) {
            return null;
        }
    },

    // Check if token will expire soon (within 5 minutes)
    willExpireSoon(token: string, thresholdMinutes: number = 5): boolean {
        try {
            const decoded = jwtDecode<DecodedToken>(token);
            const currentTime = Date.now() / 1000;
            const threshold = thresholdMinutes * 60;
            return decoded.exp - currentTime < threshold;
        } catch (error) {
            return true;
        }
    },
};
