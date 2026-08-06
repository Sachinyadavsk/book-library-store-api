import Cart from '../models/Cart.js';
import Book from '../models/Book.js'

export const getCarts = async (req, res) => {
    try {
        const carts = await Cart.find();
        res.status(200).json({
            success: true,
            message: "Carts fetched successfully",
            carts
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const addToCart = async (req, res) => {
    try {
        const { bookId, quantity } = req.body;
        const userId = req.user._id;

        // Check if book exists
        const book = await Book.findById(bookId);

        if (!book) {
            return res.status(404).json({
                success: false,
                message: "Book not found"
            });
        }

        // Find user's cart
        let cart = await Cart.findOne({ user: userId });

        if (!cart) {
            cart = new Cart({
                user: userId,
                items: []
            });
        }

        // Check if book already exists in cart
        const existingItem = cart.items.find(
            item => item.book.toString() === bookId
        );

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.items.push({
                book: bookId,
                quantity,
                price: book.price
            });
        }

        // Calculate totals
        cart.totalItems = cart.items.reduce(
            (sum, item) => sum + item.quantity,
            0
        );

        cart.totalAmount = cart.items.reduce(
            (sum, item) => sum + (item.quantity * item.price),
            0
        );

        await cart.save();

        res.status(201).json({
            success: true,
            message: "Book added to cart successfully",
            data: cart
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const updateCartItem = async (req, res) => {
    try {
        const { quantity } = req.body;
        const updatedCartItem = await Cart.findByIdAndUpdate(req.params.id, { quantity }, { new: true });
        if (!updatedCartItem) {
            return res.status(404).json({
                success: false,
                message: "Item not found in cart"
            });
        }
        res.status(200).json({
            success: true,
            message: "Cart item updated successfully",
            cart: updatedCartItem
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const removeCartItem = async (req, res) => {
    try {
        const removedCartItem = await Cart.findByIdAndDelete(req.params.id);
        if (!removedCartItem) {
            return res.status(404).json({
                success: false,
                message: "Item not found in cart"
            });
        }
        res.status(200).json({
            success: true,
            message: "Item removed from cart successfully",
            cart: removedCartItem
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const clearCart = async (req, res) => {
    try {
        const { userId } = req.params;
        await Cart.deleteMany({ userId });
        res.status(200).json({
            success: true,
            message: "Cart cleared successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
