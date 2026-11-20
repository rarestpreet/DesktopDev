# Deploydev Backend API

Control-plane API built with **Express.js** and **TypeScript** adhering to the conventions defined in `agents/AGENTS.md`.

## Architecture Principles
- **Strict Typing:** TypeScript strict mode enabled with `noImplicitAny`.
- **Thin Handlers:** Controllers strictly validate/authorize and delegate work to services.
- **Structured JSON Logging:** Zero unstructured `console.log` in committed code; logs are emitted in JSON format for automated ingestion and redaction.
- **Graceful Shutdown:** Handles `SIGTERM` and `SIGINT` signals to close active connections cleanly.
- **Fail-Fast Environment:** Zod schema validation ensures missing or malformed environment variables halt process startup immediately.

## Directory Structure
```
backend/
├── src/
│   ├── config/          # Environment variable loading & validation (Zod)
│   ├── controllers/     # Thin request handlers
│   ├── middlewares/     # Logging, error handling, CORS
│   ├── routes/          # API route definitions
│   ├── services/        # Core business logic
│   ├── utils/           # Structured JSON logger
│   ├── app.ts           # Express application setup
│   └── index.ts         # Server entry point and signal listener
├── tsconfig.json        # Strict NodeNext TypeScript configuration
└── package.json
```

## Available Scripts
- `pnpm dev`: Start the development server with live reload (`tsx watch`).
- `pnpm build`: Compile TypeScript into `dist/`.
- `pnpm start`: Run the compiled production server (`node dist/index.js`).
- `pnpm typecheck`: Run TypeScript type-checker without emitting output.

## Environment Variables
See `.env.example`:
- `PORT`: Server port (default: `5000`)
- `NODE_ENV`: Environment mode (`development`, `production`, `test`)
- `CORS_ORIGIN`: Allowed origin for frontend requests (default: `http://localhost:5173`)

