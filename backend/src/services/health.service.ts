export interface HealthStatus {
  status: 'ok' | 'degraded';
  uptime: number;
  timestamp: string;
  version: string;
  memoryUsage: {
    rssMb: number;
    heapUsedMb: number;
  };
}

export class HealthService {
  public static getHealth(): HealthStatus {
    const memory = process.memoryUsage();
    return {
      status: 'ok',
      uptime: Math.floor(process.uptime()),
      timestamp: new Date().toISOString(),
      version: '0.1.0',
      memoryUsage: {
        rssMb: Math.round((memory.rss / (1024 * 1024)) * 100) / 100,
        heapUsedMb: Math.round((memory.heapUsed / (1024 * 1024)) * 100) / 100,
      },
    };
  }
}

