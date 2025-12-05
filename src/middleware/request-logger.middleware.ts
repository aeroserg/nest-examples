import { Injectable, NestMiddleware } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class RequestLoggerMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        const requestId = randomUUID();
        req.headers['x-request-id'] = requestId;
        res.setHeader('x-request-id', requestId);

        const startedAt = Date.now();
        console.log(
            `[Request] ${req.method} ${req.originalUrl} id=${requestId}`,
        );

        res.on('finish', () => {
            const duration = Date.now() - startedAt;
            console.log(
                `[Response] ${req.method} ${req.originalUrl} id=${requestId} status=${res.statusCode} duration=${duration}ms`,
            );
        });

        next();
    }
}
