import { motion } from 'framer-motion';
import { Block, Grid } from '@shared';
import { ExchangeRatesHeader } from '@/views/ExchangeRates/ExchangeRatesHeader';
import { CurrencyConverter } from '@/views/ExchangeRates/CurrencyConverter';
import { ExchangeRatesSidebar } from '@/views/ExchangeRates/ExchangeRatesSidebar';
import { ExchangeRatesGrid } from '@/views/ExchangeRates/ExchangeRatesGrid';
import { useExchangeRates } from '@/hooks/features/exchange-rates/useExchangeRates';

const ExchangeRatesPage = () => {
    const {
        baseCurrency,
        setBaseCurrency,
        searchQuery,
        setSearchQuery
    } = useExchangeRates();

    return (
        <Block
            as={motion.div}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-8 space-y-8 max-w-[1600px] mx-auto"
        >
            <ExchangeRatesHeader />

            {/* Currency Converter Section */}
            <CurrencyConverter />

            <Grid cols={1} gap={8} className="lg:grid-cols-4">
                {/* Sidebar Controls */}
                <ExchangeRatesSidebar
                    baseCurrency={baseCurrency}
                    onBaseCurrencyChange={setBaseCurrency}
                    searchQuery={searchQuery}
                    onSearchChange={setSearchQuery}
                />

                {/* Rates Grid */}
                <ExchangeRatesGrid
                    baseCurrency={baseCurrency}
                    searchQuery={searchQuery}
                />
            </Grid>
        </Block>
    );
};

export default ExchangeRatesPage;

