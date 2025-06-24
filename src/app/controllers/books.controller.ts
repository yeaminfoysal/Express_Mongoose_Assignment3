import express, { Request, response, Response } from "express";
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
        const sortOrder = req.query.sort === 'desc' ? -1 : 1;
        const limit = parseInt(req.query.limit as string) || 10;
        let books = [];

        if (genre) {
            books = await Book.find({ genre: genre?.toUpperCase() }).sort({ title: sortOrder }).limit(limit);
        } else {
            books = await Book.find().sort({ title: sortOrder }).limit(limit);
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
})