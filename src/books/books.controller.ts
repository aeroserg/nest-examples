import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Request,
    UseGuards,
} from '@nestjs/common';
import { CreateBookDto } from 'src/dto/book/book-create.dto';
import { UpdateBookDto } from 'src/dto/book/book-update.dto';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { BooksService } from './books.service';

@Controller('books')
@UseGuards(JwtAuthGuard)
export class BooksController {
    constructor(private readonly booksService: BooksService) {}

    @Post()
    create(@Body() createBookDto: CreateBookDto, @Request() req: any) {
        return this.booksService.create(createBookDto, req.user.userId);
    }

    @Get()
    findAll(@Request() req: any) {
        return this.booksService.findAll(req.user.userId);
    }

    @Get(':id')
    findOne(@Param('id') id: string, @Request() req) {
        return this.booksService.findOne(+id, req.user.userId);
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateBookDto: UpdateBookDto,
        @Request() req: any,
    ) {
        return this.booksService.update(+id, updateBookDto, req.user.userId);
    }

    @Delete(':id')
    remove(@Param('id') id: string, @Request() req: any) {
        return this.booksService.remove(+id, req.user.userId);
    }
}
