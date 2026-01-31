import { Link } from 'react-router-dom';
import { ChevronRight, ShieldCheck } from 'lucide-react';
import { useTwoFactorSettings } from '@/hooks/features/useTwoFactorSettings';
import { Block, Flex, Heading, Text } from '@shared';

export const TwoFactorSection = () => {
    const { methods } = useTwoFactorSettings();

    return (
        <Block as="section" className="pt-12 border-t border-gray-100">
            <Flex align="center" justify="between" className="mb-8">
                <Block>
                    <Heading as="h2" weight="bold" color="text-gray-900">Two-Factor Authentication</Heading>
                    <Text color="text-gray-500" className="mt-1">Add an extra layer of security to your account.</Text>
                </Block>
                <Block className="bg-green-50 p-3 rounded-2xl">
                    <ShieldCheck className="h-6 w-6 text-green-600" />
                </Block>
            </Flex>

            <Block className="space-y-4">
                {methods.map((m) => (
                    <Flex key={m.id} align="center" justify="between" className="p-6 rounded-3xl border border-gray-100 bg-gray-50/50 hover:bg-gray-50 transition-all group">
                        <Flex align="center">
                            <Block className="bg-white p-3 rounded-2xl shadow-sm mr-5 group-hover:scale-110 transition-transform">
                                <m.icon className="h-6 w-6 text-primary" />
                            </Block>
                            <Block>
                                <Text size="sm" weight="bold" color="text-gray-900">{m.name}</Text>
                                <Text size="xs" color="text-gray-500" className="mt-0.5">{m.description}</Text>
                            </Block>
                        </Flex>
                        <Flex align="center" gap={6}>
                            <Block as="span" className={`text-xs font-bold px-3 py-1 rounded-full ${m.enabled ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-600'
                                }`}>
                                {m.enabled ? 'Enabled' : 'Disabled'}
                            </Block>
                            <Link
                                to={`/settings/security/setup-2fa?method=${m.id}`}
                                className="p-2 bg-white rounded-xl shadow-sm text-gray-400 hover:text-primary hover:shadow-md transition-all"
                            >
                                <ChevronRight className="h-5 w-5" />
                            </Link>
                        </Flex>
                    </Flex>
                ))}
            </Block>
        </Block>
    );
};
