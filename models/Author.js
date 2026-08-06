import mongoose from "mongoose";

const authorSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please provide the author's name"],
            trim: true,
        },

        slug: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },

        bio: {
            type: String,
            required: [true, "Please provide the author's biography"],
            trim: true,
        },

        photo: {
            type: String,
            default: "",
        },

        email: {
            type: String,
            default: "",
            lowercase: true,
            trim: true,
        },

        website: {
            type: String,
            default: "",
            trim: true,
        },

        country: {
            type: String,
            default: "",
        },

        dateOfBirth: {
            type: Date,
        },

        books: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Book",
            }
        ],

        totalBooks: {
            type: Number,
            default: 0,
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

// Indexes

const Author = mongoose.model("Author", authorSchema);

export default Author;