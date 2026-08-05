import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Please provide the user of the order"],
    },
    items: [{
        book: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Book",
            required: [true, "Please provide the book in the order"],
        },
        quantity: {
            type: Number,
            required: [true, "Please provide the quantity of the book in the order"],
            min: [1, "Quantity must be at least 1"],
        }
    }],
    totalAmount: {
        type: Number,
        required: [true, "Please provide the total amount of the order"],
    }
}, {
    timestamps: true,
});

const Order = mongoose.model("Order", orderSchema);
export default Order;
