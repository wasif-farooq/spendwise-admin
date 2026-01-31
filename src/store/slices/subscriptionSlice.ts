import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import subscriptionService from '@/api/services/subscription/subscriptionService';
import type { UserSubscription, FeatureUsage, SubscriptionState, SubscriptionPlanDetails } from '@/types/subscription.types';
import { PLAN_LIMITS } from '@/constants/subscriptionPlans';
import type { RootState } from '../store';

// Initial state
const initialState: SubscriptionState = {
    currentSubscription: null,
    featureUsage: {
        members: 0,
        accounts: 0,
        organizations: 0,
        customRoles: 0,
    },
    loading: false,
    error: null,
};

// Async thunks
export const fetchSubscriptionThunk = createAsyncThunk(
    'subscription/fetchSubscription',
    async (_, { rejectWithValue }) => {
        try {
            const response = await subscriptionService.getUserSubscription();
            return response;
        } catch (error: any) {
            return rejectWithValue(error.message || 'Failed to fetch subscription');
        }
    }
);

export const fetchPlansThunk = createAsyncThunk(
    'subscription/fetchPlans',
    async (_, { rejectWithValue }) => {
        try {
            const plans = await subscriptionService.getPlans();
            return plans;
        } catch (error: any) {
            return rejectWithValue(error.message || 'Failed to fetch plans');
        }
    }
);

export const upgradePlanThunk = createAsyncThunk(
    'subscription/upgradePlan',
    async (data: { planId: string; billingPeriod: 'monthly' | 'yearly' }, { rejectWithValue }) => {
        try {
            const response = await subscriptionService.upgradePlan(data);
            return response.subscription;
        } catch (error: any) {
            return rejectWithValue(error.message || 'Failed to upgrade plan');
        }
    }
);

export const cancelSubscriptionThunk = createAsyncThunk(
    'subscription/cancelSubscription',
    async (_, { rejectWithValue }) => {
        try {
            await subscriptionService.cancelSubscription();
            return true;
        } catch (error: any) {
            return rejectWithValue(error.message || 'Failed to cancel subscription');
        }
    }
);

export const fetchFeatureUsageThunk = createAsyncThunk(
    'subscription/fetchFeatureUsage',
    async (_, { rejectWithValue }) => {
        try {
            const usage = await subscriptionService.getFeatureUsage();
            return usage;
        } catch (error: any) {
            return rejectWithValue(error.message || 'Failed to fetch feature usage');
        }
    }
);

