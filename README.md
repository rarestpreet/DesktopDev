# Deploydev

> Operator-run cloud deployment platform (Vercel/Render-style). Connect a GitHub repo &rarr; platform analyzes it, builds it, runs it in plain Docker, and forwards live logs to the UI.

For comprehensive operational guidelines, architectural decisions, and roadmap status, refer to:
- [`agents/AGENTS.md`](./agents/AGENTS.md) — Agent operating guidelines & principles
- [`docs/DECISION_SUMMARY.md`](./docs/DECISION_SUMMARY.md) — Architectural Decision Records (ADRs)
- [`docs/roadmap.md`](./docs/roadmap.md) — Phased feature delivery roadmap
- [`docs/tasks.md`](./docs/tasks.md) — Granular task breakdowns

---

## Repository Structure

```
Deploydev/
├── agents/
│   └── AGENTS.md            # Guidelines, coding conventions, architectural rules
├── docs/                    # Decision logs (ADR), roadmap, learning resources
│   ├── DECISION_SUMMARY.md
│   ├── roadmap.md
│   ├── tasks.md
│   └── learning-roadmap.md
├── frontend/                # Public client SPA (React + Vite + Tailwind CSS + TypeScript)
│   ├── src/
│   │   ├── components/
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css
│   ├── vite.config.ts
│   └── package.json
├── backend/                 # Control-plane API (Express.js + TypeScript)
│   ├── src/
│   │   ├── config/          # Zod-validated environment config
│   │   ├── controllers/     # Thin request handlers
│   │   ├── middlewares/     # Structured request logging, error handling
│   │   ├── routes/          # Health and API route endpoints
│   │   ├── services/        # Business logic services
│   │   ├── utils/           # Structured JSON logger
│   │   ├── app.ts
│   │   └── index.ts
│   └── package.json
├── pnpm-workspace.yaml      # Monorepo workspace configuration
├── package.json             # Root workspace scripts
└── README.md
```

---

## Tech Stack & Conventions

Adhering to **[DECIDED]** decisions in `agents/AGENTS.md`:

- **Frontend:** React 19 SPA powered by Vite and Tailwind CSS v4, written in strict TypeScript. Built as static files to eliminate SSR memory footprint on host servers.
- **Backend:** Node.js + Express.js API written in strict TypeScript.
- **Conventions:**
  - **Strict Typing:** Strict TypeScript mode enabled across both packages (`noImplicitAny`, `strictNullChecks`).
  - **Thin Handlers:** Controllers handle request boundary validation and authorization only, delegating business logic to services.
  - **Structured JSON Logging:** Zero unstructured `console.log` statements in committed code; structured logs emit JSON to stdout/stderr.
  - **Graceful Lifecycle:** Backend manages process termination signals (`SIGINT`, `SIGTERM`) cleanly.
  - **Boundary Validation:** Input parameters and environment configurations are validated with schemas (`zod`).

---

## Prerequisites

- **Node.js**: `>= 20.0.0`
- **pnpm**: `>= 9.0.0` (Workspaces enabled)

---

## Getting Started

### 1. Install Dependencies

Install all dependencies across the workspace using `pnpm`:

```bash
pnpm install
```

### 2. Configure Environment Variables

Both `frontend/` and `backend/` provide `.env.example` templates:

```bash
# In backend/
cp backend/.env.example backend/.env

# In frontend/
cp frontend/.env.example frontend/.env
```

Default backend environment values:
```env
PORT=5000
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
```

### 3. Development Mode

Run both frontend and backend concurrently from the workspace root:

```bash
pnpm dev
```

Or run each service individually:

```bash
# Start backend only (http://localhost:5000)
pnpm dev:backend

# Start frontend only (http://localhost:5173)
pnpm dev:frontend
```

### 4. Build for Production

Typecheck and produce compiled artifacts for all workspace packages:

```bash
pnpm build
```

Individual builds:
```bash
pnpm build:backend   # Generates backend/dist/
pnpm build:frontend  # Generates frontend/dist/
```

### 5. Type-Checking

Run workspace-wide TypeScript verification without emitting output:

```bash
pnpm typecheck
```

---

## Health & Status Check

The backend exposes a health endpoint:
- `GET /health` or `GET /api/health`
- Response:
  ```json
  {
    "status": "ok",
    "uptime": 12,
    "timestamp": "2026-11-20T12:00:00.000Z",
    "version": "0.1.0",
    "memoryUsage": {
      "rssMb": 42.15,
      "heapUsedMb": 18.23
    }
  }
  ```
The frontend includes a live status card component configured to poll this health endpoint and reflect control-plane connectivity.

