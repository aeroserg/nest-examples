import {
    CallHandler,
    ExecutionContext,
    Inject,
    Injectable,
    NestInterceptor,
    Optional,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Observable, tap } from 'rxjs';
import { METRICS_FEATURE } from 'src/metrics/metrics.constants';
import { MetricsService } from 'src/metrics/metrics.service';

@Injectable()
export class MetricsInterceptor implements NestInterceptor {
    constructor(
        private readonly metricsService: MetricsService,
        @Optional()
        @Inject(METRICS_FEATURE)
        private readonly feature?: string,
    ) {}

    intercept(
        context: ExecutionContext,
        next: CallHandler,
    ): Observable<unknown> {
        const now = Date.now();
        const request = context.switchToHttp().getRequest<Request>();
        return next.handle().pipe(
            tap(() => {
                const response = context.switchToHttp().getResponse<Response>();
                this.metricsService.record({
                    feature: this.feature,
                    method: request.method,
                    url: request.originalUrl ?? request.url,
                    statusCode: response.statusCode,
                    duration: Date.now() - now,
                });
            }),
        );
    }
}
