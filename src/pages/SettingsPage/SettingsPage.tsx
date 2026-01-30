import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { Shield, Palette, User, Receipt } from 'lucide-react';
import { motion } from 'framer-motion';
import {
    Block,
    Flex,
    Heading,
    Text,
    Container,
    Grid
} from '@shared';

const SettingsPage = () => {
    const location = useLocation();

    const navItems = [
        { name: 'Profile', path: 'profile', icon: User },
        { name: 'Preferences', path: 'preferences', icon: Palette },
        { name: 'Security', path: 'security', icon: Shield },
        { name: 'Subscription', path: 'subscription', icon: Receipt },
    ];

    return (
        <Container size="wide" className="py-8 space-y-8">
            <Flex as="header" direction="col" align="end" justify="between" gap={6} className="sm:flex-row">
                <Block
                    as={motion.div}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                >
                    <Heading as="h1" size="4xl" weight="black" className="tracking-tight">Settings</Heading>
                    <Text color="text-gray-500" weight="medium" className="mt-1">Manage your account settings and preferences.</Text>
                </Block>

                {/* Horizontal Tabs */}
                <Block as="nav" className="flex p-1.5 bg-gray-100/50 rounded-[2rem] border border-gray-200/50 backdrop-blur-sm">
                    {navItems.map((item) => {
                        const isActive = location.pathname.includes(item.path);
                        return (
                            <NavLink
                                key={item.name}
                                to={item.path}
                                className={`relative flex items-center px-6 py-3 rounded-[1.5rem] text-sm font-bold transition-all duration-300 ${isActive ? 'text-primary' : 'text-gray-500 hover:text-gray-900'
                                    }`}
                            >
                                {isActive && (
                                    <Block
                                        as={motion.div}
                                        layoutId="active-settings-tab"
                                        className="absolute inset-0 bg-white shadow-lg shadow-primary/5 rounded-[1.5rem] z-0"
                                        transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                                <item.icon className={`h-4 w-4 mr-2 relative z-10 transition-transform duration-300 ${isActive ? 'scale-110' : ''}`} />
                                <span className="relative z-10">{item.name}</span>
                            </NavLink>
                        );
                    })}
                </Block>
            </Flex>

            {/* Content Area */}
            <Block
                as={motion.div}
                key={location.pathname}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-[3.5rem] border border-gray-100 shadow-sm p-6 sm:p-12 min-h-[600px] relative overflow-hidden"
            >
                {/* Subtle background decoration */}
                <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

                <div className="relative z-10">
                    <Outlet />
                </div>
            </Block>

            {/* Help Section (Bottom) */}
            <Grid cols={1} gap={6} className="sm:grid-cols-2">
                <Flex align="center" justify="between" className="bg-gradient-to-br from-primary to-blue-600 rounded-[2.5rem] p-8 text-white shadow-xl shadow-primary/20 group cursor-pointer overflow-hidden relative">
                    <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform duration-500">
                        <Shield className="h-32 w-32" />
                    </div>
                    <Block className="relative z-10">
                        <Heading as="h4" size="2xl" weight="black" className="tracking-tight">Need help?</Heading>
                        <Text color="text-white/80" weight="medium" className="mt-1">Check our documentation or contact support.</Text>
                        <button className="mt-6 px-8 py-3 bg-white text-primary font-bold rounded-2xl hover:bg-white/90 transition-all active:scale-95">
                            Go to Help Center
                        </button>
                    </Block>
                </Flex>

                <Flex align="center" gap={6} className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm group cursor-pointer hover:shadow-md transition-all">
                    <Block className="bg-primary/10 p-4 rounded-2xl group-hover:scale-110 transition-transform">
                        <User className="h-8 w-8 text-primary" />
                    </Block>
                    <Block>
                        <Heading as="h4" weight="bold" color="text-gray-900">Community Forum</Heading>
                        <Text size="sm" color="text-gray-500" weight="medium" className="mt-1">Connect with other users and share tips.</Text>
                    </Block>
                </Flex>
            </Grid>
        </Container>
    );
};

export default SettingsPage;
