import { Info, Check } from 'lucide-react';
import Select from 'react-select';
import { Block, Flex, Text } from '@shared';
import { Button, Modal, Input } from '@ui';
import { ACCOUNT_TYPES, CURRENCY_OPTIONS, customSelectStyles } from './types';
import type { Account } from './types';

interface AddAccountModalProps {
    isOpen: boolean;
    onClose: () => void;
    selectedType: Account['type'];
    onTypeChange: (type: Account['type']) => void;
    selectedCurrency: any;
    onCurrencyChange: (option: any) => void;
}

export const AddAccountModal = ({
    isOpen,
    onClose,
    selectedType,
    onTypeChange,
    selectedCurrency,
    onCurrencyChange
}: AddAccountModalProps) => {
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Add New Account"
            maxWidth="max-w-2xl"
        >
            <form className="space-y-8" onSubmit={(e) => { e.preventDefault(); onClose(); }}>
                <Block className="space-y-4">
                    <Flex align="center" justify="between" className="px-1">
                        <Text size="xs" weight="black" color="text-gray-400" className="uppercase tracking-widest">Select Account Type</Text>
                        <Flex align="center" gap={1} className="text-primary">
                            <Info size={14} />
                            <Text size="xs" weight="bold">Choose how you'll use this account</Text>
                        </Flex>
                    </Flex>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {ACCOUNT_TYPES.map((type) => (
                            <button
                                key={type.id}
                                type="button"
                                onClick={() => onTypeChange(type.id)}
                                className={`relative flex items-center gap-4 p-4 rounded-3xl border-2 transition-all text-left group ${selectedType === type.id
                                    ? 'border-primary bg-primary/5 ring-4 ring-primary/10'
                                    : 'border-gray-100 hover:border-gray-200 hover:bg-gray-50'
                                    }`}
                            >
                                <Block className={`h-12 w-12 rounded-2xl flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110 ${type.bg} ${type.color}`}>
                                    <type.icon size={24} />
                                </Block>
                                <Block className="flex-1 min-w-0">
                                    <Text size="sm" weight="black" className={`truncate ${selectedType === type.id ? 'text-primary' : 'text-gray-900'}`}>{type.name}</Text>
                                    <Text size="xs" weight="bold" color="text-gray-500" className="truncate">{type.description}</Text>
                                </Block>
                                {selectedType === type.id && (
                                    <div className="absolute top-3 right-3 h-5 w-5 bg-primary text-white rounded-full flex items-center justify-center shadow-lg shadow-primary/20">
                                        <Check size={12} strokeWidth={4} />
                                    </div>
                                )}
                            </button>
                        ))}
                    </div>
                </Block>

                <Block className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Block className="space-y-2">
                            <Input label="Account Name" placeholder="e.g. Personal Savings" required />
                            <Text size="xs" weight="bold" color="text-gray-400" className="ml-1">Give your account a recognizable name</Text>
                        </Block>
                        <Block className="space-y-2">
                            <Text size="xs" weight="black" color="text-gray-400" className="uppercase tracking-widest ml-1">Currency</Text>
                            <Select
                                options={CURRENCY_OPTIONS}
                                styles={customSelectStyles}
                                value={selectedCurrency}
                                onChange={onCurrencyChange}
                                placeholder="Select Currency"
                                isSearchable
                            />
                        </Block>
                    </div>

                    <Block className="space-y-2">
                        <Input label="Initial Balance" type="number" placeholder="0.00" required />
                        <Flex align="center" gap={2} className="ml-1">
                            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                            <Text size="xs" weight="bold" color="text-gray-400">This will be your starting balance for tracking</Text>
                        </Flex>
                    </Block>
                </Block>

                <Flex direction="col" gap={4} className="sm:flex-row pt-4">
                    <Button variant="outline" className="flex-1 rounded-2xl py-4" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button type="submit" className="flex-1 rounded-2xl py-4 shadow-xl shadow-primary/20">
                        Create Account
                    </Button>
                </Flex>
            </form>
        </Modal>
    );
};
