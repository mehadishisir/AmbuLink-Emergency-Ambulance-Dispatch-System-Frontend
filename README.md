# 🚑 AmbuLink — Emergency Ambulance Dispatch System

<p align="center">
  <strong>Emergency Response. Smarter Dispatch. Faster Care.</strong>
</p>

<p align="center">
  A full-stack emergency ambulance dispatch platform designed to connect patients, ambulance drivers, and administrators through a centralized emergency response system.
</p>

<p align="center">
  <a href="https://ambu-link-emergency-ambulance-dispa-ashy.vercel.app">Live Application</a> •
  <a href="https://github.com/mehadishisir/AmbuLink-Emergency-Ambulance-Dispatch-System">Backend Repository</a> •
  <a href="https://github.com/mehadishisir/AmbuLink-Emergency-Ambulance-Dispatch-System-Frontend">Frontend Repository</a>
</p>

---

## ✨ Overview

**AmbuLink** is a full-stack emergency ambulance dispatch application built to streamline the process of requesting an ambulance, managing dispatch operations, and tracking emergency request progress.

The platform provides dedicated experiences for three user roles: Patients, Drivers, and Administrators. It combines role-based access control, emergency request management, hospital and ambulance information, and payment integration in one application.

The project focuses on practical full-stack development concepts, including REST APIs, authentication, database management, client-side state management, validation, and deployment.

## 🌐 Live Demo

**Application:** https://ambu-link-emergency-ambulance-dispa-ashy.vercel.app

**Backend API:** https://ambulink-nine.vercel.app

**API Base URL:** `https://ambulink-nine.vercel.app/api`

### 🔐 Demo Accounts

Use the following demo credentials to explore the application.

| Role | Email | Password |
|---|---|---|
| Admin | `admin@example.com` | `Admin@123` |
| Patient | `patient@example.com` | `Patient@123` |
| Driver | `driver@example.com` | `Driver@123` |

> These are demonstration credentials intended for the project showcase. Do not use them for real accounts or sensitive information.

## 🚀 Key Features

### 👤 Authentication & Authorization
- User registration with email OTP verification.
- Secure password hashing.
- JWT-based authentication.
- Access-token and refresh-token support.
- Role-based route protection.
- Dedicated demo login options for all three roles.

### 🏥 Patient Experience
- Patient dashboard.
- Multi-step emergency ambulance request form.
- Emergency priority selection.
- Emergency request submission and validation.
- Personal emergency request history.
- Request status visibility.
- Integrated payment workflow.

### 🚑 Driver Experience
- Dedicated driver dashboard.
- Assigned emergency trip management.
- Emergency request status updates.
- Role-restricted access to driver features.

### 🛡️ Administration
- Dedicated administrator dashboard.
- Centralized emergency dispatch management.
- Ambulance, driver, hospital, and emergency request management.
- Role-based administrative access.
- Dashboard visualization using charting tools.

### 💳 Payments
- Stripe checkout integration.
- Payment verification API.
- Emergency request payment lookup.
- Test-mode payment support, subject to valid Stripe configuration.

### ⚙️ Engineering & Reliability
- Structured REST API architecture.
- PostgreSQL database with Prisma ORM.
- Redis-backed registration OTP and temporary registration data.
- Email notifications.
- Request validation and centralized error handling.
- Protected routes and role-aware navigation.
- Loading, error, and not-found UI states.
- Production deployment with Vercel.

## 🧑‍💻 Tech Stack

### Frontend
- Next.js 16 — App Router
- React 19
- TypeScript
- Tailwind CSS v4
- shadcn/ui
- TanStack Query
- TanStack Form
- Zod
- Zustand
- ofetch
- Recharts
- Sonner
- Lucide React

### Backend
- Node.js
- Express.js
- TypeScript
- PostgreSQL
- Prisma ORM
- Redis
- JSON Web Tokens (JWT)
- bcryptjs
- Nodemailer
- EJS
- Stripe API
- Google OAuth

### Deployment & Tools
- Vercel
- Neon PostgreSQL
- Git and GitHub
- Postman

## 🏗️ System Architecture

The application follows a client-server architecture.

```text
┌─────────────────────────────┐
│       Next.js Frontend      │
│                             │
│ Patient · Driver · Admin    │
└──────────────┬──────────────┘
               │
               │ REST API / JWT
               ▼
┌─────────────────────────────┐
│       Express Backend       │
│                             │
│ Authentication & Validation │
│ Business Logic & API Routes │
└───────┬───────────┬─────────┘
        │           │
        ▼           ▼
┌──────────────┐ ┌─────────────┐
│ PostgreSQL   │ │    Redis    │
│ Prisma ORM   │ │ Temporary   │
│              │ │ OTP Data    │
└──────────────┘ └─────────────┘
        │
        ▼
┌─────────────────────────────┐
│ External Integrations       │
│ Email · Stripe · Google     │
└─────────────────────────────┘
```

