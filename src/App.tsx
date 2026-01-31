import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from './components/shared/layout/MainLayout';
import { AuthLayout } from './components/shared/layout/AuthLayout';
import { DashboardLayout } from './components/shared/layout/DashboardLayout';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import TwoFactorPage from './pages/TwoFactorPage';
import CheckEmailPage from './pages/CheckEmailPage';
import ConfirmEmailPage from './pages/ConfirmEmailPage';
import DashboardPage from './pages/DashboardPage';
import SettingsPage from './pages/SettingsPage';
import Profile from './pages/SettingsPage/Profile';
import Preferences from './pages/SettingsPage/Preferences';
import Security from './pages/SettingsPage/Security';
import Setup2FAPage from './pages/SettingsPage/Setup2FAPage';
import SettingsSubscription from './pages/SettingsPage/Subscription';
import ManagePage from './pages/ManagePage';
import ManageGeneral from './pages/ManagePage/General';
import ManageMembers from './pages/ManagePage/Members';
import InviteMemberPage from './pages/ManagePage/InviteMemberPage';
import EditMemberPage from './pages/ManagePage/EditMemberPage';
import ManageBilling from './pages/ManagePage/Billing';
import ManageRoles from './pages/ManagePage/Roles';
import RoleEditor from './pages/ManagePage/RoleEditor';
import ExchangeRatesPage from './pages/ExchangeRatesPage';
import AccountsPage from './pages/AccountsPage';
import TransactionsPage from './pages/TransactionsPage';
import AnalyticsPage from './pages/AnalyticsPage';
import AIAdvisorPage from './pages/AIAdvisorPage';
import AIAdvisorPreviewPage from './pages/AIAdvisorPreviewPage';
import { ProtectedRoute } from './components/shared/ProtectedRoute';

import { LayoutProvider } from './context/LayoutContext';
import { Toaster } from 'sonner';

function App() {
  return (
    <>
      <Toaster position="top-center" richColors />
      <LayoutProvider>
        <Router>
          <Routes>
            {/* Main Layout Routes (Public) */}
            <Route element={<MainLayout />}>
              <Route path="/" element={<HomePage />} />
            </Route>

            {/* Dashboard Layout Routes (Authenticated) */}
            <Route element={<DashboardLayout />}>
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/analytics" element={<AnalyticsPage />} />
              <Route
                path="/ai-advisor"
                element={
                  <ProtectedRoute feature="ai-advisor">
                    <AIAdvisorPage />
                  </ProtectedRoute>
                }
              />
              <Route path="/ai-advisor-preview" element={<AIAdvisorPreviewPage />} />
              <Route path="/exchange-rates" element={<ExchangeRatesPage />} />
              <Route path="/accounts" element={<AccountsPage />} />
              <Route path="/accounts/:id/transactions" element={<TransactionsPage />} />

              {/* Manage Nested Routes */}
              <Route path="manage" element={<ManagePage />}>
                <Route index element={<Navigate to="general" replace />} />
                <Route path="general" element={<ManageGeneral />} />
                <Route path="members" element={<ManageMembers />} />
                <Route path="members/invite" element={<InviteMemberPage />} />
                <Route path="members/:id/edit" element={<EditMemberPage />} />
                <Route path="roles" element={<ManageRoles />} />
                <Route path="roles/new" element={<RoleEditor />} />
                <Route path="roles/:id/edit" element={<RoleEditor />} />
                <Route path="billing" element={<ManageBilling />} />
              </Route>

              {/* Settings Nested Routes */}
              <Route path="/settings" element={<SettingsPage />}>
                <Route index element={<Navigate to="profile" replace />} />
                <Route path="profile" element={<Profile />} />
                <Route path="preferences" element={<Preferences />} />
                <Route path="security" element={<Security />} />
                <Route path="security/setup-2fa" element={<Setup2FAPage />} />
                <Route path="subscription" element={<SettingsSubscription />} />
              </Route>
            </Route>

            {/* Auth Layout Routes (Auth Flows) */}
            <Route element={<AuthLayout />}>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />
              <Route path="/reset-password" element={<ResetPasswordPage />} />
              <Route path="/verify-2fa" element={<TwoFactorPage />} />
              <Route path="/check-email" element={<CheckEmailPage />} />
              <Route path="/confirm-email" element={<ConfirmEmailPage />} />
            </Route>
          </Routes>
        </Router>
      </LayoutProvider>
    </>
  );
}

export default App;
