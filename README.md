# 🚑 Ambulink — Emergency Ambulance Dispatch Platform

A modern, production-quality emergency ambulance dispatch platform connecting **patients**, **drivers**, and **admins** in one coordinated system. Built with **Next.js 16 App Router** as part of Programming Hero B7A7 assignment.

![Next.js](https://img.shields.io/badge/Next.js-16.3.7-black?style=for-the-badge&logo=next.js)
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
- Sequential status flow: DISPATCHED → EN_ROUTE → PICKED_UP → GOING_TO_HOSPITAL → ARRIVED → COMPLETED
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
