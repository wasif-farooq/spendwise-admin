import { Outlet } from 'react-router-dom';
import { Navbar } from '@ui';
import { Footer } from '@ui';

import { Block } from '@shared';

export const MainLayout = () => {
    return (
        <Block className="min-h-screen bg-background font-sans text-foreground flex flex-col">
            <Navbar />
            <Block as="main" className="flex-grow pt-16">
                <Outlet />
            </Block>
            <Footer />
        </Block>
    );
};
