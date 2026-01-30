import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Sparkles,
    Send,
    Bot,
    User,
    TrendingDown,
    Zap,
    Lightbulb,
    ChevronRight,
    Search,
    RefreshCw
} from 'lucide-react';

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
        <div className="h-[calc(100vh-64px)] flex flex-col lg:flex-row overflow-hidden bg-gray-50">
            {/* Sidebar Insights */}
            <div className="w-full lg:w-80 border-r border-gray-200 bg-white p-6 overflow-y-auto hidden lg:block">
                <div className="flex items-center gap-2 mb-8">
                    <div className="p-2 bg-primary/10 rounded-xl">
                        <Sparkles className="h-5 w-5 text-primary" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-900">AI Insights</h2>
                </div>

                <div className="space-y-4">
                    {insights.map((insight, idx) => (
                        <div key={idx} className="p-4 rounded-2xl border border-gray-100 bg-gray-50/50 hover:bg-gray-50 transition-colors cursor-pointer group">
                            <div className="flex items-center gap-3 mb-2">
                                <div className={`p-2 rounded-lg ${insight.bg}`}>
                                    <insight.icon className={`h-4 w-4 ${insight.color}`} />
                                </div>
                                <span className="text-sm font-bold text-gray-900">{insight.title}</span>
                            </div>
                            <p className="text-xs text-gray-500 leading-relaxed mb-3">{insight.desc}</p>
                            <button className="text-[10px] font-bold text-primary flex items-center group-hover:gap-1 transition-all">
                                VIEW DETAILS <ChevronRight className="h-3 w-3" />
                            </button>
                        </div>
                    ))}
                </div>

                <div className="mt-8 p-4 rounded-2xl bg-primary text-white space-y-3">
                    <p className="text-sm font-bold">Goal Progress</p>
                    <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: '75%' }}
                            className="h-full bg-white rounded-full"
                        />
                    </div>
                    <p className="text-[10px] opacity-80">You're 75% through your "New Car" goal. Keep it up!</p>
                </div>
            </div>

            {/* Main Chat Area */}
            <div className="flex-grow flex flex-col relative h-full">
                {/* Chat Header */}
                <div className="h-16 border-b border-gray-100 bg-white/80 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-10">
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-primary to-blue-600 flex items-center justify-center shadow-lg shadow-primary/20">
                            <Bot className="h-6 w-6 text-white" />
                        </div>
                        <div>
                            <p className="text-sm font-bold text-gray-900">SpendWise Advisor</p>
                            <div className="flex items-center gap-2">
                                <span className="h-2 w-2 bg-green-500 rounded-full animate-pulse" />
                                <span className="text-[10px] text-gray-500 font-medium">Online & Analyzing</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <button className="p-2 hover:bg-gray-100 rounded-xl text-gray-400 transition-colors">
                            <Search className="h-5 w-5" />
                        </button>
                        <button className="p-2 hover:bg-gray-100 rounded-xl text-gray-400 transition-colors">
                            <RefreshCw className="h-5 w-5" />
                        </button>
                    </div>
                </div>

                {/* Messages Container */}
                <div className="flex-grow overflow-y-auto p-6 space-y-6">
                    <AnimatePresence initial={false}>
                        {messages.map((msg) => (
                            <motion.div
                                key={msg.id}
                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div className={`flex gap-3 max-w-[80%] ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                                    <div className={`h-8 w-8 rounded-full flex-shrink-0 flex items-center justify-center ${msg.sender === 'user' ? 'bg-gray-200' : 'bg-primary/10'
                                        }`}>
                                        {msg.sender === 'user' ? <User className="h-4 w-4 text-gray-600" /> : <Bot className="h-4 w-4 text-primary" />}
                                    </div>
                                    <div className={`p-4 rounded-2xl shadow-sm ${msg.sender === 'user'
                                            ? 'bg-primary text-white rounded-tr-none'
                                            : 'bg-white border border-gray-100 text-gray-800 rounded-tl-none'
                                        }`}>
                                        <p className="text-sm leading-relaxed">{msg.text}</p>
                                        <span className={`text-[9px] mt-2 block opacity-60 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
                                            {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                    {isTyping && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex items-start gap-3"
                        >
                            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                                <Bot className="h-4 w-4 text-primary" />
                            </div>
                            <div className="bg-white border border-gray-100 p-4 rounded-2xl rounded-tl-none">
                                <div className="flex gap-1">
                                    <span className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce" />
                                    <span className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce [animation-delay:0.2s]" />
                                    <span className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce [animation-delay:0.4s]" />
                                </div>
                            </div>
                        </motion.div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="p-6 bg-white border-t border-gray-100 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.05)]">
                    <div className="max-w-4xl mx-auto space-y-4">
                        {/* Suggested Prompts */}
                        <div className="flex flex-wrap gap-2 overflow-x-auto pb-2 scrollbar-none">
                            {suggestedPrompts.map((prompt, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => handleSendMessage(prompt)}
                                    className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-full text-xs font-medium text-gray-600 hover:bg-primary/5 hover:border-primary/20 hover:text-primary transition-all whitespace-nowrap"
                                >
                                    {prompt}
                                </button>
                            ))}
                        </div>

                        {/* Input Box */}
                        <div className="relative group">
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
                        </div>
                        <p className="text-[10px] text-gray-400 text-center">
                            SpendWise AI can make mistakes. Verify important financial information.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AIAdvisorPage;
