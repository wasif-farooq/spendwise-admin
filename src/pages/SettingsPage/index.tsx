import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { Shield, Palette, User, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

const SettingsPage = () => {
    const location = useLocation();

    const navItems = [
        { name: 'Profile', path: 'profile', icon: User, description: 'Manage your personal information' },
        { name: 'Preferences', path: 'preferences', icon: Palette, description: 'Theme, layout, and localization' },
        { name: 'Security', path: 'security', icon: Shield, description: '2FA and account security' },
    ];

    return (
        <div className="p-8 max-w-7xl mx-auto space-y-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
                <p className="text-gray-500 mt-1">Manage your account settings and preferences.</p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Sidebar Navigation */}
                <aside className="lg:col-span-4 space-y-4">
                    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                        <nav className="p-2">
                            {navItems.map((item) => {
                                const isActive = location.pathname.includes(item.path);
                                return (
                                    <NavLink
                                        key={item.name}
                                        to={item.path}
                                        className={`flex items-center justify-between p-4 rounded-2xl transition-all duration-200 group ${isActive
                                                ? 'bg-primary/5 text-primary ring-1 ring-primary/10'
                                                : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                                            }`}
                                    >
                                        <div className="flex items-center">
                                            <div className={`p-2 rounded-xl mr-4 transition-colors ${isActive ? 'bg-primary text-white' : 'bg-gray-100 text-gray-500 group-hover:bg-gray-200'
                                                }`}>
                                                <item.icon className="h-5 w-5" />
                                            </div>
                                            <div className="text-left">
                                                <p className={`text-sm font-bold ${isActive ? 'text-gray-900' : 'text-gray-600'}`}>
                                                    {item.name}
                                                </p>
                                                <p className="text-xs text-gray-400 mt-0.5">{item.description}</p>
                                            </div>
                                        </div>
                                        <ChevronRight className={`h-4 w-4 transition-transform ${isActive ? 'translate-x-1 opacity-100' : 'opacity-0'}`} />
                                    </NavLink>
                                );
                            })}
                        </nav>
                    </div>

                    {/* Help Card */}
                    <div className="bg-gradient-to-br from-primary to-blue-600 rounded-3xl p-6 text-white shadow-lg shadow-primary/20">
                        <h4 className="font-bold text-lg">Need help?</h4>
                        <p className="text-white/80 text-sm mt-2">Check our documentation or contact support for assistance.</p>
                        <button className="mt-4 w-full py-3 bg-white text-primary font-bold rounded-2xl hover:bg-white/90 transition-colors">
                            Go to Help Center
                        </button>
                    </div>
                </aside>

                {/* Content Area */}
                <div className="lg:col-span-8">
                    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 min-h-[600px]">
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SettingsPage;
