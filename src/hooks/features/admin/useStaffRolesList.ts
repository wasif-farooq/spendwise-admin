import { useNavigate } from 'react-router-dom';
import { useAdminStaffRoles } from '@/hooks/features/admin/useAdminStaffRoles';
import {
    Shield,
    Users,
    Eye,
    CreditCard,
    Zap,
    Ticket,
    Building2,
    Wallet,
    Headphones,
    ShieldCheck
} from 'lucide-react';

const ICON_MAP: Record<string, any> = {
    ShieldCheck,
    Users,
    Eye,
    CreditCard,
    Zap,
    Ticket,
    Home: Building2,
    Building2,
    Wallet,
    Headphones,
    Shield
};

export const useStaffRolesList = () => {
    const navigate = useNavigate();
    const {
        roles,
        loading,
        error,
        searchQuery,
        setSearchQuery,
        currentPage,
        setCurrentPage,
        totalPages,
        clearFilters,
        totalCount,
        deleteRole,
        refresh
    } = useAdminStaffRoles();

    const renderIcon = (iconName: string, className?: string) => {
        const IconComponent = ICON_MAP[iconName] || Shield;
        return IconComponent; // return Component, not element, let consumer render it
    };

    // For direct usage in rendering where we need the element
    const getIconComponent = (iconName: string) => {
        return ICON_MAP[iconName] || Shield;
    };

    return {
        roles,
        loading,
        error,
        searchQuery,
        setSearchQuery,
        currentPage,
        setCurrentPage,
        totalPages,
        clearFilters,
        totalCount,
        getIconComponent,
        navigate,
        deleteRole,
        refresh
    };
};
