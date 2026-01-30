import { useState, useRef, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import {
    Sparkles,
    Send,
    Bot,
    TrendingDown,
    Zap,
    Lightbulb,
    Search,
    RefreshCw
} from 'lucide-react';
import { Block, Heading, Text, Flex, AnimatedBlock } from '@shared';

import { ChatMessage, InsightCard, SuggestedPrompt } from '@ui';

interface Message {
    id: number;
    text: string;
    sender: 'user' | 'ai';
    timestamp: Date;
}

const AIAdvisorPage = () => {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: 1,
            text: "Hello! I'm your SpendWise AI Advisor. I've analyzed your spending patterns from the last 30 days. How can I help you today?",
            sender: 'ai',
            timestamp: new Date()
        }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    const handleSendMessage = (text: string = inputValue) => {
        if (!text.trim()) return;

        const userMessage: Message = {
            id: messages.length + 1,
            text,
            sender: 'user',
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMessage]);
        setInputValue('');
        setIsTyping(true);

        // Simulate AI response
        setTimeout(() => {
            const aiMessage: Message = {
                id: messages.length + 2,
                text: "That's a great question. Based on your current transaction history, I noticed that your dining expenses are 15% higher than your set budget. If you reduce this by just $50 next week, you'll be on track for your vacation savings goal!",
                sender: 'ai',
                timestamp: new Date()
            };
            setMessages(prev => [...prev, aiMessage]);
            setIsTyping(false);
        }, 1500);
    };

    const suggestedPrompts = [
        "Where did I spend most this week?",
        "Can I afford a new laptop?",
        "How to save $200 by end of month?",
        "Show my subscription leaks"
    ];

    const insights = [
        {
            title: "Potential Saving",
            desc: "Unused gym subscription detected ($45/mo)",
            icon: TrendingDown,
            color: "text-red-500",
            bg: "bg-red-50"
        },
        {
            title: "Spending Alert",
            desc: "Dining expenses up by 22% this week",
            icon: Zap,
            color: "text-amber-500",
            bg: "bg-amber-50"
        },
        {
            title: "Smart Tip",
            desc: "Moving $200 today would maximize interest",
            icon: Lightbulb,
            color: "text-blue-500",
            bg: "bg-blue-50"
        }
    ];

    return (
        <Block className="h-[calc(100vh-64px)] flex flex-col lg:flex-row overflow-hidden bg-gray-50">
            {/* Sidebar Insights */}
            <Block className="w-full lg:w-80 border-r border-gray-200 bg-white p-6 overflow-y-auto hidden lg:block">
                <Flex align="center" gap={2} className="mb-8">
                    <Block className="p-2 bg-primary/10 rounded-xl">
                        <Sparkles className="h-5 w-5 text-primary" />
                    </Block>
                    <Heading as="h2" size="xl" weight="bold" color="text-gray-900">AI Insights</Heading>
                </Flex>

                <div className="space-y-4">
                    {insights.map((insight, idx) => (
                        <InsightCard key={idx} insight={insight} />
                    ))}
                </div>

                <Block className="mt-8 p-4 rounded-2xl bg-primary text-white space-y-3">
                    <Text size="sm" weight="bold">Goal Progress</Text>
                    <Block className="h-2 bg-white/20 rounded-full overflow-hidden">
                        <AnimatedBlock
                            initial={{ width: 0 }}
                            animate={{ width: '75%' }}
                            className="h-full bg-white rounded-full"
                        />
                    </Block>
                    <Text size="xs" color="text-white/80">You're 75% through your "New Car" goal. Keep it up!</Text>
                </Block>
            </Block>

            {/* Main Chat Area */}
            <Block className="flex-grow flex flex-col relative h-full">
                {/* Chat Header */}
                <Block className="h-16 border-b border-gray-100 bg-white/80 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-10">
                    <Flex align="center" gap={3}>
                        <Block className="h-10 w-10 rounded-full bg-gradient-to-tr from-primary to-blue-600 flex items-center justify-center shadow-lg shadow-primary/20">
                            <Bot className="h-6 w-6 text-white" />
                        </Block>
                        <Block>
                            <Text size="sm" weight="bold" color="text-gray-900">SpendWise Advisor</Text>
                            <Flex align="center" gap={2}>
                                <span className="h-2 w-2 bg-green-500 rounded-full animate-pulse" />
                                <Text size="xs" color="text-gray-500" weight="medium">Online & Analyzing</Text>
                            </Flex>
                        </Block>
                    </Flex>
                    <Flex align="center" gap={2}>
                        <button className="p-2 hover:bg-gray-100 rounded-xl text-gray-400 transition-colors">
                            <Search className="h-5 w-5" />
                        </button>
                        <button className="p-2 hover:bg-gray-100 rounded-xl text-gray-400 transition-colors">
                            <RefreshCw className="h-5 w-5" />
                        </button>
                    </Flex>
                </Block>

                {/* Messages Container */}
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

                {/* Input Area */}
                <Block className="p-6 bg-white border-t border-gray-100 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.05)]">
                    <Block className="max-w-6xl mx-auto space-y-4">
                        {/* Suggested Prompts */}
                        <Flex gap={2} className="overflow-x-auto pb-2 scrollbar-none">
                            {suggestedPrompts.map((prompt, idx) => (
                                <SuggestedPrompt
                                    key={idx}
                                    prompt={prompt}
                                    onClick={handleSendMessage}
                                />
                            ))}
                        </Flex>

                        {/* Input Box */}
                        <Block className="relative group">
                            <input
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                                placeholder="Ask your advisor anything..."
                                className="w-full px-6 py-4 bg-gray-50 border border-gray-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white transition-all pr-16"
                            />
                            <button
                                onClick={() => handleSendMessage()}
                                disabled={!inputValue.trim()}
                                className="absolute right-2 top-2 bottom-2 px-4 bg-primary text-white rounded-xl shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all disabled:opacity-50 disabled:shadow-none"
                            >
                                <Send className="h-5 w-5" />
                            </button>
                        </Block>
                        <Text size="xs" color="text-gray-400" align="center">
                            SpendWise AI can make mistakes. Verify important financial information.
                        </Text>
                    </Block>
                </Block>
            </Block>
        </Block>
    );
};

export default AIAdvisorPage;
