import React, { createContext, useContext, useState, useEffect } from 'react';

type LayoutType = 'sidebar-left' | 'sidebar-right' | 'top-nav' | 'minimal';
type ColorScheme = 'blue' | 'purple' | 'green' | 'orange' | 'rose';
type Theme = 'light' | 'dark';

interface LayoutContextType {
    layout: LayoutType;
    setLayout: (layout: LayoutType) => void;
    colorScheme: ColorScheme;
    setColorScheme: (scheme: ColorScheme) => void;
    theme: Theme;
    setTheme: (theme: Theme) => void;
}

const LayoutContext = createContext<LayoutContextType | undefined>(undefined);

export const LayoutProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [layout, setLayoutState] = useState<LayoutType>(
        (localStorage.getItem('layout') as LayoutType) || 'sidebar-left'
    );
    const [colorScheme, setColorSchemeState] = useState<ColorScheme>(
        (localStorage.getItem('colorScheme') as ColorScheme) || 'blue'
    );
    const [theme, setThemeState] = useState<Theme>(
        (localStorage.getItem('theme') as Theme) || 'light'
    );

    const setLayout = (l: LayoutType) => {
        setLayoutState(l);
        localStorage.setItem('layout', l);
    };

    const setColorScheme = (s: ColorScheme) => {
        setColorSchemeState(s);
        localStorage.setItem('colorScheme', s);
        // Update CSS variable for primary color
        const colors: Record<ColorScheme, string> = {
            blue: '#2563eb',
            purple: '#9333ea',
            green: '#16a34a',
            orange: '#ea580c',
            rose: '#e11d48',
        };
        document.documentElement.style.setProperty('--color-primary', colors[s]);
    };

    const setTheme = (t: Theme) => {
        setThemeState(t);
        localStorage.setItem('theme', t);
        if (t === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    };

    // Initialize on mount
    useEffect(() => {
        setColorScheme(colorScheme);
        setTheme(theme);
    }, []);

    return (
        <LayoutContext.Provider value={{ layout, setLayout, colorScheme, setColorScheme, theme, setTheme }}>
            {children}
        </LayoutContext.Provider>
    );
};

export const useLayout = () => {
    const context = useContext(LayoutContext);
    if (context === undefined) {
        throw new Error('useLayout must be used within a LayoutProvider');
    }
    return context;
};
