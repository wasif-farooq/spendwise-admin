import { motion } from 'framer-motion';
import { User, Camera, Save } from 'lucide-react';
import { Input, Button } from '@ui';
import {
    Block,
    Flex,
    Heading,
    Text,
    Grid
} from '@shared';
import { useProfile } from '@/hooks/features/settings/useProfile';

const Profile = () => {
    const {
        firstName,
        setFirstName,
        lastName,
        setLastName,
        email,
        setEmail,
        phone,
        setPhone,
        isSaving,
        handleSave
    } = useProfile();

    return (
        <Block
            as={motion.div}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-12"
        >
            <section>
                <Block className="flex items-center justify-between mb-8">
                    <Block>
                        <Heading as="h2" weight="bold" color="text-gray-900">Profile Information</Heading>
                        <Text color="text-gray-500" className="mt-1">Update your personal details and how others see you.</Text>
                    </Block>
                </Block>

                <Flex as="div" direction="col" align="start" gap={12} className="md:flex-row">
                    <Block className="relative group">
                        <Flex align="center" justify="center" className="h-32 w-32 rounded-3xl bg-primary/10 border-4 border-white shadow-xl overflow-hidden">
                            <User className="h-16 w-16 text-primary" />
                        </Flex>
                        <Button variant="ghost" className="absolute -bottom-2 -right-2 p-3 bg-primary text-white rounded-2xl shadow-lg hover:scale-110 transition-transform active:scale-95">
                            <Camera className="h-5 w-5" />
                        </Button>
                    </Block>

                    <Grid cols={1} gap={6} className="flex-grow sm:grid-cols-2 w-full">
                        <Input
                            label="First Name"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            className="bg-gray-50 border-none focus:ring-2 focus:ring-primary h-14 rounded-2xl"
                        />
                        <Input
                            label="Last Name"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            className="bg-gray-50 border-none focus:ring-2 focus:ring-primary h-14 rounded-2xl"
                        />
                        <Block className="sm:col-span-2">
                            <Input
                                label="Email Address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                type="email"
                                className="bg-gray-50 border-none focus:ring-2 focus:ring-primary h-14 rounded-2xl"
                            />
                        </Block>
                        <Block className="sm:col-span-2">
                            <Input
                                label="Phone Number"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                type="tel"
                                className="bg-gray-50 border-none focus:ring-2 focus:ring-primary h-14 rounded-2xl"
                            />
                        </Block>
                    </Grid>
                </Flex>
            </section>

            <Flex align="center" justify="end" gap={4} className="pt-8 border-t border-gray-100">
                <Button variant="ghost" className="px-8 py-4 text-gray-500 font-bold hover:text-gray-900 transition-colors">
                    Cancel
                </Button>
                <Button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="px-10 py-4 shadow-lg shadow-primary/20 flex items-center gap-2"
                >
                    {isSaving && <Block className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
                    <Save className="h-5 w-5" />
                    {isSaving ? 'Saving...' : 'Save Changes'}
                </Button>
            </Flex>
        </Block>
    );
};

export default Profile;

