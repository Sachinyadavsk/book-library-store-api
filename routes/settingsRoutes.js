import express from "express";
import auth from "../middleware/auth.js";
import admin from "../middleware/admin.js";

import {
    getSettings,
    updateSettings,
    updatePaymentSettings,
    updateEmailSettings,
    updateWebsiteSettings
} from "../controllers/settingsController.js";

const router = express.Router();

// All settings routes are Admin only

// Get all settings
router.get("/", auth, admin, getSettings);

// Update general settings
router.put("/", auth, admin, updateSettings);

// Update payment settings
router.put("/payment", auth, admin, updatePaymentSettings);

// Update email settings
router.put("/email", auth, admin, updateEmailSettings);

// Update website settings
router.put("/website", auth, admin, updateWebsiteSettings);

export default router;