import { useState } from 'react';
import {
    Settings,
    Shield,
    Bell,
    Database,
    Globe,
    Zap,
    Save,
    RotateCcw,
    AlertCircle,
    Server,
    Key
} from 'lucide-react';
import { Block, Flex, Text } from '@shared';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';

export const AdminSettingsPage = () => {
    return (
        <Block className="space-y-8">
            <Flex justify="between" align="end">
                <Block>
                    <Text as="h1" className="text-2xl font-bold text-gray-900">System Settings</Text>
                    <Text className="text-gray-500">Configure global parameters and administrative preferences</Text>
                </Block>
                <Flex gap={2}>
                    <Button variant="outline" className="gap-2">
                        <RotateCcw size={18} />
                        Reset Changes
                    </Button>
                    <Button className="gap-2">
                        <Save size={18} />
                        Save All Changes
                    </Button>
                </Flex>
            </Flex>

            <Block className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                {/* General Configuration */}
                <Block className="xl:col-span-2 space-y-6">
                    <Card className="p-6">
                        <Flex align="center" gap={3} className="mb-6">
                            <Block className="bg-gray-100 p-2 rounded-xl">
                                <Globe size={20} className="text-gray-600" />
                            </Block>
                            <Text className="font-bold text-lg text-gray-900">General Configuration</Text>
                        </Flex>

                        <Block className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Block className="space-y-2">
                                <Text className="text-sm font-medium text-gray-700">App Name</Text>
                                <Input defaultValue="SpendWise Admin" />
                            </Block>
                            <Block className="space-y-2">
                                <Text className="text-sm font-medium text-gray-700">Support Email</Text>
                                <Input defaultValue="support@spendwise.com" />
                            </Block>
                            <Block className="space-y-2">
                                <Text className="text-sm font-medium text-gray-700">Default Currency</Text>
                                <Input defaultValue="USD" />
                            </Block>
                            <Block className="space-y-2">
                                <Text className="text-sm font-medium text-gray-700">System Language</Text>
                                <Input defaultValue="English (US)" />
                            </Block>
                        </Block>
                    </Card>

                    <Card className="p-6">
                        <Flex align="center" gap={3} className="mb-6">
                            <Block className="bg-blue-100 p-2 rounded-xl">
                                <Zap size={20} className="text-blue-600" />
                            </Block>
                            <Text className="font-bold text-lg text-gray-900">Performance & API</Text>
                        </Flex>

                        <Block className="space-y-6">
                            <Block className="space-y-2">
                                <Text className="text-sm font-medium text-gray-700">Global Rate Limit (requests/min)</Text>
                                <Input type="number" defaultValue="1000" />
                                <Text className="text-xs text-gray-400 italic">Recommended value: 500-2000</Text>
                            </Block>
                            <Block className="space-y-2">
                                <Text className="text-sm font-medium text-gray-700">Cache TTL (seconds)</Text>
                                <Input type="number" defaultValue="3600" />
                            </Block>
                        </Block>
                    </Card>

                    <Card className="p-6">
                        <Flex align="center" gap={3} className="mb-6">
                            <Block className="bg-red-50 p-2 rounded-xl">
                                <AlertCircle size={20} className="text-red-600" />
                            </Block>
                            <Text className="font-bold text-lg text-red-900">Maintenance Mode</Text>
                        </Flex>

                        <Block className="bg-red-50/50 border border-red-100 rounded-2xl p-6">
                            <Flex justify="between" align="center">
                                <Block className="space-y-1">
                                    <Text className="font-bold text-gray-900">Enable Maintenance Mode</Text>
                                    <Text className="text-sm text-gray-500">Redirect all users to a maintenance page except admins.</Text>
                                </Block>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" className="sr-only peer" />
                                    <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-red-600"></div>
                                </label>
                            </Flex>
                        </Block>
                    </Card>
                </Block>

                {/* Sidebar Config: Security and Server */}
                <Block className="space-y-6">
                    <Card className="p-6">
                        <Flex align="center" gap={3} className="mb-6">
                            <Block className="bg-purple-100 p-2 rounded-xl">
                                <Shield size={20} className="text-purple-600" />
                            </Block>
                            <Text className="font-bold text-gray-900">Security Policies</Text>
                        </Flex>
                        <Block className="space-y-4">
                            <Button variant="outline" className="w-full justify-start gap-3">
                                <Key size={16} />
                                Password Requirements
                            </Button>
                            <Button variant="outline" className="w-full justify-start gap-3">
                                <Shield size={16} />
                                2FA Mandatory Roles
                            </Button>
                            <Button variant="outline" className="w-full justify-start gap-3">
                                <Bell size={16} />
                                Login Notifications
                            </Button>
                        </Block>
                    </Card>

                    <Card className="p-6">
                        <Flex align="center" gap={3} className="mb-6">
                            <Block className="bg-green-100 p-2 rounded-xl">
                                <Server size={20} className="text-green-600" />
                            </Block>
                            <Text className="font-bold text-gray-900">System Health</Text>
                        </Flex>
                        <Block className="space-y-3">
                            <Flex justify="between" className="text-sm">
                                <Text className="text-gray-500">Database Version</Text>
                                <Text className="font-bold">PostgreSQL 14.2</Text>
                            </Flex>
                            <Flex justify="between" className="text-sm">
                                <Text className="text-gray-500">Storage Used</Text>
                                <Text className="font-bold text-amber-600">84% (4.2 GB)</Text>
                            </Flex>
                            <Flex justify="between" className="text-sm">
                                <Text className="text-gray-500">API Latency</Text>
                                <Text className="font-bold text-green-600">~24ms</Text>
                            </Flex>
                            <Button variant="ghost" className="w-full mt-4 text-xs flex items-center gap-2">
                                <Database size={14} />
                                Database Console
                            </Button>
                        </Block>
                    </Card>
                </Block>
            </Block>
        </Block>
    );
};
