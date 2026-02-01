import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, X } from 'lucide-react'; // Changed from AlertCircle to AlertTriangle for better warning visual
import { Block, Flex, Text } from '@shared';
import Button from '@/components/ui/Button';

interface ConfirmationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    description: string;
    confirmText?: string;
    cancelText?: string;
    variant?: 'danger' | 'warning' | 'info';
    loading?: boolean;
}

export const ConfirmationModal = ({
    isOpen,
    onClose,
    onConfirm,
    title,
    description,
    confirmText = 'Confirm',
    cancelText = 'Cancel',
    variant = 'danger',
    loading = false
}: ConfirmationModalProps) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: '50%', x: '-50%' }}
                        animate={{ opacity: 1, scale: 1, y: '50%', x: '-50%' }}
                        exit={{ opacity: 0, scale: 0.95, y: '50%', x: '-50%' }}
                        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white rounded-3xl shadow-2xl z-50 overflow-hidden"
                    >
                        <Block className={`p-6 ${variant === 'danger' ? 'bg-red-50' : variant === 'warning' ? 'bg-amber-50' : 'bg-blue-50'}`}>
                            <Flex justify="between" align="start">
                                <Block className={`p-3 rounded-2xl ${variant === 'danger' ? 'bg-red-100 text-red-600' : variant === 'warning' ? 'bg-amber-100 text-amber-600' : 'bg-blue-100 text-blue-600'}`}>
                                    <AlertTriangle size={24} />
                                </Block>
                                <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                                    <X size={20} />
                                </button>
                            </Flex>
                            <Text as="h3" className="text-xl font-bold mt-4 text-gray-900">{title}</Text>
                            <Text className="text-gray-600 mt-2 leading-relaxed">{description}</Text>
                        </Block>

                        <Block className="p-6 bg-white border-t border-gray-100">
                            <Flex gap={3} justify="end">
                                <Button variant="ghost" onClick={onClose} disabled={loading}>
                                    {cancelText}
                                </Button>
                                <Button
                                    variant={variant === 'danger' ? 'primary' : 'outline'}
                                    className={variant === 'danger' ? '!bg-red-600 hover:!bg-red-700' : ''}
                                    onClick={onConfirm}
                                    disabled={loading}
                                >
                                    {loading ? 'Processing...' : confirmText}
                                </Button>
                            </Flex>
                        </Block>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};
