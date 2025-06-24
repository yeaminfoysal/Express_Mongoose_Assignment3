import express, { Request, Response } from "express";
import { Book } from "../models/book.model";

export const bookRoutes = express.Router();

bookRoutes.post('/', async (req: Request, res: Response) => {
    try {
        const body = req.body;
        const book = await Book.create(body);
        res.status(201).json({
            success: true,
            message: "Book created successfully",
            data: book
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Validation failed",
            error
        })
    }
})

bookRoutes.get('/', async (req: Request, res: Response) => {
    try {
        let genre = req.query.filter as string;
        const sortBy = (req.query.sortBy as string) || 'title';
        const sortOrder = req.query.sort === 'desc' ? -1 : 1;
        const limit = parseInt(req.query.limit as string) || 10;

        const sortOptions: Record<string, 1 | -1> = {
            [sortBy]: sortOrder
        };

        let books = [];

        if (genre) {
            books = await Book.find({ genre: genre?.toUpperCase() }).sort(sortOptions).limit(limit);
        } else {
            books = await Book.find().sort({ [sortBy]: sortOrder }).limit(limit);
        }

        res.status(200).json({
            success: true,
            message: "Books retrieved successfully",
            data: books
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Validation failed",
            error
        })
    }
});

bookRoutes.get('/:bookId', async (req: Request, res: Response) => {
    try {
        const bookId = req.params.bookId;
        const book = await Book.findById(bookId);

        res.status(200).json({
            success: true,
            message: "Books retrieved successfully",
            data: book
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Validation failed",
            error
        })
    }
});

bookRoutes.patch('/:bookId', async (req: Request, res: Response) => {
    try {
        const bookId = req.params.bookId;
        const updatedBook = req.body;
        const book = await Book.findByIdAndUpdate(bookId, updatedBook, { new: true });

        res.status(201).json({
            success: true,
            message: "Books updated successfully",
            data: book
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Validation failed",
            error
        })
    }
})