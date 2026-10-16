# 🏢 Office Aid

### Enterprise Workplace Automation Platform & Herric AI Operations Copilot

[![React 19](https://img.shields.io/badge/React-19.2.6-61DAFB?style=flat-square&logo=react&logoColor=white)](https://react.dev/)
[![Vite 8](https://img.shields.io/badge/Vite-8.0.12-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS 4](https://img.shields.io/badge/TailwindCSS-4.3.3-38BDF8?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.4.2-FF0055?style=flat-square&logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![Node.js](https://img.shields.io/badge/Node.js-22_LTS-339933?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-5.3-000000?style=flat-square&logo=express&logoColor=white)](https://expressjs.com/)
[![Prisma ORM](https://img.shields.io/badge/Prisma-6.4.1-2D3748?style=flat-square&logo=prisma&logoColor=white)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/Supabase-PostgreSQL-3ECF8E?style=flat-square&logo=supabase&logoColor=white)](https://supabase.com/)
[![Gemini AI](https://img.shields.io/badge/Google_Gemini-Multi--Model_Failover-8E75C2?style=flat-square&logo=google&logoColor=white)](https://ai.google.dev/)
[![ESLint Clean](https://img.shields.io/badge/ESLint-0_Errors_|_0_Warnings-4B32C3?style=flat-square&logo=eslint&logoColor=white)](https://eslint.org/)

---

## 📖 Module Documentation
For deep-dive documentation on specific layers of the system:
- 🎨 **[Frontend Documentation (React 19 + Tailwind 4)](./frontend/README.md)**
- ⚡ **[Backend Documentation (Express 5 + Prisma + Gemini)](./backend/README.md)**

---

## 1. Executive Summary

**Office Aid** is an enterprise-grade workplace automation and operations management platform engineered to unify project delivery, agile task execution, team schedules, IT service management, corporate communications, talent directories, and executive intelligence.

Built with an **Apple Liquid Glass / visionOS aesthetic** (multi-layered glassmorphism, Framer Motion spring physics, ambient specular reflections) and powered by **Herric**, an integrated AI Operations Copilot running on **Google Gemini** with multi-model failover and live **Supabase PostgreSQL** synchronization.

---

## 2. Architecture & Monorepo Structure

```text
Office-Aid/
├── 🎨 frontend/                     # React 19 + Vite 8 + Tailwind CSS 4 Client
│   ├── src/
│   │   ├── components/              # Design System, Calendar & Layouts
│   │   │   ├── calendar/            # MiniCalendar & CalendarDay components
│   │   │   ├── ui/                  # GlassPanel, GlassCard, GlassButton, GlassTabs, GlassModal
│   │   │   ├── common/              # HerricMarkdown, FloatingAiAssistant, ThemeToggle, ProtectedRoute
│   │   │   └── layout/              # DashboardLayout, Sidebar, Navbar, RightSidebar
│   │   ├── context/                 # AuthContext (JWT session persistence)
│   │   ├── features/                # Domain Feature Modules
│   │   │   ├── auth/                # Sign In & Sign Up with instant PostgreSQL persistence
│   │   │   ├── chatbot/             # Dedicated full-page Herric AI Copilot (/chatbot & /herric)
│   │   │   ├── dashboard/           # Executive Greeting, Live Weather, Real-Time Stats Grid
│   │   │   ├── projects/            # Portfolio Grid, Progress Tracking, Member Allocation
│   │   │   ├── tasks/               # Agile Kanban Board, HTML5 Drag & Drop, Subtask Progress
│   │   │   ├── meetings/            # Daily Timeline, Day Navigation, Interactive CalendarModal
│   │   │   ├── employees/           # Talent Directory, Grid/Table/OrgChart, Profile Editor
│   │   │   ├── emails/              # Internal Mail Client, AI Thread Summarizer & Reply Drafter
│   │   │   ├── tickets/             # IT Helpdesk Queue & Kanban, AI Root Cause Diagnosis
│   │   │   ├── notifications/       # Workplace Notification Center & Read Management
│   │   │   ├── profile/             # Executive Identity, Performance Overview, Security
│   │   │   └── error/               # Topographic Wave 404 Error Page
│   │   ├── hooks/                   # useAuth, useTheme
│   │   ├── routes/                  # AppRoutes Protected Navigation
│   │   ├── services/                # Native fetch API Client & Live Domain Connectors
│   │   │   ├── apiClient.js         # Bearer JWT interceptor with auto 401 handling & unwrapping
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
│   ├── README.md                    # Detailed frontend documentation
│   └── package.json
└── ⚡ backend/                      # Node.js 22 + Express 5 Service Layer
    ├── prisma/                      # Prisma ORM Schema & Migrations
    │   ├── schema.prisma            # 10 Relational Models (User, Project, Task, Ticket, etc.)
    │   └── seed.js                  # Enterprise database seeder
    ├── src/
    │   ├── config/                  # Supabase PostgreSQL client singleton
    │   ├── controllers/             # RESTful API Controllers for all 10 domain modules
    │   ├── middlewares/             # JWT Auth, Role-Based Access Control, Error Handlers
    │   ├── routes/                  # Express 5 Route Handlers (`/api/v1/*`)
    │   ├── services/                # Gemini AI Engine with Failover Chain & Business Logic
    │   ├── utils/                   # Standardized ApiError and ApiResponse classes
    │   ├── validators/              # Zod schema validators with sanitization
    │   └── server.js                # Server Entry Point (CORS, JSON parser, Cookie parser)
    ├── Office-Aid.postman_collection.json # 40-request Postman test suite
    ├── README.md                    # Detailed backend documentation
    └── package.json
```

---

## 3. Technology Stack

| Layer | Technology | Version | Purpose & Highlights |
| :--- | :--- | :--- | :--- |
| **Frontend Framework** | **React** | `19.2.6` | Modern UI leveraging hooks, context, and React 19 concurrent features |
| **Frontend Build Engine**| **Vite** | `8.0.12` | Sub-second HMR development server, optimized production bundles |
| **Styling Engine** | **Tailwind CSS** | `4.3.3` | Utility CSS with custom Apple Liquid Glass design variables |
| **Physics & Animations**| **Framer Motion** | `12.4.2` | Spring physics, tab gliding, collapsible drawers, modal transitions |
| **Iconography** | **Lucide React** | `0.511.0` | Comprehensive vector iconography suite |
| **Backend Runtime** | **Node.js** | `22.x LTS` | High-throughput asynchronous JavaScript runtime |
| **Backend Framework** | **Express.js** | `5.3.0` | Modular REST API engine (`type: module`) with native async error handling |
| **Database & Hosting** | **Supabase PostgreSQL** | `15.x` | Cloud-hosted relational database with foreign key constraints & pooling |
| **Object-Relational Map**| **Prisma ORM** | `6.4.1` | Type-safe database queries, schema migrations, and relation resolution |
| **AI Operations Copilot**| **Google Gemini** | Multi-Model | Resilient failover chain (`gemini-2.5-flash` / `gemini-3.6-flash` → `gemini-3.5-flash` → `gemini-flash-lite-latest`) |
| **Security & Auth** | **JWT & Bcrypt** | Standard | Stateless token verification with 7-day expiry and salted password hashing |
| **API Client** | **Native Fetch** | Standard | Universal `apiClient` with Bearer token injection and response unwrapping |

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
6. **Meeting Scheduling Protocol**:
   - Understands natural language meeting prompts and schedules video calls with team attendees.

---

## 5. Live Feature Modules

### 🔐 Authentication & Self-Registration (`/login`)
- **Dual-Mode Switcher**: Toggle seamlessly between **Sign In** and **Sign Up (New User)** tabs.
- **First-Time Sign Up**: New users create an account with First Name, Last Name, Work Email, Department, Job Title, and Password. Credentials are encrypted and persisted to Supabase PostgreSQL, instantly establishing a new session.
- **Subsequent Logins**: Registered users simply sign in anytime with their credentials.
- **Administrator Quick Demo**: 1-click login button for the pre-seeded Admin account.

### 📅 Meetings & Calendar Workspace (`/meetings`)
- **Daily Timeline**: Hour-by-hour operational schedule view with live progress indicators.
- **Interactive Day Navigation**: Switch days with `< Prev Day` and `Next Day >`, or click `Today` to jump back to current operations.
- **Interactive Calendar Modal (`CalendarModal.jsx`)**:
  - Embedded monthly overview with event indicator dots on days with scheduled meetings.
  - Selecting any date presents that day's scheduled meetings, with direct links to *"View in Timeline"* or *"Schedule on This Date"*.
  - Accessible via the **"Calendar"** button in the header, the **"Calendar Sync"** badge, or the **"View Calendar"** button.
- **1-Click Call Launcher**: Direct links to launch Google Meet, Zoom, or Microsoft Teams calls.
- **Manual Scheduling Modal**: Invite colleagues from the live talent directory with automatic video URL formatting (`https://` prefixing).

### 📋 Agile Kanban Tasks Command Center (`/tasks`)
- **Interactive Drag-and-Drop Board**: Four status columns (*To Do*, *In Progress*, *Review*, *Completed*) with HTML5 drag-and-drop.
- **Optimistic UI Updates**: Instant visual feedback while syncing to `PATCH /api/v1/tasks/:id/reorder`.
- **Dynamic Subtasks Checklist**: Interactive checkbox progress with real-time percentage meters.
- **Create Task Modal**: Add tasks with priority tier (*Critical, High, Medium, Low*), project linkage, and employee assignees.

### 🎫 IT Helpdesk Support Tickets (`/tickets`)
- **Multi-View Modes**: Switch between Kanban board and structured list views.
- **Live Ticket Metrics**: Real-time counters for Open, In Progress, Critical, and Resolved tickets.
- **Diagnose with Herric**: Built-in AI button generating structured troubleshooting protocols.
- **Comments & SLA Tracking**: Live conversation thread with employee attributions.

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

### 📊 Executive Dashboard (`/`)
- **Live Salutation Banner**: Real-time greeting with live second ticker clock.
- **Hyper-Local Weather**: Connected to Open-Meteo API with geolocation and WMO condition codes.
- **Live Metrics Summary Grid**: Connected to `GET /api/v1/dashboard/metrics`.
- **Department Headcount Breakdown**: Visual distribution across Engineering, Design, Product, Marketing, and HR.
- **Company Announcements Broadcast**: Pinboard with category badges.

### 🔔 Workplace Notification Center (`/notifications`)
- **Real-Time Notification Feed**: Category filters (*Tasks, Meetings, Emails, Tickets, System*).
- **Batch Actions**: One-click Mark All as Read and Clear All triggers.

---

## 6. Authentication & User Accounts

### Pre-Seeded Administrator Account
For instant testing, the platform includes a pre-seeded Admin account:

| Role | Email | Password | Access Level |
| :--- | :--- | :--- | :--- |
| **Admin** | `sourasish.ghosh@officeaid.com` | `Admin@123` | Full Administrative & Operations Access |

### Self-Registration for Real Users
New users can create their own accounts by clicking the **"Sign Up (New User)"** tab on [`/login`](http://localhost:5173/login). The credentials are encrypted with `bcryptjs` and stored in PostgreSQL, allowing immediate access and persistent subsequent logins.

---

## 7. REST API Catalog (`http://localhost:5000/api/v1`)

| Module | Route | Methods | Description |
| :--- | :--- | :--- | :--- |
| **Auth** | `/auth/register`, `/auth/login`, `/auth/me`, `/auth/logout` | `POST`, `GET` | User registration, JWT login, and profile check |
| **AI Copilot** | `/ai/chat`, `/ai/briefing`, `/ai/ticket-assist`, `/ai/generate-subtasks`, `/ai/summarize-email`, `/ai/draft-reply` | `POST` | Herric operations intelligence engine |
| **Dashboard** | `/dashboard/metrics`, `/dashboard/stats` | `GET` | Executive metrics and KPIs |
| **Tasks** | `/tasks`, `/tasks/kanban`, `/tasks/stats`, `/tasks/:id/reorder` | `GET`, `POST`, `PATCH`, `DELETE` | Kanban task management & drag-and-drop |
| **Meetings** | `/meetings`, `/meetings/stats`, `/meetings/timeline`, `/meetings/upcoming`, `/meetings/:id` | `GET`, `POST`, `PATCH`, `DELETE` | Schedule, timeline, and video syncs |
| **Tickets** | `/tickets`, `/tickets/stats`, `/tickets/:id/comments` | `GET`, `POST`, `PATCH`, `DELETE` | IT helpdesk queue & SLA management |
| **Emails** | `/emails`, `/emails/folders`, `/emails/stats`, `/emails/:id/star` | `GET`, `POST`, `PATCH`, `DELETE` | Internal mail client & folders |
| **Employees** | `/employees`, `/employees/stats`, `/employees/org-chart` | `GET`, `POST`, `PATCH`, `DELETE` | Talent directory & hierarchy tree |
| **Projects** | `/projects`, `/projects/stats` | `GET`, `POST`, `PATCH`, `DELETE` | Project delivery portfolios |
| **Notifications** | `/notifications`, `/notifications/stats`, `/notifications/mark-all-read` | `GET`, `PATCH`, `DELETE` | Alerts and push notifications |
| **Health** | `/health` | `GET` | System uptime & Supabase PostgreSQL probe |

---

## 8. Installation & Setup Guide

### Prerequisites
- **Node.js**: v20.0.0 or higher (v22 LTS recommended)
- **npm**: v9.0.0 or higher
- **Supabase PostgreSQL** database instance

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

# Push Prisma schema to Supabase database
npm run prisma:push

# (Optional) Seed initial records
npm run prisma:seed

# Start backend server in watch mode
npm run dev
```
> The API server will run at `http://localhost:5000/`. Verify health at `http://localhost:5000/api/v1/health`.

### 2. Frontend Setup
```bash
cd frontend

# Install dependencies
npm install

# Start Vite client development server
npm run dev
```
> Vite will launch at `http://localhost:5173/`. Open in your browser and sign in or sign up!

### 3. Code Quality Verification
```bash
# Verify client code quality (Guaranteed 0 errors and 0 warnings)
cd frontend
npm run lint

# Verify client production build
npm run build
```

---

<div align="center">

**Office Aid Workplace Platform** • Designed & Developed by **Sourasish Ghosh**

</div>
