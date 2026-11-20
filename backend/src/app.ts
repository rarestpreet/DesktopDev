import express, { Express } from 'express';
import cors from 'cors';
import { env } from './config/env.js';
import { requestLogger } from './middlewares/request-logger.middleware.js';
import { errorHandler } from './middlewares/error.middleware.js';
import { apiRouter } from './routes/index.js';

export const createApp = (): Express => {
  const app = express();

  // Middleware
  app.use(cors({ origin: env.CORS_ORIGIN, credentials: true }));
  app.use(express.json());
  app.use(requestLogger);

  // Root & API routes
  app.use('/api', apiRouter);
  app.use('/', apiRouter);

  // 404 handler
  app.use((_req, res) => {
    res.status(404).json({ error: 'Not Found' });
  });

  // Global error handler
  app.use(errorHandler);

  return app;
};

