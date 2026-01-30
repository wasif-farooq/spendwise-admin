import { Info, Sparkles, Camera, Upload } from 'lucide-react';
import { Block, Flex, Heading, Text } from '@shared';
import { Button, Input } from '@ui';

interface IdentityFormProps {
    accountType: 'personal' | 'organization';
    orgName: string;
    setOrgName: (name: string) => void;
    orgIcon: string | null;
    handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    removeIcon: (e: React.MouseEvent) => void;
    fileInputRef: React.RefObject<HTMLInputElement | null>;
}

export const IdentityForm = ({
    accountType,
    orgName,
    setOrgName,
    orgIcon,
    handleFileChange,
    removeIcon,
    fileInputRef
}: IdentityFormProps) => {
    return (
        <Block className="lg:col-span-7 space-y-10">
            <Block className="space-y-8">
                <Flex align="center" gap={3}>
                    <Block className="bg-white p-2.5 rounded-2xl shadow-sm border border-gray-100">
                        <Info className="h-5 w-5 text-primary" />
                    </Block>
                    <Block>
                        <Heading as="h3" weight="black" className="text-lg text-gray-900">
                            {accountType === 'personal' ? 'Personal Identity' : 'Organization Identity'}
                        </Heading>
                        <Text size="sm" color="text-gray-500" weight="medium">Define how you appear across the platform.</Text>
                    </Block>
                </Flex>

                <Block className="space-y-6">
                    <Block className="group/input">
                        <Input
                            label={accountType === 'personal' ? 'Account Name' : 'Organization / Family Name'}
                            value={orgName}
                            onChange={(e) => setOrgName(e.target.value)}
                            placeholder={accountType === 'personal' ? 'e.g. John Doe' : 'e.g. My Family, Acme Corp'}
                            className="bg-white border-2 border-transparent h-20 rounded-[1.5rem] focus:border-primary focus:ring-0 text-2xl font-black px-8 shadow-sm transition-all group-hover/input:shadow-md"
                            required
                        />
                    </Block>

                    <Flex align="start" gap={4} className="bg-blue-50/50 border border-blue-100/50 p-6 rounded-[2rem]">
                        <Block className="bg-blue-100 p-2 rounded-xl mt-0.5">
                            <Sparkles className="h-4 w-4 text-blue-600" />
                        </Block>
                        <Text size="sm" weight="medium" className="text-blue-800 leading-relaxed">
                            <Text as="strong" weight="bold">Pro Tip:</Text> This name will be visible to all members in your {accountType === 'personal' ? 'account' : 'organization'} and will appear on reports and invoices.
                        </Text>
                    </Flex>
                </Block>
            </Block>

            <Block className="space-y-6">
                <Flex align="center" gap={3}>
                    <Block className="bg-white p-2.5 rounded-2xl shadow-sm border border-gray-100">
                        <Camera className="h-5 w-5 text-primary" />
                    </Block>
                    <Heading as="h3" weight="black" className="text-lg text-gray-900">
                        {accountType === 'personal' ? 'Profile Picture' : 'Organization Logo'}
                    </Heading>
                </Flex>

                <Flex direction="col" gap={8} className="sm:flex-row sm:items-center">
                    <Block
                        onClick={() => fileInputRef.current?.click()}
                        className={`relative h-40 w-40 rounded-[2.5rem] border-4 border-dashed transition-all cursor-pointer overflow-hidden flex flex-col items-center justify-center group/upload ${orgIcon
                            ? 'border-primary/20 bg-white shadow-xl shadow-primary/5'
                            : 'border-gray-200 bg-gray-50 hover:border-primary/40 hover:bg-white'
                            }`}
                    >
                        <input
                            ref={fileInputRef}
                            type="file"
                            className="sr-only"
                            accept="image/*"
                            onChange={handleFileChange}
                        />

                        {orgIcon ? (
                            <>
                                <img src={orgIcon} alt="Preview" className="w-full h-full object-cover" />
                                <Block className="absolute inset-0 bg-black/40 opacity-0 group-hover/upload:opacity-100 transition-opacity flex items-center justify-center">
                                    <Block className="bg-white/20 backdrop-blur-md p-3 rounded-2xl border border-white/30">
                                        <Upload className="h-6 w-6 text-white" />
                                    </Block>
                                </Block>
                            </>
                        ) : (
                            <Block className="text-center p-4">
                                <Block className="bg-white p-4 rounded-2xl shadow-sm mb-3 inline-block group-hover/upload:scale-110 group-hover/upload:shadow-md transition-all">
                                    <Upload className="h-6 w-6 text-primary" />
                                </Block>
                                <Text size="xs" weight="black" className="text-gray-900">Upload</Text>
                            </Block>
                        )}
                    </Block>

                    <Block className="flex-1 space-y-4 text-center sm:text-left">
                        <Block className="space-y-1">
                            <Text size="sm" weight="black" className="text-gray-900">Recommended Dimensions</Text>
                            <Text size="xs" color="text-gray-500" weight="medium">Square image, at least 512x512px</Text>
                        </Block>
                        <Flex justify="center" gap={3} className="sm:justify-start flex-wrap">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => fileInputRef.current?.click()}
                                className="px-6 py-2.5 rounded-xl text-xs font-black"
                            >
                                {orgIcon ? 'Change Image' : 'Select Image'}
                            </Button>
                            {orgIcon && (
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={removeIcon}
                                    className="px-6 py-2.5 rounded-xl text-xs font-black text-red-500 border-red-100 hover:bg-red-50"
                                >
                                    Remove
                                </Button>
                            )}
                        </Flex>
                    </Block>
                </Flex>
            </Block>
        </Block>
    );
};
