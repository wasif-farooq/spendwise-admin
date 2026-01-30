import type { ReactNode } from 'react';
import { Outlet } from 'react-router-dom';

interface AuthLayoutProps {
    children?: ReactNode;
}

export const AuthLayout = ({ children }: AuthLayoutProps) => {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <main className="flex-grow">
                {children || <Outlet />}
            </main>
        </div>
    );
};
