import { Bot, User } from 'lucide-react';
import { Block, Flex, Text, AnimatedBlock } from '@shared';

interface ChatMessageProps {
    message: {
        id: number;
        text: string;
        sender: 'user' | 'ai';
        timestamp: Date;
    };
}

export const ChatMessage = ({ message: msg }: ChatMessageProps) => {
    return (
        <AnimatedBlock
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
        >
            <Flex gap={3} className={`max-w-[80%] ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                <Block className={`h-8 w-8 rounded-full flex-shrink-0 flex items-center justify-center ${msg.sender === 'user' ? 'bg-gray-200' : 'bg-primary/10'}`}>
                    {msg.sender === 'user' ? <User className="h-4 w-4 text-gray-600" /> : <Bot className="h-4 w-4 text-primary" />}
                </Block>
                <Block className={`p-4 rounded-2xl shadow-sm ${msg.sender === 'user'
                    ? 'bg-primary text-white rounded-tr-none'
                    : 'bg-white border border-gray-100 text-gray-800 rounded-tl-none'
                    }`}>
                    <Text size="sm" className="leading-relaxed">{msg.text}</Text>
                    <span className={`text-[9px] mt-2 block opacity-60 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
                        {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                </Block>
            </Flex>
        </AnimatedBlock>
    );
};
