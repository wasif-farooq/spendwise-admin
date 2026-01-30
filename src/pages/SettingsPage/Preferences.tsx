import { motion } from 'framer-motion';
import { Sun, Moon, Globe, DollarSign, Palette as PaletteIcon, PanelLeft, PanelRight, LayoutTemplate, Square } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { CustomSelect } from '@ui';
import { useLayout } from '../../context/LayoutContext';
import {
    Block,
    Flex,
    Heading,
    Text,
    Grid
} from '@shared';
import { Button } from '@ui';
import mockData from '@/data/mockData.json';

const iconMap: Record<string, LucideIcon> = {
    PanelLeft,
    PanelRight,
    LayoutTemplate,
    Square,
    DollarSign,
    Globe
};

const Preferences = () => {
    const { layout, setLayout, colorScheme, setColorScheme, theme, setTheme } = useLayout();

    const colorSchemes = mockData.preferences.colorSchemes;

    const layoutOptions = mockData.preferences.layoutOptions.map(opt => ({
        ...opt,
        icon: iconMap[opt.iconName] || Square
    }));

    const currencyOptions = mockData.preferences.currencyOptions.map(opt => ({
        ...opt,
        icon: iconMap[opt.iconName] || DollarSign
    }));

    const timezoneOptions = mockData.preferences.timezoneOptions.map(opt => ({
        ...opt,
        icon: iconMap[opt.iconName] || Globe
    }));

    return (
        <Block
            as={motion.div}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-12"
        >
            <section>
                <Block className="flex items-center justify-between mb-8">
                    <Block>
                        <Heading as="h2" weight="bold" color="text-gray-900">Appearance</Heading>
                        <Text color="text-gray-500" className="mt-1">Customize how SpendWise looks on your device.</Text>
                    </Block>
                </Block>

                <Block className="space-y-10">
                    <Grid cols={1} gap={12} className="md:grid-cols-2">
                        {/* Theme Selection */}
                        <Block className="space-y-4">
                            <Text as="label" size="sm" weight="bold" color="text-gray-700" className="ml-1">Theme</Text>
                            <Grid cols={2} gap={4}>
                                <button
                                    onClick={() => setTheme('light')}
                                    className={`flex items-center justify-center p-4 rounded-2xl border-2 transition-all duration-200 ${theme === 'light'
                                        ? 'border-primary bg-primary/5 text-primary ring-4 ring-primary/10'
                                        : 'border-transparent bg-gray-50 text-gray-500 hover:bg-gray-100'
                                        }`}
                                >
                                    <Sun className="h-5 w-5 mr-3" />
                                    <Text weight="bold">Light</Text>
                                </button>
                                <button
                                    onClick={() => setTheme('dark')}
                                    className={`flex items-center justify-center p-4 rounded-2xl border-2 transition-all duration-200 ${theme === 'dark'
                                        ? 'border-primary bg-primary/5 text-primary ring-4 ring-primary/10'
                                        : 'border-transparent bg-gray-50 text-gray-500 hover:bg-gray-100'
                                        }`}
                                >
                                    <Moon className="h-5 w-5 mr-3" />
                                    <Text weight="bold">Dark</Text>
                                </button>
                            </Grid>
                        </Block>

                        {/* Color Scheme Selection */}
                        <Block className="space-y-4">
                            <Flex as="label" align="center" gap={2} className="text-sm font-bold text-gray-700 ml-1">
                                <PaletteIcon className="h-4 w-4" /> Color Scheme
                            </Flex>
                            <Flex align="center" gap={4} className="p-2">
                                {colorSchemes.map((scheme) => (
                                    <button
                                        key={scheme.id}
                                        onClick={() => setColorScheme(scheme.id as any)}
                                        className={`h-10 w-10 rounded-full transition-all duration-200 ${scheme.class} ${colorScheme === scheme.id ? 'ring-4 ring-offset-2 ring-primary scale-110' : 'hover:scale-105'
                                            }`}
                                        title={scheme.name}
                                    />
                                ))}
                            </Flex>
                        </Block>
                    </Grid>

                    {/* Visual Layout Selection */}
                    <Block className="space-y-4">
                        <Text as="label" size="sm" weight="bold" color="text-gray-700" className="ml-1">Layout Style</Text>
                        <Grid cols={1} gap={4} className="sm:grid-cols-2 lg:grid-cols-4">
                            {layoutOptions.map((option) => (
                                <button
                                    key={option.id}
                                    onClick={() => setLayout(option.id as any)}
                                    className={`flex flex-col items-start p-5 rounded-3xl border-2 transition-all duration-200 text-left group ${layout === option.id
                                        ? 'border-primary bg-primary/5 ring-4 ring-primary/10'
                                        : 'border-transparent bg-gray-50 hover:bg-gray-100'
                                        }`}
                                >
                                    <Block className={`p-3 rounded-2xl mb-4 transition-colors ${layout === option.id ? 'bg-primary text-white' : 'bg-white text-gray-400 group-hover:text-gray-600'
                                        }`}>
                                        <option.icon className="h-6 w-6" />
                                    </Block>
                                    <Text weight="bold" size="sm" className={layout === option.id ? 'text-gray-900' : 'text-gray-600'}>
                                        {option.label}
                                    </Text>
                                    <Text size="xs" color="text-gray-400" className="mt-1 leading-relaxed">
                                        {option.description}
                                    </Text>
                                </button>
                            ))}
                        </Grid>
                    </Block>
                </Block>
            </section>

            <section className="pt-12 border-t border-gray-100">
                <Block className="mb-8">
                    <Heading as="h2" weight="bold" color="text-gray-900">Localization</Heading>
                    <Text color="text-gray-500" className="mt-1">Set your default currency and timezone.</Text>
                </Block>

                <Grid cols={1} gap={8} className="md:grid-cols-2">
                    <CustomSelect
                        label="Default Currency"
                        options={currencyOptions}
                        value="USD"
                        onChange={() => { }}
                    />
                    <CustomSelect
                        label="Timezone"
                        options={timezoneOptions}
                        value="EST"
                        onChange={() => { }}
                    />
                </Grid>
            </section>

            <Flex align="center" justify="end" gap={4} className="pt-8 border-t border-gray-100">
                <button className="px-8 py-4 text-gray-500 font-bold hover:text-gray-900 transition-colors">
                    Cancel
                </button>
                <Button className="px-10 py-4 shadow-lg shadow-primary/20">
                    Save Changes
                </Button>
            </Flex>
        </Block>
    );
};

export default Preferences;
