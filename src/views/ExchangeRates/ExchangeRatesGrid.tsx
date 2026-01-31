import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowDownRight, Filter } from 'lucide-react';
import { Block, Flex, Grid, Heading, Text } from '@shared';

interface ExchangeRatesGridProps {
    baseCurrency: string;
    filteredCurrencies: any[];
}

export const ExchangeRatesGrid = ({ baseCurrency, filteredCurrencies }: ExchangeRatesGridProps) => {

    return (
        <Block className="lg:col-span-3">
            <Grid cols={1} gap={6} className="sm:grid-cols-2 xl:grid-cols-3">
                {filteredCurrencies.map((currency) => (
                    <Block
                        as={motion.div}
                        layout
                        key={currency.value}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-primary/5 transition-all group relative overflow-hidden"
                    >
                        <Flex align="center" justify="between" className="mb-6">
                            <Block className={`h-12 w-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 ${currency.value === baseCurrency ? 'bg-primary text-white' : 'bg-gray-50 text-gray-400'
                                }`}>
                                <currency.icon size={24} />
                            </Block>
                            <Flex align="center" gap={1} className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${currency.trend === 'up' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                                }`}>
                                {currency.trend === 'up' ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                                {currency.change}%
                            </Flex>
                        </Flex>

                        <Block className="space-y-1">
                            <Text size="sm" weight="black" color="text-gray-400" className="uppercase tracking-widest">{currency.value}</Text>
                            <Text size="2xl" weight="black" className="text-gray-900">{currency.convertedRate}</Text>
                            <Text size="xs" color="text-gray-500" weight="medium" className="truncate">{currency.label.split('-')[1].trim()}</Text>
                        </Block>

                        {currency.value === baseCurrency && (
                            <Block className="absolute top-0 right-0 p-4">
                                <Block className="bg-primary/10 text-primary text-[10px] font-black px-2 py-1 rounded-lg uppercase">Base</Block>
                            </Block>
                        )}
                    </Block>
                ))}
            </Grid>

            {filteredCurrencies.length === 0 && (
                <Flex direction="col" align="center" justify="center" className="py-20 text-center">
                    <Block className="bg-gray-50 p-6 rounded-full mb-6">
                        <Filter className="h-10 w-10 text-gray-300" />
                    </Block>
                    <Heading as="h3" weight="black" className="text-xl text-gray-900">No currencies found</Heading>
                    <Text color="text-gray-500" weight="medium" className="mt-2">Try adjusting your search query.</Text>
                </Flex>
            )}
        </Block>
    );
};
