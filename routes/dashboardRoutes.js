import express from "express";
import auth from "../middleware/auth.js";
import admin from "../middleware/admin.js";

import {
    adminDashboard,
    userDashboard,
    getStatistics,
    getRecentOrders,
    getTopBooks
} from "../controllers/dashboardController.js";

const router = express.Router();

// =======================
// User Dashboard
// =======================

// Logged-in user's dashboard
router.get("/user", auth, userDashboard);

// =======================
// Admin Dashboard
// =======================

// Admin dashboard overview
router.get("/admin", auth, admin, adminDashboard);

// Dashboard statistics
router.get("/statistics", auth, admin, getStatistics);

// Recent orders
router.get("/recent-orders", auth, admin, getRecentOrders);

// Top books
router.get("/top-books", auth, admin, getTopBooks);

export default router;