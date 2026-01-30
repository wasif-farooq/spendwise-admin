import { AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { Block, Text, AnimatedBlock } from '@shared';

interface FAQItemProps {
    question: string;
    answer: string;
    isOpen: boolean;
    onClick: () => void;
}

export const FAQItem = ({ question, answer, isOpen, onClick }: FAQItemProps) => {
    return (
        <Block className="border border-gray-100 rounded-xl overflow-hidden">
            <button
                onClick={onClick}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
            >
                <Text weight="semibold" color="text-gray-900">{question}</Text>
                <ChevronDown className={`h-5 w-5 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
                {isOpen && (
                    <AnimatedBlock
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <Block className="p-6 pt-0">
                            <Text color="text-gray-600" className="leading-relaxed">
                                {answer}
                            </Text>
                        </Block>
                    </AnimatedBlock>
                )}
            </AnimatePresence>
        </Block>
    );
};
