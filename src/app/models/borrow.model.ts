import { model, Schema, Types } from "mongoose";
import { IBorrow } from "../interfaces/borrow.interface";

const borrowSchema = new Schema<IBorrow>({
    book: {
        type: Schema.Types.ObjectId,
        ref: "Book",
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: [1, "Quantity must be at least 1"],
        validate: {
            validator: Number.isInteger,
            message: "Quantity must be an integer",
        },
    },
    dueDate: {
        type: Date,
        required: true,
    }
},
    {
        versionKey: false,
        timestamps: true,
    })

export const Borrow = model("Borrow", borrowSchema)