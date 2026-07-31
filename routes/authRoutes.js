import express from "express";
import auth from "../middleware/auth.js";
import admin from "../middleware/admin.js";

const router = express.Router();

router.get("/dashboard", auth, admin, (req, res) => {
    res.json({
        success: true,
        message: "Welcome Admin"
    });
});

export default router;