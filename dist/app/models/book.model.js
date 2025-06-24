"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Book = void 0;
const mongoose_1 = require("mongoose");
// import validator from 'validator';
const bookSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: [true, "Title is required"],
        trim: true,
    },
    author: {
        type: String,
        required: [true, "Author is required"],
        trim: true,
    },
    genre: {
        type: String,
        uppercase: true,
        required: [true, "Genre is required"],
        enum: ["FICTION", "NON_FICTION", "SCIENCE", "HISTORY", "BIOGRAPHY", "FANTASY"],
    },
    isbn: {
        type: String,
        required: [true, "ISBN is required"],
        unique: true,
        trim: true,
    },
    description: {
        type: String,
        trim: true,
    },
    copies: {
        type: Number,
        required: [true, "Number of copies is required"],
        min: [0, "Copies cannot be negative"],
        validate: {
            validator: Number.isInteger,
            message: "Copies must be an integer",
        },
    },
    available: {
        type: Boolean,
        default: true,
    },
}, {
    versionKey: false,
    timestamps: true,
});
bookSchema.methods.updateAvailability = function () {
    if (this.copies <= 0) {
        this.available = false;
    }
};
exports.Book = (0, mongoose_1.model)("Book", bookSchema);
