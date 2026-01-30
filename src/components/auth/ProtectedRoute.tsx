import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '@/store/hooks/useAuth';

interface ProtectedRouteProps {
    requiredRole?: string;
    redirectTo?: string;
}

export const ProtectedRoute = ({ requiredRole, redirectTo = '/login' }: ProtectedRouteProps) => {
    const { isAuthenticated, loading, user } = useAuth();
    const location = useLocation();

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

    // Redirect to login if not authenticated
    if (!isAuthenticated) {
        // Save the intended destination for post-login redirect
        return <Navigate to={redirectTo} state={{ from: location }} replace />;
    }

    // Check role-based access if required
    if (requiredRole && user?.role !== requiredRole) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">403</h1>
                    <p className="text-xl text-gray-600 mb-8">Access Denied</p>
                    <p className="text-gray-500">You don't have permission to access this page.</p>
                </div>
            </div>
        );
    }

    // Render the protected content
    return <Outlet />;
};
