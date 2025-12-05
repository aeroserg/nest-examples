import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Req,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { CreateBookDto } from 'src/dto/book/book-create.dto';
import { UpdateBookDto } from 'src/dto/book/book-update.dto';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { RequestWithUser } from 'src/interfaces/request-with-user.interface';
import { MetricsInterceptor } from 'src/interceptors/metrics.interceptor';
import { BooksService } from './books.service';

@Controller('books')
@UseGuards(JwtAuthGuard)
@UseInterceptors(MetricsInterceptor)
export class BooksController {
    constructor(private readonly booksService: BooksService) {}

    @Post()
    create(@Body() createBookDto: CreateBookDto, @Req() req: RequestWithUser) {
        return this.booksService.create(createBookDto, req.user.userId);
    }

    @Get()
    findAll(@Req() req: RequestWithUser) {
        return this.booksService.findAll(req.user.userId);
    }

    @Get(':id')
    findOne(@Param('id') id: string, @Req() req: RequestWithUser) {
        return this.booksService.findOne(+id, req.user.userId);
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateBookDto: UpdateBookDto,
        @Req() req: RequestWithUser,
    ) {
        return this.booksService.update(+id, updateBookDto, req.user.userId);
    }

    @Delete(':id')
    remove(@Param('id') id: string, @Req() req: RequestWithUser) {
        return this.booksService.remove(+id, req.user.userId);
    }
}
