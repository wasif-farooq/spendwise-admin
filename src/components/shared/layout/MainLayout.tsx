import { Outlet } from 'react-router-dom';
import { Navbar } from '@ui';
import { Footer } from '@ui';

export const MainLayout = () => {
    return (
        <div className="min-h-screen bg-background font-sans text-foreground flex flex-col">
            <Navbar />
            <main className="flex-grow pt-16">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};
