import express from "express";
import auth from "../middleware/auth.js";
import admin from "../middleware/admin.js";
import { login, getProfile, register } from "../controllers/authController.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/profile", auth, getProfile);

// admin side routes
router.get("/dashboard", auth, admin, (req, res) => {
    res.json({
        success: true,
        message: "Welcome Admin"
    });
});



export default router;