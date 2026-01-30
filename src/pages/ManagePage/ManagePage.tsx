import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { Users, CreditCard, LayoutDashboard, Shield } from 'lucide-react';
import { motion } from 'framer-motion';
import {
    Block,
    Flex,
    Heading,
    Text,
    Container
} from '@shared';

const ManagePage = () => {
    const location = useLocation();

    const menuItems = [
        { name: 'General', path: 'general', icon: LayoutDashboard, description: 'Organization & Account settings' },
        { name: 'Members', path: 'members', icon: Users, description: 'Manage team & permissions' },
        { name: 'Roles', path: 'roles', icon: Shield, description: 'Define custom permissions' },
        { name: 'Billing', path: 'billing', icon: CreditCard, description: 'Plans & Invoices' },
    ];

    return (
        <Container size="wide" className="py-8 space-y-8">
            <Flex as="header" direction="col" align="end" justify="between" gap={6} className="sm:flex-row">
                <Block
                    as={motion.div}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                >
                    <Heading as="h1" size="4xl" weight="black" className="tracking-tight">Manage</Heading>
                    <Text color="text-gray-500" weight="medium" className="mt-1">Configure your organization and team preferences.</Text>
                </Block>

                {/* Horizontal Tabs */}
                <Block as="nav" className="flex p-1.5 bg-gray-100/50 rounded-[2rem] border border-gray-200/50 backdrop-blur-sm">
                    {menuItems.map((item) => {
                        const isActive = location.pathname.includes(item.path);
                        return (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                className={`relative flex items-center px-6 py-3 rounded-[1.5rem] text-sm font-bold transition-all duration-300 ${isActive ? 'text-primary' : 'text-gray-500 hover:text-gray-900'
                                    }`}
                            >
                                {isActive && (
                                    <Block
                                        as={motion.div}
                                        layoutId="active-manage-tab"
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

            {/* Main Content Area */}
            <Block
                as={motion.div}
                key={location.pathname}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-[3.5rem] shadow-sm ring-1 ring-gray-900/5 p-6 sm:p-12 min-h-[700px] relative overflow-hidden"
            >
                {/* Subtle background decoration */}
                <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

                <div className="relative z-10">
                    <Outlet />
                </div>
            </Block>
        </Container>
    );
};

export default ManagePage;