## 🔌 API Overview

All application endpoints use the `/api` prefix.

| Resource | Base Endpoint | Purpose |
|---|---|---|
| Authentication | `/api/auth` | Registration, login, email verification, and authentication |
| Hospitals | `/api/hospitals` | Hospital-related operations |
| Ambulances | `/api/ambulances` | Ambulance-related operations |
| Drivers | `/api/drivers` | Driver-related operations |
| Emergency Requests | `/api/emergency-requests` | Request creation, retrieval, assignment, and status updates |
| Payments | `/api/payments` | Checkout creation and payment verification |

### Emergency Request Endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| `POST` | `/api/emergency-requests` | Create an emergency request |
| `GET` | `/api/emergency-requests/my-requests` | Retrieve the current patient's requests |
| `GET` | `/api/emergency-requests/assigned` | Retrieve assigned requests |
| `PATCH` | `/api/emergency-requests/:id/assign` | Assign an emergency request |
| `PATCH` | `/api/emergency-requests/:id/status` | Update request status |

Protected endpoints require the appropriate authentication and authorization.

## 🛠️ Getting Started

### Prerequisites

Make sure you have installed:

- Node.js
- npm
- PostgreSQL
- Redis
- Git

You will also need the appropriate credentials for any external services you configure.

### 1. Clone the Repository

```bash
git clone https://github.com/mehadishisir/AmbuLink-Emergency-Ambulance-Dispatch-System.git

cd AmbuLink-Emergency-Ambulance-Dispatch-System
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the project root using the variable names expected by the application.

```env
NODE_ENV=development
PORT=5000

DATABASE_URL=

ADMIN_NAME=
ADMIN_EMAIL=
ADMIN_PASSWORD=

JWT_ACCESS_SECRET=
JWT_REFRESH_SECRET=
JWT_ACCESS_EXPIRES_IN=
JWT_REFRESH_EXPIRES_IN=

BCRYPT_SALT_ROUNDS=

BACKEND_URL=
FRONTEND_URL=

REDIS_HOST=
REDIS_PORT=
REDIS_USERNAME=
REDIS_PASSWORD=

SMTP_USER=
SMTP_PASSWORD=
EMAIL_SENDER=

OTP_EXPIRES_IN_SECONDS=

STRIPE_SECRET_KEY=

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_CALLBACK_URL=
```

> Replace the empty values with your own development credentials. Never commit `.env` files, private keys, real passwords, or production secrets to GitHub.

### 4. Generate the Prisma Client

```bash
npx prisma generate
```

### 5. Start the Development Server

```bash
npm run dev
```

The local API is typically available at:

`http://localhost:5000`

Check the project's existing scripts and Prisma configuration before running database migrations or seed commands.

### 6. Build for Production

```bash
npm run build
```

## 🔒 Security Considerations

- Passwords are hashed before storage.
- Authentication uses JWT-based tokens.
- Protected operations enforce authorization.
- Registration OTP and temporary registration data use Redis expiration.
- Environment variables are used for service credentials.
- CORS is configured to allow designated frontend origins.
- Unexpected internal errors are handled centrally.

**Important:** This project is a demonstration and learning application. A production emergency response service would require additional operational safeguards, monitoring, privacy controls, reliability testing, and integration with real emergency service providers.

## 📁 Project Structure

```text
src/
├── config/
├── lib/
├── middleware/
├── module/
│   ├── Auth/
│   ├── Hospital/
│   ├── Ambulance/
│   ├── Driver/
│   ├── EmergencyRequest/
│   └── Payment/
├── templates/
├── utils/
└── server.ts

prisma/
└── schema/

dist/
```

The backend is organized by feature modules, separating route definitions, business logic, shared infrastructure, middleware, and utility functions.

## 🎯 Project Goals

AmbuLink was built to demonstrate practical experience with:

- Full-stack application development.
- REST API design and integration.
- Authentication and role-based authorization.
- Database modeling and ORM usage.
- Redis integration.
- Form validation and client-side state management.
- Payment service integration.
- Error handling and deployment workflows.

## 👨‍💻 Author

**Mehadi Hasan Shisir**

Full-Stack Web Developer

- GitHub: https://github.com/mehadishisir
- LinkedIn: https://www.linkedin.com/in/mehadishisir/

---

<p align="center">
  <strong>AmbuLink — Connecting Emergency Needs with Ambulance Dispatch.</strong>
</p>
