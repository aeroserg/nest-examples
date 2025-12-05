import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { BooksModule } from './books/books.module';
import { typeOrmConfig } from './config/typeorm.config';
import { UsersModule } from './users/users.module';
import { MetricsModule } from './metrics/metrics.module';
import { RequestLoggerMiddleware } from './middleware/request-logger.middleware';

@Module({
    imports: [
        TypeOrmModule.forRoot(typeOrmConfig),
        ConfigModule.forRoot({ isGlobal: true }),
        MetricsModule.forRoot(),
        AuthModule,
        UsersModule,
        BooksModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(RequestLoggerMiddleware).forRoutes('books');
    }
}
