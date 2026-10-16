# ⚡ Office Aid - Backend API Service

[![Node.js](https://img.shields.io/badge/Node.js-22_LTS-339933?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-5.3-000000?style=flat-square&logo=express&logoColor=white)](https://expressjs.com/)
[![Prisma ORM](https://img.shields.io/badge/Prisma-6.4.1-2D3748?style=flat-square&logo=prisma&logoColor=white)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/Supabase-PostgreSQL-3ECF8E?style=flat-square&logo=supabase&logoColor=white)](https://supabase.com/)
[![Gemini AI](https://img.shields.io/badge/Google_Gemini-Multi--Model_Failover-8E75C2?style=flat-square&logo=google&logoColor=white)](https://ai.google.dev/)
[![Zod](https://img.shields.io/badge/Validation-Zod_4.6-3E67B1?style=flat-square&logo=zod&logoColor=white)](https://zod.dev/)

The backend service for **Office Aid**, an enterprise-grade workplace operations and automation platform. Built with **Express 5**, **Prisma ORM**, **Supabase PostgreSQL**, and powered by **Google Gemini** multi-model AI failover engine.

---

## 📋 Table of Contents
1. [Architecture & Features](#-architecture--features)
2. [Tech Stack](#-tech-stack)
3. [Project Directory Layout](#-project-directory-layout)
4. [Environment Variables](#-environment-variables)
5. [Database Setup & Prisma ORM](#-database-setup--prisma-orm)
6. [Gemini AI Engine & Multi-Model Failover](#-gemini-ai-engine--multi-model-failover)
7. [REST API Reference](#-rest-api-reference)
8. [Getting Started & Development](#-getting-started--development)

---

## 🏛 Architecture & Features

- **Express 5.3 REST Engine**: Native asynchronous error handling, modular routing, and clean controller-service separation.
- **Relational Data Layer**: 10 relational models modeled in Prisma schema with Supabase PostgreSQL connection pooling (`pgbouncer` port 6543) and direct connection (port 5432).
- **Stateless JWT & Bcrypt Authentication**: Secure salted password hashing (`bcryptjs`), 7-day stateless JWT verification, and Role-Based Access Control (`ADMIN`, `MANAGER`, `EMPLOYEE`).
- **Resilient AI Failover Engine**: Herric Copilot runs on a multi-model failover chain (`gemini-2.5-flash` / `gemini-3.6-flash` → `gemini-3.5-flash` → `gemini-flash-lite-latest`) to withstand upstream Google API quota spikes.
- **Comprehensive Zod Validation**: Strict request schema validation with automatic data normalization (e.g. auto-prepending `https://` to video URLs, whitespace trimming).
- **Standardized API Responses**: Unified `ApiResponse` wrapper `{ success, statusCode, message, data }` and centralized `ApiError` handler.

---

## 🛠 Tech Stack

| Technology | Version | Purpose |
| :--- | :--- | :--- |
| **Node.js** | `>= 20.x` (v22 recommended) | JavaScript runtime |
| **Express** | `5.3.0` | High-performance REST API framework (`type: module`) |
| **Prisma ORM** | `6.4.1` | Next-gen type-safe ORM for PostgreSQL |
| **@google/generative-ai** | `0.24.1` | Google Gemini AI SDK |
| **jsonwebtoken** | `9.0.3` | Stateless Bearer token creation and verification |
| **bcryptjs** | `3.0.3` | Password salting and hashing |
| **zod** | `4.6.5` | Strict schema validation |
| **cors** | `2.8.6` | Cross-Origin Resource Sharing configuration |
| **cookie-parser** | `1.4.7` | HTTP-only cookie support |
| **dotenv** | `18.0.7` | Environment variable loader |

---

## 📂 Project Directory Layout

```text
backend/
├── prisma/
│   ├── schema.prisma           # Prisma database schema (10 relational models)
│   └── seed.js                 # Seed script with realistic workspace accounts
├── src/
│   ├── config/
│   │   └── prisma.js           # PrismaClient singleton instance
│   ├── controllers/            # Controller layer (handles req/res and formatting)
│   │   ├── ai.controller.js
│   │   ├── auth.controller.js
│   │   ├── dashboard.controller.js
│   │   ├── email.controller.js
│   │   ├── employee.controller.js
│   │   ├── meeting.controller.js
│   │   ├── notification.controller.js
│   │   ├── project.controller.js
│   │   ├── task.controller.js
│   │   └── ticket.controller.js
│   ├── middlewares/            # Custom Express middlewares
│   │   ├── authenticate.js     # JWT Bearer token & RBAC verification
│   │   ├── errorHandler.js     # Centralized error handler
│   │   └── validate.js         # Zod schema validation middleware
│   ├── routes/                 # Express 5 route definitions (`/api/v1/*`)
│   │   ├── ai.routes.js
│   │   ├── auth.routes.js
│   │   ├── dashboard.routes.js
│   │   ├── email.routes.js
│   │   ├── employee.routes.js
│   │   ├── health.routes.js
│   │   ├── meeting.routes.js
│   │   ├── notification.routes.js
│   │   ├── project.routes.js
│   │   ├── task.routes.js
│   │   └── ticket.routes.js
│   ├── services/               # Business logic & external service connectors
│   │   ├── ai.service.js       # Gemini AI engine with model failover chain
│   │   ├── auth.service.js     # User registration, login, profile resolution
│   │   ├── dashboard.service.js
│   │   ├── email.service.js
│   │   ├── employee.service.js
│   │   ├── meeting.service.js  # Timeline, upcoming syncs, deduplicated attendees
│   │   ├── notification.service.js
│   │   ├── project.service.js
│   │   ├── task.service.js     # Kanban ordering & drag-drop management
│   │   └── ticket.service.js   # IT helpdesk SLA & comments
│   ├── utils/
│   │   ├── ApiError.js         # Standard error wrapper
│   │   └── ApiResponse.js      # Standard success response wrapper
│   ├── validators/             # Zod input schemas for all endpoints
│   │   ├── auth.validator.js
│   │   ├── employee.validator.js
│   │   ├── meeting.validator.js
│   │   ├── project.validator.js
│   │   ├── task.validator.js
│   │   └── ticket.validator.js
│   └── server.js               # Application entry point
├── Office-Aid.postman_collection.json # 40-endpoint Postman test suite
├── package.json
└── README.md
```

---

## 🔐 Environment Variables

Create a `.env` file in the `backend/` directory:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Supabase PostgreSQL Connection
# Pooled connection string (Transaction pooler on port 6543)
DATABASE_URL="postgresql://postgres.[PROJECT_REF]:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres?pgbouncer=true"

# Direct connection string (Direct session on port 5432 for migrations)
DIRECT_URL="postgresql://postgres.[PROJECT_REF]:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:5432/postgres"

# JWT Authentication
JWT_SECRET="your_strong_jwt_secret_key_here"
JWT_EXPIRES_IN="7d"

# Google Gemini API
GEMINI_API_KEY="your_gemini_api_key_here"

# CORS Allowed Origin
CORS_ORIGIN="http://localhost:5173"
```

> **Security Note**: Never commit `.env` to version control. The repository's `.gitignore` explicitly excludes `.env` and `.env.*`.

---

## 🗄 Database Setup & Prisma ORM

The data model features 10 relational entities:
- `User` (with roles `ADMIN`, `MANAGER`, `EMPLOYEE`, presence status, manager-subordinate self-relations)
- `Project` & `ProjectMember`
- `Task` (with subtasks JSON and fractional order indexing)
- `Meeting` & `MeetingAttendee` (with platforms `GOOGLE_MEET`, `ZOOM`, `TEAMS`)
- `Email` (folders `INBOX`, `STARRED`, `SENT`, `DRAFTS`, `TRASH`)
- `Ticket` & `TicketComment` (with SLA target timestamps and AI generation tags)
- `Announcement`
- `Notification`

### Common Prisma Commands:
```bash
# Generate Prisma Client
npm run prisma:generate

# Push schema directly to database without creating migration files
npm run prisma:push

# Open interactive Prisma Studio GUI in browser (http://localhost:5555)
npm run prisma:studio

# Seed initial workspace data
npm run prisma:seed
```

---

## 🤖 Gemini AI Engine & Multi-Model Failover

Located at [`src/services/ai.service.js`](./src/services/ai.service.js), Herric is an operations copilot with dynamic failover:

```text
Request ──► [gemini-2.5-flash / gemini-3.6-flash]
                  │ (On 503 / 429 quota error)
                  ▼
            [gemini-3.5-flash]
                  │ (On fallback error)
                  ▼
            [gemini-flash-lite-latest]
```

### Key AI Capabilities:
1. **Workspace Intelligence Mode**: Automatically queries database metrics (active tasks, open helpdesk tickets, upcoming meetings, team rosters) and injects them into the prompt.
2. **IT Ticket Root Cause Diagnosis**: Generates hypotheses, immediate mitigations, and preventive actions for helpdesk tickets.
3. **Agile Subtask Generation**: Decomposes engineering tasks into subtasks with 1 click.
4. **Email Summarizer & Reply Drafter**: Condenses lengthy message threads and drafts contextual executive replies.
5. **Meeting Scheduling Protocol**: Parses natural language requests (e.g. *"Schedule a Zoom review with 5 attendees tomorrow at 3 PM"*) and creates structured meeting records.

---

## 📡 REST API Reference

Base URL: `http://localhost:5000/api/v1`

### 1. Authentication (`/auth`)
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/auth/register` | Public | Register new user account (firstName, lastName, email, password, department, jobTitle) |
| `POST` | `/auth/login` | Public | Authenticate with email & password, returns JWT and user profile |
| `GET` | `/auth/me` | Private | Retrieve authenticated user profile |
| `POST` | `/auth/logout` | Public | Clear HTTP-only session cookie |

### 2. AI Copilot (`/ai`)
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/ai/chat` | Private | Send query to Herric Copilot (supports workspace context mode) |
| `POST` | `/ai/briefing` | Private | Generate automated executive morning briefing |
| `POST` | `/ai/ticket-assist` | Private | Generate root cause diagnosis for an IT ticket |
| `POST` | `/ai/generate-subtasks` | Private | Generate structured subtasks for a task |
| `POST` | `/ai/summarize-email` | Private | Summarize an internal email thread into 3 key points |
| `POST` | `/ai/draft-reply` | Private | Draft polite executive response for an email |

### 3. Meetings & Schedule (`/meetings`)
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/meetings/stats` | Private | Get counters: total, today, upcoming, completed |
| `GET` | `/meetings/timeline` | Private | Get hour-by-hour operational timeline (`?date=YYYY-MM-DD`) |
| `GET` | `/meetings/upcoming` | Private | Get next upcoming scheduled meetings |
| `GET` | `/meetings` | Private | Filtered list with pagination, search, status tabs |
| `GET` | `/meetings/:id` | Private | Get meeting details with attendees and host |
| `POST` | `/meetings` | Private | Schedule video sync (Meet / Zoom / Teams) |
| `PATCH` | `/meetings/:id` | Private | Reschedule / update meeting details |
| `DELETE` | `/meetings/:id` | Private | Cancel / delete a meeting |

### 4. Tasks & Kanban (`/tasks`)
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/tasks` | Private | List tasks with filters (status, priority, search) |
| `GET` | `/tasks/kanban` | Private | Grouped tasks by status columns (`TODO`, `IN_PROGRESS`, `REVIEW`, `COMPLETED`) |
| `GET` | `/tasks/stats` | Private | Aggregate task statistics |
| `POST` | `/tasks` | Private | Create a task with priority, assignee, due date |
| `PATCH` | `/tasks/:id` | Private | Update task details or subtasks |
| `PATCH` | `/tasks/:id/reorder` | Private | Drag-and-drop reorder with fractional indexing |
| `DELETE` | `/tasks/:id` | Private | Delete a task |

### 5. IT Helpdesk Tickets (`/tickets`)
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/tickets` | Private | List tickets with SLA status and filters |
| `GET` | `/tickets/stats` | Private | Counter for Open, In Progress, Critical, Resolved |
| `POST` | `/tickets` | Private | Open a new support ticket |
| `GET` | `/tickets/:id` | Private | Ticket details with full conversation thread |
| `PATCH` | `/tickets/:id` | Private | Update status, priority, or resolution notes |
| `POST` | `/tickets/:id/comments` | Private | Post a comment or AI diagnosis |

### 6. Internal Emails (`/emails`)
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/emails` | Private | List emails (`?folder=INBOX|SENT|STARRED|DRAFTS|TRASH`) |
| `GET` | `/emails/stats` | Private | Unread counts per folder |
| `POST` | `/emails` | Private | Send internal email |
| `PATCH` | `/emails/:id/star` | Private | Toggle starred status |
| `PATCH` | `/emails/:id/read` | Private | Toggle read status |
| `DELETE` | `/emails/:id` | Private | Move to trash or permanently delete |

### 7. Talent Directory & Org Chart (`/employees`)
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/employees` | Private | Staff roster with search and department filters |
| `GET` | `/employees/org-chart` | Private | Hierarchical tree (Executive → Managers → Staff) |
| `GET` | `/employees/stats` | Private | Department headcount breakdown |
| `GET` | `/employees/:id` | Private | Full profile details and assigned tasks |
| `PATCH` | `/employees/:id` | Private | Update profile attributes and skills |

### 8. Projects (`/projects`)
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/projects` | Private | Projects portfolio list with members and progress |
| `GET` | `/projects/stats` | Private | Portfolio counts: active, completed, critical |
| `POST` | `/projects` | Private | Create a new project |
| `PATCH` | `/projects/:id` | Private | Update project progress, dates, or members |
| `DELETE` | `/projects/:id` | Private | Archive or remove project |

### 9. Notifications (`/notifications`)
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/notifications` | Private | User notifications list |
| `PATCH` | `/notifications/:id/read` | Private | Mark specific notification as read |
| `PATCH` | `/notifications/mark-all-read` | Private | Mark all notifications read |
| `DELETE` | `/notifications/clear-all` | Private | Remove all user notifications |

### 10. System Health (`/health`)
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/health` | Public | Uptime and Supabase database connection probe |

---

## 🚀 Getting Started & Development

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Configure Environment
Create a `.env` file following the template in [Environment Variables](#-environment-variables).

### 3. Initialize Database
```bash
# Push schema to Supabase PostgreSQL
npm run prisma:push

# (Optional) Seed realistic accounts
npm run prisma:seed
```

### 4. Run Development Server
```bash
# Runs with Node.js built-in watch mode
npm run dev
```
The API server will listen on `http://localhost:5000`. Test health probe at `http://localhost:5000/api/v1/health`.

### 5. Run in Production
```bash
npm start
```

---

<div align="center">

**Office Aid Backend** • Built with Node.js 22 & Express 5 • Designed by **Sourasish Ghosh**

</div>
