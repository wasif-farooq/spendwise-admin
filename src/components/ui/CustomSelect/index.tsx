import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';
import { AnimatedBlock, Block, Flex, Text } from '@shared';

interface Option {
    value: string;
    label: string;
    icon?: any;
}

interface CustomSelectProps {
    label: string;
    options: Option[];
    value: string;
    onChange: (value: string) => void;
}

export const CustomSelect = ({ label, options, value, onChange }: CustomSelectProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const selectedOption = options.find(opt => opt.value === value) || options[0];

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <Block className="relative" ref={containerRef}>
            <Text as="label" className="block text-sm font-bold text-gray-700 mb-2 ml-1">{label}</Text>
            <Block
                as="button"
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className={`w-full flex items-center justify-between px-5 py-4 bg-gray-50 border-2 transition-all duration-200 rounded-2xl ${isOpen ? 'border-primary bg-white ring-4 ring-primary/10' : 'border-transparent hover:bg-gray-100'
                    }`}
            >
                <Flex align="center">
                    {selectedOption.icon && <selectedOption.icon className="h-5 w-5 mr-3 text-primary" />}
                    <Text as="span" className="font-semibold text-gray-900">{selectedOption.label}</Text>
                </Flex>
                <ChevronDown className={`h-5 w-5 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
            </Block>

            <AnimatePresence>
                {isOpen && (
                    <AnimatedBlock
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute z-50 w-full mt-2 bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden p-2"
                    >
                        {options.map((option) => (
                            <Block
                                as="button"
                                key={option.value}
                                type="button"
                                onClick={() => {
                                    onChange(option.value);
                                    setIsOpen(false);
                                }}
                                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-colors ${value === option.value ? 'bg-primary/5 text-primary' : 'text-gray-600 hover:bg-gray-50'
                                    }`}
                            >
                                <Flex align="center">
                                    {option.icon && <option.icon className={`h-5 w-5 mr-3 ${value === option.value ? 'text-primary' : 'text-gray-400'}`} />}
                                    <Text as="span" className="font-medium">{option.label}</Text>
                                </Flex>
                                {value === option.value && <Check className="h-4 w-4" />}
                            </Block>
                        ))}
                    </AnimatedBlock>
                )}
            </AnimatePresence>
        </Block>
    );
};
