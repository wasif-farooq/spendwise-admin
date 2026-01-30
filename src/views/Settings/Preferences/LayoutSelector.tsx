import { PanelLeft, PanelRight, LayoutTemplate, Square } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Block, Text, Grid } from '@shared';
import { useLayout } from '@/context/LayoutContext';
import mockData from '@/data/mockData.json';

const iconMap: Record<string, LucideIcon> = {
    PanelLeft,
    PanelRight,
    LayoutTemplate,
    Square
};

export const LayoutSelector = () => {
    const { layout, setLayout } = useLayout();

    const layoutOptions = mockData.preferences.layoutOptions.map(opt => ({
        ...opt,
        icon: iconMap[opt.iconName] || Square
    }));

    return (
        <Block className="space-y-4">
            <Text as="label" size="sm" weight="bold" color="text-gray-700" className="ml-1">Layout Style</Text>
            <Grid cols={1} gap={4} className="sm:grid-cols-2 lg:grid-cols-4">
                {layoutOptions.map((option) => (
                    <Block
                        as="button"
                        key={option.id}
                        onClick={() => setLayout(option.id as any)}
                        className={`flex flex-col items-start p-5 rounded-3xl border-2 transition-all duration-200 text-left group ${layout === option.id
                            ? 'border-primary bg-primary/5 ring-4 ring-primary/10'
                            : 'border-transparent bg-gray-50 hover:bg-gray-100'
                            }`}
                    >
                        <Block className={`p-3 rounded-2xl mb-4 transition-colors ${layout === option.id ? 'bg-primary text-white' : 'bg-white text-gray-400 group-hover:text-gray-600'
                            }`}>
                            <option.icon className="h-6 w-6" />
                        </Block>
                        <Text weight="bold" size="sm" className={layout === option.id ? 'text-gray-900' : 'text-gray-600'}>
                            {option.label}
                        </Text>
                        <Text size="xs" color="text-gray-400" className="mt-1 leading-relaxed">
                            {option.description}
                        </Text>
                    </Block>
                ))}
            </Grid>
        </Block>
    );
};
