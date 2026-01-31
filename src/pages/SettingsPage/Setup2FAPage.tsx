import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, CheckCircle2, Copy, Download, RefreshCw, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button, Input } from '@ui';
import {
    Block,
    Flex,
    Heading,
    Text,
    Grid,
    Container
} from '@shared';
import { useSetup2FA } from '@/hooks/features/settings/useSetup2FA';

const Setup2FAPage = () => {
    const {
        method,
        step,
        setStep,
        inputValue,
        setInputValue,
        verificationCode,
        setVerificationCode,
        isVerifying,
        hasCopied,
        hasAcknowledged,
        setHasAcknowledged,
        recoveryCodes,
        handleNextStep,
        copyToClipboard,
        downloadCodes,
        details,
        handleBackToSecurity
    } = useSetup2FA();

    return (
        <Container size="full" className="py-10">
            <Block className="max-w-2xl mx-auto px-4">
                <Link to="/settings/security" className="inline-flex items-center text-sm text-gray-500 hover:text-primary mb-8 transition-colors">
                    <ArrowLeft className="h-4 w-4 mr-2" /> Back to Security
                </Link>

                <Block
                    as={motion.div}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white shadow-sm ring-1 ring-gray-900/5 rounded-[2.5rem] p-10 relative overflow-hidden"
                >
                    <AnimatePresence mode="wait">
                        {step === 1 && (
                            <Block
                                as={motion.div}
                                key="step1"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-8"
                            >
                                <Block className="text-center">
                                    <Block className="bg-primary/10 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6">
                                        <details.icon className="h-10 w-10 text-primary" />
                                    </Block>
                                    <Heading as="h1" size="xl" weight="black" className="text-gray-900">Setup {details.title}</Heading>
                                    <Text color="text-gray-500" className="mt-2">{details.description}</Text>
                                </Block>

                                {method === 'authenticator' ? (
                                    <Block className="space-y-8">
                                        <Flex align="start" gap={6} className="bg-gray-50 p-6 rounded-3xl">
                                            <Block className="bg-white w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 font-bold text-primary shadow-sm">1</Block>
                                            <Block>
                                                <Text weight="bold" color="text-gray-900">Scan the QR Code</Text>
                                                <Text size="sm" color="text-gray-500" className="mt-1">Open your authenticator app (Google Authenticator, Authy, etc.) and scan the code below.</Text>
                                                <Block className="mt-6 w-56 h-56 bg-white rounded-3xl flex items-center justify-center border-2 border-dashed border-gray-200 shadow-inner">
                                                    <Text size="xs" color="text-gray-400" className="font-mono">[QR CODE]</Text>
                                                </Block>
                                            </Block>
                                        </Flex>
                                        <Button onClick={() => setStep(2)} className="w-full py-6 text-lg rounded-2xl font-black">
                                            I've scanned the code
                                        </Button>
                                    </Block>
                                ) : (
                                    <Block className="space-y-8">
                                        <Block className="bg-gray-50 p-8 rounded-3xl">
                                            <Input
                                                label={details.inputLabel!}
                                                placeholder={details.inputPlaceholder}
                                                type={details.inputType}
                                                value={inputValue}
                                                onChange={(e) => setInputValue(e.target.value)}
                                                className="bg-white border-none h-14 rounded-2xl focus:ring-2 focus:ring-primary text-lg"
                                            />
                                        </Block>
                                        <Button
                                            onClick={handleNextStep}
                                            disabled={!inputValue || isVerifying}
                                            className="w-full py-6 text-lg rounded-2xl font-black"
                                        >
                                            {isVerifying ? 'Sending Code...' : 'Send Verification Code'}
                                        </Button>
                                    </Block>
                                )}
                            </Block>
                        )}

                        {step === 2 && (
                            <Block
                                as={motion.div}
                                key="step2"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-8"
                            >
                                <Block className="text-center">
                                    <Block className="bg-primary/10 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6">
                                        <details.icon className="h-10 w-10 text-primary" />
                                    </Block>
                                    <Heading as="h1" size="xl" weight="black" className="text-gray-900">Verify {details.title}</Heading>
                                    <Text color="text-gray-500" className="mt-2">
                                        Enter the 6-digit code we sent to <Text as="span" weight="bold">{method === 'authenticator' ? 'your app' : inputValue}</Text>
                                    </Text>
                                </Block>

                                <Block className="bg-gray-50 p-8 rounded-3xl">
                                    <Input
                                        label="6-digit Code"
                                        placeholder="000 000"
                                        value={verificationCode}
                                        onChange={(e) => setVerificationCode(e.target.value)}
                                        className="text-center text-3xl tracking-[1rem] font-black bg-white border-none h-20 rounded-2xl focus:ring-2 focus:ring-primary"
                                        maxLength={6}
                                    />
                                </Block>

                                <Block className="flex flex-col space-y-4">
                                    <Button
                                        onClick={handleNextStep}
                                        disabled={verificationCode.length !== 6 || isVerifying}
                                        className="w-full py-6 text-lg rounded-2xl font-black"
                                    >
                                        {isVerifying ? 'Verifying...' : 'Verify & Continue'}
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        onClick={() => setStep(1)}
                                        className="text-sm font-bold text-gray-500 hover:text-primary transition-colors"
                                    >
                                        Change {method === 'authenticator' ? 'Method' : details.inputLabel}
                                    </Button>
                                </Block>
                            </Block>
                        )}

                        {step === 3 && (
                            <Block
                                as={motion.div}
                                key="step3"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-8"
                            >
                                <Block className="text-center">
                                    <Block className="bg-primary/10 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6">
                                        <RefreshCw className="h-10 w-10 text-primary" />
                                    </Block>
                                    <Heading as="h1" size="xl" weight="black" className="text-gray-900">Recovery Codes</Heading>
                                    <Text color="text-gray-500" className="mt-2">
                                        Save these codes in a safe place. They can be used to access your account if you lose your 2FA device.
                                    </Text>
                                </Block>

                                <Block className="bg-gray-50 p-8 rounded-[2rem] border border-gray-100">
                                    <Grid cols={2} gap={4}>
                                        {recoveryCodes.map((code, i) => (
                                            <Block key={i} className="bg-white px-4 py-3 rounded-xl text-center font-mono font-bold text-gray-700 shadow-sm border border-gray-100">
                                                {code}
                                            </Block>
                                        ))}
                                    </Grid>

                                    <Flex gap={4} className="mt-8">
                                        <Button
                                            variant="outline"
                                            onClick={copyToClipboard}
                                            className="flex-grow flex items-center justify-center px-6 py-4 bg-white rounded-2xl font-bold text-gray-700 hover:bg-gray-100 transition-all border border-gray-200"
                                        >
                                            {hasCopied ? <Check className="h-5 w-5 mr-2 text-green-600" /> : <Copy className="h-5 w-5 mr-2" />}
                                            {hasCopied ? 'Copied!' : 'Copy Codes'}
                                        </Button>
                                        <Button
                                            variant="outline"
                                            onClick={downloadCodes}
                                            className="flex-grow flex items-center justify-center px-6 py-4 bg-white rounded-2xl font-bold text-gray-700 hover:bg-gray-100 transition-all border border-gray-200"
                                        >
                                            <Download className="h-5 w-5 mr-2" />
                                            Download
                                        </Button>
                                    </Flex>
                                </Block>

                                <Block className="space-y-6">
                                    <label className="flex items-start space-x-4 cursor-pointer group">
                                        <Block className="relative flex items-center mt-1">
                                            <input
                                                type="checkbox"
                                                checked={hasAcknowledged}
                                                onChange={(e) => setHasAcknowledged(e.target.checked)}
                                                className="peer h-6 w-6 cursor-pointer appearance-none rounded-lg border-2 border-gray-200 transition-all checked:border-primary checked:bg-primary"
                                            />
                                            <Check className="absolute h-4 w-4 text-white opacity-0 peer-checked:opacity-100 left-1 transition-opacity pointer-events-none" />
                                        </Block>
                                        <Text size="sm" color="text-gray-600" weight="medium" className="group-hover:text-gray-900 transition-colors">
                                            I have saved these recovery codes in a safe place and understand they are the only way to recover my account if I lose access to my 2FA method.
                                        </Text>
                                    </label>

                                    <Button
                                        onClick={handleNextStep}
                                        disabled={!hasAcknowledged}
                                        className="w-full py-6 text-lg rounded-2xl font-black"
                                    >
                                        Complete Setup
                                    </Button>
                                </Block>
                            </Block>
                        )}

                        {step === 4 && (
                            <Block
                                as={motion.div}
                                key="success"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="text-center space-y-8 py-10"
                            >
                                <Block className="bg-green-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <CheckCircle2 className="h-12 w-12 text-green-600" />
                                </Block>
                                <Block>
                                    <Heading as="h1" size="xl" weight="black" className="text-gray-900">2FA Enabled!</Heading>
                                    <Text color="text-gray-500" className="mt-2">Your account is now secured with {details.title}.</Text>
                                </Block>
                                <Button onClick={handleBackToSecurity} className="w-full py-6 text-lg rounded-2xl font-black">
                                    Back to Security Settings
                                </Button>
                            </Block>
                        )}
                    </AnimatePresence>
                </Block>
            </Block>
        </Container>
    );
};

export default Setup2FAPage;

