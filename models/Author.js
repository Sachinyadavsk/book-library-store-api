import mongoose from 'mongoose';

const authorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide the name of the author"],
    },
    bio: {
        type: String,
        required: [true, "Please provide the bio of the author"],
    },
    website: {
        type: String,
        required: [true, "Please provide the website of the author"],
    },
    books: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book",
    }],
}, {
    timestamps: true,
});

const Author = mongoose.model("Author", authorSchema);
export default Author;