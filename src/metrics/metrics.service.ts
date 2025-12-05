import { Inject, Injectable, Optional } from '@nestjs/common';
import { METRICS_OPTIONS } from './metrics.constants';
import { type MetricsModuleOptions } from './metrics.interfaces';

@Injectable()
export class MetricsService {
    constructor(
        @Optional()
        @Inject(METRICS_OPTIONS)
        private readonly options?: MetricsModuleOptions,
    ) {}

    record(params: {
        feature?: string;
        method: string;
        url: string;
        statusCode: number;
        duration: number;
    }) {
        if (this.options?.logToConsole === false) {
            return;
        }

        const scope = params.feature ? `[${params.feature}] ` : '';
        console.log(
            `${scope}${params.method} ${params.url} status=${params.statusCode} duration=${params.duration}ms`,
        );
    }
}
