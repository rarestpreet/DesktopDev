# Deploydev Frontend

Public dashboard and client interface built with **React**, **Vite**, **Tailwind CSS**, and **TypeScript**.

## Architecture Principles
- **Vite + React SPA:** Served as static files to eliminate server-side rendering overhead on resource-constrained host EC2 environments.
- **Strict TypeScript:** Full strict mode checking enabled (`noImplicitAny`, `strictNullChecks`).
- **Tailwind CSS v4:** Modern utility styling with `@tailwindcss/vite` plugin.
- **API Proxying:** Configured with Vite development server proxy (`/api` -> `http://localhost:5000`).

## Directory Structure
```
frontend/
├── src/
│   ├── components/      # UI components (Header, StatusCard, ProjectOverview)
│   ├── App.tsx          # Main dashboard view
│   ├── main.tsx         # React root mounting
│   ├── index.css        # Tailwind CSS imports & theme overrides
│   └── vite-env.d.ts    # Vite environment type declarations
├── index.html           # SPA entrypoint
├── vite.config.ts       # Vite configuration with Tailwind and API proxy
├── tsconfig.json        # Strict TypeScript compiler options
└── package.json
```

## Available Scripts
- `pnpm dev`: Start Vite development server at `http://localhost:5173`.
- `pnpm build`: Run TypeScript check and compile production bundle into `dist/`.
- `pnpm preview`: Locally preview production build.
- `pnpm typecheck`: Run TypeScript compiler validation without emitting files.

