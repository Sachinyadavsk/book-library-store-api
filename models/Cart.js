import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true, // One cart per user
        },

        items: [
            {
                book: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Book",
                    required: true,
                },

                quantity: {
                    type: Number,
                    default: 1,
                    min: 1,
                },

                price: {
                    type: Number,
                    required: true,
                }
            }
        ],

        totalItems: {
            type: Number,
            default: 0,
        },

        totalAmount: {
            type: Number,
            default: 0,
        }
    },
    {
        timestamps: true,
    }
);

const Cart = mongoose.model("Cart", cartSchema);

export default Cart;