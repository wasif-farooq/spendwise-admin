import { useNavigate, Outlet } from 'react-router-dom';
import { useEffect, type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { useAppSelector } from '@/store/redux';
import { selectUser, selectIsAuthenticated, selectIsInitialized } from '@/store/slices/authSlice';
import { Block, Flex, Text } from '@shared';
import { ShieldCheck } from 'lucide-react';

interface AuthLayoutProps {
    children?: ReactNode;
}

export const AuthLayout = ({ children }: AuthLayoutProps) => {
    const navigate = useNavigate();
    const user = useAppSelector(selectUser);
    const isAuthenticated = useAppSelector(selectIsAuthenticated);
    const isInitialized = useAppSelector(selectIsInitialized);

    useEffect(() => {
        if (isInitialized && isAuthenticated && user) {
            navigate('/dashboard');
        }
    }, [isInitialized, isAuthenticated, user, navigate]);

    return (
        <Block className="min-h-screen relative overflow-hidden bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            {/* Background Decorations */}
            <Block className="absolute inset-0 z-0">
                <Block className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 blur-[120px] rounded-full" />
                <Block className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full" />
                <Block className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
            </Block>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative z-10 sm:mx-auto sm:w-full sm:max-w-md"
            >
                <Flex direction="col" align="center" justify="center" className="mb-8">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.2 }}
                        className="bg-primary/20 p-4 rounded-3xl mb-4 border border-primary/30 backdrop-blur-xl"
                    >
                        <ShieldCheck className="w-12 h-12 text-primary" />
                    </motion.div>
                    <Text as="h2" className="text-4xl font-black text-white tracking-tight text-center">
                        SpendWise <span className="text-primary italic font-serif">Admin</span>
                    </Text>
                    <Text className="mt-2 text-center text-sm text-gray-400 font-medium tracking-wide uppercase">
                        Enterprise Command Center
                    </Text>
                </Flex>

                <Block className="bg-white/5 backdrop-blur-2xl py-8 px-4 shadow-2xl border border-white/10 sm:rounded-3xl sm:px-10">
                    {children || <Outlet />}
                </Block>

                <Text className="mt-10 text-center text-xs text-gray-500 font-medium">
                    &copy; 2026 SpaceWise Solutions. All rights reserved.
                </Text>
            </motion.div>
        </Block>
    );
};
