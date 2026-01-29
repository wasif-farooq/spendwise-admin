import { motion } from 'framer-motion';
import { User, Camera, Mail, Phone, MapPin } from 'lucide-react';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';

const Profile = () => {
    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-12"
        >
            <section>
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">Profile Information</h2>
                        <p className="text-gray-500 mt-1">Update your personal details and how others see you.</p>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row items-start gap-12">
                    <div className="relative group">
                        <div className="h-32 w-32 rounded-3xl bg-primary/10 flex items-center justify-center border-4 border-white shadow-xl overflow-hidden">
                            <User className="h-16 w-16 text-primary" />
                        </div>
                        <button className="absolute -bottom-2 -right-2 p-3 bg-primary text-white rounded-2xl shadow-lg hover:scale-110 transition-transform active:scale-95">
                            <Camera className="h-5 w-5" />
                        </button>
                    </div>

                    <div className="flex-grow grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
                        <Input label="First Name" defaultValue="John" className="bg-gray-50 border-none focus:ring-2 focus:ring-primary h-14 rounded-2xl" />
                        <Input label="Last Name" defaultValue="Doe" className="bg-gray-50 border-none focus:ring-2 focus:ring-primary h-14 rounded-2xl" />
                        <div className="sm:col-span-2">
                            <Input label="Email Address" defaultValue="john@example.com" type="email" className="bg-gray-50 border-none focus:ring-2 focus:ring-primary h-14 rounded-2xl" />
                        </div>
                        <div className="sm:col-span-2">
                            <Input label="Phone Number" defaultValue="+1 (555) 000-0000" type="tel" className="bg-gray-50 border-none focus:ring-2 focus:ring-primary h-14 rounded-2xl" />
                        </div>
                    </div>
                </div>
            </section>

            <div className="pt-8 flex items-center justify-end space-x-4 border-t border-gray-100">
                <button className="px-8 py-4 text-gray-500 font-bold hover:text-gray-900 transition-colors">
                    Cancel
                </button>
                <button className="px-10 py-4 bg-primary text-white font-bold rounded-2xl shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all active:scale-95">
                    Save Changes
                </button>
            </div>
        </motion.div>
    );
};

export default Profile;
