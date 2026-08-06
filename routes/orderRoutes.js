import express from "express";
import auth from "../middleware/auth.js";
import admin from "../middleware/admin.js";

import {
    getOrders,
    getOrderById,
    createOrder,
    updateOrderStatus,
    cancelOrder,
    deleteOrder,
    getUserOrders,
    generateInvoice
} from "../controllers/orderController.js";

const router = express.Router();

// =======================
// User Routes
// =======================

// Create a new order
router.post("/", auth, createOrder);

// Get logged-in user's orders
router.get("/my-orders", auth, getUserOrders);

// Get order by ID
router.get("/:id", auth, getOrderById);

// Cancel order
router.put("/:id/cancel", auth, cancelOrder);

// Generate invoice
router.get("/:id/invoice", auth, generateInvoice);

// =======================
// Admin Routes
// =======================

// Get all orders
router.get("/", auth, admin, getOrders);

// Update order status
router.put("/:id/status", auth, admin, updateOrderStatus);

// Delete order
router.delete("/:id", auth, admin, deleteOrder);

export default router;