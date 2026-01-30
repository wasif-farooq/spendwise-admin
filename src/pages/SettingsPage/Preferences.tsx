import { motion } from 'framer-motion';
import { Block, Flex, Heading, Text, Grid } from '@shared';
import { Button } from '@ui';
import { ThemeSelector } from '@/views/Settings/Preferences/ThemeSelector';
import { ColorSchemeSelector } from '@/views/Settings/Preferences/ColorSchemeSelector';
import { LayoutSelector } from '@/views/Settings/Preferences/LayoutSelector';
import { LocalizationSettings } from '@/views/Settings/Preferences/LocalizationSettings';

const Preferences = () => {
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
                        <ThemeSelector />
                        <ColorSchemeSelector />
                    </Grid>
                    <LayoutSelector />
                </Block>
            </section>

            <LocalizationSettings />

            <Flex align="center" justify="end" gap={4} className="pt-8 border-t border-gray-100">
                <Block as="button" className="px-8 py-4 text-gray-500 font-bold hover:text-gray-900 transition-colors">
                    Cancel
                </Block>
                <Button className="px-10 py-4 shadow-lg shadow-primary/20">
                    Save Changes
                </Button>
            </Flex>
        </Block>
    );
};

export default Preferences;
