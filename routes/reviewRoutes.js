import express from "express";
import auth from "../middleware/auth.js";
import admin from "../middleware/admin.js";

import {
    getReviews,
    addReview,
    updateReview,
    deleteReview,
    approveReview
} from "../controllers/reviewController.js";

const router = express.Router();

// =======================
// Public Routes
// =======================

// Get all reviews
router.get("/", getReviews);

// =======================
// User Routes
// =======================

// Add a review
router.post("/", auth, addReview);

// Update own review
router.put("/:id", auth, updateReview);

// Delete own review
router.delete("/:id", auth, deleteReview);

// =======================
// Admin Routes
// =======================

// Approve or reject review
router.put("/:id/approve", auth, admin, approveReview);

export default router;