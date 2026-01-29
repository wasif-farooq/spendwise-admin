import { motion, AnimatePresence } from 'framer-motion';
import { UserPlus, Shield, Trash2, Edit2, X, Check, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useMemo } from 'react';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { Modal } from '../../components/Modal';

const Members = () => {
    const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
    const [inviteEmail, setInviteEmail] = useState('');
    const [inviteRole, setInviteRole] = useState('member');
    const [isInviting, setIsInviting] = useState(false);
    const [feedback, setFeedback] = useState<{ type: 'success' | 'error', message: string } | null>(null);

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    // Mock data for members
    const [members] = useState([
        { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', isCurrentUser: true },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Member', isCurrentUser: false },
        { id: 3, name: 'Mike Johnson', email: 'mike@example.com', role: 'Viewer', isCurrentUser: false },
        { id: 4, name: 'Sarah Wilson', email: 'sarah@example.com', role: 'Member', isCurrentUser: false },
        { id: 5, name: 'Alex Brown', email: 'alex@example.com', role: 'Member', isCurrentUser: false },
        { id: 6, name: 'David Miller', email: 'david@example.com', role: 'Viewer', isCurrentUser: false },
        { id: 7, name: 'Emma Davis', email: 'emma@example.com', role: 'Member', isCurrentUser: false },
        { id: 8, name: 'Chris Evans', email: 'chris@example.com', role: 'Member', isCurrentUser: false },
    ]);

    // Pagination logic
    const totalPages = Math.ceil(members.length / itemsPerPage);
    const paginatedMembers = useMemo(() => {
        const start = (currentPage - 1) * itemsPerPage;
        return members.slice(start, start + itemsPerPage);
    }, [currentPage, members]);

    const handleInvite = (e: React.FormEvent) => {
        e.preventDefault();
        setIsInviting(true);
        setFeedback(null);

        // Simulate API call
        setTimeout(() => {
            setIsInviting(false);
            setFeedback({ type: 'success', message: `Invitation sent to ${inviteEmail}!` });
            setInviteEmail('');
            setTimeout(() => {
                setIsInviteModalOpen(false);
                setFeedback(null);
            }, 1500);
        }, 1500);
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-12"
        >
            <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div>
                    <h2 className="text-3xl font-black text-gray-900 tracking-tight">Team Members</h2>
                    <p className="text-gray-500 mt-1 font-medium">Manage your organization's members and their roles.</p>
                </div>
                <Button
                    onClick={() => setIsInviteModalOpen(true)}
                    className="px-8 py-4 rounded-2xl shadow-xl shadow-primary/20 flex items-center justify-center"
                >
                    <UserPlus className="h-5 w-5 mr-2" />
                    Invite Member
                </Button>
            </header>

            <div className="bg-gray-50/50 rounded-[3rem] border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-gray-200/60">
                                <th className="px-8 py-6 text-xs font-black text-gray-400 uppercase tracking-widest">Member</th>
                                <th className="px-8 py-6 text-xs font-black text-gray-400 uppercase tracking-widest">Role</th>
                                <th className="px-8 py-6 text-xs font-black text-gray-400 uppercase tracking-widest text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {paginatedMembers.map((member) => (
                                <tr key={member.id} className="group hover:bg-white transition-colors">
                                    <td className="px-8 py-6">
                                        <div className="flex items-center">
                                            <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary font-bold text-lg mr-4 border border-primary/20">
                                                {member.name.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="font-bold text-gray-900 flex items-center">
                                                    {member.name}
                                                    {member.isCurrentUser && (
                                                        <span className="ml-2 px-2 py-0.5 bg-primary/10 text-primary text-[10px] font-black uppercase tracking-wider rounded-md">
                                                            You
                                                        </span>
                                                    )}
                                                </p>
                                                <p className="text-sm text-gray-500 font-medium">{member.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex items-center">
                                            <div className={`p-1.5 rounded-lg mr-2 ${member.role === 'Admin' ? 'bg-purple-100 text-purple-600' :
                                                    member.role === 'Member' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'
                                                }`}>
                                                <Shield className="h-3.5 w-3.5" />
                                            </div>
                                            <span className="text-sm font-bold text-gray-700">{member.role}</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6 text-right">
                                        <div className="flex items-center justify-end space-x-2">
                                            <button
                                                disabled={member.isCurrentUser}
                                                className={`p-2 rounded-xl transition-all ${member.isCurrentUser
                                                        ? 'text-gray-300 cursor-not-allowed'
                                                        : 'text-gray-400 hover:bg-gray-100 hover:text-primary'
                                                    }`}
                                            >
                                                <Edit2 className="h-5 w-5" />
                                            </button>
                                            <button
                                                disabled={member.isCurrentUser}
                                                className={`p-2 rounded-xl transition-all ${member.isCurrentUser
                                                        ? 'text-gray-300 cursor-not-allowed'
                                                        : 'text-gray-400 hover:bg-red-50 hover:text-red-600'
                                                    }`}
                                            >
                                                <Trash2 className="h-5 w-5" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination UI */}
                <div className="px-8 py-6 border-t border-gray-100 flex items-center justify-between bg-white/50">
                    <p className="text-sm text-gray-500 font-medium">
                        Showing <span className="font-bold text-gray-900">{(currentPage - 1) * itemsPerPage + 1}</span> to <span className="font-bold text-gray-900">{Math.min(currentPage * itemsPerPage, members.length)}</span> of <span className="font-bold text-gray-900">{members.length}</span> members
                    </p>
                    <div className="flex items-center space-x-2">
                        <button
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className="p-2 rounded-xl border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                        >
                            <ChevronLeft className="h-5 w-5" />
                        </button>
                        {[...Array(totalPages)].map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setCurrentPage(i + 1)}
                                className={`w-10 h-10 rounded-xl text-sm font-bold transition-all ${currentPage === i + 1
                                        ? 'bg-primary text-white shadow-lg shadow-primary/20'
                                        : 'text-gray-500 hover:bg-gray-50 border border-transparent hover:border-gray-200'
                                    }`}
                            >
                                {i + 1}
                            </button>
                        ))}
                        <button
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                            className="p-2 rounded-xl border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                        >
                            <ChevronRight className="h-5 w-5" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Invite Modal */}
            <Modal
                isOpen={isInviteModalOpen}
                onClose={() => setIsInviteModalOpen(false)}
                title="Invite New Member"
            >
                <form onSubmit={handleInvite} className="space-y-8">
                    <div className="space-y-6">
                        <Input
                            label="Email Address"
                            type="email"
                            placeholder="colleague@example.com"
                            value={inviteEmail}
                            onChange={(e) => setInviteEmail(e.target.value)}
                            className="bg-gray-50 border-none h-14 rounded-2xl focus:ring-2 focus:ring-primary"
                            required
                        />

                        <div className="space-y-3">
                            <label className="text-sm font-bold text-gray-700 px-1">Select Role</label>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                {['Member', 'Admin', 'Viewer'].map((role) => (
                                    <button
                                        key={role}
                                        type="button"
                                        onClick={() => setInviteRole(role.toLowerCase())}
                                        className={`p-4 rounded-2xl border-2 transition-all text-sm font-bold ${inviteRole === role.toLowerCase()
                                                ? 'border-primary bg-primary/5 text-primary'
                                                : 'border-gray-100 bg-gray-50 text-gray-500 hover:border-gray-200'
                                            }`}
                                    >
                                        {role}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <AnimatePresence>
                        {feedback && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className={`p-4 rounded-2xl text-sm font-bold flex items-center ${feedback.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                    }`}
                            >
                                {feedback.type === 'success' ? <Check className="h-4 w-4 mr-2" /> : <X className="h-4 w-4 mr-2" />}
                                {feedback.message}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-gray-100">
                        <Button
                            variant="outline"
                            type="button"
                            onClick={() => setIsInviteModalOpen(false)}
                            className="flex-grow py-4 rounded-2xl"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={isInviting || !inviteEmail}
                            className="flex-grow py-4 rounded-2xl shadow-lg shadow-primary/20"
                        >
                            {isInviting ? 'Sending...' : 'Send Invitation'}
                        </Button>
                    </div>
                </form>
            </Modal>
        </motion.div>
    );
};

export default Members;
