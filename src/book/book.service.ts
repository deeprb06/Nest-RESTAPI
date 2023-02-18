import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Book } from './schemas/book.schema';

@Injectable()
export class BookService {

    constructor(
        @InjectModel(Book.name)
        private bookModel: mongoose.Model<Book>
    ){}

    async findAll(): Promise<Book[]> {
        const books = await this.bookModel.find();
        return books;
    }

    async createBook(book: Book): Promise<Book> {
        const newbook = await this.bookModel.create(book);
        return newbook;
    }

    async getBook(id: string) : Promise<Book> {
        const getone = await this.bookModel.findById(id);
        if(!getone) {
            throw new NotFoundException('Book not found');
        }
        return getone;
    }

    async updateBook(id: string, book: Book) : Promise<Book> {
        const update = await this.bookModel.findByIdAndUpdate(id, book,{
            new: true,
            runValidators: true
        })
        return update;
    }

    async deleteBook(id: string) : Promise<Book> {
        return await this.bookModel.findByIdAndDelete(id);
    }
}
