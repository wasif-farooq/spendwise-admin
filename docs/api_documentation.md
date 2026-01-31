# SpendWise API Documentation

This document provides a comprehensive reference for the SpendWise API. It includes all available endpoints, their required request payloads, and sample responses.

## Base URL
- Default: `/api`
- Configurable via: `VITE_API_URL` environment variable

## Authentication
All authenticated requests require a Bearer token in the `Authorization` header:
`Authorization: Bearer <your_access_token>`

---

## 1. Authentication & Security

### 1.1 Authentication Services

#### Login
`POST /auth/login`
- **Payload**: `{ "email": "user@example.com", "password": "password123" }`
- **Response**: `{ "user": {...}, "token": "...", "refreshToken": "..." }`

#### Register
`POST /auth/register`
- **Payload**: `{ "email": "...", "password": "...", "name": "...", "accountType": "personal"|"organization" }`
- **Response**: Same as Login.

#### 2FA Verify (Login Flow)
`POST /auth/2fa/verify`
- **Payload**: `{ "code": "123456", "method": "authenticator"|"sms"|"email", "tempToken": "...", "backupCode": boolean }`

#### Resend 2FA Code
`POST /auth/2fa/resend`
- **Payload**: `{ "method": "sms"|"email" }`

#### Refresh Token
`POST /auth/refresh`
- **Payload**: `{ "refreshToken": "..." }`
- **Response**: `{ "token": "..." }`

---

### 1.2 Security Services

#### Get Security Settings
`GET /security/settings`
- **Response**: Security settings object including active sessions.

#### Setup 2FA
`POST /security/2fa/setup`
- **Payload**: `{ "method": "...", "phoneNumber": "...", "email": "..." }`
- **Response**: `{ "qrCode": "...", "secret": "..." }`

#### Verify 2FA Setup
`POST /security/2fa/verify`
- **Payload**: `{ "code": "123456" }`
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

#### Revoke Session
`DELETE /security/sessions/:id`

#### Revoke All Sessions
`POST /security/sessions/revoke-all`

---

## 2. Organization & Team

### 2.1 Members & Invites

#### List Members
`GET /members`

#### Invite Member
`POST /members/invite`
- **Payload**: `{ "email": "...", "roles": [...] }`

#### Resend Invite
`POST /members/:id/resend-invite`

#### Update Member
`PUT /members/:id`
- **Payload**: `{ "name": "...", "roles": [...], "status": "Active"|"Inactive"|"Pending" }`

---

### 2.2 Roles Management

#### Create Role
`POST /roles`
- **Payload**: `{ "name": "...", "description": "...", "color": "...", "iconName": "...", "permissions": {...} }`

#### Duplicate Role
`POST /roles/:id/duplicate`
- **Response**: The newly created role object.

---

## 3. Financial Management

### 3.1 Accounts

#### Create Account
`POST /accounts`
- **Payload**: `{ "name": "...", "type": "...", "balance": number, "currency": "...", "color": "..." }`

#### Get Balance
`GET /accounts/:id/balance`
- **Response**: `{ "balance": number }`

---

### 3.2 Transactions

#### List Transactions
`GET /transactions`
- **Query Params**: `category`, `type`, `start`, `end`

#### Upload Receipt
`POST /transactions/:id/receipt`
- **Payload**: `multipart/form-data` with `receipt` file.

---

## 4. Billing & Subscription

### 4.1 Subscription

#### Upgrade Plan
`POST /subscription/upgrade`
- **Payload**: `{ "planId": "...", "billingPeriod": "monthly"|"yearly" }`

#### Cancel Subscription
`POST /subscription/cancel`

#### Feature Access Check
`GET /subscription/check-access/:feature`
- **Response**: `{ "hasAccess": boolean, "reason": "..." }`

---

### 4.2 Billing

#### Add Payment Method
`POST /billing/payment-methods`
- **Payload**: `{ "type": "...", "cardNumber": "...", "expiry": "...", "cvv": "..." }`

#### Set Default Payment Method
`POST /billing/payment-methods/:id/set-default`

#### Change Plan
`POST /billing/change-plan`
- **Payload**: `{ "planId": "..." }`

---

## 5. Intelligence & Reports

### 5.1 Analytics

#### Get Overview
`GET /analytics/overview`
- **Query Params**: `period` (week/month/year)

#### Export
`GET /analytics/export`
- **Query Params**: `format` (csv/pdf/excel)
- **Response**: File blob.

---

### 5.2 AI Advisor

#### Ask Question
`POST /ai-advisor/ask`
- **Payload**: `{ "question": "..." }`
- **Response**: `{ "answer": "...", "confidence": number }`

#### Dismiss Insight
`POST /ai-advisor/insights/:id/dismiss`

#### Apply Recommendation
`POST /ai-advisor/recommendations/:id/apply`

#### Generate Report
`POST /ai-advisor/generate-report`
- **Payload**: `{ "type": "spending"|"saving"|"investment" }`

---

## 6. Preferences & Dashboard

### 6.1 Preferences

#### Update User Preferences
`PUT /preferences/user`
- **Payload**: Full or partial `UserPreferences` object.

#### Update Theme/Currency/etc.
- `PATCH /preferences/user/theme` -> `{ "theme": "..." }`
- `PATCH /preferences/user/color-scheme` -> `{ "colorScheme": "..." }`
- `PATCH /preferences/user/currency` -> `{ "currency": "..." }`
- `PATCH /preferences/user/timezone` -> `{ "timezone": "..." }`
- `PATCH /preferences/user/notifications` -> `{ "notifications": {...} }`

#### Reset to Defaults
`POST /preferences/user/reset`

---

### 6.2 Dashboard

#### Refresh Data
`POST /dashboard/refresh`
- **Response**: Freshest dashboard data object.
