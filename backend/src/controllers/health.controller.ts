import { Request, Response } from 'express';
import { HealthService } from '../services/health.service.js';

/**
 * HealthController - thin controller delegating business logic to HealthService.
 */
export class HealthController {
  public static getHealth(_req: Request, res: Response): void {
    const health = HealthService.getHealth();
    res.status(200).json(health);
  }
}

