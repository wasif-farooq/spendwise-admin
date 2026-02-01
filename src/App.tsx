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
import { OrganizationFormPage } from './pages/admin/OrganizationFormPage';
import { OrganizationDetailsPage } from './pages/admin/OrganizationDetailsPage';
import { AccountsListPage } from './pages/admin/AccountsListPage';
import { AccountFormPage } from './pages/admin/AccountFormPage';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { UserDetailDashboard } from './pages/admin/UserDetailDashboard';
import { UserFormPage } from './pages/admin/UserFormPage';
import { FeatureFlagsPage } from './pages/admin/FeatureFlagsPage';
import { AdminSettingsPage } from './pages/admin/AdminSettingsPage';
import { TransactionsListPage } from './pages/admin/TransactionsListPage';
import { TransactionFormPage } from './pages/admin/TransactionFormPage';
import { SubscriptionsListPage } from './pages/admin/SubscriptionsListPage';
import { CouponsListPage } from './pages/admin/CouponsListPage';
import { CouponFormPage } from './pages/admin/CouponFormPage';
import { StaffListPage } from './pages/admin/StaffListPage';
import { StaffDetailsPage } from './pages/admin/StaffDetailsPage';
import { StaffFormPage } from './pages/admin/StaffFormPage';
import { StaffRolesListPage } from './pages/admin/StaffRolesListPage';
import { StaffRoleDetailsPage } from './pages/admin/StaffRoleDetailsPage';
import { RoleFormPage } from './pages/admin/RoleFormPage';

