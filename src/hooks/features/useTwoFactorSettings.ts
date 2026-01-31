import { Smartphone, MessageSquare, Mail } from 'lucide-react';

export const useTwoFactorSettings = () => {
    // In a real app, this would fetch from an API
    const methods = [
        {
            id: 'authenticator',
            name: 'Authenticator App',
            description: 'Use an app like Google Authenticator or Authy',
            icon: Smartphone,
            enabled: true
        },
        {
            id: 'whatsapp',
            name: 'WhatsApp',
            description: 'Receive codes via WhatsApp',
            icon: MessageSquare,
            enabled: false
        },
        {
            id: 'email',
            name: 'Email',
            description: 'Receive codes via email',
            icon: Mail,
            enabled: false
        },
    ];

    return {
        methods
    };
};
