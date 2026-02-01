export interface HistoryActor {
    id: string;
    name: string;
    email: string;
    avatarUrl?: string;
}

export interface HistoryChange {
    field: string;
    oldValue: any;
    newValue: any;
    label?: string; // Human-readable label for the field
}

export type HistoryEntityType = 'transaction' | 'account' | 'member' | 'organization' | 'role' | 'subscription' | 'security_setting' | 'preference';
export type HistoryAction = 'created' | 'updated' | 'deleted' | 'restored' | 'invited' | 'changed' | 'enabled' | 'disabled';

export interface ModificationHistoryEntry {
    id: string;
    entityType: HistoryEntityType;
    entityId: string;
    entityName: string;
    action: HistoryAction;
    actor: HistoryActor;
    timestamp: string;
    changes?: HistoryChange[];
    metadata?: {
        ipAddress?: string;
        userAgent?: string;
        location?: string;
    };
}

export interface ModificationHistoryFilters {
    entityType?: HistoryEntityType;
    entityId?: string;
    userId?: string;
    action?: HistoryAction;
    startDate?: string;
    endDate?: string;
    limit?: number;
    offset?: number;
}
