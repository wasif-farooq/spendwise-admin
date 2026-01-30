import type { ReactNode } from 'react';
import { Outlet } from 'react-router-dom';

interface AuthLayoutProps {
    children?: ReactNode;
}

import { Block } from '@shared';

export const AuthLayout = ({ children }: AuthLayoutProps) => {
    return (
        <Block className="min-h-screen bg-gray-50 flex flex-col">
            <Block as="main" className="flex-grow">
                {children || <Outlet />}
            </Block>
        </Block>
    );
};
