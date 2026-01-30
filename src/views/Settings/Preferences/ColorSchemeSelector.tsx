import { Palette as PaletteIcon } from 'lucide-react';
import { Block, Flex } from '@shared';
import { useLayout } from '@/context/LayoutContext';
import mockData from '@/data/mockData.json';

export const ColorSchemeSelector = () => {
    const { colorScheme, setColorScheme } = useLayout();
    const colorSchemes = mockData.preferences.colorSchemes;

    return (
        <Block className="space-y-4">
            <Flex as="label" align="center" gap={2} className="text-sm font-bold text-gray-700 ml-1">
                <PaletteIcon className="h-4 w-4" /> Color Scheme
            </Flex>
            <Flex align="center" gap={4} className="p-2">
                {colorSchemes.map((scheme) => (
                    <Block
                        as="button"
                        key={scheme.id}
                        onClick={() => setColorScheme(scheme.id as any)}
                        className={`h-10 w-10 rounded-full transition-all duration-200 ${scheme.class} ${colorScheme === scheme.id ? 'ring-4 ring-offset-2 ring-primary scale-110' : 'hover:scale-105'
                            }`}
                        title={scheme.name}
                    />
                ))}
            </Flex>
        </Block>
    );
};
