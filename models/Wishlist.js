import mongoose from "mongoose";

const wishlistSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Please provide the user of the wishlist"],
    },
    items: [{
        book: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Book",
            required: [true, "Please provide the book in the wishlist"],
        }
    }],
}, {
    timestamps: true,
});

const Wishlist = mongoose.model("Wishlist", wishlistSchema);
export default Wishlist;
