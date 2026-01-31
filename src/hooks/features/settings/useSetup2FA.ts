import { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Smartphone, MessageSquare, Mail } from 'lucide-react';

export const useSetup2FA = () => {
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

    const handleBackToSecurity = () => {
        navigate('/settings/security');
    };

    return {
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
    };
};
