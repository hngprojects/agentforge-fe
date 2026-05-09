# Project Routing Structure

This file defines the planned routing structure for the new project. 

> **Note:** The legacy boilerplate routes (Landing pages, Blog, etc.) are being removed to create a lean foundation. This structure focuses on the new application flow.

## 🔓 Public Routes
These routes are accessible without authentication.
- `/` - Landing Page (New Custom Design)
- `/login` - Authentication Entry
- `/register` - Account Creation
- `/forgot-password` - Password Recovery
- `/reset-password` - Finalize Recovery
- `/verify-otp` - One-Time Password Verification

## 🔒 Client Routes (Protected)
Requires a valid FastAPI-issued `access_token`.

## 🛡️ Admin Routes (Restricted)
Accessible only to users with `is_superadmin` status.

---

## ⚙️ Middleware Rules
1. **Redirection:** Logged-in users attempting to access `/login` or `/register` will be redirected.
2. **Access Control:** Unauthenticated users attempting to access protected pages will be redirected to `/login`.
