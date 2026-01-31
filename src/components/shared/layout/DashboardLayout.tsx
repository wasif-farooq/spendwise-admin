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
    Plus,
    PieChart,
    Sparkles
} from 'lucide-react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useLayout } from '@/context/LayoutContext';
import OrgSwitcher from '@/components/features/organizations/OrgSwitcher';
import Button from '@/components/ui/Button';
import TransactionModal from '@/components/features/transactions/TransactionModal';
import { Block, Flex, Text } from '@shared';
import type { RootState } from '@/store/store';
import { UpgradeButton, PlanBadge, UpgradeModal } from '@/views/Subscription';
import { useAppDispatch, useAppSelector } from '@/store/redux';
import { useFeatureFlag } from '@/hooks/useFeatureFlags';
import {
    selectHasAIAdvisorAccess,
    selectHasExchangeRatesAccess,
    fetchSubscriptionThunk,
    fetchFeatureUsageThunk,
    selectSubscriptionPlan
} from '@/store/slices/subscriptionSlice';
import { useEffect } from 'react';

export const DashboardLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isTransactionModalOpen, setIsTransactionModalOpen] = useState(false);
    const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);
    const { layout } = useLayout();
    const navigate = useNavigate();
    const accountType = useSelector((state: RootState) => state.ui.accountType);
    const hasAIAdvisor = useAppSelector(selectHasAIAdvisorAccess);
    const hasExchangeRates = useAppSelector(selectHasExchangeRatesAccess);
    const currentPlan = useAppSelector(selectSubscriptionPlan);
    const dispatch = useAppDispatch();

    // Feature Flags
    const isAIAdvisorEnabled = useFeatureFlag('aiAdvisor');
    const isAccountsEnabled = useFeatureFlag('accounts');
    const isAnalyticsEnabled = useFeatureFlag('analytics');
    const isExchangeRatesFlagEnabled = useFeatureFlag('exchangeRates');
    const isSettingsEnabled = useFeatureFlag('settings');
    const isTeamManagementEnabled = useFeatureFlag('teamManagement');
    const isTransactionsEnabled = useFeatureFlag('transactions');

    useEffect(() => {
        // Fetch subscription data on layout mount
        dispatch(fetchSubscriptionThunk());
        dispatch(fetchFeatureUsageThunk());
    }, [dispatch]);

    const navItems = [
        { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
        ...(isAnalyticsEnabled ? [{ name: 'Analytics', path: '/analytics', icon: PieChart }] : []),
        ...(isAIAdvisorEnabled ? [{ name: 'AI Advisor', path: '/ai-advisor', icon: Sparkles }] : []),
        ...(isAccountsEnabled ? [{ name: 'Accounts', path: '/accounts', icon: Wallet }] : []),
        ...(hasExchangeRates && isExchangeRatesFlagEnabled ? [
            { name: 'Exchange Rates', path: '/exchange-rates', icon: Globe },
        ] : []),

        // Manage Section - Only show if Team Management is enabled
        ...(isTeamManagementEnabled ? [
            { name: 'Manage', path: '/manage/general', icon: LayoutDashboard },
            ...(accountType === 'organization' ? [
                { name: 'Members', path: '/manage/members', icon: User },
                { name: 'Roles', path: '/manage/roles', icon: Settings },
            ] : []),
        ] : []),

        ...(isSettingsEnabled ? [{ name: 'Settings', path: '/settings/preferences', icon: Settings }] : []),
    ];

    const handleLogout = () => {
        navigate('/login');
    };

    const Sidebar = () => (
        <Block
            as="aside"
            className={`${isSidebarOpen ? 'w-64' : 'w-20'
                } bg-white border-gray-200 transition-all duration-300 flex flex-col z-30 ${layout === 'sidebar-right' ? 'border-l' : 'border-r'
                }`}
        >
            <Flex align="center" justify="between" className="p-6">
                <NavLink to="/dashboard" className="flex items-center group">
                    <Block className="bg-primary/10 p-2 rounded-xl group-hover:scale-110 transition-transform">
                        <CreditCard className="h-6 w-6 text-primary" />
                    </Block>
                    {isSidebarOpen && (
                        <span className="ml-3 text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600 truncate">
                            SpendWise
                        </span>
                    )}
                </NavLink>
            </Flex>

            <Block className="px-4 mb-4">
                <OrgSwitcher isCollapsed={!isSidebarOpen} />
            </Block>

            <Block as="nav" className="flex-grow px-4 space-y-2">
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
            </Block>

            <Block className="p-4 border-t border-gray-100">
                <Button
                    variant="ghost"
                    onClick={handleLogout}
                    className="w-full flex items-center px-4 py-3 text-gray-500 hover:bg-red-50 hover:text-red-600 rounded-2xl transition-all duration-200 group"
                >
                    <LogOut className={`h-5 w-5 flex-shrink-0 ${isSidebarOpen ? 'mr-3' : 'mx-auto'}`} />
                    {isSidebarOpen && <span className="font-medium">Logout</span>}
                </Button>
            </Block>
        </Block>
    );

    const Header = () => (
        <Block as="header" className="h-16 bg-white border-b border-gray-200 flex items-center px-8 justify-between sticky top-0 z-20">
            <Flex align="center">
                {layout !== 'top-nav' && layout !== 'minimal' && (
                    <Button
                        variant="ghost"
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-500 mr-4 h-auto"
                    >
                        {isSidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                    </Button>
                )}

                {(layout === 'top-nav' || layout === 'minimal') && (
                    <Flex align="center" className="mr-8">
                        <NavLink to="/dashboard" className="flex items-center group mr-6">
                            <Block className="bg-primary/10 p-2 rounded-xl group-hover:scale-110 transition-transform">
                                <CreditCard className="h-6 w-6 text-primary" />
                            </Block>
                            <span className="ml-3 text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600 truncate">
                                SpendWise
                            </span>
                        </NavLink>
                        <Block className="w-48">
                            <OrgSwitcher />
                        </Block>
                    </Flex>
                )}

                {layout === 'top-nav' && (
                    <Block as="nav" className="flex items-center space-x-2">
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
                    </Block>
                )}
            </Flex>

            <Flex align="center" gap={6}>
                {/* Upgrade Button - Only show for free plan */}
                {currentPlan === 'free' && (
                    <UpgradeButton
                        size="sm"
                        className="hidden md:flex"
                        onClick={() => setIsUpgradeModalOpen(true)}
                    />
                )}

                {/* New Transaction Button */}
                {isTransactionsEnabled && (
                    <Button
                        size="sm"
                        onClick={() => setIsTransactionModalOpen(true)}
                        className="hidden md:flex items-center gap-2 rounded-xl px-4 py-2 shadow-lg shadow-primary/10"
                    >
                        <Plus size={18} />
                        <span>New Transaction</span>
                    </Button>
                )}

                <Flex align="center" gap={4}>
                    <Block className="text-right hidden sm:block">
                        <Text className="text-sm font-bold text-gray-900">John Doe</Text>
                        <Flex align="center" gap={2} className="justify-end">
                            <Text className="text-xs text-gray-500">Premium Member</Text>
                            <PlanBadge plan={useAppSelector((state: RootState) => state.subscription.currentSubscription?.plan || 'free')} />
                        </Flex>
                    </Block>
                    <Block className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20">
                        <User className="h-5 w-5 text-primary" />
                    </Block>
                    {layout === 'minimal' && (
                        <Button variant="ghost" onClick={handleLogout} className="p-2 text-gray-400 hover:text-red-600 transition-colors">
                            <LogOut className="h-5 w-5" />
                        </Button>
                    )}
                </Flex>
            </Flex>
        </Block>
    );

    return (
        <Block className={`min-h-screen bg-gray-50 flex ${layout === 'sidebar-right' ? 'flex-row-reverse' : 'flex-row'}`}>
            {layout !== 'top-nav' && layout !== 'minimal' && <Sidebar />}

            <Block className="flex-grow flex flex-col min-w-0">
                <Header />
                <Block as="main" className="flex-grow overflow-auto">
                    <Outlet />
                </Block>
            </Block>

            {/* Transaction Modal */}
            <TransactionModal
                isOpen={isTransactionModalOpen}
                onClose={() => setIsTransactionModalOpen(false)}
            />

            {/* Upgrade Modal */}
            <UpgradeModal
                isOpen={isUpgradeModalOpen}
                onClose={() => setIsUpgradeModalOpen(false)}
            />
        </Block>
    );
};
