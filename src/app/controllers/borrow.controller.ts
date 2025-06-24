import express, { Request, Response } from "express";
import { Book } from "../models/book.model";
import { Borrow } from "../models/borrow.model";

export const borrowRoutes = express.Router();

borrowRoutes.post('/', async (req: Request, res: Response) => {
    try {
        const { book: bookId, quantity, dueDate } = req.body;
        const book = await Book.findById(bookId) as any;
        if (!book) {
            res.status(404).json({
                success: false,
                message: "Book not found",
                data: null
            });
            return
        }
        if (book.copies < quantity) {
            res.status(400).json({
                success: false,
                message: "Not enough copies available",
                availableCopies: book.copies
            });
            return
        }
        book.copies = book.copies - quantity;
        book.updateAvailability();
        await book.save();

        const borrow = await Borrow.create(req.body);

        res.status(201).json({
            success: true,
            message: "Book borrowed successfully",
            data: borrow
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to borrow book",
            error
        });
    }
});

borrowRoutes.get('/', async (req: Request, res: Response) => {
    try {
        const summary = await Borrow.aggregate([
            {
                $group: {
                    _id: '$book',
                    totalQuantity: { $sum: '$quantity' }
                }
            },
            {
                $lookup: {
                    from: 'books',
                    localField: '_id',
                    foreignField: '_id',
                    as: 'book'
                }
            },
            {
                $unwind: "$book"
            },
            {
                $project: {
                    _id: 0,
                    totalQuantity: 1,
                    book: {
                        title: "$book.title",
                        isbn: "$book.isbn"
                    }
                }
            }
        ])
        res.status(200).json({
            success: true,
            message: "Borrowed books summary retrieved successfully",
            data: summary
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to retrieve summary",
            error
        });
    }
})