# 🚑 Ambulink — Emergency Ambulance Dispatch Platform

A modern, production-quality emergency ambulance dispatch platform connecting **patients**, **drivers**, and **admins** in one coordinated system. Built with **Next.js 16 App Router** as part of Programming Hero B7A7 assignment.

![Ambulink Banner](https://img.shields.io/badge/Next.js-16.3.7-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![Tailwind](https://img.shields.io/badge/Tailwind-v4-38bdf8?style=for-the-badge&logo=tailwindcss)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

---

## 🔗 Live Links

| Resource | URL |
|---|---|
| **🌐 Live Frontend** | [ambu-link-emergency-ambulance-dispa-ashy.vercel.app](https://ambu-link-emergency-ambulance-dispa-ashy.vercel.app) |
| **🔌 Live Backend API** | [ambulink-nine.vercel.app](https://ambulink-nine.vercel.app) |
| **📦 Frontend Repo** | [github.com/mehadishisir/AmbuLink-Emergency-Ambulance-Dispatch-System-Frontend](https://github.com/mehadishisir/AmbuLink-Emergency-Ambulance-Dispatch-System-Frontend) |
| **🗄️ Backend Repo** | [github.com/mehadishisir/AmbuLink-Emergency-Ambulance-Dispatch-System](https://github.com/mehadishisir/AmbuLink-Emergency-Ambulance-Dispatch-System) |
| **🎥 Demo Video** | `[PASTE DEMO VIDEO LINK]` |

---

## 🎯 Demo Credentials

**One-click demo login buttons are available on the `/login` page.**

| Role | Email | Password | Access |
|---|---|---|---|
| **👨‍💼 Admin** | `admin@example.com` | `Admin@123` | Manage requests, assign drivers, view analytics |
| **👤 Patient** | `patient@example.com` | `Patient@123` | Request ambulance, track trips, make payments |
| **🚑 Driver** | `driver@example.com` | `Driver@123` | View assigned trips, update status |

> **⚠️ Registration Note:** New user registration requires email OTP verification. If email delivery is delayed in the deployed environment, the OTP is also displayed in a toast notification for demo convenience.

---

## ✨ Features

### 🔐 Authentication & Authorization
- Secure **JWT-based authentication** with HTTP-only cookies
- **One-click demo login** for all 3 roles
- **Email OTP verification** on registration
- **Role-based access control** enforced at middleware (`proxy.ts`) + API level
- Protected routes with role-specific dashboards

### 👤 Patient Features
- **Multi-step emergency request wizard** (Description → Pickup → Confirm)
- Real-time request list with URL-based filters and pagination
- Detailed request view with **status timeline**
- **Stripe test-mode payment** integration
- Payment history page

### 🚑 Driver Features
- Assigned trips dashboard with live status updates
- Sequential status flow: `DISPATCHED → EN_ROUTE → PICKED_UP → GOING_TO_HOSPITAL → ARRIVED → COMPLETED`
- Patient contact info access on assigned trips

### 👨‍💼 Admin Features
- **Analytics dashboard** with Recharts (requests by status)
- Dispatch management with filters and driver assignment
- Live emergency request oversight

### 🎨 UI/UX
- **Premium dark theme** with cinematic hero section
- Animated dispatch map visualization (SVG-based)
- Micro-interactions (pulse, float, fade-up animations)
- Fully responsive (mobile / tablet / desktop)
- Accessible components (keyboard navigation, ARIA labels)
- Loading skeletons, error boundaries, and custom 404
- Toast notifications (Sonner)

---

## 🛠️ Tech Stack

### Frontend
| Category | Technology |
|---|---|
| **Framework** | Next.js 16.3.7 (App Router, no `src/`, `--webpack` build) |
| **Language** | TypeScript 5 |
| **Styling** | Tailwind CSS v4 |
| **UI Library** | shadcn/ui (Radix UI + Nova preset) |
| **Data Fetching** | TanStack Query v5 |
| **Forms** | TanStack Form + Zod |
| **Global State** | Zustand (with persist) |
| **HTTP Client** | ofetch |
| **Charts** | Recharts |
| **Notifications** | Sonner |
| **Icons** | Lucide React |
| **OTP Input** | input-otp |
| **Payments** | Stripe Checkout (test mode) |

### Backend
| Category | Technology |
|---|---|
| **Runtime** | Node.js |
| **Framework** | Express 5 |
| **Database** | PostgreSQL (Neon) |
| **ORM** | Prisma 6 |
| **Auth** | JWT (access + refresh tokens) |
| **Password** | bcrypt |
| **Email** | Nodemailer + EJS templates |
| **Cache** | Redis (with DB fallback) |
| **Payments** | Stripe |

---

## 📁 Project Architecture

### Route Groups (Next.js App Router)
app/
├── (auth)/ # Public authentication pages
│ ├── layout.tsx # Auth layout (centered + premium background)
│ ├── login/page.tsx
│ ├── register/page.tsx
│ └── verify-email/page.tsx
│
├── (dashboard)/ # Protected role-based dashboard
│ ├── layout.tsx # Dashboard shell (sidebar + topbar)
│ ├── dashboard/ # Patient pages
│ │ ├── page.tsx
│ │ ├── requests/
│ │ │ ├── page.tsx
│ │ │ ├── new/page.tsx
│ │ │ └── [id]/page.tsx
│ │ └── payments/page.tsx
│ ├── provider/ # Driver pages
│ │ └── page.tsx
│ └── admin/ # Admin pages
│ ├── page.tsx
│ └── manage/page.tsx
│
├── (marketing)/ # Public marketing pages
│ ├── layout.tsx
│ ├── page.tsx
│ ├── about/page.tsx
│ ├── services/page.tsx
│ ├── pricing/page.tsx
│ └── contact/page.tsx
│
├── payment-success/page.tsx # Stripe success redirect
├── payment-cancel/page.tsx # Stripe cancel redirect
├── session/route.ts # Cookie session API route
├── layout.tsx # Root layout
├── not-found.tsx
└── globals.css

text

### Layered API Architecture
Component → Hook (TanStack Query) → API Function → apiClient (ofetch) → Backend

text

| Layer | Location | Purpose |
|---|---|---|
| **Components** | `components/` | UI + business logic (onSuccess/onError) |
| **Hooks** | `hooks/` | TanStack Query wrappers |
| **API** | `api/` | Endpoint definitions |
| **Client** | `lib/apiClient.ts` | HTTP config + auth headers |
| **Types** | `types/` | TypeScript interfaces |
| **Validation** | `validation/` | Zod schemas |

### Route Protection (`proxy.ts`)
Next.js 16's replacement for `middleware.ts`:
- Checks `ambulink-token` cookie on every request
- Redirects logged-out users away from `/dashboard`, `/provider`, `/admin`
- Redirects logged-in users away from `/login`, `/register`

---

## 🚀 Local Setup

### Prerequisites
- Node.js 18.18+
- npm or pnpm
- Backend API running (see backend repo)

### Steps

```bash
# 1. Clone the repository
git clone https://github.com/mehadishisir/AmbuLink-Emergency-Ambulance-Dispatch-System-Frontend.git
cd AmbuLink-Emergency-Ambulance-Dispatch-System-Frontend

# 2. Install dependencies
npm install

# 3. Create environment file
echo "NEXT_PUBLIC_API_URL=http://localhost:5000/api" > .env.local

# 4. Start development server
npm run dev
Open http://localhost:3000.

Production Build (Windows)
bash
npm run build     # Uses --webpack flag for Windows compatibility
npm start
📸 Screenshots
Add screenshots here after running the app:

Home page (dark premium hero with dispatch map)

Demo login page (3 role buttons)

Patient multi-step request wizard

Admin dashboard with chart

Driver status update flow

Stripe payment success

🧪 Testing Checklist
Feature	Status
One-click demo login (3 roles)	✅
Manual login/register + OTP	✅
Multi-step request wizard	✅
Request list with URL filters	✅
Admin assign driver	✅
Driver status update flow	✅
Stripe test payment	✅
Role-based route protection	✅
Mobile responsive	✅
Loading skeletons + error boundaries	✅
📄 Assignment Requirements Coverage
Requirement	Status
Next.js App Router + Server/Client split	✅
Tailwind + shadcn/ui (Radix)	✅
Auth + protected routes + role-based UI	✅
One-click demo login (3 roles)	✅
TanStack Query + Zustand	✅
TanStack Form + Zod	✅
Stripe test-mode payment	✅
20+ meaningful commits	✅
Live frontend URL	✅
Demo credentials	✅
5-10 min video walkthrough	✅
18+ pages	✅
Multi-step wizard form	✅
Recharts visualization	✅
Loading + error + not-found	✅
👨‍💻 Author
Mehadi Hassan

GitHub: @mehadishisir

Assignment: Programming Hero B7A7 — Emergency Ambulance Dispatch

📜 License
This project is part of Programming Hero's Level 2 Web Development course. MIT License.

text

---

## 📁 Backend README.md — Copy-Paste

**File:** `C:\Projects\emergency-ambulance-dispatch\README.md`

```markdown
# 🚑 Ambulink — Backend API

REST API for the Ambulink Emergency Ambulance Dispatch Platform. Built with **Express 5 + Prisma 6 + PostgreSQL** and **JWT-based authentication**.

![Express](https://img.shields.io/badge/Express-5.x-black?style=for-the-badge&logo=express)
![Prisma](https://img.shields.io/badge/Prisma-6.x-2D3748?style=for-the-badge&logo=prisma)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Neon-336791?style=for-the-badge&logo=postgresql)

---

## 🔗 Live URLs

| Resource | URL |
|---|---|
| **Live API** | [ambulink-nine.vercel.app](https://ambulink-nine.vercel.app) |
| **Frontend** | [ambu-link-emergency-ambulance-dispa-ashy.vercel.app](https://ambu-link-emergency-ambulance-dispa-ashy.vercel.app) |
| **Backend Repo** | [github.com/mehadishisir/AmbuLink-Emergency-Ambulance-Dispatch-System](https://github.com/mehadishisir/AmbuLink-Emergency-Ambulance-Dispatch-System) |

---

## 🛠️ Tech Stack

- **Runtime:** Node.js
- **Framework:** Express 5
- **Language:** TypeScript
- **Database:** PostgreSQL (Neon)
- **ORM:** Prisma 6
- **Auth:** JWT (access + refresh tokens)
- **Password Hashing:** bcrypt
- **Email:** Nodemailer + EJS
- **Payments:** Stripe (test mode)
- **Cache:** Redis (with DB fallback)

---

## 📡 API Endpoints

### 🔐 Auth (`/api/auth`)
| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | `/register` | Public | Register new user + send OTP |
| POST | `/verify-email` | Public | Verify OTP → returns JWT tokens |
| POST | `/login` | Public | Login with email + password |
| GET | `/me` | Auth | Get current user profile |
| POST | `/resend-otp` | Public | Resend verification OTP |
| POST | `/forgot-password` | Public | Request password reset OTP |
| POST | `/reset-password` | Public | Reset password with OTP |

### 🚑 Emergency Requests (`/api/emergency-requests`)
| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | `/` | PATIENT | Create emergency request |
| GET | `/` | ADMIN | Get all requests (with filters) |
| GET | `/my-requests` | PATIENT | Get own requests |
| GET | `/assigned` | DRIVER | Get assigned trips |
| GET | `/:id` | All | Get single request detail |
| PATCH | `/:id/assign` | ADMIN | Assign driver |
| PATCH | `/:id/status` | ADMIN, DRIVER | Update request status |

### 💳 Payments (`/api/payments`)
| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | `/create-checkout-session` | PATIENT | Create Stripe session |
| POST | `/verify-payment` | PATIENT, ADMIN | Verify payment |
| GET | `/request/:emergencyRequestId` | PATIENT, ADMIN | Get payment by request |

### 🚗 Drivers (`/api/drivers`)
| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | `/` | ADMIN | Create driver |
| GET | `/` | ADMIN | List all drivers |
| GET | `/me` | DRIVER | Get own driver profile |
| PATCH | `/me` | DRIVER | Update availability |
| GET | `/:id` | ADMIN, DRIVER | Get driver by ID |
| PATCH | `/:id` | ADMIN | Update driver |
| DELETE | `/:id` | ADMIN | Delete driver |

---

## 🔐 Authentication Flow
Register → POST /auth/register → OTP sent
↓
Verify Email → POST /auth/verify-email → JWT tokens + cookies
↓
Login → POST /auth/login → JWT tokens + cookies
↓
Protected Request → Authorization: Bearer <token> OR cookie

text

**Roles:** `PATIENT` | `DRIVER` | `ADMIN`

---

## 🚀 Local Setup

```bash
# 1. Clone
git clone https://github.com/mehadishisir/AmbuLink-Emergency-Ambulance-Dispatch-System.git
cd AmbuLink-Emergency-Ambulance-Dispatch-System

# 2. Install
npm install

# 3. Setup .env
cp .env.example .env
# Fill: DATABASE_URL, JWT_ACCESS_SECRET, JWT_REFRESH_SECRET,
#       ADMIN_EMAIL, ADMIN_PASSWORD, SMTP_USER, SMTP_PASSWORD,
#       STRIPE_SECRET_KEY, REDIS_HOST, etc.

# 4. Prisma
npx prisma generate --schema prisma/schema/schema.prisma
npx prisma migrate deploy --schema prisma/schema/schema.prisma

# 5. Run
npm run dev    # http://localhost:5000
📊 Prisma Models
User — id, name, email, phone, role, password, isActive, emailVerified, otp

Driver — licenseNumber, availabilityStatus, userId

EmergencyRequest — description, pickupAddress, priority, status, patientId, driverId, ambulanceId, hospitalId

Payment — amount, provider, transactionId, status, userId, emergencyRequestId

Ambulance — type, plateNumber, status

Hospital — name, address, contact

Notification — userId, type, message

Enums
UserRole: PATIENT | DRIVER | ADMIN

EmergencyPriority: LOW | MEDIUM | HIGH | CRITICAL

EmergencyRequestStatus: PENDING → DISPATCHING → DISPATCHED → EN_ROUTE → PICKED_UP → GOING_TO_HOSPITAL → ARRIVED → COMPLETED (or CANCELLED)

DriverAvailabilityStatus: AVAILABLE | BUSY | OFFLINE

PaymentProvider: BKASH | STRIPE

PaymentStatus: PENDING | INITIATED | SUCCESS | FAILED | CANCELLED | REFUNDED

👨‍💻 Author
Mehadi Hassan — @mehadishisir

Programming Hero B7A7 — Emergency Ambulance Dispatch

