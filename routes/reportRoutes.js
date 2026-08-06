import express from "express";
import auth from "../middleware/auth.js";
import admin from "../middleware/admin.js";

import {
    salesReport,
    orderReport,
    bookReport,
    userReport,
    borrowReport,
    revenueReport
} from "../controllers/reportController.js";

const router = express.Router();

// All report routes are Admin only

// Sales Report
router.get("/sales", auth, admin, salesReport);

// Order Report
router.get("/orders", auth, admin, orderReport);

// Book Report
router.get("/books", auth, admin, bookReport);

// User Report
router.get("/users", auth, admin, userReport);

// Borrow Report
router.get("/borrow", auth, admin, borrowReport);

// Revenue Report
router.get("/revenue", auth, admin, revenueReport);

export default router;