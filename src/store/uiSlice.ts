import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface UIState {
    isYearlyBilling: boolean;
    isMobileMenuOpen: boolean;
}

const initialState: UIState = {
    isYearlyBilling: false,
    isMobileMenuOpen: false,
};

const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        toggleBillingCycle: (state) => {
            state.isYearlyBilling = !state.isYearlyBilling;
        },
        setBillingCycle: (state, action: PayloadAction<boolean>) => {
            state.isYearlyBilling = action.payload;
        },
        toggleMobileMenu: (state) => {
            state.isMobileMenuOpen = !state.isMobileMenuOpen;
        },
        setMobileMenu: (state, action: PayloadAction<boolean>) => {
            state.isMobileMenuOpen = action.payload;
        },
    },
});

export const { toggleBillingCycle, setBillingCycle, toggleMobileMenu, setMobileMenu } = uiSlice.actions;
export default uiSlice.reducer;
