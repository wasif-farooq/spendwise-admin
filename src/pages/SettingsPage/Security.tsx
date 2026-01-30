import { motion } from 'framer-motion';
import { Block } from '@shared';
import { PasswordChangeForm } from '@/views/Settings/Security/PasswordChangeForm';
import { TwoFactorSection } from '@/views/Settings/Security/TwoFactorSection';
import { RecoveryCodesSection } from '@/views/Settings/Security/RecoveryCodesSection';
import { DangerZone } from '@/views/Settings/Security/DangerZone';

const Security = () => {
    return (
        <Block
            as={motion.div}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-12"
        >
            <PasswordChangeForm />
            <TwoFactorSection />
            <RecoveryCodesSection />
            <DangerZone />
        </Block>
    );
};

export default Security;
