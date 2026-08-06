import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Please provide the book title"],
            trim: true,
        },

        slug: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },

        description: {
            type: String,
            required: [true, "Please provide the book description"],
            trim: true,
        },

        isbn: {
            type: String,
            unique: true,
            required: true,
        },

        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Author",
            required: true,
        },

        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            required: true,
        },

        price: {
            type: Number,
            required: true,
            min: 0,
        },

        discountPrice: {
            type: Number,
            default: 0,
        },

        stock: {
            type: Number,
            default: 0,
            min: 0,
        },

        pages: {
            type: Number,
            default: 0,
        },

        language: {
            type: String,
            default: "English",
        },

        publicationDate: {
            type: Date,
        },

        coverImage: {
            type: String,
            default: "",
        },

        images: [
            {
                type: String,
            }
        ],

        averageRating: {
            type: Number,
            default: 0,
            min: 0,
            max: 5,
        },

        totalReviews: {
            type: Number,
            default: 0,
        },

        featured: {
            type: Boolean,
            default: false,
        },

        bestseller: {
            type: Boolean,
            default: false,
        },

        status: {
            type: String,
            enum: ["Available", "Out of Stock", "Coming Soon"],
            default: "Available",
        },

        isActive: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

const Book = mongoose.model("Book", bookSchema);

export default Book;