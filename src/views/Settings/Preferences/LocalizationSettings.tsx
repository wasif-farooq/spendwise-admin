import { Block, Heading, Text, Grid } from '@shared';
import { CustomSelect } from '@ui';
import { useLocalizationSettings } from '@/hooks/features/useLocalizationSettings';

export const LocalizationSettings = () => {
    const {
        currency,
        setCurrency,
        timezone,
        setTimezone,
        currencyOptions,
        timezoneOptions
    } = useLocalizationSettings();

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
                    value={currency}
                    onChange={(opt: any) => setCurrency(opt.value)}
                />
                <CustomSelect
                    label="Timezone"
                    options={timezoneOptions}
                    value={timezone}
                    onChange={(opt: any) => setTimezone(opt.value)}
                />
            </Grid>
        </Block>
    );
};
