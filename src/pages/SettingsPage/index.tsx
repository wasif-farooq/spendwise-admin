import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { Shield, Palette, User } from 'lucide-react';
import { motion } from 'framer-motion';

const SettingsPage = () => {
    const location = useLocation();

    const navItems = [
        { name: 'Profile', path: 'profile', icon: User },
        { name: 'Preferences', path: 'preferences', icon: Palette },
        { name: 'Security', path: 'security', icon: Shield },
    ];

    return (
        <div className="p-4 sm:p-8 max-w-[1600px] mx-auto space-y-8">
            <header className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                >
                    <h1 className="text-4xl font-black text-gray-900 tracking-tight">Settings</h1>
                    <p className="text-gray-500 mt-1 font-medium">Manage your account settings and preferences.</p>
                </motion.div>

                {/* Horizontal Tabs */}
                <nav className="flex p-1.5 bg-gray-100/50 rounded-[2rem] border border-gray-200/50 backdrop-blur-sm">
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
                                    <motion.div
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
                </nav>
            </header>

            {/* Content Area */}
            <motion.div
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
            </motion.div>

            {/* Help Section (Bottom) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-primary to-blue-600 rounded-[2.5rem] p-8 text-white shadow-xl shadow-primary/20 flex items-center justify-between group cursor-pointer overflow-hidden relative">
                    <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform duration-500">
                        <Shield className="h-32 w-32" />
                    </div>
                    <div className="relative z-10">
                        <h4 className="font-black text-2xl tracking-tight">Need help?</h4>
                        <p className="text-white/80 font-medium mt-1">Check our documentation or contact support.</p>
                        <button className="mt-6 px-8 py-3 bg-white text-primary font-bold rounded-2xl hover:bg-white/90 transition-all active:scale-95">
                            Go to Help Center
                        </button>
                    </div>
                </div>

                <div className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm flex items-center space-x-6 group cursor-pointer hover:shadow-md transition-all">
                    <div className="bg-primary/10 p-4 rounded-2xl group-hover:scale-110 transition-transform">
                        <User className="h-8 w-8 text-primary" />
                    </div>
                    <div>
                        <h4 className="font-bold text-gray-900">Community Forum</h4>
                        <p className="text-sm text-gray-500 font-medium mt-1">Connect with other users and share tips.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SettingsPage;
