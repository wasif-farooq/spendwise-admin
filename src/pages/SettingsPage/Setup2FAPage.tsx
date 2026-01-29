import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Smartphone, MessageSquare, Mail, CheckCircle2, Copy, Download, RefreshCw, Check } from 'lucide-react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';

const Setup2FAPage = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const method = searchParams.get('method') || 'authenticator';

    const [step, setStep] = useState(1);
    const [inputValue, setInputValue] = useState('');
    const [verificationCode, setVerificationCode] = useState('');
    const [isVerifying, setIsVerifying] = useState(false);
    const [hasCopied, setHasCopied] = useState(false);
    const [hasAcknowledged, setHasAcknowledged] = useState(false);

    const recoveryCodes = [
        'ABCD-1234', 'EFGH-5678', 'IJKL-9012', 'MNOP-3456',
        'QRST-7890', 'UVWX-1234', 'YZAB-5678', 'CDEF-9012'
    ];

    const handleNextStep = () => {
        if (step === 1) {
            setIsVerifying(true);
            // Simulate sending code
            setTimeout(() => {
                setIsVerifying(false);
                setStep(2);
            }, 1500);
        } else if (step === 2) {
            // Verify code and move to recovery codes
            setIsVerifying(true);
            setTimeout(() => {
                setIsVerifying(false);
                setStep(3); // Recovery codes step
            }, 1500);
        } else {
            // Final step - success
            setStep(4);
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(recoveryCodes.join('\n'));
        setHasCopied(true);
        setTimeout(() => setHasCopied(false), 2000);
    };

    const downloadCodes = () => {
        const element = document.createElement('a');
        const file = new Blob([recoveryCodes.join('\n')], { type: 'text/plain' });
        element.href = URL.createObjectURL(file);
        element.download = 'spendwise-recovery-codes.txt';
        document.body.appendChild(element);
        element.click();
    };

    const getMethodDetails = () => {
        switch (method) {
            case 'whatsapp':
                return {
                    title: 'WhatsApp',
                    icon: MessageSquare,
                    inputLabel: 'WhatsApp Number',
                    inputPlaceholder: '+1 (555) 000-0000',
                    inputType: 'tel',
                    description: 'We will send a 6-digit verification code to your WhatsApp.'
                };
            case 'email':
                return {
                    title: 'Email',
                    icon: Mail,
                    inputLabel: 'Email Address',
                    inputPlaceholder: 'john@example.com',
                    inputType: 'email',
                    description: 'We will send a 6-digit verification code to your email address.'
                };
            default:
                return {
                    title: 'Authenticator App',
                    icon: Smartphone,
                    description: 'Scan the QR code with your authenticator app.'
                };
        }
    };

    const details = getMethodDetails();

    return (
        <div className="max-w-2xl mx-auto py-10 px-4">
            <Link to="/settings/security" className="inline-flex items-center text-sm text-gray-500 hover:text-primary mb-8 transition-colors">
                <ArrowLeft className="h-4 w-4 mr-2" /> Back to Security
            </Link>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white shadow-sm ring-1 ring-gray-900/5 rounded-[2.5rem] p-10 relative overflow-hidden"
            >
                <AnimatePresence mode="wait">
                    {step === 1 && (
                        <motion.div
                            key="step1"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-8"
                        >
                            <div className="text-center">
                                <div className="bg-primary/10 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6">
                                    <details.icon className="h-10 w-10 text-primary" />
                                </div>
                                <h1 className="text-3xl font-bold text-gray-900">Setup {details.title}</h1>
                                <p className="text-gray-500 mt-2">{details.description}</p>
                            </div>

                            {method === 'authenticator' ? (
                                <div className="space-y-8">
                                    <div className="flex items-start space-x-6 bg-gray-50 p-6 rounded-3xl">
                                        <div className="bg-white w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 font-bold text-primary shadow-sm">1</div>
                                        <div>
                                            <p className="font-bold text-gray-900">Scan the QR Code</p>
                                            <p className="text-sm text-gray-500 mt-1">Open your authenticator app (Google Authenticator, Authy, etc.) and scan the code below.</p>
                                            <div className="mt-6 w-56 h-56 bg-white rounded-3xl flex items-center justify-center border-2 border-dashed border-gray-200 shadow-inner">
                                                <span className="text-xs text-gray-400 font-mono">[QR CODE]</span>
                                            </div>
                                        </div>
                                    </div>
                                    <Button onClick={() => setStep(2)} className="w-full py-6 text-lg rounded-2xl">
                                        I've scanned the code
                                    </Button>
                                </div>
                            ) : (
                                <div className="space-y-8">
                                    <div className="bg-gray-50 p-8 rounded-3xl">
                                        <Input
                                            label={details.inputLabel!}
                                            placeholder={details.inputPlaceholder}
                                            type={details.inputType}
                                            value={inputValue}
                                            onChange={(e) => setInputValue(e.target.value)}
                                            className="bg-white border-none h-14 rounded-2xl focus:ring-2 focus:ring-primary text-lg"
                                        />
                                    </div>
                                    <Button
                                        onClick={handleNextStep}
                                        disabled={!inputValue || isVerifying}
                                        className="w-full py-6 text-lg rounded-2xl"
                                    >
                                        {isVerifying ? 'Sending Code...' : 'Send Verification Code'}
                                    </Button>
                                </div>
                            )}
                        </motion.div>
                    )}

                    {step === 2 && (
                        <motion.div
                            key="step2"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-8"
                        >
                            <div className="text-center">
                                <div className="bg-primary/10 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6">
                                    <details.icon className="h-10 w-10 text-primary" />
                                </div>
                                <h1 className="text-3xl font-bold text-gray-900">Verify {details.title}</h1>
                                <p className="text-gray-500 mt-2">
                                    Enter the 6-digit code we sent to {method === 'authenticator' ? 'your app' : inputValue}
                                </p>
                            </div>

                            <div className="bg-gray-50 p-8 rounded-3xl">
                                <Input
                                    label="6-digit Code"
                                    placeholder="000 000"
                                    value={verificationCode}
                                    onChange={(e) => setVerificationCode(e.target.value)}
                                    className="text-center text-3xl tracking-[1rem] font-bold bg-white border-none h-20 rounded-2xl focus:ring-2 focus:ring-primary"
                                    maxLength={6}
                                />
                            </div>

                            <div className="flex flex-col space-y-4">
                                <Button
                                    onClick={handleNextStep}
                                    disabled={verificationCode.length !== 6 || isVerifying}
                                    className="w-full py-6 text-lg rounded-2xl"
                                >
                                    {isVerifying ? 'Verifying...' : 'Verify & Continue'}
                                </Button>
                                <button
                                    onClick={() => setStep(1)}
                                    className="text-sm font-bold text-gray-500 hover:text-primary transition-colors"
                                >
                                    Change {method === 'authenticator' ? 'Method' : details.inputLabel}
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {step === 3 && (
                        <motion.div
                            key="step3"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-8"
                        >
                            <div className="text-center">
                                <div className="bg-primary/10 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6">
                                    <RefreshCw className="h-10 w-10 text-primary" />
                                </div>
                                <h1 className="text-3xl font-bold text-gray-900">Recovery Codes</h1>
                                <p className="text-gray-500 mt-2">
                                    Save these codes in a safe place. They can be used to access your account if you lose your 2FA device.
                                </p>
                            </div>

                            <div className="bg-gray-50 p-8 rounded-[2rem] border border-gray-100">
                                <div className="grid grid-cols-2 gap-4">
                                    {recoveryCodes.map((code, i) => (
                                        <div key={i} className="bg-white px-4 py-3 rounded-xl text-center font-mono font-bold text-gray-700 shadow-sm border border-gray-100">
                                            {code}
                                        </div>
                                    ))}
                                </div>

                                <div className="flex gap-4 mt-8">
                                    <button
                                        onClick={copyToClipboard}
                                        className="flex-grow flex items-center justify-center px-6 py-4 bg-white rounded-2xl font-bold text-gray-700 hover:bg-gray-100 transition-all border border-gray-200"
                                    >
                                        {hasCopied ? <Check className="h-5 w-5 mr-2 text-green-600" /> : <Copy className="h-5 w-5 mr-2" />}
                                        {hasCopied ? 'Copied!' : 'Copy Codes'}
                                    </button>
                                    <button
                                        onClick={downloadCodes}
                                        className="flex-grow flex items-center justify-center px-6 py-4 bg-white rounded-2xl font-bold text-gray-700 hover:bg-gray-100 transition-all border border-gray-200"
                                    >
                                        <Download className="h-5 w-5 mr-2" />
                                        Download
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <label className="flex items-start space-x-4 cursor-pointer group">
                                    <div className="relative flex items-center mt-1">
                                        <input
                                            type="checkbox"
                                            checked={hasAcknowledged}
                                            onChange={(e) => setHasAcknowledged(e.target.checked)}
                                            className="peer h-6 w-6 cursor-pointer appearance-none rounded-lg border-2 border-gray-200 transition-all checked:border-primary checked:bg-primary"
                                        />
                                        <Check className="absolute h-4 w-4 text-white opacity-0 peer-checked:opacity-100 left-1 transition-opacity pointer-events-none" />
                                    </div>
                                    <span className="text-sm text-gray-600 font-medium group-hover:text-gray-900 transition-colors">
                                        I have saved these recovery codes in a safe place and understand they are the only way to recover my account if I lose access to my 2FA method.
                                    </span>
                                </label>

                                <Button
                                    onClick={handleNextStep}
                                    disabled={!hasAcknowledged}
                                    className="w-full py-6 text-lg rounded-2xl"
                                >
                                    Complete Setup
                                </Button>
                            </div>
                        </motion.div>
                    )}

                    {step === 4 && (
                        <motion.div
                            key="success"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-center space-y-8 py-10"
                        >
                            <div className="bg-green-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                                <CheckCircle2 className="h-12 w-12 text-green-600" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900">2FA Enabled!</h1>
                                <p className="text-gray-500 mt-2">Your account is now secured with {details.title}.</p>
                            </div>
                            <Button onClick={() => navigate('/settings/security')} className="w-full py-6 text-lg rounded-2xl">
                                Back to Security Settings
                            </Button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    );
};

export default Setup2FAPage;
