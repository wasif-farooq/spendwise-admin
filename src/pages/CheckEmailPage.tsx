import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, ArrowLeft } from 'lucide-react';
import { Button } from '../components/Button';

const CheckEmailPage = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-xl border border-gray-100 text-center"
            >
                <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-blue-100">
                    <Mail className="h-8 w-8 text-primary" />
                </div>

                <h2 className="mt-6 text-3xl font-bold text-gray-900">Check your email</h2>

                <p className="mt-2 text-sm text-gray-600">
                    We sent a password reset link to your email. Please check your inbox and follow the instructions.
                </p>

                <div className="mt-8 space-y-4">
                    <Button
                        onClick={() => window.open('mailto:', '_blank')}
                        className="w-full py-4 text-lg"
                    >
                        Open Email App
                    </Button>

                    <div className="text-sm text-gray-500">
                        Didn't receive the email?{' '}
                        <button className="font-medium text-primary hover:underline">
                            Click to resend
                        </button>
                    </div>
                </div>

                <div className="mt-6">
                    <Link
                        to="/login"
                        className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-primary transition-colors"
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to login
                    </Link>
                </div>
            </motion.div>
        </div>
    );
};

export default CheckEmailPage;