import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './store/redux';
import { getCurrentUserThunk, selectIsInitialized } from './store/slices/authSlice';
import { Block, Text, Flex } from '@shared';
import { RequirePermission } from './components/shared/RequirePermission';
import { RESOURCES, ACTIONS } from './constants/permissions';

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
                {/* Stats & Analytics - usually open to all staff or dashboard specific */}
                <Route path="dashboard" element={
                  <RequirePermission resource={RESOURCES.ANALYTICS} action={ACTIONS.READ}>
                    <AdminDashboard />
                  </RequirePermission>
                } />

                <Route path="users" element={
                  <RequirePermission resource={RESOURCES.USERS} action={ACTIONS.READ}>
                    <UsersListPage />
                  </RequirePermission>
                } />
                <Route path="users/new" element={
                  <RequirePermission resource={RESOURCES.USERS} action={ACTIONS.CREATE}>
                    <UserFormPage />
                  </RequirePermission>
                } />
                <Route path="users/:id" element={
                  <RequirePermission resource={RESOURCES.USERS} action={ACTIONS.READ}>
                    <UserDetailDashboard />
                  </RequirePermission>
                } />
                <Route path="users/:id/edit" element={
                  <RequirePermission resource={RESOURCES.USERS} action={ACTIONS.UPDATE}>
                    <UserFormPage />
                  </RequirePermission>
                } />


                {/* Staff Management Routes */}
                <Route path="staff" element={
                  <RequirePermission resource={RESOURCES.STAFF} action={ACTIONS.READ}>
                    <StaffListPage />
                  </RequirePermission>
                } />
                <Route path="staff/new" element={
                  <RequirePermission resource={RESOURCES.STAFF} action={ACTIONS.CREATE}>
                    <StaffFormPage />
                  </RequirePermission>
                } />
                <Route path="staff/:id" element={
                  <RequirePermission resource={RESOURCES.STAFF} action={ACTIONS.READ}>
                    <StaffDetailsPage />
                  </RequirePermission>
                } />
                <Route path="staff/:id/edit" element={
                  <RequirePermission resource={RESOURCES.STAFF} action={ACTIONS.UPDATE}>
                    <StaffFormPage />
                  </RequirePermission>
                } />

                <Route path="staff-roles" element={
                  <RequirePermission resource={RESOURCES.STAFF_ROLES} action={ACTIONS.READ}>
                    <StaffRolesListPage />
                  </RequirePermission>
                } />
                <Route path="admin/staff-roles/new" element={
                  <RequirePermission resource={RESOURCES.STAFF_ROLES} action={ACTIONS.CREATE}>
                    <RoleFormPage />
                  </RequirePermission>
                } />
                <Route path="admin/staff-roles/:id/edit" element={
                  <RequirePermission resource={RESOURCES.STAFF_ROLES} action={ACTIONS.UPDATE}>
                    <RoleFormPage />
                  </RequirePermission>
                } />
                <Route path="staff-roles/:id" element={
                  <RequirePermission resource={RESOURCES.STAFF_ROLES} action={ACTIONS.READ}>
                    <StaffRoleDetailsPage />
                  </RequirePermission>
                } />

                <Route path="transactions" element={
                  <RequirePermission resource={RESOURCES.TRANSACTIONS} action={ACTIONS.READ}>
                    <TransactionsListPage />
                  </RequirePermission>
                } />
                <Route path="transactions/new" element={
                  <RequirePermission resource={RESOURCES.TRANSACTIONS} action={ACTIONS.CREATE}>
                    <TransactionFormPage />
                  </RequirePermission>
                } />
                <Route path="transactions/:id/edit" element={
                  <RequirePermission resource={RESOURCES.TRANSACTIONS} action={ACTIONS.UPDATE}>
                    <TransactionFormPage />
                  </RequirePermission>
                } />

                <Route path="subscriptions" element={
                  <RequirePermission resource={RESOURCES.SUBSCRIPTIONS} action={ACTIONS.READ}>
                    <SubscriptionsListPage />
                  </RequirePermission>
                } />

                <Route path="coupons" element={
                  <RequirePermission resource={RESOURCES.COUPONS} action={ACTIONS.READ}>
                    <CouponsListPage />
                  </RequirePermission>
                } />
                <Route path="coupons/new" element={
                  <RequirePermission resource={RESOURCES.COUPONS} action={ACTIONS.CREATE}>
                    <CouponFormPage />
                  </RequirePermission>
                } />
                <Route path="coupons/:id/edit" element={
                  <RequirePermission resource={RESOURCES.COUPONS} action={ACTIONS.UPDATE}>
                    <CouponFormPage />
                  </RequirePermission>
                } />

                <Route path="organizations" element={
                  <RequirePermission resource={RESOURCES.ORGANIZATIONS} action={ACTIONS.READ}>
                    <OrganizationsListPage />
                  </RequirePermission>
                } />
                <Route path="organizations/new" element={
                  <RequirePermission resource={RESOURCES.ORGANIZATIONS} action={ACTIONS.CREATE}>
                    <OrganizationFormPage />
                  </RequirePermission>
                } />
                <Route path="organizations/:id/edit" element={
                  <RequirePermission resource={RESOURCES.ORGANIZATIONS} action={ACTIONS.UPDATE}>
                    <OrganizationFormPage />
                  </RequirePermission>
                } />
                <Route path="organizations/:id" element={
                  <RequirePermission resource={RESOURCES.ORGANIZATIONS} action={ACTIONS.READ}>
                    <OrganizationDetailsPage />
                  </RequirePermission>
                } />

                <Route path="accounts" element={
                  <RequirePermission resource={RESOURCES.ACCOUNTS} action={ACTIONS.READ}>
                    <AccountsListPage />
                  </RequirePermission>
                } />
                <Route path="accounts/new" element={
                  <RequirePermission resource={RESOURCES.ACCOUNTS} action={ACTIONS.CREATE}>
                    <AccountFormPage />
                  </RequirePermission>
                } />
                <Route path="accounts/:id/edit" element={
                  <RequirePermission resource={RESOURCES.ACCOUNTS} action={ACTIONS.UPDATE}>
                    <AccountFormPage />
                  </RequirePermission>
                } />

                <Route path="feature-flags" element={
                  <RequirePermission resource={RESOURCES.SETTINGS} action={ACTIONS.MANAGE}>
                    <FeatureFlagsPage />
                  </RequirePermission>
                } />
                <Route path="settings" element={
                  <RequirePermission resource={RESOURCES.SETTINGS} action={ACTIONS.READ}>
                    <AdminSettingsPage />
                  </RequirePermission>
                } />
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
