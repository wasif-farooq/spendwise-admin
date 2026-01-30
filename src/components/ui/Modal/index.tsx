import React, { useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Block, Heading, AnimatedBlock, Flex } from '@shared';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
    maxWidth?: string;
}

export const Modal = ({ isOpen, onClose, title, children, maxWidth = 'max-w-lg' }: ModalProps) => {
    // Close on Escape key
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
                    {/* Backdrop */}
                    <AnimatedBlock
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm"
                    />

                    {/* Modal Content */}
                    <AnimatedBlock
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className={`relative w-full ${maxWidth} bg-white rounded-[2.5rem] shadow-2xl overflow-hidden`}
                    >
                        <Block className="p-8">
                            <Flex align="center" justify="between" className="mb-6">
                                <Heading as="h3" size="2xl" weight="bold" color="text-gray-900">{title}</Heading>
                                <button
                                    onClick={onClose}
                                    className="p-2 hover:bg-gray-100 rounded-2xl transition-colors text-gray-400 hover:text-gray-600"
                                >
                                    <X className="h-6 w-6" />
                                </button>
                            </Flex>
                            {children}
                        </Block>
                    </AnimatedBlock>
                </div>
            )}
        </AnimatePresence>
    );
};

export default Modal;
