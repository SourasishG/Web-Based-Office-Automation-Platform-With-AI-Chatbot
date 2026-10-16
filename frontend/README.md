# 🎨 Office Aid - Frontend Client Application

[![React 19](https://img.shields.io/badge/React-19.2.6-61DAFB?style=flat-square&logo=react&logoColor=white)](https://react.dev/)
[![Vite 8](https://img.shields.io/badge/Vite-8.0.12-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS 4](https://img.shields.io/badge/TailwindCSS-4.3.3-38BDF8?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.4.2-FF0055?style=flat-square&logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![Lucide React](https://img.shields.io/badge/Lucide_React-0.511-F05032?style=flat-square&logo=lucide&logoColor=white)](https://lucide.dev/)
[![ESLint Clean](https://img.shields.io/badge/ESLint-0_Errors_|_0_Warnings-4B32C3?style=flat-square&logo=eslint&logoColor=white)](https://eslint.org/)

The frontend client application for **Office Aid**, an enterprise workplace operations platform engineered with an **Apple Liquid Glass / visionOS aesthetic**, fluid Framer Motion animations, real-time backend synchronization, and the integrated **Herric AI Operations Copilot**.

---

## 📋 Table of Contents
1. [Design Philosophy & Liquid Glass Tokens](#-design-philosophy--liquid-glass-tokens)
2. [Tech Stack](#-tech-stack)
3. [Project Directory Layout](#-project-directory-layout)
4. [Feature Modules Deep Dive](#-feature-modules-deep-dive)
5. [Universal API Client (`apiClient.js`)](#-universal-api-client-apiclientjs)
6. [Environment Variables](#-environment-variables)
7. [Getting Started & Development](#-getting-started--development)

---

## 💎 Design Philosophy & Liquid Glass Tokens

Office Aid's UI is modeled after Apple's **visionOS** and macOS Liquid Glass design language:
- **Multi-Layered Glassmorphism**: High-blur backdrops (`backdrop-blur-3xl`, `backdrop-blur-xl`) with semi-transparent tinted glass surfaces (`bg-slate-900/60`, `bg-white/5`).
- **Specular Border Highlights**: Subtle top-lit gradients and ambient edge highlights (`border-white/10`, `border-cyan-400/30`, `border-purple-500/30`) that react on hover.
- **Physics-Based Spring Transitions**: Powered by Framer Motion springs (`stiffness: 280`, `damping: 24`, `snappy`) for tabs, modals, collapsible drawers, and alert banners.
- **Ambient Light Diffusion**: Soft radial blur glow lights positioned across the viewport canvas for depth perception.

---

## 🛠 Tech Stack

| Technology | Version | Purpose |
| :--- | :--- | :--- |
| **React** | `19.2.6` | Modern component architecture, hooks, and React 19 concurrent features |
| **Vite** | `8.0.12` | Lightning-fast development server with hot module replacement (HMR) |
| **Tailwind CSS** | `4.3.3` | Utility-first styling with `@tailwindcss/vite` plugin integration |
| **Framer Motion** | `12.4.2` | Spring physics, layout animations, drag-and-drop feedback, exit transitions |
| **Lucide React** | `0.511.0` | Comprehensive vector iconography suite |
| **React Router DOM** | `7.18.1` | Declarative client-side routing with protected route guards |
| **Recharts** | `3.9.2` | Data visualization charts |
| **React CountUp** | `6.5.3` | Smooth metric number counter animations |
| **ESLint** | `10.3.0` | Code quality enforcement adhering to zero errors and warnings |

---

## 📂 Project Directory Layout

```text
frontend/
├── src/
│   ├── components/
│   │   ├── calendar/           # Interactive Monthly Calendar System
│   │   │   ├── CalendarDay.jsx # Day tile with selection ring & event indicators
│   │   │   ├── MiniCalendar.jsx # Full interactive month grid with navigation
│   │   │   └── index.js
│   │   ├── cards/              # Generic statistical & deadline cards
│   │   ├── common/             # Shared enterprise components
│   │   │   ├── FloatingAiAssistant.jsx # Global floating Herric Copilot drawer
│   │   │   ├── HerricMarkdown.jsx      # Markdown parser with alerts & code syntax
│   │   │   ├── ProtectedRoute.jsx      # Route authentication guard
│   │   │   └── ThemeToggle.jsx
│   │   ├── layout/             # Master structural wrappers
│   │   │   ├── DashboardLayout.jsx     # Main workspace grid wrapper
│   │   │   ├── Navbar.jsx              # Top bar with quick actions & search
│   │   │   ├── RightSidebar.jsx        # Executive side tray
│   │   │   └── Sidebar.jsx             # Collapsible primary navigation
│   │   └── ui/                 # Reusable Apple Liquid Glass UI Library
│   │       ├── GlassAvatar.jsx
│   │       ├── GlassBadge.jsx
│   │       ├── GlassButton.jsx
│   │       ├── GlassCard.jsx
│   │       ├── GlassInput.jsx
│   │       ├── GlassModal.jsx
│   │       ├── GlassNotification.jsx
│   │       ├── GlassPanel.jsx
│   │       ├── GlassSearchBar.jsx
│   │       ├── GlassSelect.jsx
│   │       ├── GlassTabs.jsx
│   │       ├── GlassTextarea.jsx
│   │       └── index.js
│   ├── context/
│   │   ├── AuthContext.jsx     # JWT session persistence & role provider
│   │   └── AuthContextObject.js
│   ├── features/               # Domain feature modules
│   │   ├── auth/               # Sign In & Sign Up with database persistence
│   │   │   └── Login.jsx
│   │   ├── chatbot/            # Dedicated full-page Herric AI Copilot view
│   │   │   └── Chatbot.jsx
│   │   ├── dashboard/          # Executive dashboard & live weather
│   │   │   ├── components/     # Greeting, Weather, StatsGrid, Announcements
│   │   │   └── Dashboard.jsx
│   │   ├── emails/             # Internal email client with Herric summarizer
│   │   │   ├── components/     # EmailList, EmailDetail, ComposeModal
│   │   │   └── Emails.jsx
│   │   ├── employees/          # Talent directory & organizational chart
│   │   │   ├── components/     # EmployeeGrid, EmployeeTable, OrgChart
│   │   │   └── Employees.jsx
│   │   ├── error/              # Topographic 404 error page
│   │   ├── meetings/           # Meetings, timeline, and interactive calendar
│   │   │   ├── components/     # DailyTimeline, UpcomingMeetings, CalendarModal, ScheduleMeetingModal
│   │   │   └── Meetings.jsx
│   │   ├── notifications/      # Notifications feed with category filters
│   │   │   └── Notifications.jsx
│   │   ├── profile/            # Executive profile editor & security settings
│   │   │   └── Profile.jsx
│   │   ├── projects/           # Portfolio project grid & collaborator stacks
│   │   │   └── Projects.jsx
│   │   └── tasks/              # Agile Kanban board with HTML5 Drag & Drop
│   │       ├── components/     # TaskColumn, TaskCard, TaskDetailsModal, CreateTaskModal
│   │       └── Tasks.jsx
│   ├── hooks/
│   │   ├── useAuth.js          # Authentication context hook
│   │   └── useTheme.js
│   ├── routes/
│   │   └── AppRoutes.jsx       # Application routing configuration
│   ├── services/               # Live REST API Service layer
│   │   ├── apiClient.js        # Universal native fetch client with Bearer injection
│   │   ├── aiService.js        # Herric AI endpoints
│   │   ├── authService.js      # Register, login, me, logout
│   │   ├── dashboardService.js
│   │   ├── emailService.js
│   │   ├── employeeService.js
│   │   ├── meetingService.js   # Timeline, upcoming, scheduler
│   │   ├── notificationService.js
│   │   ├── projectService.js
│   │   ├── taskService.js      # Drag-and-drop reordering
│   │   └── ticketService.js
│   ├── theme/
│   │   ├── animations.js       # Framer Motion spring presets
│   │   └── glass.js            # Glassmorphism tokens & specular borders
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── package.json
└── README.md
```

---

## 🚀 Feature Modules Deep Dive

### 1. 🔐 Authentication (`/login`)
- **Dual-Mode Switcher**: Toggle seamlessly between **Sign In** and **Sign Up (New User)** tabs.
- **First-Time Sign Up**: New users register with First Name, Last Name, Work Email, Department, Job Title, and Password (min 6 characters with confirmation).
- **Instant Persistence**: Automatically hashes password with bcrypt, stores user profile in Supabase PostgreSQL, assigns standard `EMPLOYEE` role, generates JWT, and routes directly to the dashboard.
- **Subsequent Logins**: Existing users can simply log in anytime with their credentials.
- **Quick Demo Account**: 1-click preset button for Administrator (`sourasish.ghosh@officeaid.com`).

### 2. 📅 Meetings & Calendar Command Center (`/meetings`)
- **Daily Timeline**: Hour-by-hour operational schedule view with live progress indicators.
- **Interactive Day Navigation**: Navigate between days with `< Prev Day`, `Next Day >`, or reset to `Today`.
- **Interactive Calendar Modal (`CalendarModal.jsx`)**:
  - Embedded monthly overview with event indicator dots on days with scheduled meetings.
  - Clicking any date displays that day's scheduled meetings, with direct links to *"View in Timeline"* or *"Schedule on This Date"*.
  - Opens via the **"Calendar"** header button, **"Calendar Sync"** badge, or **"View Calendar"** button in Upcoming Meetings.
- **1-Click Call Launcher**: Direct join links for Google Meet, Zoom, and Microsoft Teams.
- **Manual Scheduling Modal**: Invite colleagues from the live talent directory with automatic video URL formatting (`https://` prefixing).

### 3. 🤖 Herric AI Operations Copilot (`/chatbot` & `/herric`)
- **Dual Access**: Dedicated full-page command center and a global slide-out floating drawer (`FloatingAiAssistant.jsx`).
- **Workspace Context Mode**: Injects live metrics, tasks, tickets, and meetings directly into the prompt.
- **Ticket Diagnosis**: Analyzes support tickets to produce root cause hypotheses and troubleshooting protocols.
- **Subtask Generator**: Decomposes complex tasks into actionable checklists with 1 click.
- **Email Intelligence**: Generates 3-bullet email summaries and drafts contextual responses.

### 4. 📋 Agile Kanban Tasks Board (`/tasks`)
- **HTML5 Drag-and-Drop**: Move tasks across 4 workflow columns (*To Do*, *In Progress*, *Review*, *Completed*) with optimistic UI feedback.
- **Fractional Indexing**: Reorders instantly on the server via `PATCH /api/v1/tasks/:id/reorder`.
- **Subtask Progress**: Interactive checkboxes with dynamic completion percentage bars.
- **Priority Tiers**: Color-coded badges for *Critical*, *High*, *Medium*, and *Low*.

### 5. 🎫 IT Helpdesk Tickets (`/tickets`)
- **Multi-View Modes**: Switch between Kanban board and structured list views.
- **SLA Countdown Tracking**: Real-time SLA urgency indicator based on due timestamps.
- **Diagnose with Herric**: Generates structured IT mitigation protocols.

### 6. 📧 Internal Email Client (`/emails`)
- **Folder Navigation**: Browse Inbox, Starred, Sent, Drafts, and Trash with unread counters.
- **AI Thread Summarizer**: 1-click condensation of long threads.
- **AI Auto-Reply Drafter**: Generates professional replies ready for sending.

### 7. 👥 Talent Directory & Org Chart (`/employees`)
- **Triple Layout Switcher**:
  - **Grid View**: Cards with status rings, skill tags, contact links, and performance scores.
  - **Table View**: Compact enterprise table with role tiers and department badges.
  - **Org Chart Hierarchy**: Interactive visual tree mapping Executive Leadership → Department Leads → Team Specialists.

### 8. 📊 Executive Dashboard (`/`)
- **Live Greeting Banner**: Dynamic greeting tailored to local time with a live second ticker clock.
- **Live Hyper-Local Weather**: Connected to Open-Meteo API with geolocation and WMO weather condition icons.
- **KPI Metrics Grid**: Real-time counts for Active Projects, Pending Tasks, Today's Syncs, Staff, and Tickets.

---

## ⚡ Universal API Client (`apiClient.js`)

Located at [`src/services/apiClient.js`](./src/services/apiClient.js), the frontend uses a lightweight native fetch wrapper:
- **Bearer Token Injection**: Automatically injects `Authorization: Bearer <token>` from `localStorage`.
- **Response Unwrapping**: Standardizes unwrapping so domain services receive payload data directly (`return data?.data !== undefined ? data.data : data`).
- **Global 401 Unauthorized Interceptor**: Clears stale tokens and dispatches an `auth:unauthorized` window event to redirect to `/login`.
- **Normalized Error Objects**: Throws standard JavaScript `Error` objects carrying `error.status` and `error.errors` array from backend Zod validation issues.

---

## 🔐 Environment Variables

Create a `.env` file in the `frontend/` directory:

```env
# Backend API Base URL
VITE_API_URL="http://localhost:5000/api/v1"
```

If omitted, `apiClient` automatically defaults to `http://localhost:5000/api/v1`.

---

## 🚀 Getting Started & Development

### 1. Install Dependencies
```bash
cd frontend
npm install
```

### 2. Start Vite Development Server
```bash
npm run dev
```
The app will launch at `http://localhost:5173/`. Open your browser and navigate to the login page.

### 3. Run Linter
Verify code quality against ESLint rules (guaranteed 0 errors and 0 warnings):
```bash
npm run lint
```

### 4. Build for Production
```bash
npm run build
```
Creates an optimized production bundle in the `frontend/dist/` directory.

### 5. Preview Production Build
```bash
npm run preview
```

---

<div align="center">

**Office Aid Frontend** • Built with React 19 & Tailwind CSS 4 • Designed by **Sourasish Ghosh**

</div>

