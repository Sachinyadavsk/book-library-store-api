import express from "express";
import auth from "../middleware/auth.js";
import admin from "../middleware/admin.js";

import {
    getNotifications,
    sendNotification,
    markAsRead,
    deleteNotification
} from "../controllers/notificationController.js";

const router = express.Router();

// =======================
// User Routes
// =======================

// Get logged-in user's notifications
router.get("/", auth, getNotifications);

// Mark notification as read
router.put("/:id/read", auth, markAsRead);

// Delete notification
router.delete("/:id", auth, deleteNotification);

// =======================
// Admin Routes
// =======================

// Send notification to users
router.post("/", auth, admin, sendNotification);

export default router;