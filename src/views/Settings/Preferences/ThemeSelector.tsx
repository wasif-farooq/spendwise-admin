import { Sun, Moon } from 'lucide-react';
import { Block, Text, Grid } from '@shared';
import { useLayout } from '@/context/LayoutContext';

export const ThemeSelector = () => {
    const { theme, setTheme } = useLayout();

    return (
        <Block className="space-y-4">
            <Text as="label" size="sm" weight="bold" color="text-gray-700" className="ml-1">Theme</Text>
            <Grid cols={2} gap={4}>
                <Block
                    as="button"
                    onClick={() => setTheme('light')}
                    className={`flex items-center justify-center p-4 rounded-2xl border-2 transition-all duration-200 ${theme === 'light'
                        ? 'border-primary bg-primary/5 text-primary ring-4 ring-primary/10'
                        : 'border-transparent bg-gray-50 text-gray-500 hover:bg-gray-100'
                        }`}
                >
                    <Sun className="h-5 w-5 mr-3" />
                    <Text weight="bold">Light</Text>
                </Block>
                <Block
                    as="button"
                    onClick={() => setTheme('dark')}
                    className={`flex items-center justify-center p-4 rounded-2xl border-2 transition-all duration-200 ${theme === 'dark'
                        ? 'border-primary bg-primary/5 text-primary ring-4 ring-primary/10'
                        : 'border-transparent bg-gray-50 text-gray-500 hover:bg-gray-100'
                        }`}
                >
                    <Moon className="h-5 w-5 mr-3" />
                    <Text weight="bold">Dark</Text>
                </Block>
            </Grid>
        </Block>
    );
};
