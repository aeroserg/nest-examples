import { DynamicModule, Module } from '@nestjs/common';
import { MetricsInterceptor } from 'src/interceptors/metrics.interceptor';
import { METRICS_FEATURE, METRICS_OPTIONS } from './metrics.constants';
import { MetricsModuleOptions } from './metrics.interfaces';
import { MetricsService } from './metrics.service';

@Module({})
export class MetricsModule {
    static forRoot(options: MetricsModuleOptions = {}): DynamicModule {
        return {
            module: MetricsModule,
            global: true,
            providers: [
                {
                    provide: METRICS_OPTIONS,
                    useValue: { logToConsole: true, ...options },
                },
                MetricsService,
            ],
            exports: [MetricsService, METRICS_OPTIONS],
        };
    }

    static forFeature(feature: string): DynamicModule {
        return {
            module: MetricsModule,
            providers: [
                { provide: METRICS_FEATURE, useValue: feature },
                MetricsInterceptor,
            ],
            exports: [MetricsInterceptor],
        };
    }
}
