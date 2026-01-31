export type FeatureCategory = 'ui' | 'app' | 'subscription' | 'beta';

export interface FeatureFlag {
    id: string;
    name: string;
    description: string;
    defaultValue: boolean;
    category: FeatureCategory;
}

export const FEATURE_FLAGS: Record<string, FeatureFlag> = {
    // Interface Features
    darkMode: {
        id: 'darkMode',
        name: 'Dark Mode',
        description: 'Enable dark mode theme toggle',
        defaultValue: false,
        category: 'ui'
    },
    newSidebar: {
        id: 'newSidebar',
        name: 'New Sidebar',
        description: 'New expandable sidebar design',
        defaultValue: true,
        category: 'ui'
    },
    animations: {
        id: 'animations',
        name: 'UI Animations',
        description: 'Enable smooth transitions and animations',
        defaultValue: true,
        category: 'ui'
    },

    // Application Features
    aiAdvisor: {
        id: 'aiAdvisor',
        name: 'AI Financial Advisor',
        description: 'AI-powered financial insights and chat',
        defaultValue: true,
        category: 'app'
    },
    accounts: {
        id: 'accounts',
        name: 'Accounts Management',
        description: 'Manage bank accounts and wallets',
        defaultValue: true,
        category: 'app'
    },
    analytics: {
        id: 'analytics',
        name: 'Analytics Dashboard',
        description: 'Visual reports and spending analysis',
        defaultValue: true,
        category: 'app'
    },
    transactions: {
        id: 'transactions',
        name: 'Transaction Management',
        description: 'View and add transactions',
        defaultValue: true,
        category: 'app'
    },
    exchangeRates: {
        id: 'exchangeRates',
        name: 'Exchange Rates',
        description: 'Currency exchange rates feature',
        defaultValue: true,
        category: 'app'
    },
    settings: {
        id: 'settings',
        name: 'Settings',
        description: 'Application settings',
        defaultValue: true,
        category: 'app'
    },

    // Management Features
    teamManagement: {
        id: 'teamManagement',
        name: 'Team Management',
        description: 'Manage members and roles',
        defaultValue: true,
        category: 'app'
    },

    // Subscription Features (These might be overridden by actual plan limits, but global toggle exists)
    freeTierRestrictions: {
        id: 'freeTierRestrictions',
        name: 'Free Tier Limits',
        description: 'Enforce limits for free users',
        defaultValue: true,
        category: 'subscription'
    },

    // Beta Features
    newDashboard: {
        id: 'newDashboard',
        name: 'New Dashboard Layout',
        description: 'Experimental dashboard grid',
        defaultValue: false,
        category: 'beta'
    },
    buttonColorExperiment: {
        id: 'buttonColorExperiment',
        name: 'Button Color Experiment',
        description: 'A/B test for primary button colors',
        defaultValue: false,
        category: 'beta'
    },
    newOnboarding: {
        id: 'newOnboarding',
        name: 'New Onboarding Flow',
        description: 'Updated user onboarding experience',
        defaultValue: false,
        category: 'beta'
    }
};

export type FeatureFlagId = keyof typeof FEATURE_FLAGS;

export type FeatureFlagsResponse = Record<FeatureFlagId, boolean>;
