import { Building2, Info } from 'lucide-react';
import { Block, Flex, Heading, Text, Grid } from '@shared';

interface ProfileCompletionCardsProps {
    accountType: 'personal' | 'organization';
}

export const ProfileCompletionCards = ({ accountType }: ProfileCompletionCardsProps) => {
    return (
        <Grid cols={1} gap={8} as="section" className="md:grid-cols-2">
            <Block className="bg-white rounded-[3rem] p-10 border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-primary/5 transition-all cursor-pointer group relative overflow-hidden">
                <Block className="absolute top-0 right-0 p-10 opacity-[0.03] group-hover:scale-150 transition-transform duration-700">
                    <Building2 className="h-32 w-32 text-primary" />
                </Block>
                <Block className="bg-blue-50 w-14 h-14 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform shadow-sm">
                    <Building2 className="h-7 w-7 text-blue-600" />
                </Block>
                <Heading as="h4" className="text-xl font-black text-gray-900 mb-3">
                    {accountType === 'personal' ? 'Account Profile' : 'Organization Profile'}
                </Heading>
                <Text size="sm" color="text-gray-500" weight="medium" className="leading-relaxed">
                    {accountType === 'personal'
                        ? "Complete your personal profile with contact details and preferences for a tailored experience."
                        : "Complete your organization's profile with address, tax ID, and contact details for official documents."}
                </Text>
                <Flex align="center" gap={2} className="mt-8 text-primary font-black text-sm group-hover:translate-x-2 transition-transform">
                    Configure Profile
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                    </svg>
                </Flex>
            </Block>

            <Block className="bg-white rounded-[3rem] p-10 border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-primary/5 transition-all cursor-pointer group relative overflow-hidden">
                <Block className="absolute top-0 right-0 p-10 opacity-[0.03] group-hover:scale-150 transition-transform duration-700">
                    <Info className="h-32 w-32 text-primary" />
                </Block>
                <Block className="bg-purple-50 w-14 h-14 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform shadow-sm">
                    <Info className="h-7 w-7 text-purple-600" />
                </Block>
                <Heading as="h4" className="text-xl font-black text-gray-900 mb-3">Workspace URL</Heading>
                <Text size="sm" color="text-gray-500" weight="medium" className="leading-relaxed">Customize your workspace URL for easier access and professional branding across your team.</Text>
                <Flex align="center" gap={2} className="mt-8 text-primary font-black text-sm group-hover:translate-x-2 transition-transform">
                    Manage URL
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                    </svg>
                </Flex>
            </Block>
        </Grid>
    );
};
