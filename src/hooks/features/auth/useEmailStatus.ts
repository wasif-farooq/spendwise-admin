export const useEmailStatus = () => {
    const handleOpenEmailApp = () => {
        window.open('mailto:', '_blank');
    };

    const handleResendEmail = () => {
        // In a real app, this would trigger an API call to resend the verification/reset email
        console.log('Resend email requested');
    };

    return {
        handleOpenEmailApp,
        handleResendEmail
    };
};
