<div align="center">

# 🚀 Office Aid

### 🌌 Next-Gen Intelligent Workplace Automation & AI Management Platform

<img src="https://readme-typing-svg.herokuapp.com?font=Poppins&weight=600&size=24&duration=3500&pause=1000&color=00D9FF&center=true&vCenter=true&width=750&lines=Apple+Liquid+Glass+Design+System;AI-Powered+Workplace+Assistant;React+19+%2B+Vite+%2B+Tailwind+CSS+%2B+Node.js" alt="Office Aid Typings" />

---

[![React 19](https://img.shields.io/badge/React-19.0.0-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://react.dev/)
[![Vite 8](https://img.shields.io/badge/Vite-8.1.5-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS 4](https://img.shields.io/badge/TailwindCSS-4.0-38BDF8?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.0-0055FF?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![Node.js](https://img.shields.io/badge/Node.js-22-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-5.0-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![ESLint Clean](https://img.shields.io/badge/ESLint-Clean_0_Errors-4B32C3?style=for-the-badge&logo=eslint&logoColor=white)](https://eslint.org/)

</div>

---

## 📖 Overview

**Office Aid** is a modern, enterprise-grade workplace automation platform designed to streamline corporate workflows, project execution, team schedules, IT support, and employee communication. Built with an **Apple Liquid Glass UI design system**, it offers dynamic light/dark mode aesthetics, micro-interactions, responsive navigation, and an intelligent context-aware AI assistant.

---

## 🏗️ Repository Architecture

The project is structured as a scalable **Full-Stack Monorepo**:

```text
Office-Aid/
├── 🎨 frontend/                # Client Application (React 19 + Vite + Tailwind CSS v4)
│   ├── src/
│   │   ├── components/         # Core Apple Liquid Glass UI Library & Common Components
│   │   │   ├── ui/             # GlassPanel, GlassCard, GlassButton, GlassTabs, etc.
│   │   │   └── common/         # ThemeToggle, FloatingAiAssistant, Navigation Bars
│   │   ├── context/            # React Context Objects (ThemeContext, AiAssistantContext)
│   │   ├── features/           # Feature Modules (Dashboard, Projects, Tasks, Meetings, Profile, etc.)
│   │   ├── hooks/              # Custom React Hooks (useTheme, useAiAssistant)
│   │   └── theme/              # Design System Tokens, Animations & Glass Specular Utilities
│   └── package.json
└── ⚡ backend/                 # API Service (Node.js + Express + MySQL)
    ├── src/
    │   ├── config/             # Environment & Database Configuration
    │   ├── controllers/        # API Controllers
    │   ├── routes/             # RESTful API Route Declarations
    │   └── server.js           # Server Entry Point
    └── package.json
```

---

## ✨ Features Implemented Till Now

### 🎨 1. Apple Liquid Glass Design System & Theme Engine
- **Glassmorphism Aesthetic**: Translucent glass surfaces, top-edge specular highlight reflections, radial ambient glow spots, and multi-layered backdrop blurs.
- **Dual Theme Support (Dark & Light Modes)**: Seamless toggle with persisted state in `localStorage` and system preference auto-detection.
- **Light Mode Pure White Styling**: Header control bars, widget cards, search inputs, filter tabs, and modals adjust automatically to crisp, pure white (`#ffffff`) surfaces with clean typography (`#0f172a`).
- **Custom Button Palette**:
  - **Dark Mode**: `.first-color` (`#fbfbfb`), `.second-color` (`#fff1c1`), `.third-color` (`#78b7bb`), `.fourth-color` (`#808b97`).
  - **Light Mode**: `.first-color` (`#827055`), `.second-color` (`#a79e8b`), `.third-color` (`#d4ceb0`), `.fourth-color` (`#ede7cf`).

---

### 📊 2. Executive Dashboard Module
- **Hero Salutation Banner (`Greeting.jsx`)**: Real-time live digital clock ticker, time-of-day greeting, workspace status badges, and quick AI launcher.
- **Metrics Summary Grid (`MetricsGrid.jsx`)**: Key performance indicator cards tracking Active Projects, Pending Tasks, Today's Meetings, Total Staff, and Open Tickets.
- **Department Headcount Chart (`DepartmentChart.jsx`)**: Visual breakdown of staff distribution across Engineering, Design, Marketing, Product, and HR.
- **Announcements & Pinboard (`Announcements.jsx`)**: Company-wide broadcasts with category tags, author info, and pinned items.
- **Office Weather & Location Widget (`WeatherWidget.jsx`)**: Live weather condition pill and city location monitor.

---

### 📁 3. Projects Management Module
- **Liquid Glass Control Bar (`FilterBar.jsx`)**: Real-time project search input, status tab switcher (*All Projects, Active, Completed, On Hold*), sorting dropdown (*Name, Due Date, Progress*), and "New Project" modal trigger.
- **Project Cards Grid (`ProjectCard.jsx` & `ProjectGrid.jsx`)**: Cards featuring progress bars, team member avatars, status badges, due date countdowns, and context action menus.
- **Create Project Modal (`CreateProjectModal.jsx`)**: Form to create new workspace projects with title, description, department, lead owner, target date, and tags.

---

### 📋 4. Task Command Center (Agile Kanban Board)
- **Tasks Control Bar (`TasksHeader.jsx`)**: Task search bar, column status tabs (*All Tasks, To Do, In Progress, Review, Completed*), priority filter dropdown (*Critical, High, Medium, Low*), sorting options, and "New Task" trigger.
- **Kanban Board Layout (`TaskKanbanBoard.jsx`, `TaskColumn.jsx`, `TaskCard.jsx`)**: Multi-column board displaying task cards with subtask progress bars, priority indicator badges, assignee avatars, and due date alerts.
- **Create Task Modal (`CreateTaskModal.jsx`)**: Interactive modal interface for adding new tasks with priority, column, assignee, due date, and tags.

---

### 📅 5. Meetings & Schedule Module
- **Meetings Control Bar (`MeetingsHeader.jsx`)**: Global video call search, status tabs (*All Meetings, Today, Upcoming, Completed*), and "Schedule Meeting" action button.
- **Meeting Cards & Grid (`MeetingCard.jsx` & `MeetingGrid.jsx`)**: Detailed sync cards with room links, platform badges (Google Meet, Zoom, Teams), attendee lists, countdown badges, and join/cancel actions.
- **Schedule Meeting Modal (`ScheduleMeetingModal.jsx`)**: Modal interface to schedule syncs with host selection, platform URL generator, time slot pickers, and invitees.
- **Daily Timeline (`DailyTimeline.jsx`) & Upcoming Syncs (`UpcomingMeetings.jsx`)**: Hour-by-hour operational schedule and quick calendar events widget.

---

### 👤 6. Executive Profile Module
- **Executive Banner (`ProfileHeader.jsx`)**: Profile avatar with status indicator, name, role badge, department, location, and theme switcher.
- **Performance Overview (`ProfileStats.jsx`)**: Key user activity stats and accomplishment metrics.
- **Recent Activity Stream (`RecentActivity.jsx`)**: Timeline log of user actions, task completions, and project updates.
- **Security Settings (`ProfileSecurity.jsx`)**: Password updates, 2FA status, and active session controls.

---

### 👥 7. Employee Directory & Talent Hub Module
- **Summary Metrics Bar (`EmployeeStatsWidget.jsx`)**: Real-time staff headcount, active engagement rate, busy status counters, average performance score, and top department breakdown.
- **Directory Control Bar (`EmployeesHeader.jsx`)**: Spotlight search bar (`⌘K`), department tabs (*All Staff, Executive, Engineering, Design, Product, Marketing, HR*), presence status filter dropdown, and layout switcher.
- **Multi-View Engine**:
  - **Grid View (`EmployeeGrid.jsx` & `EmployeeCard.jsx`)**: Apple Liquid Glass cards with status avatars, contact links, skill tag clouds, assigned project counts, performance ratings, and message/edit action buttons.
  - **Table View (`EmployeeTable.jsx`)**: Structured data table view displaying employee metadata, role tiers, department tags, and direct action triggers.
  - **Org Chart Hierarchy (`OrgChart.jsx`)**: Visual tree diagram mapping Executive Leadership -> Department Leads -> Team Specialists.
- **Add / Edit Employee Modal (`AddEmployeeModal.jsx`)**: Interactive glass modal form to add or edit employee records, role tiers, and skill sets.

---

### 📧 8. Internal Mail & Communications Module
- **Control Bar (`EmailsHeader.jsx`)**: Spotlight search bar (`⌘K`), category dropdown (*Announcements, Project Sync, HR Memos, IT Alerts, Meeting Minutes*), and "+ Compose Email" CTA.
- **Folder Navigation Sidebar (`EmailSidebar.jsx`)**: Navigation for *Inbox*, *Starred*, *Sent*, *Drafts*, and *Trash* with unread count badges and category shortcuts.
- **Message List (`EmailList.jsx`)**: Thread items featuring sender avatars, subject lines, snippet previews, category badges, timestamps, unread indicator dots, and star toggles.
- **Detail Reading Pane (`EmailDetailView.jsx`)**: Full message body display with **✨ AI Thread Summarizer** (one-click bullet takeaways) and **✨ AI Auto-Reply Drafter**.
- **Compose Modal (`ComposeEmailModal.jsx`)**: Interactive glass modal form for drafting and sending workplace emails with **✨ AI Template Drafting**.

---

### 🎫 9. IT Helpdesk & Support Tickets Module
- **Summary Metrics Bar (`TicketStatsWidget.jsx`)**: Real-time helpdesk queue counters (*Total Tickets, Open Issues, In Progress, Critical Escalations*).
- **Control Bar (`TicketsHeader.jsx`)**: Spotlight search bar (`⌘K`), category filter tabs (*Access & Security, IT Infrastructure, Software & Tools, Facilities, HR Ops*), priority dropdown (*Critical, High, Medium, Low*), and "+ Submit Ticket" CTA.
- **Multi-View Engine**:
  - **List View (`TicketList.jsx` & `TicketCard.jsx`)**: Glass cards with ticket IDs, requester/assignee avatars, priority badges, SLA countdown timers, and quick resolve actions.
  - **Helpdesk Kanban Board (`TicketKanban.jsx`)**: Multi-column board categorizing tickets into *Open Queue*, *In Progress*, *Under Review*, and *Resolved*.
- **Ticket Detail Timeline Modal (`TicketDetailModal.jsx`)**: Full issue description, requester info, status switcher, comment stream, and **✨ AI Resolution Assistant** (generates fix drafts).
- **Submit Ticket Modal (`CreateTicketModal.jsx`)**: Glass modal form to log support tickets with priority tier selection.

---

### 🤖 10. Intelligent AI Assistant Platform
- **Slide-out Glass Drawer (`FloatingAiAssistant.jsx`)**: Floating action button that opens an AI assistant sidebar.
- **Features**: Contextual prompt chips (*Summarize Tasks, Draft Email, Meeting Notes, Project Risks*), message bubble formatting, code block copying, and message history streaming.

---

### 🚫 11. Custom 404 Error Page (`NotFound.jsx`)
- **Topographic Organic Wave Styling**: Dark matte background overlay with topographic SVG contour curves, massive serif `404` typography, elegant subtitle, and primary theme `RETURN TO HOME` CTA button.
- **Route Interception**: Intercepts all invalid or unhandled URLs (e.g. `/invalid-page`, `/xyz`) and displays the 404 view.

---

### 🧩 12. Core Component Library (`src/components/ui`)
- `GlassPanel`: Versatile glass container with specular lighting and depth variants (*default, floating, inset, bordered*).
- `GlassCard`: Card component with hover lift animations and glow accents (*blue, cyan, purple, white*).
- `GlassButton`: Button with size presets (*sm, md, lg*), variant colors (*primary, secondary, third, fourth, ghost, danger*), and icons.
- `GlassInput` & `GlassTextarea`: Styled form inputs with focus glow states and character counters.
- `GlassSearchBar`: Spotlight-style search bar with shortcut key pill (`⌘K`) and clear button.
- `GlassTabs`: Segmented tab bar with a smooth gliding liquid pill indicator powered by Framer Motion.
- `GlassDropdown`: Dropdown menu with keyboard accessibility and specular borders.
- `GlassModal`: Dialog modal with backdrop blur, specular header, and escape key listener.
- `GlassBadge`: Pill badge with variant themes (*cyan, blue, purple, success, warning, danger*).
- `GlassAvatar`: User avatar with status indicator rings (*online, away, busy, offline*) and initials fallback.
- `GlassTable`: Data table wrapper with glass rows, column headers, and action cells.
- `GlassNavbar` & `GlassSidebar`: Navigation components for application routing.

---

## 🛠 Tech Stack

| Category | Technology | Description |
| :--- | :--- | :--- |
| **Frontend Framework** | **React 19** | Modern UI framework utilizing Hooks and Concurrent Rendering |
| **Build Tooling** | **Vite 8** | Ultra-fast HMR dev server & Rolldown production builder |
| **Styling & Theme** | **Tailwind CSS v4** | Utility-first CSS engine with custom Apple Liquid Glass variables |
| **Animations** | **Framer Motion 12** | Physics-based spring animations, layout transitions & tab gliding |
| **Iconography** | **Lucide React** | Modern, consistent icon library |
| **Routing** | **React Router DOM v7** | Client-side page navigation & layout routing |
| **Code Quality** | **ESLint 9** | Strict linting rules with 0 errors/warnings across the codebase |
| **Backend API (Node)** | **Node.js 22 + Express.js** | Modular ES Module REST API server |
| **Database (Target)** | **MySQL** | Relational database for persistent storage |

---

## 🚀 Future Roadmap & Upcoming Plans

### 🗓️ Phase 1: Frontend Expansion (Remaining Modules)
- [ ] **Employees Directory Module**:
  - Employee list & grid view with filtering by department and role.
  - Interactive Organizational Hierarchy Tree Chart.
  - Employee detail drawer with skill tags and contact shortcuts.
- [ ] **Internal Email System**:
  - Inbox, Sent, Starred, and Drafts mailboxes.
  - Rich text email composer with attachment preview.
  - AI Mail Assistant: Auto-summarize long threads and generate smart reply drafts.
- [ ] **IT Helpdesk & Support Tickets**:
  - Ticket queue with priority levels (*Low, Medium, High, Critical*) and SLA status indicators.
  - Automated ticket routing to department agents.
  - Resolution timeline and ticket comment thread.
- [ ] **Notification Center**:
  - Popover dropdown & dedicated notifications page.
  - Filter notifications by type (*Tasks, Meetings, Mentions, System Alerts*).
  - Unread badge counters and mark-all-as-read actions.
- [ ] **Settings & Role-Based Access Control (RBAC)**:
  - System configuration panel (*General, Security, Notifications, Integrations*).
  - Granular RBAC permissions management (*Admin, Manager, Employee, Guest*).

---

### ⚡ Phase 2: Backend API & Database Persistence
- [ ] **Express RESTful API Development**:
  - Controllers and route handlers for Auth, Projects, Tasks, Meetings, Employees, Tickets, Emails, and Users.
  - Request payload validation schemas (Zod / Joi).
- [ ] **MySQL Database Schema Integration**:
  - Database migrations for relational models (*users, projects, tasks, meetings, tickets, emails, departments*).
  - Foreign key constraints, indexed columns, and database connection pooling.
- [ ] **Authentication & Authorization**:
  - JWT token generation, HTTP-only cookie storage, and refresh token rotation.
  - Password hashing with `bcrypt` and password reset email flows.
- [ ] **File Storage Service**:
  - Attachment upload support for tasks, project briefs, and tickets.

---

### 🤖 Phase 3: AI Engine Backend & Real-Time Sync
- [ ] **LLM Backend Integration**:
  - Integration with **Google Gemini API** / **OpenAI API** for the AI Assistant drawer.
  - Function calling & retrieval-augmented generation (RAG) querying real database records.
- [ ] **WebSocket Live Synchronization**:
  - Socket.io integration for instant drag-and-drop Kanban board updates.
  - Real-time online user presence, typing indicators, and meeting notifications.

---

### 🐳 Phase 4: DevOps, Testing & Deployment
- [ ] **Dockerization**:
  - Multi-stage `Dockerfile` for Frontend static build & Backend Node.js process.
  - `docker-compose.yml` defining Frontend, Backend, MySQL, and Nginx reverse proxy containers.
- [ ] **Automated CI/CD Pipelines**:
  - GitHub Actions workflows for continuous linting, unit testing (Vitest/Jest), and automated production deployments.

---

## ⚡ Quick Start Guide

### 1. Prerequisites
- **Node.js**: v18.0.0 or higher (v22 recommended)
- **npm**: v9.0.0 or higher

### 2. Installation & Running Locally

#### 🎨 Launching the Frontend
```bash
cd frontend
npm install
npm run dev
```
> The Vite dev server will start at `http://localhost:5173/` (or `http://localhost:5174/`).

#### ⚡ Launching the Backend
```bash
cd backend
npm install
npm run dev
```
> The Node server will watch for changes and run at `http://localhost:5000/`.

---

## 🧪 Linting & Production Build Verification

To verify code quality and build stability:

```bash
# Run ESLint check
cd frontend
npm run lint

# Run Production Build
npm run build
```

---

<div align="center">

**Made with ❤️ by Sourasish Ghosh for Office Aid**

</div>
