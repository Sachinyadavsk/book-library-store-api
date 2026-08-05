import Cart from '../models/Cart.js';

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
        const { userId, productId, quantity } = req.body;
        const existingCart = await Cart.findOne({ userId, productId });

        if (existingCart) {
            existingCart.quantity += quantity;
            await existingCart.save();
            res.status(200).json({
                success: true,
                message: "Cart updated successfully",
                cart: existingCart
            });
        } else {
            const newCart = new Cart({ userId, productId, quantity });
            await newCart.save();
            res.status(201).json({
                success: true,
                message: "Item added to cart successfully",
                cart: newCart
            });
        }
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
