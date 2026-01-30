interface SuggestedPromptProps {
    prompt: string;
    onClick: (prompt: string) => void;
}

export const SuggestedPrompt = ({ prompt, onClick }: SuggestedPromptProps) => {
    return (
        <button
            onClick={() => onClick(prompt)}
            className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-full text-xs font-medium text-gray-600 hover:bg-primary/5 hover:border-primary/20 hover:text-primary transition-all whitespace-nowrap"
        >
            {prompt}
        </button>
    );
};
