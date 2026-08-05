import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Please provide the user of the cart"],
    },
    items: [{
        book: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Book",
            required: [true, "Please provide the book in the cart"],
        },
        quantity: {
            type: Number,
            required: [true, "Please provide the quantity of the book in the cart"],
            min: [1, "Quantity must be at least 1"],
        }
    }],
}, {
    timestamps: true,
});

const Cart = mongoose.model("Cart", cartSchema);
export default Cart;
