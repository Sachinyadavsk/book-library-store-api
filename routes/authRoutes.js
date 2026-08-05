import express from "express";
import auth from "../middleware/auth.js";
import admin from "../middleware/admin.js";
import {
    register,
    login,
    refreshToken,
    forgotPassword,
    resetPassword,
    verifyEmail,
    resendVerificationEmail,
    logout,
    changePassword,
    getProfile,
    updateProfile,
} from '../controllers/authController.js'

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/refresh-token", refreshToken);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.get("/verify-email/:token", verifyEmail);
router.post("/resend-verification-email", resendVerificationEmail);

// Protected Routes
router.post("/logout", auth, logout);
router.post("/change-password", auth, changePassword);
router.get("/profile", auth, getProfile);
router.put("/profile", auth, updateProfile);

// admin side routes
router.get("/dashboard", auth, admin, (req, res) => {
    res.json({
        success: true,
        message: "Welcome Admin"
    });
});



export default router;