import express from "express";
import auth from "../middleware/auth.js";
import admin from "../middleware/admin.js";

import {
    getAuthors,
    getAuthorById,
    createAuthor,
    updateAuthor,
    deleteAuthor
} from "../controllers/authorController.js";

const router = express.Router();

// Public Routes
router.get("/", getAuthors);
router.get("/:id", getAuthorById);

// Admin Routes
router.post("/", auth, admin, createAuthor);
router.put("/:id", auth, admin, updateAuthor);
router.delete("/:id", auth, admin, deleteAuthor);

export default router;