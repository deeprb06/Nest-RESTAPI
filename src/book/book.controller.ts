import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { BookService } from './book.service';
import { createBookDto } from './dto/create-book.dto';
import { updateBookDto } from './dto/update-book.dto';
import { Book } from './schemas/book.schema';

@Controller('book')
export class BookController {
    constructor(private bookService: BookService){}

    @Get()
    async getAllBooks(): Promise<Book[]> {
        return this.bookService.findAll();
    }

    @Post('new')
    async createNewBook(
        @Body()
        book: createBookDto
    ): Promise<Book> {
        return this.bookService.createBook(book);
    }

    @Get(':id')
    async getBook(
        @Param('id')
        id: string
    ): Promise<Book> {
        return this.bookService.getBook(id);
    }

    @Put(':id')
    async updateBook(
        @Param('id')
        id: string,
        @Body()
        book: updateBookDto

    ) : Promise<Book> {
        return this.bookService.updateBook(id, book)
    }

    @Delete(':id')
    async deleteBook(
        @Param('id')
        id: string
    ) : Promise<Book> {
        return this.bookService.deleteBook(id);
    }
}
