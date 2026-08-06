import express from "express";
import auth from "../middleware/auth.js";
import admin from "../middleware/admin.js";

import {
    borrowBook,
    returnBook,
    renewBook,
    getBorrowHistory,
    getBorrowedBooks,
    calculateFine
} from "../controllers/borrowController.js";

const router = express.Router();

// =======================
// User Routes
// =======================

// Borrow a book
router.post("/borrow", auth, borrowBook);

// Return a book
router.put("/return/:borrowId", auth, returnBook);

// Renew a borrowed book
router.put("/renew/:borrowId", auth, renewBook);

// Logged-in user's borrow history
router.get("/history", auth, getBorrowHistory);

// Logged-in user's currently borrowed books
router.get("/my-books", auth, getBorrowedBooks);

// Calculate fine for a borrowed book
router.get("/fine/:borrowId", auth, calculateFine);

// =======================
// Admin Routes
// =======================

// View all borrowed books
router.get("/", auth, admin, getBorrowedBooks);

// View all borrow history
router.get("/all-history", auth, admin, getBorrowHistory);

export default router;