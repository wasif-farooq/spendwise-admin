import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    LayoutDashboard,
    Users,
    Building2,
    Wallet,
    Flag,
    Settings,
    LogOut,
    Menu,
    X,
    User,
    ShieldCheck,
    CreditCard,
    Ticket,
    Shield,
    Lock
} from 'lucide-react';
import { useLayout } from '@/context/LayoutContext';
import Button from '@/components/ui/Button';
import { Block, Flex, Text } from '@shared';
import { useAppSelector } from '@/store/redux';
import { useToggle } from '@/hooks/useToggle';
import { selectUser, selectIsInitialized } from '@/store/slices/authSlice';
import { useEffect } from 'react';

export const AdminLayout = () => {
    const { value: isSidebarOpen, toggle: toggleSidebar } = useToggle(true);
    const { layout } = useLayout();
    const navigate = useNavigate();
    const location = useLocation();
    const user = useAppSelector(selectUser);
    const isInitialized = useAppSelector(selectIsInitialized);

    useEffect(() => {
        if (isInitialized && (!user || (user.role !== 'admin' && user.role !== 'staff' && user.role !== 'SUPER_ADMIN'))) {
            navigate('/login');
        }
    }, [user, isInitialized, navigate]);

    const navGroups = [
        {
            title: 'Overview',
            items: [
                { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
            ]
        },
        {
            title: 'Management',
            items: [
                { name: 'Users', path: '/users', icon: Users },
                { name: 'Roles', path: '/roles', icon: ShieldCheck },
                { name: 'Members', path: '/members', icon: User },
                { name: 'Organizations', path: '/organizations', icon: Building2 },
                { name: 'Accounts', path: '/accounts', icon: Wallet },
            ]
        },
        {
            title: 'Staff',
            items: [
                { name: 'Staff', path: '/staff', icon: Shield },
                { name: 'Staff Roles', path: '/staff-roles', icon: Lock },
            ]
        },
        {
            title: 'Commerce',
            items: [
                { name: 'Transactions', path: '/transactions', icon: Wallet },
                { name: 'Subscriptions', path: '/subscriptions', icon: CreditCard },
                { name: 'Coupons', path: '/coupons', icon: Ticket },
            ]
        },
        {
            title: 'System',
            items: [
                { name: 'Feature Flags', path: '/feature-flags', icon: Flag },
                { name: 'Settings', path: '/settings', icon: Settings },
            ]
        }
    ];

    const handleLogout = () => {
        navigate('/login');
    };

    const Sidebar = () => (
        <motion.aside
            initial={false}
            animate={{ width: isSidebarOpen ? 256 : 80 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className={`bg-gray-900/95 backdrop-blur-xl text-white flex flex-col z-30 fixed inset-y-0 ${layout === 'sidebar-right' ? 'right-0 border-l' : 'left-0 border-r'
                } border-gray-800 shadow-2xl shadow-black/50`}
        >
            <Flex align="center" justify={isSidebarOpen ? 'between' : 'center'} className="p-6 h-16">
                <NavLink to="/dashboard" className="flex items-center group overflow-hidden">
                    <motion.div
                        layout
                        className="bg-primary/20 p-2 rounded-xl group-hover:scale-110 transition-transform shrink-0"
                    >
                        <ShieldCheck className="h-6 w-6 text-primary" />
                    </motion.div>
                    <AnimatePresence>
                        {isSidebarOpen && (
                            <motion.span
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -10 }}
                                className="ml-3 text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-400 truncate whitespace-nowrap"
                            >
                                Admin Central
                            </motion.span>
                        )}
                    </AnimatePresence>
                </NavLink>
            </Flex>

            <Block as="nav" className="flex-grow px-4 space-y-4 mt-4 overflow-y-auto custom-scrollbar pb-6">
                {navGroups.map((group, groupIndex) => (
                    <Block key={group.title} className="space-y-1">
                        {isSidebarOpen ? (
                            <Text className="text-xs font-bold text-gray-500 uppercase tracking-wider px-4 mb-2">
                                {group.title}
                            </Text>
                        ) : (
                            groupIndex > 0 && <div className="h-px bg-gray-800 mx-2 my-2" />
                        )}
                        {group.items.map((item) => (
                            <NavLink
                                key={item.name}
                                to={item.path}
                                className={({ isActive }) =>
                                    `flex items-center rounded-2xl transition-all duration-200 group relative ${isSidebarOpen ? 'px-4 py-3' : 'p-3 justify-center'
                                    } ${isActive
                                        ? 'bg-primary text-white shadow-lg shadow-primary/20'
                                        : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                                    }`
                                }
                            >
                                <item.icon className="h-5 w-5 flex-shrink-0 relative z-10" />
                                <AnimatePresence mode="popLayout">
                                    {isSidebarOpen && (
                                        <motion.span
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -10 }}
                                            className="ml-3 font-medium whitespace-nowrap relative z-10"
                                        >
                                            {item.name}
                                        </motion.span>
                                    )}
                                </AnimatePresence>
                                {!isSidebarOpen && (
                                    <Block className="absolute inset-0 bg-transparent group-hover:bg-gray-800 rounded-2xl transition-colors" />
                                )}
                            </NavLink>
                        ))}
                    </Block>
                ))}
            </Block>

            <Block className="p-4 border-t border-gray-800 bg-gray-900/50">
                <Button
                    variant="ghost"
                    onClick={handleLogout}
                    className={`w-full flex items-center text-gray-400 hover:bg-red-900/20 hover:text-red-400 rounded-2xl transition-all duration-200 group ${isSidebarOpen ? 'px-4 py-3' : 'p-3 justify-center'
                        }`}
                >
                    <LogOut className="h-5 w-5 flex-shrink-0" />
                    <AnimatePresence>
                        {isSidebarOpen && (
                            <motion.span
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -10 }}
                                className="ml-3 font-medium whitespace-nowrap"
                            >
                                Logout
                            </motion.span>
                        )}
                    </AnimatePresence>
                </Button>
            </Block>
        </motion.aside>
    );

    const Header = () => (
        <Block
            as="header"
            className="h-16 bg-white/80 backdrop-blur-xl border-b border-gray-200/50 flex items-center px-8 justify-between sticky top-0 z-20 shadow-sm"
        >
            <Flex align="center">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                        variant="ghost"
                        onClick={toggleSidebar}
                        className="p-2 hover:bg-gray-100 rounded-xl transition-colors text-gray-500 mr-4 h-auto"
                    >
                        {isSidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                    </Button>
                </motion.div>
                <Text className="font-bold text-gray-800 hidden sm:block tracking-tight">Administrative Control Panel</Text>
            </Flex>

            <Flex align="center" gap={4}>
                <Block className="text-right hidden sm:block">
                    <Text className="text-sm font-bold text-gray-900 leading-none mb-1">{user?.name || 'Admin User'}</Text>
                    <Text className="text-[10px] text-primary font-bold uppercase tracking-widest bg-primary/10 px-2 py-0.5 rounded-full inline-block">
                        {user?.role || 'ADMIN'}
                    </Text>
                </Block>
                <motion.div
                    whileHover={{ scale: 1.05, rotate: 5 }}
                    className="h-10 w-10 rounded-2xl bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center border-2 border-white shadow-md cursor-pointer"
                >
                    <User className="h-5 w-5 text-white" />
                </motion.div>
            </Flex>
        </Block>
    );

    return (
        <Block className="min-h-screen bg-[#fcfdfe] flex overflow-x-hidden">
            <Sidebar />

            {/* Mobile Overlay */}
            <AnimatePresence>
                {isSidebarOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={toggleSidebar}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-25 lg:hidden"
                    />
                )}
            </AnimatePresence>

            <motion.div
                initial={false}
                animate={{
                    paddingLeft: layout === 'sidebar-right' ? 0 : (isSidebarOpen ? 256 : 80),
                    paddingRight: layout === 'sidebar-right' ? (isSidebarOpen ? 256 : 80) : 0
                }}
                className="flex-grow flex flex-col min-w-0 min-h-screen transition-all duration-300 relative"
            >
                <Header />
                <Block as="main" className="flex-grow p-4 md:p-8 max-w-7xl mx-auto w-full">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={location.pathname}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                            className="h-full"
                        >
                            <Outlet />
                        </motion.div>
                    </AnimatePresence>
                </Block>
            </motion.div>
        </Block>
    );
};
