import type { ReactNode } from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

interface MainLayoutProps {
    children?: ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
    return (
        <div className="min-h-screen bg-background font-sans text-foreground flex flex-col">
            <Navbar />
            <main className="flex-grow pt-16">
                {children || <Outlet />}
            </main>
            <Footer />
        </div>
    );
};
