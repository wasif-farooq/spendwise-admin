import { Search, TrendingUp, RefreshCw } from 'lucide-react';
import { Block, Flex, Heading, Text } from '@shared';
import { CustomSelect } from '@ui';
import { CURRENCIES } from './types';

interface ExchangeRatesSidebarProps {
    baseCurrency: string;
    onBaseCurrencyChange: (val: string) => void;
    searchQuery: string;
    onSearchChange: (val: string) => void;
}

export const ExchangeRatesSidebar = ({
    baseCurrency,
    onBaseCurrencyChange,
    searchQuery,
    onSearchChange
}: ExchangeRatesSidebarProps) => {
    return (
        <Block className="lg:col-span-1 space-y-6">
            <Block as="section" className="bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-6">
                <Block className="space-y-4">
                    <CustomSelect
                        label="Base Currency"
                        options={CURRENCIES.map(c => ({ value: c.value, label: c.label, icon: c.icon }))}
                        value={baseCurrency}
                        onChange={onBaseCurrencyChange}
                    />
                </Block>

                <Block className="space-y-4">
                    <Text size="xs" weight="black" color="text-gray-400" className="uppercase tracking-widest ml-1">Search Currency</Text>
                    <Block className="relative group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-primary transition-colors" />
                        <Block
                            as="input"
                            type="text"
                            placeholder="Search code or name..."
                            value={searchQuery}
                            onChange={(e: any) => onSearchChange(e.target.value)}
                            className="w-full pl-12 pr-4 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-primary font-bold text-gray-900 placeholder:text-gray-400 transition-all"
                        />
                    </Block>
                </Block>

                <Block className="pt-4">
                    <Flex align="start" gap={3} className="bg-blue-50 p-4 rounded-2xl">
                        <TrendingUp className="h-5 w-5 text-blue-600 mt-0.5" />
                        <Text size="xs" color="text-blue-800" weight="medium" className="leading-relaxed">
                            Rates are updated every 60 seconds. Market data provided by global financial providers.
                        </Text>
                    </Flex>
                </Block>
            </Block>

            {/* Quick Stats */}
            <Block className="bg-gradient-to-br from-primary to-blue-600 p-8 rounded-[2.5rem] text-white shadow-xl shadow-primary/20 relative overflow-hidden group">
                <Block className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-150 transition-transform duration-700">
                    <RefreshCw className="h-32 w-32" />
                </Block>
                <Heading as="h3" weight="black" className="text-lg mb-2">Market Overview</Heading>
                <Text color="text-white/80" size="sm" weight="medium" className="mb-6 leading-relaxed">The global market is showing high volatility today. Stay updated with real-time alerts.</Text>
                <Block as="button" className="w-full py-3 bg-white/20 backdrop-blur-md rounded-xl font-black text-sm hover:bg-white/30 transition-all">
                    Enable Alerts
                </Block>
            </Block>
        </Block>
    );
};
