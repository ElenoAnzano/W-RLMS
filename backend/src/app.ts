
import express from 'express';
import type { ErrorRequestHandler, RequestHandler } from 'express';

const app = express();

app.use(express.json());

app.get('/', (_req, res) => {
  res.status(200).json({
    name: 'WARLMS API',
    status: 'ok',
    message: 'Wash and Refill Laundry Management System API is running',
    health: '/api/health',
  });
});

app.get('/api/health', (_req, res) => {
  res.status(200).json({ status: 'ok', message: 'API is running' });
});

const notFoundHandler: RequestHandler = (req, res) => {
  res.status(404).json({
    status: 'error',
    message: `Route not found: ${req.method} ${req.path}`,
  });
};

// Express 5 forwards thrown errors and rejected promises here.
const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  const status: unknown = err?.status ?? err?.statusCode;

  if (typeof status === 'number' && status >= 400 && status < 500) {
    return res.status(status).json({
      status: 'error',
      message: 'Invalid request',
    });
  }

  console.error(`Unhandled error on ${req.method} ${req.path}:`, err);

  return res.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
};

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
