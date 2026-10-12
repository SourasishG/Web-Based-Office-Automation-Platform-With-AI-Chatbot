# Office Aid

### Enterprise Workplace Automation Platform & Herric AI Operations Copilot

[![React 19](https://img.shields.io/badge/React-19.0.0-61DAFB?style=flat-square&logo=react&logoColor=white)](https://react.dev/)
[![Vite 8](https://img.shields.io/badge/Vite-8.1.5-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS 4](https://img.shields.io/badge/TailwindCSS-4.0-38BDF8?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Node.js](https://img.shields.io/badge/Node.js-22-339933?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-5.0-000000?style=flat-square&logo=express&logoColor=white)](https://expressjs.com/)
[![Prisma ORM](https://img.shields.io/badge/Prisma-6.4.1-2D3748?style=flat-square&logo=prisma&logoColor=white)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/Supabase-PostgreSQL-3ECF8E?style=flat-square&logo=supabase&logoColor=white)](https://supabase.com/)
[![Gemini AI](https://img.shields.io/badge/Google_Gemini-1.5_Flash-8E75C2?style=flat-square&logo=google&logoColor=white)](https://ai.google.dev/)
[![ESLint Clean](https://img.shields.io/badge/ESLint-0_Errors-4B32C3?style=flat-square&logo=eslint&logoColor=white)](https://eslint.org/)

---

## 1. Executive Summary

**Office Aid** is an enterprise-grade workplace automation and operations management platform engineered to unify project delivery, agile task execution, team schedules, IT service management, corporate communications, talent directories, and executive intelligence.

Built with an **Apple Liquid Glass / visionOS aesthetic** (dual-theme glassmorphism, Framer Motion spring physics, ambient specular reflections) and powered by **Herric**, an integrated AI Operations Copilot running on **Google Gemini 1.5 Flash** with live **Supabase PostgreSQL** synchronization.

---

## 2. Architecture & Monorepo Structure

```text
Office-Aid/
├── 🎨 frontend/                     # React 19 + Vite 8 + Tailwind CSS 4 Client
│   ├── src/
│   │   ├── components/              # Design System & Layouts
│   │   │   ├── ui/                  # GlassPanel, GlassCard, GlassButton, GlassTabs, GlassModal
│   │   │   ├── common/              # HerricMarkdown, FloatingAiAssistant, ThemeToggle, ProtectedRoute
│   │   │   └── layout/              # DashboardLayout, Sidebar, Navbar, MobileSidebar, RightSidebar
│   │   ├── context/                 # AuthContext (JWT session management)
│   │   ├── features/                # Domain Feature Modules
│   │   │   ├── auth/                # Login with 1-click role switcher (Admin / Manager / Staff)
│   │   │   ├── chatbot/             # Dedicated full-page Herric AI Copilot (/chatbot & /herric)
│   │   │   ├── dashboard/           # Executive Greeting, Live Weather, Real-Time Stats Grid
│   │   │   ├── projects/            # Portfolio Grid, Progress Tracking, Member Allocation
│   │   │   ├── tasks/               # Agile Kanban Board, HTML5 Drag & Drop, Subtask Generator
│   │   │   ├── meetings/            # Daily Timeline, Video Syncs (Google Meet, Zoom, Teams)
│   │   │   ├── employees/           # Talent Directory, Grid/Table/OrgChart, Profile Editor
│   │   │   ├── emails/              # Internal Mail Client, AI Thread Summarizer & Reply Drafter
│   │   │   ├── tickets/             # IT Helpdesk Queue & Kanban, AI Root Cause Diagnosis
│   │   │   ├── notifications/       # Workplace Notification Center & Read Management
│   │   │   ├── profile/             # Executive Identity, Performance Overview, Security
│   │   │   └── error/               # Topographic Wave 404 Error Page
│   │   ├── hooks/                   # useAuth, useTheme
│   │   ├── routes/                  # AppRoutes Protected Navigation
│   │   ├── services/                # Axios API Client & Live Domain Service Connectors
│   │   │   ├── apiClient.js         # Base Axios instance with Bearer JWT interceptor
│   │   │   ├── authService.js       # Login, Register, Profile, Refresh
│   │   │   ├── aiService.js         # Herric Chat, Briefing, Ticket Assist, Email Summarize/Draft
│   │   │   ├── dashboardService.js  # Metrics, Announcements, Upcoming Syncs
│   │   │   ├── projectService.js    # Projects portfolio CRUD & filtering
│   │   │   ├── taskService.js       # Kanban tasks, reordering, status updates, stats
│   │   │   ├── ticketService.js     # Helpdesk tickets, comments, SLA stats
│   │   │   ├── meetingService.js    # Timeline, upcoming meetings, scheduler
│   │   │   ├── emailService.js      # Mail folders, compose, read toggles, stats
│   │   │   ├── employeeService.js   # Staff roster, org chart hierarchy, profile update
│   │   │   └── notificationService.js # Live notifications, batch mark read, delete
│   │   └── theme/                   # Liquid Glass Tokens & Specular Lighting
│   └── package.json
└── ⚡ backend/                      # Node.js 22 + Express 5 Service Layer
    ├── prisma/                      # Prisma ORM Schema & Migrations
    │   ├── schema.prisma            # 10 Relational Models (User, Employee, Project, Task, Ticket, etc.)
    │   └── seed.js                  # Enterprise database seeder with realistic test data
    ├── src/
    │   ├── config/                  # Environment variables & Supabase PostgreSQL client
    │   ├── controllers/             # RESTful API Controllers for all 11 modules
    │   ├── middleware/              # JWT Auth, Role-Based Access Control, Error Handlers
    │   ├── routes/                  # Express 5 Route Handlers (`/api/v1/*`)
    │   ├── services/                # Gemini 1.5 Flash AI Engine & Business Logic
    │   └── server.js                # Server Entry Point (CORS, JSON parser, Morgan logger)
    ├── Office-Aid.postman_collection.json # Complete 40-request Postman test suite
    └── package.json
```

---

## 3. Technology Stack

| Layer | Technology | Version | Purpose & Highlights |
| :--- | :--- | :--- | :--- |
| **Frontend Framework** | **React** | `19.0.0` | Modern UI leveraging hooks, context, and React 19 rendering |
| **Frontend Build Engine**| **Vite** | `8.1.5` | Instant HMR development server, fast sub-second bundle builds |
| **Styling Engine** | **Tailwind CSS** | `4.0` | Utility CSS with custom Apple Liquid Glass variables |
| **Physics & Animations**| **Framer Motion** | `12.0` | Spring physics, tab gliding, collapsible drawers, modal transitions |
| **Iconography** | **Lucide React** | `0.475.0` | Enterprise vector icon suite |
| **Backend Runtime** | **Node.js** | `22.x` | High-throughput asynchronous JavaScript runtime |
| **Backend Framework** | **Express.js** | `5.0` | Modular REST API engine with clean controller-service architecture |
| **Database & Hosting** | **Supabase PostgreSQL** | `15.x` | Cloud-hosted relational database with foreign key constraints & indexes |
| **Object-Relational Map**| **Prisma ORM** | `6.4.1` | Type-safe database queries, schema migrations, and relation resolution |
| **AI Operations Copilot**| **Google Gemini 1.5** | `Flash` | Context-aware intelligence, ticket diagnosis, subtask generation, email drafting |
| **Security & Auth** | **JWT & Bcrypt** | Standard | Stateless token verification with 7-day expiry and salted password hashing |
| **API Client** | **Axios** | `1.7.9` | Request/response interceptor injecting Bearer JWT tokens dynamically |

---

## 4. Herric AI Operations Copilot (`/chatbot` & `/herric`)

Named **Herric**, the workplace copilot is deeply wired into every operational surface of Office Aid:

1. **Executive Daily Briefing (`/api/v1/ai/briefing`)**:
   - Generates morning operational briefings analyzing active sprint velocity, upcoming meetings, open critical tickets, and unread priority emails.
2. **Interactive Workspace Chatbot (`/api/v1/ai/chat`)**:
   - Accessible via the **dedicated full-page command center** (`/chatbot` / `/herric`) and the global **floating slide-out assistant** (`FloatingAiAssistant.jsx`).
   - Supports **Workspace Context Mode** (injecting live tasks, tickets, meetings, and team data into the prompt) and General Assistant Mode.
   - Beautiful Markdown rendering with GitHub alerts, syntax-highlighted code blocks, and copy-to-clipboard actions via `HerricMarkdown.jsx`.
3. **IT Helpdesk Root Cause Diagnosis (`/api/v1/ai/ticket-assist`)**:
   - Analyzes support tickets in `TicketDetailModal.jsx` to synthesize root cause hypotheses, immediate troubleshooting steps, and prevention measures.
4. **Agile Subtask Generator (`TaskDetailsModal.jsx`)**:
   - Automatically decomposes complex engineering tasks into structured, actionable subtasks with 1 click.
5. **Email Intelligence (`EmailDetailView.jsx` & `ComposeEmailModal.jsx`)**:
   - **Summarize with Herric**: Condenses lengthy email threads into 3 crisp bullet points.
   - **Auto-Draft Reply**: Generates polite, context-aware executive responses ready to send.

---

## 5. Live Feature Modules

### 📊 Executive Dashboard (`/`)
- **Live Salutation Banner**: Real-time greeting with live second ticker clock.
- **Hyper-Local Weather**: Connected to Open-Meteo API with geolocation and WMO condition codes.
- **Live Metrics Summary Grid**: Connected to `GET /api/v1/dashboard/metrics` (Active Projects, Pending Tasks, Today's Syncs, Staff Count, Open Tickets).
- **Department Headcount Breakdown**: Visual distribution across Engineering, Design, Product, Marketing, and HR.
- **Company Announcements Broadcast**: Pinboard with category badges.

### 📋 Agile Kanban Tasks Command Center (`/tasks`)
- **Interactive Drag-and-Drop Board**: Four status columns (*To Do*, *In Progress*, *Review*, *Completed*) with HTML5 drag-and-drop.
- **Optimistic UI Updates**: Instant visual feedback while syncing to `PATCH /api/v1/tasks/:id/reorder`.
- **Dynamic Subtasks Checklist**: Interactive checkbox progress with real-time percentage meters.
- **Create Task Modal**: Add tasks with priority tier (*Critical, High, Medium, Low*), project linkage, and employee assignees.

### 🎫 IT Helpdesk Support Tickets (`/tickets`)
- **Multi-View Modes**: Switch between Kanban board and structured list views.
- **Live Ticket Metrics**: Real-time counters for Open, In Progress, Critical, and Resolved tickets.
- **Diagnose with Herric**: Built-in AI button generating structured troubleshooting protocols.
- **Comments & SLA Tracking**: Live timeline with employee attributions.

### 📅 Meetings & Calendar Workspace (`/meetings`)
- **Daily Timeline**: Hour-by-hour operational schedule view with real-time status badges.
- **1-Click Call Launcher**: Direct links to launch Google Meet, Zoom, or Microsoft Teams calls.
- **Schedule Meeting Modal**: Invite teammates from live database employee roster.

### 📧 Internal Mail & Communications (`/emails`)
- **Folder Navigation**: Inbox, Starred, Sent, Drafts, and Trash with unread counters.
- **Detail Reading Pane**: Full message viewer with Herric AI summarizer and 1-click reply drafting.
- **Compose Modal**: Glass modal form with live recipient picker and AI auto-writer.

### 👥 Talent Directory & Org Chart (`/employees`)
- **Triple Layout Switcher**:
  - **Grid View**: Specular glass cards with status rings, skill tags, contact links, and performance scores.
  - **Table View**: Compact enterprise table with role tiers and department badges.
  - **Org Chart Hierarchy**: Interactive visual tree mapping Executive Leadership → Department Leads → Team Specialists.
- **Add / Edit Employee Modal**: Update phone, location, skills, department, and job title with real-time persistence.

### 📁 Projects Workspace (`/projects`)
- **Portfolio Metrics**: Active, completed, and on-hold delivery tracking.
- **Progress Tracking**: Visual progress bars and countdown alerts.
- **Collaborator Stacks**: Real-time employee assignee avatars.

### 🔔 Workplace Notification Center (`/notifications`)
- **Real-Time Notification Feed**: Category filters (*Tasks, Meetings, Emails, Tickets, System*).
- **Batch Actions**: One-click Mark All as Read and Delete All triggers.

### 👤 Executive Profile (`/profile`)
- **Identity Banner**: Editable user attributes and theme switcher.
- **Security Hub**: Session management and password change triggers.

---

## 6. Pre-Seeded Test Accounts

The Supabase PostgreSQL database is seeded with realistic credentials for testing all role tiers:

| Role | Email | Password | Access Level |
| :--- | :--- | :--- | :--- |
| **Admin** | `sourasish.ghosh@officeaid.com` | `Admin@123` | Full Administrative & Operations Access |
| **Manager** | `aarav.sharma@officeaid.com` | `Admin@123` | Engineering Leadership & Project Management |
| **Staff** | `elena.rostova@officeaid.com` | `Admin@123` | Product Designer & Team Contributor |

> **Pro Tip**: The login screen (`/login`) includes **1-Click Quick Fill Buttons** for Admin, Manager, and Staff to switch roles instantly without typing.

---

## 7. REST API Catalog (`http://localhost:5000/api/v1`)

| Module | Route | Methods | Description |
| :--- | :--- | :--- | :--- |
| **Auth** | `/auth/login`, `/auth/register`, `/auth/me` | `POST`, `GET` | JWT authentication and session check |
| **AI Copilot** | `/ai/chat`, `/ai/briefing`, `/ai/ticket-assist`, `/ai/summarize-email`, `/ai/draft-reply` | `POST` | Herric operations intelligence engine |
| **Dashboard** | `/dashboard/metrics`, `/dashboard/stats` | `GET` | Executive metrics and KPIs |
| **Tasks** | `/tasks`, `/tasks/kanban`, `/tasks/stats`, `/tasks/:id/reorder` | `GET`, `POST`, `PATCH`, `DELETE` | Kanban task management |
| **Tickets** | `/tickets`, `/tickets/stats`, `/tickets/:id/comments` | `GET`, `POST`, `PATCH`, `DELETE` | IT helpdesk queue |
| **Meetings** | `/meetings`, `/meetings/timeline`, `/meetings/upcoming` | `GET`, `POST`, `PATCH`, `DELETE` | Calendar and video meetings |
| **Emails** | `/emails`, `/emails/folders`, `/emails/stats`, `/emails/:id/star` | `GET`, `POST`, `PATCH`, `DELETE` | Internal mail client |
| **Employees** | `/employees`, `/employees/stats`, `/employees/org-chart` | `GET`, `POST`, `PATCH`, `DELETE` | Talent directory & hierarchy |
| **Projects** | `/projects`, `/projects/stats` | `GET`, `POST`, `PATCH`, `DELETE` | Project delivery portfolios |
| **Notifications** | `/notifications`, `/notifications/stats`, `/notifications/mark-all-read` | `GET`, `PATCH`, `DELETE` | Alerts and push notifications |
| **Health** | `/health` | `GET` | Backend system & database uptime probe |

> The full Postman collection is located at [`backend/Office-Aid.postman_collection.json`](./backend/Office-Aid.postman_collection.json) featuring 40 pre-configured requests.

---

## 8. Installation & Setup Guide

### Prerequisites
- **Node.js**: v18.0.0 or higher (v22 recommended)
- **npm**: v9.0.0 or higher
- **Supabase PostgreSQL Database** (or local PostgreSQL)

### 1. Backend Setup
```bash
cd backend

# Install dependencies
npm install

# Configure environment variables (.env)
# DATABASE_URL="postgresql://postgres:[PASSWORD]@[HOST]:[PORT]/postgres?pgbouncer=true"
# DIRECT_URL="postgresql://postgres:[PASSWORD]@[HOST]:[PORT]/postgres"
# JWT_SECRET="your_secret_key"
# GEMINI_API_KEY="your_gemini_key"
# PORT=5000

# Push Prisma schema to database
npx prisma db push

# Seed initial workspace records
npm run prisma:seed

# Start backend server in development mode
npm run dev
```
> Express API will run at `http://localhost:5000/`. Verify health at `http://localhost:5000/api/v1/health`.

### 2. Frontend Setup
```bash
cd frontend

# Install dependencies
npm install

# Configure environment variables (.env)
# VITE_API_BASE_URL="http://localhost:5000/api/v1"

# Start Vite client development server
npm run dev
```
> Vite will launch at `http://localhost:5173/`. Open in your browser and sign in!

### 3. Production Build Verification
```bash
# Verify client build
cd frontend
npm run build
```

---

<div align="center">

**Office Aid Workplace Platform** • Designed & Developed by **Sourasish Ghosh**

</div>
