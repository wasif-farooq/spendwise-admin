import { useState } from 'react';
import type { Message } from '@/views/AIAdvisor/types';

export const SUGGESTED_PROMPTS = [
    "Where did I spend most this week?",
    "Can I afford a new laptop?",
    "How to save $200 by end of month?",
    "Show my subscription leaks"
];

export const useAIAdvisor = () => {
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

    return {
        messages,
        inputValue,
        setInputValue,
        isTyping,
        handleSendMessage,
        suggestedPrompts: SUGGESTED_PROMPTS
    };
};
