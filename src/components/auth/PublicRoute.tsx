import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/store/hooks/useAuth';

interface PublicRouteProps {
    redirectTo?: string;
}

export const PublicRoute = ({ redirectTo = '/dashboard' }: PublicRouteProps) => {
    const { isAuthenticated, loading } = useAuth();

    // Show loading state while checking authentication
    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading...</p>
                </div>
            </div>
        );
    }

    // Redirect to dashboard if already authenticated
    if (isAuthenticated) {
        return <Navigate to={redirectTo} replace />;
    }

    // Render the public content (login, register, etc.)
    return <Outlet />;
};
