import { motion, AnimatePresence } from 'framer-motion';
import { User, Building2 } from 'lucide-react';
import { Block, Flex, Heading, Text } from '@shared';

interface GeneralHeaderProps {
    accountType: 'personal' | 'organization';
    orgIcon: string | null;
}

export const GeneralHeader = ({ accountType, orgIcon }: GeneralHeaderProps) => {
    return (
        <Flex as="header" direction="col" justify="between" gap={6} className="md:flex-row md:items-center">
            <Block>
                <Heading as="h2" weight="black" className="text-3xl tracking-tight text-gray-900">General Settings</Heading>
                <Text color="text-gray-500" weight="medium" className="mt-1">
                    Manage your {accountType === 'personal' ? 'personal account' : "organization's"} core identity and settings.
                </Text>
            </Block>
            <Flex align="center" gap={4}>
                <AnimatePresence>
                    {orgIcon && (
                        <Block
                            as={motion.div}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            className="h-14 w-14 rounded-2xl overflow-hidden border-2 border-primary/20 shadow-lg shadow-primary/5"
                        >
                            <img src={orgIcon} alt="Org Icon" className="w-full h-full object-cover" />
                        </Block>
                    )}
                </AnimatePresence>
                <Block className="bg-primary/10 p-4 rounded-[2rem] hidden sm:block">
                    {accountType === 'personal' ? <User className="h-8 w-8 text-primary" /> : <Building2 className="h-8 w-8 text-primary" />}
                </Block>
            </Flex>
        </Flex>
    );
};
