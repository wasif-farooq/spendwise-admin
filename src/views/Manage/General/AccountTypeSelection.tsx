import { User, Building2, Sparkles, ShieldCheck } from 'lucide-react';
import { Block, Flex, Heading, Text, Grid } from '@shared';

interface AccountTypeSelectionProps {
    accountType: 'personal' | 'organization';
    onTypeChange: (type: 'personal' | 'organization') => void;
}

export const AccountTypeSelection = ({ accountType, onTypeChange }: AccountTypeSelectionProps) => {
    return (
        <Block as="section" className="space-y-6">
            <Flex align="center" gap={3}>
                <Block className="bg-primary/10 p-2 rounded-xl">
                    <Sparkles className="h-4 w-4 text-primary" />
                </Block>
                <Heading as="h3" weight="black" className="uppercase tracking-widest text-xs text-gray-900">Select Account Type</Heading>
            </Flex>
            <Grid cols={1} gap={6} className="sm:grid-cols-2">
                <button
                    onClick={() => onTypeChange('personal')}
                    className={`relative p-8 rounded-[3rem] border-4 transition-all text-left group ${accountType === 'personal'
                        ? 'border-primary bg-primary/5 shadow-xl shadow-primary/10'
                        : 'border-gray-100 bg-white hover:border-gray-200'
                        }`}
                >
                    <Block className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 ${accountType === 'personal' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'bg-gray-100 text-gray-400'
                        }`}>
                        <User className="h-7 w-7" />
                    </Block>
                    <Heading as="h4" className="text-xl font-black text-gray-900 mb-2">Personal Account</Heading>
                    <Text size="sm" color="text-gray-500" weight="medium" className="leading-relaxed">Best for individuals managing personal finances and small budgets.</Text>
                    {accountType === 'personal' && (
                        <Block className="absolute top-6 right-6 bg-primary text-white p-1.5 rounded-full shadow-lg">
                            <ShieldCheck className="h-4 w-4" />
                        </Block>
                    )}
                </button>

                <button
                    onClick={() => onTypeChange('organization')}
                    className={`relative p-8 rounded-[3rem] border-4 transition-all text-left group ${accountType === 'organization'
                        ? 'border-primary bg-primary/5 shadow-xl shadow-primary/10'
                        : 'border-gray-100 bg-white hover:border-gray-200'
                        }`}
                >
                    <Block className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 ${accountType === 'organization' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'bg-gray-100 text-gray-400'
                        }`}>
                        <Building2 className="h-7 w-7" />
                    </Block>
                    <Heading as="h4" className="text-xl font-black text-gray-900 mb-2">Organization</Heading>
                    <Text size="sm" color="text-gray-500" weight="medium" className="leading-relaxed">Ideal for teams, families, or businesses requiring shared access and roles.</Text>
                    {accountType === 'organization' && (
                        <Block className="absolute top-6 right-6 bg-primary text-white p-1.5 rounded-full shadow-lg">
                            <ShieldCheck className="h-4 w-4" />
                        </Block>
                    )}
                </button>
            </Grid>
        </Block>
    );
};
