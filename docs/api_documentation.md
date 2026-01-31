# SpendWise API Documentation

This document provides a 100% comprehensive reference for the SpendWise API. It includes all available endpoints, their required request payloads, sample responses, and query parameters.

## Table of Contents
1. [Authentication](#1-authentication)
2. [Security & Session Management](#2-security--session-management)
3. [Organization & Team](#3-organization--team)
4. [Financial Management](#4-financial-management)
5. [Subscription & Billing](#5-subscription--billing)
6. [Intelligence & Analytics](#6-intelligence--analytics)
7. [Personalization & Dashboard](#7-personalization--dashboard)

---

## 1. Authentication

### Auth Services (`AuthService`)

#### Login
`POST /auth/login`
- **Payload**: `{ "email": "user@example.com", "password": "password123" }`
- **Response**: `{ "user": {...}, "token": "...", "refreshToken": "..." }`

#### Register
`POST /auth/register`
- **Payload**: `{ "email": "...", "password": "...", "name": "...", "accountType": "personal"|"organization", "organizationName": "..." }`
- **Response**: Same as Login.

#### Logout
`POST /auth/logout`

#### Get Current User
`GET /auth/me`
- **Response**: User Profile Object.

#### Forgot Password
`POST /auth/forgot-password`
- **Payload**: `{ "email": "..." }`

#### Reset Password
`POST /auth/reset-password`
- **Payload**: `{ "token": "...", "password": "...", "confirmPassword": "..." }`

#### Refresh Token
`POST /auth/refresh`
- **Payload**: `{ "refreshToken": "..." }`
- **Response**: `{ "token": "..." }`

#### 2FA Verify (Login Flow)
`POST /auth/2fa/verify`
- **Payload**: `{ "code": "123456", "method": "authenticator"|"sms"|"email", "tempToken": "...", "backupCode": boolean }`

#### Resend 2FA Code
`POST /auth/2fa/resend`
- **Payload**: `{ "method": "sms"|"email" }`

---

## 2. Security & Session Management

### Security Services (`SecurityService`)

#### Get Security Settings
`GET /security/settings`
- **Response**: `{ "twoFactorEnabled": boolean, "twoFactorMethod": "...", "activeSessions": [...], "loginHistory": [...] }`

#### Setup 2FA
`POST /security/2fa/setup`
- **Payload**: `{ "method": "...", "phoneNumber": "...", "email": "..." }`
- **Response**: `{ "qrCode": "...", "secret": "..." }`

#### Verify 2FA Setup
`POST /security/2fa/verify`
- **Payload**: `{ "code": "..." }`
- **Response**: `{ "success": true, "backupCodes": [...] }`

#### Disable 2FA
`POST /security/2fa/disable`
- **Payload**: `{ "password": "..." }`

#### Regenerate Backup Codes
`POST /security/2fa/backup-codes/regenerate`
- **Response**: `{ "backupCodes": [...] }`

#### Change Password
`POST /security/password/change`
- **Payload**: `{ "currentPassword": "...", "newPassword": "..." }`

#### List Active Sessions
`GET /security/sessions`

#### Revoke Session
`DELETE /security/sessions/:sessionId`

#### Revoke All Other Sessions
`POST /security/sessions/revoke-all`

#### Get Login History
`GET /security/login-history`

---

## 3. Organization & Team

### Organization Services (`OrganizationService`)

#### Get Organization
`GET /organization`

#### Update Organization
`PUT /organization`
- **Payload**: `{ "name": "...", "description": "...", "website": "...", "industry": "...", "size": "..." }`

#### Upload Organization Logo
`POST /organization/logo`
- **Payload**: `multipart/form-data` with `logo` file.

#### Get Organization Settings
`GET /organization/settings`

#### Update Organization Settings
`PUT /organization/settings`
- **Payload**: `{ "defaultRole": "...", "requireEmailVerification": boolean, ... }`

#### Delete Organization
`POST /organization/delete`
- **Payload**: `{ "password": "..." }`

### Members Services (`MembersService`)

#### List Members
`GET /members`

#### Get Member Details
`GET /members/:id`

#### Create Member
`POST /members`
- **Payload**: `{ "email": "...", "roles": [...], "accountPermissions": {...} }`

#### Update Member
`PUT /members/:id`
- **Payload**: Same as Create.

#### Delete Member
`DELETE /members/:id`

#### Invite Member
`POST /members/invite`
- **Payload**: `{ "email": "...", "roles": [...], "accountPermissions": {...} }`

#### Resend Invite
`POST /members/:id/resend-invite`

### Roles Services (`RolesService`)

#### List Roles
`GET /roles`

#### Get Role Details
`GET /roles/:id`

#### Create Role
`POST /roles`
- **Payload**: `{ "name": "...", "description": "...", "color": "...", "iconName": "...", "permissions": {...} }`

#### Update Role
`PUT /roles/:id`
- **Payload**: Same as Create.

#### Delete Role
`DELETE /roles/:id`

#### Duplicate Role
`POST /roles/:id/duplicate`

---

## 4. Financial Management

### Accounts Services (`AccountsService`)

#### List Accounts
`GET /accounts`

#### Get Account Details
`GET /accounts/:id`

#### Create Account
`POST /accounts`
- **Payload**: `{ "name": "...", "type": "...", "balance": 0, "currency": "...", "color": "..." }`

#### Update Account
`PUT /accounts/:id`
- **Payload**: Same as Create.

#### Delete Account
`DELETE /accounts/:id`

#### Get Account Balance
`GET /accounts/:id/balance`

### Transactions Services (`TransactionsService`)

#### List Transactions
`GET /transactions`
- **Query Params**: `category`, `type` (income/expense/all), `start`, `end`

#### Get Transaction Details
`GET /transactions/:id`

#### Create Transaction
`POST /transactions`
- **Payload**: `{ "description": "...", "category": "...", "amount": 0.00, "type": "...", "accountId": "..." }`

#### Update Transaction
`PUT /transactions/:id`
- **Payload**: Same as Create.

#### Delete Transaction
`DELETE /transactions/:id`

#### Upload Transaction Receipt
`POST /transactions/:id/receipt`
- **Payload**: `multipart/form-data` with `receipt` file.

---

## 5. Subscription & Billing

### Subscription Services (`SubscriptionService`)

#### List Available Plans
`GET /subscription/plans`

#### Get Current Subscription
`GET /subscription/current`

#### Upgrade/Change Plan Flow
`POST /subscription/upgrade`
- **Payload**: `{ "planId": "...", "billingPeriod": "monthly"|"yearly" }`

#### Cancel Subscription
`POST /subscription/cancel`

#### Feature Check
`GET /subscription/check-access/:feature`

#### Get Feature Usage
`GET /subscription/usage`

### Billing Services (`BillingService`)

#### Get Aggregated Billing Data
`GET /billing`

#### Get Current Plan Detail
`GET /billing/plan`

#### List Payment Methods
`GET /billing/payment-methods`

#### Add Payment Method
`POST /billing/payment-methods`
- **Payload**: `{ "type": "Visa"|"MasterCard", "cardNumber": "...", "expiry": "...", "cvv": "..." }`

#### Delete Payment Method
`DELETE /billing/payment-methods/:id`

#### Set Default Payment Method
`POST /billing/payment-methods/:id/set-default`

#### List Billing History
`GET /billing/history`

#### Download Invoice (PDF)
`GET /billing/invoices/:invoiceId/download`

#### Change Plan (Alternate Endpoint)
`POST /billing/change-plan`
- **Payload**: `{ "planId": "..." }`

#### Cancel Billing (Alternate Endpoint)
`POST /billing/cancel`

---

## 6. Intelligence & Analytics

### Analytics Services (`AnalyticsService`)

#### Get Full Analytics Data
`GET /analytics`
- **Query Params**: `start`, `end` (dates)

#### Get Executive Overview
`GET /analytics/overview`
- **Query Params**: `period` (week/month/year)

#### Get Category Trends
`GET /analytics/category-trends`
- **Query Params**: `months`

#### Get Monthly Comparison
`GET /analytics/monthly-comparison`
- **Query Params**: `months`

#### Export Analytics
`GET /analytics/export`
- **Query Params**: `format` (csv/pdf/excel)

### AI Advisor Services (`AIAdvisorService`)

#### Get AI Insights
`GET /ai-advisor/insights`
- **Query Params**: `limit`

#### Get AI Recommendations
`GET /ai-advisor/recommendations`

#### Get AI Budget Suggestions
`GET /ai-advisor/budget-suggestions`

#### Get AI Spending Patterns
`GET /ai-advisor/spending-patterns`

#### Chat with AI Assistant
`POST /ai-advisor/ask`
- **Payload**: `{ "question": "..." }`
- **Response**: `{ "answer": "...", "confidence": 0.00 }`

#### Dismiss Insight
`POST /ai-advisor/insights/:id/dismiss`

#### Apply Recommendation
`POST /ai-advisor/recommendations/:id/apply`

#### Generate AI Report
`POST /ai-advisor/generate-report`
- **Payload**: `{ "type": "spending"|"saving"|"investment" }`

---

## 7. Personalization & Dashboard

### Preferences Services (`PreferencesService`)

#### Get Valid Options (Locale/Currency/etc.)
`GET /preferences/options`

#### Get User Customizations
`GET /preferences/user`

#### Bulk Update Preferences
`PUT /preferences/user`
- **Payload**: Partial or full `UserPreferences` object.

#### Patch Specific Settings
- `PATCH /preferences/user/theme` -> `{ "theme": "..." }`
- `PATCH /preferences/user/color-scheme` -> `{ "colorScheme": "..." }`
- `PATCH /preferences/user/currency` -> `{ "currency": "..." }`
- `PATCH /preferences/user/timezone` -> `{ "timezone": "..." }`
- `PATCH /preferences/user/notifications` -> `{ "notifications": {...} }`

#### Reset All Preferences
`POST /preferences/user/reset`

### Dashboard Services (`DashboardService`)

#### Get Aggregated Dashboard Data
`GET /dashboard`

#### Get KPI Stats
`GET /dashboard/stats`

#### Get Category Breakdown
`GET /dashboard/spending-by-category`
- **Query Params**: `period`

#### Get Income vs Expense Trend
`GET /dashboard/income-vs-expense`
- **Query Params**: `months`

#### Get Recent Feed
`GET /dashboard/recent-activity`
- **Query Params**: `limit`

#### Trigger Dashboard Re-calculation
`POST /dashboard/refresh`

### Feature Flags (`FeatureFlagService`)

#### List Enabled Flags
`GET /feature-flags`
