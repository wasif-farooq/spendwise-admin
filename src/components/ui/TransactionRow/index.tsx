import { motion } from 'framer-motion';
import { History, MoreVertical, type LucideIcon } from 'lucide-react';
import { Flex, Text, Inline, Block } from '@shared';

interface TransactionRowProps {
    transaction: {
        id: string;
        description: string;
        category: string;
        date: string;
        status: string;
        amount: number;
        type: string;
        icon: LucideIcon;
        color: string;
    };
    onViewHistory: (t: any) => void;
}

export const TransactionRow = ({ transaction: t, onViewHistory }: TransactionRowProps) => {
    return (
        <motion.tr
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="group hover:bg-gray-50/50 transition-colors"
        >
            <td className="px-8 py-6">
                <Flex align="center" gap={4}>
                    <Block className={`h-12 w-12 rounded-xl flex items-center justify-center text-white shadow-lg ${t.color} group-hover:scale-110 transition-transform`}>
                        <t.icon size={20} />
                    </Block>
                    <Text weight="black" color="text-gray-900">{t.description}</Text>
                </Flex>
            </td>
            <td className="px-8 py-6">
                <Inline className="px-4 py-2 bg-gray-100 rounded-full text-[10px] font-black text-gray-500 uppercase tracking-widest">
                    {t.category}
                </Inline>
            </td>
            <td className="px-8 py-6">
                <Text size="sm" weight="bold" color="text-gray-500">{t.date}</Text>
            </td>
            <td className="px-8 py-6">
                <Flex align="center" gap={1.5} className={`text-[10px] font-black uppercase tracking-widest ${t.status === 'completed' ? 'text-emerald-600' : 'text-amber-600'
                    }`}>
                    <Block className={`w-1.5 h-1.5 rounded-full ${t.status === 'completed' ? 'bg-emerald-500' : 'bg-amber-500 animate-pulse'
                        }`} />
                    {t.status}
                </Flex>
            </td>
            <td className="px-8 py-6 text-right">
                <Text size="lg" weight="black" className={t.type === 'income' ? 'text-emerald-600' : 'text-gray-900'}>
                    {t.type === 'income' ? '+' : '-'}${t.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </Text>
            </td>
            <td className="px-8 py-6 text-right">
                <Flex align="center" justify="end" gap={2}>
                    <button
                        onClick={() => onViewHistory(t)}
                        className="p-2 text-gray-400 hover:text-primary hover:bg-primary/5 rounded-xl transition-all"
                        title="Modification History"
                    >
                        <History size={20} />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-primary hover:bg-primary/5 rounded-xl transition-all">
                        <MoreVertical size={20} />
                    </button>
                </Flex>
            </td>
        </motion.tr>
    );
};
