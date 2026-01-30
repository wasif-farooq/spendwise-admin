import { Send } from 'lucide-react';
import { Block, Flex, Text } from '@shared';
import { SuggestedPrompt, Button } from '@ui';

interface AIChatInputProps {
    inputValue: string;
    onInputChange: (value: string) => void;
    onSendMessage: (text?: string) => void;
    suggestedPrompts: string[];
}

export const AIChatInput = ({
    inputValue,
    onInputChange,
    onSendMessage,
    suggestedPrompts
}: AIChatInputProps) => {
    return (
        <Block className="p-6 bg-white border-t border-gray-100 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.05)]">
            <Block className="max-w-6xl mx-auto space-y-4">
                {/* Suggested Prompts */}
                <Flex gap={2} className="overflow-x-auto pb-2 scrollbar-none">
                    {suggestedPrompts.map((prompt, idx) => (
                        <SuggestedPrompt
                            key={idx}
                            prompt={prompt}
                            onClick={() => onSendMessage(prompt)}
                        />
                    ))}
                </Flex>

                {/* Input Box */}
                <Block className="relative group">
                    <Block
                        as="input"
                        type="text"
                        value={inputValue}
                        onChange={(e: any) => onInputChange(e.target.value)}
                        onKeyPress={(e: any) => e.key === 'Enter' && onSendMessage()}
                        placeholder="Ask your advisor anything..."
                        className="w-full px-6 py-4 bg-gray-50 border border-gray-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white transition-all pr-16"
                    />
                    <Button
                        onClick={() => onSendMessage()}
                        disabled={!inputValue.trim()}
                        className="absolute right-2 top-2 bottom-2 px-4 bg-primary text-white rounded-xl shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all disabled:opacity-50 disabled:shadow-none h-auto"
                    >
                        <Send className="h-5 w-5" />
                    </Button>
                </Block>
                <Text size="xs" color="text-gray-400" align="center">
                    SpendWise AI can make mistakes. Verify important financial information.
                </Text>
            </Block>
        </Block>
    );
};
