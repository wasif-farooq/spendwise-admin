import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthLayout } from './components/shared/layout/AuthLayout';
import LoginPage from './pages/LoginPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import TwoFactorPage from './pages/TwoFactorPage';
import CheckEmailPage from './pages/CheckEmailPage';
import ConfirmEmailPage from './pages/ConfirmEmailPage';
import { LayoutProvider } from './context/LayoutContext';
import { FeatureFlagProvider } from './context/FeatureFlagContext';
import { Toaster } from 'sonner';

import { AdminLayout } from './components/shared/layout/AdminLayout';
import { UsersListPage } from './pages/admin/UsersListPage';
import { OrganizationsListPage } from './pages/admin/OrganizationsListPage';
import { AccountsListPage } from './pages/admin/AccountsListPage';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { UserDetailDashboard } from './pages/admin/UserDetailDashboard';
import { FeatureFlagsPage } from './pages/admin/FeatureFlagsPage';
import { AdminSettingsPage } from './pages/admin/AdminSettingsPage';
import { MembersListPage } from './pages/admin/MembersListPage';
import { MemberDetailsPage } from './pages/admin/MemberDetailsPage';
import { RolesListPage } from './pages/admin/RolesListPage';
import { RoleDetailsPage } from './pages/admin/RoleDetailsPage';
import { TransactionsListPage } from './pages/admin/TransactionsListPage';
import { SubscriptionsListPage } from './pages/admin/SubscriptionsListPage';
import { CouponsListPage } from './pages/admin/CouponsListPage';

import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './store/redux';
import { getCurrentUserThunk, selectIsInitialized } from './store/slices/authSlice';
import { Block, Text, Flex } from '@shared';

function App() {
  const dispatch = useAppDispatch();
  const isInitialized = useAppSelector(selectIsInitialized);

  useEffect(() => {
    dispatch(getCurrentUserThunk());
  }, [dispatch]);

  if (!isInitialized) {
    return (
      <Flex align="center" justify="center" className="min-h-screen bg-gray-50">
        <Block className="text-center space-y-4">
          <Block className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
          <Text className="text-gray-500 font-medium">Initializing SpendWise Admin...</Text>
        </Block>
      </Flex>
    );
  }

  return (
    <>
      <Toaster position="top-center" richColors />
      <LayoutProvider>
        <FeatureFlagProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Navigate to="/login" replace />} />

              {/* Standalone Admin Routes */}
              <Route element={<AdminLayout />}>
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="users" element={<UsersListPage />} />
                <Route path="users/:id" element={<UserDetailDashboard />} />
                <Route path="members" element={<MembersListPage />} />
                <Route path="members/:id" element={<MemberDetailsPage />} />
                <Route path="roles" element={<RolesListPage />} />
                <Route path="roles/new" element={<RoleDetailsPage />} />
                <Route path="roles/:id" element={<RoleDetailsPage />} />
                <Route path="transactions" element={<TransactionsListPage />} />
                <Route path="subscriptions" element={<SubscriptionsListPage />} />
                <Route path="coupons" element={<CouponsListPage />} />
                <Route path="organizations" element={<OrganizationsListPage />} />
                <Route path="accounts" element={<AccountsListPage />} />
                <Route path="feature-flags" element={<FeatureFlagsPage />} />
                <Route path="settings" element={<AdminSettingsPage />} />
              </Route>

              {/* Auth Layout Routes (Auth Flows) */}
              <Route element={<AuthLayout />}>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                <Route path="/reset-password" element={<ResetPasswordPage />} />
                <Route path="/verify-2fa" element={<TwoFactorPage />} />
                <Route path="/check-email" element={<CheckEmailPage />} />
                <Route path="/confirm-email" element={<ConfirmEmailPage />} />
              </Route>

              {/* Redirect any other route to login */}
              <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
          </Router>
        </FeatureFlagProvider>
      </LayoutProvider>
    </>
  );
}

export default App;
