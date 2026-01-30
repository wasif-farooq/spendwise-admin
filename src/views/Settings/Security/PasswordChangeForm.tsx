import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Eye, EyeOff, Check, X as CloseIcon } from 'lucide-react';
import { Block, Flex, Heading, Text, Grid } from '@shared';
import { Button, Input } from '@ui';

export const PasswordChangeForm = () => {
    const [passwordData, setPasswordData] = useState({
        current: '',
        new: '',
        confirm: ''
    });
    const [showPasswords, setShowPasswords] = useState({
        current: false,
        new: false,
        confirm: false
    });
    const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);
    const [passwordFeedback, setPasswordFeedback] = useState<{ type: 'success' | 'error', message: string } | null>(null);

    const passwordStrength = useMemo(() => {
        const p = passwordData.new;
        if (!p) return 0;
        let score = 0;
        if (p.length >= 8) score += 25;
        if (/[A-Z]/.test(p)) score += 25;
        if (/[0-9]/.test(p)) score += 25;
        if (/[^A-Za-z0-9]/.test(p)) score += 25;
        return score;
    }, [passwordData.new]);

    const strengthColor = () => {
        if (passwordStrength <= 25) return 'bg-red-500';
        if (passwordStrength <= 50) return 'bg-orange-500';
        if (passwordStrength <= 75) return 'bg-yellow-500';
        return 'bg-green-500';
    };

    const strengthLabel = () => {
        if (passwordStrength <= 25) return 'Weak';
        if (passwordStrength <= 50) return 'Fair';
        if (passwordStrength <= 75) return 'Good';
        return 'Strong';
    };

    const handleUpdatePassword = (e: React.FormEvent) => {
        e.preventDefault();
        if (passwordData.new !== passwordData.confirm) {
            setPasswordFeedback({ type: 'error', message: 'New passwords do not match' });
            return;
        }

        setIsUpdatingPassword(true);
        setPasswordFeedback(null);

        // Simulate API call
        setTimeout(() => {
            setIsUpdatingPassword(false);
            setPasswordFeedback({ type: 'success', message: 'Password updated successfully!' });
            setPasswordData({ current: '', new: '', confirm: '' });
        }, 1500);
    };

    const toggleVisibility = (field: keyof typeof showPasswords) => {
        setShowPasswords(prev => ({ ...prev, [field]: !prev[field] }));
    };

    return (
        <section>
            <Flex align="center" justify="between" className="mb-8">
                <Block>
                    <Heading as="h2" weight="bold" color="text-gray-900">Change Password</Heading>
                    <Text color="text-gray-500" className="mt-1">Update your password to keep your account secure.</Text>
                </Block>
                <Block className="bg-primary/10 p-3 rounded-2xl">
                    <Lock className="h-6 w-6 text-primary" />
                </Block>
            </Flex>

            <Block as="form" onSubmit={handleUpdatePassword} className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm space-y-8">
                <Grid cols={1} gap={8} className="md:grid-cols-2">
                    <Block className="space-y-6">
                        <Block className="relative">
                            <Input
                                label="Current Password"
                                type={showPasswords.current ? 'text' : 'password'}
                                value={passwordData.current}
                                onChange={(e) => setPasswordData({ ...passwordData, current: e.target.value })}
                                className="bg-gray-50 border-none h-14 rounded-2xl focus:ring-2 focus:ring-primary pr-12"
                                required
                            />
                            <Block
                                as="button"
                                type="button"
                                onClick={() => toggleVisibility('current')}
                                className="absolute right-4 top-[3.2rem] text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                {showPasswords.current ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                            </Block>
                        </Block>

                        <Block className="relative">
                            <Input
                                label="New Password"
                                type={showPasswords.new ? 'text' : 'password'}
                                value={passwordData.new}
                                onChange={(e) => setPasswordData({ ...passwordData, new: e.target.value })}
                                className="bg-gray-50 border-none h-14 rounded-2xl focus:ring-2 focus:ring-primary pr-12"
                                required
                            />
                            <Block
                                as="button"
                                type="button"
                                onClick={() => toggleVisibility('new')}
                                className="absolute right-4 top-[3.2rem] text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                {showPasswords.new ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                            </Block>

                            {passwordData.new && (
                                <Block
                                    as={motion.div}
                                    initial={{ opacity: 0, y: 5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="mt-3 space-y-2"
                                >
                                    <Flex justify="between" align="center" className="px-1">
                                        <Text size="xs" weight="bold" color="text-gray-500">Strength: {strengthLabel()}</Text>
                                        <Text size="xs" weight="bold" color="text-gray-500">{passwordStrength}%</Text>
                                    </Flex>
                                    <Block className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                                        <Block
                                            as={motion.div}
                                            initial={{ width: 0 }}
                                            animate={{ width: `${passwordStrength}%` }}
                                            className={`h-full ${strengthColor()} transition-all duration-500`}
                                        />
                                    </Block>
                                </Block>
                            )}
                        </Block>

                        <Block className="relative">
                            <Input
                                label="Confirm New Password"
                                type={showPasswords.confirm ? 'text' : 'password'}
                                value={passwordData.confirm}
                                onChange={(e) => setPasswordData({ ...passwordData, confirm: e.target.value })}
                                className="bg-gray-50 border-none h-14 rounded-2xl focus:ring-2 focus:ring-primary pr-12"
                                required
                            />
                            <Block
                                as="button"
                                type="button"
                                onClick={() => toggleVisibility('confirm')}
                                className="absolute right-4 top-[3.2rem] text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                {showPasswords.confirm ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                            </Block>

                            {passwordData.confirm && (
                                <Block
                                    as={motion.div}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="mt-2 flex items-center px-1"
                                >
                                    {passwordData.new === passwordData.confirm ? (
                                        <Text size="xs" weight="bold" className="text-green-600 flex items-center">
                                            <Check className="h-3 w-3 mr-1" /> Passwords match
                                        </Text>
                                    ) : (
                                        <Text size="xs" weight="bold" className="text-red-500 flex items-center">
                                            <CloseIcon className="h-3 w-3 mr-1" /> Passwords do not match
                                        </Text>
                                    )}
                                </Block>
                            )}
                        </Block>
                    </Block>

                    <Block className="bg-primary/5 rounded-3xl p-8 flex flex-col justify-center">
                        <Heading as="h4" size="md" weight="bold" color="text-gray-900" className="mb-4">Password Requirements:</Heading>
                        <Block as="ul" className="space-y-3">
                            {[
                                { label: 'At least 8 characters long', met: passwordData.new.length >= 8 },
                                { label: 'Include at least one uppercase letter', met: /[A-Z]/.test(passwordData.new) },
                                { label: 'Include at least one number', met: /[0-9]/.test(passwordData.new) },
                                { label: 'Include at least one special character', met: /[^A-Za-z0-9]/.test(passwordData.new) },
                            ].map((req, i) => (
                                <Block as="li" key={i} className={`flex items-center text-sm ${req.met ? 'text-green-600 font-bold' : 'text-gray-500'}`}>
                                    <Block className={`p-1 rounded-full mr-3 ${req.met ? 'bg-green-100' : 'bg-gray-200'}`}>
                                        {req.met ? <Check className="h-3 w-3" /> : <Block className="h-3 w-3" />}
                                    </Block>
                                    {req.label}
                                </Block>
                            ))}
                        </Block>
                    </Block>
                </Grid>

                <AnimatePresence>
                    {passwordFeedback && (
                        <Block
                            as={motion.div}
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className={`p-4 rounded-2xl text-sm font-bold ${passwordFeedback.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                }`}
                        >
                            {passwordFeedback.message}
                        </Block>
                    )}
                </AnimatePresence>

                <Flex justify="end" className="pt-4 border-t border-gray-50">
                    <Button
                        type="submit"
                        disabled={isUpdatingPassword || passwordStrength < 100 || passwordData.new !== passwordData.confirm}
                        className="px-12 py-4 rounded-2xl shadow-lg shadow-primary/20"
                    >
                        {isUpdatingPassword ? 'Updating...' : 'Update Password'}
                    </Button>
                </Flex>
            </Block>
        </section>
    );
};
