import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from 'src/entity/book/book.entity';
import { MetricsModule } from 'src/metrics/metrics.module';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([Book]),
        MetricsModule.forFeature('books'),
    ],
    controllers: [BooksController],
    providers: [BooksService],
})
export class BooksModule {}
