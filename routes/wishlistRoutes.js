import express from "express";
import auth from "../middleware/auth.js";

import {
    getWishlist,
    addToWishlist,
    removeFromWishlist,
    clearWishlist
} from "../controllers/wishlistController.js";

const router = express.Router();

// =======================
// User Routes
// =======================

// Get logged-in user's wishlist
router.get("/", auth, getWishlist);

// Add a book to wishlist
router.post("/", auth, addToWishlist);

// Remove a book from wishlist
router.delete("/:bookId", auth, removeFromWishlist);

// Clear wishlist
router.delete("/", auth, clearWishlist);

export default router;