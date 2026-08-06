import express from "express";
import auth from "../middleware/auth.js";
import admin from "../middleware/admin.js";

import {
    getCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory
} from "../controllers/categoryController.js";

const router = express.Router();

// ======================
// Public Routes
// ======================

// Get all categories
router.get("/", getCategories);

// Get category by ID
router.get("/:id", getCategoryById);

// ======================
// Admin Routes
// ======================

// Create category
router.post("/", auth, admin, createCategory);

// Update category
router.put("/:id", auth, admin, updateCategory);

// Delete category
router.delete("/:id", auth, admin, deleteCategory);

export default router;