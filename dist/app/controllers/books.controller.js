"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookRoutes = void 0;
const express_1 = __importDefault(require("express"));
const book_model_1 = require("../models/book.model");
exports.bookRoutes = express_1.default.Router();
exports.bookRoutes.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const book = yield book_model_1.Book.create(body);
        res.status(201).json({
            success: true,
            message: "Book created successfully",
            data: book
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: "Validation failed",
            error
        });
    }
}));
exports.bookRoutes.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let genre = req.query.filter;
        const sortBy = req.query.sortBy || 'title';
        const sortOrder = req.query.sort === 'desc' ? -1 : 1;
        const limit = parseInt(req.query.limit);
        const sortOptions = {
            [sortBy]: sortOrder
        };
        let books = [];
        if (genre) {
            books = yield book_model_1.Book.find({ genre: genre === null || genre === void 0 ? void 0 : genre.toUpperCase() }).sort(sortOptions).limit(limit);
        }
        else {
            books = yield book_model_1.Book.find().sort({ [sortBy]: sortOrder }).limit(limit);
        }
        res.status(200).json({
            success: true,
            message: "Books retrieved successfully",
            data: books
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: "Validation failed",
            error
        });
    }
}));
exports.bookRoutes.get('/:bookId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = req.params.bookId;
        const book = yield book_model_1.Book.findById(bookId);
        res.status(200).json({
            success: true,
            message: "Books retrieved successfully",
            data: book
        });
    }
    catch (error) {
        res.status(404).json({
            success: false,
            message: "Book not found",
            error
        });
    }
}));
exports.bookRoutes.patch('/:bookId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = req.params.bookId;
        const updatedBook = req.body;
        const book = yield book_model_1.Book.findByIdAndUpdate(bookId, updatedBook, { new: true });
        res.status(201).json({
            success: true,
            message: "Book updated successfully",
            data: book
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Faild to update book",
            error
        });
    }
}));
exports.bookRoutes.delete('/:bookId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = req.params.bookId;
        const deletedBook = yield book_model_1.Book.findOneAndDelete({ _id: bookId });
        if (!deletedBook) {
            res.status(404).json({
                success: false,
                message: "Book not found",
                data: null
            });
        }
        res.status(200).json({
            success: true,
            message: "Book deleted successfully",
            data: null
        });
    }
    catch (error) {
        res.status(404).json({
            success: false,
            message: "Book not found",
            error
        });
    }
}));
