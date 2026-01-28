import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { CreditCard } from 'lucide-react';

export const ResetPasswordForm = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-xl border border-gray-100"
            >
                <div className="text-center">
                    <Link to="/" className="inline-flex items-center mb-6">
                        <CreditCard className="h-10 w-10 text-primary" />
                        <span className="ml-2 text-2xl font-bold text-gray-900">ExpenseFlow</span>
                    </Link>
                    <h2 className="text-3xl font-bold text-gray-900">Set new password</h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Your new password must be different from previously used passwords.
                    </p>
                </div>

                <form className="mt-8 space-y-6">
                    <div className="space-y-4">
                        <Input
                            label="New Password"
                            type="password"
                            placeholder="••••••••"
                            required
                        />
                        <Input
                            label="Confirm Password"
                            type="password"
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    <Button type="submit" className="w-full py-6 text-lg">
                        Reset password
                    </Button>
                </form>
            </motion.div>
        </div>
    );
};
