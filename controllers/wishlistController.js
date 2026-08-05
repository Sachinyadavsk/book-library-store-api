import Wishlist from '../models/Wishlist.js';

export const getWishlist = async (req, res) => {
    try {
        const wishlist = await Wishlist.find();
        res.status(200).json({
            success: true,
            wishlist
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const addToWishlist = async (req, res) => {
    try {
        const { userId, productId } = req.body;
        const existingWishlistItem = await Wishlist.findOne({ userId, productId });

        if (existingWishlistItem) {
            return res.status(400).json({
                success: false,
                message: "Item already exists in wishlist"
            });
        }

        const newWishlistItem = new Wishlist({ userId, productId });
        await newWishlistItem.save();
        res.status(201).json({
            success: true,
            message: "Item added to wishlist successfully",
            wishlistItem: newWishlistItem
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const removeFromWishlist = async (req, res) => {
    try {
        const removedWishlistItem = await Wishlist.findByIdAndDelete(req.params.id);
        if (!removedWishlistItem) {
            return res.status(404).json({
                success: false,
                message: "Item not found in wishlist"
            });
        }
        res.status(200).json({
            success: true,
            message: "Item removed from wishlist successfully",
            wishlistItem: removedWishlistItem
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const clearWishlist = async (req, res) => {
    try {
        await Wishlist.deleteMany({ userId: req.params.userId });
        res.status(200).json({
            success: true,
            message: "Wishlist cleared successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
