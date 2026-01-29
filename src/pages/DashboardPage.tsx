import { motion } from 'framer-motion';
import {
    TrendingUp,
    TrendingDown,
    Wallet,
    PieChart,
    Calendar
} from 'lucide-react';

const DashboardPage = () => {
    const stats = [
        { name: 'Total Balance', value: '$12,450.00', change: '+12.5%', icon: Wallet, color: 'text-blue-600', bg: 'bg-blue-50' },
        { name: 'Monthly Income', value: '$4,200.00', change: '+8.2%', icon: TrendingUp, color: 'text-green-600', bg: 'bg-green-50' },
        { name: 'Monthly Expenses', value: '$2,150.00', change: '-4.1%', icon: TrendingDown, color: 'text-red-600', bg: 'bg-red-50' },
    ];

    return (
        <div className="p-8 max-w-7xl mx-auto space-y-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <h1 className="text-3xl font-bold text-gray-900">Overview</h1>
                <p className="text-gray-500 mt-1">Welcome back, John! Here's what's happening today.</p>
            </motion.div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {stats.map((stat, index) => (
                    <motion.div
                        key={stat.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
                    >
                        <div className="flex items-center justify-between">
                            <div className={`${stat.bg} p-3 rounded-2xl`}>
                                <stat.icon className={`h-6 w-6 ${stat.color}`} />
                            </div>
                            <span className={`text-xs font-bold px-2 py-1 rounded-full ${stat.change.startsWith('+') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                }`}>
                                {stat.change}
                            </span>
                        </div>
                        <div className="mt-4">
                            <p className="text-sm font-medium text-gray-500">{stat.name}</p>
                            <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Charts & Recent Activity Placeholders */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 }}
                    className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm h-80 flex flex-col"
                >
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-bold text-gray-900 flex items-center">
                            <PieChart className="h-5 w-5 mr-2 text-primary" />
                            Spending Analysis
                        </h3>
                        <button className="text-sm text-primary font-semibold hover:underline">View Details</button>
                    </div>
                    <div className="flex-grow bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 flex items-center justify-center">
                        <span className="text-gray-400 font-medium">Chart Visualization Placeholder</span>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 }}
                    className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm h-80 flex flex-col"
                >
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-bold text-gray-900 flex items-center">
                            <Calendar className="h-5 w-5 mr-2 text-primary" />
                            Recent Transactions
                        </h3>
                        <button className="text-sm text-primary font-semibold hover:underline">See All</button>
                    </div>
                    <div className="space-y-4">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-2xl transition-colors cursor-pointer">
                                <div className="flex items-center">
                                    <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 font-bold">
                                        {i}
                                    </div>
                                    <div className="ml-3">
                                        <p className="text-sm font-bold text-gray-900">Transaction {i}</p>
                                        <p className="text-xs text-gray-500">Jan 29, 2026</p>
                                    </div>
                                </div>
                                <p className="text-sm font-bold text-red-600">-$45.00</p>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default DashboardPage;
