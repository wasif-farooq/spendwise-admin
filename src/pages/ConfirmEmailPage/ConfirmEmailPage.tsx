import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, ArrowLeft } from 'lucide-react';
import { Button } from '@ui';
import {
    Block,
    Flex,
    Heading,
    Text,
    Container
} from '@shared';

const ConfirmEmailPage = () => {
    return (
        <Container as="div" size="full" className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <Block
                as={motion.div}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-xl border border-gray-100 text-center"
            >
                <Flex justify="center" className="mx-auto h-16 w-16 rounded-full bg-green-100">
                    <Mail className="h-8 w-8 text-green-600" />
                </Flex>

                <Heading as="h2" size="3xl" weight="bold" color="text-gray-900" className="mt-6">Confirm your email</Heading>

                <Text size="sm" color="text-gray-600" className="mt-2">
                    We sent a verification link to your email address. Please verify your email to continue.
                </Text>

                <Block className="mt-8 space-y-4">
                    <Button
                        onClick={() => window.open('mailto:', '_blank')}
                        className="w-full py-4 text-lg"
                    >
                        Open Email App
                    </Button>

                    <Text size="sm" color="text-gray-500">
                        Didn't receive the email?{' '}
                        <button className="font-medium text-primary hover:underline">
                            Click to resend
                        </button>
                    </Text>
                </Block>

                <Block className="mt-6">
                    <Link
                        to="/login"
                        className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-primary transition-colors"
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to login
                    </Link>
                </Block>
            </Block>
        </Container>
    );
};

export default ConfirmEmailPage;
