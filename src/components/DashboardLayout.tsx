import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import {
    LayoutDashboard,
    Settings,
    LogOut,
    CreditCard,
    Menu,
    X,
    User,
    Globe,
    Wallet,
    Plus
} from 'lucide-react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useLayout } from '../context/LayoutContext';
import { OrgSwitcher } from './OrgSwitcher';
import { Button } from './Button';
import { TransactionModal } from './TransactionModal';
import type { RootState } from '../store/store';

export const DashboardLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isTransactionModalOpen, setIsTransactionModalOpen] = useState(false);
    const { layout } = useLayout();
    const navigate = useNavigate();
    const accountType = useSelector((state: RootState) => state.ui.accountType);

    const navItems = [
        { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
        { name: 'Accounts', path: '/accounts', icon: Wallet },
        { name: 'Exchange Rates', path: '/exchange-rates', icon: Globe },
        { name: 'Manage', path: '/manage/general', icon: LayoutDashboard },
        ...(accountType === 'organization' ? [
            { name: 'Members', path: '/manage/members', icon: User },
            { name: 'Roles', path: '/manage/roles', icon: Settings },
        ] : []),
        { name: 'Settings', path: '/settings/preferences', icon: Settings },
    ];

    const handleLogout = () => {
        navigate('/login');
    };

    const Sidebar = () => (
        <aside
            className={`${isSidebarOpen ? 'w-64' : 'w-20'
                } bg-white border-gray-200 transition-all duration-300 flex flex-col z-30 ${layout === 'sidebar-right' ? 'border-l' : 'border-r'
                }`}
        >
            <div className="p-6 flex items-center justify-between">
                <NavLink to="/dashboard" className="flex items-center group">
                    <div className="bg-primary/10 p-2 rounded-xl group-hover:scale-110 transition-transform">
                        <CreditCard className="h-6 w-6 text-primary" />
                    </div>
                    {isSidebarOpen && (
                        <span className="ml-3 text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600 truncate">
                            ExpenseFlow
                        </span>
                    )}
                </NavLink>
            </div>

            <div className="px-4 mb-4">
                <OrgSwitcher isCollapsed={!isSidebarOpen} />
            </div>

            <nav className="flex-grow px-4 space-y-2">
                {navItems.map((item) => (
                    <NavLink
                        key={item.name}
                        to={item.path}
                        className={({ isActive }) =>
                            `flex items-center px-4 py-3 rounded-2xl transition-all duration-200 group ${isActive
                                ? 'bg-primary text-white shadow-lg shadow-primary/20'
                                : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                            }`
                        }
                    >
                        <item.icon className={`h-5 w-5 flex-shrink-0 ${isSidebarOpen ? 'mr-3' : 'mx-auto'}`} />
                        {isSidebarOpen && <span className="font-medium">{item.name}</span>}
                    </NavLink>
                ))}
            </nav>

            <div className="p-4 border-t border-gray-100">
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center px-4 py-3 text-gray-500 hover:bg-red-50 hover:text-red-600 rounded-2xl transition-all duration-200 group"
                >
                    <LogOut className={`h-5 w-5 flex-shrink-0 ${isSidebarOpen ? 'mr-3' : 'mx-auto'}`} />
                    {isSidebarOpen && <span className="font-medium">Logout</span>}
                </button>
            </div>
        </aside>
    );

    const Header = () => (
        <header className="h-16 bg-white border-b border-gray-200 flex items-center px-8 justify-between sticky top-0 z-20">
            <div className="flex items-center">
                {layout !== 'top-nav' && layout !== 'minimal' && (
                    <button
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-500 mr-4"
                    >
                        {isSidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                    </button>
                )}

                {(layout === 'top-nav' || layout === 'minimal') && (
                    <div className="flex items-center mr-8">
                        <NavLink to="/dashboard" className="flex items-center group mr-6">
                            <div className="bg-primary/10 p-2 rounded-xl group-hover:scale-110 transition-transform">
                                <CreditCard className="h-6 w-6 text-primary" />
                            </div>
                            <span className="ml-3 text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600 truncate">
                                ExpenseFlow
                            </span>
                        </NavLink>
                        <div className="w-48">
                            <OrgSwitcher />
                        </div>
                    </div>
                )}

                {layout === 'top-nav' && (
                    <nav className="flex items-center space-x-2">
                        {navItems.map((item) => (
                            <NavLink
                                key={item.name}
                                to={item.path}
                                className={({ isActive }) =>
                                    `flex items-center px-4 py-2 rounded-xl transition-all duration-200 ${isActive
                                        ? 'bg-primary/10 text-primary font-bold'
                                        : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                                    }`
                                }
                            >
                                <item.icon className="h-4 w-4 mr-2" />
                                <span>{item.name}</span>
                            </NavLink>
                        ))}
                    </nav>
                )}
            </div>

            <div className="flex items-center space-x-6">
                <Button
                    size="sm"
                    onClick={() => setIsTransactionModalOpen(true)}
                    className="hidden md:flex items-center gap-2 rounded-xl px-4 py-2 shadow-lg shadow-primary/10"
                >
                    <Plus size={18} />
                    <span>New Transaction</span>
                </Button>

                <div className="flex items-center space-x-4">
                    <div className="text-right hidden sm:block">
                        <p className="text-sm font-bold text-gray-900">John Doe</p>
                        <p className="text-xs text-gray-500">Premium Member</p>
                    </div>
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20">
                        <User className="h-5 w-5 text-primary" />
                    </div>
                    {layout === 'minimal' && (
                        <button onClick={handleLogout} className="p-2 text-gray-400 hover:text-red-600 transition-colors">
                            <LogOut className="h-5 w-5" />
                        </button>
                    )}
                </div>
            </div>
        </header>
    );

    return (
        <div className={`min-h-screen bg-gray-50 flex ${layout === 'sidebar-right' ? 'flex-row-reverse' : 'flex-row'}`}>
            {layout !== 'top-nav' && layout !== 'minimal' && <Sidebar />}

            <div className="flex-grow flex flex-col min-w-0">
                <Header />
                <main className="flex-grow overflow-auto">
                    <Outlet />
                </main>
            </div>

            <TransactionModal
                isOpen={isTransactionModalOpen}
                onClose={() => setIsTransactionModalOpen(false)}
            />
        </div>
    );
};
