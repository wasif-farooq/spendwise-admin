export interface ColorScheme {
    id: string;
    name: string;
    class: string;
}

export interface LayoutOption {
    id: string;
    label: string;
    iconName: string;
    description: string;
}

export interface CurrencyOption {
    value: string;
    label: string;
    iconName: string;
}

export interface TimezoneOption {
    value: string;
    label: string;
    iconName: string;
}

export interface PreferencesData {
    colorSchemes: ColorScheme[];
    layoutOptions: LayoutOption[];
    currencyOptions: CurrencyOption[];
    timezoneOptions: TimezoneOption[];
}

export interface UserPreferences {
    theme: 'light' | 'dark' | 'system';
    colorScheme: string;
    layout: string;
    currency: string;
    timezone: string;
    language: string;
    notifications: {
        email: boolean;
        push: boolean;
        sms: boolean;
    };
}

export interface PreferencesState {
    options: PreferencesData | null;
    userPreferences: UserPreferences;
    loading: boolean;
    error: string | null;
}
