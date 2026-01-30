import { useEffect, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Bot } from 'lucide-react';
import { Block, Flex, AnimatedBlock } from '@shared';
import { ChatMessage } from '@ui';
import type { Message } from './types';

interface AIChatHistoryProps {
    messages: Message[];
    isTyping: boolean;
}

export const AIChatHistory = ({ messages, isTyping }: AIChatHistoryProps) => {
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isTyping]);

    return (
        <Block className="flex-grow overflow-y-auto p-6 space-y-6">
            <AnimatePresence initial={false}>
                {messages.map((msg) => (
                    <ChatMessage key={msg.id} message={msg} />
                ))}
            </AnimatePresence>
            {isTyping && (
                <AnimatedBlock
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-start gap-3"
                >
                    <Block className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <Bot className="h-4 w-4 text-primary" />
                    </Block>
                    <Block className="bg-white border border-gray-100 p-4 rounded-2xl rounded-tl-none">
                        <Flex gap={1}>
                            <span className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce" />
                            <span className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce [animation-delay:0.2s]" />
                            <span className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce [animation-delay:0.4s]" />
                        </Flex>
                    </Block>
                </AnimatedBlock>
            )}
            <div ref={messagesEndRef} />
        </Block>
    );
};
