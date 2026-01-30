import { DollarSign, Globe } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Block, Heading, Text, Grid } from '@shared';
import { CustomSelect } from '@ui';
import mockData from '@/data/mockData.json';

const iconMap: Record<string, LucideIcon> = {
    DollarSign,
    Globe
};

export const LocalizationSettings = () => {
    const currencyOptions = mockData.preferences.currencyOptions.map(opt => ({
        ...opt,
        icon: iconMap[opt.iconName] || DollarSign
    }));

    const timezoneOptions = mockData.preferences.timezoneOptions.map(opt => ({
        ...opt,
        icon: iconMap[opt.iconName] || Globe
    }));

    return (
        <Block as="section" className="pt-12 border-t border-gray-100">
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
        </Block>
    );
};
