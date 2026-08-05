import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide the name of the book"],
    },
    description: {
        type: String,
        required: [true, "Please provide the description of the book"],
    },
    price: {
        type: Number,
        required: [true, "Please provide the price of the book"],
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Author",
        required: [true, "Please provide the author of the book"],
    }
}, {
    timestamps: true,
});

const Book = mongoose.model("Book", bookSchema);
export default Book;
