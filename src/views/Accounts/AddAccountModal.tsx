import { Info, Check } from 'lucide-react';
import Select from 'react-select';
import { Block, Flex, Text, Grid } from '@shared';
import { Button, Modal, Input } from '@ui';
import { customSelectStyles } from './types';
import { useAccountForm } from '@/hooks/features/accounts/useAccountForm';
import { type Account } from './types';

interface AddAccountModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const AddAccountModal = ({
    isOpen,
    onClose
}: AddAccountModalProps) => {
    const {
        register,
        handleSubmit,
        selectedType,
        setSelectedType,
        selectedCurrency,
        setSelectedCurrency,
        onSubmit,
        accountTypes,
        currencyOptions
    } = useAccountForm(onClose);

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Add New Account"
            maxWidth="max-w-2xl"
        >
            <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
                <Block className="space-y-4">
                    <Flex align="center" justify="between" className="px-1">
                        <Text size="xs" weight="black" color="text-gray-400" className="uppercase tracking-widest">Select Account Type</Text>
                        <Flex align="center" gap={1} className="text-primary">
                            <Info size={14} />
                            <Text size="xs" weight="bold">Choose how you'll use this account</Text>
                        </Flex>
                    </Flex>
                    <Grid cols={1} gap={4} className="sm:grid-cols-2">
                        {accountTypes.map((type) => (
                            <Block
                                as="button"
                                key={type.id}
                                type="button"
                                onClick={() => setSelectedType(type.id as Account['type'])}
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
                                    <Block className="absolute top-3 right-3 h-5 w-5 bg-primary text-white rounded-full flex items-center justify-center shadow-lg shadow-primary/20">
                                        <Check size={12} strokeWidth={4} />
                                    </Block>
                                )}
                            </Block>
                        ))}
                    </Grid>
                </Block>

                <Block className="space-y-6">
                    <Grid cols={1} gap={6} className="md:grid-cols-2">
                        <Block className="space-y-2">
                            <Input
                                label="Account Name"
                                placeholder="e.g. Personal Savings"
                                {...register('name', { required: true })}
                            />
                            <Text size="xs" weight="bold" color="text-gray-400" className="ml-1">Give your account a recognizable name</Text>
                        </Block>
                        <Block className="space-y-2">
                            <Text size="xs" weight="black" color="text-gray-400" className="uppercase tracking-widest ml-1">Currency</Text>
                            <Select
                                options={currencyOptions}
                                styles={customSelectStyles}
                                value={selectedCurrency}
                                onChange={(option: any) => setSelectedCurrency(option)}
                                placeholder="Select Currency"
                                isSearchable
                            />
                        </Block>
                    </Grid>

                    <Block className="space-y-2">
                        <Input
                            label="Initial Balance"
                            type="number"
                            placeholder="0.00"
                            {...register('balance', { required: true, valueAsNumber: true })}
                        />
                        <Flex align="center" gap={2} className="ml-1">
                            <Block className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                            <Text size="xs" weight="bold" color="text-gray-400">This will be your starting balance for tracking</Text>
                        </Flex>
                    </Block>
                </Block>

                <Flex direction="col" gap={4} className="sm:flex-row pt-4">
                    <Button variant="outline" className="flex-1 rounded-2xl py-4" onClick={onClose} type="button">
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
