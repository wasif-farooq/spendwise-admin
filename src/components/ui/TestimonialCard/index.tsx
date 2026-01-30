import { Quote } from 'lucide-react';
import { AnimatedBlock, Flex, Block, Text } from '@shared';

interface TestimonialCardProps {
    quote: string;
    author: string;
    role: string;
    avatar: string;
    index: number;
}

export const TestimonialCard = ({ quote, author, role, avatar, index }: TestimonialCardProps) => {
    return (
        <AnimatedBlock
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 relative"
        >
            <Quote className="h-8 w-8 text-primary/10 absolute top-6 right-8" />
            <Text color="text-gray-600" className="italic mb-8 relative z-10">"{quote}"</Text>
            <Flex align="center" gap={4}>
                <Block className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                    {avatar}
                </Block>
                <Block>
                    <Text weight="bold" color="text-gray-900">{author}</Text>
                    <Text size="sm" color="text-gray-500">{role}</Text>
                </Block>
            </Flex>
        </AnimatedBlock>
    );
};