// Slice
const subscriptionSlice = createSlice({
    name: 'subscription',
    initialState,
    reducers: {
        updateFeatureUsage: (state, action: PayloadAction<Partial<FeatureUsage>>) => {
            state.featureUsage = { ...state.featureUsage, ...action.payload };
        },
        clearSubscriptionError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        // Fetch subscription
        builder
            .addCase(fetchSubscriptionThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchSubscriptionThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.currentSubscription = action.payload.subscription;
                state.featureUsage = action.payload.featureUsage;
                state.error = null;
            })
            .addCase(fetchSubscriptionThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });

        // Upgrade plan
        builder
            .addCase(upgradePlanThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(upgradePlanThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.currentSubscription = action.payload;
                state.error = null;
            })
            .addCase(upgradePlanThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });

        // Cancel subscription
        builder
            .addCase(cancelSubscriptionThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(cancelSubscriptionThunk.fulfilled, (state) => {
                state.loading = false;
                if (state.currentSubscription) {
                    state.currentSubscription.cancelledAt = new Date().toISOString();
                }
                state.error = null;
            })
            .addCase(cancelSubscriptionThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });

        // Fetch feature usage
        builder
            .addCase(fetchFeatureUsageThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchFeatureUsageThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.featureUsage = action.payload;
                state.error = null;
            })
            .addCase(fetchFeatureUsageThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

// Actions
export const { updateFeatureUsage, clearSubscriptionError } = subscriptionSlice.actions;

// Selectors
export const selectSubscription = (state: RootState) => state.subscription.currentSubscription;
export const selectSubscriptionPlan = (state: RootState) => state.subscription.currentSubscription?.plan || 'free';
export const selectSubscriptionStatus = (state: RootState) => state.subscription.currentSubscription?.status;
export const selectFeatureUsage = (state: RootState) => state.subscription.featureUsage;
export const selectSubscriptionLoading = (state: RootState) => state.subscription.loading;
export const selectSubscriptionError = (state: RootState) => state.subscription.error;

// Feature access selectors
export const selectCanAddMember = (state: RootState) => {
    const plan = selectSubscriptionPlan(state);
    const usage = selectFeatureUsage(state);
    const limit = PLAN_LIMITS[plan as keyof typeof PLAN_LIMITS]?.members || 0;
    return limit === -1 || usage.members < limit;
};

export const selectCanAddAccount = (state: RootState) => {
    const plan = selectSubscriptionPlan(state);
    const usage = selectFeatureUsage(state);
    const limit = PLAN_LIMITS[plan as keyof typeof PLAN_LIMITS]?.accounts || 0;
    return limit === -1 || usage.accounts < limit;
};

export const selectCanAddOrganization = (state: RootState) => {
    const plan = selectSubscriptionPlan(state);
    const usage = selectFeatureUsage(state);
    const limit = PLAN_LIMITS[plan as keyof typeof PLAN_LIMITS]?.organizations || 0;
    return limit === -1 || usage.organizations < limit;
};

export const selectCanAddCustomRole = (state: RootState) => {
    const plan = selectSubscriptionPlan(state);
    const usage = selectFeatureUsage(state);
    const limit = PLAN_LIMITS[plan as keyof typeof PLAN_LIMITS]?.customRoles || 0;
    return limit === -1 || usage.customRoles < limit;
};

export const selectHasAIAdvisorAccess = (state: RootState) => {
    const plan = selectSubscriptionPlan(state);
    return PLAN_LIMITS[plan as keyof typeof PLAN_LIMITS]?.hasAIAdvisor || false;
};

export const selectHasExchangeRatesAccess = (state: RootState) => {
    const plan = selectSubscriptionPlan(state);
    return PLAN_LIMITS[plan as keyof typeof PLAN_LIMITS]?.hasExchangeRates || false;
};

export const selectHasPermissionOverridesAccess = (state: RootState) => {
    const plan = selectSubscriptionPlan(state);
    return PLAN_LIMITS[plan as keyof typeof PLAN_LIMITS]?.hasPermissionOverrides || false;
};

export const selectTransactionHistoryMonths = (state: RootState) => {
    const plan = selectSubscriptionPlan(state);
    return PLAN_LIMITS[plan as keyof typeof PLAN_LIMITS]?.transactionHistoryMonths || 3;
};

export const selectAnalyticsHistoryDays = (state: RootState) => {
    const plan = selectSubscriptionPlan(state);
    return PLAN_LIMITS[plan as keyof typeof PLAN_LIMITS]?.analyticsHistoryDays || 30;
};

export const selectMemberLimit = (state: RootState) => {
    const plan = selectSubscriptionPlan(state);
    return PLAN_LIMITS[plan as keyof typeof PLAN_LIMITS]?.members || 0;
};

export const selectAccountLimit = (state: RootState) => {
    const plan = selectSubscriptionPlan(state);
    return PLAN_LIMITS[plan as keyof typeof PLAN_LIMITS]?.accounts || 0;
};

export const selectOrganizationLimit = (state: RootState) => {
    const plan = selectSubscriptionPlan(state);
    return PLAN_LIMITS[plan as keyof typeof PLAN_LIMITS]?.organizations || 0;
};

export const selectCustomRoleLimit = (state: RootState) => {
    const plan = selectSubscriptionPlan(state);
    return PLAN_LIMITS[plan as keyof typeof PLAN_LIMITS]?.customRoles || 0;
};

// Plan selectors
export const selectCurrentPlan = (state: RootState) => {
    return selectSubscriptionPlan(state);
};

export const selectPlans = (): SubscriptionPlanDetails[] => {
    return [
        {
            id: 'free',
            name: 'Free',
            description: 'Perfect for getting started',
            price: { monthly: 0, yearly: 0 },
            features: [
                '2 team members',
                '1 account',
                '1 custom role',
                '3 months transaction history',
                '30 days analytics',
                '5 organizations'
            ]
        },
        {
            id: 'pro',
            name: 'Pro',
            description: 'For growing teams',
            price: { monthly: 19, yearly: 182 },
            features: [
                'Unlimited team members',
                'Unlimited accounts',
                'Unlimited custom roles',
                'Unlimited transaction history',
                'Unlimited analytics',
                'Unlimited organizations',
                'AI Advisor'
            ]
        }
    ];
};

export default subscriptionSlice.reducer;
