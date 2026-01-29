import { motion } from 'framer-motion';
import { Sun, Moon, Layout, Globe, DollarSign, Palette as PaletteIcon, PanelLeft, PanelRight, LayoutTemplate, Square } from 'lucide-react';
import { CustomSelect } from '../../components/CustomSelect';
import { useLayout } from '../../context/LayoutContext';

const Preferences = () => {
    const { layout, setLayout, colorScheme, setColorScheme, theme, setTheme } = useLayout();

    const colorSchemes = [
        { id: 'blue', name: 'Blue', class: 'bg-blue-600' },
        { id: 'purple', name: 'Purple', class: 'bg-purple-600' },
        { id: 'green', name: 'Green', class: 'bg-green-600' },
        { id: 'orange', name: 'Orange', class: 'bg-orange-600' },
        { id: 'rose', name: 'Rose', class: 'bg-rose-600' },
    ] as const;

    const layoutOptions = [
        { id: 'sidebar-left', label: 'Sidebar Left', icon: PanelLeft, description: 'Classic navigation on the left' },
        { id: 'sidebar-right', label: 'Sidebar Right', icon: PanelRight, description: 'Navigation on the right side' },
        { id: 'top-nav', label: 'Top Nav', icon: LayoutTemplate, description: 'Horizontal navigation at the top' },
        { id: 'minimal', label: 'Minimal', icon: Square, description: 'Clean interface without sidebars' },
    ] as const;

    const currencyOptions = [
        { value: 'USD', label: 'USD - US Dollar ($)', icon: DollarSign },
        { value: 'EUR', label: 'EUR - Euro (€)', icon: DollarSign },
        { value: 'GBP', label: 'GBP - British Pound (£)', icon: DollarSign },
        { value: 'JPY', label: 'JPY - Japanese Yen (¥)', icon: DollarSign },
        { value: 'CAD', label: 'CAD - Canadian Dollar ($)', icon: DollarSign },
        { value: 'AUD', label: 'AUD - Australian Dollar ($)', icon: DollarSign },
        { value: 'PKR', label: 'PKR - Pakistani Rupee (Rs)', icon: DollarSign },
        { value: 'INR', label: 'INR - Indian Rupee (₹)', icon: DollarSign },
        { value: 'AED', label: 'AED - UAE Dirham (د.إ)', icon: DollarSign },
        { value: 'SAR', label: 'SAR - Saudi Riyal (﷼)', icon: DollarSign },
        { value: 'CNY', label: 'CNY - Chinese Yuan (¥)', icon: DollarSign },
        { value: 'BRL', label: 'BRL - Brazilian Real (R$)', icon: DollarSign },
    ];

    const timezoneOptions = [
        { value: 'EST', label: '(GMT-05:00) Eastern Time', icon: Globe },
        { value: 'PST', label: '(GMT-08:00) Pacific Time', icon: Globe },
        { value: 'UTC', label: '(GMT+00:00) UTC', icon: Globe },
        { value: 'GMT', label: '(GMT+00:00) London', icon: Globe },
        { value: 'CET', label: '(GMT+01:00) Central Europe', icon: Globe },
        { value: 'IST', label: '(GMT+05:30) India', icon: Globe },
        { value: 'PKT', label: '(GMT+05:00) Islamabad, Karachi', icon: Globe },
        { value: 'SGT', label: '(GMT+08:00) Singapore', icon: Globe },
        { value: 'JST', label: '(GMT+09:00) Tokyo', icon: Globe },
        { value: 'AEST', label: '(GMT+10:00) Sydney', icon: Globe },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-12"
        >
            <section>
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">Appearance</h2>
                        <p className="text-gray-500 mt-1">Customize how ExpenseFlow looks on your device.</p>
                    </div>
                </div>

                <div className="space-y-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {/* Theme Selection */}
                        <div className="space-y-4">
                            <label className="block text-sm font-bold text-gray-700 ml-1">Theme</label>
                            <div className="grid grid-cols-2 gap-4">
                                <button
                                    onClick={() => setTheme('light')}
                                    className={`flex items-center justify-center p-4 rounded-2xl border-2 transition-all duration-200 ${theme === 'light'
                                            ? 'border-primary bg-primary/5 text-primary ring-4 ring-primary/10'
                                            : 'border-transparent bg-gray-50 text-gray-500 hover:bg-gray-100'
                                        }`}
                                >
                                    <Sun className="h-5 w-5 mr-3" />
                                    <span className="font-bold">Light</span>
                                </button>
                                <button
                                    onClick={() => setTheme('dark')}
                                    className={`flex items-center justify-center p-4 rounded-2xl border-2 transition-all duration-200 ${theme === 'dark'
                                            ? 'border-primary bg-primary/5 text-primary ring-4 ring-primary/10'
                                            : 'border-transparent bg-gray-50 text-gray-500 hover:bg-gray-100'
                                        }`}
                                >
                                    <Moon className="h-5 w-5 mr-3" />
                                    <span className="font-bold">Dark</span>
                                </button>
                            </div>
                        </div>

                        {/* Color Scheme Selection */}
                        <div className="space-y-4">
                            <label className="block text-sm font-bold text-gray-700 ml-1 flex items-center">
                                <PaletteIcon className="h-4 w-4 mr-2" /> Color Scheme
                            </label>
                            <div className="flex items-center space-x-4 p-2">
                                {colorSchemes.map((scheme) => (
                                    <button
                                        key={scheme.id}
                                        onClick={() => setColorScheme(scheme.id)}
                                        className={`h-10 w-10 rounded-full transition-all duration-200 ${scheme.class} ${colorScheme === scheme.id ? 'ring-4 ring-offset-2 ring-primary scale-110' : 'hover:scale-105'
                                            }`}
                                        title={scheme.name}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Visual Layout Selection */}
                    <div className="space-y-4">
                        <label className="block text-sm font-bold text-gray-700 ml-1">Layout Style</label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            {layoutOptions.map((option) => (
                                <button
                                    key={option.id}
                                    onClick={() => setLayout(option.id as any)}
                                    className={`flex flex-col items-start p-5 rounded-3xl border-2 transition-all duration-200 text-left group ${layout === option.id
                                            ? 'border-primary bg-primary/5 ring-4 ring-primary/10'
                                            : 'border-transparent bg-gray-50 hover:bg-gray-100'
                                        }`}
                                >
                                    <div className={`p-3 rounded-2xl mb-4 transition-colors ${layout === option.id ? 'bg-primary text-white' : 'bg-white text-gray-400 group-hover:text-gray-600'
                                        }`}>
                                        <option.icon className="h-6 w-6" />
                                    </div>
                                    <p className={`font-bold text-sm ${layout === option.id ? 'text-gray-900' : 'text-gray-600'}`}>
                                        {option.label}
                                    </p>
                                    <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                                        {option.description}
                                    </p>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section className="pt-12 border-t border-gray-100">
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-900">Localization</h2>
                    <p className="text-gray-500 mt-1">Set your default currency and timezone.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
                </div>
            </section>

            <div className="pt-8 flex items-center justify-end space-x-4 border-t border-gray-100">
                <button className="px-8 py-4 text-gray-500 font-bold hover:text-gray-900 transition-colors">
                    Cancel
                </button>
                <button className="px-10 py-4 bg-primary text-white font-bold rounded-2xl shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all active:scale-95">
                    Save Changes
                </button>
            </div>
        </motion.div>
    );
};

export default Preferences;
