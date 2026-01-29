import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from './components/MainLayout';
import { AuthLayout } from './components/AuthLayout';
import { DashboardLayout } from './components/DashboardLayout';
import LandingPage from './pages/LandingPage';
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
import ManagePage from './pages/ManagePage';
import ManageGeneral from './pages/ManagePage/General';
import ManageMembers from './pages/ManagePage/Members';
import ManageBilling from './pages/ManagePage/Billing';
import ManageRoles from './pages/ManagePage/Roles';

import { LayoutProvider } from './context/LayoutContext';

function App() {
  return (
    <LayoutProvider>
      <Router>
        <Routes>
          {/* Main Layout Routes (Public) */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<LandingPage />} />
          </Route>

          {/* Dashboard Layout Routes (Authenticated) */}
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<DashboardPage />} />

            {/* Manage Nested Routes */}
            <Route path="/manage" element={<ManagePage />}>
              <Route index element={<Navigate to="general" replace />} />
              <Route path="general" element={<ManageGeneral />} />
              <Route path="members" element={<ManageMembers />} />
              <Route path="roles" element={<ManageRoles />} />
              <Route path="billing" element={<ManageBilling />} />
            </Route>

            {/* Settings Nested Routes */}
            <Route path="/settings" element={<SettingsPage />}>
              <Route index element={<Navigate to="profile" replace />} />
              <Route path="profile" element={<Profile />} />
              <Route path="preferences" element={<Preferences />} />
              <Route path="security" element={<Security />} />
              <Route path="security/setup-2fa" element={<Setup2FAPage />} />
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
  );
}

export default App;
