import express from "express";
import auth from "../middleware/auth.js";

import {
    getCarts,
    addToCart,
    updateCartItem,
    removeCartItem,
    clearCart
} from "../controllers/cartController.js";

const router = express.Router();

// Get logged-in user's cart
router.get("/", auth, getCarts);

// Add a book to cart
router.post("/", auth, addToCart);

// Update cart item (quantity)
router.put("/:cartItemId", auth, updateCartItem);

// Remove a single item from cart
router.delete("/:cartItemId", auth, removeCartItem);

// Clear the entire cart
router.delete("/", auth, clearCart);

export default router;