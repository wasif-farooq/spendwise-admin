import { Shield, UserPlus, Settings, CheckCircle2 } from 'lucide-react';
import { Block, Flex, Grid, AnimatedBlock, Heading, Text } from '@shared';

export const Organization = () => {
    return (
        <section id="organization" className="py-20 bg-gray-50 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <Grid cols={1} className="lg:grid-cols-2" gap={16} align="center">
                    <AnimatedBlock
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <Heading as="h2" size="3xl" weight="bold" color="text-gray-900" className="mb-6">Built for Teams and Organizations</Heading>
                        <Text size="lg" color="text-gray-600" className="mb-8">
                            Manage your company's expenses with granular control. Invite team members, set permissions, and maintain a clear audit trail of every transaction.
                        </Text>

                        <Block className="space-y-6">
                            {[
                                {
                                    title: 'Granular Permissions',
                                    description: 'Assign Admin, Editor, or Viewer roles to team members.',
                                    icon: Shield,
                                },
                                {
                                    title: 'Easy Invitations',
                                    description: 'Invite members via email and get them onboarded in seconds.',
                                    icon: UserPlus,
                                },
                                {
                                    title: 'Centralized Management',
                                    description: 'Control all accounts and cards from a single organization dashboard.',
                                    icon: Settings,
                                },
                            ].map((item, index) => (
                                <Flex key={index} gap={4}>
                                    <Block className="flex-shrink-0 h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                                        <item.icon className="h-5 w-5 text-primary" />
                                    </Block>
                                    <Block>
                                        <Heading as="h3" size="sm" weight="semibold" color="text-gray-900">{item.title}</Heading>
                                        <Text size="sm" color="text-gray-600">{item.description}</Text>
                                    </Block>
                                </Flex>
                            ))}
                        </Block>
                    </AnimatedBlock>

                    <AnimatedBlock
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="relative"
                    >
                        <Block className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
                            <Flex justify="between" align="center" className="mb-8">
                                <Heading as="h3" weight="bold" color="text-gray-900">Team Members</Heading>
                                <button className="text-primary text-sm font-medium hover:underline">+ Invite Member</button>
                            </Flex>

                            <Block className="space-y-4">
                                {[
                                    { name: 'Alex Johnson', role: 'Admin', email: 'alex@company.com', status: 'Active' },
                                    { name: 'Sarah Chen', role: 'Editor', email: 'sarah@company.com', status: 'Active' },
                                    { name: 'Mike Ross', role: 'Viewer', email: 'mike@company.com', status: 'Pending' },
                                ].map((member, index) => (
                                    <Flex key={index} align="center" justify="between" className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                                        <Flex align="center" gap={3}>
                                            <Block className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary">
                                                {member.name[0]}
                                            </Block>
                                            <Block>
                                                <Text size="sm" weight="medium" color="text-gray-900">{member.name}</Text>
                                                <Text size="xs" color="text-gray-500">{member.email}</Text>
                                            </Block>
                                        </Flex>
                                        <Flex align="center" gap={4}>
                                            <span className={`text-xs px-2 py-1 rounded-full font-medium ${member.role === 'Admin' ? 'bg-blue-100 text-blue-700' :
                                                member.role === 'Editor' ? 'bg-emerald-100 text-emerald-700' :
                                                    'bg-gray-100 text-gray-700'
                                                }`}>
                                                {member.role}
                                            </span>
                                            <CheckCircle2 className={`h-4 w-4 ${member.status === 'Active' ? 'text-secondary' : 'text-gray-300'}`} />
                                        </Flex>
                                    </Flex>
                                ))}
                            </Block>

                            <div className="mt-8 pt-8 border-t border-gray-100">
                                <p className="text-xs text-gray-400 text-center uppercase tracking-widest font-bold mb-4">Permission Matrix</p>
                                <div className="grid grid-cols-4 gap-2 text-[10px] font-bold text-gray-500 uppercase">
                                    <div></div>
                                    <div className="text-center">View</div>
                                    <div className="text-center">Add</div>
                                    <div className="text-center">Delete</div>
                                </div>
                                {[
                                    { role: 'Admin', v: true, a: true, d: true },
                                    { role: 'Editor', v: true, a: true, d: false },
                                    { role: 'Viewer', v: true, a: false, d: false },
                                ].map((row, i) => (
                                    <div key={i} className="grid grid-cols-4 gap-2 py-2 border-b border-gray-50 last:border-0 items-center">
                                        <div className="text-xs font-medium text-gray-700">{row.role}</div>
                                        <div className="flex justify-center"><CheckCircle2 className={`h-3 w-3 ${row.v ? 'text-secondary' : 'text-gray-200'}`} /></div>
                                        <div className="flex justify-center"><CheckCircle2 className={`h-3 w-3 ${row.a ? 'text-secondary' : 'text-gray-200'}`} /></div>
                                        <div className="flex justify-center"><CheckCircle2 className={`h-3 w-3 ${row.d ? 'text-secondary' : 'text-gray-200'}`} /></div>
                                    </div>
                                ))}
                            </div>
                        </Block>

                        {/* Decorative elements */}
                        <div className="absolute -top-4 -right-4 h-24 w-24 bg-primary/5 rounded-full -z-10 blur-2xl"></div>
                        <div className="absolute -bottom-8 -left-8 h-32 w-32 bg-secondary/5 rounded-full -z-10 blur-2xl"></div>
                    </AnimatedBlock>
                </Grid>
            </div>
        </section>
    );
};
