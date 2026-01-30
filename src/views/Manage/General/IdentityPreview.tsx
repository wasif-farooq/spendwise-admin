import { User, Building2 } from 'lucide-react';
import { Block, Flex, Heading, Text } from '@shared';

interface IdentityPreviewProps {
    accountType: 'personal' | 'organization';
    orgName: string;
    orgIcon: string | null;
}

export const IdentityPreview = ({ accountType, orgName, orgIcon }: IdentityPreviewProps) => {
    return (
        <Block className="lg:col-span-5">
            <Block className="sticky top-8 space-y-6">
                <Flex align="center" justify="between">
                    <Heading as="h3" weight="black" className="uppercase tracking-widest text-[10px] text-gray-400">Live Preview</Heading>
                    <Flex gap={1}>
                        <Block className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                        <Block className="w-2 h-2 rounded-full bg-gray-200" />
                        <Block className="w-2 h-2 rounded-full bg-gray-200" />
                    </Flex>
                </Flex>

                <Block className="bg-white rounded-[2.5rem] p-8 shadow-2xl shadow-primary/10 border border-gray-100 relative overflow-hidden">
                    <Block className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 blur-3xl" />

                    <Block className="relative space-y-8">
                        {/* Sidebar Preview Mockup */}
                        <Block className="space-y-4">
                            <Text size="xs" weight="black" className="uppercase tracking-tight text-gray-400">Sidebar Appearance</Text>
                            <Flex align="center" gap={4} className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                                <Block className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center overflow-hidden border border-primary/20">
                                    {orgIcon ? (
                                        <img src={orgIcon} alt="Preview" className="w-full h-full object-cover" />
                                    ) : (
                                        accountType === 'personal' ? <User className="h-6 w-6 text-primary" /> : <Building2 className="h-6 w-6 text-primary" />
                                    )}
                                </Block>
                                <Block className="flex-1 min-w-0">
                                    <Text size="sm" weight="black" className="truncate text-gray-900">{orgName || 'Your Name'}</Text>
                                    <Text size="xs" color="text-gray-500" weight="bold" className="uppercase tracking-wider">
                                        {accountType === 'personal' ? 'Personal' : 'Organization'}
                                    </Text>
                                </Block>
                            </Flex>
                        </Block>

                        {/* Header Preview Mockup */}
                        <Block className="space-y-4">
                            <Text size="xs" weight="black" className="uppercase tracking-tight text-gray-400">Header Appearance</Text>
                            <Flex align="center" justify="between" className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                                <Flex align="center" gap={3}>
                                    <Block className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center text-white font-black text-xs">
                                        {orgName ? orgName.charAt(0).toUpperCase() : 'S'}
                                    </Block>
                                    <Text size="xs" weight="black" className="text-gray-900">SpendWise</Text>
                                </Flex>
                                <Block className="h-8 w-8 rounded-full bg-white shadow-sm border border-gray-100 overflow-hidden">
                                    {orgIcon ? (
                                        <img src={orgIcon} alt="Preview" className="w-full h-full object-cover" />
                                    ) : (
                                        <Block className="w-full h-full bg-primary/10 flex items-center justify-center">
                                            <User className="h-4 w-4 text-primary" />
                                        </Block>
                                    )}
                                </Block>
                            </Flex>
                        </Block>
                    </Block>
                </Block>

                <Block className="p-6 bg-primary/5 rounded-[2rem] border border-primary/10">
                    <Text size="xs" color="text-primary" weight="bold" className="leading-relaxed">
                        The preview shows how your identity will be displayed in the main navigation and user menus.
                    </Text>
                </Block>
            </Block>
        </Block>
    );
};
