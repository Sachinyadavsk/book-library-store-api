import express from "express";
import auth from "../middleware/auth.js";
import admin from "../middleware/admin.js";

import {
    getBooks,
    getBookById,
    addBook,
    updateBook,
    deleteBook,
    searchBooks,
    getFeaturedBooks,
    getLatestBooks,
    getBestSellerBooks,
    getBooksByCategory,
    getBooksByAuthor,
    getBooksByPriceRange,
    uploadBookImage
} from "../controllers/bookController.js";

const router = express.Router();

// =======================
// Public Routes
// =======================

// Get all books
router.get("/", getBooks);

// Search books
router.get("/search", searchBooks);

// Featured books
router.get("/featured", getFeaturedBooks);

// Latest books
router.get("/latest", getLatestBooks);

// Best seller books
router.get("/best-sellers", getBestSellerBooks);

// Books by category
router.get("/category/:categoryId", getBooksByCategory);

// Books by author
router.get("/author/:authorId", getBooksByAuthor);

// Books by price range
router.get("/price-range", getBooksByPriceRange);

// Get single book
router.get("/:id", getBookById);

// =======================
// Admin Routes
// =======================

// Add new book
router.post("/", auth, admin, addBook);

// Upload book cover image
router.post("/:id/upload-image", auth, admin, uploadBookImage);

// Update book
router.put("/:id", auth, admin, updateBook);

// Delete book
router.delete("/:id", auth, admin, deleteBook);

export default router;