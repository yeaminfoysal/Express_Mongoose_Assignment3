import { model, Schema } from "mongoose";
import { IBook, IBookMethods } from "../interfaces/book.interface";
// import validator from 'validator';

const bookSchema = new Schema<IBook, {}, IBookMethods>({
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
},
    {
        versionKey: false,
        timestamps: true,
    });

bookSchema.methods.updateAvailability = function () {
    if (this.copies <= 0) {
        this.available = false
    }
}
export const Book = model<IBook>("Book", bookSchema);
