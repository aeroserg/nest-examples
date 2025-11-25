import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { BooksModule } from './books/books.module';
import { typeOrmConfig } from './config/typeorm.config';
import { UsersModule } from './users/users.module';

@Module({
    imports: [
        TypeOrmModule.forRoot(typeOrmConfig),
        ConfigModule.forRoot({ isGlobal: true }),
        AuthModule,
        UsersModule,
        BooksModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
