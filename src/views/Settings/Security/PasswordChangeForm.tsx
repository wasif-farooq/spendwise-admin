import { usePasswordChangeForm } from '@/hooks/features/usePasswordChangeForm';
import { motion, AnimatePresence } from 'framer-motion';

import { Lock, Eye, EyeOff, Check, X as CloseIcon } from 'lucide-react';
import { Block, Flex, Heading, Text, Grid } from '@shared';
import { Button, Input } from '@ui';

export const PasswordChangeForm = () => {
    const {
        values,
        handleChange,
        showCurrent,
        showNew,
        showConfirm,
        isUpdatingPassword,
        feedback,
        passwordStrength,
        strengthColor,
        strengthLabel,
        requirements,
        handleUpdatePassword
    } = usePasswordChangeForm();

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
                                type={showCurrent.value ? 'text' : 'password'}
                                name="current"
                                value={values.current}
                                onChange={handleChange}
                                className="bg-gray-50 border-none h-14 rounded-2xl focus:ring-2 focus:ring-primary pr-12"
                                required
                            />
                            <Block
                                as="button"
                                type="button"
                                onClick={showCurrent.toggle}
                                className="absolute right-4 top-[3.2rem] text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                {showCurrent.value ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                            </Block>
                        </Block>

                        <Block className="relative">
                            <Input
                                label="New Password"
                                type={showNew.value ? 'text' : 'password'}
                                name="new"
                                value={values.new}
                                onChange={handleChange}
                                className="bg-gray-50 border-none h-14 rounded-2xl focus:ring-2 focus:ring-primary pr-12"
                                required
                            />
                            <Block
                                as="button"
                                type="button"
                                onClick={showNew.toggle}
                                className="absolute right-4 top-[3.2rem] text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                {showNew.value ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                            </Block>

                            {values.new && (
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
                                type={showConfirm.value ? 'text' : 'password'}
                                name="confirm"
                                value={values.confirm}
                                onChange={handleChange}
                                className="bg-gray-50 border-none h-14 rounded-2xl focus:ring-2 focus:ring-primary pr-12"
                                required
                            />
                            <Block
                                as="button"
                                type="button"
                                onClick={showConfirm.toggle}
                                className="absolute right-4 top-[3.2rem] text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                {showConfirm.value ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                            </Block>

                            {values.confirm && (
                                <Block
                                    as={motion.div}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="mt-2 flex items-center px-1"
                                >
                                    {values.new === values.confirm ? (
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
                            {requirements.map((req: { label: string; met: boolean }, i: number) => (
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
                    {feedback && (
                        <Block
                            as={motion.div}
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className={`p-4 rounded-2xl text-sm font-bold ${feedback.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                }`}
                        >
                            {feedback.message}
                        </Block>
                    )}
                </AnimatePresence>

                <Flex justify="end" className="pt-4 border-t border-gray-50">
                    <Button
                        type="submit"
                        disabled={isUpdatingPassword.value || passwordStrength < 100 || values.new !== values.confirm}
                        className="px-12 py-4 rounded-2xl shadow-lg shadow-primary/20"
                    >
                        {isUpdatingPassword.value ? 'Updating...' : 'Update Password'}
                    </Button>
                </Flex>
            </Block>
        </section>
    );
};
