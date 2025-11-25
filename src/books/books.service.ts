import {
    ForbiddenException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateBookDto } from 'src/dto/book/book-create.dto';
import { UpdateBookDto } from 'src/dto/book/book-update.dto';
import { Book } from 'src/entity/book/book.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BooksService {
    constructor(
        @InjectRepository(Book)
        private booksRepository: Repository<Book>,
    ) {}

    async create(createBookDto: CreateBookDto, userId: number): Promise<Book> {
        const book = this.booksRepository.create({
            ...createBookDto,
            user: { id: userId },
        });
        return await this.booksRepository.save(book);
    }

    async findAll(userId: number): Promise<Book[]> {
        return await this.booksRepository.find({
            where: { user: { id: userId } },
        });
    }

    async findOne(id: number, userId: number): Promise<Book> {
        const book = await this.booksRepository.findOne({
            where: { id, user: { id: userId } },
        });

        if (!book) {
            throw new NotFoundException('Book not found');
        }

        return book;
    }

    async update(
        id: number,
        updateBookDto: UpdateBookDto,
        userId: number,
    ): Promise<Book> {
        const book = await this.findOne(id, userId);

        if (book.userId !== userId) {
            throw new ForbiddenException('You can only update your own books');
        }

        await this.booksRepository.update(id, updateBookDto);
        return await this.findOne(id, userId);
    }

    async remove(id: number, userId: number): Promise<void> {
        const book = await this.findOne(id, userId);

        if (book.userId !== userId) {
            throw new ForbiddenException('You can only delete your own books');
        }

        await this.booksRepository.delete(id);
    }
}
