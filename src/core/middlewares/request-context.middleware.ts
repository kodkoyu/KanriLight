import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { ContextService } from '../../shared/services/context.service';

@Injectable()
export class RequestContextMiddleware implements NestMiddleware {
  constructor(private readonly contextService: ContextService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const userAgent = req.headers['user-agent'] || 'Unknown';
    this.contextService.setContext('userAgent', userAgent);

    console.log('Middleware executed');
    console.log('User-Agent set in ContextService:', userAgent);
    console.log('ContextService instance:', this.contextService);

    next();
  }
}