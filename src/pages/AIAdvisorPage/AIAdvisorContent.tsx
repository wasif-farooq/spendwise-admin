import React from 'react';
import { Block } from '@shared';
import { AIInsightsSidebar } from '@/views/AIAdvisor/AIInsightsSidebar';
import { AIChatHeader } from '@/views/AIAdvisor/AIChatHeader';
import { AIChatHistory } from '@/views/AIAdvisor/AIChatHistory';
import { AIChatInput } from '@/views/AIAdvisor/AIChatInput';
import { useAIAdvisor } from '@/hooks/features/ai-advisor/useAIAdvisor';

const AIAdvisorContent: React.FC = () => {
    const {
        messages,
        inputValue,
        setInputValue,
        isTyping,
        handleSendMessage,
        suggestedPrompts
    } = useAIAdvisor();

    return (
        <Block className="h-[calc(100vh-64px)] flex flex-col lg:flex-row overflow-hidden bg-gray-50">
            {/* Sidebar Insights */}
            <AIInsightsSidebar />

            {/* Main Chat Area */}
            <Block className="flex-grow flex flex-col relative h-full">
                <AIChatHeader />

                <AIChatHistory
                    messages={messages}
                    isTyping={isTyping}
                />

                <AIChatInput
                    inputValue={inputValue}
                    onInputChange={setInputValue}
                    onSendMessage={handleSendMessage}
                    suggestedPrompts={suggestedPrompts}
                />
            </Block>
        </Block>
    );
};

export default AIAdvisorContent;

