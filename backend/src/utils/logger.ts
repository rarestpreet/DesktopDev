type LogLevel = 'info' | 'warn' | 'error' | 'debug';

interface LogPayload {
  level: LogLevel;
  message: string;
  timestamp: string;
  [key: string]: unknown;
}

/**
 * Structured JSON logger adhering to Deploydev operating guidelines.
 * Replaces unstructured console.log in committed code.
 */
class Logger {
  private format(level: LogLevel, message: string, meta?: Record<string, unknown>): string {
    const payload: LogPayload = {
      level,
      message,
      timestamp: new Date().toISOString(),
      ...(meta ?? {}),
    };

    return JSON.stringify(payload);
  }

  public info(message: string, meta?: Record<string, unknown>): void {
    process.stdout.write(`${this.format('info', message, meta)}\n`);
  }

  public warn(message: string, meta?: Record<string, unknown>): void {
    process.stderr.write(`${this.format('warn', message, meta)}\n`);
  }

  public error(message: string, meta?: Record<string, unknown>): void {
    process.stderr.write(`${this.format('error', message, meta)}\n`);
  }

  public debug(message: string, meta?: Record<string, unknown>): void {
    if (process.env.NODE_ENV !== 'production') {
      process.stdout.write(`${this.format('debug', message, meta)}\n`);
    }
  }
}

export const logger = new Logger();

