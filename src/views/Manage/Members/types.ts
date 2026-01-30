export interface Member {
    id: number;
    name: string;
    email: string;
    role: string;
    status: string;
    joinedDate: string;
    isCurrentUser: boolean;
}

export interface MemberFilters {
    roles: string[];
    statuses: string[];
    startDate: string;
    endDate: string;
}
