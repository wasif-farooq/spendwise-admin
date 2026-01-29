import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ChevronDown,
    Check,
    Building2,
    User,
    Sparkles
} from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { setAccountType } from '../store/uiSlice';
import type { RootState } from '../store/store';

interface Organization {
    id: string;
    name: string;
    type: 'personal' | 'organization';
    icon?: string;
}

const MOCK_ORGS: Organization[] = [
    { id: '1', name: 'Personal Account', type: 'personal' },
    { id: '2', name: 'Acme Corp', type: 'organization' },
    { id: '3', name: 'Design Studio', type: 'organization' },
];

interface OrgSwitcherProps {
    isCollapsed?: boolean;
}

export const OrgSwitcher: React.FC<OrgSwitcherProps> = ({ isCollapsed = false }) => {
    const dispatch = useDispatch();
    const currentAccountType = useSelector((state: RootState) => state.ui.accountType);
    const [isOpen, setIsOpen] = useState(false);

    // Initialize activeOrg based on currentAccountType if needed, 
    // but for now we'll keep the local state for the name/icon and sync the type.
    const [activeOrg, setActiveOrg] = useState<Organization>(
        MOCK_ORGS.find(org => org.type === currentAccountType) || MOCK_ORGS[0]
    );
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const toggleDropdown = () => setIsOpen(!isOpen);

    const handleSwitch = (org: Organization) => {
        setActiveOrg(org);
        dispatch(setAccountType(org.type));
        setIsOpen(false);
    };

    return (
        <div className="relative" ref={dropdownRef}>
            {/* Trigger */}
            <button
                onClick={toggleDropdown}
                className={`w-full flex items-center gap-3 p-3 rounded-2xl transition-all duration-300 group ${isOpen
                    ? 'bg-primary/10 ring-2 ring-primary/20'
                    : 'hover:bg-gray-50'
                    }`}
            >
                <div className={`flex-shrink-0 h-10 w-10 rounded-xl flex items-center justify-center transition-all duration-300 ${activeOrg.type === 'personal'
                    ? 'bg-blue-100 text-blue-600'
                    : 'bg-purple-100 text-purple-600'
                    } ${isOpen ? 'scale-110 shadow-lg' : 'group-hover:scale-105'}`}>
                    {activeOrg.type === 'personal' ? <User size={20} /> : <Building2 size={20} />}
                </div>

                {!isCollapsed && (
                    <>
                        <div className="flex-1 text-left min-w-0">
                            <p className="text-sm font-black text-gray-900 truncate">{activeOrg.name}</p>
                            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">
                                {activeOrg.type}
                            </p>
                        </div>
                        <ChevronDown
                            size={16}
                            className={`text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                        />
                    </>
                )}
            </button>

            {/* Dropdown */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className={`absolute left-0 right-0 mt-2 bg-white/80 backdrop-blur-xl border border-white/20 rounded-[2rem] shadow-2xl shadow-primary/10 z-50 overflow-hidden min-w-[240px] ${isCollapsed ? 'left-full ml-4 top-0' : ''
                            }`}
                    >
                        <div className="p-3 space-y-1">
                            <div className="px-4 py-2 mb-2">
                                <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Switch Workspace</h4>
                            </div>

                            {MOCK_ORGS.map((org) => (
                                <button
                                    key={org.id}
                                    onClick={() => handleSwitch(org)}
                                    className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all group ${activeOrg.id === org.id
                                        ? 'bg-primary text-white shadow-lg shadow-primary/20'
                                        : 'hover:bg-primary/5 text-gray-700'
                                        }`}
                                >
                                    <div className={`h-8 w-8 rounded-lg flex items-center justify-center ${activeOrg.id === org.id
                                        ? 'bg-white/20'
                                        : org.type === 'personal' ? 'bg-blue-50 text-blue-600' : 'bg-purple-50 text-purple-600'
                                        }`}>
                                        {org.type === 'personal' ? <User size={16} /> : <Building2 size={16} />}
                                    </div>
                                    <span className="flex-1 text-sm font-bold text-left truncate">{org.name}</span>
                                    {activeOrg.id === org.id && <Check size={16} className="text-white" />}
                                </button>
                            ))}
                        </div>

                        <div className="bg-primary/5 p-4 flex items-center gap-3">
                            <div className="bg-primary/10 p-2 rounded-lg">
                                <Sparkles size={14} className="text-primary" />
                            </div>
                            <p className="text-[10px] text-primary font-bold leading-tight">
                                Upgrade to Pro for unlimited organizations.
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
