import { motion, AnimatePresence } from 'framer-motion';
import { Check, X } from 'lucide-react';
import { Block, Flex, Heading, Grid } from '@shared';
import { Button, Input, Modal } from '@ui';

interface InviteMemberModalProps {
    isOpen: boolean;
    onClose: () => void;
    handleInvite: (e: React.FormEvent) => void;
    inviteEmail: string;
    setInviteEmail: (email: string) => void;
    inviteRole: string;
    setInviteRole: (role: string) => void;
    isInviting: boolean;
    feedback: { type: 'success' | 'error', message: string } | null;
}

export const InviteMemberModal = ({
    isOpen,
    onClose,
    handleInvite,
    inviteEmail,
    setInviteEmail,
    inviteRole,
    setInviteRole,
    isInviting,
    feedback
}: InviteMemberModalProps) => {
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Invite New Member"
        >
            <Block as="form" onSubmit={handleInvite} className="space-y-8">
                <Block className="space-y-6">
                    <Input
                        label="Email Address"
                        type="email"
                        placeholder="colleague@example.com"
                        value={inviteEmail}
                        onChange={(e) => setInviteEmail(e.target.value)}
                        className="bg-gray-50 border-none h-14 rounded-2xl focus:ring-2 focus:ring-primary font-bold"
                        required
                    />

                    <Block className="space-y-3">
                        <Heading as="h4" size="sm" weight="black" className="uppercase tracking-widest px-1 text-gray-900">Select Role</Heading>
                        <Grid cols={1} gap={4} className="sm:grid-cols-3">
                            {['Member', 'Admin', 'Viewer'].map((role) => (
                                <button
                                    key={role}
                                    type="button"
                                    onClick={() => setInviteRole(role.toLowerCase())}
                                    className={`p-4 rounded-2xl border-2 transition-all text-sm font-bold ${inviteRole === role.toLowerCase()
                                        ? 'border-primary bg-primary/5 text-primary'
                                        : 'border-gray-100 bg-gray-50 text-gray-500 hover:border-gray-200'
                                        }`}
                                >
                                    {role}
                                </button>
                            ))}
                        </Grid>
                    </Block>
                </Block>

                <AnimatePresence>
                    {feedback && (
                        <Block
                            as={motion.div}
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className={`p-4 rounded-2xl text-sm font-bold flex items-center ${feedback.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                }`}
                        >
                            {feedback.type === 'success' ? <Check className="h-4 w-4 mr-2" /> : <X className="h-4 w-4 mr-2" />}
                            {feedback.message}
                        </Block>
                    )}
                </AnimatePresence>

                <Flex direction="col" gap={4} className="sm:flex-row pt-4 border-t border-gray-100">
                    <Button
                        variant="outline"
                        type="button"
                        onClick={onClose}
                        className="flex-grow py-4 rounded-2xl font-black"
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        disabled={isInviting || !inviteEmail}
                        className="flex-grow py-4 rounded-2xl shadow-lg shadow-primary/20 font-black"
                    >
                        {isInviting ? 'Sending...' : 'Send Invitation'}
                    </Button>
                </Flex>
            </Block>
        </Modal>
    );
};
